import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meld interesse',
  description: 'Registrer deg i Bluecrews database og bli kontaktet når vi har relevante maritime jobber for deg. Offshore, havbruk og shipping.',
  openGraph: {
    title: 'Meld interesse',
    description: 'Registrer deg og bli kontaktet når vi har relevante maritime jobber for deg.',
    url: 'https://bluecrew.no/meld-interesse',
    siteName: 'Bluecrew AS',
    locale: 'nb_NO',
    type: 'website',
  },
  alternates: {
    canonical: 'https://bluecrew.no/meld-interesse',
  },
};

export default function MeldInteresseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

