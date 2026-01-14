import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getUser } from "@/lib/auth/get-user";
import { verifyCsrfToken } from "@/lib/csrf";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { sendEmail } from "@/lib/email/send";

// Extend timeout for file uploads (Vercel default is 10s)
export const maxDuration = 60; // 60 seconds for large file uploads

const applySchema = z.object({
  jobPostingId: z.string().uuid("Ugyldig stillingsreferanse"),
  candidateId: z.string().uuid("Du må være logget inn for å søke"),
  coverLetter: z
    .string()
    .min(50, "Følgebrevet må være minst 50 tegn")
    .max(2000, "Følgebrevet kan ikke være mer enn 2000 tegn"),
  certificatesKey: z.string().optional(),
  gdprConsent: z.boolean().refine((val) => val === true, {
    message: "Du må godta vilkårene for å søke",
  }),
});

// Debug helper - logs with timestamp and request ID
function debugLog(requestId: string, step: string, data?: unknown) {
  console.log(`[APPLY:${requestId}] ${step}`, data ? JSON.stringify(data, null, 2) : '');
}

export async function POST(request: NextRequest) {
  const requestId = Math.random().toString(36).substring(7);
  debugLog(requestId, '=== START APPLICATION REQUEST ===');

  try {
    // 0. Verify Supabase configuration early
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      debugLog(requestId, 'CRITICAL: Missing Supabase environment variables');
      console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
      return NextResponse.json(
        { error: "Serverfeil: Database ikke konfigurert. Kontakt support." },
        { status: 500 }
      );
    }

    // 1. Verify CSRF token
    const csrfToken = request.headers.get("x-csrf-token");
    debugLog(requestId, 'CSRF token present:', !!csrfToken);
    
    if (!csrfToken || !verifyCsrfToken(csrfToken)) {
      debugLog(requestId, 'CSRF FAILED - token invalid or missing');
      return NextResponse.json(
        { error: "Ugyldig sikkerhetstoken. Vennligst last siden på nytt." },
        { status: 403 }
      );
    }
    debugLog(requestId, 'CSRF OK');

    // 2. Get IP for rate limiting
    const ip = getClientIp(request);
    debugLog(requestId, 'Client IP:', ip);

    // 3. Rate limit: 10 applications per hour per IP
    debugLog(requestId, 'Checking rate limit...');
    const rateLimitResult = await rateLimit(
      `apply:${ip}`,
      10,
      60 * 60 * 1000 // 1 hour
    );
    debugLog(requestId, 'Rate limit result:', rateLimitResult);

    if (!rateLimitResult.success) {
      debugLog(requestId, 'RATE LIMIT EXCEEDED');
      return NextResponse.json(
        {
          error:
            "Du har sendt for mange søknader. Vennligst vent litt før du prøver igjen.",
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": rateLimitResult.limit.toString(),
            "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
            "X-RateLimit-Reset": rateLimitResult.reset.toString(),
          },
        }
      );
    }
    debugLog(requestId, 'Rate limit OK');

    // 4. Parse and validate body
    const body = await request.json();
    debugLog(requestId, 'Request body:', { ...body, coverLetter: body.coverLetter ? '[REDACTED]' : undefined });
    
    const validation = applySchema.safeParse(body);

    if (!validation.success) {
      debugLog(requestId, 'VALIDATION FAILED:', validation.error.flatten().fieldErrors);
      return NextResponse.json(
        {
          error: "Ugyldig data",
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }
    debugLog(requestId, 'Validation OK');

    const { jobPostingId, candidateId, coverLetter, certificatesKey } = validation.data;
    debugLog(requestId, 'Parsed data:', { jobPostingId, candidateId, certificatesKey });

    // 5. Fetch candidate info from database (required - must be logged in)
    debugLog(requestId, 'Fetching candidate info:', candidateId);
    // Note: Using * to avoid TypeScript issues with outdated types
    const { data: candidate, error: candidateError } = await supabaseAdmin
      .from("candidates")
      .select("*")
      .eq("id", candidateId)
      .single();

    if (candidateError || !candidate) {
      debugLog(requestId, 'CANDIDATE NOT FOUND:', candidateError);
      return NextResponse.json(
        { error: "Kunne ikke finne din profil. Vennligst logg inn på nytt." },
        { status: 401 }
      );
    }
    
    // Use first_name/last_name if available, fallback to name column
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const c = candidate as any;
    const candidateName = (c.first_name && c.last_name 
      ? `${c.first_name} ${c.last_name}` 
      : candidate.name) || 'Ukjent';
    const candidateEmail = candidate.email;
    const candidatePhone = candidate.phone;
    debugLog(requestId, 'Candidate found:', { id: candidate.id, name: candidateName, email: candidateEmail });

    // 6. Check if job exists and is published
    debugLog(requestId, 'Fetching job posting:', jobPostingId);
    const { data: job, error: jobError } = await supabaseAdmin
      .from("job_postings")
      .select("id, title, company_name, contact_email")
      .eq("id", jobPostingId)
      .eq("status", "active")
      .single();

    if (jobError) {
      debugLog(requestId, 'JOB FETCH ERROR:', jobError);
    }

    if (jobError || !job) {
      debugLog(requestId, 'JOB NOT FOUND or not active');
      return NextResponse.json(
        { error: "Stillingen finnes ikke eller er ikke lenger aktiv." },
        { status: 404 }
      );
    }
    debugLog(requestId, 'Job found:', { id: job.id, title: job.title });

    // 7. Check for existing application by candidate for this job
    debugLog(requestId, 'Checking for existing application...');
    const { data: existingApp, error: existingAppError } = await supabaseAdmin
      .from("job_applications")
      .select("id")
      .eq("job_posting_id", jobPostingId)
      .eq("candidate_id", candidateId)
      .single();

    if (existingAppError && existingAppError.code !== 'PGRST116') {
      // PGRST116 = no rows returned (expected when no existing app)
      debugLog(requestId, 'EXISTING APP CHECK ERROR:', existingAppError);
    }

    if (existingApp) {
      debugLog(requestId, 'DUPLICATE APPLICATION - already applied');
      return NextResponse.json(
        { error: "Du har allerede søkt på denne stillingen." },
        { status: 409 }
      );
    }
    debugLog(requestId, 'No existing application - OK to proceed');

    // 8. Get logged in user session for verification
    let user = null;
    try {
      user = await getUser();
      debugLog(requestId, 'User session:', user ? { candidateId: user.candidateId, vippsVerified: user.vippsVerified } : null);
    } catch (error) {
      debugLog(requestId, 'Vipps auth not available (OK):', error);
    }

    // Use existing CV from candidate profile
    const finalCvKey = c.cv_key || null;

    // 9. Create application
    debugLog(requestId, 'Inserting application into database...');
    const insertData = {
      job_posting_id: jobPostingId,
      name: candidateName,
      email: candidateEmail.toLowerCase(),
      phone: candidatePhone,
      cover_letter: coverLetter,
      candidate_id: candidateId,
      cv_key: finalCvKey,
      certificates_key: certificatesKey || null,
      status: "pending",
      source: "website",
      ip_address: ip,
      user_agent: request.headers.get("user-agent") || null,
      vipps_verified: c.vipps_verified || user?.vippsVerified || false,
      vipps_name: candidateName,
      vipps_phone: candidatePhone,
      vipps_sub: c.vipps_sub || user?.vippsSub || null,
      vipps_verified_at: c.vipps_verified_at || (c.vipps_verified ? new Date().toISOString() : null),
    };
    debugLog(requestId, 'Insert data:', { ...insertData, cover_letter: '[REDACTED]' });

    const { data: application, error: insertError } = await supabaseAdmin
      .from("job_applications")
      .insert(insertData)
      .select()
      .single();

    if (insertError) {
      debugLog(requestId, 'DATABASE INSERT ERROR:', insertError);
      console.error("Application insert error:", insertError);

      // Return more specific error message for debugging
      const errorCode = insertError.code || 'UNKNOWN';
      const errorMsg = insertError.message || 'Database insert failed';
      const errorDetails = insertError.details || '';

      // Check for specific error types
      if (errorCode === '23505') {
        // Unique constraint violation - duplicate application
        return NextResponse.json(
          { error: "Du har allerede søkt på denne stillingen." },
          { status: 409 }
        );
      }

      if (errorCode === '23503') {
        // Foreign key violation - candidate or job doesn't exist
        return NextResponse.json(
          { error: "Ugyldig kandidat eller stilling. Prøv å logge inn på nytt." },
          { status: 400 }
        );
      }

      // In production, return generic error. In dev/staging, include details.
      const isProduction = process.env.NODE_ENV === 'production' && !process.env.VERCEL_ENV?.includes('preview');
      return NextResponse.json(
        {
          error: isProduction
            ? "Kunne ikke sende søknaden. Prøv igjen senere."
            : `Database error: ${errorCode} - ${errorMsg}${errorDetails ? ` (${errorDetails})` : ''}`,
        },
        { status: 500 }
      );
    }
    debugLog(requestId, 'Application inserted successfully:', { id: application.id });

    // 10. Send confirmation email to applicant
    debugLog(requestId, 'Sending confirmation email to applicant:', candidateEmail);
    try {
      const confirmResult = await sendEmail({
        to: candidateEmail,
        subject: `Søknad mottatt: ${job.title}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #0b1f3a 0%, #1e3a5f 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; font-size: 24px;">⚓ Bluecrew</h1>
              <div style="width: 50px; height: 50px; background: #10b981; border-radius: 50%; margin: 20px auto; display: flex; align-items: center; justify-content: center; font-size: 24px;">✓</div>
              <h2 style="margin: 10px 0 0 0;">Søknad mottatt!</h2>
            </div>
            <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
              <p style="font-size: 18px; color: #0b1f3a;">Hei ${candidateName.split(" ")[0]}! 👋</p>
              <p>Takk for at du søkte gjennom Bluecrew. Vi har mottatt søknaden din og vil gjennomgå den så snart som mulig.</p>
              <div style="background: white; border-left: 4px solid #0ea5e9; padding: 15px; margin: 20px 0; border-radius: 4px;">
                <strong style="color: #0b1f3a;">${job.title}</strong>
                ${job.company_name ? `<p style="color: #64748b; margin: 5px 0 0 0;">${job.company_name}</p>` : ""}
              </div>
              <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="font-weight: 500; color: #166534; margin: 0 0 10px 0;">📋 Hva skjer videre?</p>
                <ul style="color: #166534; margin: 0; padding-left: 20px;">
                  <li>Vi gjennomgår søknaden din</li>
                  <li>Ved match kontakter vi deg for en uformell prat</li>
                  <li>Du får beskjed uansett utfall</li>
                </ul>
              </div>
              <p style="text-align: center; margin-top: 25px;">
                <a href="https://bluecrew.no/stillinger" style="background: #0ea5e9; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 500;">Se flere stillinger</a>
              </p>
              <p style="text-align: center; color: #64748b; font-size: 12px; margin-top: 30px;">
                ✅ Godkjent bemanningsforetak · 🔒 BankID-verifisert
              </p>
            </div>
            <p style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 20px;">
              © 2026 Bluecrew AS · Harstad & Stavanger
            </p>
          </div>
        `,
      });
      if (confirmResult.success) {
        debugLog(requestId, 'Confirmation email SENT OK');
      } else {
        console.error(`[APPLY:${requestId}] CONFIRMATION EMAIL FAILED:`, confirmResult.error);
        debugLog(requestId, 'CONFIRMATION EMAIL FAILED:', confirmResult.error);
      }
    } catch (emailError) {
      console.error(`[APPLY:${requestId}] CONFIRMATION EMAIL EXCEPTION:`, emailError);
      debugLog(requestId, 'CONFIRMATION EMAIL EXCEPTION:', emailError);
      // Don't fail the request if email fails
    }

    // 10. Generate signed URLs for file downloads (valid for 1 year)
    let cvDownloadUrl: string | null = null;
    let certDownloadUrl: string | null = null;

    if (finalCvKey) {
      try {
        const { data } = await supabaseAdmin.storage
          .from("candidate-cvs")
          .createSignedUrl(finalCvKey, 60 * 60 * 24 * 365); // 1 year
        cvDownloadUrl = data?.signedUrl || null;
        debugLog(requestId, 'CV signed URL generated');
      } catch (e) {
        debugLog(requestId, 'CV signed URL error:', e);
      }
    }
    
    if (certificatesKey) {
      try {
        const { data } = await supabaseAdmin.storage
          .from("candidate-certificates")
          .createSignedUrl(certificatesKey, 60 * 60 * 24 * 365); // 1 year
        certDownloadUrl = data?.signedUrl || null;
        debugLog(requestId, 'Cert signed URL generated');
      } catch (e) {
        debugLog(requestId, 'Cert signed URL error:', e);
      }
    }

    // 11. Notify Bluecrew about new application
    const notifyEmails = process.env.RESEND_TO_EMAILS?.split(",") || ["isak@bluecrew.no"];
    debugLog(requestId, 'Sending notification email to Bluecrew:', notifyEmails);
    try {
      const notifyResult = await sendEmail({
        to: notifyEmails,
        subject: `🆕 Ny søknad: ${job.title} - ${candidateName}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 700px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #0b1f3a 0%, #1e3a5f 100%); color: white; padding: 20px 25px; border-radius: 8px 8px 0 0;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 18px; font-weight: 800;">⚓ Bluecrew Admin</span>
                <span style="background: #10b981; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 500;">NY SØKNAD</span>
              </div>
              <h1 style="margin: 15px 0 5px 0; font-size: 22px;">${job.title}</h1>
              ${job.company_name ? `<p style="opacity: 0.8; margin: 0;">${job.company_name}</p>` : ""}
            </div>
            
            <div style="background: #0ea5e9; padding: 12px 25px;">
              <a href="mailto:${candidateEmail}" style="color: white; text-decoration: none; font-weight: 500; margin-right: 20px;">📧 Send e-post</a>
              <a href="tel:${candidatePhone}" style="color: white; text-decoration: none; font-weight: 500;">📞 Ring ${candidatePhone}</a>
            </div>
            
            <div style="padding: 25px; border: 1px solid #e2e8f0; border-top: none;">
              <p style="font-size: 12px; font-weight: 500; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 15px 0;">👤 Kandidat</p>
              <div style="display: flex; gap: 15px; align-items: flex-start;">
                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #0ea5e9, #0b1f3a); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px; font-weight: 700;">
                  ${candidateName.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h2 style="margin: 0; font-size: 20px; color: #0b1f3a;">${candidateName}</h2>
                  <p style="margin: 8px 0; color: #475569; font-size: 14px;">
                    📧 <a href="mailto:${candidateEmail}" style="color: #0ea5e9;">${candidateEmail}</a> · 
                    📞 <a href="tel:${candidatePhone}" style="color: #0ea5e9;">${candidatePhone}</a>
                  </p>
                  <div style="margin-top: 10px;">
                    ${c.vipps_verified 
                      ? '<span style="background: #dcfce7; color: #166534; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: 500;">✅ Vipps-verifisert</span>' 
                      : '<span style="background: #fef3c7; color: #92400e; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: 500;">⚠️ Ikke verifisert</span>'}
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Document Downloads -->
            <div style="padding: 25px; border: 1px solid #e2e8f0; border-top: none; background: white;">
              <p style="font-size: 12px; font-weight: 500; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 15px 0;">📎 Dokumenter</p>
              <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                ${cvDownloadUrl 
                  ? `<a href="${cvDownloadUrl}" style="display: inline-flex; align-items: center; gap: 8px; background: #0ea5e9; color: white; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: 500; font-size: 14px;">📄 Last ned CV</a>`
                  : '<span style="background: #f1f5f9; color: #64748b; padding: 12px 20px; border-radius: 8px; font-size: 14px;">Ingen CV</span>'}
                ${certDownloadUrl 
                  ? `<a href="${certDownloadUrl}" style="display: inline-flex; align-items: center; gap: 8px; background: #8b5cf6; color: white; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: 500; font-size: 14px;">📜 Last ned sertifikater</a>`
                  : ''}
              </div>
              ${cvDownloadUrl || certDownloadUrl ? '<p style="color: #94a3b8; font-size: 11px; margin: 12px 0 0 0;">⏰ Lenker utløper om 1 år</p>' : ''}
            </div>
            
            <div style="padding: 25px; background: #fafafa; border: 1px solid #e2e8f0; border-top: none;">
              <p style="font-size: 12px; font-weight: 500; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 15px 0;">✉️ Følgebrev</p>
              ${coverLetter 
                ? `<div style="background: white; border: 1px solid #e2e8f0; border-left: 4px solid #0ea5e9; padding: 20px; border-radius: 6px; white-space: pre-wrap; line-height: 1.6;">${coverLetter}</div>`
                : '<p style="color: #94a3b8; font-style: italic;">Ingen følgebrev vedlagt</p>'}
            </div>
            
            <div style="padding: 15px 25px; background: #f8fafc; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px; display: flex; justify-content: space-between; align-items: center;">
              <span style="color: #64748b; font-size: 13px;">Mottatt: ${new Date().toLocaleString("no-NO", { dateStyle: "long", timeStyle: "short" })}</span>
              <a href="https://supabase.com/dashboard" style="color: #0ea5e9; text-decoration: none; font-size: 14px; font-weight: 500;">Åpne i Supabase →</a>
            </div>
          </div>
        `,
      });
      if (notifyResult.success) {
        debugLog(requestId, 'Notification email SENT OK');
      } else {
        console.error(`[APPLY:${requestId}] NOTIFICATION EMAIL FAILED:`, notifyResult.error);
        debugLog(requestId, 'NOTIFICATION EMAIL FAILED:', notifyResult.error);
      }
    } catch (emailError) {
      console.error(`[APPLY:${requestId}] NOTIFICATION EMAIL EXCEPTION:`, emailError);
      debugLog(requestId, 'NOTIFICATION EMAIL EXCEPTION:', emailError);
    }

    debugLog(requestId, '=== APPLICATION SUCCESS ===', { applicationId: application.id });
    return NextResponse.json(
      {
        success: true,
        applicationId: application.id,
        message: "Søknaden din er sendt!",
      },
      {
        status: 201,
        headers: {
          "X-RateLimit-Limit": rateLimitResult.limit.toString(),
          "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
          "X-RateLimit-Reset": rateLimitResult.reset.toString(),
        },
      }
    );
  } catch (error) {
    console.error(`[APPLY:${requestId}] UNCAUGHT ERROR:`, error);
    return NextResponse.json(
      { error: "En uventet feil oppstod. Prøv igjen senere." },
      { status: 500 }
    );
  }
}
