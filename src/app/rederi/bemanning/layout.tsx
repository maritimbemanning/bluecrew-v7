import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Maritim bemanning og innleie | Vikarbyrå for sjøfolk',
  description: 'Fleksibel innleie av kvalifiserte sjøfolk. Vikarer, rotasjonsbemanning og prosjektmannskap til offshore, havbruk og shipping.',
  keywords: ['maritim vikarbyrå', 'vikar til sjøs', 'innleie sjøfolk', 'offshore vikar', 'matros vikar'],
  openGraph: {
    title: 'Maritim bemanning og innleie',
    description: 'Fleksibel innleie av kvalifiserte sjøfolk. Rotasjonsbasert bemanning til maritim sektor.',
    url: 'https://bluecrew.no/rederi/bemanning',
    siteName: 'Bluecrew AS',
    locale: 'nb_NO',
    type: 'website',
  },
  alternates: {
    canonical: 'https://bluecrew.no/rederi/bemanning',
  },
};

export default function BemanningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

