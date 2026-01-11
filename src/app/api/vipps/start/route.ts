import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { generateVippsAuthUrl, generateOAuthState } from "@/lib/vipps/oauth";
import { errorResponse, HttpStatus } from "@/lib/api/types";

// Debug helper
function debugLog(requestId: string, step: string, data?: unknown) {
  console.log(`[VIPPS-START:${requestId}] ${step}`, data ? JSON.stringify(data, null, 2) : '');
}

// Lazy initialization to prevent build-time errors
let _redis: Redis | null = null;
function getRedis(): Redis {
  if (!_redis) {
    _redis = Redis.fromEnv();
  }
  return _redis;
}

/**
 * Vipps OAuth Start Endpoint
 *
 * Initiates the Vipps Login OAuth flow:
 * 1. Generates a random state parameter for CSRF protection
 * 2. Stores state in Redis with 10-minute TTL
 * 3. Redirects user to Vipps authorization page
 *
 * Query parameters:
 * - returnTo: URL to redirect to after successful login (default: /profil)
 */
export async function GET(request: Request) {
  const requestId = Math.random().toString(36).substring(7);
  debugLog(requestId, '=== START VIPPS LOGIN FLOW ===');

  // Use request origin instead of env variable (supports localhost:3004 and production)
  const requestUrl = new URL(request.url);
  const baseUrl = `${requestUrl.protocol}//${requestUrl.host}`;
  debugLog(requestId, 'Base URL (from request):', baseUrl);

  try {
    // VALIDATE VIPPS CONFIG FIRST - before doing anything else
    const missingVars: string[] = [];
    if (!process.env.VIPPS_CLIENT_ID) missingVars.push('VIPPS_CLIENT_ID');
    if (!process.env.VIPPS_CLIENT_SECRET) missingVars.push('VIPPS_CLIENT_SECRET');
    if (!process.env.VIPPS_SUBSCRIPTION_KEY) missingVars.push('VIPPS_SUBSCRIPTION_KEY');

    if (missingVars.length > 0) {
      debugLog(requestId, 'ERROR: Missing Vipps config:', missingVars);
      console.error('Missing Vipps environment variables:', missingVars);
      return NextResponse.redirect(
        `${baseUrl}/logg-inn?error=${encodeURIComponent("Vipps er ikke konfigurert. Kontakt administrator.")}`
      );
    }
    debugLog(requestId, 'Vipps config OK');

    // Check Redis config
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      debugLog(requestId, 'ERROR: Redis not configured!');
      console.error('Missing Redis environment variables');
      return NextResponse.redirect(
        `${baseUrl}/logg-inn?error=${encodeURIComponent("Serverfeil: Redis ikke konfigurert. Kontakt administrator.")}`
      );
    }
    debugLog(requestId, 'Redis config OK');

    const { searchParams } = new URL(request.url);
    const returnTo = searchParams.get("returnTo") || "/profil";
    debugLog(requestId, 'Return URL:', returnTo);

    // Validate returnTo is a relative path (prevent open redirect)
    if (!returnTo.startsWith("/") || returnTo.startsWith("//")) {
      debugLog(requestId, 'INVALID RETURN URL');
      return NextResponse.redirect(
        `${baseUrl}/logg-inn?error=${encodeURIComponent("Ugyldig redirect-URL")}`
      );
    }

    // Generate random state for CSRF protection
    const state = generateOAuthState();
    debugLog(requestId, 'Generated state (first 8 chars):', state.substring(0, 8));

    // Store state in Redis with 30-minute expiry (increased from 10 min for slow connections)
    debugLog(requestId, 'Storing state in Redis...');
    try {
      await getRedis().setex(
        `vipps:state:${state}`,
        1800, // 30 minutes
        JSON.stringify({
          returnTo,
          createdAt: Date.now(),
        })
      );
      debugLog(requestId, 'State stored in Redis OK');
    } catch (redisError) {
      debugLog(requestId, 'REDIS ERROR:', redisError);
      console.error('Redis error storing state:', redisError);
      return NextResponse.redirect(
        `${baseUrl}/logg-inn?error=${encodeURIComponent("Kunne ikke starte pålogging. Prøv igjen.")}`
      );
    }

    // Generate Vipps authorization URL with dynamic redirect URI
    const redirectUri = `${baseUrl}/api/vipps/callback`;
    const authUrl = generateVippsAuthUrl(state, redirectUri);
    debugLog(requestId, 'Auth URL generated:', authUrl);
    debugLog(requestId, 'Using redirect URI:', redirectUri);

    debugLog(requestId, '=== REDIRECTING TO VIPPS ===');
    // Redirect user to Vipps login
    return NextResponse.redirect(authUrl);
  } catch (error) {
    debugLog(requestId, 'UNCAUGHT ERROR:', error);
    console.error("Vipps OAuth start error:", error);
    return NextResponse.redirect(
      `${baseUrl}/logg-inn?error=${encodeURIComponent("Kunne ikke starte Vipps-pålogging. Prøv igjen senere.")}`
    );
  }
}

// Disable other methods
export async function POST() {
  return NextResponse.json(errorResponse("Method not allowed"), {
    status: HttpStatus.METHOD_NOT_ALLOWED,
  });
}
