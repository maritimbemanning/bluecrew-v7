import { describe, it, expect } from 'vitest'
import {
  contactSchema,
  interestLeadSchema,
  staffingNeedsSchema,
  registrationSchema,
  newsletterSchema,
  candidateRegistrationSchema,
} from '../validations'

// =============================================================================
// CONTACT SCHEMA TESTS
// =============================================================================
describe('contactSchema', () => {
  describe('valid inputs', () => {
    it('accepts valid contact form data', () => {
      const validData = {
        navn: 'Ola Nordmann',
        epost: 'ola@example.com',
        telefon: '12345678',
        melding: 'Dette er en testmelding som er lang nok.',
        godtarVilkar: true,
      }
      const result = contactSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('accepts Norwegian phone with +47 prefix', () => {
      const data = {
        navn: 'Test Person',
        epost: 'test@test.no',
        telefon: '+4712345678',
        melding: 'En melding som er lang nok til validering',
        godtarVilkar: true,
      }
      const result = contactSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('accepts empty phone (optional field)', () => {
      const data = {
        navn: 'Test Person',
        epost: 'test@test.no',
        telefon: '',
        melding: 'En melding som er lang nok til validering',
        godtarVilkar: true,
      }
      const result = contactSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('lowercases email addresses', () => {
      const data = {
        navn: 'Test Person',
        epost: 'TEST@EXAMPLE.COM',
        melding: 'En melding som er lang nok',
        godtarVilkar: true,
      }
      const result = contactSchema.safeParse(data)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.epost).toBe('test@example.com')
      }
    })

    it('accepts Norwegian characters in name', () => {
      const data = {
        navn: 'Åse Ødegård',
        epost: 'aase@example.no',
        melding: 'Melding med æøå karakterer',
        godtarVilkar: true,
      }
      const result = contactSchema.safeParse(data)
      expect(result.success).toBe(true)
    })
  })

  describe('invalid inputs', () => {
    it('rejects name shorter than 2 characters', () => {
      const data = {
        navn: 'A',
        epost: 'test@test.no',
        melding: 'En lang nok melding her',
        godtarVilkar: true,
      }
      const result = contactSchema.safeParse(data)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('navn')
      }
    })

    it('rejects invalid email format', () => {
      const data = {
        navn: 'Test Person',
        epost: 'not-an-email',
        melding: 'En lang nok melding her',
        godtarVilkar: true,
      }
      const result = contactSchema.safeParse(data)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('epost')
      }
    })

    it('rejects message shorter than 10 characters', () => {
      const data = {
        navn: 'Test Person',
        epost: 'test@test.no',
        melding: 'Kort',
        godtarVilkar: true,
      }
      const result = contactSchema.safeParse(data)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('melding')
      }
    })

    it('rejects when godtarVilkar is false', () => {
      const data = {
        navn: 'Test Person',
        epost: 'test@test.no',
        melding: 'En lang nok melding her',
        godtarVilkar: false,
      }
      const result = contactSchema.safeParse(data)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('godtarVilkar')
      }
    })

    it('rejects invalid Norwegian phone number', () => {
      const data = {
        navn: 'Test Person',
        epost: 'test@test.no',
        telefon: '123', // Too short
        melding: 'En lang nok melding her',
        godtarVilkar: true,
      }
      const result = contactSchema.safeParse(data)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('telefon')
      }
    })

    it('rejects phone with wrong prefix', () => {
      const data = {
        navn: 'Test Person',
        epost: 'test@test.no',
        telefon: '+4612345678', // Swedish prefix
        melding: 'En lang nok melding her',
        godtarVilkar: true,
      }
      const result = contactSchema.safeParse(data)
      expect(result.success).toBe(false)
    })
  })
})

