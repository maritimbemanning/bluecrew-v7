import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2 } from '@/components/icons';
import Container from '@/components/ui/Container';
import OffshoreForm from '@/components/kampanje/OffshoreForm';

export const metadata: Metadata = {
  title: 'Offshore-jobber 2026 | 4,000 nye årsverk på norsk sokkel',
  description: 'Søk jobb offshore nå! Equinor investerer 100 milliarder. Stort behov for elektrikere, riggere, sveisere, mekanikere og ROV-piloter. 2/4-rotasjon.',
  keywords: ['offshore jobb', 'jobb offshore', 'offshore stillinger', 'offshore Norge', 'offshore elektrikere', 'offshore sveiser', 'offshore mekaniker'],
  openGraph: {
    title: 'Offshore-jobber 2026 | 4,000 nye årsverk',
    description: 'Massivt behov for offshore-fagfolk på norsk sokkel. Søk nå!',
    url: 'https://bluecrew.no/kampanje/offshore',
    siteName: 'Bluecrew AS',
    locale: 'nb_NO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Offshore-jobber 2026 | 4,000 nye årsverk',
    description: 'Søk jobb offshore nå! Stort behov for fagfolk på norsk sokkel.',
  },
  alternates: {
    canonical: 'https://bluecrew.no/kampanje/offshore',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const stats = [
  { value: '4,000', label: 'ÅRSVERK PÅ VEI' },
  { value: '2,000+', label: 'REGISTRERTE FAGFOLK' },
];

const requirements = [
  'Relevant fagbrev eller dokumentert erfaring',
  'Grunnleggende sikkerhetsopplæring (GSK)',
  'Gyldig helseattest for offshore-arbeid',
  'Norsk eller skandinavisk språk',
];

export default function OffshoreCampaignPage() {
  return (
    <main className="min-h-screen bg-navy-800">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[4rem_4rem]" />

      <Container size="lg" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center min-h-screen pt-24 pb-20 lg:pt-28 lg:pb-12">

          <div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-cream-50 mb-2 lg:mb-3 leading-[0.95] tracking-tight">
              Offshore
            </h1>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-cream-50 mb-6 lg:mb-8 leading-[0.95] tracking-tight">
              <span className="italic">4,000 Årsverk på vei</span>
            </h2>

            {/* Stats */}
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

            {/* Om stillingene */}
            <div className="mb-4">
              <h3 className="text-cream-50 font-semibold text-base mb-2">Om stillingene</h3>
              <p className="text-cream-100/80 text-sm leading-relaxed">
                Stort behov for kvalifiserte fagarbeidere innen elektro, rigging,
                sveising, mekanikk og subsea. 2/4-rotasjon og konkurransedyktige vilkår.
              </p>
            </div>

            {/* Krav og Kvalifikasjoner */}
            <div className="bg-navy-800/60 border border-cream-100/10 rounded-xl p-4">
              <h3 className="text-cream-50 font-semibold text-base mb-3">Krav og kvalifikasjoner</h3>
              <ul className="space-y-2">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                    <span className="text-cream-100/90 text-sm">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Site Links */}
            <div className="mt-4 pt-4 border-t border-cream-100/10">
              <p className="text-cream-100/60 text-xs mb-2">Stillinger:</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/kampanje/elektriker" className="text-gold-400 hover:text-gold-300 text-sm font-medium">
                  Elektriker →
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

          <div>
            <OffshoreForm />
          </div>
        </div>
      </Container>
    </main>
  );
}

