import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Om Bluecrew – Bygget av sjøfolk',
  description: 'Bluecrew er et norsk maritimt bemanningsselskap. Vi kobler kvalifiserte sjøfolk med rederier innen offshore, havbruk og shipping.',
  openGraph: {
    title: 'Om Bluecrew – Bygget av sjøfolk',
    description: 'Norsk maritimt bemanningsselskap. Kvalifiserte sjøfolk, pålitelige rederier.',
    url: 'https://bluecrew.no/om-oss',
    siteName: 'Bluecrew AS',
    locale: 'nb_NO',
    type: 'website',
  },
  alternates: {
    canonical: 'https://bluecrew.no/om-oss',
  },
};

export default function OmOssLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

