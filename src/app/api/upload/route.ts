import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { verifyCsrfToken } from "@/lib/csrf";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { getUser } from "@/lib/auth/get-user";

// Max file size: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Rate limit: 20 uploads per hour (generous for multiple applications)
const UPLOAD_RATE_LIMIT = {
  limit: 20,
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

const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"];

function debugLog(requestId: string, step: string, data?: unknown) {
  console.log(`[UPLOAD:${requestId}] ${step}`, data ? JSON.stringify(data, null, 2) : '');
}

export async function POST(request: NextRequest) {
  const requestId = Math.random().toString(36).substring(7);
  debugLog(requestId, '=== START FILE UPLOAD ===');

  try {
    // CSRF validation
    const csrfToken = request.headers.get("x-csrf-token");
    if (!csrfToken || !verifyCsrfToken(csrfToken)) {
      debugLog(requestId, 'CSRF FAILED');
      return NextResponse.json(
        { error: "Ugyldig sikkerhetstoken" },
        { status: 403 }
      );
    }

    // Authentication check - required for file uploads
    const user = await getUser();
    if (!user) {
      debugLog(requestId, 'AUTH FAILED - no user');
      return NextResponse.json(
        { error: "Du må være logget inn for å laste opp filer" },
        { status: 401 }
      );
    }
    debugLog(requestId, 'User authenticated:', user.candidateId);

    // Rate limiting
    const clientIp = getClientIp(request);
    debugLog(requestId, 'Client IP:', clientIp);
    
    const rateLimitResult = await rateLimit(
      `upload:${clientIp}`,
      UPLOAD_RATE_LIMIT.limit,
      UPLOAD_RATE_LIMIT.windowMs
    );
    debugLog(requestId, 'Rate limit result:', rateLimitResult);

    if (!rateLimitResult.success) {
      debugLog(requestId, 'RATE LIMIT EXCEEDED');
      return NextResponse.json(
        { error: "Du har lastet opp for mange filer. Prøv igjen om en time." },
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

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const type = formData.get("type") as string; // 'cv' or 'certificates'
    const applicationId = formData.get("applicationId") as string | null;

    debugLog(requestId, 'Upload request:', { 
      fileName: file?.name, 
      fileSize: file?.size, 
      fileType: file?.type,
      uploadType: type,
      applicationId 
    });

    if (!file) {
      return NextResponse.json(
        { error: "Ingen fil lastet opp" },
        { status: 400 }
      );
    }

    if (!type || !["cv", "certificates"].includes(type)) {
      return NextResponse.json(
        { error: "Ugyldig filtype-kategori" },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      debugLog(requestId, 'FILE TOO LARGE:', file.size);
      return NextResponse.json(
        { error: "Filen er for stor. Maks 10MB." },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      debugLog(requestId, 'INVALID FILE TYPE:', file.type);
      return NextResponse.json(
        { error: "Ugyldig filtype. Tillatte typer: PDF, Word, JPG, PNG" },
        { status: 400 }
      );
    }

    // Validate extension
    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      debugLog(requestId, 'INVALID EXTENSION:', ext);
      return NextResponse.json(
        { error: "Ugyldig filendelse" },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(7);
    const safeFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const fileName = `${timestamp}-${randomId}-${safeFileName}`;
    
    // Choose bucket based on type
    const bucket = type === "cv" ? "candidate-cvs" : "candidate-certificates";
    const filePath = applicationId ? `applications/${applicationId}/${fileName}` : `uploads/${fileName}`;

    debugLog(requestId, 'Uploading to:', { bucket, filePath });

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Supabase Storage
    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      debugLog(requestId, 'UPLOAD ERROR:', error);
      return NextResponse.json(
        { error: "Kunne ikke laste opp filen. Prøv igjen." },
        { status: 500 }
      );
    }

    debugLog(requestId, '=== UPLOAD SUCCESS ===', { path: data.path });

    return NextResponse.json({
      success: true,
      path: data.path,
      bucket,
      fileName: file.name,
    });
  } catch (error) {
    debugLog(requestId, 'UNCAUGHT ERROR:', error);
    return NextResponse.json(
      { error: "En feil oppstod ved opplasting" },
      { status: 500 }
    );
  }
}
