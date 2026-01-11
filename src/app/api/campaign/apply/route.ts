import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { z } from "zod";
import {
  createDebugLogger,
  checkHoneypot,
  validateCsrf,
  checkRateLimit,
  handleUnexpectedError,
  methodNotAllowed,
} from "@/lib/api/middleware";

// Rate limit - 10 per hour (production setting)
const CAMPAIGN_RATE_LIMIT = { limit: 10, windowMs: 3600 * 1000 };

// Validation schema
const campaignApplicationSchema = z.object({
  navn: z.string().min(2, "Navn må være minst 2 tegn"),
  epost: z.string().email("Ugyldig e-postadresse"),
  telefon: z.string().min(8, "Telefonnummer må være minst 8 siffer"),
  stilling: z.string().min(1, "Stilling er påkrevd"),
  segment: z.enum(["offshore", "oppdrett", "shipping"]),
  godtarVilkar: z.boolean().refine((val) => val === true, {
    message: "Du må godta vilkårene",
  }),
  markedsforing: z.boolean().optional(),
  // Extra role-specific fields
  erfaring: z.string().optional(),
  offshoreErfaring: z.string().optional(),
  rovRolle: z.string().optional(),
  sertifikater: z.string().optional(),
  fagomrade: z.string().optional(),
  // Honeypot
  website: z.string().optional(),
});

export async function POST(request: Request) {
  const { debugLog } = createDebugLogger("CAMPAIGN_APPLICATION");
  debugLog("=== START CAMPAIGN APPLICATION ===");

  try {
    const body = await request.json();
    debugLog("Request body:", { ...body, epost: "[REDACTED]" });

    // Honeypot spam check
    const honeypotResponse = checkHoneypot(body, "Takk for din søknad!", debugLog);
    if (honeypotResponse) return honeypotResponse;

    // CSRF validation
    const csrfError = validateCsrf(request, debugLog);
    if (csrfError) return csrfError;

    // Rate limiting (100/hour for testing, change to 10 for prod)
    const { response: rateLimitError } = await checkRateLimit(
      request,
      "campaign_apply",
      CAMPAIGN_RATE_LIMIT,
      "Du har sendt for mange søknader. Prøv igjen om en time.",
      debugLog
    );
    if (rateLimitError) return rateLimitError;

    // Validate input
    const validation = campaignApplicationSchema.safeParse(body);
    if (!validation.success) {
      debugLog("Validation failed:", validation.error.errors);
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const data = validation.data;
    debugLog("Validation passed, checking for duplicates...");

    // Check for duplicate (same email + position in last 24h)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: existing, error: checkError } = await (supabaseAdmin as any)
      .from("campaign_applications")
      .select("id")
      .eq("email", data.epost.toLowerCase())
      .eq("position", data.stilling)
      .gte("created_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()) // 24 hours
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      debugLog("Duplicate check error:", checkError);
    }
    debugLog("Duplicate check complete, existing:", existing);

    if (existing) {
      debugLog("Duplicate application detected");
      return NextResponse.json(
        { error: "Du har allerede søkt på denne stillingen. Vi tar kontakt snart!" },
        { status: 400 }
      );
    }

    debugLog("Inserting into database...");
    
    // Insert into campaign_applications
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: inserted, error: dbError } = await (supabaseAdmin as any)
      .from("campaign_applications")
      .insert({
        name: data.navn,
        email: data.epost.toLowerCase().trim(),
        phone: data.telefon,
        position: data.stilling,
        segment: data.segment,
        gdpr_consent: true,
        gdpr_consent_date: new Date().toISOString(),
        marketing_consent: data.markedsforing || false,
        status: "ny",
        campaign: "stillinger-2026",
        source_url: request.headers.get("referer") || null,
        notes: JSON.stringify({
          erfaring: data.erfaring,
          offshoreErfaring: data.offshoreErfaring,
          rovRolle: data.rovRolle,
          sertifikater: data.sertifikater,
          fagomrade: data.fagomrade,
        }),
      })
      .select()
      .single();

    if (dbError) {
      debugLog("Database error:", dbError);
      return NextResponse.json(
        { error: "Kunne ikke lagre søknaden. Prøv igjen." },
        { status: 500 }
      );
    }

    debugLog("Application saved:", inserted?.id);

    // NOTE: No email sent here - email is sent after Vipps verification in /api/campaign/complete
    // This prevents duplicate emails and ensures we have complete data (CV, profile link)

    debugLog("=== CAMPAIGN APPLICATION SUCCESS ===");

    return NextResponse.json({
      success: true,
      message: "Søknad mottatt! Vi tar kontakt innen 24 timer.",
      id: inserted?.id,
    });
  } catch (error) {
    return handleUnexpectedError(error, debugLog);
  }
}

export async function GET() {
  return methodNotAllowed();
}
