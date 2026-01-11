import { z } from "zod";

// Shared validators
const norwegianPhoneRegex = /^(\+47)?[0-9]{8}$/;
const norwegianPhone = z
  .string()
  .regex(norwegianPhoneRegex, "Ugyldig telefonnummer (8 siffer)")
  .optional()
  .or(z.literal(""));

// Contact form validation (/kontakt)
export const contactSchema = z.object({
  navn: z.string().min(2, "Navnet må være minst 2 tegn").max(100),
  epost: z.string().email("Ugyldig e-postadresse").toLowerCase(),
  telefon: norwegianPhone,
  melding: z.string().min(10, "Meldingen må være minst 10 tegn").max(2000),
  // GDPR compliance
  godtarVilkar: z.boolean().refine((val) => val === true, {
    message: "Du må godta personvernerklæringen",
  }),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// Interest lead form validation (/meld-interesse)
export const interestLeadSchema = z.object({
  navn: z.string().min(2, "Navnet må være minst 2 tegn").max(100),
  epost: z.string().email("Ugyldig e-postadresse").toLowerCase(),
  telefon: norwegianPhone,
  type: z.enum(["sjomann", "rederi", "annet"]),
  stilling: z.string().max(100).optional().or(z.literal("")),
  region: z.string().max(100).optional().or(z.literal("")), // Preferred work region
  erfaring: z.string().max(50).optional().or(z.literal("")), // Years of experience
  tilgjengeligFra: z.string().optional().or(z.literal("")), // Available from date
  melding: z.string().max(2000).optional().or(z.literal("")),
  // GDPR & Markedsføringsloven compliance
  godtarVilkar: z.boolean().refine((val) => val === true, {
    message: "Du må godta personvernerklæringen og vilkårene",
  }),
  markedsforing: z.boolean().optional(), // Optional marketing consent
}).refine(
  (data) => {
    // Stilling er påkrevd for sjøfolk
    if (data.type === "sjomann" && (!data.stilling || data.stilling === "")) {
      return false;
    }
    return true;
  },
  {
    message: "Du må velge en stilling",
    path: ["stilling"],
  }
).refine(
  (data) => {
    // Erfaring er påkrevd for sjøfolk
    if (data.type === "sjomann" && (!data.erfaring || data.erfaring === "")) {
      return false;
    }
    return true;
  },
  {
    message: "Du må velge erfaringsnivå",
    path: ["erfaring"],
  }
);

export type InterestLeadFormData = z.infer<typeof interestLeadSchema>;

// Staffing needs form validation (/rederi/behov)
export const staffingNeedsSchema = z.object({
  fartoytype: z.string().min(2, "Fartøytype må være minst 2 tegn").max(100),
  stillinger: z
    .array(z.string())
    .min(1, "Velg minst én stilling")
    .max(10, "Maks 10 stillinger"),
  antall: z.number().int().min(1, "Antall må være minst 1").max(999),
  oppstart: z.string().optional().or(z.literal("")), // ISO date string
  rotasjon: z.string().max(100).optional().or(z.literal("")),
  kontakt_navn: z.string().min(2, "Navnet må være minst 2 tegn").max(100),
  kontakt_epost: z.string().email("Ugyldig e-postadresse").toLowerCase(),
  kontakt_telefon: norwegianPhone,
  bedrift: z.string().max(100).optional().or(z.literal("")),
  merknad: z.string().max(2000).optional().or(z.literal("")),
  // GDPR compliance
  godtarVilkar: z.boolean().refine((val) => val === true, {
    message: "Du må godta personvernerklæringen",
  }),
});

export type StaffingNeedsFormData = z.infer<typeof staffingNeedsSchema>;

// Candidate registration (placeholder for Vipps integration)
export const candidateRegistrationSchema = z.object({
  // Basic info (will be pre-filled from Vipps/BankID)
  fornavn: z.string().min(1).max(100),
  etternavn: z.string().min(1).max(100),
  epost: z.string().email().toLowerCase(),
  telefon: norwegianPhone,

  // Additional profile data
  kompetanse: z.array(z.string()).optional(),
  tilgjengelighet: z.string().max(500).optional(),
});

export type CandidateRegistrationFormData = z.infer<typeof candidateRegistrationSchema>;

// Full registration form after Vipps login (/registrer)
export const registrationSchema = z.object({
  rolle: z.string().min(1, "Du må velge en stilling"),
  erfaring: z.string().min(1, "Du må velge erfaringsnivå"),
  onskerMidlertidig: z.enum(['true', 'false'], {
    required_error: "Du må svare på om du ønsker midlertidig ansettelse",
  }),
  tilgjengeligFra: z.string().optional().or(z.literal("")),
  melding: z.string().max(2000).optional().or(z.literal("")),
  stcwConsent: z.boolean().refine((val) => val === true, {
    message: "Du må bekrefte at du har eller kan skaffe nødvendige sertifikater",
  }),
  gdprConsent: z.boolean().refine((val) => val === true, {
    message: "Du må godta personvernerklæringen og vilkårene",
  }),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;

// Newsletter subscription schema
export const newsletterSchema = z.object({
  epost: z.string().email("Ugyldig e-postadresse"),

  consent: z
    .boolean()
    .refine((val) => val === true, {
      message: "Du må godta vilkårene",
    }),
});

export type NewsletterData = z.infer<typeof newsletterSchema>;
