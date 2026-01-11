import type { Metadata } from 'next';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { getOgImageUrl, IMAGE_PATHS } from '@/lib/images';
import OmOssClient from './OmOssClient';

const breadcrumbs = [
  { name: 'Hjem', url: '/' },
  { name: 'Om oss', url: '/om-oss' },
];

export const metadata: Metadata = {
  title: 'Om Bluecrew | Pålitelig Bemanningspartner - Sertifisert',
  description: 'Bluecrew er din bemanningspartner for maritim sektor. DNV-sertifisert. Vi leverer kvalitetssikret bemanning til oppdrett, offshore og shipping.',
  keywords: ['om bluecrew', 'bemanningspartner maritim', 'DNV sertifisert bemanning', 'maritim rekruttering'],
  alternates: {
    canonical: 'https://bluecrew.no/om-oss',
  },
  openGraph: {
    title: 'Om Bluecrew | Pålitelig Bemanningspartner - Sertifisert',
    description: 'Din bemanningspartner for maritim sektor. DNV-sertifisert bemanning til oppdrett, offshore og shipping.',
    url: 'https://bluecrew.no/om-oss',
    siteName: 'Bluecrew',
    locale: 'nb_NO',
    type: 'website',
    images: [
      {
        url: getOgImageUrl(IMAGE_PATHS.og.default),
        width: 1200,
        height: 630,
        alt: 'Om Bluecrew - Sjøfolk som forstår sjøfolk',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Om Bluecrew | Sjøfolk som forstår sjøfolk',
    description: 'Grunnlagt av erfarne sjøfolk i Harstad. DNV-sertifisert bemanning til oppdrett, offshore og shipping.',
    images: [getOgImageUrl(IMAGE_PATHS.og.default)],
  },
};

export default function OmOssPage() {
  return (
    <>
      <SchemaMarkup type="breadcrumb" breadcrumbs={breadcrumbs} />
      <OmOssClient />
    </>
  );
}

