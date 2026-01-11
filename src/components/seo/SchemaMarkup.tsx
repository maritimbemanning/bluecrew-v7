import type { Position } from '@/types/positions';
import { getPosition } from '@/lib/data/positions';
import { formatCurrency } from '@/lib/utils';

interface ArticleData {
  headline: string;
  description: string;
  author?: {
    '@type': 'Person' | 'Organization';
    name: string;
    url?: string;
  };
  datePublished?: string;
  dateModified?: string;
  publisher?: {
    '@type': 'Organization';
    name: string;
    url?: string;
    logo?: {
      '@type': 'ImageObject';
      url: string;
    };
  };
  image?: string;
  url?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CustomSchemaData = Record<string, any>;

interface SchemaMarkupProps {
  type: 'article' | 'Article' | 'faq' | 'organization' | 'breadcrumb' | 'custom' | 'speakable';
  position?: Position;
  pageType?: 'lonn' | 'karriere';
  faqItems?: Array<{ question: string; answer: string }>;
  breadcrumbs?: Array<{ name: string; url: string }>;
  data?: ArticleData | CustomSchemaData;
  /** CSS selectors for speakable content (for AI/voice assistants) */
  speakableSelectors?: string[];
  /** Page URL for speakable schema */
  pageUrl?: string;
}

/**
 * Schema Markup Component for SEO
 *
 * Generates JSON-LD structured data for different page types
 * to enhance search engine understanding and enable rich snippets
 */
export function SchemaMarkup({
  type,
  position,
  pageType,
  faqItems,
  breadcrumbs,
  data,
  speakableSelectors,
  pageUrl,
}: SchemaMarkupProps) {
  // Handle speakable schema for AI assistants (Google AI, Bing Copilot, etc.)
  if (type === 'speakable' && speakableSelectors && speakableSelectors.length > 0) {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': pageUrl || 'https://bluecrew.no',
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: speakableSelectors,
      },
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    );
  }

  // Handle custom schema data (for job postings, etc.)
  if (type === 'custom' && data) {
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
    );
  }

  // Handle custom article data (for blog posts, etc.)
  if ((type === 'article' || type === 'Article') && data) {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: data.headline,
      description: data.description,
      author: data.author || {
        '@type': 'Organization',
        name: 'Bluecrew',
        url: 'https://bluecrew.no',
      },
      publisher: data.publisher || {
        '@type': 'Organization',
        name: 'Bluecrew',
        url: 'https://bluecrew.no',
        logo: {
          '@type': 'ImageObject',
          url: 'https://bluecrew.no/logo.png',
        },
      },
      datePublished: data.datePublished || new Date().toISOString(),
      dateModified: data.dateModified || new Date().toISOString(),
      inLanguage: 'nb-NO',
      ...(data.image && { image: data.image }),
      ...(data.url && {
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': data.url,
        },
      }),
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    );
  }

  // Handle position-based articles (for lønn/karriere pages)
  if (type === 'article' && position && pageType) {
    const pos = getPosition(position);
    const year = new Date().getFullYear();

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline:
        pageType === 'lonn'
          ? `${pos.name} Lønn i Norge ${year}`
          : `Bli ${pos.name} - Utdanning og Karriere`,
      description:
        pageType === 'lonn'
          ? `Komplett oversikt over lønn for ${pos.nameDefinite} i Norge. Gjennomsnittlig lønn ${formatCurrency(pos.salaryRange.typical)}.`
          : `Hvordan bli ${pos.name.toLowerCase()}. Utdanning, sertifikater, karrierevei og jobbmuligheter.`,
      author: {
        '@type': 'Organization',
        name: 'Bluecrew',
        url: 'https://bluecrew.no',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Bluecrew',
        url: 'https://bluecrew.no',
        logo: {
          '@type': 'ImageObject',
          url: 'https://bluecrew.no/logo.png',
        },
      },
      datePublished: new Date().toISOString(),
      dateModified: new Date().toISOString(),
      inLanguage: 'nb-NO',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://bluecrew.no/${pageType}/${pos.slug}`,
      },
      keywords: pos.keywords.primary.join(', '),
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    );
  }

  if (type === 'faq' && faqItems && faqItems.length > 0) {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    );
  }

  if (type === 'organization') {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Bluecrew',
      legalName: 'Bluecrew AS',
      url: 'https://bluecrew.no',
      logo: 'https://bluecrew.no/logo.png',
      description:
        'Bluecrew formidler kvalifiserte sjøfolk til norske rederier. Fokus på sikkerhet, kvalitet og menneskelighet.',
      foundingDate: '2025',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'NO',
        addressLocality: 'Norge',
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'Customer Service',
          email: 'kontakt@bluecrew.no',
          availableLanguage: ['Norwegian'],
        },
      ],
      sameAs: [
        'https://linkedin.com/company/bluecrewas',
        'https://www.facebook.com/profile.php?id=61582845493676',
      ],
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    );
  }

  if (type === 'breadcrumb' && breadcrumbs && breadcrumbs.length > 0) {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: `https://bluecrew.no${crumb.url}`,
      })),
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    );
  }

  return null;
}

export default SchemaMarkup;


