import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Slett dine data | Bluecrew',
  description: 'Be om sletting av dine personopplysninger i henhold til GDPR.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SlettDataLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
