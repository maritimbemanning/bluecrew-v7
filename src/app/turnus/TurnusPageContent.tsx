'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import {
  Calendar,
  ChevronRight,
  Clock,
  Ship,
  Anchor,
  CheckCircle2,
  Info
} from '@/components/icons';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import SummaryBox from '@/components/ui/SummaryBox';
import { getImageUrl, IMAGE_PATHS } from '@/lib/images';

// Lazy load heavy calculator component
const TurnusCalculator = dynamic(
  () => import('@/components/calculator/TurnusCalculator'),
  { loading: () => <div className="h-[600px] bg-slate-50 rounded-2xl animate-pulse" /> }
);

// Rotation types with detailed info
const rotationTypes = [
  {
    name: '2-4',
    sector: 'Offshore',
    description: '2 uker på, 4 uker fri',
    daysOnYear: 122,
    daysOffYear: 243,
    pros: ['Mest fritid per år', 'Populær og vanlig', 'God work-life balance'],
    cons: ['Lavere total arbeidstid = potensielt lavere lønn'],
    common: ['PSV', 'Supply', 'Konstruksjonsfartøy'],
  },
  {
    name: '2-3',
    sector: 'Offshore',
    description: '2 uker på, 3 uker fri',
    daysOnYear: 146,
    daysOffYear: 219,
    pros: ['God balanse arbeid/fritid', 'Vanlig offshore'],
    cons: ['Kortere friperioder enn 2-4'],
    common: ['Ankerhåndtering', 'AHTS'],
  },
  {
    name: '2-2',
    sector: 'Offshore / Havbruk',
    description: '2 uker på, 2 uker fri',
    daysOnYear: 183,
    daysOffYear: 182,
    pros: ['Lik fordeling arbeid/fritid', 'Jevne perioder'],
    cons: ['Mer tid på jobb enn 2-4'],
    common: ['Brønnbåt', 'Servicefartøy', 'Seismikk'],
  },
  {
    name: '1-1',
    sector: 'Havbruk / Kyst',
    description: '1 uke på, 1 uke fri',
    daysOnYear: 183,
    daysOffYear: 182,
    pros: ['Korte perioder borte', 'Bra for familieliv'],
    cons: ['Hyppige skift', 'Mye reising'],
    common: ['Havbruk', 'Kystfart', 'Ferger'],
  },
  {
    name: '4-4',
    sector: 'Internasjonalt',
    description: '4 uker på, 4 uker fri',
    daysOnYear: 183,
    daysOffYear: 182,
    pros: ['Lange friperioder', 'Færre reiser'],
    cons: ['Lange perioder borte hjemmefra'],
    common: ['Internasjonale oppdrag', 'Tankskip', 'Bulk'],
  },
];

// FAQ items for schema markup
const faqItems = [
  {
    question: 'Hva betyr 2-4 rotasjon?',
    answer: '2-4 rotasjon betyr at du jobber 2 uker på fartøyet, etterfulgt av 4 uker fri hjemme. Dette er en av de vanligste rotasjonsordningene i norsk offshorevirksomhet og gir ca. 122 arbeidsdager per år.',
  },
  {
    question: 'Hvor mange dager jobber man per år med offshore turnus?',
    answer: 'Det varierer med rotasjonstype. Med 2-4 turnus jobber du ca. 122 dager per år. Med 2-2 eller 1-1 turnus jobber du ca. 183 dager per år. 2-3 gir ca. 146 arbeidsdager.',
  },
  {
    question: 'Hvilken turnus gir mest fritid?',
    answer: '2-4 rotasjonen gir mest sammenhengende fritid – hele 4 uker av gangen. Med denne turnusen har du ca. 243 fridager per år. 2-3 gir 219 fridager, mens 2-2 og 1-1 gir ca. 182 fridager.',
  },
  {
    question: 'Hvordan påvirker turnus lønnen?',
    answer: 'Rotasjoner med flere arbeidsdager (som 2-2 eller 4-4) kan gi høyere totallønn fordi du jobber mer. Imidlertid har offshore-stillinger ofte høy grunnlønn uavhengig av turnus. Tillegg for natt, helg og overtid kommer i tillegg.',
  },
  {
    question: 'Hva er vanlig turnus for havbruk?',
    answer: 'I havbruk er 1-1 og 2-2 rotasjoner vanligst. Brønnbåter kjører ofte 2-2, mens servicefartøy og oppdrettsanlegg kan variere. Noen stillinger har også varierende turnus basert på sesong.',
  },
];

