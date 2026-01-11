import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Slett Mine Data – GDPR',
  description: 'Be om sletting av dine personopplysninger i henhold til GDPR. Vi behandler forespørselen din innen 30 dager.',
  openGraph: {
    title: 'Slett Mine Data – GDPR',
    description: 'Be om sletting av dine personopplysninger i henhold til GDPR.',
    url: 'https://bluecrew.no/slett-data',
  },
  alternates: {
    canonical: 'https://bluecrew.no/slett-data',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function SlettDataLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

