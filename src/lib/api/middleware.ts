import { NextResponse } from "next/server";
import { ZodError, type ZodSchema } from "zod";
import { verifyCsrfToken } from "@/lib/csrf";
import { rateLimit, getClientIp, type RateLimitResult } from "@/lib/rate-limit";
import { successResponse, errorResponse, HttpStatus } from "@/lib/api/types";

// Type definitions
export type DebugLogger = (step: string, data?: unknown) => void;

export interface RequestContext {
  requestId: string;
  clientIp: string;
  userAgent: string;
  debugLog: DebugLogger;
  rateLimitResult: RateLimitResult;
}

// Create debug logger for API routes
const isProduction = process.env.NODE_ENV === 'production';
export function createDebugLogger(prefix: string): { requestId: string; debugLog: DebugLogger } {
  const requestId = Math.random().toString(36).substring(7);
  const debugLog: DebugLogger = (step: string, data?: unknown) => {
    if (!isProduction) {
      console.log(`[${prefix}:${requestId}] ${step}`, data ? JSON.stringify(data, null, 2) : '');
    }
  };
  return { requestId, debugLog };
}

// Check honeypot field - returns response if spam detected, null otherwise
export function checkHoneypot(
  body: Record<string, unknown>,
  successMessage: string,
  debugLog: DebugLogger
): NextResponse | null {
  if (body.website) {
    debugLog('HONEYPOT TRIGGERED - spam blocked');
    return NextResponse.json(
      successResponse({ id: 'spam-blocked' }, successMessage),
      { status: HttpStatus.CREATED }
    );
  }
  return null;
}

// Validate CSRF token - returns error response if invalid, null if valid
export function validateCsrf(
  request: Request,
  debugLog: DebugLogger
): NextResponse | null {
  const csrfToken = request.headers.get("x-csrf-token");
  debugLog('CSRF token present:', !!csrfToken);

  if (!csrfToken || !verifyCsrfToken(csrfToken)) {
    debugLog('CSRF FAILED');
    return NextResponse.json(
      errorResponse("Invalid or missing CSRF token"),
      { status: HttpStatus.FORBIDDEN }
    );
  }
  debugLog('CSRF OK');
  return null;
}

// Handle rate limiting - returns error response if exceeded, null with result if ok
export async function checkRateLimit(
  request: Request,
  key: string,
  limits: { limit: number; windowMs: number },
  errorMessage: string,
  debugLog: DebugLogger
): Promise<{ response: NextResponse | null; result: RateLimitResult; clientIp: string }> {
  const clientIp = getClientIp(request);
  debugLog('Client IP:', clientIp);

  const result = await rateLimit(`${key}:${clientIp}`, limits.limit, limits.windowMs);
  debugLog('Rate limit result:', result);

  if (!result.success) {
    debugLog('RATE LIMIT EXCEEDED');
    return {
      response: NextResponse.json(
        errorResponse(errorMessage),
        {
          status: HttpStatus.TOO_MANY_REQUESTS,
          headers: {
            "X-RateLimit-Limit": result.limit.toString(),
            "X-RateLimit-Remaining": result.remaining.toString(),
            "X-RateLimit-Reset": result.reset.toString(),
          },
        }
      ),
      result,
      clientIp,
    };
  }
  debugLog('Rate limit OK');
  return { response: null, result, clientIp };
}

// Validate request body with Zod schema
export function validateBody<T>(
  body: unknown,
  schema: ZodSchema<T>,
  debugLog: DebugLogger
): { data: T; error: null } | { data: null; error: NextResponse } {
  debugLog('Validating input...');
  try {
    const data = schema.parse(body);
    debugLog('Validation OK');
    return { data, error: null };
  } catch (err) {
    if (err instanceof ZodError) {
      debugLog('VALIDATION ERROR:', err.issues);
      return {
        data: null,
        error: NextResponse.json(
          errorResponse("Ugyldig data", err.issues),
          { status: HttpStatus.BAD_REQUEST }
        ),
      };
    }
    throw err;
  }
}

// Create success response with rate limit headers
export function createSuccessResponse(
  data: { id: string | number },
  message: string,
  rateLimitResult: RateLimitResult
): NextResponse {
  return NextResponse.json(
    successResponse(data, message),
    {
      status: HttpStatus.CREATED,
      headers: {
        "X-RateLimit-Limit": rateLimitResult.limit.toString(),
        "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
        "X-RateLimit-Reset": rateLimitResult.reset.toString(),
      },
    }
  );
}

// Handle unexpected errors
export function handleUnexpectedError(
  error: unknown,
  debugLog: DebugLogger
): NextResponse {
  // Properly serialize error for logging
  const errorDetails = error instanceof Error 
    ? { name: error.name, message: error.message, stack: error.stack }
    : error;
  debugLog('UNCAUGHT ERROR:', errorDetails);
  console.error('Full error:', error);
  return NextResponse.json(
    errorResponse("En uventet feil oppstod. Prøv igjen senere."),
    { status: HttpStatus.INTERNAL_SERVER_ERROR }
  );
}

// Handle database insert errors
export function handleDbError(
  error: unknown,
  errorMessage: string,
  debugLog: DebugLogger
): NextResponse {
  debugLog('DATABASE INSERT ERROR:', error);
  return NextResponse.json(
    errorResponse(errorMessage),
    { status: HttpStatus.INTERNAL_SERVER_ERROR }
  );
}

// Method not allowed response
export function methodNotAllowed(): NextResponse {
  return NextResponse.json(
    errorResponse("Method not allowed"),
    { status: HttpStatus.METHOD_NOT_ALLOWED }
  );
}
