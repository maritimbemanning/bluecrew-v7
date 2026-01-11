import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  CheckCircle2,
  ChevronRight,
  Anchor,
  Shield,
  Briefcase,
  TrendingUp,
  Clock,
  FileCheck,
  Award
} from '@/components/icons';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { getImageUrl, IMAGE_PATHS } from '@/lib/images';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

const breadcrumbs = [
  { name: 'Hjem', url: '/' },
  { name: 'Sjøfolk', url: '/sjofolk' },
];

export const metadata: Metadata = {
  title: 'For Sjøfolk | Maritime Stillinger via Bemanningsbyrå',
  description: 'Registrer deg hos Bluecrew - Norges maritime bemanningsbyrå og vikarbyrå for sjøfolk. Ledige stillinger som kaptein, styrmann, maskinist, matros. Offshore, havbruk og rederi oppdrag med god lønn.',
  keywords: ['sjøfolk jobb', 'maritime stillinger', 'bemanningsbyrå sjøfolk', 'vikarbyrå maritim', 'kaptein jobb', 'styrmann stilling', 'maskinist jobb', 'matros stilling', 'offshore jobb', 'havbruk jobb', 'maritim bemanning'],
  openGraph: {
    title: 'For Sjøfolk | Jobb via Bemanningsbyrå Bluecrew',
    description: 'Finn maritime stillinger via Norges bemanningsbyrå for sjøfolk. Offshore, havbruk og rederi oppdrag.',
    url: 'https://bluecrew.no/sjofolk',
    siteName: 'Bluecrew',
    locale: 'nb_NO',
  },
  alternates: {
    canonical: 'https://bluecrew.no/sjofolk',
  },
};

// Benefits for sjøfolk
const benefits = [
  {
    icon: Shield,
    title: 'Verifisert profil',
    description: 'Med BankID-verifisering skiller din profil seg ut og bygger tillit hos arbeidsgivere.',
  },
  {
    icon: Briefcase,
    title: 'Relevante oppdrag',
    description: 'Vi matcher deg med oppdrag som passer din kompetanse, erfaring og ønsker.',
  },
  {
    icon: TrendingUp,
    title: 'Karriereutvikling',
    description: 'Få tilgang til varierte oppdrag som bygger din erfaring og åpner nye dører.',
  },
  {
    icon: Clock,
    title: 'Fleksible rotasjoner',
    description: 'Velg mellom ulike rotasjonsordninger som passer din livssituasjon.',
  },
];

// Process steps
const processSteps = [
  {
    step: '01',
    title: 'Registrer deg',
    description: 'Fyll ut profilen din med sertifikater, erfaring og preferanser. Det tar ca. 10 minutter.',
  },
  {
    step: '02',
    title: 'Verifiser',
    description: 'Bekreft identiteten din med BankID. Vi gjennomgår dokumentasjonen din.',
  },
  {
    step: '03',
    title: 'Match',
    description: 'Vi kobler deg med relevante oppdrag. Du velger selv hvilke du vil søke på.',
  },
];

// Sectors
const sectors = [
  { name: 'Offshore & Subsea', description: 'Plattformer, supply, konstruksjonsfartøy' },
  { name: 'Havbruk', description: 'Brønnbåt, servicefartøy, oppdrett' },
  { name: 'Shipping', description: 'Tankskip, bulk, containere, cruise' },
  { name: 'Spesialister', description: 'ROV, ETO, inspektører, surveyor' },
];

const faqItems = [
  {
    question: 'Hvordan registrerer jeg meg som sjømann hos Bluecrew?',
    answer: 'Gå til "Meld interesse" på bluecrew.no, fyll ut skjemaet med dine personlige opplysninger, kompetanse og sertifikater. Registreringen tar ca. 10 minutter og er helt gratis.',
  },
  {
    question: 'Hva er BankID-verifisering og hvorfor trenger jeg det?',
    answer: 'BankID-verifisering bekrefter din identitet og gjør profilen din mer troverdig for arbeidsgivere. Verifiserte profiler prioriteres og får raskere svar på søknader.',
  },
  {
    question: 'Hvilke sertifikater bør jeg laste opp i profilen?',
    answer: 'Last opp alle gyldige maritime sertifikater som STCW, sikkerhetskurs, D-sertifikater, maskinistsertifikat, og eventuelle spesialkurs. Jo mer komplett profil, desto bedre matching.',
  },
  {
    question: 'Koster det noe å bruke Bluecrew?',
    answer: 'Nei, Bluecrew er helt gratis for sjøfolk. Vi tar kun betalt fra rederier og arbeidsgivere som rekrutterer gjennom plattformen.',
  },
];

