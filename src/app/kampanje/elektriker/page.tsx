import { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import ElektrikerForm from '@/components/kampanje/ElektrikerForm';
import OmStillingen from '@/components/kampanje/OmStillingen';
import { OFFSHORE_STILLINGER } from '@/lib/data/kampanje-stillinger';

export const metadata: Metadata = {
  title: 'Elektrikere til Offshore',
  description: 'Equinor investerer 100 milliarder. 4,000 nye årsverk på norsk sokkel. Søk jobb som offshore-elektriker.',
  openGraph: {
    title: 'Elektrikere til Offshore',
    description: 'Massivt behov for offshore-elektrikere på norsk sokkel.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://bluecrew.no/kampanje/elektriker',
  },
  robots: {
    index: false,
    follow: false,
  },
};

const stats = [
  { value: '4,000', label: 'ÅRSVERK PÅ VEI' },
  { value: '2,000+', label: 'REGISTRERTE FAGFOLK' },
];

export default function ElektrikerCampaignPage() {
  const stilling = OFFSHORE_STILLINGER.elektriker;
  
  return (
    <main className="min-h-screen bg-navy-800">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[4rem_4rem]" />

      <Container size="lg" className="relative z-10">
        {/* Hero + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-start pt-24 pb-20 lg:pt-28 lg:pb-12">

          <div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-cream-50 mb-2 lg:mb-3 leading-[0.95] tracking-tight">
              {stilling.kortNavn}
            </h1>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-cream-50 mb-6 lg:mb-8 leading-[0.95] tracking-tight">
              Til <span className="italic">Offshore</span>
            </h2>

            <div className="flex gap-8 lg:gap-10 mb-6">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-4xl lg:text-5xl font-bold text-gold-400 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-cream-100/70 uppercase tracking-wider font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Om Stillingen - ny detaljert komponent */}
            <OmStillingen stilling={stilling} />

            <div className="mt-6 pt-4 border-t border-cream-100/10">
              <p className="text-cream-100/60 text-xs mb-2">Andre stillinger:</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/kampanje/offshore" className="text-gold-400 hover:text-gold-300 text-sm font-medium">
                  Alle stillinger →
                </Link>
                <Link href="/kampanje/riggere" className="text-gold-400 hover:text-gold-300 text-sm font-medium">
                  Riggere →
                </Link>
                <Link href="/kampanje/rov" className="text-gold-400 hover:text-gold-300 text-sm font-medium">
                  ROV-Pilot →
                </Link>
                <Link href="/kampanje/eto" className="text-gold-400 hover:text-gold-300 text-sm font-medium">
                  ETO →
                </Link>
                <Link href="/kampanje/sveiser" className="text-gold-400 hover:text-gold-300 text-sm font-medium">
                  Sveiser →
                </Link>
                <Link href="/kampanje/mekaniker" className="text-gold-400 hover:text-gold-300 text-sm font-medium">
                  Mekaniker →
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div>
            <ElektrikerForm />
          </div>
        </div>
      </Container>
    </main>
  );
}

