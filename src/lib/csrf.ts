import { createHash, randomBytes } from "crypto";

const TOKEN_EXPIRY_MS = 60 * 60 * 1000; // 1 hour

// Lazy accessor to prevent build-time errors
function getCsrfSecret(): string {
  const secret = process.env.CSRF_SECRET;
  if (!secret) {
    // IMPORTANT: In production without CSRF_SECRET, use a fallback
    // This allows forms to work while logging the issue
    console.error("[CSRF] CSRF_SECRET environment variable is not set! Using fallback.");
    return "fallback-csrf-secret-please-set-env-var-in-production";
  }
  return secret;
}

/**
 * Generate a CSRF token
 * Format: timestamp:random:hash
 * Hash is created from timestamp + random + secret
 */
export function generateCsrfToken(): string {
  const timestamp = Date.now().toString();
  const random = randomBytes(16).toString("hex");

  const hash = createHash("sha256")
    .update(`${timestamp}:${random}:${getCsrfSecret()}`)
    .digest("hex");

  return `${timestamp}:${random}:${hash}`;
}

/**
 * Verify a CSRF token
 * Returns true if token is valid and not expired
 */
export function verifyCsrfToken(token: string): boolean {
  try {
    const [timestamp, random, hash] = token.split(":");

    if (!timestamp || !random || !hash) {
      return false;
    }

    // Check expiry
    const tokenTime = parseInt(timestamp, 10);
    if (isNaN(tokenTime)) {
      return false;
    }

    const now = Date.now();
    if (now - tokenTime > TOKEN_EXPIRY_MS) {
      return false;
    }

    // Verify hash
    const expectedHash = createHash("sha256")
      .update(`${timestamp}:${random}:${getCsrfSecret()}`)
      .digest("hex");

    // Use timing-safe comparison
    return timingSafeEqual(hash, expectedHash);
  } catch {
    // Token parsing failed - invalid format or tampered token
    // Don't log error details in production to prevent information leakage
    return false;
  }
}

/**
 * Timing-safe string comparison to prevent timing attacks
 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return result === 0;
}
