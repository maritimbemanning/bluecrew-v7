import type { Metadata } from 'next';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { getOgImageUrl, IMAGE_PATHS } from '@/lib/images';
import HavbrukClient from './HavbrukClient';

const breadcrumbs = [
  { name: 'Hjem', url: '/' },
  { name: 'For rederier', url: '/rederi' },
  { name: 'Havbruk', url: '/rederi/havbruk' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://bluecrew.no/rederi/havbruk#service',
  name: 'Bemanningsbyrå for Havbruk | Bluecrew',
  description: 'Bemanningsbyrå og vikarbyrå for havbruksnæringen – bygget på bransjekunnskap. Et vikarbyrå som forstår behovene på havet.',
  provider: {
    '@type': 'Organization',
    '@id': 'https://bluecrew.no/#organization',
    name: 'Bluecrew AS',
  },
  serviceType: 'Maritime Staffing - Aquaculture',
  areaServed: {
    '@type': 'Country',
    name: 'Norway',
  },
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    priceSpecification: {
      '@type': 'PriceSpecification',
      priceCurrency: 'NOK',
    },
  },
};

export const metadata: Metadata = {
  title: 'Bemanningsbyrå for Havbruk | Vikarbyrå',
  description: 'Bemanningsbyrå og vikarbyrå for havbruk – et vikarbyrå som forstår behovene på havet. Maritim bemanning til servicebåt, brønnbåt og arbeidsbåt. Kvalifisert mannskap på kort varsel.',
  keywords: [
    'bemanningsbyrå',
    'bemanningsbyrå havbruk',
    'vikarbyrå',
    'vikarbyrå havbruk',
    'havbruk bemanning',
    'servicebåt bemanning',
    'brønnbåt bemanning',
    'arbeidsbåt mannskap',
    'maritim bemanning havbruk',
    'oppdrett bemanning',
    'akutt bemanning havbruk',
    'sesong bemanning havbruk',
  ],
  openGraph: {
    title: 'Bemanning til Havbruk og Oppdrett | Akvaservice',
    description: 'Kvalifisert mannskap til oppdrettsnæringen. Brønnbåt, servicebåt og arbeidsbåt.',
    url: 'https://bluecrew.no/rederi/havbruk',
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
    description: 'Kvalifisert mannskap til oppdrettsnæringen. Din partner i havbruk.',
    images: [getOgImageUrl(IMAGE_PATHS.og.default)],
  },
  alternates: {
    canonical: 'https://bluecrew.no/rederi/havbruk',
  },
};

export default function HavbrukBemanningPage() {
  return (
    <>
      <SchemaMarkup type="custom" data={serviceSchema} />
      <SchemaMarkup type="breadcrumb" breadcrumbs={breadcrumbs} />
      <HavbrukClient />
    </>
  );
}

