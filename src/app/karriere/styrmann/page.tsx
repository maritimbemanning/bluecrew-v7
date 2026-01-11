import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { IMAGE_PATHS, getImageUrl } from '@/lib/images';
import {
  Ship,
  ChevronRight,
  Anchor,
  BookOpen,
  Award,
  Clock,
  Compass,
  Shield,
  Users,
  TrendingUp,
  CheckCircle2
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
  { name: 'Styrmann', url: '/karriere/styrmann' },
];

export const metadata: Metadata = {
  title: 'Bli styrmann – Utdanning, sertifikater og karrierevei',
  description: 'Komplett guide til å bli styrmann i Norge. Lær om nautisk utdanning, STCW-sertifikater, fartstid og karrieremuligheter fra 3. styrmann til overstyrmann.',
  keywords: [
    'bli styrmann',
    'styrmann utdanning',
    'styrmann sertifikater',
    'nautisk fagskole',
    'navigatør karriere',
    'STCW styrmann',
  ],
  openGraph: {
    title: 'Bli styrmann – Utdanning, sertifikater og karrierevei',
    description: 'Komplett guide til å bli styrmann i Norge. Utdanning, sertifikater og karrierevei.',
    url: 'https://bluecrew.no/karriere/styrmann',
    siteName: 'Bluecrew AS',
    locale: 'nb_NO',
    type: 'article',
  },
  alternates: {
    canonical: 'https://bluecrew.no/karriere/styrmann',
  },
};

const faqs = [
  {
    id: 'faq-1',
    title: 'Hva er forskjellen på 1., 2. og 3. styrmann?',
    content: '3. styrmann er den laveste offisersgraden og har brovakt under oppsyn, ofte med ansvar for sikkerhetsutstyr. 2. styrmann har selvstendig brovakt og ansvar for navigasjonsutstyr og kart. 1. styrmann (overstyrmann/chief mate) er nestkommanderende, har ansvar for lastoperasjoner, dekksvedlikehold og er stedfortreder for kapteinen. Jo høyere grad, jo mer ansvar og lønn.',
  },
  {
    id: 'faq-2',
    title: 'Hvor lang tid tar det å bli styrmann?',
    content: 'For å bli 3. styrmann trenger du typisk 4-5 år: videregående (3 år) + fagskole (2 år) + fartstid (12 måneder som kadett). For å avansere til 2. styrmann kreves ytterligere 12-18 måneder som 3. styrmann. 1. styrmann krever minimum 36 måneder som vakthavende offiser. Total tid fra start til overstyrmann er typisk 8-10 år.',
  },
  {
    id: 'faq-3',
    title: 'Kan man hoppe over styrmannsgrader?',
    content: 'Nei, du må jobbe deg gjennom gradene. Sjøfartsdirektoratet har klare krav til fartstid på hver grad før du kan avansere. Det er ikke mulig å gå direkte fra matros til overstyrmann eller fra 3. styrmann til kaptein. Systemet sikrer at alle offiserer har tilstrekkelig erfaring på hvert nivå.',
  },
  {
    id: 'faq-4',
    title: 'Hva er DP-sertifikat og trenger styrmann det?',
    content: 'DP (Dynamic Positioning) er et system som holder skipet automatisk i posisjon. DP-sertifikat er ikke påkrevd for styrmann, men er svært attraktivt i offshore-sektoren. Mange offshore-rederier krever eller foretrekker kandidater med DP-sertifikat. Det finnes tre nivåer: DP Basic, DP Advanced, og DP Operator. Sertifikatet gir høyere lønn og flere jobmuligheter.',
  },
  {
    id: 'faq-5',
    title: 'Er styrmann en god karrierevei?',
    content: 'Ja, styrmann er en solid karrierevei med god lønn og klare avansementsmuligheter. Som styrmann får du varierte oppgaver, ansvar, og mulighet til å spesialisere deg. Lønn ligger typisk mellom 450 000 og 850 000 kr avhengig av grad og sektor. Karriereveien leder naturlig mot kapteinstilling om du ønsker det.',
  },
];

