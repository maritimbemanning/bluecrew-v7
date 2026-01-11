import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { IMAGE_PATHS, getImageUrl } from '@/lib/images';
import {
  Users,
  ChevronRight,
  Anchor,
  BookOpen,
  Clock,
  Ship,
  Shield,
  Wrench,
  TrendingUp,
  CheckCircle2,
  GraduationCap
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
  { name: 'Matros', url: '/karriere/matros' },
];

export const metadata: Metadata = {
  title: 'Bli matros – Utdanning, krav og karrierevei',
  description: 'Komplett guide til å bli matros i Norge. Lær om maritim videregående, STCW-sertifikater, jobbmuligheter og karrierevei fra matros til kaptein.',
  keywords: [
    'bli matros',
    'matros utdanning',
    'matros sertifikater',
    'sjømann karriere',
    'maritim videregående',
    'jobb til sjøs',
  ],
  openGraph: {
    title: 'Bli matros – Utdanning, krav og karrierevei',
    description: 'Komplett guide til å bli matros i Norge. Start din maritime karriere.',
    url: 'https://bluecrew.no/karriere/matros',
    siteName: 'Bluecrew AS',
    locale: 'nb_NO',
    type: 'article',
  },
  alternates: {
    canonical: 'https://bluecrew.no/karriere/matros',
  },
};

const faqs = [
  {
    id: 'faq-1',
    title: 'Hva er forskjellen på matros AB og OS?',
    content: 'AB (Able Bodied Seaman) og OS (Ordinary Seaman) er engelske betegnelser brukt internasjonalt. OS er matros uten full erfaring/sertifisering, mens AB er fullverdig matros med tilstrekkelig fartstid og kompetanse. I Norge tilsvarer dette omtrent lettmatros (OS) og matros (AB). Lønnsforskjellen kan være 50-100k per år.',
  },
  {
    id: 'faq-2',
    title: 'Kan man bli matros uten maritim utdanning?',
    content: 'Ja, det er mulig å komme inn i maritime yrker uten formell utdanning, men du trenger grunnleggende STCW-sertifikater (Basic Safety Training). Noen rederier, spesielt i havbruk, tar inn ufaglærte og gir opplæring. Med formell utdanning får du bedre startposisjon, høyere lønn og raskere karriereutvikling.',
  },
  {
    id: 'faq-3',
    title: 'Hvor lang tid tar det å bli matros?',
    content: 'Med maritim videregående (3 år) + læretid om bord (ca. 1 år) får du fagbrev etter 4 år. Uten formell utdanning kan du starte som lettmatros og jobbe deg opp, noe som tar ca. 2-3 år til full matros-status. STCW-kurs tar noen uker.',
  },
  {
    id: 'faq-4',
    title: 'Kan matros bli kaptein?',
    content: 'Ja, absolutt! De fleste kapteiner startet som matros. Karriereveien går fra matros → styrmann (3., 2., 1.) → kaptein. Du trenger videreutdanning (nautisk fagskole) for å bli styrmann. Hele reisen fra matros til kaptein tar typisk 10-15 år med riktig utdanning og erfaring.',
  },
  {
    id: 'faq-5',
    title: 'Hva tjener en matros?',
    content: 'Matroslønn varierer fra 420 000 til 650 000 kr årlig. Offshore betaler best (550-650k), havbruk ligger midt på treet (480-550k), og kystfart/ferge noe lavere (420-500k). Erfaring, sertifikater og spesialkompetanse som kran eller ROV kan gi høyere lønn.',
  },
];

