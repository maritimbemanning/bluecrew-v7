import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { exchangeVippsCode, getVippsUserInfo, verifyIdToken } from "@/lib/vipps/oauth";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createSession, SESSION_COOKIE_CONFIG } from "@/lib/auth/session";
import { errorResponse, HttpStatus } from "@/lib/api/types";
import type { Database } from "@/types/database.types";

// Debug helper
function debugLog(requestId: string, step: string, data?: unknown) {
  console.log(`[VIPPS:${requestId}] ${step}`, data ? JSON.stringify(data, null, 2) : '');
}

// Lazy initialization to prevent build-time errors
let _redis: Redis | null = null;
function getRedis(): Redis {
  if (!_redis) {
    _redis = Redis.fromEnv();
  }
  return _redis;
}

// State data stored in Redis
interface StoredState {
  returnTo: string;
  createdAt: number;
}

/**
 * Vipps OAuth Callback Endpoint
 *
 * Handles the OAuth callback from Vipps:
 * 1. Validates the state parameter (CSRF protection)
 * 2. Exchanges authorization code for tokens
 * 3. Fetches user info from Vipps
 * 4. Creates or updates candidate in database
 * 5. Creates session cookie
 * 6. Redirects to original destination
 */
export async function GET(request: Request) {
  const requestId = Math.random().toString(36).substring(7);
  debugLog(requestId, '=== START VIPPS CALLBACK ===');
  
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  debugLog(requestId, 'Callback params:', { code: code ? '[PRESENT]' : null, state: state ? '[PRESENT]' : null, error, errorDescription });

  // Use the origin from the request (localhost:3004 in dev, bluecrew.no in prod)
  const baseUrl = origin;
  debugLog(requestId, 'Base URL (from request origin):', baseUrl);

  try {
    // Handle OAuth errors from Vipps
    if (error) {
      debugLog(requestId, 'VIPPS OAUTH ERROR:', { error, errorDescription });
      console.error("Vipps OAuth error:", error, errorDescription);

      // User-friendly error messages
      const errorMessages: Record<string, string> = {
        access_denied: "Du avbrøt påloggingen",
        invalid_request: "Ugyldig forespørsel til Vipps",
        unauthorized_client: "Konfigureringsfeil med Vipps",
        server_error: "Vipps er midlertidig utilgjengelig",
      };

      const message = errorMessages[error] || "En feil oppstod med Vipps-pålogging";
      return NextResponse.redirect(
        `${baseUrl}/logg-inn?error=${encodeURIComponent(message)}`
      );
    }

    // Validate required parameters
    if (!code || !state) {
      debugLog(requestId, 'MISSING PARAMS - code or state');
      return NextResponse.redirect(
        `${baseUrl}/logg-inn?error=${encodeURIComponent("Manglende parametere fra Vipps")}`
      );
    }
    debugLog(requestId, 'Params OK');

    // Validate state parameter from Redis
    debugLog(requestId, 'Fetching state from Redis...');
    const storedStateJson = await getRedis().get<string>(`vipps:state:${state}`);

    if (!storedStateJson) {
      debugLog(requestId, 'STATE NOT FOUND IN REDIS - expired or invalid');
      console.error("Invalid or expired state:", state);
      return NextResponse.redirect(
        `${baseUrl}/logg-inn?error=${encodeURIComponent("Påloggingsøkten har utløpt. Prøv igjen.")}`
      );
    }
    debugLog(requestId, 'State found in Redis');

    // Delete state from Redis (one-time use)
    await getRedis().del(`vipps:state:${state}`);
    debugLog(requestId, 'State deleted from Redis (one-time use)');

    // Parse stored state
    const storedState: StoredState =
      typeof storedStateJson === "string"
        ? JSON.parse(storedStateJson)
        : storedStateJson;
    debugLog(requestId, 'Stored state:', storedState);

    // Exchange authorization code for tokens
    // IMPORTANT: redirect_uri must match exactly what was sent during authorization
    const redirectUri = `${baseUrl}/api/vipps/callback`;
    debugLog(requestId, 'Exchanging code for tokens with redirectUri:', redirectUri);
    const tokenResponse = await exchangeVippsCode(code, redirectUri);
    debugLog(requestId, 'Token exchange OK, got access_token and id_token');

    // Verify ID token signature and claims
    debugLog(requestId, 'Verifying ID token...');
    const idTokenPayload = await verifyIdToken(tokenResponse.id_token);
    
    if (!idTokenPayload) {
      debugLog(requestId, 'ID TOKEN VERIFICATION FAILED');
      console.error("ID token verification failed");
      return NextResponse.redirect(
        `${baseUrl}/logg-inn?error=${encodeURIComponent("Kunne ikke verifisere Vipps-identitet. Prøv igjen.")}`
      );
    }
    debugLog(requestId, 'ID token verified:', { sub: idTokenPayload.sub });

    // Fetch user information from Vipps
    debugLog(requestId, 'Fetching user info from Vipps...');
    const userInfo = await getVippsUserInfo(tokenResponse.access_token);
    debugLog(requestId, 'User info received:', { 
      sub: userInfo.sub, 
      name: userInfo.name,
      email: userInfo.email,
      phone: userInfo.phone_number 
    });

    if (!userInfo.sub) {
      debugLog(requestId, 'NO USER SUB - fatal error');
      throw new Error("Missing user identifier from Vipps");
    }

    // Check if candidate already exists
    debugLog(requestId, 'Looking up existing candidate by email:', userInfo.email);
    type CandidateResult = {
      id: string;
      name?: string;
      first_name?: string;
      last_name?: string;
      email: string;
      primary_role?: string | null;
      cv_key?: string | null;
    };

    // Validate email before lookup - email is required for candidate matching
    if (!userInfo.email) {
      debugLog(requestId, 'NO EMAIL FROM VIPPS - cannot proceed');
      return NextResponse.redirect(
        `${baseUrl}/logg-inn?error=${encodeURIComponent("Kunne ikke hente e-post fra Vipps. Sjekk at e-post er delt i Vipps-appen.")}`
      );
    }

    // Check that email is verified by Vipps (security measure)
    if (userInfo.email_verified === false) {
      debugLog(requestId, 'EMAIL NOT VERIFIED BY VIPPS');
      return NextResponse.redirect(
        `${baseUrl}/logg-inn?error=${encodeURIComponent("E-postadressen din er ikke verifisert i Vipps. Vennligst verifiser den først.")}`
      );
    }

    // Normalize email for lookup
    const normalizedEmail = userInfo.email.toLowerCase().trim();
    
    // First, try to find by vipps_sub (most reliable - unique per user)
    debugLog(requestId, 'Looking up candidate by vipps_sub:', userInfo.sub);
    let { data: existingCandidates, error: lookupError } = await supabaseAdmin
      .from("candidates")
      .select("id, email, name, first_name, last_name, primary_role, cv_key")
      .eq("vipps_sub", userInfo.sub)
      .limit(1) as { data: CandidateResult[] | null; error: unknown };

    // If not found by vipps_sub, try email (case-insensitive)
    if (!existingCandidates?.length) {
      debugLog(requestId, 'Not found by vipps_sub, trying email:', normalizedEmail);
      const emailResult = await supabaseAdmin
        .from("candidates")
        .select("id, email, name, first_name, last_name, primary_role, cv_key")
        .ilike("email", normalizedEmail)
        .limit(1) as { data: CandidateResult[] | null; error: unknown };

      existingCandidates = emailResult.data;
      lookupError = emailResult.error;
    }

    if (lookupError) {
      debugLog(requestId, 'CANDIDATE LOOKUP ERROR:', lookupError);
      console.error("Candidate lookup failed:", lookupError);
    }

    const existingCandidate = existingCandidates?.[0];
    debugLog(requestId, 'Existing candidate:', existingCandidate ? { id: existingCandidate.id, name: existingCandidate.name } : null);

    let candidateId: string;
    let candidateName: string;

    if (existingCandidate) {
      // Update existing candidate
      debugLog(requestId, 'Updating existing candidate...');
      candidateId = existingCandidate.id;
      candidateName = existingCandidate.name || `${existingCandidate.first_name || ''} ${existingCandidate.last_name || ''}`.trim() || "Bruker";

      // Update candidate with latest Vipps info
      const updateData: Record<string, unknown> = {
        // Update contact info from Vipps
        email: userInfo.email || existingCandidate.email,
        phone: userInfo.phone_number || undefined,
        // Mark as Vipps-verified
        vipps_sub: userInfo.sub,
        vipps_verified: true,
        vipps_verified_at: new Date().toISOString(),
      };

      const { error: updateError } = await supabaseAdmin
        .from("candidates")
        .update(updateData)
        .eq("id", existingCandidate.id);
      
      if (updateError) {
        debugLog(requestId, 'CANDIDATE UPDATE ERROR:', updateError);
      } else {
        debugLog(requestId, 'Candidate updated OK');
      }
    } else {
      // Create new candidate
      debugLog(requestId, 'Creating new candidate...');
      
      // Split name into first_name and last_name for the new database schema
      const firstName = userInfo.given_name || userInfo.name?.split(' ')[0] || "Ukjent";
      const lastName = userInfo.family_name || userInfo.name?.split(' ').slice(1).join(' ') || "";
      const fullName = userInfo.name || `${firstName} ${lastName}`.trim();

      // Build candidate data with all available fields
      const newCandidate: Record<string, unknown> = {
        // Identity
        email: normalizedEmail,
        phone: userInfo.phone_number || null,
        first_name: firstName,
        last_name: lastName,
        name: fullName,
        
        // Vipps verification
        vipps_sub: userInfo.sub,
        vipps_verified: true,
        vipps_verified_at: new Date().toISOString(),
        
        // Default values for required fields
        source: "vipps",
        status: "active",
      };
      debugLog(requestId, 'New candidate data:', newCandidate);

      type InsertResult = { id: string; name?: string; first_name?: string; last_name?: string };

      const { data: inserted, error: insertError } = await supabaseAdmin
        .from("candidates")
        .insert(newCandidate as Database["public"]["Tables"]["candidates"]["Insert"])
        .select("id, name, first_name, last_name")
        .single() as { data: InsertResult | null; error: { code?: string; message?: string; details?: string } | null };

      if (insertError || !inserted) {
        debugLog(requestId, 'CANDIDATE INSERT ERROR:', insertError);
        console.error("Failed to create candidate:", insertError);
        
        // Handle duplicate email error - try to fetch the existing candidate
        if (insertError?.code === '23505' || insertError?.message?.includes('duplicate') || insertError?.message?.includes('unique')) {
          debugLog(requestId, 'Duplicate email detected, attempting fallback lookup...');
          
          // Fallback: try case-insensitive email match
          const { data: fallbackCandidate, error: fallbackError } = await supabaseAdmin
            .from("candidates")
            .select("id, email, name, first_name, last_name, primary_role, cv_key")
            .ilike("email", normalizedEmail)
            .limit(1)
            .single() as { data: CandidateResult | null; error: unknown };
          
          if (fallbackCandidate && !fallbackError) {
            debugLog(requestId, 'Fallback lookup succeeded:', { id: fallbackCandidate.id });
            candidateId = fallbackCandidate.id;
            candidateName = fallbackCandidate.name || `${fallbackCandidate.first_name || ''} ${fallbackCandidate.last_name || ''}`.trim() || fullName;
            
            // Also update their vipps_sub since they logged in with Vipps
            const { error: updateError } = await supabaseAdmin
              .from("candidates")
              .update({
                vipps_sub: userInfo.sub,
                vipps_verified: true,
                vipps_verified_at: new Date().toISOString(),
                phone: userInfo.phone_number || fallbackCandidate.email,
              })
              .eq("id", fallbackCandidate.id);
            
            if (updateError) {
              debugLog(requestId, 'Failed to update vipps_sub on fallback candidate:', updateError);
            } else {
              debugLog(requestId, 'Updated vipps_sub on fallback candidate');
            }
          } else {
            debugLog(requestId, 'Fallback lookup also failed:', fallbackError);
            // Don't throw - just continue with creating a new session
            // This could happen in race conditions, redirect to login with error
            return NextResponse.redirect(
              `${baseUrl}/logg-inn?error=${encodeURIComponent("Det oppstod et problem. Prøv å logge inn på nytt.")}`
            );
          }
        } else {
          // Other database error
          const errorDetail = insertError?.message || insertError?.details || 'Ukjent databasefeil';
          debugLog(requestId, 'Database error detail:', errorDetail);
          throw new Error(`Kunne ikke opprette brukerkonto: ${errorDetail}`);
        }
      } else {
        debugLog(requestId, 'New candidate created:', { id: inserted.id, name: inserted.name || `${inserted.first_name} ${inserted.last_name}` });
        candidateId = inserted.id;
        candidateName = inserted.name || `${inserted.first_name || ''} ${inserted.last_name || ''}`.trim() || fullName;
      }
    }

    // Create session token
    debugLog(requestId, 'Creating session token...');
    const sessionToken = await createSession({
      candidateId,
      vippsSub: userInfo.sub,
      email: userInfo.email || "",
      name: candidateName,
      phone: userInfo.phone_number,
      vippsVerified: true,
    });
    debugLog(requestId, 'Session token created');

    // Determine redirect destination based on profile completion
    // Profile is considered complete if primary_role is filled in AND cv_key exists
    // New users or users without complete profile go to /registrer
    // Returning users with complete profile go to original destination or /profil
    const hasRole = existingCandidate?.primary_role != null && existingCandidate.primary_role.trim() !== '';
    const hasCv = existingCandidate?.cv_key != null && existingCandidate.cv_key.trim() !== '';
    const isProfileComplete = hasRole && hasCv;
    let redirectUrl: string;

    if (!isProfileComplete) {
      // New user or incomplete profile - go to registration
      // IMPORTANT: Preserve original returnTo so user comes back after completing profile
      // This ensures campaign applicants return to /kampanje/verify after registration
      const originalReturnTo = storedState.returnTo || "/profil";
      redirectUrl = `/registrer?returnTo=${encodeURIComponent(originalReturnTo)}`;
      debugLog(requestId, 'Profile incomplete, redirecting to /registrer with returnTo:', originalReturnTo);
    } else {
      // Existing user with complete profile - go to original destination or /profil
      redirectUrl = storedState.returnTo || "/profil";
      debugLog(requestId, 'Profile complete, redirecting to:', redirectUrl);
    }

    // Validate redirect URL is relative (prevent open redirect)
    const safeRedirect = redirectUrl.startsWith("/") && !redirectUrl.startsWith("//")
      ? redirectUrl
      : "/profil";

    debugLog(requestId, '=== VIPPS LOGIN SUCCESS ===', { candidateId, isProfileComplete, redirectUrl: safeRedirect });

    // Create redirect response and set cookie on it
    // IMPORTANT: Must set cookie on the response object, not via cookies() API
    const response = NextResponse.redirect(`${baseUrl}${safeRedirect}`);
    response.cookies.set(
      SESSION_COOKIE_CONFIG.name,
      sessionToken,
      SESSION_COOKIE_CONFIG.options
    );
    debugLog(requestId, 'Session cookie set on redirect response');

    return response;
  } catch (error) {
    debugLog(requestId, 'UNCAUGHT ERROR:', error);
    console.error("Vipps callback error:", error);

    const message = error instanceof Error
      ? error.message
      : "Kunne ikke fullføre Vipps-pålogging";

    return NextResponse.redirect(
      `${baseUrl}/logg-inn?error=${encodeURIComponent(message)}`
    );
  }
}

// Disable other methods
export async function POST() {
  return NextResponse.json(errorResponse("Method not allowed"), {
    status: HttpStatus.METHOD_NOT_ALLOWED,
  });
}
