import { describe, it, expect } from 'vitest'
import { cn, formatCurrency, formatDate, truncate, slugify } from '../utils'

// =============================================================================
// CN (CLASS NAME MERGE) TESTS
// =============================================================================
describe('cn', () => {
  describe('basic functionality', () => {
    it('merges multiple class names', () => {
      const result = cn('foo', 'bar')
      expect(result).toBe('foo bar')
    })

    it('handles single class', () => {
      const result = cn('foo')
      expect(result).toBe('foo')
    })

    it('handles empty input', () => {
      const result = cn()
      expect(result).toBe('')
    })
  })

  describe('conditional classes', () => {
    it('filters out falsy values', () => {
      const result = cn('foo', false, 'bar', null, undefined, 'baz')
      expect(result).toBe('foo bar baz')
    })

    it('handles conditional object syntax', () => {
      const isActive = true
      const result = cn('base', { active: isActive, disabled: false })
      expect(result).toBe('base active')
    })
  })

  describe('Tailwind conflict resolution', () => {
    it('resolves padding conflicts (last wins)', () => {
      const result = cn('p-4', 'p-2')
      expect(result).toBe('p-2')
    })

    it('resolves margin conflicts', () => {
      const result = cn('m-4', 'm-8')
      expect(result).toBe('m-8')
    })

    it('resolves text color conflicts', () => {
      const result = cn('text-red-500', 'text-blue-500')
      expect(result).toBe('text-blue-500')
    })

    it('resolves background color conflicts', () => {
      const result = cn('bg-white', 'bg-black')
      expect(result).toBe('bg-black')
    })

    it('keeps non-conflicting classes', () => {
      const result = cn('p-4', 'text-red-500', 'p-2', 'bg-white')
      expect(result).toBe('text-red-500 p-2 bg-white')
    })

    it('resolves flex/grid conflicts', () => {
      const result = cn('flex', 'grid')
      expect(result).toBe('grid')
    })
  })

  describe('array inputs', () => {
    it('handles array of classes', () => {
      const result = cn(['foo', 'bar'])
      expect(result).toBe('foo bar')
    })

    it('handles nested arrays', () => {
      const result = cn(['foo', ['bar', 'baz']])
      expect(result).toBe('foo bar baz')
    })
  })
})

// =============================================================================
// FORMAT CURRENCY TESTS
// =============================================================================
describe('formatCurrency', () => {
  describe('standard amounts', () => {
    it('formats positive whole numbers', () => {
      const result = formatCurrency(500000)
      // Norwegian format uses non-breaking space (160) or regular space
      expect(result.replace(/\s/g, ' ')).toMatch(/500\s*000/)
      expect(result).toContain('kr')
    })

    it('formats small amounts', () => {
      const result = formatCurrency(100)
      expect(result).toContain('100')
      expect(result).toContain('kr')
    })

    it('formats zero', () => {
      const result = formatCurrency(0)
      expect(result).toContain('0')
      expect(result).toContain('kr')
    })
  })

  describe('edge cases', () => {
    it('formats negative numbers', () => {
      const result = formatCurrency(-50000)
      // Norwegian locale uses '−' (minus sign U+2212) not '-' (hyphen-minus)
      expect(result.replace(/\s/g, ' ')).toMatch(/[−-].*50\s*000|50\s*000.*[−-]/)
    })

    it('formats large numbers with thousand separators', () => {
      const result = formatCurrency(1234567)
      // Should have separators for millions and thousands
      expect(result.replace(/\s/g, ' ')).toMatch(/1.*234.*567/)
    })

    it('rounds decimal amounts (no fraction digits)', () => {
      const result = formatCurrency(500.75)
      // Should round to nearest whole number
      expect(result).toContain('501') // Rounds up
    })

    it('rounds down when appropriate', () => {
      const result = formatCurrency(500.25)
      expect(result).toContain('500') // Rounds down
    })
  })

  describe('Norwegian locale specifics', () => {
    it('uses NOK currency', () => {
      const result = formatCurrency(1000)
      // Should contain kr (kroner) symbol
      expect(result.toLowerCase()).toContain('kr')
    })
  })
})

