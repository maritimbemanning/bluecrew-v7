/**
 * Vipps Login OAuth Integration
 *
 * References:
 * - Vipps Login API: https://vippsas.github.io/vipps-login-api/
 * - OAuth 2.0 spec: https://tools.ietf.org/html/rfc6749
 */

import * as jose from "jose";

const VIPPS_BASE_URL = process.env.VIPPS_BASE_URL || "https://api.vipps.no";
const VIPPS_ISSUER = process.env.VIPPS_ISSUER || "https://api.vipps.no/access-management-1.0/access/";
const VIPPS_CLIENT_ID = process.env.VIPPS_CLIENT_ID;
const VIPPS_CLIENT_SECRET = process.env.VIPPS_CLIENT_SECRET;
const VIPPS_SUBSCRIPTION_KEY = process.env.VIPPS_SUBSCRIPTION_KEY;
// Dynamic redirect URI based on environment
// Priority: VIPPS_REDIRECT_URI > NEXT_PUBLIC_BASE_URL > fallback to production
function getVippsRedirectUri(): string {
  if (process.env.VIPPS_REDIRECT_URI) {
    return process.env.VIPPS_REDIRECT_URI;
  }
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bluecrew.no";
  return `${baseUrl}/api/vipps/callback`;
}

const VIPPS_REDIRECT_URI = getVippsRedirectUri();

// OAuth scopes for user data
// See: https://developer.vippsmobilepay.com/api/login/
const SCOPES = [
  "openid",
  "name",
  "email",
  "phoneNumber",
  "birthDate",
  // "nnin", // National Identity Number - requires special approval, disabled by default
];

/**
 * Vipps OAuth token response
 */
export interface VippsTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
  id_token: string;
}

/**
 * Vipps user info response
 */
export interface VippsUserInfo {
  sub: string; // Unique user ID (vipps_sub)
  name?: string;
  given_name?: string;
  family_name?: string;
  email?: string;
  email_verified?: boolean;
  phone_number?: string;
  phone_number_verified?: boolean;
  birthdate?: string; // YYYY-MM-DD
  nin?: string; // National ID (11 digits)
  address?: {
    street_address?: string;
    postal_code?: string;
    region?: string;
    country?: string;
  };
}

/**
 * Generate Vipps OAuth authorization URL
 * @param state - Random state parameter for CSRF protection
 * @param redirectUri - Optional custom redirect URI (defaults to getVippsRedirectUri())
 * @returns Authorization URL to redirect user to
 * @throws Error if VIPPS_CLIENT_ID is not configured
 */
export function generateVippsAuthUrl(state: string, redirectUri?: string): string {
  if (!VIPPS_CLIENT_ID) {
    throw new Error('VIPPS_CLIENT_ID is not configured');
  }

  const params = new URLSearchParams({
    client_id: VIPPS_CLIENT_ID,
    response_type: "code",
    scope: SCOPES.join(" "),
    state,
    redirect_uri: redirectUri || VIPPS_REDIRECT_URI,
  });

  return `${VIPPS_BASE_URL}/access-management-1.0/access/oauth2/auth?${params}`;
}

/**
 * Exchange authorization code for access token
 * @param code - Authorization code from callback
 * @param redirectUri - The redirect URI used during authorization (must match exactly)
 * @returns Token response with access_token and id_token
 */
