import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { IMAGE_PATHS, getImageUrl } from '@/lib/images';
import {
  Zap,
  ChevronRight,
  Anchor,
  Award,
  Clock,
  Cpu,
  Shield,
  Wifi,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Monitor
} from '@/components/icons';
import Section from '@/components/ui/Section';
import SummaryBox from '@/components/ui/SummaryBox';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Accordion from '@/components/ui/Accordion';
import SchemaMarkup from '@/components/seo/SchemaMarkup';

const breadcrumbs = [
  { name: 'Hjem', url: '/' },
  { name: 'Karriere', url: '/karriere' },
  { name: 'ETO', url: '/karriere/eto' },
];

export const metadata: Metadata = {
  title: 'Bli ETO – Electro-Technical Officer utdanning og karriere',
  description: 'Komplett guide til å bli ETO (Electro-Technical Officer) i Norge. Utdanning, STCW III/6-sertifisering, lønn og karrieremuligheter innen maritim elektronikk.',
  keywords: [
    'bli ETO',
    'ETO utdanning',
    'Electro-Technical Officer',
    'maritim elektriker',
    'STCW III/6',
    'offshore ETO',
  ],
  openGraph: {
    title: 'Bli ETO – Electro-Technical Officer utdanning og karriere',
    description: 'Komplett guide til å bli ETO i Norge. Utdanning, sertifikater og karrierevei.',
    url: 'https://bluecrew.no/karriere/eto',
    siteName: 'Bluecrew AS',
    locale: 'nb_NO',
    type: 'article',
  },
  alternates: {
    canonical: 'https://bluecrew.no/karriere/eto',
  },
};

const faqs = [
  {
    id: 'faq-1',
    title: 'Hva er en ETO?',
    content: 'ETO står for Electro-Technical Officer, på norsk elektro-teknisk offiser. Dette er en relativt ny maritim stilling som ble innført med STCW Manila-endringene i 2010. ETO har ansvar for alle elektriske, elektroniske og IT-systemer om bord. På moderne skip med avansert automasjon og navigasjonsutstyr er ETO en kritisk rolle.',
  },
  {
    id: 'faq-2',
    title: 'Kan elektriker bli ETO?',
    content: 'Ja, elektrikere er godt posisjonert for å bli ETO. Du trenger fagbrev som elektriker, deretter maritime tilleggsmoduler og STCW-sertifikater inkludert Basic Safety Training. Du må også samle fartstid. Mange ETO-er har bakgrunn som elektrikere på land før de gikk til sjøs.',
  },
  {
    id: 'faq-3',
    title: 'Hvilke skip trenger ETO?',
    content: 'STCW krever ETO på skip over 3000 BT med mer enn 750 kW hovedmaskineri. I praksis har de fleste offshore-skip, større tankskip, cruise-skip og moderne containerskip ETO om bord. Havbruksfartøy og mindre kystfartøy har sjeldnere dedikert ETO, men trenden går mot flere.',
  },
  {
    id: 'faq-4',
    title: 'Er det stor etterspørsel etter ETO?',
    content: 'Ja, etterspørselen etter kvalifiserte ETO-er er høy og økende. Skip blir stadig mer teknologisk avanserte med mer automasjon, hybrid fremdrift og komplekse navigasjonssystemer. Mange rederier sliter med å finne kvalifiserte kandidater. Dette gir gode lønnsbetingelser og jobbmuligheter.',
  },
  {
    id: 'faq-5',
    title: 'Hva er forskjellen på ETO og maskinist?',
    content: 'Maskinist fokuserer på mekaniske systemer (motorer, hydraulikk, pumper), mens ETO fokuserer på elektriske og elektroniske systemer (høyspent, automasjon, navigasjon, IT). På moderne skip overlapper rollene noe, og godt samarbeid er viktig. Begge er offiserer med lignende lønnsnivå.',
  },
];