// =============================================================================
// FORMAT DATE TESTS
// =============================================================================
describe('formatDate', () => {
  describe('Date object inputs', () => {
    it('formats Date object correctly', () => {
      const date = new Date(2024, 11, 24) // Dec 24, 2024 (months are 0-indexed)
      const result = formatDate(date)
      expect(result).toContain('24')
      expect(result).toContain('2024')
      // Norwegian month abbreviation for December
      expect(result.toLowerCase()).toMatch(/des/)
    })

    it('formats first day of year', () => {
      const date = new Date(2024, 0, 1) // Jan 1, 2024
      const result = formatDate(date)
      expect(result).toContain('1')
      expect(result).toContain('2024')
      expect(result.toLowerCase()).toMatch(/jan/)
    })
  })

  describe('string inputs', () => {
    it('parses ISO date strings', () => {
      const result = formatDate('2024-06-15')
      expect(result).toContain('15')
      expect(result).toContain('2024')
      expect(result.toLowerCase()).toMatch(/jun/)
    })

    it('parses ISO datetime strings', () => {
      const result = formatDate('2024-03-20T10:30:00Z')
      expect(result).toContain('20')
      expect(result).toContain('2024')
      expect(result.toLowerCase()).toMatch(/mar/)
    })
  })

  describe('Norwegian locale specifics', () => {
    it('uses Norwegian month names', () => {
      const months = [
        { date: new Date(2024, 0, 1), expected: /jan/i },
        { date: new Date(2024, 1, 1), expected: /feb/i },
        { date: new Date(2024, 2, 1), expected: /mar/i },
        { date: new Date(2024, 3, 1), expected: /apr/i },
        { date: new Date(2024, 4, 1), expected: /mai/i },
        { date: new Date(2024, 5, 1), expected: /jun/i },
        { date: new Date(2024, 6, 1), expected: /jul/i },
        { date: new Date(2024, 7, 1), expected: /aug/i },
        { date: new Date(2024, 8, 1), expected: /sep/i },
        { date: new Date(2024, 9, 1), expected: /okt/i },
        { date: new Date(2024, 10, 1), expected: /nov/i },
        { date: new Date(2024, 11, 1), expected: /des/i },
      ]

      for (const { date, expected } of months) {
        const result = formatDate(date)
        expect(result).toMatch(expected)
      }
    })
  })

  describe('edge cases', () => {
    it('handles leap year date', () => {
      const result = formatDate(new Date(2024, 1, 29)) // Feb 29, 2024
      expect(result).toContain('29')
      expect(result.toLowerCase()).toMatch(/feb/)
    })

    it('handles end of year', () => {
      const result = formatDate(new Date(2024, 11, 31)) // Dec 31, 2024
      expect(result).toContain('31')
      expect(result.toLowerCase()).toMatch(/des/)
    })
  })
})

// =============================================================================
// TRUNCATE TESTS
// =============================================================================
describe('truncate', () => {
  describe('basic functionality', () => {
    it('truncates long text with ellipsis', () => {
      const result = truncate('This is a very long text', 10)
      expect(result).toBe('This is...')
      expect(result.length).toBe(10)
    })

    it('does not truncate text shorter than maxLength', () => {
      const result = truncate('Short', 10)
      expect(result).toBe('Short')
    })

    it('does not truncate text equal to maxLength', () => {
      const result = truncate('1234567890', 10)
      expect(result).toBe('1234567890')
    })
  })

  describe('edge cases', () => {
    it('handles empty string', () => {
      const result = truncate('', 10)
      expect(result).toBe('')
    })

    it('handles maxLength of 3 (minimum for ellipsis)', () => {
      const result = truncate('Hello', 3)
      expect(result).toBe('...')
    })

    it('handles maxLength of 4', () => {
      const result = truncate('Hello World', 4)
      expect(result).toBe('H...')
    })

    it('handles single character with maxLength 1', () => {
      // Edge case: maxLength less than ellipsis length
      const result = truncate('Hello', 1)
      // This will produce '...' because slice(0, -2) on 'Hello' gives 'Hel' then + '...'
      // Actually: 'Hello'.slice(0, 1-3) = 'Hello'.slice(0, -2) = 'Hel', then 'Hel' + '...' = 'Hel...'
      // Wait, the function is: text.slice(0, maxLength - 3) + "..."
      // So for maxLength=1: text.slice(0, -2) + "..."
      // 'Hello'.slice(0, -2) = 'Hel', result = 'Hel...'
      expect(result).toBe('Hel...')
    })
  })

  describe('Unicode handling', () => {
    it('handles Norwegian characters', () => {
      const result = truncate('Æøå er norske bokstaver', 10)
      expect(result).toBe('Æøå er ...')
    })

    it('handles emojis (multi-byte characters)', () => {
      const result = truncate('Hello 🚢⚓️ World', 10)
      // Note: emojis can be multi-byte, but JS string.length counts UTF-16 code units
      expect(result.length).toBeLessThanOrEqual(10)
    })
  })
})

