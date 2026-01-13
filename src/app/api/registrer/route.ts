import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { verifyCsrfToken } from "@/lib/csrf";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { getUser } from "@/lib/auth/get-user";
import { sendRegistrationNotification, sendRegistrationConfirmation } from "@/lib/email/send";

// Max file size: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Rate limit: 5 registrations per hour
const REGISTRATION_RATE_LIMIT = {
  limit: 5,
  windowMs: 60 * 60 * 1000, // 1 hour
};

// Allowed file types
const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
];

function debugLog(requestId: string, step: string, data?: unknown) {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[REGISTRER:${requestId}] ${step}`, data ? JSON.stringify(data, null, 2) : '');
  }
}

// Helper: Parse experience string like "3-5 år" to average years
function parseExperienceToYears(erfaring: string): number {
  if (!erfaring) return 0;
  const lower = erfaring.toLowerCase();
  if (lower.includes('nyutdannet') || lower.includes('under 1')) return 0;
  if (lower.includes('1-3')) return 2;
  if (lower.includes('3-5')) return 4;
  if (lower.includes('5-10')) return 7;
  if (lower.includes('over 10') || lower.includes('10+')) return 12;
  const match = erfaring.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

export async function POST(request: NextRequest) {
  const requestId = Math.random().toString(36).substring(7);
  debugLog(requestId, '=== START REGISTRATION ===');

  try {
    // Check if user is authenticated
    const user = await getUser();
    if (!user) {
      debugLog(requestId, 'NOT AUTHENTICATED');
      return NextResponse.json(
        { error: "Du må være logget inn for å fullføre registreringen" },
        { status: 401 }
      );
    }
    debugLog(requestId, 'User authenticated:', { candidateId: user.candidateId });

    // CSRF validation
    const csrfToken = request.headers.get("x-csrf-token");
    if (!csrfToken || !verifyCsrfToken(csrfToken)) {
      debugLog(requestId, 'CSRF FAILED');
      return NextResponse.json(
        { error: "Ugyldig sikkerhetstoken" },
        { status: 403 }
      );
    }
    debugLog(requestId, 'CSRF OK');

    // Rate limiting
    const clientIp = getClientIp(request);
    const rateLimitResult = await rateLimit(
      `registrer:${clientIp}`,
      REGISTRATION_RATE_LIMIT.limit,
      REGISTRATION_RATE_LIMIT.windowMs
    );

    if (!rateLimitResult.success) {
      debugLog(requestId, 'RATE LIMIT EXCEEDED');
      return NextResponse.json(
        { error: "Du har sendt for mange forespørsler. Prøv igjen om en time." },
        { status: 429 }
      );
    }
    debugLog(requestId, 'Rate limit OK');

    // Parse form data
    const formData = await request.formData();
    const candidateId = formData.get("candidateId") as string;
    const rolle = formData.get("rolle") as string;
    const erfaring = formData.get("erfaring") as string;
    const onskerMidlertidig = formData.get("onskerMidlertidig") as string;
    const tilgjengeligFra = formData.get("tilgjengeligFra") as string;
    const melding = formData.get("melding") as string;
    const stcwConsent = formData.get("stcwConsent") === "true";
    const gdprConsent = formData.get("gdprConsent") === "true";
    const cvFile = formData.get("cv") as File | null;
    const certsFile = formData.get("sertifikater") as File | null;

    debugLog(requestId, 'Form data:', {
      candidateId,
      rolle,
      erfaring,
      onskerMidlertidig,
      tilgjengeligFra,
      stcwConsent,
      gdprConsent,
      hasCv: !!cvFile,
      hasCerts: !!certsFile
    });

    // Validate required fields
    if (!rolle || !erfaring) {
      return NextResponse.json(
        { error: "Du må velge stilling og erfaring" },
        { status: 400 }
      );
    }

    if (!stcwConsent || !gdprConsent) {
      return NextResponse.json(
        { error: "Du må godta vilkårene for å fortsette" },
        { status: 400 }
      );
    }

    // Verify the candidateId matches the logged-in user
    if (candidateId !== user.candidateId) {
      debugLog(requestId, 'CANDIDATE ID MISMATCH');
      return NextResponse.json(
        { error: "Ugyldig forespørsel" },
        { status: 403 }
      );
    }

    // Upload files if provided
    let cvPath: string | null = null;
    let certsPath: string | null = null;

    if (cvFile && cvFile.size > 0) {
      debugLog(requestId, 'Uploading CV:', { name: cvFile.name, size: cvFile.size, type: cvFile.type });

      if (cvFile.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: "CV-filen er for stor. Maks 10MB." },
          { status: 400 }
        );
      }

      if (!ALLOWED_TYPES.includes(cvFile.type)) {
        return NextResponse.json(
          { error: "Ugyldig filtype for CV. Tillatte typer: PDF, Word" },
          { status: 400 }
        );
      }

      const timestamp = Date.now();
      const randomId = Math.random().toString(36).substring(7);
      const safeFileName = cvFile.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const fileName = `${timestamp}-${randomId}-${safeFileName}`;
      cvPath = `registrations/${candidateId}/${fileName}`;

      const arrayBuffer = await cvFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const { error: uploadError } = await supabaseAdmin.storage
        .from("candidate-cvs")
        .upload(cvPath, buffer, {
          contentType: cvFile.type,
          upsert: false,
        });

      if (uploadError) {
        debugLog(requestId, 'CV UPLOAD ERROR:', uploadError);
        return NextResponse.json(
          { error: "Kunne ikke laste opp CV. Prøv igjen." },
          { status: 500 }
        );
      }
      debugLog(requestId, 'CV uploaded:', cvPath);
    }

    if (certsFile && certsFile.size > 0) {
      debugLog(requestId, 'Uploading certificates:', { name: certsFile.name, size: certsFile.size, type: certsFile.type });

      if (certsFile.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: "Sertifikat-filen er for stor. Maks 10MB." },
          { status: 400 }
        );
      }

      if (!ALLOWED_TYPES.includes(certsFile.type)) {
        return NextResponse.json(
          { error: "Ugyldig filtype for sertifikater. Tillatte typer: PDF, Word, JPG, PNG" },
          { status: 400 }
        );
      }

      const timestamp = Date.now();
      const randomId = Math.random().toString(36).substring(7);
      const safeFileName = certsFile.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const fileName = `${timestamp}-${randomId}-${safeFileName}`;
      certsPath = `registrations/${candidateId}/${fileName}`;

      const arrayBuffer = await certsFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const { error: uploadError } = await supabaseAdmin.storage
        .from("candidate-certificates")
        .upload(certsPath, buffer, {
          contentType: certsFile.type,
          upsert: false,
        });

      if (uploadError) {
        debugLog(requestId, 'CERTS UPLOAD ERROR:', uploadError);
        return NextResponse.json(
          { error: "Kunne ikke laste opp sertifikater. Prøv igjen." },
          { status: 500 }
        );
      }
      debugLog(requestId, 'Certificates uploaded:', certsPath);
    }

    // Build update object with CORRECT column names from candidates table
    const now = new Date().toISOString();
    const updateData: Record<string, unknown> = {
      status: 'active',
      pipeline_stage: 'registrert', // Move past 'ny' stage
      // Consent tracking
      gdpr_consent: gdprConsent,
      gdpr_consent_date: gdprConsent ? now : null,
      stcw_consent: stcwConsent,
      stcw_consent_date: stcwConsent ? now : null,
    };

    // rolle -> primary_role (NOT 'role')
    if (rolle) {
      updateData.primary_role = rolle;
    }

    // erfaring -> experience_years (parse to integer)
    if (erfaring) {
      updateData.experience_years = parseExperienceToYears(erfaring);
    }
    
    // Store additional notes if provided
    if (melding) {
      updateData.internal_notes = `Melding ved registrering: ${melding}`;
    }

    // Optional fields
    if (tilgjengeligFra) updateData.availability_date = tilgjengeligFra;
    if (cvPath) updateData.cv_key = cvPath;

    debugLog(requestId, 'Updating candidate:', updateData);

    const { error: updateError } = await supabaseAdmin
      .from("candidates")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .update(updateData as any)
      .eq("id", candidateId);

    if (updateError) {
      debugLog(requestId, 'DATABASE UPDATE ERROR:', updateError);
      return NextResponse.json(
        { error: "Kunne ikke lagre profilen. Prøv igjen." },
        { status: 500 }
      );
    }

    debugLog(requestId, '=== REGISTRATION SUCCESS ===');

    // Create BlueCrew profile (source of truth for verified candidates)
    let shortId: string | null = null;
    if (cvPath) {
      try {
        // Parse name into first and last name
        const nameParts = (user.name || 'Ukjent').split(' ');
        const firstName = nameParts[0] || 'Ukjent';
        const lastName = nameParts.slice(1).join(' ') || '';

        const { data: profile, error: profileError } = await supabaseAdmin
          .from('bluecrew_profiles')
          .insert({
            candidate_id: candidateId,
            first_name: firstName,
            last_name: lastName,
            email: user.email || '',
            phone: user.phone || '',
            primary_role: rolle,
            experience_years: parseExperienceToYears(erfaring),
            cv_key: cvPath,
            cv_uploaded_at: now,
            gdpr_consent: gdprConsent,
            gdpr_consent_date: gdprConsent ? now : null,
            stcw_consent: stcwConsent,
            stcw_consent_date: stcwConsent ? now : null,
            national_id_number: user.nationalIdNumber || null,
          })
          .select('short_id')
          .single();

        if (profileError) {
          debugLog(requestId, 'PROFILE CREATE ERROR (non-blocking):', profileError);
        } else {
          shortId = profile?.short_id || null;
          debugLog(requestId, 'BlueCrew profile created:', { shortId });
        }
      } catch (profileErr) {
        debugLog(requestId, 'PROFILE CREATE EXCEPTION (non-blocking):', profileErr);
      }
    }

    // Send email notifications (don't block on failure)
    try {
      // Send notification to team
      const notificationResult = await sendRegistrationNotification({
        candidateId: candidateId,
        name: user.name || 'Ukjent',
        email: user.email || '',
        phone: user.phone,
        rolle: rolle,
        erfaring: erfaring,
        cvPath: cvPath,
        certsPath: certsPath,
        melding: melding,
        shortId: shortId,
      });
      debugLog(requestId, 'Team notification sent:', notificationResult);

      // Send confirmation to candidate
      if (user.email) {
        const confirmationResult = await sendRegistrationConfirmation({
          name: user.name || 'Kandidat',
          email: user.email,
          rolle: rolle,
          shortId: shortId,
        });
        debugLog(requestId, 'Candidate confirmation sent:', confirmationResult);
      }
    } catch (emailError) {
      // Log email errors but don't fail the registration
      debugLog(requestId, 'EMAIL ERROR (non-blocking):', emailError);
    }

    return NextResponse.json({
      success: true,
      message: "Profilen din er fullført!",
      shortId: shortId,
    });
  } catch (error) {
    debugLog(requestId, 'UNCAUGHT ERROR:', error);
    return NextResponse.json(
      { error: "En feil oppstod. Prøv igjen senere." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}