// =============================================================================
// INTEREST LEAD SCHEMA TESTS
// =============================================================================
describe('interestLeadSchema', () => {
  describe('valid inputs - sjomann type', () => {
    it('accepts valid sjomann lead with required fields', () => {
      const data = {
        navn: 'Kaptein Sabeltansen',
        epost: 'kaptein@skip.no',
        telefon: '12345678',
        type: 'sjomann' as const,
        stilling: 'Kaptein',
        erfaring: '5-10',
        godtarVilkar: true,
      }
      const result = interestLeadSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('accepts sjomann with all optional fields', () => {
      const data = {
        navn: 'Matros Hansen',
        epost: 'matros@skip.no',
        telefon: '+4787654321',
        type: 'sjomann' as const,
        stilling: 'Matros',
        region: 'Vestlandet',
        erfaring: '1-3',
        tilgjengeligFra: '2024-06-01',
        melding: 'Ser etter nye muligheter',
        godtarVilkar: true,
        markedsforing: true,
      }
      const result = interestLeadSchema.safeParse(data)
      expect(result.success).toBe(true)
    })
  })

  describe('valid inputs - rederi type', () => {
    it('accepts rederi type without stilling and erfaring', () => {
      const data = {
        navn: 'Rederi AS',
        epost: 'kontakt@rederi.no',
        type: 'rederi' as const,
        godtarVilkar: true,
      }
      const result = interestLeadSchema.safeParse(data)
      expect(result.success).toBe(true)
    })
  })

  describe('valid inputs - annet type', () => {
    it('accepts annet type without stilling and erfaring', () => {
      const data = {
        navn: 'Nysgjerrig Person',
        epost: 'info@example.no',
        type: 'annet' as const,
        melding: 'Bare lurer på noe',
        godtarVilkar: true,
      }
      const result = interestLeadSchema.safeParse(data)
      expect(result.success).toBe(true)
    })
  })

  describe('conditional validation - sjomann requires stilling', () => {
    it('rejects sjomann without stilling', () => {
      const data = {
        navn: 'Test Sjømann',
        epost: 'test@test.no',
        type: 'sjomann' as const,
        erfaring: '1-3',
        godtarVilkar: true,
      }
      const result = interestLeadSchema.safeParse(data)
      expect(result.success).toBe(false)
      if (!result.success) {
        const stillingError = result.error.issues.find(i => i.path.includes('stilling'))
        expect(stillingError).toBeDefined()
      }
    })

    it('rejects sjomann with empty stilling', () => {
      const data = {
        navn: 'Test Sjømann',
        epost: 'test@test.no',
        type: 'sjomann' as const,
        stilling: '',
        erfaring: '1-3',
        godtarVilkar: true,
      }
      const result = interestLeadSchema.safeParse(data)
      expect(result.success).toBe(false)
    })
  })

  describe('conditional validation - sjomann requires erfaring', () => {
    it('rejects sjomann without erfaring', () => {
      const data = {
        navn: 'Test Sjømann',
        epost: 'test@test.no',
        type: 'sjomann' as const,
        stilling: 'Matros',
        godtarVilkar: true,
      }
      const result = interestLeadSchema.safeParse(data)
      expect(result.success).toBe(false)
      if (!result.success) {
        const erfaringError = result.error.issues.find(i => i.path.includes('erfaring'))
        expect(erfaringError).toBeDefined()
      }
    })

    it('rejects sjomann with empty erfaring', () => {
      const data = {
        navn: 'Test Sjømann',
        epost: 'test@test.no',
        type: 'sjomann' as const,
        stilling: 'Matros',
        erfaring: '',
        godtarVilkar: true,
      }
      const result = interestLeadSchema.safeParse(data)
      expect(result.success).toBe(false)
    })
  })

  describe('invalid inputs', () => {
    it('rejects invalid type value', () => {
      const data = {
        navn: 'Test Person',
        epost: 'test@test.no',
        type: 'invalid' as const,
        godtarVilkar: true,
      }
      // @ts-expect-error - Testing invalid type
      const result = interestLeadSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects when godtarVilkar is false', () => {
      const data = {
        navn: 'Test Person',
        epost: 'test@test.no',
        type: 'rederi' as const,
        godtarVilkar: false,
      }
      const result = interestLeadSchema.safeParse(data)
      expect(result.success).toBe(false)
    })
  })
})

// =============================================================================
// STAFFING NEEDS SCHEMA TESTS
// =============================================================================
describe('staffingNeedsSchema', () => {
  describe('valid inputs', () => {
    it('accepts valid staffing needs form', () => {
      const data = {
        fartoytype: 'Supplyskip',
        stillinger: ['Kaptein', 'Styrmann'],
        antall: 5,
        kontakt_navn: 'HR Sjansen',
        kontakt_epost: 'hr@rederi.no',
        godtarVilkar: true,
      }
      const result = staffingNeedsSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('accepts all optional fields', () => {
      const data = {
        fartoytype: 'Tankskip',
        stillinger: ['Maskinsjef'],
        antall: 2,
        oppstart: '2024-07-01',
        rotasjon: '4-4',
        kontakt_navn: 'Kari Kontakt',
        kontakt_epost: 'kari@selskap.no',
        kontakt_telefon: '+4712345678',
        bedrift: 'Rederiet AS',
        merknad: 'Trenger folk raskt',
        godtarVilkar: true,
      }
      const result = staffingNeedsSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('accepts single stilling in array', () => {
      const data = {
        fartoytype: 'Ferge',
        stillinger: ['Matros'],
        antall: 10,
        kontakt_navn: 'Test',
        kontakt_epost: 'test@test.no',
        godtarVilkar: true,
      }
      const result = staffingNeedsSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('accepts maximum 10 stillinger', () => {
      const data = {
        fartoytype: 'Stort skip',
        stillinger: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
        antall: 50,
        kontakt_navn: 'Test',
        kontakt_epost: 'test@test.no',
        godtarVilkar: true,
      }
      const result = staffingNeedsSchema.safeParse(data)
      expect(result.success).toBe(true)
    })
  })

  describe('invalid inputs', () => {
    it('rejects empty stillinger array', () => {
      const data = {
        fartoytype: 'Skip',
        stillinger: [],
        antall: 1,
        kontakt_navn: 'Test',
        kontakt_epost: 'test@test.no',
        godtarVilkar: true,
      }
      const result = staffingNeedsSchema.safeParse(data)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('stillinger')
      }
    })

    it('rejects more than 10 stillinger', () => {
      const data = {
        fartoytype: 'Skip',
        stillinger: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'],
        antall: 1,
        kontakt_navn: 'Test',
        kontakt_epost: 'test@test.no',
        godtarVilkar: true,
      }
      const result = staffingNeedsSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects antall less than 1', () => {
      const data = {
        fartoytype: 'Skip',
        stillinger: ['Matros'],
        antall: 0,
        kontakt_navn: 'Test',
        kontakt_epost: 'test@test.no',
        godtarVilkar: true,
      }
      const result = staffingNeedsSchema.safeParse(data)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('antall')
      }
    })

    it('rejects antall greater than 999', () => {
      const data = {
        fartoytype: 'Skip',
        stillinger: ['Matros'],
        antall: 1000,
        kontakt_navn: 'Test',
        kontakt_epost: 'test@test.no',
        godtarVilkar: true,
      }
      const result = staffingNeedsSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects non-integer antall', () => {
      const data = {
        fartoytype: 'Skip',
        stillinger: ['Matros'],
        antall: 2.5,
        kontakt_navn: 'Test',
        kontakt_epost: 'test@test.no',
        godtarVilkar: true,
      }
      const result = staffingNeedsSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects short fartoytype', () => {
      const data = {
        fartoytype: 'S',
        stillinger: ['Matros'],
        antall: 1,
        kontakt_navn: 'Test',
        kontakt_epost: 'test@test.no',
        godtarVilkar: true,
      }
      const result = staffingNeedsSchema.safeParse(data)
      expect(result.success).toBe(false)
    })
  })
})

// =============================================================================
// REGISTRATION SCHEMA TESTS
// =============================================================================
describe('registrationSchema', () => {
  describe('valid inputs', () => {
    it('accepts valid registration data', () => {
      const data = {
        rolle: 'Kaptein',
        erfaring: '5-10 år',
        onskerMidlertidig: 'true' as const,
        stcwConsent: true,
        gdprConsent: true,
      }
      const result = registrationSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('accepts onskerMidlertidig as false string', () => {
      const data = {
        rolle: 'Matros',
        erfaring: '1-3 år',
        onskerMidlertidig: 'false' as const,
        stcwConsent: true,
        gdprConsent: true,
      }
      const result = registrationSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('accepts optional fields', () => {
      const data = {
        rolle: 'Styrmann',
        erfaring: '3-5 år',
        onskerMidlertidig: 'true' as const,
        tilgjengeligFra: '2024-08-01',
        melding: 'Ser etter nye utfordringer i maritime næring',
        stcwConsent: true,
        gdprConsent: true,
      }
      const result = registrationSchema.safeParse(data)
      expect(result.success).toBe(true)
    })
  })

  describe('invalid inputs', () => {
    it('rejects empty rolle', () => {
      const data = {
        rolle: '',
        erfaring: '1-3 år',
        onskerMidlertidig: 'true' as const,
        stcwConsent: true,
        gdprConsent: true,
      }
      const result = registrationSchema.safeParse(data)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('rolle')
      }
    })

    it('rejects empty erfaring', () => {
      const data = {
        rolle: 'Kaptein',
        erfaring: '',
        onskerMidlertidig: 'true' as const,
        stcwConsent: true,
        gdprConsent: true,
      }
      const result = registrationSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects invalid onskerMidlertidig value', () => {
      const data = {
        rolle: 'Kaptein',
        erfaring: '1-3 år',
        onskerMidlertidig: 'maybe',
        stcwConsent: true,
        gdprConsent: true,
      }
      // @ts-expect-error - Testing invalid value
      const result = registrationSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects stcwConsent as false', () => {
      const data = {
        rolle: 'Kaptein',
        erfaring: '1-3 år',
        onskerMidlertidig: 'true' as const,
        stcwConsent: false,
        gdprConsent: true,
      }
      const result = registrationSchema.safeParse(data)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('stcwConsent')
      }
    })

    it('rejects gdprConsent as false', () => {
      const data = {
        rolle: 'Kaptein',
        erfaring: '1-3 år',
        onskerMidlertidig: 'true' as const,
        stcwConsent: true,
        gdprConsent: false,
      }
      const result = registrationSchema.safeParse(data)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('gdprConsent')
      }
    })
  })
})

// =============================================================================
// NEWSLETTER SCHEMA TESTS
// =============================================================================
describe('newsletterSchema', () => {
  describe('valid inputs', () => {
    it('accepts valid newsletter signup', () => {
      const data = {
        epost: 'subscriber@example.com',
        consent: true,
      }
      const result = newsletterSchema.safeParse(data)
      expect(result.success).toBe(true)
    })
  })

  describe('invalid inputs', () => {
    it('rejects invalid email', () => {
      const data = {
        epost: 'not-valid',
        consent: true,
      }
      const result = newsletterSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects consent as false', () => {
      const data = {
        epost: 'test@test.no',
        consent: false,
      }
      const result = newsletterSchema.safeParse(data)
      expect(result.success).toBe(false)
    })
  })
})

// =============================================================================
// CANDIDATE REGISTRATION SCHEMA TESTS
// =============================================================================
describe('candidateRegistrationSchema', () => {
  describe('valid inputs', () => {
    it('accepts valid candidate registration', () => {
      const data = {
        fornavn: 'Ola',
        etternavn: 'Nordmann',
        epost: 'ola@example.no',
        telefon: '12345678',
      }
      const result = candidateRegistrationSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('accepts with kompetanse array', () => {
      const data = {
        fornavn: 'Kari',
        etternavn: 'Hansen',
        epost: 'kari@example.no',
        kompetanse: ['STCW', 'GOC', 'Sikkerhetskurs'],
      }
      const result = candidateRegistrationSchema.safeParse(data)
      expect(result.success).toBe(true)
    })
  })

  describe('invalid inputs', () => {
    it('rejects empty fornavn', () => {
      const data = {
        fornavn: '',
        etternavn: 'Test',
        epost: 'test@test.no',
      }
      const result = candidateRegistrationSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects invalid email', () => {
      const data = {
        fornavn: 'Test',
        etternavn: 'Person',
        epost: 'invalid',
      }
      const result = candidateRegistrationSchema.safeParse(data)
      expect(result.success).toBe(false)
    })
  })
})

// =============================================================================
// EDGE CASES & SECURITY TESTS
// =============================================================================
describe('Edge cases and security', () => {
  describe('XSS prevention (Zod sanitizes by default)', () => {
    it('handles script tags in input', () => {
      const data = {
        navn: '<script>alert("xss")</script>',
        epost: 'test@test.no',
        melding: 'Normal message that is long enough',
        godtarVilkar: true,
      }
      // Zod will accept this as valid string - XSS prevention is at output
      const result = contactSchema.safeParse(data)
      expect(result.success).toBe(true)
    })
  })

  describe('Unicode and special characters', () => {
    it('handles emojis in message', () => {
      const data = {
        navn: 'Test Person',
        epost: 'test@test.no',
        melding: 'Great service! 🚢⚓️ Really happy with it!',
        godtarVilkar: true,
      }
      const result = contactSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('handles very long Unicode strings', () => {
      const data = {
        navn: 'Åse Ødegård Æresansen',
        epost: 'test@test.no',
        melding: 'Æ ø å '.repeat(100), // Long Norwegian characters
        godtarVilkar: true,
      }
      const result = contactSchema.safeParse(data)
      expect(result.success).toBe(true)
    })
  })

  describe('Boundary testing', () => {
    it('accepts exactly minimum length name (2 chars)', () => {
      const data = {
        navn: 'AB',
        epost: 'test@test.no',
        melding: 'This is a valid message',
        godtarVilkar: true,
      }
      const result = contactSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('accepts exactly minimum length message (10 chars)', () => {
      const data = {
        navn: 'Test Person',
        epost: 'test@test.no',
        melding: '1234567890', // Exactly 10 chars
        godtarVilkar: true,
      }
      const result = contactSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('rejects message at 9 characters', () => {
      const data = {
        navn: 'Test Person',
        epost: 'test@test.no',
        melding: '123456789', // 9 chars - one short
        godtarVilkar: true,
      }
      const result = contactSchema.safeParse(data)
      expect(result.success).toBe(false)
    })
  })

  describe('Phone number edge cases', () => {
    it('rejects phone with spaces', () => {
      const data = {
        navn: 'Test',
        epost: 'test@test.no',
        telefon: '123 456 78',
        melding: 'Valid message here',
        godtarVilkar: true,
      }
      const result = contactSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects phone with dashes', () => {
      const data = {
        navn: 'Test',
        epost: 'test@test.no',
        telefon: '123-456-78',
        melding: 'Valid message here',
        godtarVilkar: true,
      }
      const result = contactSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects 9-digit phone', () => {
      const data = {
        navn: 'Test',
        epost: 'test@test.no',
        telefon: '123456789',
        melding: 'Valid message here',
        godtarVilkar: true,
      }
      const result = contactSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects 7-digit phone', () => {
      const data = {
        navn: 'Test',
        epost: 'test@test.no',
        telefon: '1234567',
        melding: 'Valid message here',
        godtarVilkar: true,
      }
      const result = contactSchema.safeParse(data)
      expect(result.success).toBe(false)
    })
  })
})
