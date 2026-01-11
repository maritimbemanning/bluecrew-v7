import { Metadata } from 'next';
import TurnusPageContent from './TurnusPageContent';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { getOgImageUrl, IMAGE_PATHS } from '@/lib/images';

const breadcrumbs = [
  { name: 'Hjem', url: '/' },
  { name: 'Turnus', url: '/turnus' },
];

export const metadata: Metadata = {
  title: 'Offshore turnus og rotasjonsordninger 2026',
  description: 'Oversikt over maritime turnusordninger. Beregn dager på jobb, fritid og estimert lønn for 2-4, 1-1, 2-2 og andre rotasjoner. Interaktiv turnus-kalkulator.',
  keywords: [
    'offshore turnus',
    '2-4 rotasjon',
    '2-4 turnus',
    'maritim turnus',
    'havbruk rotasjon',
    'turnus sjømann',
    'rotasjonsordning offshore',
    'hvor lenge er man ute på offshore',
  ],
  openGraph: {
    title: 'Turnus-kalkulator – Beregn din turnus',
    description: 'Se hvor mange dager du jobber, hvor mye fri du får, og hva du tjener per time. Sammenlign med kontorjobb!',
    url: 'https://bluecrew.no/turnus',
    siteName: 'Bluecrew AS',
    locale: 'nb_NO',
    type: 'website',
    images: [
      {
        url: getOgImageUrl(IMAGE_PATHS.og.default),
        width: 1200,
        height: 630,
        alt: 'Offshore turnus-kalkulator - Bluecrew',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Turnus-kalkulator – Beregn din turnus',
    description: 'Se hvor mange dager du jobber, hvor mye fri du får, og hva du tjener per time.',
    images: [getOgImageUrl(IMAGE_PATHS.og.default)],
  },
  alternates: {
    canonical: 'https://bluecrew.no/turnus',
  },
};

const faqItems = [
  {
    question: 'Hva er 2-4 rotasjon offshore?',
    answer: '2-4 rotasjon betyr at du jobber 2 uker offshore, etterfulgt av 4 uker fri hjemme. Dette gir 122 arbeidsdager og 243 fridager per år, og er den mest populære ordningen i norsk offshore.',
  },
  {
    question: 'Hvor mye fri har man med offshore turnus?',
    answer: 'Med 2-4 turnus får du 243 fridager per år. Med 2-2 eller 1-1 turnus får du ca. 182 fridager. Til sammenligning har en vanlig kontorjobb ca. 115 fridager inkludert helger og ferie.',
  },
  {
    question: 'Hva tjener man med offshore turnus?',
    answer: 'Offshore-lønn varierer fra 500.000 til over 1.200.000 kr avhengig av stilling og erfaring. Selv med færre arbeidsdager kan timelønnen være 50-100% høyere enn tilsvarende landbasert jobb.',
  },
  {
    question: 'Hvilken turnus er vanlig i havbruk?',
    answer: '1-1 turnus (1 uke på, 1 uke fri) er vanligst i havbruk og kystfart. Noen stillinger bruker også 2-2 ordning. Dette gir kortere perioder borte fra familie.',
  },
];

export default function TurnusPage() {
  return (
    <>
      <SchemaMarkup type="breadcrumb" breadcrumbs={breadcrumbs} />
      <SchemaMarkup type="faq" faqItems={faqItems} />
      <TurnusPageContent />
    </>
  );
}

