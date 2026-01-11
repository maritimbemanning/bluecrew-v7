import type { Metadata } from 'next';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { getOgImageUrl, IMAGE_PATHS } from '@/lib/images';
import TjenesterClient from './TjenesterClient';

const breadcrumbs = [
  { name: 'Hjem', url: '/' },
  { name: 'Tjenester', url: '/tjenester' },
];

export const metadata: Metadata = {
  title: 'Våre Tjenester | Maritim Bemanning og Rekruttering',
  description: 'Stolt leverandør og partner av maritim bemanning og rekruttering. Vi sikrer pålitelige bemanningsløsninger til oppdrettsnæringen, offshore og rederi.',
  keywords: [
    'maritim bemanning',
    'maritime tjenester',
    'bemanningstjenester',
    'rekruttering sjøfart',
    'innleie mannskap',
    'crewing solutions',
    'havbruk bemanning',
    'offshore bemanning',
  ],
  openGraph: {
    title: 'Våre Tjenester',
    description: 'Stolt leverandør og partner av maritim bemanning og rekruttering.',
    url: 'https://bluecrew.no/tjenester',
    siteName: 'Bluecrew AS',
    locale: 'nb_NO',
    type: 'website',
    images: [
      {
        url: getOgImageUrl(IMAGE_PATHS.og.default),
        width: 1200,
        height: 630,
        alt: 'Bluecrew maritime tjenester',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Våre Tjenester',
    description: 'Stolt leverandør og partner av maritim bemanning og rekruttering.',
    images: [getOgImageUrl(IMAGE_PATHS.og.default)],
  },
  alternates: {
    canonical: 'https://bluecrew.no/tjenester',
  },
};

export default function TjenesterPage() {
  return (
    <>
      <SchemaMarkup type="breadcrumb" breadcrumbs={breadcrumbs} />
      <TjenesterClient />
    </>
  );
}

