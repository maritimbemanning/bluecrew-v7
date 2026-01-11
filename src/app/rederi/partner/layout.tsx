import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bli partner med Bluecrew',
  description: 'Strategisk samarbeid for rederier som ønsker dedikert bemanningspartner. Skreddersydde løsninger, prioritert tilgang til mannskap og langsiktig samarbeid.',
  openGraph: {
    title: 'Bli partner med Bluecrew',
    description: 'Strategisk samarbeid for rederier. Skreddersydde løsninger og prioritert tilgang til mannskap.',
    url: 'https://bluecrew.no/rederi/partner',
    siteName: 'Bluecrew AS',
    locale: 'nb_NO',
    type: 'website',
  },
  alternates: {
    canonical: 'https://bluecrew.no/rederi/partner',
  },
};

export default function PartnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

