import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { IMAGE_PATHS, getImageUrl } from '@/lib/images';
import {
  Wrench,
  ChevronRight,
  Anchor,
  BookOpen,
  Award,
  Clock,
  Gauge,
  Shield,
  Zap,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Settings
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
  { name: 'Maskinist', url: '/karriere/maskinist' },
];

export const metadata: Metadata = {
  title: 'Bli maskinist – Utdanning, sertifikater og karrierevei',
  description: 'Komplett guide til å bli maskinist i Norge. Lær om teknisk maritim utdanning, STCW-sertifikater, fartstid og karrieremuligheter fra motormann til maskinsjef.',
  keywords: [
    'bli maskinist',
    'maskinist utdanning',
    'maskinist sertifikater',
    'skipsmaskinist karriere',
    'maritim teknisk fagskole',
    'STCW maskinist',
  ],
  openGraph: {
    title: 'Bli maskinist – Utdanning, sertifikater og karrierevei',
    description: 'Komplett guide til å bli maskinist i Norge. Utdanning, sertifikater og karrierevei.',
    url: 'https://bluecrew.no/karriere/maskinist',
    siteName: 'Bluecrew AS',
    locale: 'nb_NO',
    type: 'article',
  },
  alternates: {
    canonical: 'https://bluecrew.no/karriere/maskinist',
  },
};

const faqs = [
  {
    id: 'faq-1',
    title: 'Hva er forskjellen på maskinist og ETO?',
    content: 'Maskinist fokuserer på mekaniske systemer: hovedmotor, hjelpemaskiner, hydraulikk og drivstoffsystemer. ETO (Electro-Technical Officer) fokuserer på elektriske systemer: navigasjonsutstyr, automasjon, IT og høyspent. På moderne skip jobber de tett sammen, men har ulike sertifikater og utdanningsbakgrunn. Noen skip har kombinert rolle, men de fleste offshore- og større skip har begge.',
  },
  {
    id: 'faq-2',
    title: 'Hvor lang tid tar det å bli maskinist?',
    content: 'For å bli 3. maskinist trenger du typisk 5-6 år: videregående teknisk/maritim (3 år) + teknisk maritim fagskole (2 år) + fartstid (12-18 måneder). For maskinsjef kreves betydelig mer erfaring, typisk 10-12 år total. Kravene til fartstid er strengere jo høyere sertifikat du sikter mot.',
  },
  {
    id: 'faq-3',
    title: 'Kan jeg bli maskinist med landbasert mekanisk bakgrunn?',
    content: 'Ja, det er mulig. Mekanikere og industrimekanikere kan ta påbygging for å kvalifisere for maritime maskinistsertifikater. Du trenger STCW-sertifikater (Basic Safety Training) og maritime tilleggsmoduler. Fartstidskravet gjelder fortsatt. Mange rederier setter pris på erfaring fra landbasert industri.',
  },
  {
    id: 'faq-4',
    title: 'Trenger maskinist sertifikat for høyspent?',
    content: 'Moderne skip har ofte høyspent-systemer (over 1000V), og mange rederier krever høyspent-sertifikat for maskinister. Dette er teknisk sett ETO-kompetanse, men maskinister bør ha grunnleggende forståelse og ofte sertifisering. Kurset tar typisk 1 uke og er svært nyttig for karrieren.',
  },
  {
    id: 'faq-5',
    title: 'Hva er fordelene med å jobbe som maskinist?',
    content: 'Maskinist er en ettertraktet stilling med god lønn (500k-950k). Du jobber med avansert teknologi og har varierte arbeidsoppgaver. Mangel på kvalifiserte maskinister gir gode jobbmuligheter. Arbeidsmiljøet er ofte mindre hektisk enn på dekk. Karriereveien til maskinsjef er klar og definert.',
  },
];

