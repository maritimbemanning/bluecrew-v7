import type { Metadata } from 'next';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import BemanningClient from './BemanningClient';

export const metadata: Metadata = {
  title: 'Bemanningsbyrå & Vikarbyrå | Maritim Innleie',
  description: 'Bemanningsbyrå og vikarbyrå for maritim innleie – bygget på bransjekunnskap. Fleksibel bemanning av sjøfolk til rederi og offshore. DNV-sertifisert med rask mobilisering.',
  keywords: [
    'bemanningsbyrå',
    'vikarbyrå',
    'bemanningsbyrå maritim',
    'vikarbyrå sjøfolk',
    'maritim bemanning',
    'innleie sjøfolk',
    'offshore bemanning',
    'rederi bemanning',
    'mannskap utleie',
    'DNV sertifisert bemanning',
    'akutt bemanning',
    'rask bemanning sjøfolk',
    'sesong bemanning',
  ],
  openGraph: {
    title: 'Bemanningsbyrå & Vikarbyrå for Maritim Innleie',
    description: 'Bemanningsbyrå bygget på bransjekunnskap. Et vikarbyrå som forstår behovene på havet.',
    url: 'https://bluecrew.no/rederi/bemanning',
    siteName: 'Bluecrew AS',
    locale: 'nb_NO',
  },
  alternates: {
    canonical: 'https://bluecrew.no/rederi/bemanning',
  },
};

const breadcrumbs = [
  { name: 'Hjem', url: '/' },
  { name: 'For rederier', url: '/rederi' },
  { name: 'Bemanning', url: '/rederi/bemanning' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://bluecrew.no/rederi/bemanning#service',
  name: 'Maritim Bemanning - Bemanningsbyrå & Vikarbyrå',
  alternateName: ['Maritim Vikarbyrå', 'Sjøfolk Bemanning', 'Maritime Staffing Norway'],
  provider: {
    '@type': 'Organization',
    '@id': 'https://bluecrew.no/#organization',
    name: 'Bluecrew AS',
    url: 'https://bluecrew.no',
  },
  description: 'Bluecrew er et spesialisert bemanningsbyrå og vikarbyrå som leverer kvalifiserte sjøfolk til rederier. DNV-sertifisert maritim bemanning med rask mobilisering.',
  serviceType: 'Maritime Staffing Services',
  areaServed: {
    '@type': 'Country',
    name: 'Norway',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Maritime Bemanning Tjenester',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Kaptein bemanning' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Styrmann bemanning' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Maskinist bemanning' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Matros bemanning' } },
    ],
  },
};

export default function BemanningPage() {
  return (
    <>
      <SchemaMarkup type="custom" data={serviceSchema} />
      <SchemaMarkup type="breadcrumb" breadcrumbs={breadcrumbs} />
      <BemanningClient />
    </>
  );
}

