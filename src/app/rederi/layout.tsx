import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'For rederier – Kvalifisert mannskap',
  description: 'Bluecrew leverer kvalifiserte sjøfolk til offshore, havbruk og shipping. Fast rekruttering eller fleksibel innleie med verifisering og tydelige rammer.',
  openGraph: {
    title: 'For rederier – Kvalifisert mannskap',
    description: 'Kvalifiserte sjøfolk til offshore, havbruk og shipping. Verifisering og tydelige rammer.',
    url: 'https://bluecrew.no/rederi',
    siteName: 'Bluecrew AS',
    locale: 'nb_NO',
    type: 'website',
  },
  alternates: {
    canonical: 'https://bluecrew.no/rederi',
  },
};

export default function RederiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

