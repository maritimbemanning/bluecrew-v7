import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Personvernerklæring',
  description: 'Les om hvordan Bluecrew behandler og beskytter dine personopplysninger. GDPR-kompatibel personvernpolicy for kandidater og oppdragsgivere.',
  openGraph: {
    title: 'Personvernerklæring',
    description: 'Hvordan Bluecrew behandler og beskytter dine personopplysninger.',
    url: 'https://bluecrew.no/personvern',
    siteName: 'Bluecrew AS',
    locale: 'nb_NO',
    type: 'website',
  },
  alternates: {
    canonical: 'https://bluecrew.no/personvern',
  },
};

export default function PersonvernLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