export default function MaskinistKarrierePage() {
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
              src={getImageUrl(IMAGE_PATHS.careers.maskinist)}
              alt="Maskinist i maskinrom - teknisk maritim karriere"
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
                  <Wrench className="w-8 h-8 text-gold-400" />
                </div>
                <div>
                  <span className="text-gold-400 text-sm font-medium tracking-wider uppercase">Karrierevei</span>
                  <h1 className="text-4xl md:text-6xl font-medium text-cream-50">
                    Bli <em className="not-italic font-medium text-gold-400">Maskinist</em>
                  </h1>
                </div>
              </div>

              <p className="text-xl text-cream-100/90 mb-8 leading-relaxed font-medium">
                Maskinisten er skipets tekniske hjerte. Fra dieselmotorer til hydraulikk – du sørger for
                at alt maskineri fungerer og holder skipet i drift under alle forhold.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="bg-gold-400/10 border border-gold-400/20 rounded-lg px-6 py-3 backdrop-blur-sm">
                  <span className="text-gold-300/70 text-xs uppercase tracking-wider">Lønnsnivå</span>
                  <p className="text-cream-50 font-bold text-lg">500k – 950k kr</p>
                </div>
                <div className="bg-gold-400/10 border border-gold-400/20 rounded-lg px-6 py-3 backdrop-blur-sm">
                  <span className="text-gold-300/70 text-xs uppercase tracking-wider">Tid til stilling</span>
                  <p className="text-cream-50 font-bold text-lg">6-10 år</p>
                </div>
                <div className="bg-gold-400/10 border border-gold-400/20 rounded-lg px-6 py-3 backdrop-blur-sm">
                  <span className="text-gold-300/70 text-xs uppercase tracking-wider">Utdanning</span>
                  <p className="text-cream-50 font-bold text-lg">Teknisk fagskole</p>
                </div>
              </div>
            </div>
          </Container>
        </div>

        <Section>
          <Container size="md">
            <SummaryBox variant="gold">
              <p>
                <strong>Maskinist:</strong> Drifter og vedlikeholder skipets motorer og tekniske systemer.
                Lønn: 500 000 – 950 000 kr. Krever teknisk fagskole og fartstid.
                Høy etterspørsel etter maskinister på alle typer fartøy.
              </p>
            </SummaryBox>
          </Container>
        </Section>

        {/* What does a engineer do */}
        <Section>
          <Container size="lg">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-medium text-navy mb-6">
                  Hva gjør en maskinist?
                </h2>
                <div className="prose prose-lg max-w-none text-slate-600">
                  <p>
                    Maskinisten har ansvar for all mekanisk og teknisk utstyr om bord. Dette inkluderer
                    hovedmotoren som driver skipet fremover, hjelpemotorer som produserer strøm, pumper,
                    ventilasjonsanlegg, hydraulikk-systemer, og mye mer. Uten maskinisten stopper skipet.
                  </p>
                  <p>
                    En typisk dag som maskinist innebærer overvåking av maskineriet fra kontrollrommet,
                    inspeksjonsrunder i maskinrommet, forebyggende vedlikehold, og feilsøking når noe
                    ikke fungerer som det skal. Du må kunne håndtere alt fra små justeringer til
                    omfattende reparasjoner, ofte mens skipet er til sjøs.
                  </p>
                  <p>
                    Moderne skip har avanserte kontrollsystemer som overvåker maskineriet automatisk,
                    men maskinisten må fortsatt forstå systemene i dybden. Når alarmer går, må du raskt
                    kunne identifisere problemet og løse det. Feil på hovedmotoren midt i Nordsjøen
                    er ingen triviell sak.
                  </p>
                  <p>
                    Miljøaspektet er stadig viktigere. Maskinister må forstå utslippskrav, ballastvann-
                    behandling, og hvordan optimalisere drivstofforbruket. Mange skip går over til
                    hybride løsninger eller alternative drivstoff, noe som krever ny kompetanse.
                  </p>
                  <p>
                    Maskinistavdelingen har sin egen hierarki med motormann, 3., 2. og 1. maskinist,
                    og maskinsjef på toppen. Som maskinsjef har du ansvaret for hele den tekniske
                    driften og rapporterer direkte til kapteinen.
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
                      Maskinromsinspeksjon morgen og kveld
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky shrink-0 mt-0.5" />
                      Overvåking fra kontrollrom
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky shrink-0 mt-0.5" />
                      Planlagt vedlikehold
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky shrink-0 mt-0.5" />
                      Feilsøking og reparasjoner
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky shrink-0 mt-0.5" />
                      Dokumentasjon og loggføring
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky shrink-0 mt-0.5" />
                      Bestilling av reservedeler
                    </li>
                  </ul>
                </div>

                <div className="bg-sky/10 rounded-2xl p-6">
                  <h3 className="font-medium text-navy mb-4 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-sky" />
                    Systemer du jobber med
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• Hovedmotor og girkasse</li>
                    <li>• Hjelpemotorer og generatorer</li>
                    <li>• Drivstoffsystemer</li>
                    <li>• Hydraulikk og pneumatikk</li>
                    <li>• Kjøle- og varmesystemer</li>
                    <li>• Ballast- og lensepumper</li>
                    <li>• Propeller og manøversystemer</li>
                    <li>• Kran og dekksutstyr</li>
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Skills and responsibilities */}
        <Section variant="slate">
          <Container size="lg">
            <h2 className="text-3xl font-medium text-navy mb-8 text-center">
              Teknisk kompetanse
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Gauge,
                  title: 'Dieselmotorer',
                  description: 'Forståelse av store skipsdiesler, vedlikehold, tuning og feilsøking.',
                },
                {
                  icon: Zap,
                  title: 'Elektriske systemer',
                  description: 'Grunnleggende elektro, generatorer, distribusjon og backup-systemer.',
                },
                {
                  icon: Settings,
                  title: 'Hydraulikk',
                  description: 'Hydrauliske systemer for kraner, dører, ror og andre funksjoner.',
                },
                {
                  icon: Shield,
                  title: 'Sikkerhet',
                  description: 'HMS i maskinrom, brannslokking, kjemikaliehåndtering.',
                },
                {
                  icon: TrendingUp,
                  title: 'Effektivisering',
                  description: 'Optimalisering av drivstofforbruk og utslippsreduksjon.',
                },
                {
                  icon: BookOpen,
                  title: 'Dokumentasjon',
                  description: 'Vedlikeholdsplanlegging, loggføring og rapportering.',
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
                    Maskinistutdanning starter typisk med videregående skole med tekniske fag eller
                    maritim linje, etterfulgt av teknisk maritim fagskole. Fagskolen tar 2 år og gir
                    grunnlag for å løse ut maskinistsertifikat etter tilstrekkelig fartstid.
                  </p>
                  <p>
                    For å bli vakthavende maskinist (STCW III/1) kreves minimum 6 måneder fartstid
                    i maskinrom, pluss godkjent utdanning. Dette gir deg rett til selvstendig
                    maskinvakt på skip under visse effektgrenser.
                  </p>
                  <p>
                    For ubegrenset maskinistsertifikat kreves mer fartstid og ofte tilleggsutdanning.
                    Maskinsjef-sertifikat (Chief Engineer) krever typisk 36 måneder som ansvarlig
                    offiser i maskinrom.
                  </p>
                  <h3>Praktisk erfaring viktig</h3>
                  <p>
                    I motsetning til mange yrker er praktisk erfaring like viktig som teori for
                    maskinister. Du lærer mye av å jobbe sammen med erfarne kolleger og få hendene
                    skitne. Mange rederier verdsetter bred erfaring fra ulike fartøytyper.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-navy rounded-2xl p-6 text-cream-100">
                  <h3 className="font-medium text-lg mb-4 text-cream-50">Påkrevde sertifikater</h3>
                  <ul className="space-y-3">
                    {[
                      'STCW III/1 – Vakthavende maskinist',
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
                        <li>• High Voltage Operations</li>
                        <li>• Engine Room Resource Management</li>
                        <li>• Refrigeration systems</li>
                        <li>• LNG/Dual fuel systems</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
                    <div>
                      <h3 className="font-medium text-amber-800 mb-2">Effektgrenser</h3>
                      <p className="text-sm text-amber-700">
                        Maskinistsertifikater har effektgrenser (kW). Lavere sertifikater gjelder
                        for skip med mindre maskineri. For store offshore-skip eller tankere
                        kreves ubegrenset sertifikat.
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
              Karriereveien som maskinist
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {[
                  {
                    title: 'Motormann / Lærling',
                    years: '0-3 år',
                    salary: '400-500k',
                    desc: 'Praktisk arbeid i maskinrom, læretid under veiledning'
                  },
                  {
                    title: '3. Maskinist',
                    years: '3-6 år',
                    salary: '500-600k',
                    desc: 'Maskinvakt under oppsyn, ansvar for hjelpesystemer'
                  },
                  {
                    title: '2. Maskinist',
                    years: '6-9 år',
                    salary: '600-750k',
                    desc: 'Selvstendig maskinvakt, vedlikeholdsansvar'
                  },
                  {
                    title: '1. Maskinist',
                    years: '9-12 år',
                    salary: '750-850k',
                    desc: 'Hovedansvar for maskineri, planlegging og ledelse'
                  },
                ].map((item, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-navy">{item.title}</h3>
                      <span className="text-sm text-slate-500">{item.years}</span>
                    </div>
                    <p className="font-bold text-sky mb-2">{item.salary} kr/år</p>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="bg-sky rounded-2xl p-6 text-cream-100 text-center mb-8">
                <h3 className="text-xl font-medium mb-2 text-cream-50">Maskinsjef (Chief Engineer)</h3>
                <p className="text-sky-100 mb-2">12+ års erfaring</p>
                <p className="text-2xl font-bold mb-2">850k – 950k kr/år</p>
                <p className="text-sky-100">Øverste tekniske ansvar, rapporterer til kaptein</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-medium text-navy mb-4">Spesialiseringsmuligheter</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-navy mb-2">Fartøytyper</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• Offshore/konstruksjon (høyest lønn)</li>
                      <li>• Tankskip (spesialkompetanse)</li>
                      <li>• LNG-skip (fremtidsrettet)</li>
                      <li>• Cruise (store systemer)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-navy mb-2">Landbasert karriere</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• Technical Superintendent</li>
                      <li>• Fleet Manager</li>
                      <li>• Klasseinspektør</li>
                      <li>• Utstyrsleverandør</li>
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
                Vil du bli maskinist?
              </h2>
              <p className="text-xl text-cream-100/80 mb-8 max-w-xl mx-auto">
                Registrer deg hos Bluecrew. Vi kobler deg med rederier som søker maskinister på alle nivåer.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/meld-interesse">
                  <Button size="lg" className="bg-sky hover:bg-sky-dark">
                    Registrer deg nå
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/lonn/maskinist">
                  <Button size="lg" variant="outline" className="border-cream-100/20 text-cream-50 hover:bg-cream-100/10">
                    Se maskinistlønn
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

