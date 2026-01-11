import { supabaseAdmin } from "@/lib/supabase/admin";
import { contactSchema } from "@/lib/validations";
import { RATE_LIMITS } from "@/lib/rate-limit";
import { sendContactNotification, sendContactConfirmation } from "@/lib/email/send";
import {
  createDebugLogger,
  checkHoneypot,
  validateCsrf,
  checkRateLimit,
  validateBody,
  createSuccessResponse,
  handleDbError,
  handleUnexpectedError,
  methodNotAllowed,
} from "@/lib/api/middleware";
import type { Database } from "@/types/database.types";

export async function POST(request: Request) {
  const { debugLog } = createDebugLogger('CONTACT');
  debugLog('=== START CONTACT REQUEST ===');

  try {
    const body = await request.json();
    debugLog('Request body:', { ...body, melding: body.melding ? '[REDACTED]' : undefined });

    // Honeypot spam check
    const honeypotResponse = checkHoneypot(body, "Takk for din henvendelse!", debugLog);
    if (honeypotResponse) return honeypotResponse;

    // CSRF validation
    const csrfError = validateCsrf(request, debugLog);
    if (csrfError) return csrfError;

    // Rate limiting
    const { response: rateLimitError, result: rateLimitResult, clientIp } = await checkRateLimit(
      request,
      'contact',
      RATE_LIMITS.contact,
      "Du har sendt for mange henvendelser. Prøv igjen om en time.",
      debugLog
    );
    if (rateLimitError) return rateLimitError;

    // Validate input
    const { data: validatedData, error: validationError } = validateBody(body, contactSchema, debugLog);
    if (validationError) return validationError;

    // Insert into Supabase
    debugLog('Inserting into database...');
    const insertData: Database["public"]["Tables"]["contacts"]["Insert"] = {
      navn: validatedData.navn,
      epost: validatedData.epost,
      telefon: validatedData.telefon || null,
      melding: validatedData.melding,
      status: "new",
      metadata: {
        ip: clientIp,
        userAgent: request.headers.get("user-agent") || "unknown",
        gdprConsent: true,
        consentTimestamp: new Date().toISOString(),
      },
    };

    const { data: insertedData, error: dbError } = (await supabaseAdmin
      .from("contacts")
      .insert(insertData as never)
      .select()
      .single()) as {
      data: Database["public"]["Tables"]["contacts"]["Row"] | null;
      error: unknown;
    };

    if (dbError) {
      return handleDbError(dbError, "Kunne ikke lagre henvendelsen. Prøv igjen senere.", debugLog);
    }
    debugLog('Database insert OK:', { id: insertedData!.id });

    // Send email notification (fail-safe)
    debugLog('Sending email notification...');
    try {
      const emailResult = await sendContactNotification(validatedData);
      debugLog('Email result:', emailResult);
      
      // Send confirmation to the person who submitted the form
      const confirmationResult = await sendContactConfirmation(validatedData);
      debugLog('Confirmation email result:', confirmationResult);
    } catch (emailError) {
      debugLog('EMAIL ERROR:', emailError);
    }

    debugLog('=== CONTACT SUCCESS ===');
    return createSuccessResponse(
      { id: insertedData!.id },
      "Takk for din henvendelse! Vi tar kontakt snart.",
      rateLimitResult
    );
  } catch (error) {
    return handleUnexpectedError(error, debugLog);
  }
}

export async function GET() {
  return methodNotAllowed();
}
