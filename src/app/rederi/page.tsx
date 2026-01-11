import type { Metadata } from 'next';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { getOgImageUrl, IMAGE_PATHS } from '@/lib/images';
import RederiClient from './RederiClient';

const breadcrumbs = [
  { name: 'Hjem', url: '/' },
  { name: 'Rederi', url: '/rederi' },
];

export const metadata: Metadata = {
  title: 'Bemanning til Havbruk og Oppdrett | Akvaservice',
  description: 'Bluecrew leverer kvalifisert mannskap til oppdrettsnæringen. Bemanning til brønnbåt, servicebåt og arbeidsbåt. Din partner i havbruk.',
  keywords: [
    'havbruk bemanning',
    'oppdrett bemanning',
    'akvaservice',
    'brønnbåt bemanning',
    'servicebåt mannskap',
    'akvakultur bemanning',
    'oppdrettsnæringen',
    'fiskeoppdrett bemanning',
    'maritim bemanning havbruk',
    'bluecrew akvaservice',
  ],
  openGraph: {
    title: 'Bemanning til Havbruk og Oppdrett',
    description: 'Bluecrew leverer kvalifisert mannskap til oppdrettsnæringen. Brønnbåt, servicebåt og arbeidsbåt.',
    url: 'https://bluecrew.no/rederi',
    siteName: 'Bluecrew AS',
    locale: 'nb_NO',
    type: 'website',
    images: [
      {
        url: getOgImageUrl(IMAGE_PATHS.og.default),
        width: 1200,
        height: 630,
        alt: 'Bluecrew - Bemanning til havbruk og oppdrett',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bemanning til Havbruk og Oppdrett',
    description: 'Bluecrew leverer kvalifisert mannskap til oppdrettsnæringen. Din partner i havbruk.',
    images: [getOgImageUrl(IMAGE_PATHS.og.default)],
  },
  alternates: {
    canonical: 'https://bluecrew.no/rederi',
  },
};

const faqItems = [
  {
    question: 'Hvilke fartøystyper bemanner dere?',
    answer: 'Vi leverer mannskap til hele spekteret: Offshore (PSV, AHTS), Havbruk (Servicefartøy, Brønnbåt), og generell Shipping (Tank, Bulk, Passasjer).',
  },
  {
    question: 'Hvor raskt kan dere stille med folk?',
    answer: 'Vi har en stor base av prekvalifiserte sjøfolk. Ved akutte behov kan vi ofte mobilisere mannskap innen 24 timer.',
  },
  {
    question: 'Tar dere arbeidsgiveransvaret?',
    answer: 'Ja, ved innleie fungerer Bluecrew som arbeidsgiver. Vi håndterer lønn, sosiale kostnader, forsikringer og oppfølging.',
  },
  {
    question: 'Tilbyr dere fast rekruttering?',
    answer: 'Ja, vi bistår med hele rekrutteringsprosessen for faste ansettelser, inkludert headhunting av kandidater som ikke aktivt søker jobb.',
  },
];

export default function RederiPage() {
  return (
    <>
      <SchemaMarkup type="breadcrumb" breadcrumbs={breadcrumbs} />
      <SchemaMarkup type="faq" faqItems={faqItems} />
      <RederiClient />
    </>
  );
}