export async function exchangeVippsCode(
  code: string,
  redirectUri?: string
): Promise<VippsTokenResponse> {
  const response = await fetch(
    `${VIPPS_BASE_URL}/access-management-1.0/access/oauth2/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${VIPPS_CLIENT_ID}:${VIPPS_CLIENT_SECRET}`
        ).toString("base64")}`,
        "Ocp-Apim-Subscription-Key": VIPPS_SUBSCRIPTION_KEY!,
        "Vipps-System-Name": "Bluecrew",
        "Vipps-System-Version": "1.0",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri || VIPPS_REDIRECT_URI,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    console.error("Vipps token exchange error:", response.status, error);
    throw new Error(`Vipps token exchange failed: ${error}`);
  }

  return response.json();
}

/**
 * Fetch user info from Vipps using access token
 * @param accessToken - Access token from token exchange
 * @returns User information from Vipps
 */
export async function getVippsUserInfo(
  accessToken: string
): Promise<VippsUserInfo> {
  // Note: Vipps docs show endpoint with trailing slash
  const response = await fetch(
    `${VIPPS_BASE_URL}/vipps-userinfo-api/userinfo/`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Ocp-Apim-Subscription-Key": VIPPS_SUBSCRIPTION_KEY!,
        "Vipps-System-Name": "Bluecrew",
        "Vipps-System-Version": "1.0",
      },
    }
  );

  if (!response.ok) {
    const error = await response.text();
    console.error("Vipps userinfo error:", response.status, error);
    throw new Error(`Vipps userinfo fetch failed: ${error}`);
  }

  return response.json();
}

// Cache for JWKS to avoid fetching on every verification
let jwksCache: jose.JWTVerifyGetKey | null = null;
let jwksCacheTime = 0;
const JWKS_CACHE_TTL = 3600000; // 1 hour in ms

/**
 * Get JWKS (JSON Web Key Set) from Vipps for token verification
 * Caches the JWKS for 1 hour to reduce API calls
 */
async function getVippsJWKS(): Promise<jose.JWTVerifyGetKey> {
  const now = Date.now();
  
  if (jwksCache && (now - jwksCacheTime) < JWKS_CACHE_TTL) {
    return jwksCache;
  }

  const jwksUrl = `${VIPPS_BASE_URL}/access-management-1.0/access/.well-known/jwks.json`;
  jwksCache = jose.createRemoteJWKSet(new URL(jwksUrl));
  jwksCacheTime = now;
  
  return jwksCache;
}

/**
 * Decoded ID token payload
 */
export interface VippsIdTokenPayload {
  sub: string;           // Subject (unique user ID)
  iss: string;           // Issuer
  aud: string;           // Audience (client_id)
  exp: number;           // Expiry timestamp
  iat: number;           // Issued at timestamp
  nbf?: number;          // Not before timestamp
  auth_time?: number;    // Time when authentication occurred
  acr?: string;          // Authentication context class reference
  nonce?: string;        // Nonce if provided in auth request
}

/**
 * Verify Vipps ID token (JWT)
 * 
 * Validates:
 * 1. Signature with Vipps public key (JWKS)
 * 2. Issuer (iss) matches Vipps
 * 3. Audience (aud) matches client_id
 * 4. Expiry (exp) is in future
 * 5. Not before (nbf) is in past (if present)
 *
 * @param idToken - The ID token JWT string from Vipps
 * @returns Decoded payload if valid, null if invalid
 */
export async function verifyIdToken(idToken: string): Promise<VippsIdTokenPayload | null> {
  try {
    // First decode without verification to see what we're dealing with
    const decoded = jose.decodeJwt(idToken);
    console.log("Vipps ID token claims (before verification):", {
      iss: decoded.iss,
      aud: decoded.aud,
      sub: decoded.sub,
      exp: decoded.exp,
      iat: decoded.iat,
    });

    const JWKS = await getVippsJWKS();
    
    // Vipps issuer can be with or without trailing slash - derive all from VIPPS_ISSUER env var
    const baseIssuer = VIPPS_ISSUER.replace(/\/+$/, ''); // Remove trailing slashes
    const allowedIssuers = [
      baseIssuer,
      baseIssuer + '/',
    ];

    console.log("Verifying with allowed issuers:", allowedIssuers);
    console.log("Expected audience:", VIPPS_CLIENT_ID);

    const { payload } = await jose.jwtVerify(idToken, JWKS, {
      issuer: allowedIssuers,
      audience: VIPPS_CLIENT_ID!,
    });

    console.log("✅ ID token verified successfully");
    return payload as unknown as VippsIdTokenPayload;
  } catch (error) {
    console.error("❌ Vipps ID token verification failed:");
    if (error instanceof jose.errors.JWTExpired) {
      console.error("- Reason: Token expired");
      console.error("- Error:", error.message);
    } else if (error instanceof jose.errors.JWTClaimValidationFailed) {
      console.error("- Reason: Claim validation failed");
      console.error("- Error:", error.message);
      console.error("- Claim:", error.claim);
      console.error("- Reason:", error.reason);
    } else if (error instanceof jose.errors.JWSSignatureVerificationFailed) {
      console.error("- Reason: Signature verification failed");
    } else {
      console.error("- Reason: Unknown error");
      console.error("- Error:", error);
    }
    return null;
  }
}

/**
 * Generate random state parameter for OAuth flow
 * Should be stored in session/Redis and validated on callback
 */
export function generateOAuthState(): string {
  return Buffer.from(crypto.getRandomValues(new Uint8Array(32))).toString(
    "hex"
  );
}
