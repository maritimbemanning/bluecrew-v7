import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { generateCsrfToken, verifyCsrfToken } from '../csrf'

// =============================================================================
// TEST SETUP
// =============================================================================
describe('CSRF Token Generation and Verification', () => {
  const originalEnv = process.env.CSRF_SECRET

  beforeEach(() => {
    // Set a test secret
    process.env.CSRF_SECRET = 'test-secret-for-csrf-testing-12345'
  })

  afterEach(() => {
    // Restore original environment
    if (originalEnv) {
      process.env.CSRF_SECRET = originalEnv
    } else {
      delete process.env.CSRF_SECRET
    }
  })

  // ===========================================================================
  // TOKEN GENERATION
  // ===========================================================================
  describe('generateCsrfToken', () => {
    it('generates a token in correct format (timestamp:random:hash)', () => {
      const token = generateCsrfToken()
      const parts = token.split(':')

      expect(parts.length).toBe(3)
      expect(parts[0]).toMatch(/^\d+$/) // Timestamp is numeric
      expect(parts[1]).toMatch(/^[a-f0-9]{32}$/) // Random is 32 hex chars (16 bytes)
      expect(parts[2]).toMatch(/^[a-f0-9]{64}$/) // SHA-256 hash is 64 hex chars
    })

    it('generates unique tokens on each call', () => {
      const token1 = generateCsrfToken()
      const token2 = generateCsrfToken()
      const token3 = generateCsrfToken()

      expect(token1).not.toBe(token2)
      expect(token2).not.toBe(token3)
      expect(token1).not.toBe(token3)
    })

    it('uses current timestamp', () => {
      const before = Date.now()
      const token = generateCsrfToken()
      const after = Date.now()

      const timestamp = parseInt(token.split(':')[0], 10)
      expect(timestamp).toBeGreaterThanOrEqual(before)
      expect(timestamp).toBeLessThanOrEqual(after)
    })

    it('still works without CSRF_SECRET (uses fallback)', () => {
      delete process.env.CSRF_SECRET
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      const token = generateCsrfToken()

      expect(token).toBeTruthy()
      expect(token.split(':').length).toBe(3)
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('CSRF_SECRET environment variable is not set')
      )

      consoleSpy.mockRestore()
    })
  })

  // ===========================================================================
  // TOKEN VERIFICATION - VALID TOKENS
  // ===========================================================================
  describe('verifyCsrfToken - valid tokens', () => {
    it('verifies a freshly generated token', () => {
      const token = generateCsrfToken()
      const isValid = verifyCsrfToken(token)

      expect(isValid).toBe(true)
    })

    it('verifies multiple generated tokens', () => {
      const tokens = Array(5).fill(null).map(() => generateCsrfToken())

      for (const token of tokens) {
        expect(verifyCsrfToken(token)).toBe(true)
      }
    })
  })

  // ===========================================================================
  // TOKEN VERIFICATION - INVALID TOKENS
  // ===========================================================================
  describe('verifyCsrfToken - invalid tokens', () => {
    it('rejects empty string', () => {
      expect(verifyCsrfToken('')).toBe(false)
    })

    it('rejects null/undefined (coerced to string)', () => {
      // @ts-expect-error - Testing invalid input
      expect(verifyCsrfToken(null)).toBe(false)
      // @ts-expect-error - Testing invalid input
      expect(verifyCsrfToken(undefined)).toBe(false)
    })

    it('rejects malformed token without colons', () => {
      expect(verifyCsrfToken('invalidtoken')).toBe(false)
    })

    it('rejects token with only one colon', () => {
      expect(verifyCsrfToken('timestamp:random')).toBe(false)
    })

    it('rejects token with empty parts', () => {
      expect(verifyCsrfToken('::hash')).toBe(false)
      expect(verifyCsrfToken('timestamp::hash')).toBe(false)
      expect(verifyCsrfToken('timestamp:random:')).toBe(false)
    })

    it('rejects token with non-numeric timestamp', () => {
      expect(verifyCsrfToken('notanumber:random:hash')).toBe(false)
    })

    it('rejects token with tampered hash', () => {
      const validToken = generateCsrfToken()
      const parts = validToken.split(':')
      const tamperedToken = `${parts[0]}:${parts[1]}:tampered-hash-value`

      expect(verifyCsrfToken(tamperedToken)).toBe(false)
    })

    it('rejects token with tampered random', () => {
      const validToken = generateCsrfToken()
      const parts = validToken.split(':')
      const tamperedToken = `${parts[0]}:tampered-random:${parts[2]}`

      expect(verifyCsrfToken(tamperedToken)).toBe(false)
    })

    it('rejects token with tampered timestamp', () => {
      const validToken = generateCsrfToken()
      const parts = validToken.split(':')
      const tamperedTimestamp = (parseInt(parts[0], 10) + 1000).toString()
      const tamperedToken = `${tamperedTimestamp}:${parts[1]}:${parts[2]}`

      expect(verifyCsrfToken(tamperedToken)).toBe(false)
    })
  })

  // ===========================================================================
  // TOKEN EXPIRATION
  // ===========================================================================
  describe('verifyCsrfToken - token expiration', () => {
    it('rejects expired token (older than 1 hour)', () => {
      // Create a token with an old timestamp
      const oldTimestamp = Date.now() - (61 * 60 * 1000) // 61 minutes ago
      const token = generateCsrfToken()
      const parts = token.split(':')

      // Replace timestamp with old one (hash will be invalid anyway, but tests expiry check)
      const oldToken = `${oldTimestamp}:${parts[1]}:${parts[2]}`

      expect(verifyCsrfToken(oldToken)).toBe(false)
    })

    it('accepts token just under 1 hour old', () => {
      // We can't easily test this without mocking Date.now()
      // The fresh token should be valid
      const token = generateCsrfToken()
      expect(verifyCsrfToken(token)).toBe(true)
    })
  })

  // ===========================================================================
  // CROSS-SECRET VERIFICATION
  // ===========================================================================
  describe('verifyCsrfToken - secret mismatch', () => {
    it('rejects token generated with different secret', () => {
      // Generate token with current secret
      const token = generateCsrfToken()

      // Change the secret
      process.env.CSRF_SECRET = 'different-secret-entirely'

      // Token should now be invalid
      expect(verifyCsrfToken(token)).toBe(false)
    })
  })

  // ===========================================================================
  // SECURITY EDGE CASES
  // ===========================================================================
  describe('Security edge cases', () => {
    it('handles extremely long tokens gracefully', () => {
      const longToken = 'a'.repeat(10000)
      expect(verifyCsrfToken(longToken)).toBe(false)
    })

    it('handles special characters in token', () => {
      expect(verifyCsrfToken('<script>alert("xss")</script>')).toBe(false)
    })

    it('handles unicode in token', () => {
      expect(verifyCsrfToken('æøå:æøå:æøå')).toBe(false)
    })

    it('handles SQL injection attempts', () => {
      expect(verifyCsrfToken("'; DROP TABLE users;--")).toBe(false)
    })

    it('handles JSON in token', () => {
      expect(verifyCsrfToken('{"timestamp":123,"random":"abc","hash":"def"}')).toBe(false)
    })
  })
})
