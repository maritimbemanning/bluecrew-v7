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
  { name: 'ETO', url: '/lonn/eto' },
];

export const metadata: Metadata = {
  title: 'ETO Lønn 2026 – Hva tjener en elektro-teknisk offiser?',
  description: 'Gjennomsnittlig ETO-lønn i Norge er 720 000 kr. Ny stilling med høy etterspørsel. Se lønn for offshore, havbruk og cruise. Elektro, automatisering og IT.',
  keywords: ['eto lønn', 'elektro-teknisk offiser lønn', 'eto Norge', 'maritime elektrikere', 'offshore eto lønn'],
  openGraph: {
    title: 'ETO Lønn i Norge 2026',
    description: 'Gjennomsnittlig lønn 720 000 kr. Ny stilling med høy etterspørsel innen elektro og automatisering.',
    url: 'https://bluecrew.no/lonn/eto',
    siteName: 'Bluecrew AS',
    locale: 'nb_NO',
    type: 'article',
  },
  alternates: {
    canonical: 'https://bluecrew.no/lonn/eto',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ETOLonnPage() {
  const faqs = [
    {
      question: 'Hvor mye tjener en ETO i Norge?',
      answer: 'Gjennomsnittlig årslønn for ETO i Norge er rundt 720 000 kr. Nyutdannede ETO-er starter på 600-700 000 kr, mens erfarne med 5+ års erfaring kan tjene 750-950 000 kr årlig. Offshore-ETO-er ligger høyest med 800-950 000 kr.',
    },
    {
      question: 'Hva er en ETO?',
      answer: 'ETO står for Electro-Technical Officer (elektro-teknisk offiser). Det er en relativt ny offisersrang (STCW Manila 2010) med ansvar for skipets elektriske systemer, automatisering, IT, navigasjonsutstyr og kommunikasjon. ETO jobber med både elektro, elektronikk og programvare.',
    },
    {
      question: 'Hvorfor tjener ETO-er så godt?',
      answer: 'Høy lønn skyldes høy etterspørsel og lav tilgang på kompetanse. Moderne skip er svært avanserte elektrisk og digitalt, men det er få utdannede ETO-er i Norge. Kombinasjonen elektro + IT + maritime operasjoner er sjelden og høyt verdsatt.',
    },
    {
      question: 'Hvilke sertifikater må en ETO ha?',
      answer: 'ETO må ha STCW III/6 (ETO-sertifikat), grunnleggende elektrikerutdanning (fagbrev eller tilsvarende), Basic Safety Training, og ofte DP-sertifikater. Mange har også IT-kompetanse, PLC-programmering og sikkerhetsklareringer.',
    },
    {
      question: 'Kan maskinist ta ETO-kurs?',
      answer: 'Ja, mange maskinister tar ETO-kurs for å utvide kompetansen. Det gir betydelig lønnsøkning og bedre karrieremuligheter. ETO-kurset krever elektrofaglig bakgrunn eller relevant erfaring, så maskinister med elektrisk erfaring kan kvalifisere.',
    },
  ];

  return (
    <>
      <SchemaMarkup type="article" position="eto" pageType="lonn" />
      <SchemaMarkup type="faq" faqItems={faqs} />
      <SchemaMarkup type="breadcrumb" breadcrumbs={breadcrumbs} />

      {/* Hero */}
      <AnimatedHero
        title={<>ETO <em className="not-italic text-gold-400">Lønn</em> i Norge 2026</>}
        subtitle="Elektro, automatisering og IT – den mest ettertraktede maritime stillingen."
        backgroundImage={IMAGE_PATHS.careers.eto}
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
              <strong>ETO-lønn i Norge:</strong> Gjennomsnitt 720 000 kr/år.
              Offshore ETO kan tjene over 950 000 kr.
              Høy etterspørsel etter elektro- og IT-kompetanse.
              Krever STCW III/6 og relevant elektrobakgrunn.
            </p>
          </SummaryBox>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-slate-700 leading-relaxed mb-6">
              ETO – Electro-Technical Officer – er den nyeste offisersrangen i
              den maritime sektoren. Innført gjennom STCW Manila-konvensjonen
              i 2010, representerer ETO-stillingen maritim næring sin respons
              på moderne skips økende kompleksitet innen elektro,
              automatisering, digitalisering og IT-systemer.
            </p>

            <p className="text-slate-700 mb-6">
              I 2026 ligger gjennomsnittslønnen for ETO i Norge på rundt{' '}
              <strong>720 000 kr årlig</strong> – høyere enn mange andre
              offisersrangene. Årsaken er enkel: <em>høy etterspørsel, lav tilgang</em>.
            </p>

            <p className="text-slate-700 mb-8">
              Mens det finnes mange maskinister og styrmenn i Norge, er
              utdannede ETO-er en mangelvare. Samtidig krever moderne skip –
              spesielt offshore, havbruk og cruise – elektrisk kompetanse på
              alle systemer fra kraftproduksjon til DP (dynamisk
              posisjonering), automatisering og cybersikkerhet.
            </p>

            <h2 className="text-3xl font-medium text-navy mb-6 mt-12">
              Hva gjør en ETO?
            </h2>

            <p className="text-slate-700 mb-6">
              Før vi ser på lønn, må vi forstå hva ETO faktisk gjør om bord.
              ETO er <strong>ikke</strong> bare en elektriker – de er
              spesialister på skipets teknologiske nervesystem:
            </p>

            <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6 ml-4">
              <li>
                <strong>Elektriske systemer:</strong> Kraftproduksjon,
                switchboards, transformatorer, motorer
              </li>
              <li>
                <strong>Automatisering:</strong> PLC-systemer, SCADA,
                prosesstyring, alarmsystemer
              </li>
              <li>
                <strong>Navigasjon:</strong> GPS, radar, ECDIS, AIS,
                kommunikasjonsutstyr
              </li>
              <li>
                <strong>DP-systemer:</strong> Dynamisk posisjonering
                (offshore), thrustere, sensorer
              </li>
              <li>
                <strong>IT og nettverk:</strong> Servere, nettverk,
                cybersikkerhet, programvare
              </li>
              <li>
                <strong>Vedlikehold:</strong> Feilsøking, reparasjon,
                oppgradering, testing
              </li>
            </ul>

            <p className="text-slate-700 mb-6">
              En ETO jobber i skjæringspunktet mellom elektro, IT og maritim
              drift. Det er en teknisk krevende rolle som krever kontinuerlig
              læring – skipsteknologi utvikler seg raskt.
            </p>

            <h2 className="text-3xl font-medium text-navy mb-6 mt-12">
              Gjennomsnittlig ETO-lønn i Norge
            </h2>

            <p className="text-slate-700 mb-6">
              ETO-lønn ligger konsekvent høyere enn gjennomsnittet for maritime
              offiserer – og det er kun én grunn: <strong>mangel på kompetanse</strong>.
            </p>

            <div className="bg-sky-50 border-l-4 border-sky-600 p-6 my-8">
              <h3 className="text-xl font-medium text-navy mb-3">
                Lønn etter erfaring
              </h3>
              <ul className="space-y-2 text-slate-700">
                <li>
                  <strong>Nyutdannet ETO (0-2 år):</strong> 600 000 - 700 000
                  kr
                </li>
                <li>
                  <strong>Erfaren ETO (2-5 år):</strong> 700 000 - 850 000 kr
                </li>
                <li>
                  <strong>Senior ETO (5-10+ år):</strong> 800 000 - 950 000 kr+
                </li>
              </ul>
            </div>

            <p className="text-slate-700 mb-6">
              Sammenlignet med gjennomsnittlig norsk årslønn (rundt 620 000 kr
              i 2026) og andre maritime offiserer (styrmann ~620k, maskinist
              ~670k, kaptein ~850k), ligger ETO godt over – <em>til tross for å
              være en relativt ny stilling</em>.
            </p>

            <p className="text-slate-700 mb-6">
              Mange rederier sliter med å rekruttere ETO-er og betaler derfor
              premiumlønn for å sikre kompetansen.
            </p>

            <h2 className="text-3xl font-medium text-navy mb-6 mt-12">
              Lønnsforskjeller etter sektor
            </h2>

            <p className="text-slate-700 mb-6">
              Som med andre maritime stillinger varierer ETO-lønn betydelig
              etter sektor, skiptype og kompleksitet.
            </p>

            <h3 className="text-2xl font-medium text-navy mb-4 mt-8">
              1. Offshore ETO – Høyest lønn
            </h3>

            <p className="text-slate-700 mb-4">
              Offshore-sektoren betaler best for ETO-kompetanse:
            </p>

            <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6 ml-4">
              <li>
                <strong>Lønnsnivå:</strong> 800 000 - 950 000 kr+
              </li>
              <li>
                <strong>Rotasjon:</strong> 2-4, 4-4 eller 2-3 uker
              </li>
              <li>
                <strong>Ansvar:</strong> DP-systemer, kraftproduksjon,
                automatisering, redundans
              </li>
              <li>
                <strong>Skiptype:</strong> PSV, AHTS, subsea, rigger,
                havvindskip
              </li>
              <li>
                <strong>Tillegg:</strong> Rotasjonstillegg 20-35%,
                offshore-tillegg, DP-bonus
              </li>
            </ul>

            <p className="text-slate-700 mb-6">
              Offshore krever høyeste kompetanse – DP-systemer, kraftverk,
              automatisering og IT-sikkerhet må fungere 100%. Nedetid koster
              millioner. Derfor betales ETO-er godt.
            </p>

            <h3 className="text-2xl font-medium text-navy mb-4 mt-8">
              2. Havbruk ETO – Voksende etterspørsel
            </h3>

            <p className="text-slate-700 mb-4">
              Havbruk investerer tungt i automatisering og digitalisering:
            </p>

            <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6 ml-4">
              <li>
                <strong>Lønnsnivå:</strong> 700 000 - 850 000 kr
              </li>
              <li>
                <strong>Rotasjon:</strong> Ofte 1-1, 2-2 eller 1 uke på/av
              </li>
              <li>
                <strong>Ansvar:</strong> Sensorer, overvåking, automatisering,
                fôringsanlegg
              </li>
              <li>
                <strong>Skiptype:</strong> Brønnbåter, fôrbåter, wellboats
              </li>
              <li>
                <strong>Fordeler:</strong> Kortere rotasjon, familievennlig,
                voksende sektor
              </li>
            </ul>

            <p className="text-slate-700 mb-6">
              Havbruk går i retning av mer teknologi – AI-overvåking,
              automatisk fôring, miljøsensorer, fjerndiagnostikk. ETO-er blir
              stadig viktigere.
            </p>

            <h3 className="text-2xl font-medium text-navy mb-4 mt-8">
              3. Cruise og Rederi – Stabil lønn
            </h3>

            <p className="text-slate-700 mb-4">
              Cruise og tradisjonell skipsfart trenger også ETO-er:
            </p>

            <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6 ml-4">
              <li>
                <strong>Lønnsnivå:</strong> 650 000 - 800 000 kr
              </li>
              <li>
                <strong>Rotasjon:</strong> Ofte 3-6 måneder
              </li>
              <li>
                <strong>Ansvar:</strong> Elektriske systemer, navigasjon,
                kommunikasjon, underholdning (cruise)
              </li>
              <li>
                <strong>Skiptype:</strong> Cruiseskip, ferger, tankskip,
                containerskip
              </li>
              <li>
                <strong>Skattefordeler:</strong> DIS-register, skattefritak
                internasjonalt farvann
              </li>
            </ul>

            <p className="text-slate-700 mb-6">
              Cruise tilbyr stabilitet, internasjonal erfaring og gode
              arbeidsforhold – men krever lengre perioder borte.
            </p>

            <h2 className="text-3xl font-medium text-navy mb-6 mt-12">
              Tillegg og bonuser for ETO
            </h2>

            <p className="text-slate-700 mb-6">
              Som andre maritime offiserer får ETO-er betydelige tillegg
              utover grunnlønn:
            </p>

            <div className="bg-slate-50 rounded-lg p-6 my-8">
              <h3 className="text-xl font-medium text-navy mb-4">
                Vanlige tillegg:
              </h3>
              <ul className="space-y-3 text-slate-700">
                <li>
                  <strong>Rotasjonstillegg:</strong> 15-35% av grunnlønn
                </li>
                <li>
                  <strong>Offshore-tillegg:</strong> 20-30% ekstra for offshore
                </li>
                <li>
                  <strong>DP-tillegg:</strong> Ekstra for DP-ansvar og
                  sertifikater
                </li>
                <li>
                  <strong>Ansvarstillegg:</strong> For lederansvar eller
                  spesialkompetanse
                </li>
                <li>
                  <strong>Overtid:</strong> Kan forekomme ved ekstraordinære
                  oppgaver
                </li>
                <li>
                  <strong>Kost og losji:</strong> Dekket ombord (skatt-fri)
                </li>
                <li>
                  <strong>Sertifiseringsstøtte:</strong> Kurs og
                  videreutdanning dekkes
                </li>
                <li>
                  <strong>Pensjon og forsikring:</strong> Gode ordninger
                </li>
              </ul>
            </div>

            <p className="text-slate-700 mb-6">
              Mange ETO-er rapporterer at tillegg utgjør 25-40% av totallønnen.
              Det gjør reell årslønn betydelig høyere enn grunnlønn.
            </p>

            <h2 className="text-3xl font-medium text-navy mb-6 mt-12">
              Utdanning og krav for å bli ETO
            </h2>

            <p className="text-slate-700 mb-6">
              Veien til ETO krever både elektrofaglig utdanning og maritim
              kompetanse:
            </p>

            <div className="bg-navy text-cream-100 rounded-lg p-6 my-8">
              <h3 className="text-xl font-medium mb-4 text-cream-50">
                Typiske utdanningsveier:
              </h3>
              <ol className="space-y-2 list-decimal list-inside">
                <li>
                  <strong>Elektrikerutdanning</strong> (fagbrev eller bachelor
                  elektro)
                </li>
                <li>
                  <strong>Maritim fagskole</strong> med ETO-spesialisering
                </li>
                <li>
                  <strong>STCW III/6</strong> ETO-sertifikat (påkrevd)
                </li>
                <li>
                  <strong>Basic Safety Training</strong> (maritime
                  grunnkurs)
                </li>
                <li>
                  <strong>Fartstid</strong> og praktisk erfaring om bord
                </li>
                <li>
                  <strong>Videreutdanning:</strong> DP, IT-sikkerhet,
                  automatisering
                </li>
              </ol>
            </div>

            <p className="text-slate-700 mb-6">
              Mange ETO-er har bakgrunn som elektrikere på land og tar maritim
              utdanning som videreutdanning. Andre kommer fra maritim fagskole
              med elektro-spesialisering. Begge veier fungerer.
            </p>

            <p className="text-slate-700 mb-6">
              Det tar typisk 3-5 år fra elektrikerutdanning til å jobbe som
              ETO, avhengig av utdanningsvei og fartstid.
            </p>

            <h2 className="text-3xl font-medium text-navy mb-6 mt-12">
              Hvorfor er det mangel på ETO-er?
            </h2>

            <p className="text-slate-700 mb-6">
              ETO-stillingen er relativt ny (2010), og det har tatt tid å bygge
              opp utdanningskapasitet. Samtidig har skip blitt stadig mer
              avanserte elektrisk og digitalt.
            </p>

            <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6 ml-4">
              <li>
                <strong>Få utdanningsinstitusjoner:</strong> Ikke alle maritime
                skoler tilbyr ETO-linjer
              </li>
              <li>
                <strong>Konkurranse fra land:</strong> Elektrikere med IT-kompetanse
                har mange jobbtilbud på land
              </li>
              <li>
                <strong>Krevende kombinasjon:</strong> Elektro + IT + maritim
                – få har hele pakken
              </li>
              <li>
                <strong>Økende etterspørsel:</strong> Elektrifisering,
                automatisering, havvind øker behovet
              </li>
            </ul>

            <p className="text-slate-700 mb-6">
              Resultatet er høy lønn for de som kvalifiserer. Mange rederier
              konkurrerer om de samme ETO-ene.
            </p>

            <h2 className="text-3xl font-medium text-navy mb-6 mt-12">
              Fremtidsutsikter for ETO
            </h2>

            <p className="text-slate-700 mb-6">
              ETO er den mest fremtidssikre maritime stillingen akkurat nå.
              Alle trender peker mot økende behov:
            </p>

            <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6 ml-4">
              <li>
                <strong>Elektrifisering:</strong> Flere batteriskip, hybrid,
                hydrogen – krever elektrisk kompetanse
              </li>
              <li>
                <strong>Automatisering:</strong> Autonome skip, fjerndiagnostikk,
                prediktivt vedlikehold
              </li>
              <li>
                <strong>Havvind:</strong> Ny sektor med enormt behov for ETO-er
              </li>
              <li>
                <strong>Cybersikkerhet:</strong> Skip blir hackbare –
                IT-sikkerhet blir kritisk
              </li>
              <li>
                <strong>Miljøkrav:</strong> Avanserte miljøsystemer krever
                teknisk kompetanse
              </li>
            </ul>

            <p className="text-slate-700 mb-6">
              Om 10 år vil trolig ETO være en av de viktigste offisersrangene
              om bord – og lønnen vil reflektere det.
            </p>

            <h2 className="text-3xl font-medium text-navy mb-6 mt-12">
              Oppsummering – ETO lønn 2026
            </h2>

            <p className="text-slate-700 mb-6">
              ETO er den best betalte maritime offisersstillingen relativt til
              erfaring og utdanningstid. Med gjennomsnittlig lønn på 720 000 kr,
              høy etterspørsel og fremtidssikre karrieremuligheter, er det en
              smart karrierevei for teknisk interesserte.
            </p>

            <div className="bg-sky-50 border-l-4 border-navy p-6 my-8">
              <h3 className="text-xl font-medium text-navy mb-3">
                Nøkkelpunkter:
              </h3>
              <ul className="space-y-2 text-slate-700">
                <li>
                  ✓ Gjennomsnitt 720 000 kr, offshore opp til 950 000 kr+
                </li>
                <li>
                  ✓ Høyere lønn enn styrmann og maskinist, til tross for å
                  være ny stilling
                </li>
                <li>
                  ✓ Mangel på kompetanse gir høy etterspørsel og god lønn
                </li>
                <li>
                  ✓ Kombinasjon elektro, IT og maritime operasjoner er sjelden
                </li>
                <li>
                  ✓ Fremtidssikker karriere: elektrifisering, automatisering,
                  havvind
                </li>
                <li>✓ Kortere utdanningstid enn kaptein og maskinist</li>
              </ul>
            </div>

            <p className="text-slate-700 mb-8">
              Hvis du har elektrofaglig utdanning eller interesse for teknologi
              og automatisering, er ETO en karrierevei verdt å vurdere. Få
              maritime stillinger tilbyr like god kombinasjon av lønn,
              etterspørsel og fremtidsutsikter.
            </p>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section variant="slate">
        <Container size="md">
          <h2 className="text-3xl font-medium text-navy mb-8 text-center">
            Ofte stilte spørsmål om ETO-lønn
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
              Søker du jobb som ETO?
            </h2>
            <p className="text-sky-100 mb-6 max-w-2xl mx-auto">
              Bluecrew formidler kvalifiserte ETO-er og elektro-fagfolk til
              maritime operasjoner. Høy etterspørsel, konkurransedyktig lønn,
              og fremtidssikker karriere.
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