export default function SjofolkPage() {
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
            src={getImageUrl(IMAGE_PATHS.hero.sjofolk)}
            alt="Sjøfolk på dekk"
            fill
            sizes="100vw"
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-navy-900/80" />
        </div>
        <Container size="lg" className="relative z-10">
          <div className="max-w-4xl stagger">
            <h1 className="animate-fade-in-up text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-cream-50 mb-6 leading-tight tracking-tight" style={{ textShadow: '0 3px 10px rgba(0,0,0,0.9)' }}>
              <span className="italic">Finn</span> din neste jobb <span className="italic font-medium text-gold-300">til sjøs</span>
            </h1>

            <p className="animate-fade-in-up text-lg md:text-xl text-cream-100 mb-10 leading-relaxed max-w-2xl" style={{ textShadow: '0 3px 10px rgba(0,0,0,0.9)' }}>
              Registrer deg i vår maritime kandidatdatabase. Gratis, trygt og effektivt.
            </p>

            <div className="animate-fade-in-up flex flex-col sm:flex-row gap-4">
              <Link href="/meld-interesse">
                <Button size="lg" className="bg-gold-500 text-navy-600 hover:bg-gold-400 font-medium shadow-lg shadow-gold-500/20">
                  Registrer deg nå
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/lonn">
                <Button size="lg" variant="outline" className="bg-gold-400/5 border-gold-400/20 text-cream-50 hover:bg-gold-400/10 backdrop-blur-sm">
                  Se lønnsoversikt
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-100">
        <Container size="lg">
          <div className="py-3">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </Container>
      </div>

      {/* Benefits Section */}
      <Section className="bg-linear-to-b from-white via-sky-50/30 to-white py-20 md:py-28">
        <Container size="lg">
          <div className="stagger">
            <div className="animate-fade-in-up text-center mb-20">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-navy-900 mb-4">
                Hvorfor <span className="italic">registrere deg</span> <span className="font-medium">hos Bluecrew?</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Vi gjør det enkelt å finne din neste jobb til sjøs. Her er fordelene med å være i vår database.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="animate-fade-in-up bg-white rounded-3xl p-8 border border-slate-200 hover:border-sky-500/30 hover:shadow-md transition-all"
                >
                  <h3 className="text-xl font-medium text-navy-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Process Section */}
      <Section className="bg-slate-50">
        <Container size="lg">
          <div className="stagger">
            <div className="animate-fade-in-up text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-medium text-navy-900 mb-4">
                Slik <span className="italic">fungerer</span> det
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Tre enkle steg fra registrering til din neste jobb.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {processSteps.map((step, index) => (
                <div
                  key={index}
                  className="animate-fade-in-up relative group"
                >
                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 h-full hover:shadow-md hover:border-sky-500/30 transition-all">
                    <div className="text-5xl font-medium text-slate-100 mb-4 group-hover:text-sky-200 transition-colors">
                      {step.step}
                    </div>
                  <h3 className="text-xl font-medium text-navy-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ChevronRight className="w-8 h-8 text-slate-300" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Sectors Section */}
      <Section className="bg-navy-900 text-cream-100 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.05] pointer-events-none" />
        
        <Container size="lg" className="relative z-10">
          <div className="stagger">
            <div className="animate-fade-in-up text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-medium text-cream-50 mb-4">
                Sektorer <span className="italic">vi dekker</span>
              </h2>
              <p className="text-lg text-cream-100 max-w-2xl mx-auto">
                Vi har oppdrag innen alle maritime sektorer i Norge og internasjonalt.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {sectors.map((sector, index) => (
                <div
                  key={index}
                  className="animate-fade-in-up bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-gold-400/30 hover:bg-white/15 transition-all group"
                >
                  <h3 className="text-lg font-medium text-cream-50 mb-3 group-hover:text-gold-400 transition-colors">
                    {sector.name}
                  </h3>
                  <p className="text-cream-100 text-sm leading-relaxed">
                    {sector.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* What we look for */}
      <Section className="bg-white">
        <Container size="lg">
          <div className="stagger">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="animate-fade-in-up">
                <h2 className="text-3xl md:text-4xl font-medium text-navy-900 mb-6">
                  Hvem <span className="italic">ser vi etter?</span>
                </h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Vi ser etter sjøfolk med gyldig kompetanse og motivasjon for jobben. Enten du er erfaren kaptein eller nyutdannet kadett – vi har plass til deg i vår database.
                </p>
                <ul className="space-y-4">
                  {[
                    'Gyldige STCW-sertifikater',
                    'Godkjent helseerklæring for sjøfolk',
                    'Relevant fartstid dokumentert',
                    'Motivasjon og fleksibilitet',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <div className="mt-1 w-5 h-5 rounded-full bg-sky-500/20 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-500" />
                      </div>
                      <span className="text-navy-800 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="animate-fade-in-up">
                <div className="bg-slate-50 rounded-3xl p-10 border border-slate-200 shadow-xl shadow-navy-900/5">
                  <h3 className="text-2xl font-medium text-navy-900 mb-6">Trygg registrering</h3>

                  <div className="space-y-4 mb-10">
                    <div className="flex items-center gap-4 text-navy-700 font-medium">
                      <FileCheck className="w-5 h-5 text-sky-600" />
                      <span>Verifisert med BankID</span>
                    </div>
                    <div className="flex items-center gap-4 text-navy-700 font-medium">
                      <Award className="w-5 h-5 text-sky-600" />
                      <span>Sertifikater gjennomgått</span>
                    </div>
                    <div className="flex items-center gap-4 text-navy-700 font-medium">
                      <Shield className="w-5 h-5 text-sky-600" />
                      <span>Personvern ivaretatt</span>
                    </div>
                  </div>

                  <Link href="/meld-interesse">
                    <Button fullWidth size="lg" className="bg-gold-500 text-navy-600 hover:bg-gold-400">
                      Registrer deg
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Quick Links Section */}
      <Section className="bg-white border-t border-slate-100">
        <Container size="lg">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-medium text-navy-900 mb-3">
              Utforsk <span className="italic">mer</span>
            </h2>
            <p className="text-slate-600">
              Alt du trenger for din maritime karriere
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/stillinger" className="group p-6 bg-slate-50 rounded-2xl hover:bg-sky-50 transition-colors text-center">
              <Briefcase className="w-8 h-8 text-sky-500 mx-auto mb-3" />
              <h3 className="font-medium text-navy-900 group-hover:text-sky-600 transition-colors">Ledige stillinger</h3>
              <p className="text-sm text-slate-500 mt-1">Se alle jobber</p>
            </Link>
            
            <Link href="/karriere" className="group p-6 bg-slate-50 rounded-2xl hover:bg-sky-50 transition-colors text-center">
              <TrendingUp className="w-8 h-8 text-sky-500 mx-auto mb-3" />
              <h3 className="font-medium text-navy-900 group-hover:text-sky-600 transition-colors">Karriereguide</h3>
              <p className="text-sm text-slate-500 mt-1">Stillingstyper & lønn</p>
            </Link>
            
            <Link href="/lonn/kalkulator" className="group p-6 bg-slate-50 rounded-2xl hover:bg-sky-50 transition-colors text-center">
              <Clock className="w-8 h-8 text-sky-500 mx-auto mb-3" />
              <h3 className="font-medium text-navy-900 group-hover:text-sky-600 transition-colors">Lønnskalkulator</h3>
              <p className="text-sm text-slate-500 mt-1">Regn ut din lønn</p>
            </Link>
            
            <Link href="/crew" className="group p-6 bg-slate-50 rounded-2xl hover:bg-sky-50 transition-colors text-center">
              <Anchor className="w-8 h-8 text-sky-500 mx-auto mb-3" />
              <h3 className="font-medium text-navy-900 group-hover:text-sky-600 transition-colors">Crew blogg</h3>
              <p className="text-sm text-slate-500 mt-1">Historier fra sjøen</p>
            </Link>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="bg-slate-50">
        <Container size="md">
          <div className="stagger text-center">
            <div className="animate-fade-in-up mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white text-sky-600 shadow-sm">
                <Anchor className="w-8 h-8" />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-medium text-navy-900 mb-4">
              Klar for å <span className="italic">ta steget?</span>
            </h2>

            <p className="text-xl text-slate-600 mb-10 max-w-xl mx-auto">
              Registrering tar kun 10 minutter. Din neste mulighet kan være nærmere enn du tror.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/meld-interesse">
                <Button size="lg" className="bg-gold-500 hover:bg-gold-400 text-navy-600 font-medium px-8">
                  Registrer deg nå
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/lonn/kalkulator">
                <Button size="lg" variant="outline" className="bg-white border-slate-200 hover:border-sky-500 text-navy-900 hover:text-sky-600 px-8">
                  Sjekk lønnskalkulator
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

