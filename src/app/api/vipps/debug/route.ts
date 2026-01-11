import { NextResponse } from "next/server";

/**
 * Vipps Configuration Debug Endpoint
 *
 * Shows which Vipps environment variables are configured (not their values).
 * Only enabled in development mode.
 */
export async function GET() {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 });
  }

  const config = {
    VIPPS_CLIENT_ID: !!process.env.VIPPS_CLIENT_ID ? '✅ SET' : '❌ MISSING',
    VIPPS_CLIENT_SECRET: !!process.env.VIPPS_CLIENT_SECRET ? '✅ SET' : '❌ MISSING',
    VIPPS_SUBSCRIPTION_KEY: !!process.env.VIPPS_SUBSCRIPTION_KEY ? '✅ SET' : '❌ MISSING',
    VIPPS_BASE_URL: process.env.VIPPS_BASE_URL || 'DEFAULT: https://api.vipps.no',
    VIPPS_REDIRECT_URI: process.env.VIPPS_REDIRECT_URI || 'DEFAULT: https://bluecrew.no/api/vipps/callback',
    VIPPS_ISSUER: process.env.VIPPS_ISSUER || 'DEFAULT: https://api.vipps.no/access-management-1.0/access/',
    VIPPS_SESSION_SECRET: !!process.env.VIPPS_SESSION_SECRET ? '✅ SET' : '❌ MISSING',
    UPSTASH_REDIS_REST_URL: !!process.env.UPSTASH_REDIS_REST_URL ? '✅ SET' : '❌ MISSING',
    UPSTASH_REDIS_REST_TOKEN: !!process.env.UPSTASH_REDIS_REST_TOKEN ? '✅ SET' : '❌ MISSING',
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'NOT SET',
    NODE_ENV: process.env.NODE_ENV,
  };

  const allVippsConfigured =
    !!process.env.VIPPS_CLIENT_ID &&
    !!process.env.VIPPS_CLIENT_SECRET &&
    !!process.env.VIPPS_SUBSCRIPTION_KEY;

  const allRedisConfigured =
    !!process.env.UPSTASH_REDIS_REST_URL &&
    !!process.env.UPSTASH_REDIS_REST_TOKEN;

  return NextResponse.json({
    status: allVippsConfigured && allRedisConfigured ? 'OK' : 'MISSING_CONFIG',
    vipps_ready: allVippsConfigured,
    redis_ready: allRedisConfigured,
    config,
    note: 'Values show presence only, not actual secrets',
    help: {
      issue: 'If you see ❌ MISSING, add the variable to .env.local',
      redirect_uri: 'Make sure VIPPS_REDIRECT_URI matches what is configured in Vipps portal',
      local_testing: 'For localhost, set VIPPS_REDIRECT_URI=http://localhost:3000/api/vipps/callback and add it to Vipps portal',
    },
  }, { status: 200 });
}
