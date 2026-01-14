import type { Metadata } from 'next';
import type { Position } from '@/types/positions';
import { getPosition } from '@/lib/data/positions';
import { getOgImageUrl, IMAGE_PATHS } from '@/lib/images';

/**
 * Generate metadata for position lønn pages
 * Optimized for CTR with exact salary figures and power words
 */
export function generatePositionLonnMetadata(positionId: Position): Metadata {
  const pos = getPosition(positionId);
  const year = new Date().getFullYear();
  const minK = Math.round(pos.salaryRange.min / 1000);
  const maxK = Math.round(pos.salaryRange.max / 1000);
  const typicalK = Math.round(pos.salaryRange.typical / 1000);

  return {
    title: `${pos.name} Lønn ${year}: ${minK}k–${maxK > 999 ? '1.2M' : maxK + 'k'} kr | Oppdatert`,
    description: `Hva tjener en ${pos.name.toLowerCase()}? Gjennomsnitt ${typicalK} 000 kr. Se lønnstabell for offshore, havbruk og rederi. Sammenlign din lønn nå →`,
    keywords: [...pos.keywords.primary, ...pos.keywords.longtail].join(', '),
    openGraph: {
      title: `${pos.name} Lønn ${year}: ${minK}k–${maxK > 999 ? '1.2M' : maxK + 'k'} kr`,
      description: `Se hva ${pos.nameDefinite} tjener i Norge. Lønnstabell for offshore, havbruk og rederi. Data fra SSB og NHO Sjøfart.`,
      type: 'article',
      locale: 'nb_NO',
      siteName: 'Bluecrew',
      url: `https://bluecrew.no/lonn/${pos.slug}`,
      images: [
        {
          url: getOgImageUrl(IMAGE_PATHS.og.lonn),
          width: 1200,
          height: 630,
          alt: `${pos.name} lønn ${year} - lønnsoversikt`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${pos.name} Lønn ${year}: ${minK}k–${maxK > 999 ? '1.2M' : maxK + 'k'} kr`,
      description: `Gjennomsnittlig ${pos.name.toLowerCase()}-lønn: ${typicalK} 000 kr. Offshore betaler best. Se full lønnstabell →`,
      images: [getOgImageUrl(IMAGE_PATHS.og.lonn)],
    },
    alternates: {
      canonical: `https://bluecrew.no/lonn/${pos.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

/**
 * Generate metadata for position karriere pages
 * Optimized for "hvordan bli X" searches
 */
export function generatePositionKarriereMetadata(
  positionId: Position
): Metadata {
  const pos = getPosition(positionId);
  const year = new Date().getFullYear();
  const typicalK = Math.round(pos.salaryRange.typical / 1000);

  return {
    title: `Bli ${pos.name} i ${year}: Utdanning, Krav & Lønn ${typicalK}k+`,
    description: `Komplett guide: Slik blir du ${pos.name.toLowerCase()}. Utdanning, STCW-sertifikater, ${pos.experienceYears.typical} års erfaring. Lønn opptil ${Math.round(pos.salaryRange.max/1000)}k. Start karrieren →`,
    keywords: [...pos.keywords.primary, ...pos.keywords.secondary].join(', '),
    openGraph: {
      title: `Bli ${pos.name}: Utdanning, Sertifikater & Karrierevei`,
      description: `Steg-for-steg guide til ${pos.name.toLowerCase()}-karriere. Fra utdanning til jobb. Lønn ${typicalK}k–${Math.round(pos.salaryRange.max/1000)}k.`,
      type: 'article',
      locale: 'nb_NO',
      siteName: 'Bluecrew',
      url: `https://bluecrew.no/karriere/${pos.slug}`,
      images: [
        {
          url: getOgImageUrl(IMAGE_PATHS.og.sjofolk),
          width: 1200,
          height: 630,
          alt: `Bli ${pos.name} - karriereguide ${year}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Bli ${pos.name}: Utdanning, Sertifikater & Karrierevei`,
      description: `Hvordan bli ${pos.name.toLowerCase()}? Komplett guide med utdanning, krav og lønnspotensial ${typicalK}k+ →`,
      images: [getOgImageUrl(IMAGE_PATHS.og.sjofolk)],
    },
    alternates: {
      canonical: `https://bluecrew.no/karriere/${pos.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

/**
 * Generate metadata for lønn landing page
 * PRIMARY SEO PAGE - drives organic traffic
 */
export function generateLonnLandingMetadata(): Metadata {
  const year = new Date().getFullYear();

  return {
    title: `Lønn Til Sjøs ${year}: Kaptein 1.2M, Maskinist 950k, Matros 650k`,
    description: `Oppdatert lønnsoversikt for sjøfolk i Norge. Kaptein: 600k–1.2M. Maskinist: 500k–950k. Matros: 420k–650k. Sammenlign offshore vs havbruk vs rederi →`,
    keywords:
      'lønn til sjøs, maritim lønn, offshore lønn, sjømann lønn, kaptein lønn, maskinist lønn, matros lønn, styrmann lønn, ETO lønn, kokk lønn offshore',
    openGraph: {
      title: `Lønn Til Sjøs ${year}: Komplett Lønnsoversikt`,
      description: `Hva tjener sjøfolk i Norge? Lønnstabeller for kaptein, styrmann, maskinist, ETO, matros og kokk. Offshore vs havbruk vs rederi.`,
      type: 'website',
      locale: 'nb_NO',
      siteName: 'Bluecrew',
      url: 'https://bluecrew.no/lonn',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Lønn Til Sjøs ${year}: Kaptein 1.2M, Maskinist 950k`,
      description: `Komplett lønnsoversikt for alle maritime stillinger. Se hva du kan tjene offshore, havbruk og rederi →`,
    },
    alternates: {
      canonical: 'https://bluecrew.no/lonn',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

/**
 * Generate metadata for karriere landing page
 */
export function generateKarriereLandingMetadata(): Metadata {
  const year = new Date().getFullYear();

  return {
    title: `Karriere Til Sjøs ${year}: Utdanning, Lønn & Jobbmuligheter`,
    description: `Start maritim karriere: Kaptein, styrmann, maskinist, ETO, matros eller kokk. Se utdanningskrav, STCW-sertifikater og lønnspotensial opptil 1.2M kr →`,
    keywords:
      'karriere til sjøs, maritim utdanning, bli sjømann, nautisk fagskole, maritime karriereveier, STCW sertifikat, bli kaptein, bli maskinist',
    openGraph: {
      title: `Karriere Til Sjøs: Din Guide til Maritim Karriere`,
      description: `Komplett karriereguide: Utdanning, sertifikater og lønn for kaptein, styrmann, maskinist, ETO, matros og kokk.`,
      type: 'website',
      locale: 'nb_NO',
      siteName: 'Bluecrew',
      url: 'https://bluecrew.no/karriere',
      images: [
        {
          url: getOgImageUrl(IMAGE_PATHS.og.sjofolk),
          width: 1200,
          height: 630,
          alt: `Karriere til sjøs ${year} - maritim karriereguide`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Karriere Til Sjøs: Utdanning, Lønn & Muligheter`,
      description: `Bli kaptein, maskinist eller matros. Komplett guide med utdanning, krav og lønn opptil 1.2M kr →`,
      images: [getOgImageUrl(IMAGE_PATHS.og.sjofolk)],
    },
    alternates: {
      canonical: 'https://bluecrew.no/karriere',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

/**
 * Generate metadata for home page
 * Focus: Oppdrett, havbruk, maritim sektor
 */
export function generateHomeMetadata(): Metadata {
  return {
    title: 'Bluecrew | Bemanning til Oppdrett, Havbruk & Maritim Sektor',
    description:
      'Bemanningsbyrå for oppdrett, havbruk og maritim sektor. Kvalifiserte sjøfolk til brønnbåt, servicebåt og offshore. DNV-sertifisert. Mannskap på 24t →',
    keywords:
      'oppdrett bemanning, havbruk bemanning, maritim bemanning, bemanningsbyrå havbruk, brønnbåt bemanning, servicebåt mannskap, offshore bemanning, akvakultur bemanning, bluecrew',
    openGraph: {
      title: 'Bluecrew | Bemanning til Oppdrett, Havbruk & Maritim Sektor',
      description:
        'Kvalifisert mannskap til oppdrett, havbruk og offshore. BankID-verifisert. DNV-sertifisert. Levering på 24 timer.',
      type: 'website',
      locale: 'nb_NO',
      siteName: 'Bluecrew',
      url: 'https://bluecrew.no',
      images: [
        {
          url: getOgImageUrl(IMAGE_PATHS.og.default),
          width: 1200,
          height: 630,
          alt: 'Bluecrew - Bemanning til havbruk og maritim sektor',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Bluecrew | Bemanning til Oppdrett, Havbruk & Maritim',
      description:
        'Kvalifisert mannskap til oppdrett, havbruk og offshore. DNV-sertifisert. Levering 24t →',
      images: [getOgImageUrl(IMAGE_PATHS.og.default)],
    },
    alternates: {
      canonical: 'https://bluecrew.no',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

/**
 * Generate metadata for contact page
 */
export function generateContactMetadata(): Metadata {
  return {
    title: 'Kontakt Bluecrew | Bemanning Havbruk & Maritim',
    description:
      'Trenger du mannskap til havbruk eller offshore? Kontakt Bluecrew. Vi leverer kvalifiserte sjøfolk innen 24 timer. Tlf: 70 10 33 00 →',
    keywords: 'kontakt bluecrew, havbruk bemanning kontakt, maritim bemanning, bestill mannskap, akutt bemanning sjø',
    openGraph: {
      title: 'Kontakt Bluecrew | Bemanning på 24 Timer',
      description:
        'Trenger du mannskap? Kontakt oss for kvalifiserte sjøfolk til havbruk og offshore. Svar innen 24 timer.',
      type: 'website',
      locale: 'nb_NO',
      siteName: 'Bluecrew',
      url: 'https://bluecrew.no/kontakt',
      images: [
        {
          url: getOgImageUrl(IMAGE_PATHS.og.default),
          width: 1200,
          height: 630,
          alt: 'Kontakt Bluecrew - maritim bemanning',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Kontakt Bluecrew | Bemanning på 24 Timer',
      description: 'Kvalifisert mannskap til havbruk og offshore. Svar innen 24 timer →',
      images: [getOgImageUrl(IMAGE_PATHS.og.default)],
    },
    alternates: {
      canonical: 'https://bluecrew.no/kontakt',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

/**
 * Generate metadata for about page
 */
export function generateAboutMetadata(): Metadata {
  return {
    title: 'Om Bluecrew | DNV-sertifisert Bemanningsbyrå for Havbruk',
    description:
      'Bluecrew er et godkjent bemanningsforetak for havbruk og maritim sektor. DNV-sertifisert, BankID-verifisert. Grunnlagt av erfarne sjøfolk. Les vår historie →',
    keywords:
      'om bluecrew, DNV sertifisert bemanning, godkjent bemanningsforetak, havbruk bemanning Norge, maritim rekruttering',
    openGraph: {
      title: 'Om Bluecrew | DNV-sertifisert Maritim Bemanning',
      description:
        'Godkjent bemanningsforetak for havbruk og maritim. DNV-sertifisert. Grunnlagt av erfarne sjøfolk.',
      type: 'website',
      locale: 'nb_NO',
      siteName: 'Bluecrew',
      url: 'https://bluecrew.no/om-oss',
      images: [
        {
          url: getOgImageUrl(IMAGE_PATHS.og.default),
          width: 1200,
          height: 630,
          alt: 'Om Bluecrew - DNV-sertifisert bemanningsbyrå',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Om Bluecrew | DNV-sertifisert Maritim Bemanning',
      description: 'Godkjent bemanningsforetak for havbruk og maritim. Grunnlagt av erfarne sjøfolk →',
      images: [getOgImageUrl(IMAGE_PATHS.og.default)],
    },
    alternates: {
      canonical: 'https://bluecrew.no/om-oss',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

/**
 * Generate metadata for FAQ page
 */
export function generateFaqMetadata(): Metadata {
  return {
    title: 'FAQ Sjøfolk: Lønn, Utdanning & Karriere',
    description:
      'Svar på 50+ spørsmål om maritime stillinger. Hva tjener en kaptein? Hvordan bli maskinist? Lønn offshore vs havbruk? Finn svaret her →',
    keywords: 'sjøfolk FAQ, kaptein lønn spørsmål, maskinist utdanning FAQ, karriere til sjøs spørsmål, maritim FAQ',
    openGraph: {
      title: 'FAQ: Alt om Lønn, Utdanning & Karriere Til Sjøs',
      description: 'Svar på vanlige spørsmål om maritime stillinger, lønn og karriereveier. Over 50 spørsmål besvart.',
      type: 'website',
      locale: 'nb_NO',
      siteName: 'Bluecrew',
      url: 'https://bluecrew.no/faq',
      images: [
        {
          url: getOgImageUrl(IMAGE_PATHS.og.default),
          width: 1200,
          height: 630,
          alt: 'FAQ - spørsmål og svar om maritim karriere',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'FAQ: Lønn, Utdanning & Karriere Til Sjøs',
      description: 'Svar på 50+ spørsmål om maritime stillinger og karriere. Finn svaret her →',
      images: [getOgImageUrl(IMAGE_PATHS.og.default)],
    },
    alternates: {
      canonical: 'https://bluecrew.no/faq',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