export default function TurnusPageContent() {
  return (
    <main>
      {/* Hero Section with background image */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={getImageUrl(IMAGE_PATHS.hero.sjofolk)}
            alt="Sjøfolk på dekk - turnus og rotasjonsordninger"
            fill
            sizes="100vw"
            className="object-cover object-top"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-navy-900/80" />
        <Container size="lg" className="relative z-10 py-16 md:py-20">
          <div className="stagger-container max-w-4xl mx-auto text-center">
            <div className="stagger-item mb-6" style={{ animationDelay: '0ms' }}>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold-400/10 border border-gold-400/20 rounded-full text-gold-300 text-sm font-medium backdrop-blur-sm">
                <Calendar className="w-4 h-4" />
                Interaktiv kalkulator
              </span>
            </div>

            <h1 className="stagger-item text-4xl md:text-5xl lg:text-6xl font-medium text-cream-50 mb-6 leading-tight" style={{ animationDelay: '100ms', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
              Beregn din <span className="font-medium text-gold-400">turnus</span>
            </h1>

            <p className="stagger-item text-lg md:text-xl text-cream-100/90 mb-10 max-w-2xl mx-auto leading-relaxed font-medium" style={{ animationDelay: '200ms', textShadow: '0 2px 6px rgba(0,0,0,0.7)' }}>
              Se hvor mange dager du jobber, hvor mye fri du får, og hva du tjener per dag. Sammenlign med kontorjobb!
            </p>

            <a 
              href="#kalkulator"
              className="stagger-item inline-flex items-center gap-2 px-8 py-4 bg-gold-500 text-navy-900 italic rounded-full font-medium text-lg hover:bg-gold-400 transition-all hover:scale-105 shadow-lg shadow-gold-500/20"
              style={{ animationDelay: '300ms' }}
            >
              Prøv kalkulatoren
              <ChevronRight className="w-5 h-5" />
            </a>
            
            <div className="stagger-item flex flex-wrap gap-3 justify-center mt-10" style={{ animationDelay: '400ms' }}>
              {['2-4', '2-3', '2-2', '1-1', '4-4', 'Egendefinert'].map((rotation) => (
                  <span
                    key={rotation}
                    className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-cream-200 text-sm hover:bg-white/10 transition-colors"
                  >
                    {rotation}
                  </span>
                ))}
              </div>
            </div>
        </Container>
      </section>

      {/* Calculator Section */}
      <Section id="kalkulator" className="bg-linear-to-b from-white via-sky-50/30 to-white scroll-mt-20">
        <Container size="lg">
          <div className="stagger-container">
            <SummaryBox variant="emerald">
              <p>
                <strong>Offshore turnus:</strong> 2-4 rotasjon gir 243 fridager/år (mest fritid). 
                2-2 og 1-1 gir 182 fridager. Med 2-4 jobber du ~122 dager/år, 
                mens 2-2 gir ~183 arbeidsdager. Velg turnus basert på livsstil og lønnsønsker.
              </p>
            </SummaryBox>

            <div className="stagger-item text-center mb-16" style={{ animationDelay: '0ms' }}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-navy-900 mb-4">
                Interaktiv <span className="font-medium">turnus-kalkulator</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Velg rotasjon og stilling for å se hvor mange dager du jobber per år, hvor mye fritid du får, og estimert årslønn.
              </p>
            </div>

            <TurnusCalculator />
          </div>
        </Container>
      </Section>

      {/* Info: What is rotation */}
      <Section>
        <Container size="lg">
          <div className="stagger-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="stagger-item" style={{ animationDelay: '0ms' }}>
                <h2 className="text-3xl md:text-4xl font-medium text-navy mb-6">
                  Hva er turnus og rotasjon?
                </h2>
                <div className="prose prose-lg text-slate-600">
                  <p>
                    <strong>Turnus</strong> eller <strong>rotasjon</strong> beskriver arbeidsordningen til sjøs. I stedet for vanlig 8-4 hverdag, jobber maritime profesjonelle sammenhengende perioder på fartøyet, etterfulgt av friperioder hjemme.
                  </p>
                  <p>
                    Den vanligste notasjonen er <strong>X-Y</strong>, der X er antall uker på jobb og Y er antall uker fri. For eksempel betyr «2-4» at du jobber 2 uker på fartøyet, deretter har du 4 uker fri hjemme.
                  </p>
                  <p>
                    Rotasjonsordningen påvirker både livskvalitet og økonomi. Noen foretrekker lange friperioder (som 2-4), mens andre foretrekker jevnere fordeling (som 1-1) for å være nærmere familien oftere.
                  </p>
                </div>
              </div>

              <div className="stagger-item" style={{ animationDelay: '100ms' }}>
                <div className="bg-slate-50 rounded-2xl p-8">
                  <h3 className="text-xl font-medium text-navy mb-6 flex items-center gap-2">
                    <Info className="w-6 h-6 text-sky" />
                    Vanlige rotasjoner
                  </h3>
                  <ul className="space-y-4">
                    {[
                      { rot: '2-4', desc: 'Vanligst offshore, gir mest fritid' },
                      { rot: '2-3', desc: 'Balansert, brukes på AHTS og supply' },
                      { rot: '2-2', desc: 'Lik fordeling, havbruk og seismikk' },
                      { rot: '1-1', desc: 'Korte perioder, populært i havbruk' },
                      { rot: '4-4', desc: 'Lange perioder, internasjonale oppdrag' },
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="px-3 py-1 bg-gold-500 text-navy-900 italic text-sm font-bold rounded-lg shrink-0">
                          {item.rot}
                        </span>
                        <span className="text-slate-600">{item.desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Rotation Comparison */}
      <Section variant="slate">
        <Container size="lg">
          <div className="stagger-container">
            <div className="stagger-item text-center mb-12" style={{ animationDelay: '0ms' }}>
              <h2 className="text-3xl md:text-4xl font-medium text-navy mb-4">
                Sammenlign rotasjonsordninger
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Se detaljert informasjon om de vanligste turnusordningene i maritim sektor.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rotationTypes.slice(0, 6).map((rotation, index) => (
                <div
                  key={index}
                  className="stagger-item bg-white rounded-xl p-6 shadow-sm"
                  style={{ animationDelay: `${(index + 1) * 50}ms` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-bold text-navy">{rotation.name}</span>
                    <span className="px-3 py-1 bg-sky/10 text-sky text-sm font-medium rounded-full">
                      {rotation.sector}
                    </span>
                  </div>

                  <p className="text-slate-600 mb-4">{rotation.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-slate-50 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-navy">{rotation.daysOnYear}</div>
                      <div className="text-xs text-slate-500">Arbeidsdager/år</div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-sky">{rotation.daysOffYear}</div>
                      <div className="text-xs text-slate-500">Fridager/år</div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="text-sm font-medium text-navy">Fordeler:</div>
                    <ul className="text-sm text-slate-600 space-y-1">
                      {rotation.pros.map((pro, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-xs text-slate-500">
                    <strong>Vanlig på:</strong> {rotation.common.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Sector-specific info */}
      <Section>
        <Container size="lg">
          <div className="stagger-container">
            <div className="stagger-item text-center mb-12" style={{ animationDelay: '0ms' }}>
              <h2 className="text-3xl md:text-4xl font-medium text-navy mb-4">
                Turnus per sektor
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Offshore */}
              <div className="stagger-item bg-linear-to-br from-navy-900 to-navy-800 rounded-2xl p-8 text-cream-100" style={{ animationDelay: '100ms' }}>
                <div className="w-12 h-12 bg-gold-400/20 rounded-lg flex items-center justify-center mb-4">
                  <Ship className="w-6 h-6 text-gold-400" />
                </div>
                <h3 className="text-2xl font-medium mb-4">Offshore</h3>
                <p className="text-cream-100/80 mb-4">
                  Norsk sokkel domineres av 2-4 og 2-3 rotasjoner. PSV, supply og konstruksjonsfarтøy følger ofte tariffavtaler med faste turnusordninger.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-cream-100/60">Vanligst:</span>
                    <span className="font-bold">2-4, 2-3</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-cream-100/60">Arbeidsdager:</span>
                    <span className="font-bold">122-146/år</span>
                  </div>
                </div>
              </div>

              {/* Havbruk */}
              <div className="stagger-item bg-linear-to-br from-cyan-600 to-cyan-800 rounded-2xl p-8 text-cream-100" style={{ animationDelay: '200ms' }}>
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <Anchor className="w-6 h-6 text-cream-50" />
                </div>
                <h3 className="text-2xl font-medium mb-4">Havbruk</h3>
                <p className="text-cream-100/80 mb-4">
                  Havbruksnæringen bruker ofte 1-1 og 2-2 rotasjoner. Brønnbåter og servicefartøy har varierte ordninger avhengig av sesong og oppdragsgiver.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-cream-100/60">Vanligst:</span>
                    <span className="font-bold">1-1, 2-2</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-cream-100/60">Arbeidsdager:</span>
                    <span className="font-bold">183/år</span>
                  </div>
                </div>
              </div>

              {/* Rederi/Shipping */}
              <div className="stagger-item bg-linear-to-br from-slate-700 to-slate-900 rounded-2xl p-8 text-cream-100" style={{ animationDelay: '300ms' }}>
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-cream-50" />
                </div>
                <h3 className="text-2xl font-medium mb-4">Shipping / Rederi</h3>
                <p className="text-cream-100/80 mb-4">
                  Tradisjonell shipping har ofte lengre perioder. Internasjonale ruter bruker 4-4 eller lengre. Nettolønnsordningen gjør disse stillingene attraktive.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-cream-100/60">Vanligst:</span>
                    <span className="font-bold">4-4, 3-3, varierende</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-cream-100/60">Arbeidsdager:</span>
                    <span className="font-bold">Varierer mye</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section variant="slate">
        <Container size="md">
          <div className="stagger-container">
            <div className="stagger-item text-center mb-12" style={{ animationDelay: '0ms' }}>
              <h2 className="text-3xl md:text-4xl font-medium text-navy mb-4">
                Ofte stilte spørsmål om turnus
              </h2>
            </div>

            <div className="space-y-4">
              {faqItems.map((faq, index) => (
                <details
                  key={index}
                  className="stagger-item group bg-white rounded-xl shadow-sm"
                  style={{ animationDelay: `${(index + 1) * 50}ms` }}
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <span className="font-medium text-navy pr-4">{faq.question}</span>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section variant="navy">
        <Container size="md">
          <div className="stagger-container text-center">
            <div className="stagger-item mb-4" style={{ animationDelay: '0ms' }}>
              <Ship className="w-12 h-12 text-gold-400 mx-auto" />
            </div>

            <h2 className="stagger-item text-3xl md:text-4xl font-medium text-cream-50 mb-4" style={{ animationDelay: '100ms' }}>
              Klar for neste oppdrag?
            </h2>

            <p className="stagger-item text-xl text-cream-100/80 mb-8 max-w-xl mx-auto" style={{ animationDelay: '200ms' }}>
              Registrer deg i vår database og få tilgang til stillinger med din foretrukne turnus.
            </p>

            <div className="stagger-item flex flex-col sm:flex-row gap-4 justify-center" style={{ animationDelay: '300ms' }}>
              <Link href="/meld-interesse">
                <Button size="lg" variant="primary">
                  Registrer deg
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/lonn/kalkulator">
                <Button size="lg" variant="outline" className="border-gold-400/20 text-cream-50 hover:bg-gold-400/10">
                  Lønnskalkulator
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}

