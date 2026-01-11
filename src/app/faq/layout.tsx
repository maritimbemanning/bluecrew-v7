import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ofte stilte spørsmål',
  description: 'Finn svar på vanlige spørsmål om maritim bemanning, registrering, lønn, turnus og karrieremuligheter hos Bluecrew.',
  openGraph: {
    title: 'Ofte stilte spørsmål',
    description: 'Svar på vanlige spørsmål om maritim bemanning, registrering, lønn og karriere.',
    url: 'https://bluecrew.no/faq',
    siteName: 'Bluecrew AS',
    locale: 'nb_NO',
    type: 'website',
  },
  alternates: {
    canonical: 'https://bluecrew.no/faq',
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

