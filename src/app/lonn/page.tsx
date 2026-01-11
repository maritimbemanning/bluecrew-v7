import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPositions } from '@/lib/data/positions';
import { generateLonnLandingMetadata } from '@/lib/seo/metadata';
import { formatCurrency } from '@/lib/utils';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import SummaryBox from '@/components/ui/SummaryBox';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { IMAGE_PATHS, getImageUrl } from '@/lib/images';

const breadcrumbs = [
  { name: 'Hjem', url: '/' },
  { name: 'Lønn', url: '/lonn' },
];

export const metadata: Metadata = generateLonnLandingMetadata();

// Revalidate content pages every 24 hours for fresh data
export const revalidate = 86400;

// Helper to map position slugs to images
const getPositionImage = (slug: string) => {
  const map: Record<string, string> = {
    kaptein: IMAGE_PATHS.careers.kaptein,
    styrmann: IMAGE_PATHS.careers.styrmann,
    maskinist: IMAGE_PATHS.careers.maskinist,
    eto: IMAGE_PATHS.careers.eto,
    matros: IMAGE_PATHS.careers.matros,
    kokk: IMAGE_PATHS.careers.kokk,
  };
  return map[slug] || IMAGE_PATHS.hero.background;
};

/**
 * Lønn Landing Page
 *
 * Overview of salary information for all maritime positions
 */
const faqItems = [
  {
    question: 'Hva er gjennomsnittslønnen for sjøfolk i Norge?',
    answer: 'Gjennomsnittlig årslønn for sjøfolk i Norge ligger mellom 500.000 og 800.000 kr, avhengig av stilling, erfaring og sektor. Offshore betaler generelt 20-40% mer enn kystfart.',
  },
  {
    question: 'Hvilke tillegg får man til sjøs?',
    answer: 'Vanlige tillegg inkluderer offshore-tillegg (10-25%), nattillegg, helgetillegg, og kompensasjon for arbeid under spesielle forhold. Mange får også fri kost og losji.',
  },
  {
    question: 'Hva tjener en kaptein på offshore?',
    answer: 'En kaptein på offshore tjener typisk 900.000-1.200.000 kr årlig. Lønnen varierer med erfaring, fartøytype og rederi. Topplønn ligger over 1.2 millioner.',
  },
  {
    question: 'Hvordan beregnes lønn med turnus?',
    answer: 'Med 2-4 turnus jobber du 122 dager årlig. Lønn beregnes ofte som årslønn delt på faktiske arbeidsdager, som gir høy effektiv timelønn sammenlignet med vanlige jobber.',
  },
];

