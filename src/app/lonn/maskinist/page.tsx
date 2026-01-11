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
  { name: 'Maskinist', url: '/lonn/maskinist' },
];

export const metadata: Metadata = {
  title: 'Maskinist Lønn 2026 – Hva tjener en skipsmaskinist?',
  description: 'Gjennomsnittlig maskinistlønn i Norge er 670 000 kr. Se lønn for 1. og 2. maskinist, offshore vs havbruk. Diesel, elektrisk og miljøkompetanse.',
  keywords: ['maskinist lønn', 'skipsmaskinist lønn', '1. maskinist lønn', 'offshore maskinist lønn', 'havbruk maskinist'],
  openGraph: {
    title: 'Maskinist Lønn i Norge 2026',
    description: 'Gjennomsnittlig lønn 670 000 kr. Se lønnsforskjeller mellom 1. og 2. maskinist.',
    url: 'https://bluecrew.no/lonn/maskinist',
    siteName: 'Bluecrew AS',
    locale: 'nb_NO',
    type: 'article',
  },
  alternates: {
    canonical: 'https://bluecrew.no/lonn/maskinist',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function MaskinistLonnPage() {
  const faqs = [
    {
      question: 'Hvor mye tjener en maskinist i Norge?',
      answer: 'Gjennomsnittlig årslønn for maskinist i Norge er rundt 670 000 kr. 2. maskinist starter på 550-650 000 kr, mens 1. maskinist (overmaskinist) tjener 700-900 000 kr årlig. Offshore-maskinister og de med spesialkompetanse ligger høyest.',
    },
    {
      question: 'Hva er forskjellen på 1. og 2. maskinist?',
      answer: '2. maskinist assisterer i maskinrommet og har vaktansvar for drift og vedlikehold. 1. maskinist er kapteinens stedfortreder for maskin og har overordnet ansvar for hele maskinanlegget, vedlikehold, reparasjoner og miljøkrav. Lønn og ansvar øker betydelig.',
    },
    {
      question: 'Tjener offshore-maskinist mer enn andre?',
      answer: 'Ja, betydelig mer. Offshore-maskinister tjener typisk 750-900 000 kr på grunn av rotasjonsordning, komplekse systemer (DP, dynamisk posisjonering) og offshore-tillegg. Havbruk ligger på 650-800 000 kr, mens rederi/cruise er 600-750 000 kr.',
    },
    {
      question: 'Hvilke sertifikater må en maskinist ha?',
      answer: 'Maskinist må ha STCW III/1 (1. maskinist) eller III/2 (2. maskinist), Basic Safety Training, Advanced Fire Fighting, og ofte DP-sertifikater. Elektrisk kompetanse (ETO-kurs) er økende etterspurt. Alle sertifikater må fornyes regelmessig.',
    },
    {
      question: 'Hvor lang tid tar det å bli 1. maskinist?',
      answer: 'Fra grunnleggende maskinutdanning til 1. maskinist tar det typisk 8-12 år. Du må gå gjennom 3. maskinist, 2. maskinist med dokumentert fartstid og sertifiseringer. De fleste er 30-35 år når de blir 1. maskinist.',
    },
  ];

  return (
    <>
      <SchemaMarkup type="article" position="maskinist" pageType="lonn" />
      <SchemaMarkup type="faq" faqItems={faqs} />
      <SchemaMarkup type="breadcrumb" breadcrumbs={breadcrumbs} />

      {/* Hero */}
      <AnimatedHero
        title={<>Maskinist <em className="not-italic text-gold-400">Lønn</em> i Norge 2026</>}
        subtitle="Maskinrom, kompetanse og lønn – fra 2. maskinist til overmaskinist."
        backgroundImage={IMAGE_PATHS.careers.maskinist}
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
              <strong>Maskinistlønn i Norge:</strong> Gjennomsnitt 670 000 kr/år.
              1. maskinist (overmaskinist) tjener 700 000–900 000+ kr,
              2. maskinist 550 000–700 000 kr.
              Offshore gir høyest lønn. Krever teknisk fagskole og fartstid.
            </p>
          </SummaryBox>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-slate-700 leading-relaxed mb-6">
              Mens dekksoffiserene navigerer skipet og styrmennene håndterer
              last, er det maskinist som holder skipets hjerte i gang. Dypt
              nede i maskinrommet – ofte varmt, støyende og fullt av
              avanserte systemer – sørger maskinisten for at motorer, pumper,
              generatorer og miljøsystemer fungerer 24/7.
            </p>

            <p className="text-slate-700 mb-6">
              I 2026 ligger gjennomsnittslønnen for maskinist i Norge på rundt{' '}
              <strong>670 000 kr årlig</strong>. Men som med andre maritime
              stillinger varierer lønnen betydelig basert på erfaring, sektor,
              skiptype og spesialkompetanse.
            </p>

            <p className="text-slate-700 mb-8">
              Denne artikkelen gir deg full oversikt over maskinistlønn i Norge
              – fra 2. maskinist til 1. maskinist, lønnsforskjeller mellom
              offshore, havbruk og rederi, og hvordan tilleggskompetanse som
              elektrisk drift og miljøsystemer påvirker lønnen din.
            </p>

            <h2 className="text-3xl font-medium text-navy mb-6 mt-12">
              Gjennomsnittlig maskinistlønn i Norge
            </h2>

            <p className="text-slate-700 mb-6">
              Maskinister tilhører den høyt betalte delen av den maritime
              arbeidsstyrken. Med ansvar for kostbart og komplekst utstyr,
              miljøkrav og skipets driftssikkerhet, reflekterer lønnen både
              teknisk kompetanse og operasjonelt ansvar.
            </p>

            <div className="bg-sky-50 border-l-4 border-sky-600 p-6 my-8">
              <h3 className="text-xl font-medium text-navy mb-3">
                Lønn etter erfaring og rang
              </h3>
              <ul className="space-y-2 text-slate-700">
                <li>
                  <strong>3. maskinist (trainee):</strong> 450 000 - 550 000 kr
                </li>
                <li>
                  <strong>2. maskinist (2-5 års erfaring):</strong> 550 000 -
                  700 000 kr
                </li>
                <li>
                  <strong>1. maskinist (5-10+ års erfaring):</strong> 700 000 -
                  900 000 kr+
                </li>
              </ul>
            </div>

            <p className="text-slate-700 mb-6">
              Sammenlignet med gjennomsnittlig norsk årslønn (rundt 620 000 kr
              i 2026) tjener maskinister godt over snittet – spesielt offshore
              og på spesialiserte skip med DP-systemer (dynamisk
              posisjonering), LNG-drift eller avanserte miljøløsninger.
            </p>

            <h2 className="text-3xl font-medium text-navy mb-6 mt-12">
              Lønnsforskjeller etter sektor og skiptype
            </h2>

            <p className="text-slate-700 mb-6">
              Ikke alle maskinister tjener likt. Valg av sektor – offshore,
              havbruk, cruise eller rederi – har enorm innvirkning på både
              grunnlønn, rotasjonstillegg og karrieremuligheter.
            </p>

            <h3 className="text-2xl font-medium text-navy mb-4 mt-8">
              1. Offshore maskinist – Høyest lønn
            </h3>

            <p className="text-slate-700 mb-4">
              Offshore-sektoren gir konsekvent de høyeste lønningene for
              maskinister i Norge:
            </p>

            <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6 ml-4">
              <li>
                <strong>Lønnsnivå:</strong> 750 000 - 900 000 kr+ (1.
                maskinist)
              </li>
              <li>
                <strong>Rotasjon:</strong> 2-4, 4-4 eller 2-3 uker
              </li>
              <li>
                <strong>Ansvar:</strong> DP-systemer, komplekse kraftverk,
                miljøkrav (NOx, SOx)
              </li>
              <li>
                <strong>Skiptype:</strong> PSV, AHTS, subsea, brønnbåter
              </li>
              <li>
                <strong>Tillegg:</strong> Rotasjonstillegg 20-35%,
                offshore-tillegg, DP-bonus
              </li>
            </ul>

            <p className="text-slate-700 mb-6">
              Offshore krever teknisk toppkompetanse – du jobber ofte med nytt
              utstyr, høye miljøkrav, og systemer hvor nedetid koster millioner
              per dag. Til gjengjeld gir det best betalt i den maritime
              sektoren.
            </p>

            <h3 className="text-2xl font-medium text-navy mb-4 mt-8">
              2. Havbruk maskinist – Voksende sektor
            </h3>

            <p className="text-slate-700 mb-4">
              Havbruksnæringen er Norges nest største eksportnæring og trenger
              maskinister til brønnbåter, fôrbåter og servicefartøy:
            </p>

            <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6 ml-4">
              <li>
                <strong>Lønnsnivå:</strong> 650 000 - 800 000 kr (1. maskinist)
              </li>
              <li>
                <strong>Rotasjon:</strong> Ofte 1-1, 2-2 eller 1 uke på/av
              </li>
              <li>
                <strong>Ansvar:</strong> Kjøle-, pumpe- og
                oksygeneringssystemer, miljø, velferd for fisken
              </li>
              <li>
                <strong>Skiptype:</strong> Brønnbåter, fôrbåter,
                servicefartøy, slaktebåter
              </li>
              <li>
                <strong>Fordeler:</strong> Kortere rotasjon, Norges kyster,
                familievennlig
              </li>
            </ul>

            <p className="text-slate-700 mb-6">
              Havbruk gir god lønn kombinert med hyppigere hjemmetid. Det er en
              voksende sektor med økende krav til miljø, dyrevelferd og
              automatisering – noe som øker verdien av kompetente maskinister.
            </p>

            <h3 className="text-2xl font-medium text-navy mb-4 mt-8">
              3. Rederi og cruise – Internasjonal fart
            </h3>

            <p className="text-slate-700 mb-4">
              Tradisjonell skipsfart (tankskip, bulkskip, containerskip) og
              cruise gir varierende lønninger:
            </p>

            <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6 ml-4">
              <li>
                <strong>Lønnsnivå:</strong> 600 000 - 750 000 kr (1. maskinist)
              </li>
              <li>
                <strong>Rotasjon:</strong> Ofte lengre perioder (3-6 måneder)
              </li>
              <li>
                <strong>Ansvar:</strong> Hovedmotorer, hjelpesystemer,
                bunkring, miljøregler (IMO 2020)
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
              Rederi gir ofte lavere grunnlønn enn offshore, men
              skattefordelene på DIS-skip kan gi høyere nettolønn. Cruise
              tilbyr stabilitet og internasjonal erfaring, men krever lenger
              borte fra familie.
            </p>

            <h2 className="text-3xl font-medium text-navy mb-6 mt-12">
              Tillegg, bonuser og goder
            </h2>

            <p className="text-slate-700 mb-6">
              Maskinistlønn består ikke bare av grunnlønn. Tillegg utgjør ofte
              20-40% av totallønnen.
            </p>

            <div className="bg-slate-50 rounded-lg p-6 my-8">
              <h3 className="text-xl font-medium text-navy mb-4">
                Vanlige tillegg for maskinister:
              </h3>
              <ul className="space-y-3 text-slate-700">
                <li>
                  <strong>Rotasjonstillegg:</strong> 15-35% av grunnlønn
                  (avhenger av rotasjon)
                </li>
                <li>
                  <strong>Offshore-tillegg:</strong> 20-30% ekstra for
                  offshore-operasjoner
                </li>
                <li>
                  <strong>DP-tillegg:</strong> Ekstra for DP-sertifikater og
                  ansvar
                </li>
                <li>
                  <strong>Ansvarstillegg:</strong> For 1. maskinist
                  (overmaskinist)
                </li>
                <li>
                  <strong>Overtid:</strong> Sjeldent for 1. maskinist, vanlig
                  for 2. maskinist
                </li>
                <li>
                  <strong>Kost og losji:</strong> Dekket ombord (ikke
                  skattemessig inntekt)
                </li>
                <li>
                  <strong>Reisegodtgjørelse:</strong> Til/fra skip
                </li>
                <li>
                  <strong>Pensjon og forsikring:</strong> Ofte svært gode
                  ordninger
                </li>
              </ul>
            </div>

            <p className="text-slate-700 mb-6">
              Ekstra kompetanse betaler seg. Maskinister med
              ETO-sertifikat (elektro-teknisk offiser), gasskompetanse (LNG/LPG)
              eller miljøspesialisering får ofte høyere grunnlønn og bedre
              tillegg.
            </p>

            <h2 className="text-3xl font-medium text-navy mb-6 mt-12">
              Kompetanse som øker lønnen
            </h2>

            <p className="text-slate-700 mb-6">
              Den maritime sektoren går gjennom store endringer –
              elektrifisering, automatisering, strengere miljøkrav. Maskinister
              som holder seg oppdatert tjener bedre:
            </p>

            <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6 ml-4">
              <li>
                <strong>Elektrisk kompetanse:</strong> Hybrid- og elektriske
                skip øker. ETO-kurs gir +50-100 000 kr i verdi.
              </li>
              <li>
                <strong>DP-sertifikater:</strong> Dynamisk posisjonering er
                standard offshore. DP Unlimited gir høyere lønn.
              </li>
              <li>
                <strong>LNG/gasskompetanse:</strong> LNG som drivstoff vokser.
                Gass-sertifikater er høyt verdsatt.
              </li>
              <li>
                <strong>Miljøsystemer:</strong> SOx-scrubbere, ballastvann,
                NOx-reduksjon – viktig kompetanse.
              </li>
              <li>
                <strong>Automatisering:</strong> Digitale systemer, PLC,
                SCADA-systemer blir vanligere.
              </li>
            </ul>

            <p className="text-slate-700 mb-6">
              Det er ikke lenger nok å kun kunne diesel- og turbinmotorer.
              Fremtidens maskinister kombinerer mekanikk, elektro og IT.
            </p>

            <h2 className="text-3xl font-medium text-navy mb-6 mt-12">
              Utdanning og karrierevei
            </h2>

            <p className="text-slate-700 mb-6">
              Veien til maskinist går gjennom maritim fagskole eller
              høyskole:
            </p>

            <div className="bg-navy text-cream-100 rounded-lg p-6 my-8">
              <h3 className="text-xl font-medium mb-4 text-cream-50">Typisk karrierevei:</h3>
              <ol className="space-y-2 list-decimal list-inside">
                <li>
                  Maskinistutdanning (3 år maritim fagskole eller bachelor)
                </li>
                <li>3. maskinist (trainee) – dokumentere fartstid</li>
                <li>
                  2. maskinist (STCW III/2) – 2-5 år erfaring, vaktansvar
                </li>
                <li>
                  1. maskinist (STCW III/1) – 5-10+ år erfaring, overordnet
                  ansvar
                </li>
                <li>
                  Spesialisering: ETO, gasskompetanse, DP, eller landstillinger
                </li>
              </ol>
            </div>

            <p className="text-slate-700 mb-6">
              Det tar typisk 8-12 år fra start til 1. maskinist. Mange velger
              også å spesialisere seg – enten som ETO (elektro), fortsette til
              landbaserte stillinger (drift, prosjektledelse), eller jobbe i
              klasseselskap (DNV, Lloyd&apos;s).
            </p>

            <h2 className="text-3xl font-medium text-navy mb-6 mt-12">
              Skatt og nettolønn
            </h2>

            <p className="text-slate-700 mb-6">
              Skatt påvirker hva du faktisk får igjen av lønnen din:
            </p>

            <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6 ml-4">
              <li>
                <strong>NOR-register:</strong> Normal norsk skatt (ca. 35-40%
                effektiv skattesats)
              </li>
              <li>
                <strong>NIS-register (DIS-skip):</strong> Skattefritak i
                internasjonalt farvann (kun trygdeavgift)
              </li>
              <li>
                <strong>Sjømannsfradrag:</strong> Inntil 30% av inntekt ved
                minimum 130 dager offshore/utenriks
              </li>
            </ul>

            <p className="text-slate-700 mb-6">
              En maskinist med 700 000 kr grunnlønn offshore på NOR-register
              kan ha nettolønn rundt 500-550 000 kr (etter skatt). På DIS-skip
              internasjonalt kan netto være betydelig høyere.
            </p>

            <h2 className="text-3xl font-medium text-navy mb-6 mt-12">
              Jobbmarkedet for maskinister
            </h2>

            <p className="text-slate-700 mb-6">
              Behovet for kvalifiserte maskinister er høyt – spesielt for de
              med moderne kompetanse:
            </p>

            <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6 ml-4">
              <li>
                <strong>Offshore:</strong> Fortsatt høy etterspørsel, særlig
                innen subsea og fornybar (havvind)
              </li>
              <li>
                <strong>Havbruk:</strong> Voksende sektor, stadig nye skip
              </li>
              <li>
                <strong>Elektrifisering:</strong> Maskinister med
                ETO-kompetanse er mangelvare
              </li>
              <li>
                <strong>Gasskompetanse:</strong> LNG som drivstoff øker
              </li>
              <li>
                <strong>Automatisering:</strong> Behov for teknisk kompetanse
                øker
              </li>
            </ul>

            <p className="text-slate-700 mb-6">
              Med riktig kompetanse er det enkelt å finne jobb. Mange rederier
              sliter med å rekruttere norske maskinister – særlig unge med
              moderne teknisk kompetanse.
            </p>

            <h2 className="text-3xl font-medium text-navy mb-6 mt-12">
              Oppsummering – Maskinist lønn 2026
            </h2>

            <p className="text-slate-700 mb-6">
              Maskinist er en høyt betalt, teknisk krevende og fremtidssikker
              karriere i den maritime sektoren. Med gjennomsnittlig lønn på
              670 000 kr, gode tillegg og sterk etterspørsel, er det en trygg
              karrierevei.
            </p>

            <div className="bg-sky-50 border-l-4 border-navy p-6 my-8">
              <h3 className="text-xl font-medium text-navy mb-3">
                Nøkkelpunkter:
              </h3>
              <ul className="space-y-2 text-slate-700">
                <li>
                  ✓ Offshore gir høyest lønn: 750-900 000 kr (1. maskinist)
                </li>
                <li>
                  ✓ Havbruk er familievennlig: 650-800 000 kr + kortere
                  rotasjon
                </li>
                <li>✓ Rederi gir skattefordeler på DIS-skip</li>
                <li>
                  ✓ Tillegg utgjør 20-40% av lønn (rotasjon, offshore, DP)
                </li>
                <li>
                  ✓ ETO-kompetanse og gasskunnskap øker lønnen betydelig
                </li>
                <li>✓ Høy etterspørsel etter kvalifiserte maskinister</li>
              </ul>
            </div>

            <p className="text-slate-700 mb-8">
              Hvis du vurderer karriere som maskinist, eller allerede er i
              bransjen og lurer på lønnspotensialet ditt – nå vet du hva som
              påvirker lønnen og hvordan du kan maksimere din verdi i
              arbeidsmarkedet.
            </p>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section variant="slate">
        <Container size="md">
          <h2 className="text-3xl font-medium text-navy mb-8 text-center">
            Ofte stilte spørsmål om maskinistlønn
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
              Søker du jobb som maskinist?
            </h2>
            <p className="text-sky-100 mb-6 max-w-2xl mx-auto">
              Bluecrew formidler kvalifiserte maritime fagfolk til rederier i
              hele Norge. Registrer deg og bli matchet med stillinger som
              passer din kompetanse og erfaring.
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