export default function StyrmannKarrierePage() {
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
              src={getImageUrl(IMAGE_PATHS.careers.styrmann)}
              alt="Styrmann på skipsbro - navigatørkarriere"
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
                  <Ship className="w-8 h-8 text-gold-400" />
                </div>
                <div>
                  <span className="text-gold-400 text-sm font-medium tracking-wider uppercase">Karrierevei</span>
                  <h1 className="text-4xl md:text-6xl font-medium text-cream-50">
                    Bli <em className="not-italic font-medium text-gold-400">Styrmann</em>
                  </h1>
                </div>
              </div>

              <p className="text-xl text-cream-100/90 mb-8 leading-relaxed font-medium">
                Styrmannen er skipets navigatør og en nøkkelspiller på broen. Fra brovakt og navigasjon
                til lastoperasjoner – styrmann er steget mot kaptein og en karriere med stort ansvar.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="bg-gold-400/10 border border-gold-400/20 rounded-lg px-6 py-3 backdrop-blur-sm">
                  <span className="text-gold-300/70 text-xs uppercase tracking-wider">Lønnsnivå</span>
                  <p className="text-cream-50 font-bold text-lg">450k – 850k kr</p>
                </div>
                <div className="bg-gold-400/10 border border-gold-400/20 rounded-lg px-6 py-3 backdrop-blur-sm">
                  <span className="text-gold-300/70 text-xs uppercase tracking-wider">Tid til stilling</span>
                  <p className="text-cream-50 font-bold text-lg">5-8 år</p>
                </div>
                <div className="bg-gold-400/10 border border-gold-400/20 rounded-lg px-6 py-3 backdrop-blur-sm">
                  <span className="text-gold-300/70 text-xs uppercase tracking-wider">Utdanning</span>
                  <p className="text-cream-50 font-bold text-lg">Nautisk fagskole</p>
                </div>
              </div>
            </div>
          </Container>
        </div>

        <Section>
          <Container size="md">
            <SummaryBox variant="gold">
              <p>
                <strong>Styrmann:</strong> Ansvar for navigasjon, last og sikkerhet på broen.
                Lønn: 450 000 – 850 000 kr. Krever nautisk utdanning og sertifikater.
                Karriereveien går fra 3. styrmann til overstyrmann og videre til kaptein.
              </p>
            </SummaryBox>
          </Container>
        </Section>

        {/* What does a mate do */}
        <Section>
          <Container size="lg">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-medium text-navy mb-6">
                  Hva gjør en styrmann?
                </h2>
                <div className="prose prose-lg max-w-none text-slate-600">
                  <p>
                    Styrmannen er en av de viktigste offiserene om bord. Som navigatør har du ansvar for
                    trygg seilas, og som dekksoffiser har du ansvar for lasteoperasjoner og vedlikehold
                    av dekket. Det er en allsidig rolle som krever både teknisk kompetanse og lederevner.
                  </p>
                  <p>
                    I praksis tilbringer styrmannen mye tid på broen under brovakt. Du overvåker skipets
                    posisjon, kommuniserer med andre skip og landstasjoner, og tar navigasjonsbeslutninger.
                    Ved inn- og utseiling fra havn er du ofte med på broen for å bistå kapteinen.
                  </p>
                  <p>
                    Styrmannsrollen har tre grader: 3. styrmann, 2. styrmann og 1. styrmann (overstyrmann).
                    Hver grad har økende ansvar. Som 3. styrmann lærer du grunnleggende offisersoppgaver
                    under veiledning. Som overstyrmann er du nestkommanderende og stedfortreder for kapteinen.
                  </p>
                  <p>
                    Lastoperasjoner er en viktig del av jobben, spesielt for 1. styrmann. Du planlegger
                    lasting og lossing, sørger for riktig ballastering, og sikrer at lasten er forsvarlig
                    sikret. Feil her kan føre til at skipet blir ustabilt eller at last skades.
                  </p>
                  <p>
                    Styrmann er et naturlig steg på veien mot kaptein. De fleste kapteiner har jobbet som
                    styrmann i mange år og har dermed solid erfaring med alle aspekter av skipsdrift før
                    de tar over øverste kommando.
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
                      4-8 timers brovakt
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky shrink-0 mt-0.5" />
                      Navigasjonsplanlegging
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky shrink-0 mt-0.5" />
                      Oppdatering av kart og publikasjoner
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky shrink-0 mt-0.5" />
                      Lastplanlegging (overstyrmann)
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky shrink-0 mt-0.5" />
                      Dekksvedlikehold og inspeksjoner
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky shrink-0 mt-0.5" />
                      Sikkerhetsutstyr-kontroll
                    </li>
                  </ul>
                </div>

                <div className="bg-sky/10 rounded-2xl p-6">
                  <h3 className="font-medium text-navy mb-4 flex items-center gap-2">
                    <Compass className="w-5 h-5 text-sky" />
                    Ansvarsområder per grad
                  </h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <span className="font-medium text-navy">3. Styrmann</span>
                      <p className="text-slate-600">Sikkerhetsutstyr, brannvern, navigasjon under oppsyn</p>
                    </div>
                    <div>
                      <span className="font-medium text-navy">2. Styrmann</span>
                      <p className="text-slate-600">Kart, publikasjoner, selvstendig brovakt</p>
                    </div>
                    <div>
                      <span className="font-medium text-navy">1. Styrmann</span>
                      <p className="text-slate-600">Last, dekk, mannskap, stedfortreder kaptein</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Skills and responsibilities */}
        <Section variant="slate">
          <Container size="lg">
            <h2 className="text-3xl font-medium text-navy mb-8 text-center">
              Ferdigheter og kompetanse
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Compass,
                  title: 'Navigasjon',
                  description: 'Bruk av radar, ECDIS, GPS og tradisjonelle navigasjonsmetoder. Ruteplanlegging og værvurdering.',
                },
                {
                  icon: Ship,
                  title: 'Skipshåndtering',
                  description: 'Manøvrering, fortøyning, ankring. Forståelse for skipets bevegelser og begrensninger.',
                },
                {
                  icon: Shield,
                  title: 'Sikkerhet',
                  description: 'Beredskap, evakuering, brannslokking. Ansvar for sikkerhetsutstyr og øvelser.',
                },
                {
                  icon: BookOpen,
                  title: 'Lastlære',
                  description: 'Stabilitetsberegninger, lastplanlegging, farlig gods-håndtering.',
                },
                {
                  icon: Users,
                  title: 'Kommunikasjon',
                  description: 'VHF-kommunikasjon, GMDSS, samarbeid med havnemyndigheter og loser.',
                },
                {
                  icon: TrendingUp,
                  title: 'Ledelse',
                  description: 'Lede dekksteamet, delegere oppgaver, motivere mannskap.',
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
                    Styrmannsutdanning starter typisk med videregående skole med maritim linje, etterfulgt
                    av nautisk fagskole. Fagskolen tar 2 år og gir grunnlag for å løse ut styrmannssertifikat
                    etter tilstrekkelig fartstid.
                  </p>
                  <p>
                    For å bli vakthavende styrmann (STCW II/1) kreves minimum 12 måneder fartstid som
                    kadett eller matros, pluss godkjent utdanning. Dette gir deg rett til selvstendig
                    brovakt på skip under visse tonnasje-grenser.
                  </p>
                  <p>
                    For ubegrenset styrmannssertifikat (alle størrelser skip) kreves ytterligere fartstid
                    og i noen tilfeller tilleggsutdanning. Kravene varierer basert på hvilken type skip
                    og farvann du ønsker å seile i.
                  </p>
                  <h3>Alternativ vei</h3>
                  <p>
                    Du kan også ta bachelor i nautikk ved en høyskole. Dette gir samme sertifikatgrunnlag
                    som fagskole, men med mer teoretisk dybde. Høyskoleutdanning kan være en fordel for
                    karriereutvikling på land senere.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-navy rounded-2xl p-6 text-cream-100">
                  <h3 className="font-medium text-lg mb-4 text-cream-50">Påkrevde sertifikater</h3>
                  <ul className="space-y-3">
                    {[
                      'STCW II/1 – Vakthavende styrmann',
                      'GOC – General Operator Certificate',
                      'Basic Safety Training (BST)',
                      'Advanced Fire Fighting',
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
                      <h3 className="font-medium text-green-800 mb-2">Anbefalte tilleggssertifikater</h3>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• DP Basic/Advanced (offshore)</li>
                        <li>• ECDIS Type Specific</li>
                        <li>• Bridge Resource Management</li>
                        <li>• Tankskip-sertifikater</li>
                      </ul>
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
              Karriereveien som styrmann
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {[
                  {
                    grade: '3. Styrmann',
                    years: '4-6 år erfaring',
                    salary: '450-550k',
                    tasks: 'Brovakt under oppsyn, sikkerhetsutstyr, brannslukning'
                  },
                  {
                    grade: '2. Styrmann',
                    years: '6-8 år erfaring',
                    salary: '550-700k',
                    tasks: 'Selvstendig brovakt, kart og publikasjoner, navigasjon'
                  },
                  {
                    grade: '1. Styrmann',
                    years: '8-12 år erfaring',
                    salary: '700-850k',
                    tasks: 'Nestkommanderende, last, dekksvedlikehold, personalansvar'
                  },
                ].map((item, index) => (
                  <div key={index} className={`rounded-xl p-6 ${
                    index === 2 ? 'bg-sky text-white' : 'bg-white'
                  }`}>
                    <h3 className={`text-xl font-medium mb-2 ${index === 2 ? 'text-white' : 'text-navy'}`}>
                      {item.grade}
                    </h3>
                    <p className={`text-sm mb-3 ${index === 2 ? 'text-sky-100' : 'text-slate-500'}`}>
                      {item.years}
                    </p>
                    <p className={`font-bold mb-3 ${index === 2 ? 'text-white' : 'text-navy'}`}>
                      {item.salary} kr/år
                    </p>
                    <p className={`text-sm ${index === 2 ? 'text-sky-100' : 'text-slate-600'}`}>
                      {item.tasks}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-medium text-navy mb-4">Videre karrieremuligheter</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-navy mb-2">Til sjøs</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>→ Kaptein (etter overstyrmann)</li>
                      <li>→ Offshore Installation Manager (OIM)</li>
                      <li>→ DP-operatør / Senior DP</li>
                      <li>→ Marine Advisor</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-navy mb-2">På land</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>→ Marine Superintendent</li>
                      <li>→ Vetting / Port Captain</li>
                      <li>→ HSEQ-rådgiver</li>
                      <li>→ Maritim utdanning</li>
                    </ul>
                  </div>
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
                Vil du bli styrmann?
              </h2>
              <p className="text-xl text-cream-100/80 mb-8 max-w-xl mx-auto">
                Registrer deg hos Bluecrew. Vi kobler deg med rederier som søker styrmann på alle nivåer.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/meld-interesse">
                  <Button size="lg" className="bg-sky hover:bg-sky-dark">
                    Registrer deg nå
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/lonn/styrmann">
                  <Button size="lg" variant="outline" className="border-gold-400/30 text-cream-50 hover:bg-gold-400/10">
                    Se styrmannlønn
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