export default function ETOKarrierePage() {
  return (
    <>
      <SchemaMarkup
        type="faq"
        faqItems={faqs.map((faq) => ({
          question: faq.title,
          answer: faq.content,
        }))}
      />
      <SchemaMarkup type="breadcrumb" breadcrumbs={breadcrumbs} />

      <main>
        {/* Hero Section */}
        <div className="relative min-h-screen flex items-center overflow-hidden bg-navy-900 pt-20">
          <div className="absolute inset-0 z-0">
            <Image
              src={getImageUrl(IMAGE_PATHS.careers.eto)}
              alt="Elektroteknisk offiser - ETO karriere på skip"
              fill
              sizes="100vw"
              className="object-cover opacity-50"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-linear-to-r from-navy-900/80 via-navy-900/60 to-navy-900/30" />
          <Container size="lg" className="relative z-10 py-20">
            <div className="max-w-3xl">
              <div className="mb-4">
                <Link
                  href="/karriere"
                  className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 text-sm font-medium"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  Tilbake til karriereoversikt
                </Link>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gold-500/10 border border-gold-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Zap className="w-8 h-8 text-gold-400" />
                </div>
                <div>
                  <span className="text-gold-400 text-sm font-medium tracking-wider uppercase">Karrierevei</span>
                  <h1 className="text-4xl md:text-6xl font-medium text-cream-50">
                    Bli <em className="not-italic font-medium text-gold-400">ETO</em>
                  </h1>
                </div>
              </div>

              <p className="text-xl text-cream-100/90 mb-8 leading-relaxed font-medium">
                ETO (Electro-Technical Officer) er skipets elektronikkekspert. Med ansvar for alt fra
                navigasjonsutstyr til høyspent-systemer er dette en av de mest ettertraktede stillingene til sjøs.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="bg-gold-400/10 border border-gold-400/20 rounded-lg px-6 py-3 backdrop-blur-sm">
                  <span className="text-gold-300/70 text-xs uppercase tracking-wider">Lønnsnivå</span>
                  <p className="text-cream-50 font-bold text-lg">550k – 950k kr</p>
                </div>
                <div className="bg-gold-400/10 border border-gold-400/20 rounded-lg px-6 py-3 backdrop-blur-sm">
                  <span className="text-gold-300/70 text-xs uppercase tracking-wider">Tid til stilling</span>
                  <p className="text-cream-50 font-bold text-lg">4-7 år</p>
                </div>
                <div className="bg-gold-400/10 border border-gold-400/20 rounded-lg px-6 py-3 backdrop-blur-sm">
                  <span className="text-gold-300/70 text-xs uppercase tracking-wider">Utdanning</span>
                  <p className="text-cream-50 font-bold text-lg">Elektro + ETO</p>
                </div>
              </div>
            </div>
          </Container>
        </div>

        <Section>
          <Container size="md">
            <SummaryBox variant="gold">
              <p>
                <strong>ETO (Elektriker):</strong> Ansvar for skipets elektriske systemer, automasjon og IT.
                Lønn: 550 000 – 950 000 kr. Krever elektrofagbrev, maritim modul og STCW III/6.
                Høy etterspørsel på moderne, teknologisk avanserte skip.
              </p>
            </SummaryBox>
          </Container>
        </Section>

        {/* What does an ETO do */}
        <Section>
          <Container size="lg">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-medium text-navy mb-6">
                  Hva gjør en ETO?
                </h2>
                <div className="prose prose-lg max-w-none text-slate-600">
                  <p>
                    ETO, eller Electro-Technical Officer, er en relativt ny stilling i maritim sektor.
                    Rollen ble formelt innført med STCW Manila-endringene i 2010 som respons på at
                    moderne skip har blitt stadig mer avhengige av avanserte elektroniske systemer.
                  </p>
                  <p>
                    Som ETO har du ansvar for alle elektriske og elektroniske systemer om bord. Dette
                    inkluderer navigasjonsutstyr som radar, ECDIS og GPS, kommunikasjonssystemer,
                    automasjon og kontrollsystemer, strømforsyning inkludert høyspent, og ofte også
                    IT-infrastruktur og nettverk.
                  </p>
                  <p>
                    En vanlig dag som ETO kan innebære alt fra rutinemessig vedlikehold av
                    navigasjonsutstyr, feilsøking på automasjonssystemer, oppdatering av software,
                    til akutte reparasjoner når kritiske systemer svikter. Du må kunne jobbe med
                    både gammel og ny teknologi, ofte under tidspress.
                  </p>
                  <p>
                    Særlig på offshore-skip og avanserte konstruksjonsfartøy er ETO-rollen kritisk.
                    Dynamisk posisjonering (DP), ROV-systemer, og komplekse kranoperasjoner er
                    alle avhengige av elektronikk som ETO har ansvar for.
                  </p>
                  <p>
                    Fremtiden for ETO ser lys ut. Med elektrifisering av skipsfarten, hybride
                    fremdriftssystemer, og økt digitalisering vil behovet for dyktige ETO-er
                    bare øke. Dette gjenspeiles i lønnsnivået som er blant de høyeste for
                    offiserer til sjøs.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-50 rounded-2xl p-6">
                  <h3 className="font-medium text-navy mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-sky" />
                    Typisk arbeidsdag
                  </h3>
                  <ul className="space-y-3 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky shrink-0 mt-0.5" />
                      Systemkontroll og inspeksjon
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky shrink-0 mt-0.5" />
                      Vedlikehold av navigasjonsutstyr
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky shrink-0 mt-0.5" />
                      Feilsøking og reparasjoner
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky shrink-0 mt-0.5" />
                      Software-oppdateringer
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky shrink-0 mt-0.5" />
                      IT-support og nettverk
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky shrink-0 mt-0.5" />
                      Dokumentasjon og rapportering
                    </li>
                  </ul>
                </div>

                <div className="bg-sky/10 rounded-2xl p-6">
                  <h3 className="font-medium text-navy mb-4 flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-sky" />
                    Systemer du jobber med
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• Radar, ECDIS, GPS, AIS</li>
                    <li>• DP-systemer (Dynamic Positioning)</li>
                    <li>• Automasjon og PLC-systemer</li>
                    <li>• Høyspent-distribusjon</li>
                    <li>• UPS og nødstrøm</li>
                    <li>• Kommunikasjon (GMDSS)</li>
                    <li>• CCTV og adgangskontroll</li>
                    <li>• IT-nettverk og servere</li>
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Technical competence */}
        <Section variant="slate">
          <Container size="lg">
            <h2 className="text-3xl font-medium text-navy mb-8 text-center">
              Teknisk kompetanse
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Zap,
                  title: 'Høyspent',
                  description: 'Arbeid med spenninger over 1000V. Sikkerhet, distribusjon og feilsøking.',
                },
                {
                  icon: Monitor,
                  title: 'Navigasjon',
                  description: 'Radar, ECDIS, GPS, AIS. Installasjon, kalibrering og vedlikehold.',
                },
                {
                  icon: Cpu,
                  title: 'Automasjon',
                  description: 'PLC-programmering, sensorer, aktuatorer og kontrollsystemer.',
                },
                {
                  icon: Wifi,
                  title: 'Kommunikasjon',
                  description: 'VHF, MF/HF, satelittkommunikasjon, GMDSS og nødkommunikasjon.',
                },
                {
                  icon: Shield,
                  title: 'Sikkerhet',
                  description: 'Elektrisk sikkerhet, HMS, brannvarsling og nødsystemer.',
                },
                {
                  icon: TrendingUp,
                  title: 'IT & Nettverk',
                  description: 'Skipets IT-infrastruktur, servere, nettverk og cybersikkerhet.',
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="w-12 h-12 bg-sky/10 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-sky" />
                    </div>
                    <h3 className="font-medium text-navy mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </Container>
        </Section>

        {/* Education and Certifications */}
        <Section>
          <Container size="lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-medium text-navy mb-6">
                  Utdanning og krav
                </h2>
                <div className="prose prose-lg max-w-none text-slate-600">
                  <p>
                    Det finnes flere veier til ETO-sertifikat. Den vanligste er å starte med
                    elektrofag på videregående, ta fagbrev som elektriker, og deretter maritime
                    tilleggskurs og STCW-sertifisering.
                  </p>
                  <p>
                    Alternativt kan du ta bachelor eller ingeniørutdanning innen elektro,
                    automatisering eller elektronikk, og deretter ETO-påbygging. Denne veien
                    gir sterkere teoretisk grunnlag.
                  </p>
                  <p>
                    For å få STCW III/6 ETO-sertifikat kreves godkjent utdanning pluss
                    minimum 12 måneder fartstid i elektro-teknisk stilling om bord. Du må
                    også ha alle grunnleggende STCW-sertifikater.
                  </p>
                  <h3>Høyspent er kritisk</h3>
                  <p>
                    De fleste moderne skip har høyspent-systemer, og dette er et område hvor
                    feil kan være livsfarlig. Høyspent-sertifisering er derfor svært viktig
                    og ofte påkrevd av rederier.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-navy rounded-2xl p-6 text-cream-100">
                  <h3 className="font-medium text-lg mb-4 text-cream-50">Påkrevde sertifikater</h3>
                  <ul className="space-y-3">
                    {[
                      'STCW III/6 – Electro-Technical Officer',
                      'Basic Safety Training (BST)',
                      'Advanced Fire Fighting',
                      'High Voltage Operations',
                      'Medical First Aid',
                      'Gyldig helseerklæring',
                    ].map((cert, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-sky shrink-0" />
                        <span className="text-cream-100">{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                  <div className="flex items-start gap-3">
                    <Award className="w-6 h-6 text-green-600 shrink-0" />
                    <div>
                      <h3 className="font-medium text-green-800 mb-2">Anbefalte tilleggskurs</h3>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• DP Maintenance (offshore)</li>
                        <li>• Radar og ARPA maintenance</li>
                        <li>• ECDIS Type Specific</li>
                        <li>• IT Security maritime</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
                    <div>
                      <h3 className="font-medium text-amber-800 mb-2">Viktig om elektrikerautorisasjon</h3>
                      <p className="text-sm text-amber-700">
                        Norsk elektrikerautorisasjon (FSE) er ikke automatisk gyldig om bord.
                        Maritim ETO-sertifisering er separat. Men erfaring som autorisert
                        elektriker er verdifull og forkorter veien.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Career Path */}
        <Section variant="slate">
          <Container size="lg">
            <h2 className="text-3xl font-medium text-navy mb-8 text-center">
              Karriereveien som ETO
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none text-slate-600 mb-8">
                <p>
                  ETO-karrieren er flatere enn dekk eller maskin, med færre formelle grader.
                  Men det finnes gode muligheter for spesialisering og avansement:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-medium text-navy mb-4">Typisk progresjon</h3>
                  <div className="space-y-4">
                    {[
                      { title: 'Junior ETO / Trainee', years: '0-2 år', salary: '500-600k' },
                      { title: 'ETO', years: '2-5 år', salary: '600-750k' },
                      { title: 'Senior ETO', years: '5-10 år', salary: '750-900k' },
                      { title: 'Lead ETO / Fleet ETO', years: '10+ år', salary: '850-950k' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-navy">{item.title}</p>
                          <p className="text-sm text-slate-500">{item.years}</p>
                        </div>
                        <p className="font-bold text-sky">{item.salary}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-medium text-navy mb-4">Spesialiseringer</h3>
                  <ul className="space-y-3 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-sky rounded-full mt-1.5" />
                      <span><strong>DP Spesialist</strong> – Dynamic Positioning systemer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-sky rounded-full mt-1.5" />
                      <span><strong>Navigasjon</strong> – Radar, ECDIS, sensorintegrering</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-sky rounded-full mt-1.5" />
                      <span><strong>Automasjon</strong> – PLC, SCADA, kontrollsystemer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-sky rounded-full mt-1.5" />
                      <span><strong>IT/OT</strong> – Cyber security, nettverk, integrasjon</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-sky rounded-full mt-1.5" />
                      <span><strong>Elektrifisering</strong> – Hybrid, batterier, ladning</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-sky/10 rounded-2xl p-6">
                <h3 className="font-medium text-navy mb-4">Landbaserte karrieremuligheter</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: 'Technical Superintendent', desc: 'Overordnet teknisk ansvar for flåte' },
                    { title: 'Service Engineer', desc: 'Hos utstyrsleverandører (Kongsberg, Rolls-Royce)' },
                    { title: 'Klasseinspektør', desc: 'DNV, Lloyd\'s – inspeksjon og godkjenning' },
                  ].map((item, index) => (
                    <div key={index} className="bg-white rounded-lg p-4">
                      <h4 className="font-medium text-navy mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* FAQ Section */}
        <Section>
          <Container size="lg">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-medium text-navy mb-8 text-center">
                Ofte stilte spørsmål
              </h2>
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <Accordion items={faqs.map((faq) => ({ question: faq.title, answer: faq.content }))} />
              </div>
            </div>
          </Container>
        </Section>

        {/* CTA Section */}
        <Section variant="navy">
          <Container size="md">
            <div className="text-center">
              <Anchor className="w-12 h-12 text-gold-400 mx-auto mb-4" />
              <h2 className="text-3xl font-medium text-cream-50 mb-4">
                Vil du bli ETO?
              </h2>
              <p className="text-xl text-cream-100/80 mb-8 max-w-xl mx-auto">
                Etterspørselen etter ETO-er er høy. Registrer deg hos Bluecrew og få tilgang til de beste stillingene.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/meld-interesse">
                  <Button size="lg" className="bg-sky hover:bg-sky-dark">
                    Registrer deg nå
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/lonn/eto">
                  <Button size="lg" variant="outline" className="border-cream-100/20 text-cream-50 hover:bg-cream-100/10">
                    Se ETO-lønn
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

