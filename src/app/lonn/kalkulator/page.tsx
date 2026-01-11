import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SummaryBox from '@/components/ui/SummaryBox';
import { FAQItem } from '@/types';
import { IMAGE_PATHS, getImageUrl, getOgImageUrl } from '@/lib/images';
import { TrendingUp, Shield, Briefcase, Banknote, ChevronDown } from '@/components/icons';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';

const breadcrumbs = [
  { name: 'Hjem', url: '/' },
  { name: 'Lønn', url: '/lonn' },
  { name: 'Lønnskalkulator', url: '/lonn/kalkulator' },
];

// Lazy load heavy interactive components
const SalaryCalculator = dynamic(
  () => import('@/components/calculator/SalaryCalculator'),
  { loading: () => <div className="h-96 bg-slate-50 rounded-2xl animate-pulse" /> }
);
const FAQSection = dynamic(
  () => import('@/components/sections/FAQSection').then(mod => ({ default: mod.FAQSection })),
  { loading: () => <div className="py-16 bg-slate-50" /> }
);

export const metadata: Metadata = {
  title: 'Lønnskalkulator – Beregn din lønn i maritim sektor',
  description: 'Interaktiv lønnskalkulator for maritime stillinger. Beregn forventet årslønn basert på stilling, erfaring og sektor. Offshore, havbruk og rederi.',
  keywords: 'lønnskalkulator maritim, sjøfolk lønn, offshore lønn kalkulator, havbruk lønn, rederi lønn, beregn sjøfolk lønn',
  openGraph: {
    title: 'Lønnskalkulator – Hva tjener du til sjøs?',
    description: 'Beregn din lønn som kaptein, styrmann, maskinist eller matros. Se hva du kan tjene i offshore, havbruk og shipping.',
    type: 'website',
    url: 'https://bluecrew.no/lonn/kalkulator',
    siteName: 'Bluecrew AS',
    locale: 'nb_NO',
    images: [
      {
        url: getOgImageUrl(IMAGE_PATHS.og.default),
        width: 1200,
        height: 630,
        alt: 'Lønnskalkulator for sjøfolk - Bluecrew',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lønnskalkulator – Hva tjener du til sjøs?',
    description: 'Beregn din lønn som kaptein, styrmann, maskinist eller matros.',
    images: [getOgImageUrl(IMAGE_PATHS.og.default)],
  },
  alternates: {
    canonical: 'https://bluecrew.no/lonn/kalkulator',
  },
};

const faqs: FAQItem[] = [
  {
    question: 'Er lønnsberegningene i kalkulatoren nøyaktige?',
    answer: 'Lønnsberegningene er basert på gjennomsnittlig lønn fra SSB og NHO Sjøfart sine lønnsstatistikker. Faktisk lønn kan variere avhengig av arbeidsgiver, tariffavtaler, overtid og individuelle forhandlinger.',
  },
  {
    question: 'Hvorfor tjener man mer offshore enn i rederier?',
    answer: 'Offshore-sektoren har høyere lønninger grunnet krevende arbeidsforhold, lange turnuser og høye kompetansekrav. Rederier har skattefordeler via nettolønnsordning som kompenserer for lavere grunnlønn.',
  },
  {
    question: 'Hva er nettolønnsordningen?',
    answer: 'Nettolønnsordningen gir skattefritak for sjøfolk på skip i utenriksfart. En lavere grunnlønn kan gi høyere netto utbetaling, noe som gjør rederi-stillinger konkurransedyktige.',
  },
  {
    question: 'Inkluderer lønnen overtid og bonuser?',
    answer: 'Kalkulatoren viser grunnlønn. Overtid, bonuser og tillegg kan utgjøre 10-30% ekstra avhengig av sektor og stilling.',
  },
];

const highlights = [
  {
    icon: TrendingUp,
    title: 'Offshore',
    subtitle: '+15-30%',
    description: 'høyere enn andre sektorer',
  },
  {
    icon: Shield,
    title: 'Rederi',
    subtitle: 'Skattefri',
    description: 'via nettolønnsordning',
  },
  {
    icon: Briefcase,
    title: 'Erfaring',
    subtitle: '+20-65%',
    description: 'økning med 5+ års erfaring',
  },
];

export default function LonnskalkulatorPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Lønnskalkulator for maritime stillinger',
    description: 'Interaktiv kalkulator for å beregne forventet lønn i maritim sektor basert på stilling, erfaring og sektor.',
    url: 'https://bluecrew.no/lonn/kalkulator',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'NOK',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <SchemaMarkup type="breadcrumb" breadcrumbs={breadcrumbs} />

      {/* Premium Hero Section */}
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy-900 pt-20">
        {/* Breadcrumbs inside hero */}
        <div className="absolute top-20 left-0 right-0 z-10">
          <Container size="lg">
            <div className="py-3">
              <Breadcrumbs items={breadcrumbs} />
            </div>
          </Container>
        </div>
        
        <div className="absolute inset-0 z-0">
          <Image
            src={getImageUrl(IMAGE_PATHS.hero.background)}
            alt="Maritim bakgrunnsbilde - lønnskalkulator"
            fill
            sizes="100vw"
            className="object-cover opacity-40"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-navy-900/70 via-navy-900/50 to-navy-900/95" />
        <Container size="lg" className="relative z-10 py-16 text-center">
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold-400/10 border border-gold-400/20 rounded-full text-gold-300 text-sm font-medium backdrop-blur-sm">
              <Banknote className="w-4 h-4" />
              Gratis verktøy
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-cream-50 mb-6 leading-tight">
            Maritim <em className="not-italic font-medium text-gold-400">Lønnskalkulator</em>
          </h1>
          
          <p className="text-xl md:text-2xl text-cream-100/90 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Få et estimat på din forventede årslønn basert på stilling, erfaring og sektor
          </p>

          <a 
            href="#kalkulator" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold-500 text-navy-900 italic rounded-full font-medium text-lg hover:bg-gold-400 transition-all hover:scale-105 shadow-lg shadow-gold-500/20"
          >
            Beregn din lønn nå
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </a>
        </Container>
      </div>

      {/* Quick Stats */}
      <Section className="bg-navy-900 -mt-8 relative z-10">
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-navy-800/50 rounded-xl p-5">
                <div className="w-12 h-12 rounded-full bg-gold-400/20 flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-gold-400" />
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-cream-50 font-medium">{item.title}</span>
                    <span className="text-gold-400 font-medium">{item.subtitle}</span>
                  </div>
                  <p className="text-cream-100/70 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Calculator Section */}
      <Section id="kalkulator" className="scroll-mt-20">
        <Container size="lg">
          <SummaryBox variant="gold">
            <p>
              <strong>Kort oppsummert:</strong> Offshore betaler best (15-30% over andre sektorer). 
              Kaptein: 600k–1.2M kr. Maskinist: 550k–950k kr. Matros: 400k–600k kr. 
              Erfaring øker lønnen 20-65%. Nettolønnsordning gir skattefritak i rederier.
            </p>
          </SummaryBox>

          <div className="text-center mb-10 mt-12">
            <h2 className="text-2xl md:text-3xl font-medium text-navy-900 mb-3">
              Beregn din lønn
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              Velg sektor, stilling og erfaring for å se estimert årslønn. 
              Data basert på SSB og NHO Sjøfart.
            </p>
          </div>
          
          <SalaryCalculator />
        </Container>
      </Section>

      {/* Key Info Cards */}
      <Section variant="slate">
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-arctic-100 flex items-center justify-center mb-4">
                <TrendingUp className="w-5 h-5 text-gold-500" />
              </div>
              <h3 className="text-lg font-medium text-navy-900 mb-2">Offshore lønner seg</h3>
              <p className="text-slate-600 text-sm">
                Krevende arbeidsforhold og høye kompetansekrav gir 15-30% høyere lønn enn andre sektorer. 
                Bonusordninger kommer på toppen.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-gold-100 flex items-center justify-center mb-4">
                <Shield className="w-5 h-5 text-gold-500" />
              </div>
              <h3 className="text-lg font-medium text-navy-900 mb-2">Nettolønnsordning</h3>
              <p className="text-slate-600 text-sm">
                Rederier tilbyr skattefritak som gjør at lavere grunnlønn kan gi like god eller 
                bedre nettoutbetaling.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-gold-100 flex items-center justify-center mb-4">
                <Briefcase className="w-5 h-5 text-gold-500" />
              </div>
              <h3 className="text-lg font-medium text-navy-900 mb-2">Erfaring teller</h3>
              <p className="text-slate-600 text-sm">
                0-2 år: basislønn. 2-5 år: +20-30%. 5+ år med spesialisering: +35-65% over basis. 
                Sertifiseringer øker potensialet.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <FAQSection items={faqs} />
    </>
  );
}

