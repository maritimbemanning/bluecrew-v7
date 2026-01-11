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
  { name: 'Kokk', url: '/lonn/kokk' },
];

export const metadata: Metadata = {
  title: 'Kokk Lønn Til Sjøs 2026 – Hva tjener en skipskokk?',
  description: 'Gjennomsnittlig kokklønn til sjøs er 540 000 kr. Se lønn for offshore-kokk, havbruk og cruise. Provianteringsansvar, crew morale og karrieremuligheter.',
  keywords: ['kokk til sjøs lønn', 'skipskokk lønn', 'offshore kokk lønn', 'maritim kokk', 'kokk på båt lønn'],
  openGraph: {
    title: 'Kokk Lønn Til Sjøs i Norge 2026',
    description: 'Gjennomsnittlig lønn 540 000 kr. Se lønnsforskjeller mellom offshore, havbruk og cruise.',
    url: 'https://bluecrew.no/lonn/kokk',
    siteName: 'Bluecrew AS',
    locale: 'nb_NO',
    type: 'article',
  },
  alternates: {
    canonical: 'https://bluecrew.no/lonn/kokk',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function KokkLonnPage() {
  const faqs = [
    {
      question: 'Hvor mye tjener en kokk til sjøs?',
      answer: 'Gjennomsnittlig årslønn for kokk til sjøs i Norge er rundt 540 000 kr. Nyutdannede kokker starter på 450-500 000 kr, mens erfarne kokker med provianteringsansvar kan tjene 600-750 000 kr årlig. Offshore-kokker ligger høyest.',
    },
    {
      question: 'Er det forskjell på kokk til sjøs og kokk på land?',
      answer: 'Ja, store forskjeller. Til sjøs må du planlegge all mat for uker/måneder, bestille proviant, jobbe med begrenset plass og utstyr, og lage mat til samme crew daglig. Det krever mer logistikk, planlegging og kreativitet enn landbaserte restauranter.',
    },
    {
      question: 'Trenger man kokkeutdanning for å jobbe til sjøs?',
      answer: 'Ikke nødvendigvis. Mange skip ansetter kokker uten formell utdanning, men med erfaring fra restaurant eller institusjonskjøkken. Maritime STCW-kurs (Basic Safety) er påkrevd, men ikke kokke-fagbrev. Erfaring veier tungt.',
    },
    {
      question: 'Hvor mange måltider lager en skipskokk per dag?',
      answer: 'Typisk 3-4 måltider per dag: frokost, lunsj, middag og ofte kveldsmat. På skip med 3-vaktssystem må kokken også levere mat til nattevakt. Det betyr planlegging for 20-30 personer, alle dager, over uker/måneder.',
    },
    {
      question: 'Hvorfor er kokken viktig om bord?',
      answer: 'God mat er avgjørende for crew-moral, spesielt på lange turer. En god kokk kan gjøre en tøff tur til sjøs mye bedre, mens dårlig mat skaper misnøye. Mange kapteiner sier: "En god kokk er verdt sin vekt i gull."',
    },
  ];

  return (
    <>
      <SchemaMarkup type="article" position="kokk" pageType="lonn" />
      <SchemaMarkup type="faq" faqItems={faqs} />
      <SchemaMarkup type="breadcrumb" breadcrumbs={breadcrumbs} />

      {/* Hero */}
      <AnimatedHero
        title={<>Kokk <em className="not-italic text-gold-400">Lønn</em> Til Sjøs 2026</>}
        subtitle="Mer enn mat – crew-moral, proviantering og ansvar om bord."
        backgroundImage={IMAGE_PATHS.careers.kokk}
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
              <strong>Kokklønn til sjøs:</strong> Gjennomsnitt 540 000 kr/år.
              Offshore-kokker tjener opp mot 750 000 kr.
              Inkluderer kost og losji. Viktig rolle for trivsel om bord.
              Krever erfaring fra storkjøkken/restaurant.
            </p>
          </SummaryBox>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-slate-700 leading-relaxed mb-6">
              &ldquo;En god kokk er verdt sin vekt i gull&rdquo; – et ordtak enhver
              skipskaptein kjenner. Om bord på et skip, hvor mannskapet kan være
              ute i uker eller måneder, er god mat ikke bare viktig – det er
              <strong> avgjørende for crew-moral, trivsel og produktivitet</strong>.
            </p>

            <p className="text-slate-700 mb-6">
              I 2026 ligger gjennomsnittslønnen for kokk til sjøs i Norge på
              rundt <strong>540 000 kr årlig</strong>. Men rollen som skipskokk
              er mye mer enn bare matlaging – det handler om logistikk,
              proviantering, budsjett, og evnen til å holde moralen oppe hos et
              mannskap som jobber hardt under krevende forhold.
            </p>

            <p className="text-slate-700 mb-8">
              Denne artikkelen gir deg full oversikt over kokklønn til sjøs –
              hva påvirker lønnen, forskjeller mellom offshore, havbruk og
              cruise, hva jobben egentlig innebærer, og hvorfor en god kokk er
              gull verdt om bord.
            </p>

            <h2 className="text-3xl font-medium text-navy mb-6 mt-12">
              Gjennomsnittlig kokklønn til sjøs
            </h2>

            <p className="text-slate-700 mb-6">
              Kokk til sjøs tjener bedre enn de fleste landbaserte kokker, men
              jobben er også mer krevende og mangfoldig.
            </p>

            <div className="bg-sky-50 border-l-4 border-sky-600 p-6 my-8">
              <h3 className="text-xl font-medium text-navy mb-3">
                Lønn etter erfaring
              </h3>
              <ul className="space-y-2 text-slate-700">
                <li>
                  <strong>Nyutdannet kokk (0-2 år):</strong> 450 000 - 520 000 kr
                </li>
                <li>
                  <strong>Erfaren kokk (2-5 år):</strong> 520 000 - 620 000 kr
                </li>
                <li>
                  <strong>Hovedkokk / Chefkokk (5+ år):</strong> 600 000 - 750 000 kr
                </li>
              </ul>
            </div>

            <p className="text-slate-700 mb-6">
              Sammenlignet med gjennomsnittlig kokklønn på land (rundt 420 000
              kr) ligger maritime kokker betydelig høyere. Årsaken er enkel:
              <strong> mer ansvar, isolasjon, og avgjørende rolle for
              crew-moral</strong>.
            </p>

            <p className="text-slate-700 mb-6">
              I tillegg til lønn får kokker kost og losji dekket om bord, samt
              rotasjonstillegg som kan utgjøre 15-30% av grunnlønnen.
            </p>

            <h2 className="text-3xl font-medium text-navy mb-6 mt-12">
              Lønnsforskjeller etter sektor
            </h2>

            <p className="text-slate-700 mb-6">
              Som andre maritime stillinger varierer kokklønn betydelig etter
              sektor, skiptype og crew-størrelse.
            </p>

            <h3 className="text-2xl font-medium text-navy mb-4 mt-8">
              1. Offshore kokk – Høyest lønn
            </h3>

            <p className="text-slate-700 mb-4">
              Offshore-sektoren betaler best for kokker:
            </p>

            <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6 ml-4">
              <li>
                <strong>Lønnsnivå:</strong> 600 000 - 750 000 kr
              </li>
              <li>
                <strong>Rotasjon:</strong> 2-4, 4-4 eller 2-3 uker
              </li>
              <li>
                <strong>Ansvar:</strong> 20-50 personer, 3-4 måltider per dag,
                proviantering for hele rotasjonen
              </li>
              <li>
                <strong>Skiptype:</strong> PSV, AHTS, rigger, subsea-fartøy
              </li>
              <li>
                <strong>Utfordringer:</strong> Begrenset lagringsplass,
                vaktordning (mat til alle vakter)
              </li>
            </ul>

            <p className="text-slate-700 mb-6">
              Offshore krever erfaring, planlegging og evne til å lage variert
              mat over lang tid. Du må bestille proviant for 4 uker,
              lagre/organisere i fryser og kjølerom, og lage god mat hver dag
              uten mulighet til å &ldquo;bestille inn&rdquo; mer.
            </p>

            <h3 className="text-2xl font-medium text-navy mb-4 mt-8">
              2. Havbruk kokk – Kortere rotasjon
            </h3>

            <p className="text-slate-700 mb-4">
              Havbruk tilbyr god lønn med hyppigere levering av proviant:
            </p>

            <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6 ml-4">
              <li>
                <strong>Lønnsnivå:</strong> 520 000 - 650 000 kr
              </li>
              <li>
                <strong>Rotasjon:</strong> 1-1, 2-2 eller 1 uke på/av
              </li>
              <li>
                <strong>Ansvar:</strong> 10-30 personer, enklere
                proviantering (ukentlig levering)
              </li>
              <li>
                <strong>Skiptype:</strong> Brønnbåter, fôrbåter, servicefartøy
              </li>
              <li>
                <strong>Fordeler:</strong> Kortere rotasjon, norsk kyst,
                familievennlig
              </li>
            </ul>

            <p className="text-slate-700 mb-6">
              Havbruk er perfekt for kokker som vil jobbe til sjøs men være
              hjemme oftere. Kortere rotasjon gjør det enklere å planlegge mat
              og få friske varer.
            </p>

            <h3 className="text-2xl font-medium text-navy mb-4 mt-8">
              3. Cruise og rederi – Internasjonal erfaring
            </h3>

            <p className="text-slate-700 mb-4">
              Cruise og rederi gir varierende lønninger avhengig av skiptype:
            </p>

            <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6 ml-4">
              <li>
                <strong>Lønnsnivå:</strong> 480 000 - 650 000 kr
              </li>
              <li>
                <strong>Rotasjon:</strong> 3-6 måneder (cruise/rederi)
              </li>
              <li>
                <strong>Ansvar:</strong> Varierer – fra 15 til 100+ personer
                (cruise)
              </li>
              <li>
                <strong>Skiptype:</strong> Cruiseskip, tankskip, bulkskip,
                ferger
              </li>
              <li>
                <strong>Fordeler:</strong> Internasjonale havner, opplevelser,
                større kjøkken
              </li>
            </ul>

            <p className="text-slate-700 mb-6">
              Cruise tilbyr ofte bedre kjøkkenfasiliteter og større team, men
              krever høyere volum og mer variasjon. Rederi er mer
              grunnleggende, men med lengre turer.
            </p>

            <h2 className="text-3xl font-medium text-navy mb-6 mt-12">
              Hva gjør en kokk til sjøs?
            </h2>

            <p className="text-slate-700 mb-6">
              Maritime kokker gjør <em>mye mer</em> enn bare lage mat. De er
              ansvarlige for:
            </p>

            <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6 ml-4">
              <li>
                <strong>Proviantering:</strong> Bestille all mat for hele
                rotasjonen (2-4 uker offshore)
              </li>
              <li>
                <strong>Budsjett:</strong> Holde seg innenfor kostbudsjett per
                dag per person
              </li>
              <li>
                <strong>Lagring:</strong> Organisere fryser, kjølerom og
                tørrlager effektivt
              </li>
              <li>
                <strong>Matlaging:</strong> 3-4 måltider per dag, alle dager,
                variert meny
              </li>
              <li>
                <strong>Ernæring:</strong> Sikre sunt, variert og næringsrikt
                kosthold
              </li>
              <li>
                <strong>Mattrygghet:</strong> HACCP, hygiene, HMS-krav
              </li>
              <li>
                <strong>Tilpasning:</strong> Allergier, intoleranser, kulturelle
                preferanser
              </li>
              <li>
                <strong>Crew-moral:</strong> Holde moralen oppe gjennom god mat
              </li>
            </ul>

            <p className="text-slate-700 mb-6">
              En god skipskokk er <strong>logistiker, planlegger, budsjettansvarlig
              og psykolog</strong> i tillegg til å være kokk. Evnen til å lage
              god, variert mat over uker med begrensede ressurser er en
              spesialkompetanse.
            </p>

            <h2 className="text-3xl font-medium text-navy mb-6 mt-12">
              Tillegg og goder for kokker
            </h2>

            <p className="text-slate-700 mb-6">
              Som andre maritime stillinger får kokker betydelige tillegg:
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
                  <strong>Ansvarstillegg:</strong> For proviantering,
                  budsjettansvar
                </li>
                <li>
                  <strong>Overtid:</strong> Ekstra arbeid ved spesielle
                  anledninger
                </li>
                <li>
                  <strong>Kost og losji:</strong> Dekket ombord (ingen utgifter)
                </li>
                <li>
                  <strong>Pensjon og forsikring:</strong> Gode ordninger
                </li>
              </ul>
            </div>

            <p className="text-slate-700 mb-6">
              Med rotasjon 2-4 uker betyr det at du jobber 6 måneder i året men
              får årslønn. Alle levekostnader dekkes om bord.
            </p>

            <h2 className="text-3xl font-medium text-navy mb-6 mt-12">
              Krav og sertifikater
            </h2>

            <p className="text-slate-700 mb-6">
              For å jobbe som kokk til sjøs trenger du:
            </p>

            <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6 ml-4">
              <li>
                <strong>STCW Basic Safety:</strong> 1 ukes grunnkurs (påkrevd)
              </li>
              <li>
                <strong>Helseattest:</strong> Maritim legeattest
              </li>
              <li>
                <strong>Matservering-kurs:</strong> HMS og mattrygghet (anbefalt)
              </li>
              <li>
                <strong>Erfaring:</strong> Restaurant, catering eller
                institusjonskjøkken
              </li>
            </ul>

            <p className="text-slate-700 mb-6">
              Du trenger <em>ikke</em> formell kokkeutdanning (fagbrev), men
              erfaring fra profesjonelt kjøkken er nesten alltid et krav.
              Mange skip foretrekker kokker med bakgrunn fra catering eller
              institusjon fremfor restaurant – fordi volumkjøkken og
              planlegging er mer relevant.
            </p>

            <h2 className="text-3xl font-medium text-navy mb-6 mt-12">
              Hvorfor er kokken så viktig om bord?
            </h2>

            <p className="text-slate-700 mb-6">
              På land kan du bytte restaurant hvis maten er dårlig. Til sjøs
              har mannskapet <em>ingen valg</em> – de er avhengige av kokken
              dag etter dag, uke etter uke.
            </p>

            <div className="bg-navy text-cream-100 rounded-lg p-6 my-8">
              <h3 className="text-xl font-medium mb-4 text-cream-50">
                Kokkens betydning for crew-moral:
              </h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>
                  <strong>Motivasjon:</strong> God mat gir energi og glede i
                  hverdagen
                </li>
                <li>
                  <strong>Samhold:</strong> Måltider er sosiale arenaer hvor
                  crew møtes
                </li>
                <li>
                  <strong>Helse:</strong> Sunt kosthold holder mannskapet friske
                </li>
                <li>
                  <strong>Produktivitet:</strong> Godt mett crew jobber bedre
                </li>
                <li>
                  <strong>Hjemfølelse:</strong> God mat minner om hjemmet
                </li>
              </ul>
            </div>

            <p className="text-slate-700 mb-6">
              Mange kapteiner sier at de heller vil ha en dyktig kokk enn en
              ekstra maskinist. Årsaken: <strong>en misfornøyd crew på grunn av
              dårlig mat skaper problemer</strong> som påvirker alle om bord.
            </p>

            <h2 className="text-3xl font-medium text-navy mb-6 mt-12">
              Oppsummering – Kokk lønn til sjøs 2026
            </h2>

            <p className="text-slate-700 mb-6">
              Kokk til sjøs er en krevende, men givende karriere for de som
              liker matlaging, logistikk og evnen til å gjøre en forskjell for
              andre. Med gjennomsnittlig lønn på 540 000 kr og høy betydning
              for crew-moral, er det en verdsatt stilling.
            </p>

            <div className="bg-sky-50 border-l-4 border-navy p-6 my-8">
              <h3 className="text-xl font-medium text-navy mb-3">
                Nøkkelpunkter:
              </h3>
              <ul className="space-y-2 text-slate-700">
                <li>
                  ✓ Gjennomsnitt 540 000 kr, offshore opp til 750 000 kr
                </li>
                <li>
                  ✓ Betydelig høyere enn landbaserte kokker (420k snitt)
                </li>
                <li>
                  ✓ Mer enn matlaging: proviantering, budsjett, crew-moral
                </li>
                <li>
                  ✓ Kost og losji dekket – spar hele lønnen
                </li>
                <li>
                  ✓ Rotasjon 2-4: Jobb 50% av året, få full lønn
                </li>
                <li>
                  ✓ Høy verdi om bord – &ldquo;verdt sin vekt i gull&rdquo;
                </li>
              </ul>
            </div>

            <p className="text-slate-700 mb-8">
              Hvis du har erfaring fra restaurant eller catering og ønsker en
              karriere med mer ansvar, bedre lønn og mulighet til å reise,
              kan kokk til sjøs være perfekt for deg.
            </p>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section variant="slate">
        <Container size="md">
          <h2 className="text-3xl font-medium text-navy mb-8 text-center">
            Ofte stilte spørsmål om kokklønn til sjøs
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
              Søker du jobb som kokk til sjøs?
            </h2>
            <p className="text-sky-100 mb-6 max-w-2xl mx-auto">
              Bluecrew formidler kokker til offshore, havbruk og rederi. Høy
              etterspørsel etter dyktige kokker med erfaring fra
              profesjonelt kjøkken.
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

