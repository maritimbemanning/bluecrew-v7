import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SummaryBox from '@/components/ui/SummaryBox';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { AnimatedHero } from '@/components/animated';
import { IMAGE_PATHS } from '@/lib/images';

const breadcrumbs = [
  { name: 'Hjem', url: '/' },
  { name: 'Lønn', url: '/lonn' },
  { name: 'Matros', url: '/lonn/matros' },
];

export const metadata: Metadata = {
  title: 'Matros Lønn 2026 – Hva tjener en matros i Norge?',
  description: 'Gjennomsnittlig matroslønn i Norge er 520 000 kr. Se lønn for lettmatros, matros AB/OS, offshore vs havbruk. Karrierevei fra matros til kaptein.',
  keywords: ['matros lønn', 'lettmatros lønn', 'matros lønn Norge', 'hva tjener en matros', 'offshore matros lønn', 'AB matros', 'OS matros'],
  openGraph: {
    title: 'Matros Lønn i Norge 2026',
    description: 'Gjennomsnittlig lønn 520 000 kr. Se lønnsforskjeller mellom offshore, havbruk og rederi.',
    url: 'https://bluecrew.no/lonn/matros',
    siteName: 'Bluecrew AS',
    locale: 'nb_NO',
    type: 'article',
  },
  alternates: {
    canonical: 'https://bluecrew.no/lonn/matros',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function MatrosLonnPage() {
  const faqs = [
    {
      question: 'Hvor mye tjener en matros i Norge?',
      answer: 'Gjennomsnittlig årslønn for matros i Norge er rundt 520 000 kr. Lettmatros starter på 400-480 000 kr, mens erfarne matroser (AB/OS) med 5+ års erfaring kan tjene 550-700 000 kr årlig. Offshore-matroser ligger høyest med 600-750 000 kr.',
    },
    {
      question: 'Hva er forskjellen på lettmatros og matros?',
      answer: 'Lettmatros er en trainee-stilling der du dokumenterer fartstid og lærer grunnleggende dekksarbeid. Etter 6-12 måneder kan du ta matros-sertifikat (AB – Able Bodied Seaman eller OS – Ordinary Seaman). AB-matros har full kompetanse og høyere lønn enn lettmatros.',
    },
    {
      question: 'Kan man leve av matroslønn?',
      answer: 'Ja, absolutt. Med 520 000 kr i gjennomsnitt ligger matros over norsk gjennomsnittslønn. Offshore-matroser med rotasjonsordning (2-4 uker hjemme) tjener 600-750 000 kr og har alle levekostnader dekket ombord. Mange matroser sparer godt.',
    },
    {
      question: 'Hvor lang tid tar det å bli matros?',
      answer: 'Fra null erfaring til matros tar det 6-18 måneder. Du starter som lettmatros, dokumenterer fartstid, tar STCW-kurs (Basic Safety) og matros-eksamen. Mange blir matros i løpet av første året til sjøs.',
    },
    {
      question: 'Hva er karriereveien fra matros?',
      answer: 'Matros er inngangsporten til maritime offisersyrker. Du kan bli 3. styrmann (4-5 års fartstid + nautisk fagskole), deretter 2. styrmann, 1. styrmann og til slutt kaptein. Mange kapteiner startet som matros.',
    },
  ];

  return (
    <>
      <SchemaMarkup type="article" position="matros" pageType="lonn" />
      <SchemaMarkup type="faq" faqItems={faqs} />
      <SchemaMarkup type="breadcrumb" breadcrumbs={breadcrumbs} />

      {/* Hero */}
      <AnimatedHero
        title={<>Matros <em className="not-italic text-gold-400">Lønn</em> i Norge 2026</>}
        subtitle="Fra lettmatros til AB – lønn, karrierevei og muligheter til sjøs."
        backgroundImage={IMAGE_PATHS.careers.matros}
      />

      {/* Innledning */}
      <Section>
        <Container size="md">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
            <span>Sist oppdatert: Januar 2026</span>
            <span>•</span>
            <span>Kilde: SSB, tariffavtaler</span>
          </div>
          <SummaryBox variant="gold">
            <p>
              <strong>Matros lønn 2026:</strong> Gjennomsnitt 520 000 kr/år.
              Lettmatros: 400–480k kr. Erfaren AB/OS-matros: 550–700k kr.
              Offshore-matros: 600–750k kr. Fra matros til kaptein tar 10–15 år.
              STCW Basic Safety-kurs kreves.
            </p>
          </SummaryBox>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-slate-700 leading-relaxed mb-6">
              Matros er inngangsporten til en maritim karriere. Som matros
              jobber du på dekk, håndterer fortøyning, vedlikehold, lasting og
              lossing, og assisterer styrmenn i skipets daglige drift. Det er
              en fysisk krevende, men givende jobb som gir deg erfaring,
              kompetanse og mulighet til å avansere til offisersrangene.
            </p>

            <p className="text-slate-700 mb-6">
              I 2026 ligger gjennomsnittslønnen for matros i Norge på rundt{' '}
              <strong>520 000 kr årlig</strong>. Men lønnen varierer betydelig
              basert på erfaring, sektor og skiptype.
            </p>

            <p className="text-slate-700 mb-8">
              Denne artikkelen gir deg full oversikt over matroslønn i Norge –
              fra lettmatros til erfaren AB-matros, lønnsforskjeller mellom
              offshore, havbruk og rederi, og hvordan du kan bruke
              matros-stillingen som springbrett til en høyere maritime karriere.
            </p>

            <h2 className="text-3xl font-medium text-navy mb-6 mt-12">
              Gjennomsnittlig matroslønn i Norge
            </h2>

            <p className="text-slate-700 mb-6">
              Matros er en entry-level stilling, men det betyr ikke dårlig
              lønn. Med gjennomsnittlig norsk årslønn på rundt 620 000 kr i
              2026, ligger matros litt under, men med gode muligheter for
              rask lønnsutvikling.
            </p>

            <div className="bg-sky-50 border-l-4 border-sky-600 p-6 my-8">
              <h3 className="text-xl font-medium text-navy mb-3">
                Lønn etter erfaring
              </h3>
              <ul className="space-y-2 text-slate-700">
                <li>
                  <strong>Lettmatros (0-1 år erfaring):</strong> 400 000 - 480 000 kr
                </li>
                <li>
                  <strong>Matros AB/OS (1-3 år erfaring):</strong> 480 000 - 580 000 kr
                </li>
                <li>
                  <strong>Erfaren matros (3-5+ år):</strong> 550 000 - 700 000 kr
                </li>
              </ul>
            </div>

            <p className="text-slate-700 mb-6">
              Det som gjør matros-stillingen spesielt attraktiv er ikke bare
              lønnen, men <strong>total pakke</strong>: kost og losji dekket
              ombord, rotasjonsordning (like mye hjemme som på jobb), og
              mulighet for rask karriereutvikling.
            </p>

            <h2 className="text-3xl font-medium text-navy mb-6 mt-12">
              Lønnsforskjeller etter sektor
            </h2>

            <p className="text-slate-700 mb-6">
              Hvor du jobber som matros påvirker lønnen betydelig. Offshore gir
              høyest lønn, havbruk er familievennlig, og rederi gir
              internasjonale muligheter.
            </p>

            <h3 className="text-2xl font-medium text-navy mb-4 mt-8">
              1. Offshore matros – Høyest lønn
            </h3>

            <p className="text-slate-700 mb-4">
              Offshore-sektoren betaler best for matroser:
            </p>

            <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6 ml-4">
              <li>
                <strong>Lønnsnivå:</strong> 600 000 - 750 000 kr (erfaren matros)
              </li>
              <li>
                <strong>Rotasjon:</strong> 2-4, 4-4 eller 2-3 uker
              </li>
              <li>
                <strong>Arbeidsoppgaver:</strong> Dekksoperasjoner, fortøyning,
                kranarbeid, vedlikehold
              </li>
              <li>
                <strong>Skiptype:</strong> PSV, AHTS, subsea, brønnbåter
              </li>
              <li>
                <strong>Tillegg:</strong> Rotasjonstillegg 20-30%,
                offshore-tillegg, overtidsbetaling
              </li>
            </ul>

            <p className="text-slate-700 mb-6">
              Offshore er fysisk krevende, men gir best lønn og erfaring. Mange
              unge matroser starter offshore for å tjene godt og dokumentere
              fartstid raskt.
            </p>

            <h3 className="text-2xl font-medium text-navy mb-4 mt-8">
              2. Havbruk matros – Familievennlig
            </h3>

            <p className="text-slate-700 mb-4">
              Havbruksnæringen tilbyr god lønn med kortere rotasjon:
            </p>

            <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6 ml-4">
              <li>
                <strong>Lønnsnivå:</strong> 500 000 - 650 000 kr
              </li>
              <li>
                <strong>Rotasjon:</strong> 1-1, 2-2 eller 1 uke på/av
              </li>
              <li>
                <strong>Arbeidsoppgaver:</strong> Nøter, fortøyning, fôring,
                transport, miljøovervåking
              </li>
              <li>
                <strong>Skiptype:</strong> Brønnbåter, fôrbåter, servicefartøy
              </li>
              <li>
                <strong>Fordeler:</strong> Kortere rotasjon, nær hjemmet, norsk
                kyst
              </li>
            </ul>

            <p className="text-slate-700 mb-6">
              Havbruk er perfekt for de som vil jobbe til sjøs men være hjemme
              oftere. Det er også en voksende sektor med gode karrieremuligheter.
            </p>

            <h3 className="text-2xl font-medium text-navy mb-4 mt-8">
              3. Rederi og cruise – Internasjonalt
            </h3>

            <p className="text-slate-700 mb-4">
              Rederi (tankskip, bulkskip, containerskip) og cruise gir
              internasjonal erfaring:
            </p>

            <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6 ml-4">
              <li>
                <strong>Lønnsnivå:</strong> 450 000 - 600 000 kr
              </li>
              <li>
                <strong>Rotasjon:</strong> Ofte 3-6 måneder
              </li>
              <li>
                <strong>Arbeidsoppgaver:</strong> Lasting/lossing,
                vedlikehold, vakt, brovakt-assistanse
              </li>
              <li>
                <strong>Skiptype:</strong> Tankskip, bulkskip, containerskip,
                cruiseskip
              </li>
              <li>
                <strong>Skattefordeler:</strong> DIS-register, skattefritak
                internasjonalt farvann
              </li>
            </ul>

            <p className="text-slate-700 mb-6">
              Rederi gir lavere grunnlønn, men skattefordelene på DIS-skip kan
              gi høyere nettolønn. Cruise tilbyr opplevelser og språktrening.
            </p>

            <h2 className="text-3xl font-medium text-navy mb-6 mt-12">
              Tillegg og bonuser for matroser
            </h2>

            <p className="text-slate-700 mb-6">
              Som matros får du ikke bare grunnlønn – tillegg kan utgjøre
              20-40% av totallønnen:
            </p>

            <div className="bg-slate-50 rounded-lg p-6 my-8">
              <h3 className="text-xl font-medium text-navy mb-4">
                Vanlige tillegg:
              </h3>
              <ul className="space-y-3 text-slate-700">
                <li>
                  <strong>Rotasjonstillegg:</strong> 15-30% av grunnlønn
                </li>
                <li>
                  <strong>Offshore-tillegg:</strong> 15-25% ekstra for offshore
                </li>
                <li>
                  <strong>Overtidsgodtgjørelse:</strong> 50-100% overtidsbetaling
                </li>
                <li>
                  <strong>Ansvarstillegg:</strong> For kran-sertifikat,
                  sikkerhetsansvar
                </li>
                <li>
                  <strong>Kost og losji:</strong> Dekket ombord (ingen utgifter)
                </li>
                <li>
                  <strong>Reisegodtgjørelse:</strong> Til/fra skip
                </li>
                <li>
                  <strong>Feriepenger:</strong> 12% av grunnlønn
                </li>
              </ul>
            </div>

            <p className="text-slate-700 mb-6">
              Med rotasjon 2-4 uker betyr det at du jobber 6 måneder i året,
              men får årslønn. Alle levekostnader (mat, losji, strøm) dekkes
              ombord. Mange matroser sparer 30-50% av lønnen.
            </p>

            <h2 className="text-3xl font-medium text-navy mb-6 mt-12">
              Fra lettmatros til matros AB/OS
            </h2>

            <p className="text-slate-700 mb-6">
              Matros-karrieren starter som <strong>lettmatros</strong> (trainee)
              og utvikler seg til <strong>AB-matros</strong> (Able Bodied
              Seaman) eller <strong>OS-matros</strong> (Ordinary Seaman).
            </p>

            <div className="bg-navy text-cream-100 rounded-lg p-6 my-8">
              <h3 className="text-xl font-medium mb-4 text-cream-50">Karrierevei:</h3>
              <ol className="space-y-2 list-decimal list-inside">
                <li>
                  <strong>Lettmatros:</strong> 0-12 måneder, 400-480 000 kr,
                  dokumentere fartstid
                </li>
                <li>
                  <strong>Matros (OS):</strong> 1-2 år, 480-550 000 kr, basic
                  STCW-sertifikater
                </li>
                <li>
                  <strong>Matros (AB):</strong> 2-5 år, 550-700 000 kr, full
                  kompetanse
                </li>
                <li>
                  <strong>Båtsmann / Bossun:</strong> Lederansvar for
                  dekksmannskap
                </li>
                <li>
                  <strong>3. styrmann:</strong> Nautisk fagskole, 4-5 års
                  fartstid
                </li>
              </ol>
            </div>

            <p className="text-slate-700 mb-6">
              De fleste matroser avanserer raskt. Med 4-5 års erfaring kan du
              søke nautisk fagskole og bli styrmann, og senere kaptein. Mange
              norske kapteiner startet som matros.
            </p>

            <h2 className="text-3xl font-medium text-navy mb-6 mt-12">
              Hva kreves for å bli matros?
            </h2>

            <p className="text-slate-700 mb-6">
              Matros er en relativt lett tilgjengelig karrierevei sammenlignet
              med andre maritime stillinger:
            </p>

            <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6 ml-4">
              <li>
                <strong>Minimum 18 år:</strong> Alderskrav for å jobbe offshore
              </li>
              <li>
                <strong>Godkjent helseattest:</strong> Maritim legeattest
                (syns- og hørselskrav)
              </li>
              <li>
                <strong>STCW Basic Safety:</strong> 1 ukes grunnkurs (ca. 15
                000 kr)
              </li>
              <li>
                <strong>Dokumentert fartstid:</strong> 6-12 måneder som
                lettmatros
              </li>
              <li>
                <strong>Matros-eksamen:</strong> Etter dokumentert fartstid
              </li>
            </ul>

            <p className="text-slate-700 mb-6">
              Mange rederier ansetter lettmatroser uten erfaring og gir
              opplæring om bord. Det er en av få karriereveier hvor du kan
              starte uten høyere utdanning og likevel tjene godt.
            </p>

            <h2 className="text-3xl font-medium text-navy mb-6 mt-12">
              Skatt og nettolønn
            </h2>

            <p className="text-slate-700 mb-6">
              Skatten påvirker hva du får igjen av lønnen:
            </p>

            <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6 ml-4">
              <li>
                <strong>NOR-register:</strong> Normal norsk skatt (ca. 30-35%
                effektiv skattesats)
              </li>
              <li>
                <strong>NIS-register (DIS-skip):</strong> Skattefritak i
                internasjonalt farvann
              </li>
              <li>
                <strong>Sjømannsfradrag:</strong> Inntil 30% av inntekt ved
                minimum 130 dager offshore/utenriks
              </li>
            </ul>

            <p className="text-slate-700 mb-6">
              En offshore-matros med 600 000 kr grunnlønn på NOR-register har
              typisk nettolønn rundt 420-450 000 kr etter skatt. På DIS-skip
              kan netto være betydelig høyere.
            </p>

            <p className="text-slate-700 mb-6">
              Husk: Kost og losji ombord er dekket og skattefritt. Det betyr at
              hele nettolønnen din kan spares eller brukes på fritid hjemme.
            </p>

            <h2 className="text-3xl font-medium text-navy mb-6 mt-12">
              Jobbmarkedet for matroser
            </h2>

            <p className="text-slate-700 mb-6">
              Det er høy etterspørsel etter matroser i Norge, spesielt innen:
            </p>

            <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6 ml-4">
              <li>
                <strong>Offshore:</strong> Stadig behov, nye havvindprosjekter
              </li>
              <li>
                <strong>Havbruk:</strong> Voksende sektor, mange nye skip
              </li>
              <li>
                <strong>Rederi:</strong> Mangel på norske matroser
              </li>
              <li>
                <strong>Cruise:</strong> Gjenoppbygging etter pandemien
              </li>
            </ul>

            <p className="text-slate-700 mb-6">
              Med STCW-sertifikater og litt erfaring er det enkelt å finne
              jobb. Mange rederier rekrutterer aktivt.
            </p>

            <h2 className="text-3xl font-medium text-navy mb-6 mt-12">
              Er matros-lønn verdt det?
            </h2>

            <p className="text-slate-700 mb-6">
              La oss sammenligne matros med andre jobber for unge i Norge:
            </p>

            <div className="bg-sky-50 border-l-4 border-navy p-6 my-8">
              <h3 className="text-xl font-medium text-navy mb-3">
                Sammenligning:
              </h3>
              <ul className="space-y-2 text-slate-700">
                <li>
                  <strong>Matros (offshore):</strong> 600 000 kr, kost/losji
                  dekket, 50% fritid
                </li>
                <li>
                  <strong>Butikkmedarbeider:</strong> 380 000 kr, full arbeidsuke
                </li>
                <li>
                  <strong>Lagermedarbeider:</strong> 420 000 kr, full arbeidsuke
                </li>
                <li>
                  <strong>Bygningsarbeider:</strong> 480 000 kr, 37,5t/uke
                </li>
              </ul>
            </div>

            <p className="text-slate-700 mb-6">
              Som matros tjener du mer, har alle levekostnader dekket om bord,
              og jobber faktisk bare 50% av året (med rotasjon). Det gir rom
              for sparing, reising og fritid.
            </p>

            <h2 className="text-3xl font-medium text-navy mb-6 mt-12">
              Oppsummering – Matros lønn 2026
            </h2>

            <p className="text-slate-700 mb-6">
              Matros er en solid karrierevei for de som vil jobbe til sjøs,
              tjene godt og ha mulighet for rask utvikling. Med
              gjennomsnittlig lønn på 520 000 kr, gode tillegg og dekket kost
              og losji, er det en trygg karriere.
            </p>

            <div className="bg-sky-50 border-l-4 border-navy p-6 my-8">
              <h3 className="text-xl font-medium text-navy mb-3">
                Nøkkelpunkter:
              </h3>
              <ul className="space-y-2 text-slate-700">
                <li>
                  ✓ Gjennomsnitt 520 000 kr, offshore opp til 750 000 kr
                </li>
                <li>
                  ✓ Lettmatros starter 400-480 000 kr – ingen høyere
                  utdanning kreves
                </li>
                <li>
                  ✓ Kost og losji dekket – spar hele lønnen
                </li>
                <li>
                  ✓ Rotasjon 2-4: Jobb 50% av året, få full lønn
                </li>
                <li>
                  ✓ Karrierevei til styrmann og kaptein (4-15 år)
                </li>
                <li>
                  ✓ Høy etterspørsel – enkelt å finne jobb
                </li>
              </ul>
            </div>

            <p className="text-slate-700 mb-8">
              Hvis du vurderer karriere som matros, er 2026 et godt tidspunkt.
              Høy etterspørsel, god lønn og klare karriereveier gjør det til et
              smart valg for unge som vil ut i arbeidslivet raskt.
            </p>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section variant="slate">
        <Container size="md">
          <h2 className="text-3xl font-medium text-navy mb-8 text-center">
            Ofte stilte spørsmål om matroslønn
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-sm border border-slate-200"
              >
                <h3 className="text-lg font-medium text-navy mb-2">
                  {faq.question}
                </h3>
                <p className="text-slate-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section>
        <Container size="md">
          <div className="bg-navy text-cream-100 rounded-lg p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-medium mb-4 text-cream-50">
              Klar for å starte karrieren som matros?
            </h2>
            <p className="text-sky-100 mb-6 max-w-2xl mx-auto">
              Bluecrew formidler matroser og dekksmannskap til offshore,
              havbruk og rederi. Registrer deg og få tilgang til ledige
              stillinger med god lønn og karrieremuligheter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/meld-interesse"
                className="inline-block bg-white text-navy px-8 py-3 rounded-md font-medium hover:bg-sky-50 transition-colors"
              >
                Registrer deg som sjømann
              </Link>
              <Link
                href="/lonn"
                className="inline-block bg-sky-600 text-white px-8 py-3 rounded-md font-medium hover:bg-sky-700 transition-colors"
              >
                Se andre maritime lønninger
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

