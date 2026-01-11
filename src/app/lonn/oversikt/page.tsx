import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lønnsoversikt – Maritime stillinger i Norge',
  description: 'Komplett oversikt over lønnsnivåer for sjøfolk i Norge. Kaptein, styrmann, maskinist, matros og flere stillinger.',
  alternates: {
    canonical: 'https://bluecrew.no/lonn',
  },
  robots: {
    index: false,
    follow: true,
  },
};

/**
 * Redirect /lonn/oversikt til /lonn
 * Beholder gammel Google-ranking ved å redirecte permanent
 */
export default function LonnOversiktPage() {
  redirect('/lonn');
}

