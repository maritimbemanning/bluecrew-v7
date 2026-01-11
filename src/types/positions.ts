/**
 * Position types and data structures for SEO content generation
 *
 * Maritime positions covered:
 * - Kaptein (Captain)
 * - Styrmann (Mate/Officer)
 * - Maskinist (Engineer)
 * - ETO (Electro-Technical Officer)
 * - Matros (Able Seaman)
 * - Kokk (Cook)
 */

export type Position =
  | 'kaptein'
  | 'styrmann'
  | 'maskinist'
  | 'eto'
  | 'matros'
  | 'kokk';

export interface PositionData {
  id: Position;
  name: string;                    // "Kaptein"
  nameDefinite: string;            // "kapteinen" (for sentences)
  slug: string;                    // "kaptein" (for URLs)

  // Salary data
  salaryRange: {
    min: number;
    max: number;
    typical: number;               // Middle range for "typical" examples
  };

  // Career info
  education: string[];             // Required education
  certifications: string[];        // Required certificates (STCW, etc.)
  experienceYears: {
    min: number;
    typical: number;
  };

  // Job description
  responsibilities: string[];      // Key duties
  dailyTasks: string[];           // Day-to-day activities
  workEnvironment: string;        // Where they work

  // Career path
  careerPath: {
    entry: string;                 // Entry-level position
    progression: string[];         // Career progression steps
    specializations: string[];     // Possible specializations
  };

  // SEO keywords
  keywords: {
    primary: string[];             // Main keywords for this position
    secondary: string[];           // Related keywords
    longtail: string[];           // Long-tail keywords
  };

  // Content hints for generators
  contentHints: {
    lonnFocus: string[];          // Key points for salary pages
    karriereFocus: string[];      // Key points for career pages
    faqTopics: string[];          // Common questions
  };
}

/**
 * Array of all positions for iteration
 */
export const POSITIONS_ARRAY: Position[] = [
  'kaptein',
  'styrmann',
  'maskinist',
  'eto',
  'matros',
  'kokk',
];
