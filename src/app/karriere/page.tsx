import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Anchor,
  ChevronRight,
  Ship,
  Compass,
  Wrench,
  Zap,
  Users,
  ChefHat,
  ArrowRight,
  Award,
  TrendingUp,
  BookOpen
} from '@/components/icons';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { getImageUrl, getOgImageUrl, IMAGE_PATHS } from '@/lib/images';
import SchemaMarkup from '@/components/seo/SchemaMarkup';

const breadcrumbs = [
  { name: 'Hjem', url: '/' },
  { name: 'Karriere', url: '/karriere' },
];

export const metadata: Metadata = {
  title: 'Maritime karriereveier – Bli sjømann i Norge',
  description: 'Utforsk karrieremulighetene til sjøs. Komplett guide til maritime yrker: kaptein, styrmann, maskinist, ETO, matros og kokk. Utdanning, sertifikater og lønn.',
  keywords: [
    'maritim karriere',
    'bli sjømann',
    'maritime yrker',
    'jobb til sjøs',
    'offshore karriere',
    'maritim utdanning',
  ],
  openGraph: {
    title: 'Maritime karriereveier – Bli sjømann i Norge',
    description: 'Utforsk karrieremulighetene til sjøs. Komplett guide til maritime yrker.',
    url: 'https://bluecrew.no/karriere',
    siteName: 'Bluecrew AS',
    locale: 'nb_NO',
    type: 'website',
    images: [
      {
        url: getOgImageUrl(IMAGE_PATHS.og.default),
        width: 1200,
        height: 630,
        alt: 'Maritime karriereveier - Bluecrew',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maritime karriereveier – Bli sjømann i Norge',
    description: 'Utforsk karrieremulighetene til sjøs. Komplett guide til maritime yrker.',
    images: [getOgImageUrl(IMAGE_PATHS.og.default)],
  },
  alternates: {
    canonical: 'https://bluecrew.no/karriere',
  },
};

// Revalidate content every 24 hours
export const revalidate = 86400;

const positions = [
  {
    slug: 'kaptein',
    title: 'Kaptein',
    icon: Compass,
    description: 'Øverste leder om bord. Ansvar for skip, mannskap og last.',
    salary: '600 000 – 1 200 000 kr',
    education: '10-15 år til toppen',
    highlight: 'Høyeste ansvar',
    image: IMAGE_PATHS.careers.kaptein,
  },
  {
    slug: 'styrmann',
    title: 'Styrmann',
    icon: Ship,
    description: 'Navigatør og nestkommanderende. Brovakt og lastoperasjoner.',
    salary: '450 000 – 850 000 kr',
    education: '5-8 år erfaring',
    highlight: 'Steget mot kaptein',
    image: IMAGE_PATHS.careers.styrmann,
  },
  {
    slug: 'maskinist',
    title: 'Maskinist',
    icon: Wrench,
    description: 'Ansvar for all maskineri og tekniske systemer om bord.',
    salary: '500 000 – 950 000 kr',
    education: '6-10 år erfaring',
    highlight: 'Teknisk hjerte',
    image: IMAGE_PATHS.careers.maskinist,
  },
  {
    slug: 'eto',
    title: 'ETO',
    icon: Zap,
    description: 'Elektro-teknisk offiser. Elektronikk, automasjon og IT.',
    salary: '550 000 – 950 000 kr',
    education: '4-7 år erfaring',
    highlight: 'Høy etterspørsel',
    image: IMAGE_PATHS.careers.eto,
  },
  {
    slug: 'matros',
    title: 'Matros',
    icon: Users,
    description: 'Dekksarbeid, fortøyning, vakthold og vedlikehold.',
    salary: '420 000 – 650 000 kr',
    education: 'Inngangsstilling',
    highlight: 'Start her',
    image: IMAGE_PATHS.careers.matros,
  },
  {
    slug: 'kokk',
    title: 'Kokk',
    icon: ChefHat,
    description: 'Ansvar for alle måltider og proviantering om bord.',
    salary: '400 000 – 650 000 kr',
    education: '2-5 år erfaring',
    highlight: 'Viktig for trivsel',
    image: IMAGE_PATHS.careers.kokk,
  },
];

const careerPath = [
  { level: 1, title: 'Kadett / Lærling', years: '0-2 år' },
  { level: 2, title: 'Matros / Motormann', years: '2-4 år' },
  { level: 3, title: '3. Styrmann / 3. Maskinist', years: '4-6 år' },
  { level: 4, title: '2. Styrmann / 2. Maskinist', years: '6-8 år' },
  { level: 5, title: '1. Styrmann / 1. Maskinist', years: '8-12 år' },
  { level: 6, title: 'Kaptein / Maskinsjef', years: '12+ år' },
];

const faqItems = [
  {
    question: 'Hvordan blir jeg sjømann i Norge?',
    answer: 'Start med maritim videregående utdanning eller lærlingplass på skip. Deretter tar du nødvendige STCW-sertifikater og bygger fartstid. Bluecrew kan hjelpe deg finne din første stilling.',
  },
  {
    question: 'Hvilken utdanning trengs for å bli kaptein?',
    answer: 'Du trenger nautisk høyskole, 36 måneder fartstid som styrmann, og bestå kapteineksamen. Hele løpet tar typisk 10-15 år fra matros til kaptein.',
  },
  {
    question: 'Hva er forskjellen på D1-D6 sertifikater?',
    answer: 'D-sertifikater (D1-D6) angir hvilken størrelse og type fartøy du kan føre. D6 er for mindre fartøy, mens D1 gir ubegrenset fartsområde på alle skip.',
  },
  {
    question: 'Hvor mye tjener man som sjømann?',
    answer: 'Lønn varierer fra ca. 400.000 kr for matros til over 1.200.000 kr for erfarne kapteiner offshore. I tillegg kommer offshore-tillegg og turnusfordeler.',
  },
];

export default function KarrierePage() {
  return (
    <>
      <SchemaMarkup type="breadcrumb" breadcrumbs={breadcrumbs} />
      <SchemaMarkup type="faq" faqItems={faqItems} />
      
      <main>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={getImageUrl(IMAGE_PATHS.hero.karriere)}
            alt="Maritim karriere"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-navy-900/80" />
        <Container size="lg" className="relative z-10">
          <div className="max-w-3xl">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-300 text-sm font-medium backdrop-blur-sm">
                <Anchor className="w-4 h-4" />
                Karriereveier
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-medium text-cream-50 mb-6 leading-tight">
              Din <em className="not-italic text-gold-400">maritime karriere</em>
              <br />
              starter her
            </h1>

            <p className="text-xl text-cream-100/80 mb-10 max-w-2xl leading-relaxed">
              Utforsk mulighetene til sjøs. Fra kadett til kaptein – vi guider deg gjennom utdanning, sertifikater og karrierevei.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/meld-interesse">
                <Button size="lg" className="bg-gold-500 hover:bg-gold-400 text-navy-900 font-medium border-none shadow-lg shadow-gold-500/20">
                  Registrer deg
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/lonn">
                <Button size="lg" variant="outline" className="bg-gold-400/5 border-gold-400/20 text-cream-50 hover:bg-gold-400/10 hover:border-gold-400/40">
                  Se lønnsoversikt
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Intro Section */}
      <Section className="bg-white">
        <Container size="lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-medium text-navy-900 mb-6">
              Hvorfor velge en <em className="not-italic text-gold-600">maritim karriere?</em>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-12">
              Maritim sektor tilbyr unike karrieremuligheter med god lønn, mye fritid og varierte arbeidsoppgaver.
              Norge har en av verdens sterkeste maritime næringer, og behovet for kvalifiserte sjøfolk er stort.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 hover:border-gold-400/30 transition-all">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <TrendingUp className="w-6 h-6 text-gold-500" />
                </div>
                <h3 className="font-medium text-navy-900 mb-2">God lønn</h3>
                <p className="text-sm text-slate-600">Konkurransedyktige lønninger, spesielt i offshore</p>
              </div>
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 hover:border-gold-400/30 transition-all">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <Award className="w-6 h-6 text-gold-500" />
                </div>
                <h3 className="font-medium text-navy-900 mb-2">Mye fritid</h3>
                <p className="text-sm text-slate-600">2-4 turnus gir opptil 243 fridager per år</p>
              </div>
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 hover:border-gold-400/30 transition-all">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <BookOpen className="w-6 h-6 text-gold-500" />
                </div>
                <h3 className="font-medium text-navy-900 mb-2">Karrierevei</h3>
                <p className="text-sm text-slate-600">Klar progresjon fra kadett til kaptein</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Career Ladder */}
      <Section className="bg-slate-50">
        <Container size="lg">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-medium text-navy-900 mb-4">
              Karrierestigen <em className="not-italic text-gold-600">til sjøs</em>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Maritim karriere følger en klar progresjon. Jo mer erfaring og sertifikater, desto høyere kan du klatre.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200 hidden md:block" />

              <div className="space-y-8">
                {careerPath.map((step, index) => (
                  <div key={index} className="flex items-center gap-8 group">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center font-medium text-lg shrink-0 z-10 transition-all duration-300 ${
                      index === careerPath.length - 1
                        ? 'bg-gold-500 text-navy-900 italic shadow-lg shadow-gold-500/20 scale-110'
                        : 'bg-white border-2 border-slate-200 text-navy-900 group-hover:border-gold-400 group-hover:text-gold-600'
                    }`}>
                      {step.level}
                    </div>
                    <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-slate-200 group-hover:shadow-md group-hover:border-gold-400/30 transition-all duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <h3 className="font-medium text-lg text-navy-900 group-hover:text-navy-700">{step.title}</h3>
                        <span className="text-sm font-medium text-gold-600 bg-gold-50 px-3 py-1 rounded-full w-fit">{step.years}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Positions Grid */}
      <Section className="bg-white">
        <Container size="lg">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-medium text-navy-900 mb-4">
              Utforsk <em className="not-italic text-gold-600">maritime yrker</em>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Klikk på en stilling for å lære mer om utdanning, krav og karrieremuligheter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {positions.map((position) => {
              const Icon = position.icon;
              return (
                <Link
                  key={position.slug}
                  href={`/karriere/${position.slug}`}
                  className="block h-full"
                >
                  <Card className="h-full p-0 overflow-hidden hover:border-gold-400/50 transition-all group flex flex-col">
                    {/* Image Header */}
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={getImageUrl(position.image)}
                        alt={`Karrierevei ${position.title} - maritim utdanning`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-navy-900/20 group-hover:bg-navy-900/10 transition-colors" />
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-navy-900 text-xs font-medium uppercase tracking-wider rounded-full shadow-sm">
                          {position.highlight}
                        </span>
                      </div>
                    </div>

                    <div className="p-8 flex-1 flex flex-col">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center group-hover:bg-gold-50 transition-colors">
                          <Icon className="w-5 h-5 text-gold-500" />
                        </div>
                        <h3 className="text-xl font-medium text-navy-900 group-hover:text-gold-600 transition-colors">
                          {position.title}
                        </h3>
                      </div>

                      <p className="text-slate-600 text-sm mb-6 leading-relaxed flex-1">
                        {position.description}
                      </p>

                      <div className="space-y-3 text-sm pt-6 border-t border-slate-100">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-500 font-medium">Lønnsnivå</span>
                          <span className="font-medium text-navy-700">{position.salary}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-500 font-medium">Tid til stilling</span>
                          <span className="font-medium text-navy-700">{position.education}</span>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-between text-gold-500 font-medium text-sm group-hover:gap-2 transition-all">
                        <span>Les mer</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Education Paths */}
      <Section className="bg-slate-50">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-medium text-navy-900 mb-6">
                Utdanningsveier
              </h2>
              <div className="space-y-6 text-lg text-slate-600">
                <p>
                  Det finnes flere veier inn i maritim sektor. Den vanligste er gjennom videregående
                  med maritim linje, etterfulgt av fagskole eller høyskole.
                </p>
                
                <div className="space-y-4 mt-8">
                  <div className="bg-white p-6 rounded-2xl border border-slate-200">
                    <h4 className="font-medium text-navy-900 mb-2">Dekk (navigasjon)</h4>
                    <p className="text-sm">Videregående maritim → Nautisk fagskole → Fartstid → Styrmannssertifikat → Kapteinssertifikat</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-slate-200">
                    <h4 className="font-medium text-navy-900 mb-2">Maskin</h4>
                    <p className="text-sm">Videregående maritim/teknisk → Teknisk maritim fagskole → Fartstid → Maskinistsertifikat</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-slate-200">
                    <h4 className="font-medium text-navy-900 mb-2">Elektro (ETO)</h4>
                    <p className="text-sm">Elektrofag → Fagbrev → STCW ETO-kurs → ETO-sertifisering</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-navy-900 rounded-3xl p-10 relative overflow-hidden border border-gold-400/20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold-400/10 blur-[80px] rounded-full pointer-events-none" />
              
              <h3 className="text-2xl font-medium mb-6 relative z-10 text-gold-300">STCW-sertifikater</h3>
              <p className="text-cream-100/80 mb-8 relative z-10">
                Alle som jobber til sjøs må ha STCW-sertifikater (Standards of Training, Certification
                and Watchkeeping). Dette er internasjonale minstekrav.
              </p>
              <ul className="space-y-4 relative z-10">
                {[
                  'Basic Safety Training (BST) – Grunnleggende sikkerhet',
                  'STCW II/1-5 – Dekksoffiserer',
                  'STCW III/1-6 – Maskinoffiserer',
                  'STCW III/6 – ETO (Electro-Technical Officer)',
                  'Advanced Fire Fighting',
                  'Medical Care / First Aid',
                ].map((cert, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-gold-400/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-gold-400 rounded-full" />
                    </div>
                    <span className="text-cream-100/80 text-sm font-medium">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Sectors */}
      <Section className="bg-navy-900">
        <Container size="lg">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-medium text-cream-50 mb-4">
              Maritime <em className="not-italic text-gold-400">sektorer</em> i Norge
            </h2>
            <p className="text-lg text-cream-100/80 max-w-2xl mx-auto">
              Norsk maritim sektor er mangfoldig. Hver sektor har sine egne fordeler og utfordringer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Offshore / Subsea',
                description: 'Supply, konstruksjon, subsea-operasjoner. Høyest lønn, ofte 2-4 turnus.',
                features: ['Høyest lønn', '2-4 rotasjon', 'Spesialisert kompetanse'],
                image: getImageUrl(IMAGE_PATHS.sectors.offshore),
              },
              {
                title: 'Havbruk / Aquakultur',
                description: 'Brønnbåter, servicefartøy, fôrflåter. Voksende sektor med god balanse.',
                features: ['Voksende sektor', '1-1 eller 2-2 turnus', 'Nær kysten'],
                image: getImageUrl(IMAGE_PATHS.sectors.havbruk),
              },
              {
                title: 'Rederi / Shipping',
                description: 'Lasteskip, tankere, ferger, cruise. Varierende turnus og destinasjoner.',
                features: ['Internasjonal erfaring', 'Varierende turnus', 'Mange fartøytyper'],
                image: getImageUrl(IMAGE_PATHS.sectors.shipping),
              },
            ].map((sector, index) => (
              <div 
                key={index} 
                className="relative rounded-3xl overflow-hidden group h-full hover:scale-[1.02] transition-transform"
              >
                {/* Background Image with Next.js optimization */}
                <div className="absolute inset-0">
                  <Image
                    src={sector.image}
                    alt={sector.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                    quality={85}
                    priority={false}
                  />
                  {/* Stronger dark overlay for readability */}
                  <div className="absolute inset-0 bg-linear-to-b from-navy-900/90 via-navy-900/90 to-navy-900/95" />
                </div>
                
                <div className="relative z-10 p-8 h-full flex flex-col">
                  <h3 className="text-2xl font-medium text-cream-50 mb-3">{sector.title}</h3>
                  <p className="text-cream-200 mb-6 leading-relaxed">{sector.description}</p>
                  <ul className="space-y-3 mt-auto">
                    {sector.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-medium text-gold-200">
                        <div className="w-2 h-2 bg-gold-400 rounded-full" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section variant="navy" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#d4af37_1px,transparent_1px),linear-gradient(to_bottom,#d4af37_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.03] pointer-events-none" />
        
        <Container size="md" className="relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold-400/10 text-gold-400 mb-8">
              <Anchor className="w-8 h-8" />
            </div>
            
            <h2 className="text-3xl md:text-5xl font-medium text-cream-50 mb-6 font-heading">
              Klar for å starte din karriere?
            </h2>
            
            <p className="text-xl text-cream-100/80 mb-10 max-w-xl mx-auto">
              Registrer deg hos Bluecrew i dag. Vi hjelper deg med å finne den rette stillingen.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/meld-interesse">
                <Button size="lg" className="bg-gold-500 hover:bg-gold-400 text-navy-900 font-medium px-8 shadow-lg shadow-gold-500/20">
                  Registrer deg nå
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/lonn/kalkulator">
                <Button size="lg" variant="outline" className="border-gold-400/30 text-cream-50 hover:bg-gold-400/10 px-8">
                  Prøv lønnskalkulator
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </main>
    </>
  );
}

