import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { verifyCsrfToken } from "@/lib/csrf";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { getUser } from "@/lib/auth/get-user";
import { sendRegistrationNotification, sendRegistrationConfirmation } from "@/lib/email/send";

// Extend timeout for file uploads (Vercel default is 10s)
export const maxDuration = 60; // 60 seconds for large file uploads

// Max file size: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Rate limit: 5 registrations per hour
const REGISTRATION_RATE_LIMIT = {
  limit: 5,
  windowMs: 60 * 60 * 1000, // 1 hour
};

// Allowed file types
const CV_ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const CERT_ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
];

const CV_EXTENSIONS = [".pdf", ".doc", ".docx"];
const CERT_EXTENSIONS = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"];

function isAllowedUpload(file: File, allowedTypes: string[], allowedExts: string[]): boolean {
  const ext = "." + (file.name.split(".").pop() || "").toLowerCase();
  if (allowedTypes.includes(file.type)) return true;
  if (!file.type || file.type === "application/octet-stream") {
    return allowedExts.includes(ext);
  }
  return false;
}

function debugLog(requestId: string, step: string, data?: unknown) {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[REGISTRER:${requestId}] ${step}`, data ? JSON.stringify(data, null, 2) : '');
  }
}

function parseExperienceToYears(erfaring: string): number | null {
  if (!erfaring) return null;
  const lower = erfaring.toLowerCase();
  if (lower.includes("nyutdannet") || lower.includes("under 1")) return 0;
  if (lower.includes("1-3")) return 2;
  if (lower.includes("3-5")) return 4;
  if (lower.includes("5-10")) return 7;
  if (lower.includes("over 10") || lower.includes("10+")) return 12;
  const match = erfaring.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : null;
}

function buildAdditionalNotes(erfaring: string, melding: string): string | null {
  const notes: string[] = [];
  if (erfaring) notes.push(`Erfaring: ${erfaring}`);
  if (melding) notes.push(`Melding: ${melding}`);
  return notes.length > 0 ? notes.join("\n") : null;
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
    // Get all certificate files (multiple)
    const certsFiles = formData.getAll("sertifikater") as File[];

    debugLog(requestId, 'Form data:', {
      candidateId,
      rolle,
      erfaring,
      onskerMidlertidig,
      tilgjengeligFra,
      stcwConsent,
      gdprConsent,
      hasCv: !!cvFile,
      certsCount: certsFiles.filter(f => f.size > 0).length
    });

    // Validate required fields
    if (!rolle || !erfaring) {
      return NextResponse.json(
        { error: "Du må velge stilling og erfaring" },
        { status: 400 }
      );
    }

    if (onskerMidlertidig !== "true" && onskerMidlertidig !== "false") {
      return NextResponse.json(
        { error: "Du må velge om du ønsker midlertidig ansettelse." },
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
    const certsPaths: string[] = [];

    if (cvFile && cvFile.size > 0) {
      debugLog(requestId, 'Uploading CV:', { name: cvFile.name, size: cvFile.size, type: cvFile.type });

      if (cvFile.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: "CV-filen er for stor. Maks 10MB." },
          { status: 400 }
        );
      }

      if (!isAllowedUpload(cvFile, CV_ALLOWED_TYPES, CV_EXTENSIONS)) {
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

    // Upload multiple certificate files
    const validCertsFiles = certsFiles.filter(f => f.size > 0);
    if (validCertsFiles.length > 0) {
      debugLog(requestId, 'Uploading certificates:', validCertsFiles.map(f => ({ name: f.name, size: f.size })));

      for (const certFile of validCertsFiles) {
        if (certFile.size > MAX_FILE_SIZE) {
          return NextResponse.json(
            { error: `"${certFile.name}" er for stor. Maks 10MB per fil.` },
            { status: 400 }
          );
        }

        if (!isAllowedUpload(certFile, CERT_ALLOWED_TYPES, CERT_EXTENSIONS)) {
          return NextResponse.json(
            { error: `Ugyldig filtype for "${certFile.name}". Tillatte typer: PDF, Word, JPG, PNG` },
            { status: 400 }
          );
        }

        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substring(7);
        const safeFileName = certFile.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const fileName = `${timestamp}-${randomId}-${safeFileName}`;
        const certPath = `registrations/${candidateId}/${fileName}`;

        const arrayBuffer = await certFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const { error: uploadError } = await supabaseAdmin.storage
          .from("candidate-certificates")
          .upload(certPath, buffer, {
            contentType: certFile.type,
            upsert: false,
          });

        if (uploadError) {
          debugLog(requestId, 'CERT UPLOAD ERROR:', uploadError);
          return NextResponse.json(
            { error: `Kunne ikke laste opp "${certFile.name}". Prøv igjen.` },
            { status: 500 }
          );
        }
        certsPaths.push(certPath);
      }
      debugLog(requestId, 'All certificates uploaded:', certsPaths);
    }

    const now = new Date().toISOString();
    const experienceYears = parseExperienceToYears(erfaring);
    const notes = buildAdditionalNotes(erfaring, melding);

    // Legacy candidates (GDPR/phase-out)
    const legacyUpdateData: Record<string, unknown> = {
      status: "active",
      pipeline_stage: "registrert",
      primary_role: rolle,
      experience_years: experienceYears,
      availability_date: tilgjengeligFra || null,
      gdpr_consent: gdprConsent,
      gdpr_consent_date: gdprConsent ? now : null,
      stcw_consent: stcwConsent,
      stcw_consent_date: stcwConsent ? now : null,
      cv_key: cvPath || null,
      internal_notes: notes,
    };

    debugLog(requestId, "Updating legacy candidate:", legacyUpdateData);

    const { error: legacyUpdateError } = await supabaseAdmin
      .from("candidates")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .update(legacyUpdateData as any)
      .eq("id", candidateId);

    if (legacyUpdateError) {
      debugLog(requestId, "LEGACY UPDATE ERROR:", legacyUpdateError);
      return NextResponse.json(
        { error: "Kunne ikke lagre profilen. Prøv igjen." },
        { status: 500 }
      );
    }

    // New main table: bluecrew_profiles
    const nameParts = (user.name || "").trim().split(" ").filter(Boolean);
    const firstName = nameParts[0] || "Ukjent";
    const lastName = nameParts.slice(1).join(" ") || "Ukjent";

    const bluecrewProfileData: Record<string, unknown> = {
      id: candidateId,
      candidate_id: candidateId,
      first_name: firstName,
      last_name: lastName,
      email: user.email || "",
      phone: user.phone || "",
      primary_role: rolle,
      secondary_roles: [],
      experience_years: experienceYears ?? 0,
      cv_key: cvPath || "",
      gdpr_consent: gdprConsent,
      gdpr_consent_date: gdprConsent ? now : null,
      stcw_consent: stcwConsent,
      stcw_consent_date: stcwConsent ? now : null,
      status: "active",
      verified_at: now,
      updated_at: now,
    };

    debugLog(requestId, "Upserting bluecrew profile:", bluecrewProfileData);

    const { error: bluecrewUpsertError } = await supabaseAdmin
      .from("bluecrew_profiles")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .upsert(bluecrewProfileData as any, { onConflict: "id" });

    if (bluecrewUpsertError) {
      debugLog(requestId, "BLUECREW PROFILE UPSERT ERROR:", bluecrewUpsertError);
      return NextResponse.json(
        { error: "Kunne ikke lagre Bluecrew-profilen. Prøv igjen." },
        { status: 500 }
      );
    }

    debugLog(requestId, '=== REGISTRATION SUCCESS ===');

    // Send email notifications in parallel (non-blocking)
    // Using Promise.allSettled to not fail on email errors
    const emailPromises: Promise<unknown>[] = [
      sendRegistrationNotification({
        candidateId: candidateId,
        name: user.name || 'Ukjent',
        email: user.email || '',
        phone: user.phone,
        rolle: rolle,
        erfaring: erfaring,
        cvPath: cvPath,
        certsPath: certsPaths.length > 0 ? certsPaths.join(', ') : null,
        melding: melding,
      }),
    ];

    if (user.email) {
      emailPromises.push(
        sendRegistrationConfirmation({
          name: user.name || 'Kandidat',
          email: user.email,
          rolle: rolle,
        })
      );
    }

    // Fire emails but don't wait - respond immediately to user
    Promise.allSettled(emailPromises).then((results) => {
      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          debugLog(requestId, `Email ${index + 1} sent successfully`);
        } else {
          debugLog(requestId, `Email ${index + 1} failed:`, result.reason);
        }
      });
    });

    return NextResponse.json({
      success: true,
      message: "Profilen din er fullført!",
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
