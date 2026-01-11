import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Brukervilkår',
  description: 'Les Bluecrews brukervilkår for kandidater og oppdragsgivere. Vilkår for bruk av våre bemanningstjenester og nettplattform.',
  openGraph: {
    title: 'Brukervilkår',
    description: 'Brukervilkår for Bluecrews bemanningstjenester og nettplattform.',
    url: 'https://bluecrew.no/vilkar',
    siteName: 'Bluecrew AS',
    locale: 'nb_NO',
    type: 'website',
  },
  alternates: {
    canonical: 'https://bluecrew.no/vilkar',
  },
};

export default function VilkarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

