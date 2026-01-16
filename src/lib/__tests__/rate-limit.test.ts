import { describe, it, expect } from 'vitest'
import { getClientIp, RATE_LIMITS } from '../rate-limit'

// =============================================================================
// GET CLIENT IP TESTS
// =============================================================================
describe('getClientIp', () => {
  /**
   * Helper to create a mock Request with headers
   */
  function createMockRequest(headers: Record<string, string> = {}): Request {
    return {
      headers: {
        get: (name: string) => headers[name.toLowerCase()] || null,
      },
    } as unknown as Request
  }

  describe('x-forwarded-for header', () => {
    it('extracts IP from x-forwarded-for header', () => {
      const request = createMockRequest({
        'x-forwarded-for': '192.168.1.1',
      })

      expect(getClientIp(request)).toBe('192.168.1.1')
    })

    it('extracts first IP when multiple are present (proxy chain)', () => {
      const request = createMockRequest({
        'x-forwarded-for': '192.168.1.1, 10.0.0.1, 172.16.0.1',
      })

      expect(getClientIp(request)).toBe('192.168.1.1')
    })

    it('trims whitespace from IP', () => {
      const request = createMockRequest({
        'x-forwarded-for': '  192.168.1.1  , 10.0.0.1',
      })

      expect(getClientIp(request)).toBe('192.168.1.1')
    })

    it('handles IPv6 addresses', () => {
      const request = createMockRequest({
        'x-forwarded-for': '2001:db8::1, ::ffff:192.168.1.1',
      })

      expect(getClientIp(request)).toBe('2001:db8::1')
    })
  })

  describe('x-real-ip header', () => {
    it('falls back to x-real-ip when x-forwarded-for is missing', () => {
      const request = createMockRequest({
        'x-real-ip': '10.0.0.1',
      })

      expect(getClientIp(request)).toBe('10.0.0.1')
    })

    it('prefers x-forwarded-for over x-real-ip', () => {
      const request = createMockRequest({
        'x-forwarded-for': '192.168.1.1',
        'x-real-ip': '10.0.0.1',
      })

      expect(getClientIp(request)).toBe('192.168.1.1')
    })
  })

  describe('fallback behavior', () => {
    it('returns "unknown" when no IP headers are present', () => {
      const request = createMockRequest({})

      expect(getClientIp(request)).toBe('unknown')
    })

    it('returns "unknown" when headers are empty strings', () => {
      const request = createMockRequest({
        'x-forwarded-for': '',
        'x-real-ip': '',
      })

      expect(getClientIp(request)).toBe('unknown')
    })
  })

  describe('Cloudflare headers (real-world scenario)', () => {
    it('works with typical Cloudflare setup', () => {
      const request = createMockRequest({
        'x-forwarded-for': '203.0.113.50, 162.158.0.1',
        'cf-connecting-ip': '203.0.113.50', // Cloudflare header (not currently used)
      })

      // Current implementation uses x-forwarded-for
      expect(getClientIp(request)).toBe('203.0.113.50')
    })
  })

  describe('Vercel headers (real-world scenario)', () => {
    it('works with typical Vercel setup', () => {
      const request = createMockRequest({
        'x-forwarded-for': '203.0.113.50',
        'x-vercel-forwarded-for': '203.0.113.50', // Vercel header (not currently used)
      })

      expect(getClientIp(request)).toBe('203.0.113.50')
    })
  })
})

// =============================================================================
// RATE LIMIT CONFIGURATION TESTS
// =============================================================================
describe('RATE_LIMITS configuration', () => {
  describe('contact rate limit', () => {
    it('has correct limit of 5 requests', () => {
      expect(RATE_LIMITS.contact.limit).toBe(5)
    })

    it('has correct window of 1 hour', () => {
      expect(RATE_LIMITS.contact.windowMs).toBe(60 * 60 * 1000)
    })
  })

  describe('interest rate limit', () => {
    it('has correct limit of 10 requests', () => {
      expect(RATE_LIMITS.interest.limit).toBe(10)
    })

    it('has correct window of 1 hour', () => {
      expect(RATE_LIMITS.interest.windowMs).toBe(60 * 60 * 1000)
    })
  })

  describe('staffing rate limit', () => {
    it('has correct limit of 10 requests', () => {
      expect(RATE_LIMITS.staffing.limit).toBe(10)
    })

    it('has correct window of 1 hour', () => {
      expect(RATE_LIMITS.staffing.windowMs).toBe(60 * 60 * 1000)
    })
  })

  describe('csrf rate limit', () => {
    it('has correct limit of 20 requests', () => {
      expect(RATE_LIMITS.csrf.limit).toBe(20)
    })

    it('has correct window of 1 minute', () => {
      expect(RATE_LIMITS.csrf.windowMs).toBe(60 * 1000)
    })
  })

  describe('configuration sanity checks', () => {
    it('all limits are positive numbers', () => {
      for (const [name, config] of Object.entries(RATE_LIMITS)) {
        expect(config.limit).toBeGreaterThan(0)
        expect(config.windowMs).toBeGreaterThan(0)
      }
    })

    it('csrf is more permissive than form submissions', () => {
      expect(RATE_LIMITS.csrf.limit).toBeGreaterThan(RATE_LIMITS.contact.limit)
      expect(RATE_LIMITS.csrf.windowMs).toBeLessThan(RATE_LIMITS.contact.windowMs)
    })
  })
})
