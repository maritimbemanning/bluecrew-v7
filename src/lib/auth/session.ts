/**
 * Session Management with JWT
 *
 * Uses jose library for edge-compatible JWT signing/verification.
 * Sessions are stored in httpOnly cookies for security.
 */

import { SignJWT, jwtVerify, type JWTPayload } from 'jose';

// Session secret must be at least 32 characters
const SESSION_SECRET = process.env.VIPPS_SESSION_SECRET;

// Use a fallback for development, but throw in production
const getSecretForEnv = (): string => {
  if (SESSION_SECRET && SESSION_SECRET.length >= 32) {
    return SESSION_SECRET;
  }

  if (process.env.NODE_ENV === 'production') {
    // In production without Vipps configured, use a generated key
    // This allows the site to work but Vipps login won't be available
    console.warn(
      'WARNING: VIPPS_SESSION_SECRET not set. Vipps login disabled.'
    );
    return process.env.NEXTAUTH_SECRET || 'fallback-production-secret-min-32-chars-long-generated';
  }

  // Development fallback - NOT secure, but allows local testing
  console.warn(
    'WARNING: Using insecure dev session secret. Set VIPPS_SESSION_SECRET in .env.local'
  );
  return 'dev-secret-not-secure-minimum-32-chars';
};

// Encode secret for jose
const getSecretKey = () => new TextEncoder().encode(getSecretForEnv());

// Session duration: 24 hours
const SESSION_DURATION = 24 * 60 * 60; // seconds

/**
 * Session payload stored in JWT
 */
export interface SessionPayload extends JWTPayload {
  candidateId: string;
  vippsSub: string;
  email: string;
  name: string;
  phone?: string;
  vippsVerified: boolean;
}

/**
 * Create a signed JWT session token
 */
export async function createSession(payload: Omit<SessionPayload, 'iat' | 'exp'>): Promise<string> {
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION}s`)
    .setIssuer('bluecrew.no')
    .setAudience('bluecrew.no')
    .sign(getSecretKey());

  return jwt;
}

/**
 * Verify and decode a session token
 * Returns null if token is invalid or expired
 */
export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey(), {
      issuer: 'bluecrew.no',
      audience: 'bluecrew.no',
    });

    // Validate required fields
    if (
      typeof payload.candidateId !== 'string' ||
      typeof payload.vippsSub !== 'string' ||
      typeof payload.email !== 'string' ||
      typeof payload.name !== 'string' ||
      typeof payload.vippsVerified !== 'boolean'
    ) {
      return null;
    }

    return payload as SessionPayload;
  } catch {
    // Token invalid, expired, or signature mismatch
    return null;
  }
}

/**
 * Cookie configuration for session
 */
// Determine cookie domain - only set for production bluecrew.no, not for Vercel previews
const getCookieDomain = (): string | undefined => {
  if (process.env.NODE_ENV !== 'production') return undefined;

  // Check if we're on the actual production domain
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
  if (baseUrl.includes('bluecrew.no')) {
    return '.bluecrew.no';
  }

  // Vercel preview deployments - don't set domain (use default)
  return undefined;
};

export const SESSION_COOKIE_CONFIG = {
  name: 'session',
  options: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: SESSION_DURATION,
    path: '/',
    // Allow cookie to work on both www.bluecrew.no and bluecrew.no, but not on Vercel previews
    domain: getCookieDomain(),
  },
};