// =============================================================================
// SLUGIFY TESTS
// =============================================================================
describe('slugify', () => {
  describe('basic functionality', () => {
    it('converts to lowercase', () => {
      const result = slugify('HELLO WORLD')
      expect(result).toBe('hello-world')
    })

    it('replaces spaces with hyphens', () => {
      const result = slugify('hello world')
      expect(result).toBe('hello-world')
    })

    it('removes special characters', () => {
      const result = slugify('hello! @world#')
      expect(result).toBe('hello-world')
    })

    it('trims whitespace', () => {
      const result = slugify('  hello world  ')
      expect(result).toBe('hello-world')
    })
  })

  describe('Norwegian character handling', () => {
    it('converts æ to ae', () => {
      const result = slugify('Pair')
      expect(result).toBe('pair')

      const result2 = slugify('Pair æble')
      expect(result2).toBe('pair-aeble')
    })

    it('converts ø to o', () => {
      const result = slugify('Sjømann')
      expect(result).toBe('sjomann')
    })

    it('converts å to a', () => {
      const result = slugify('Båt')
      expect(result).toBe('bat')
    })

    it('handles multiple Norwegian characters', () => {
      const result = slugify('Blåbær på sjøen')
      expect(result).toBe('blabaer-pa-sjoen')
    })

    it('handles uppercase Norwegian characters', () => {
      const result = slugify('ÆRLIG ØKONOMI ÅR')
      expect(result).toBe('aerlig-okonomi-ar')
    })
  })

  describe('hyphen handling', () => {
    it('collapses multiple spaces to single hyphen', () => {
      const result = slugify('hello    world')
      expect(result).toBe('hello-world')
    })

    it('collapses multiple hyphens to single hyphen', () => {
      const result = slugify('hello---world')
      expect(result).toBe('hello-world')
    })

    it('removes leading hyphens', () => {
      const result = slugify('---hello')
      expect(result).toBe('hello')
    })

    it('removes trailing hyphens', () => {
      const result = slugify('hello---')
      expect(result).toBe('hello')
    })

    it('handles underscores like spaces', () => {
      const result = slugify('hello_world_test')
      expect(result).toBe('hello-world-test')
    })
  })

  describe('edge cases', () => {
    it('handles empty string', () => {
      const result = slugify('')
      expect(result).toBe('')
    })

    it('handles string with only special characters', () => {
      const result = slugify('!@#$%^&*()')
      expect(result).toBe('')
    })

    it('handles string with only spaces', () => {
      const result = slugify('     ')
      expect(result).toBe('')
    })

    it('preserves numbers', () => {
      const result = slugify('Page 123 Test')
      expect(result).toBe('page-123-test')
    })

    it('handles mixed content', () => {
      const result = slugify('Kaptein (Sjø) - 2024!')
      expect(result).toBe('kaptein-sjo-2024')
    })
  })

  describe('real-world URL examples', () => {
    it('creates valid URL slug for job posting', () => {
      const result = slugify('Styrmann på Supplyskip - Vestlandet')
      expect(result).toBe('styrmann-pa-supplyskip-vestlandet')
    })

    it('creates valid URL slug for campaign', () => {
      const result = slugify('Maskinsjef Lønn 80.000+ kr/mnd')
      expect(result).toBe('maskinsjef-lonn-80000-krmnd')
    })

    it('creates valid URL slug with numbers', () => {
      const result = slugify('4-4 Rotasjon Offshore 2024')
      expect(result).toBe('4-4-rotasjon-offshore-2024')
    })
  })
})

// =============================================================================
// INTEGRATION / REAL USAGE TESTS
// =============================================================================
describe('Real usage scenarios', () => {
  it('cn with component props pattern', () => {
    const baseClasses = 'px-4 py-2 rounded'
    const variantClasses = {
      primary: 'bg-blue-500 text-white',
      secondary: 'bg-gray-200 text-gray-800',
    }
    const variant = 'primary'
    const isDisabled = false

    const result = cn(
      baseClasses,
      variantClasses[variant],
      isDisabled && 'opacity-50 cursor-not-allowed'
    )

    expect(result).toBe('px-4 py-2 rounded bg-blue-500 text-white')
  })

  it('formatCurrency for salary display', () => {
    const monthlySalary = 65000
    const result = formatCurrency(monthlySalary)
    expect(result.replace(/\s/g, ' ')).toMatch(/65\s*000/)
    expect(result).toContain('kr')
  })

  it('formatDate for job posting deadline', () => {
    const deadline = '2024-12-31'
    const result = formatDate(deadline)
    expect(result).toContain('31')
    expect(result.toLowerCase()).toMatch(/des/)
    expect(result).toContain('2024')
  })

  it('truncate for job description preview', () => {
    const description = 'Vi søker etter en erfaren kaptein med minimum 5 års erfaring på offshore supply skip. Stillingen innebærer rotasjon 4-4 med konkurransedyktig lønn og gode betingelser.'
    const result = truncate(description, 100)
    expect(result.length).toBe(100)
    expect(result.endsWith('...')).toBe(true)
  })

  it('slugify for URL-safe job IDs', () => {
    const jobTitle = 'Maskinsjef - Øst-Norge - Fast Stilling'
    const result = slugify(jobTitle)
    expect(result).toBe('maskinsjef-ost-norge-fast-stilling')
    // Should be valid URL path segment
    expect(result).toMatch(/^[a-z0-9-]+$/)
  })
})