export default function MatrosKarrierePage() {
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
              src={getImageUrl(IMAGE_PATHS.careers.matros)}
              alt="Matros på dekk - maritim dekksarbeid"
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
                  <Users className="w-8 h-8 text-gold-400" />
                </div>
                <div>
                  <span className="text-gold-400 text-sm font-medium tracking-wider uppercase">Karrierevei</span>
                  <h1 className="text-4xl md:text-6xl font-medium text-cream-50">
                    Bli <em className="not-italic font-medium text-gold-400">Matros</em>
                  </h1>
                </div>
              </div>

              <p className="text-xl text-cream-100/90 mb-8 leading-relaxed font-medium">
                Matros er inngangsporten til en maritim karriere. Fra dekksarbeid til vakthold – dette er
                der de fleste sjøfolk starter sin reise mot styrmann og kaptein.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="bg-gold-400/10 border border-gold-400/20 rounded-lg px-6 py-3 backdrop-blur-sm">
                  <span className="text-gold-300/70 text-xs uppercase tracking-wider">Lønnsnivå</span>
                  <p className="text-cream-50 font-bold text-lg">420k – 650k kr</p>
                </div>
                <div className="bg-gold-400/10 border border-gold-400/20 rounded-lg px-6 py-3 backdrop-blur-sm">
                  <span className="text-gold-300/70 text-xs uppercase tracking-wider">Utdanning</span>
                  <p className="text-cream-50 font-bold text-lg">VGS maritim + læretid</p>
                </div>
                <div className="bg-gold-400/10 border border-gold-400/20 rounded-lg px-6 py-3 backdrop-blur-sm">
                  <span className="text-gold-300/70 text-xs uppercase tracking-wider">Karrierepotensial</span>
                  <p className="text-cream-50 font-bold text-lg">Høyt (Kaptein)</p>
                </div>
              </div>
            </div>
          </Container>
        </div>

        <Section>
          <Container size="md">
            <SummaryBox variant="gold">
              <p>
                <strong>Matros:</strong> Utfører praktisk dekksarbeid, vakthold og vedlikehold.
                Lønn: 420 000 – 650 000 kr. Krever maritim VGS + læretid (fagbrev) eller fartstid som lettmatros.
                Viktig rolle for drift og sikkerhet på dekk.
              </p>
            </SummaryBox>
          </Container>
        </Section>

        {/* What does a deckhand do */}
        <Section>
          <Container size="lg">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-medium text-navy mb-6">
                  Hva gjør en matros?
                </h2>
                <div className="prose prose-lg max-w-none text-slate-600">
                  <p>
                    Matrosen er ryggraden i dekksbesetningen. Som matros utfører du praktisk arbeid
                    på dekk som er essensielt for skipets daglige drift og sikkerhet. Det er en
                    fysisk aktiv jobb med varierte oppgaver og mye tid utendørs.
                  </p>
                  <p>
                    En typisk dag som matros kan innebære vakthold på broen som utkikk, fortøyning
                    ved ankomst og avgang fra havn, vedlikehold av dekk og utstyr som maling og
                    rengjøring, og assistanse ved lasting og lossing.
                  </p>
                  <p>
                    Brovakt er en viktig del av jobben. Som utkikk på broen holder du øye med
                    sjøtrafikk, værforhold og andre potensielle farer. Du rapporterer observasjoner
                    til vakthavende styrmann og lærer samtidig mye om navigasjon.
                  </p>
                  <p>
                    Fortøyning er kanskje det mest klassiske matrosarbeidet. Du håndterer trosser,
                    samarbeider med mannskap på land, og sørger for at skipet ligger trygt ved kai.
                    Dette krever god teknikk, fysisk styrke og årvåkenhet – trosser under spenning
                    kan være farlige.
                  </p>
                  <p>
                    Matrosjobben er perfekt for deg som vil lære skipsdrift fra bunnen av. Du får
                    bred erfaring med alle aspekter av dekksarbeid, noe som er uvurderlig om du
                    ønsker å ta styrmannsutdanning senere. Mange kapteiner sier at tiden som
                    matros ga dem den praktiske forståelsen de trenger i dag.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-50 rounded-2xl p-6">
                  <h3 className="font-medium text-navy mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-sky" />
                    Typiske arbeidsoppgaver
                  </h3>
                  <ul className="space-y-3 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky shrink-0 mt-0.5" />
                      Brovakt som utkikk
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky shrink-0 mt-0.5" />
                      Fortøyning og ankring
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky shrink-0 mt-0.5" />
                      Dekksvedlikehold (maling, vask)
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky shrink-0 mt-0.5" />
                      Last- og losseoperasjoner
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky shrink-0 mt-0.5" />
                      Sikkerhetsutstyr-kontroll
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky shrink-0 mt-0.5" />
                      Brann- og evakueringsøvelser
                    </li>
                  </ul>
                </div>

                <div className="bg-sky/10 rounded-2xl p-6">
                  <h3 className="font-medium text-navy mb-4 flex items-center gap-2">
                    <Ship className="w-5 h-5 text-sky" />
                    Hvor jobber matrosen?
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• Offshore supply-skip (PSV, AHTS)</li>
                    <li>• Brønnbåter (havbruk)</li>
                    <li>• Ferger og hurtigbåter</li>
                    <li>• Lasteskip og tankere</li>
                    <li>• Cruise-skip</li>
                    <li>• Fiskefartøy</li>
                    <li>• Kystvakt og redningsskøyter</li>
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Skills */}
        <Section variant="slate">
          <Container size="lg">
            <h2 className="text-3xl font-medium text-navy mb-8 text-center">
              Ferdigheter du lærer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Anchor,
                  title: 'Sjømannskap',
                  description: 'Fortøyning, knoper, ankring, trossearbeid og spleising.',
                },
                {
                  icon: Shield,
                  title: 'Sikkerhet',
                  description: 'Brannslokking, livredningstjeneste, førstehjelp.',
                },
                {
                  icon: Wrench,
                  title: 'Vedlikehold',
                  description: 'Maling, rengjøring, smøring og enkel reparasjon.',
                },
                {
                  icon: Ship,
                  title: 'Navigasjon',
                  description: 'Grunnleggende brovakt, utkikk og rapportering.',
                },
                {
                  icon: Users,
                  title: 'Teamarbeid',
                  description: 'Samarbeid med mannskap i alle situasjoner.',
                },
                {
                  icon: TrendingUp,
                  title: 'Karrieregrunnlag',
                  description: 'Praktisk erfaring for styrmannsutdanning.',
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

        {/* Education */}
        <Section>
          <Container size="lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-medium text-navy mb-6">
                  Utdanning og krav
                </h2>
                <div className="prose prose-lg max-w-none text-slate-600">
                  <p>
                    Den vanligste veien til matros er gjennom videregående skole med maritim linje
                    (VG1 Naturbruk → VG2 Fiske og fangst eller VG2 Matrosfag). Etter VG2 følger
                    læretid om bord, typisk 1-2 år, før fagprøve.
                  </p>
                  <p>
                    Du kan også komme inn uten formell utdanning ved å ta STCW Basic Safety
                    Training og starte som lettmatros. Mange rederier, spesielt i havbruk,
                    rekrutterer ufaglærte og gir opplæring. Med erfaring og STCW-kurs kan du
                    bli fullverdig matros.
                  </p>
                  <h3>STCW-sertifikater</h3>
                  <p>
                    Alle som jobber til sjøs må ha grunnleggende STCW-sertifikater. Basic Safety
                    Training (BST) inkluderer kurs i sjøsikkerhet, brannvern, førstehjelp og
                    personlig overlevelse. Kursene tar tilsammen ca. 1-2 uker.
                  </p>
                  <h3>Helsekrav</h3>
                  <p>
                    Du må ha gyldig helseerklæring for sjøfolk. Kravene inkluderer normalt syn
                    (kan korrigeres), god hørsel og generelt god helse. Fargeblindhet kan være
                    begrensende for noen stillinger.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-navy rounded-2xl p-6 text-cream-100">
                  <h3 className="font-medium text-lg mb-4 text-cream-50">Påkrevde sertifikater</h3>
                  <ul className="space-y-3">
                    {[
                      'Basic Safety Training (BST)',
                      'Gyldig helseerklæring for sjøfolk',
                      'ROC (radio) – ofte krevd',
                      'Sjømannsboka',
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
                    <GraduationCap className="w-6 h-6 text-green-600 shrink-0" />
                    <div>
                      <h3 className="font-medium text-green-800 mb-2">Sertifikater som øker verdien</h3>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Truck-/kranlappen (G11, G20)</li>
                        <li>• ROV-kurs</li>
                        <li>• Ankerhåndtering</li>
                        <li>• Fallsikring og høydearbeid</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-6">
                  <h3 className="font-medium text-navy mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-sky" />
                    Utdanningsløp
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">VGS Maritim</span>
                      <span className="font-medium text-navy">3 år</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Læretid om bord</span>
                      <span className="font-medium text-navy">1-2 år</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Fagprøve</span>
                      <span className="font-medium text-navy">→ Fagbrev</span>
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
              Fra matros til kaptein
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none text-slate-600 mb-8 text-center">
                <p>
                  Matros er det første steget på en lang og givende karrierevei til sjøs.
                  Med videreutdanning kan du avansere til styrmann og til slutt kaptein.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-6 gap-2 mb-8">
                {[
                  { title: 'Lettmatros', years: '0-1 år', color: 'bg-slate-200' },
                  { title: 'Matros', years: '1-4 år', color: 'bg-slate-300' },
                  { title: 'Båtsmann', years: '4-6 år', color: 'bg-sky/30' },
                  { title: '3. Styrmann', years: '6-8 år', color: 'bg-sky/50' },
                  { title: '1. Styrmann', years: '8-12 år', color: 'bg-sky/70' },
                  { title: 'Kaptein', years: '12+ år', color: 'bg-sky' },
                ].map((step, index) => (
                  <div key={index} className={`${step.color} rounded-lg p-3 text-center`}>
                    <p className={`font-bold text-sm ${index >= 4 ? 'text-white' : 'text-navy'}`}>
                      {step.title}
                    </p>
                    <p className={`text-xs ${index >= 4 ? 'text-sky-100' : 'text-slate-600'}`}>
                      {step.years}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-medium text-navy mb-4">Spesialiseringer fra matros</h3>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-sky rounded-full mt-1.5" />
                      <span><strong>Kranoperatør</strong> – Løft og lastehåndtering</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-sky rounded-full mt-1.5" />
                      <span><strong>Ankerhåndtering</strong> – AHTS-operasjoner</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-sky rounded-full mt-1.5" />
                      <span><strong>ROV-støtte</strong> – Subsea-operasjoner</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-sky rounded-full mt-1.5" />
                      <span><strong>Båtsmann</strong> – Leder av dekksteamet</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-medium text-navy mb-4">Videreutdanning</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="font-medium text-navy">Nautisk fagskole (2 år)</p>
                      <p className="text-slate-600">Gir grunnlag for styrmannssertifikat</p>
                    </div>
                    <div>
                      <p className="font-medium text-navy">Bachelor nautikk (3 år)</p>
                      <p className="text-slate-600">Høyere teoretisk nivå, samme sertifikat</p>
                    </div>
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
                Klar for å starte til sjøs?
              </h2>
              <p className="text-xl text-cream-100/80 mb-8 max-w-xl mx-auto">
                Registrer deg hos Bluecrew. Vi har stillinger for både erfarne matrosen og de som er nye i bransjen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/meld-interesse">
                  <Button size="lg" className="bg-sky hover:bg-sky-dark">
                    Registrer deg nå
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/lonn/matros">
                  <Button size="lg" variant="outline" className="border-gold-400/30 text-cream-50 hover:bg-gold-400/10">
                    Se matroslønn
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

