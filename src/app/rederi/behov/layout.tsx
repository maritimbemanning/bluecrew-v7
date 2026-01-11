import { Metadata } from 'next';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';

const breadcrumbs = [
  { name: 'Hjem', url: '/' },
  { name: 'Rederi', url: '/rederi' },
  { name: 'Registrer behov', url: '/rederi/behov' },
];

export const metadata: Metadata = {
  title: 'Registrer bemanningsbehov',
  description: 'Fortell oss om ditt bemanningsbehov. Vi matcher deg med kvalifiserte sjøfolk innen 24-48 timer. Offshore, havbruk og shipping.',
  openGraph: {
    title: 'Registrer bemanningsbehov',
    description: 'Fortell oss om ditt bemanningsbehov. Vi matcher deg med kvalifiserte sjøfolk raskt.',
    url: 'https://bluecrew.no/rederi/behov',
    siteName: 'Bluecrew AS',
    locale: 'nb_NO',
    type: 'website',
  },
  alternates: {
    canonical: 'https://bluecrew.no/rederi/behov',
  },
};

export default function BehovLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SchemaMarkup type="breadcrumb" breadcrumbs={breadcrumbs} />
      {children}
    </>
  );
}

