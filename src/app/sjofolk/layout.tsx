import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'For sjøfolk – Din neste mulighet til sjøs',
  description: 'Registrer deg hos Bluecrew og få tilgang til maritime jobber innen offshore, havbruk og rederi. BankID-verifisert profil, personlig oppfølging.',
  openGraph: {
    title: 'For sjøfolk – Din neste mulighet til sjøs',
    description: 'Registrer deg hos Bluecrew og få tilgang til maritime jobber. BankID-verifisert profil.',
    url: 'https://bluecrew.no/sjofolk',
    siteName: 'Bluecrew AS',
    locale: 'nb_NO',
    type: 'website',
  },
  alternates: {
    canonical: 'https://bluecrew.no/sjofolk',
  },
};

export default function SjofolkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

