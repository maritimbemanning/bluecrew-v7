import { Metadata } from 'next';

// This page redirects to /meld-interesse - metadata for crawlers that don't follow redirects
export const metadata: Metadata = {
  title: 'Registrer deg - Omdirigerer',
  description: 'Denne siden har flyttet til /meld-interesse',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: 'https://bluecrew.no/meld-interesse',
  },
};

export default function RegistrerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

