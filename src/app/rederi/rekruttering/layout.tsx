import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fast rekruttering til sjøs',
  description: 'Rekruttering til faste stillinger om bord. Grundig screening, verifisering og tydelig prosess fra kartlegging til ansettelse.',
  openGraph: {
    title: 'Fast rekruttering til sjøs',
    description: 'Rekruttering til faste stillinger om bord. Grundig screening, verifisering og tydelig prosess.',
    url: 'https://bluecrew.no/rederi/rekruttering',
    siteName: 'Bluecrew AS',
    locale: 'nb_NO',
    type: 'website',
  },
  alternates: {
    canonical: 'https://bluecrew.no/rederi/rekruttering',
  },
};

export default function RekrutteringLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

