import { supabaseAdmin } from "@/lib/supabase/admin";
import { staffingNeedsSchema } from "@/lib/validations";
import { RATE_LIMITS } from "@/lib/rate-limit";
import { sendStaffingNeedsNotification, sendStaffingNeedsConfirmation } from "@/lib/email/send";
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
export async function POST(request: Request) {
  const { debugLog } = createDebugLogger('STAFFING');
  debugLog('=== START STAFFING REQUEST ===');

  try {
    const body = await request.json();
    debugLog('Request body:', { ...body, merknad: body.merknad ? '[REDACTED]' : undefined });

    // Honeypot spam check
    const honeypotResponse = checkHoneypot(body, "Takk for din henvendelse!", debugLog);
    if (honeypotResponse) return honeypotResponse;

    // CSRF validation
    const csrfError = validateCsrf(request, debugLog);
    if (csrfError) return csrfError;

    // Rate limiting
    const { response: rateLimitError, result: rateLimitResult, clientIp } = await checkRateLimit(
      request,
      'staffing',
      RATE_LIMITS.staffing,
      "Du har sendt for mange bemanningsforespørsler. Prøv igjen om en time.",
      debugLog
    );
    if (rateLimitError) return rateLimitError;

    // Validate input
    const { data: validatedData, error: validationError } = validateBody(body, staffingNeedsSchema, debugLog);
    if (validationError) return validationError;

    // Insert into Supabase
    debugLog('Inserting into database...');
    debugLog('Validated data:', validatedData);
    const insertData = {
      fartoytype: validatedData.fartoytype,
      stillinger: validatedData.stillinger,
      antall: validatedData.antall,
      oppstart: validatedData.oppstart || null,
      rotasjon: validatedData.rotasjon || null,
      kontakt_navn: validatedData.kontakt_navn,
      kontakt_epost: validatedData.kontakt_epost,
      kontakt_telefon: validatedData.kontakt_telefon || null,
      bedrift: validatedData.bedrift || null,
      merknad: validatedData.merknad || null,
      status: "new",
      metadata: {
        ip: clientIp,
        userAgent: request.headers.get("user-agent") || "unknown",
        priority: validatedData.antall >= 5 ? "high" : "normal",
      },
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: insertedData, error: dbError } = await (supabaseAdmin as any)
      .from("staffing_needs")
      .insert(insertData)
      .select()
      .single();

    if (dbError) {
      return handleDbError(dbError, "Kunne ikke lagre bemanningsforespørselen. Prøv igjen senere.", debugLog);
    }
    debugLog('Database insert OK:', { id: insertedData?.id });

    // Send email notification (fail-safe)
    debugLog('Sending email notification...');
    try {
      const emailResult = await sendStaffingNeedsNotification(validatedData);
      debugLog('Email result:', emailResult);
      
      // Send confirmation to the customer who submitted the form
      const confirmationResult = await sendStaffingNeedsConfirmation(validatedData);
      debugLog('Confirmation email result:', confirmationResult);
    } catch (emailError) {
      debugLog('EMAIL ERROR:', emailError);
    }

    debugLog('=== STAFFING SUCCESS ===');
    return createSuccessResponse(
      { id: insertedData?.id },
      "Takk for din forespørsel! Vi tar kontakt innen 24 timer.",
      rateLimitResult
    );
  } catch (error) {
    return handleUnexpectedError(error, debugLog);
  }
}

export async function GET() {
  return methodNotAllowed();
}