export default function LonnLandingPage() {
  const positions = getAllPositions();
  const year = new Date().getFullYear();

  return (
    <>
      {/* Organization schema */}
      <SchemaMarkup type="organization" />
      <SchemaMarkup type="breadcrumb" breadcrumbs={breadcrumbs} />
      <SchemaMarkup type="faq" faqItems={faqItems} />

      {/* Hero Section */}
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy-900 pt-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={getImageUrl(IMAGE_PATHS.lonn.hero2)}
            alt="Maritime lønnsoversikt - Bluecrew"
            fill
            sizes="100vw"
            className="object-cover opacity-60"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-navy-900/60 via-navy-900/40 to-navy-900/80" />
        <Container size="lg" className="relative z-10 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 font-medium text-sm mb-6 backdrop-blur-sm">
              Oppdatert for {year}
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium text-cream-50 mb-6 leading-tight tracking-tight">
              Lønn <em className="not-italic font-medium text-gold-400">til sjøs</em>
            </h1>
            <p className="text-lg md:text-xl text-cream-100/80 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
              Komplett oversikt over lønnsnivåer, tillegg og betingelser for alle maritime stillinger i Norge.
              Fra matros til kaptein.
            </p>

            {/* Calculator CTA */}
            <Link
              href="/lonn/kalkulator"
              className="group relative inline-flex items-center gap-3 bg-gold-500 text-navy-900 italic px-8 py-4 rounded-full font-medium text-lg overflow-hidden transition-all hover:bg-gold-400 hover:scale-105 hover:shadow-[0_0_30px_rgba(197,160,89,0.3)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Prøv lønnskalkulatoren
              </span>
            </Link>
          </div>
        </Container>
      </div>

      {/* Position Cards */}
      <Section variant="slate">
        <Container size="lg">
          <SummaryBox variant="gold">
            <p>
              <strong>Maritime lønninger 2026:</strong> Kaptein tjener 600k–1.2M kr/år, maskinist 550k–950k kr, 
              styrmann 500k–850k kr, matros 400k–600k kr. Offshore +15-30% over andre sektorer. 
              Bruk kalkulatoren for personlig estimat.
            </p>
          </SummaryBox>

          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-medium text-navy-900 mb-4">
              Lønn etter stilling
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Velg din stilling for å se detaljert lønnsstatistikk, inkludert grunnlønn, overtid og vanlige tillegg.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {positions.map((pos) => (
              <Link
                key={pos.id}
                href={`/lonn/${pos.slug}`}
                className="group block h-full"
              >
                <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 bg-white">
                  {/* Image Header */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={getImageUrl(getPositionImage(pos.slug))}
                      alt={`Lønn for ${pos.name} - maritim lønnsstatistikk`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-navy-900/80 to-transparent opacity-60" />
                    <div className="absolute bottom-4 left-6">
                      <h3 className="text-2xl font-medium text-cream-50 tracking-wide">
                        {pos.name}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-4 pb-6 border-b border-slate-100">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-slate-500 font-medium mb-1">
                          Typisk årslønn
                        </p>
                        <p className="text-xl font-medium text-navy-900">
                          {formatCurrency(pos.salaryRange.typical)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-slate-500 font-medium mb-1">
                          Toppnivå
                        </p>
                        <p className="text-lg font-medium text-gold-600">
                          {formatCurrency(pos.salaryRange.max)}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Erfaringskrav</span>
                        <span className="font-medium text-navy-900">{pos.experienceYears.typical}+ år</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Utdanningsnivå</span>
                        <span className="font-medium text-navy-900 capitalize">{pos.education[0]}</span>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center text-gold-600 font-medium group-hover:text-gold-500 transition-colors">
                      Se detaljert oversikt
                      <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Info Section */}
      <Section variant="navy">
        <Container size="md">
          <div className="prose prose-lg prose-invert max-w-none">
            <h2 className="text-3xl font-medium text-cream-50 mb-8">
              Hva påvirker <span className="text-gold-400">maritim lønn?</span>
            </h2>
            <p className="text-cream-100/80 mb-8 text-xl font-medium leading-relaxed">
              Lønnen for maritime stillinger i Norge er blant de beste i verden, men varierer basert på flere nøkkelfaktorer.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 not-prose">
              <div className="bg-navy-900/50 p-6 rounded-xl border border-navy-800">
                <h3 className="text-gold-400 font-medium mb-2">Erfaring & Fartstid</h3>
                <p className="text-cream-100/70 text-sm">År til sjøs er den viktigste faktoren. Senioroffiserer med lang fartstid ligger i toppsjiktet.</p>
              </div>
              <div className="bg-navy-900/50 p-6 rounded-xl border border-navy-800">
                <h3 className="text-gold-400 font-medium mb-2">Sektor & Skipstype</h3>
                <p className="text-cream-100/70 text-sm">Offshore og spesialskip (DP, tank) gir ofte høyere tillegg enn ferge og nærskipsfart.</p>
              </div>
              <div className="bg-navy-900/50 p-6 rounded-xl border border-navy-800">
                <h3 className="text-gold-400 font-medium mb-2">Rotasjon</h3>
                <p className="text-cream-100/70 text-sm">Lengre perioder ute (f.eks. 4-4 eller 6-6) kompenseres ofte med høyere rotasjonstillegg.</p>
              </div>
              <div className="bg-navy-900/50 p-6 rounded-xl border border-navy-800">
                <h3 className="text-gold-400 font-medium mb-2">Sertifikater</h3>
                <p className="text-cream-100/70 text-sm">Spesialkompetanse som DP-sertifikat, høyspent eller kranførerbevis øker markedsverdien.</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section variant="slate">
        <Container size="md">
          <div className="bg-white rounded-2xl p-8 md:p-12 text-center shadow-xl border border-slate-100">
            <h2 className="text-3xl font-medium text-navy-900 mb-4">
              Klar for neste steg i karrieren?
            </h2>
            <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
              Bluecrew kobler kvalifiserte sjøfolk med ledende norske rederier. 
              Registrer deg i dag for å bli synlig for arbeidsgivere.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/meld-interesse"
                className="inline-flex items-center justify-center px-8 py-3 bg-gold-500 text-navy-900 italic rounded-full font-medium hover:bg-gold-400 transition-all hover:shadow-lg"
              >
                Registrer deg som sjømann
              </a>
              <Link
                href="/stillinger"
                className="inline-flex items-center justify-center px-8 py-3 border border-slate-200 text-navy-900 rounded-full font-medium hover:bg-slate-50 transition-all"
              >
                Se ledige stillinger
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

