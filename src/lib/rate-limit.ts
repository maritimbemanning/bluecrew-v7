import { Redis } from "@upstash/redis";

// Lazy initialization to prevent build-time errors
let _redis: Redis | null = null;

function getRedis(): Redis {
  if (!_redis) {
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;

    if (!url || !token) {
      throw new Error(
        "Missing Redis environment variables. Ensure UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are set."
      );
    }

    _redis = new Redis({ url, token });
  }
  return _redis;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Rate limit checker using sliding window with Upstash Redis
 * @param identifier - Usually IP address or user ID
 * @param limit - Max requests allowed in window
 * @param windowMs - Time window in milliseconds
 */
export async function rateLimit(
  identifier: string,
  limit: number,
  windowMs: number
): Promise<RateLimitResult> {
  try {
    const key = `rate_limit:${identifier}`;
    const now = Date.now();
    const windowStart = now - windowMs;

    const redis = getRedis();

    // Remove old entries outside the time window
    await redis.zremrangebyscore(key, 0, windowStart);

    // Count requests in current window
    const requestCount = await redis.zcard(key);

    if (requestCount >= limit) {
      // Get oldest request timestamp to calculate reset time
      const oldest = await redis.zrange(key, 0, 0, { withScores: true });
      const resetTime = oldest[1]
        ? (oldest[1] as number) + windowMs
        : now + windowMs;

      return {
        success: false,
        limit,
        remaining: 0,
        reset: Math.ceil(resetTime / 1000), // Unix timestamp in seconds
      };
    }

    // Add current request
    await redis.zadd(key, { score: now, member: `${now}:${Math.random()}` });

    // Set expiry on the key
    await redis.expire(key, Math.ceil(windowMs / 1000));

    return {
      success: true,
      limit,
      remaining: limit - requestCount - 1,
      reset: Math.ceil((now + windowMs) / 1000),
    };
  } catch (error) {
    // IMPORTANT: Fail OPEN to not block business-critical form submissions
    // Log the error for monitoring, but allow the request through
    // Rate limiting is a nice-to-have, not a must-have for a staffing business
    console.error("[RATE-LIMIT] Redis error - allowing request:", error);
    
    return {
      success: true,
      limit,
      remaining: limit,
      reset: Math.ceil((Date.now() + windowMs) / 1000),
    };
  }
}

/**
 * Rate limit configurations for different endpoints
 */
export const RATE_LIMITS = {
  // Contact form: 5 requests per hour
  contact: {
    limit: 5,
    windowMs: 60 * 60 * 1000, // 1 hour
  },
  // Interest leads: 10 requests per hour (main lead collection form)
  interest: {
    limit: 10,
    windowMs: 60 * 60 * 1000,
  },
  // Staffing needs: 10 requests per hour
  staffing: {
    limit: 10,
    windowMs: 60 * 60 * 1000,
  },
  // CSRF token: 20 requests per minute (generous)
  csrf: {
    limit: 20,
    windowMs: 60 * 1000, // 1 minute
  },
};

/**
 * Helper to get client IP from request
 */
export function getClientIp(request: Request): string {
  // Check various headers for real IP (behind proxies)
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }

  // Fallback to a default (shouldn't happen in production)
  return "unknown";
}
