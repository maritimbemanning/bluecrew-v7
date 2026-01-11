import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SummaryBox from '@/components/ui/SummaryBox';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { formatCurrency } from '@/lib/utils';
import { AnimatedHero } from '@/components/animated';
import { IMAGE_PATHS } from '@/lib/images';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Kaptein Lønn 2026 – Hva tjener en skipsfører i Norge?',
  description: 'Gjennomsnittlig kapteinlønn i Norge er 850 000 kr. Se lønn for offshore, havbruk og cruise. Erfaring, sektor og skiptype påvirker lønnen betydelig.',
  keywords: ['kaptein lønn', 'skipsfører lønn', 'kaptein lønn Norge', 'hva tjener en kaptein', 'kaptein lønn offshore'],
  openGraph: {
    title: 'Kaptein Lønn i Norge 2026',
    description: 'Gjennomsnittlig lønn 850 000 kr. Se lønnsforskjeller mellom offshore, havbruk og cruise.',
    url: 'https://bluecrew.no/lonn/kaptein',
    siteName: 'Bluecrew AS',
    locale: 'nb_NO',
    type: 'article',
  },
  alternates: {
    canonical: 'https://bluecrew.no/lonn/kaptein',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function KapteinLonnPage() {
  const faqs = [
    {
      question: 'Hvor mye tjener en kaptein i Norge?',
      answer: 'Gjennomsnittlig årslønn for kaptein i Norge er rundt 850 000 kr. Nyutdannede kapteiner med minimum 10 års erfaring starter på 600-700 000 kr, mens erfarne kapteiner med 20+ års fartstid kan tjene over 1 200 000 kr årlig. Offshore-kapteiner ligger i toppen av lønnsskalaen.',
    },
    {
      question: 'Hva påvirker en kapteins lønn mest?',
      answer: 'De viktigste faktorene er sektor (offshore gir høyest lønn), års erfaring (10-20+ år), type skip (DP-fartøy, tankskip, cruise), rotasjonsordning (2-4, 4-4), og tilleggsansvar som spesialiserte operasjoner. Offshore-tillegg og rotasjonstillegg kan utgjøre 30-50% av grunnlønnen.',
    },
    {
      question: 'Hvor lang tid tar det å bli kaptein?',
      answer: 'Fra matros til kaptein tar det typisk 10-15 år. Du må gjennom lettmatros, 3. styrmann, 2. styrmann og 1. styrmann før du kvalifiserer til kaptein. Hvert trinn krever ny utdanning, sertifiseringer og dokumentert fartstid. De fleste er 35-40 år når de blir kaptein.',
    },
    {
      question: 'Tjener offshore-kapteiner mer enn cruise-kapteiner?',
      answer: 'Ja, betydelig mer. Offshore-kapteiner tjener typisk 900 000 - 1 200 000 kr+ på grunn av komplekse operasjoner, DP-systemene og rotasjonstillegg. Cruise-kapteiner ligger på 700-950 000 kr. Forskjellen skyldes ansvar, arbeidsmiljø og etterspørsel etter spesialkompetanse.',
    },
    {
      question: 'Hvilke sertifikater må en kaptein ha?',
      answer: 'Kaptein må ha STCW II/2 (Kaptein-sertifikat), GOC (General Operator Certificate), Basic Safety Training, Advanced Fire Fighting, Medical Care og SSO (Ship Security Officer). Mange skip krever også DP-sertifikater. Alle sertifikater må fornyes regelmessig, typisk hvert 5. år.',
    },
  ];

  const breadcrumbs = [
    { name: 'Hjem', url: '/' },
    { name: 'Lønn', url: '/lonn' },
    { name: 'Kaptein', url: '/lonn/kaptein' },
  ];

  return (
    <>
      <SchemaMarkup type="article" position="kaptein" pageType="lonn" />
      <SchemaMarkup type="faq" faqItems={faqs} />
      <SchemaMarkup type="breadcrumb" breadcrumbs={breadcrumbs} />
      <SchemaMarkup 
        type="speakable" 
        pageUrl="https://bluecrew.no/lonn/kaptein"
        speakableSelectors={['.summary-box', '.summary-content', 'h1']} 
      />

      {/* Hero */}
      <AnimatedHero
        title={<>Kaptein <em className="not-italic text-gold-400">Lønn</em> i Norge 2026</>}
        subtitle="Hva tjener kapteinen? Gjennomsnitt, tillegg og karrierevei."
        backgroundImage={IMAGE_PATHS.careers.kaptein}
      />

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-100">
        <Container size="md">
          <div className="py-3">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </Container>
      </div>

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
              <strong>Kapteinlønn i Norge:</strong> Gjennomsnitt {formatCurrency(850000)}/år.
              Offshore-kapteiner tjener {formatCurrency(900000)}–{formatCurrency(1200000)}+,
              cruise {formatCurrency(700000)}–{formatCurrency(950000)}.
              Krever D1-sertifikat og 10–15 års erfaring fra matros til kaptein.
            </p>
          </SummaryBox>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-slate-700 leading-relaxed mb-6">
              Å være kaptein er mer enn bare en jobb – det er kulminasjonen av
              15-20 års dedikert arbeid til sjøs. Med overordnet ansvar for skip,
              mannskap og last, reflekterer lønnen det store ansvaret som følger
              med hvite skulderstropper.
            </p>

            <p className="text-slate-700 mb-6">
              I 2026 ligger gjennomsnittslønnen for kaptein i Norge på rundt{' '}
              {formatCurrency(850000)} i året. Men dette tallet forteller bare halve
              historien. Lønnen varierer dramatisk basert på hvor du seiler, hva
              slags skip du fører, og hvor mange år du har bak deg på broen.
            </p>

            <p className="text-slate-700 mb-6">
              En fersk kaptein på et mindre kystskip kan starte på{' '}
              {formatCurrency(600000)}, mens en erfaren offshore-kaptein med
              Dynamic Positioning (DP) kompetanse og ansvar for komplekse subsea-operasjoner
              kan tjene godt over {formatCurrency(1200000)} årlig. Legger du til
              offshore-tillegg, rotasjonstillegg og overtid, kan totalen bli enda
              høyere.
            </p>

            <p className="text-slate-700">
              La oss dykke ned i hva som påvirker kapteins lønn, hvordan du kommer
              dit, og hva du realistisk kan forvente å tjene i ulike sektorer av
              norsk maritim næring.
            </p>
          </div>
        </Container>
      </Section>

      {/* Gjennomsnittlig kapteinlønn */}
      <Section variant="slate">
        <Container size="md">
          <h2 className="text-3xl font-medium text-navy mb-6">
            Gjennomsnittlig kapteinlønn i Norge
          </h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-slate-700 mb-6">
              Når vi snakker om gjennomsnittslønn for kaptein, er det viktig å
              forstå at dette er et yrke der erfaring betyr ekstremt mye. I
              motsetning til mange landbaserte jobber, der du kan nå
              gjennomsnittslønn etter 5-7 år, krever kaptein-rollen minimum 10 års
              fartstid før du i det hele tatt kan kvalifisere.
            </p>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 my-8">
              <h3 className="text-2xl font-medium text-navy mb-4">
                Lønn etter erfaring
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="font-medium text-slate-900 mb-1">
                    Nyutdannet kaptein (10-12 års totalt erfaring)
                  </p>
                  <p className="text-2xl font-bold text-sky-600 mb-2">
                    {formatCurrency(600000)} - {formatCurrency(700000)}
                  </p>
                  <p className="text-sm text-slate-600">
                    Starter ofte som kaptein på mindre skip eller som 1.
                    styrmann/kaptein på større fartøy. Bygger erfaring med
                    skipsledelse og ansvar for mannskap.
                  </p>
                </div>

                <div>
                  <p className="font-medium text-slate-900 mb-1">
                    Midt-karriere (15-18 års erfaring)
                  </p>
                  <p className="text-2xl font-bold text-sky-600 mb-2">
                    {formatCurrency(850000)} - {formatCurrency(950000)}
                  </p>
                  <p className="text-sm text-slate-600">
                    Erfaren med flere skiptype på CV-en. Kan ha spesialisert seg
                    innen offshore, havbruk eller cruise. Har bygget nettverk og
                    omdømme i bransjen.
                  </p>
                </div>

                <div>
                  <p className="font-medium text-slate-900 mb-1">
                    Senior kaptein (20+ års erfaring)
                  </p>
                  <p className="text-2xl font-bold text-sky-600 mb-2">
                    {formatCurrency(1000000)}+
                  </p>
                  <p className="text-sm text-slate-600">
                    Erfarne kapteiner på spesialiserte skip (DP-fartøy, LNG,
                    avanserte offshore-installasjoner) eller i ledende posisjoner.
                    Bred kompetanse, høyt ettertraktet.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-slate-700 mb-6">
              For å sette dette i perspektiv: Median årsinntekt i Norge ligger på
              rundt 550 000 kr (SSB, 2025). En kaptein med typisk erfaring tjener
              dermed 50-100% mer enn landsgjennomsnittet, noe som reflekterer
              kombinasjonen av lang utdanning, høyt ansvar, og tid borte fra
              familie.
            </p>

            <p className="text-slate-700">
              Men tallene over er før tillegg. Og det er i tilleggene at den
              virkelige forskjellen mellom sektorer kommer til syne.
            </p>
          </div>
        </Container>
      </Section>

      {/* Lønnsforskjeller etter sektor */}
      <Section>
        <Container size="md">
          <h2 className="text-3xl font-medium text-navy mb-6">
            Lønnsforskjeller mellom offshore, havbruk og cruise
          </h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-slate-700 mb-8">
              Valg av sektor er den enkeltfaktoren som påvirker din lønn mest som
              kaptein. La oss se på de fire hovedsektorene i norsk skipsfart.
            </p>

            {/* Offshore */}
            <div className="bg-navy/5 border-l-4 border-sky-600 p-6 mb-8">
              <h3 className="text-2xl font-medium text-navy mb-4">
                Offshore kaptein: {formatCurrency(900000)} - {formatCurrency(1200000)}+
              </h3>

              <p className="text-slate-700 mb-4">
                Offshore er kongen av maritim lønn, og det er ikke uten grunn.
                Som offshore-kaptein har du ansvar for skip som opererer i røffe
                forhold, ofte med komplekse DP-operasjoner (Dynamic Positioning) i
                direkte nærhet til installasjoner verdt milliarder av kroner.
              </p>

              <p className="text-slate-700 mb-4">
                En typisk arbeidsdag kan innebære å holde skipet stabilt innenfor
                en meter under en subsea-operasjon, koordinere med rigger, og
                håndtere væromslag på kort varsel. Du har ofte 30-60 personer ombord,
                inkludert spesialisert personell som ROV-piloter, inspektører og
                sertifikatpersonell.
              </p>

              <p className="text-slate-700 mb-4">
                <strong>Typisk rotasjon:</strong> 2 uker på, 4 uker av (2-4) eller
                4 uker på, 4 uker av (4-4). Rotasjonstillegg alene kan utgjøre
                20-30% ekstra.
              </p>

              <p className="text-slate-700">
                <strong>Offshore-tillegg:</strong> I tillegg kommer offshore-tillegg
                på 25-40% av grunnlønn, som kompenserer for krevende arbeidsforhold
                og risiko. Dette gjør at en offshore-kaptein med {formatCurrency(800000)}{' '}
                i grunnlønn ender opp med godt over {formatCurrency(1000000)} i
                total årslønn.
              </p>
            </div>

            {/* Havbruk */}
            <div className="bg-sky-50 border-l-4 border-sky-600 p-6 mb-8">
              <h3 className="text-2xl font-medium text-navy mb-4">
                Havbruk kaptein: {formatCurrency(750000)} - {formatCurrency(950000)}
              </h3>

              <p className="text-slate-700 mb-4">
                Havbruk er Norges voksende sektor, og behovet for kvalifiserte
                kapteiner på brønnbåter, fôrbåter og servicefartøy er enormt.
                Lønnen ligger like under offshore, men med bedre rotasjonsordninger
                for mange.
              </p>

              <p className="text-slate-700 mb-4">
                Som havbruk-kaptein har du ansvar for levende last – millioner av
                kroner i laksesmolt eller matfisk – og miljøansvar er kritisk.
                Moderne brønnbåter er høyteknologiske fartøy med avanserte
                oksygen-systemer, temperaturkontroll og live-monitoring.
              </p>

              <p className="text-slate-700 mb-4">
                <strong>Typisk rotasjon:</strong> 2 uker på, 3 uker av eller 1 uke
                på, 1 uke av for noen ruter. Dette gjør havbruk attraktivt for de
                som ønsker mer tid hjemme.
              </p>

              <p className="text-slate-700">
                Lønnen har steget kraftig de siste årene på grunn av mangel på
                kvalifiserte folk. Erfarne havbruk-kapteiner er høyt ettertraktet,
                og mange rederier tilbyr konkurransedyktige pakker for å beholde
                kompetansen.
              </p>
            </div>

            {/* Cruise */}
            <div className="bg-slate-50 border-l-4 border-slate-400 p-6 mb-8">
              <h3 className="text-2xl font-medium text-navy mb-4">
                Cruise kaptein: {formatCurrency(700000)} - {formatCurrency(950000)}
              </h3>

              <p className="text-slate-700 mb-4">
                Cruise-kaptein er en helt annen type lederrolle. I tillegg til
                skipsteknisk ansvar, er du ansiktet utad for selskapet, møter
                passasjerer, holder taler, og representerer rederiet. Det er et
                prestisjetungt yrke, men med andre krav enn offshore.
              </p>

              <p className="text-slate-700 mb-4">
                Norske cruise-selskap som Hurtigruten, Havila og internasjonale
                operatører langs norskekysten betaler godt, men med sesongvariasjoner.
                Sommermånedene er hektiske med full booking, mens vintersesongen kan
                være roligere.
              </p>

              <p className="text-slate-700 mb-4">
                <strong>Typisk rotasjon:</strong> 6-8 uker på, 6-8 uker av. Lengre
                perioder, men forutsigbar turnus.
              </p>

              <p className="text-slate-700">
                Lønn varierer også med skipets størrelse. Kaptein på et stort
                cruiseskip med 400+ passasjerer tjener mer enn kaptein på et mindre
                ekspedisjonsskip med 100 passasjerer, selv om begge er krevende
                roller.
              </p>
            </div>

            {/* Tankskip/Lasteskip */}
            <div className="bg-slate-50 border-l-4 border-slate-400 p-6 mb-8">
              <h3 className="text-2xl font-medium text-navy mb-4">
                Tankskip og lasteskip: {formatCurrency(650000)} - {formatCurrency(900000)}
              </h3>

              <p className="text-slate-700 mb-4">
                Tradisjonell shipping – tankskip, bulkskip, containerskip – er den
                mest stabile delen av næringen. Lønnen er solid, men ofte litt
                lavere enn offshore og havbruk. Fordelen er forutsigbarhet og
                etablerte karriereveier.
              </p>

              <p className="text-slate-700 mb-4">
                Spesialiserte skip som LNG-tankere, kjemikalietankere eller
                spesialfraktskip betaler bedre enn standard bulkskip. Hvis skipet
                er DIS-registrert (Norsk Internasjonalt Skipsregister), kan du også
                få skattefordeler på inntekt opptjent i internasjonalt farvann.
              </p>

              <p className="text-slate-700 mb-4">
                <strong>Typisk rotasjon:</strong> Varierer stort. Internasjonale
                ruter kan ha 3-4 måneder på, 2-3 måneder av, mens kystnære ruter
                kan ha kortere turnuser.
              </p>

              <p className="text-slate-700">
                For de som vil ha internasjonal erfaring, eksotiske havner og lang
                fartstid, er dette en attraktiv vei. Lønnen er god, selv om den
                ikke matcher offshore-toppen.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Karrierevei */}
      <Section variant="slate">
        <Container size="md">
          <h2 className="text-3xl font-medium text-navy mb-6">
            Karriereveien til kaptein – og hva du tjener underveis
          </h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-slate-700 mb-6">
              Ingen starter som kaptein. Veien dit går gjennom dekksavdelingen,
              gjennom nautisk utdanning, og gjennom fem distinkte offisersnivåer.
              La oss se på den typiske karrierestigen – og hva du kan forvente å
              tjene på hvert trinn.
            </p>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 my-8">
              <h3 className="text-xl font-medium text-navy mb-4">
                Typisk karriereprogresjon (10-15 år)
              </h3>

              <ol className="space-y-6">
                <li>
                  <strong className="text-navy">1. Matros (0-2 år erfaring)</strong>
                  <p className="text-slate-700 mt-1 mb-2">
                    Startpunkt for de fleste nautiske karrierer. Du lærer
                    dekksarbeid, fortøyning, vakthold. Lønn: {formatCurrency(420000)} - {formatCurrency(550000)}.
                  </p>
                </li>

                <li>
                  <strong className="text-navy">2. Lettmatros (1-3 års erfaring)</strong>
                  <p className="text-slate-700 mt-1 mb-2">
                    Bygger erfaring, tar ansvar for mer avanserte oppgaver. Ofte
                    samtidig med nautisk fagskole. Lønn: {formatCurrency(450000)} - {formatCurrency(580000)}.
                  </p>
                </li>

                <li>
                  <strong className="text-navy">3. Tredje styrmann (3-5 års erfaring)</strong>
                  <p className="text-slate-700 mt-1 mb-2">
                    Første offisersposisjon. Ansvar for sikkerhetsutstyr, stå
                    brovakt, assistere øvrige styrmenn. Lønn: {formatCurrency(500000)} - {formatCurrency(650000)}.
                  </p>
                </li>

                <li>
                  <strong className="text-navy">4. Andre styrmann (5-8 års erfaring)</strong>
                  <p className="text-slate-700 mt-1 mb-2">
                    Navigasjonsansvarlig, kartarbeid, vakthavende offiser. Mer
                    selvstendig. Lønn: {formatCurrency(580000)} - {formatCurrency(750000)}.
                  </p>
                </li>

                <li>
                  <strong className="text-navy">5. Første styrmann (8-12 års erfaring)</strong>
                  <p className="text-slate-700 mt-1 mb-2">
                    Kapteinens stedfortreder, overordnet ansvar for dekksoperasjoner
                    og last. Lønn: {formatCurrency(700000)} - {formatCurrency(900000)}.
                  </p>
                </li>

                <li>
                  <strong className="text-navy">6. Kaptein (12+ års erfaring)</strong>
                  <p className="text-slate-700 mt-1 mb-2">
                    Øverste ansvarlig for skip, mannskap og last. Full lederrolle.
                    Lønn: {formatCurrency(800000)} - {formatCurrency(1200000)}+.
                  </p>
                </li>
              </ol>
            </div>

            <p className="text-slate-700 mb-6">
              Dette er en gjennomsnittskarriere. Noen går raskere gjennom systemet
              hvis de tar utdanning intensivt og får mye fartstid raskt. Andre
              bruker lengre tid, kanskje fordi de jobber deltid eller tar pauser.
            </p>

            <p className="text-slate-700">
              Men uansett tempo: Det er ingen snarveier til kaptein. Du MÅ gjennom
              trinnene, du MÅ ha fartstiden dokumentert, og du MÅ bestå eksamen på
              hvert nivå. Når du endelig når toppen, har du tjent det – både i
              erfaring og i lønn.
            </p>
          </div>
        </Container>
      </Section>

      {/* Tillegg og bonuser */}
      <Section>
        <Container size="md">
          <h2 className="text-3xl font-medium text-navy mb-6">
            Tillegg og bonuser som øker totallønnen
          </h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-slate-700 mb-6">
              Grunnlønn er bare en del av historien. Som kaptein er det en rekke
              tillegg og godtgjørelser som kan øke årsinntekten betydelig.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-sky-50 p-6 rounded-lg">
                <h4 className="font-medium text-navy mb-2">Rotasjonstillegg</h4>
                <p className="text-slate-700 text-sm">
                  Kompensasjon for tid borte fra familie. Typisk 15-30% av
                  grunnlønn avhengig av rotasjon. 2-4 offshore gir høyere tillegg
                  enn 1-1 kystnært.
                </p>
              </div>

              <div className="bg-sky-50 p-6 rounded-lg">
                <h4 className="font-medium text-navy mb-2">Offshore-tillegg</h4>
                <p className="text-slate-700 text-sm">
                  Spesielt for offshore-sektoren. 20-40% ekstra på grunn av
                  krevende arbeidsforhold, risiko, og høy kompetansekrav. Dette
                  tillegget alene kan utgjøre 150-300 000 kr i året.
                </p>
              </div>

              <div className="bg-sky-50 p-6 rounded-lg">
                <h4 className="font-medium text-navy mb-2">Ansvarstillegg</h4>
                <p className="text-slate-700 text-sm">
                  For spesialiserte skip (DP-fartøy, tankskip med farlig last)
                  eller ekstra ansvar. Varierer, men kan være 50-100 000 kr årlig.
                </p>
              </div>

              <div className="bg-sky-50 p-6 rounded-lg">
                <h4 className="font-medium text-navy mb-2">Kostgodtgjørelse</h4>
                <p className="text-slate-700 text-sm">
                  Kost og losji dekkes når du er ombord. Dette er ikke direkte
                  lønn, men reduserer levekostnader dramatisk og øker disponibel
                  inntekt.
                </p>
              </div>
            </div>

            <p className="text-slate-700 mb-6">
              <strong>Eksempel:</strong> En offshore-kaptein med {formatCurrency(800000)}{' '}
              i grunnlønn, 2-4 rotasjon (25% tillegg) og offshore-tillegg (30%)
              ender på:
            </p>

            <div className="bg-white border border-slate-200 rounded-lg p-6 my-6">
              <p className="text-slate-700 mb-2">
                Grunnlønn: <span className="font-medium">{formatCurrency(800000)}</span>
              </p>
              <p className="text-slate-700 mb-2">
                Rotasjonstillegg (25%): <span className="font-medium">+ {formatCurrency(200000)}</span>
              </p>
              <p className="text-slate-700 mb-4">
                Offshore-tillegg (30%): <span className="font-medium">+ {formatCurrency(240000)}</span>
              </p>
              <p className="text-xl font-bold text-navy">
                Total årslønn: {formatCurrency(1240000)}
              </p>
            </div>

            <p className="text-slate-700">
              Dette er hvorfor offshore-kapteiner ligger i toppen av lønnsstigen.
              Tilleggene er substansielle, og de kompenserer for krevende
              arbeidsforhold og lang tid borte fra familie.
            </p>
          </div>
        </Container>
      </Section>

      {/* Skatt og netto */}
      <Section variant="slate">
        <Container size="md">
          <h2 className="text-3xl font-medium text-navy mb-6">
            Skatt og netto lønn – hva sitter du igjen med?
          </h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-slate-700 mb-6">
              Alle tall vi har diskutert så langt er bruttolønn før skatt. Men som
              sjømann har du faktisk noen skattefordeler som kan gjøre en stor
              forskjell.
            </p>

            <h3 className="text-xl font-medium text-navy mb-4">
              DIS-skip og skattefritak
            </h3>
            <p className="text-slate-700 mb-6">
              Skip registrert i Norsk Internasjonalt Skipsregister (NIS/DIS) kan
              gi skattefritak på inntekt opptjent i internasjonalt farvann. Dette
              gjelder primært lasteskip, tankskip og noen offshorefartøy på
              internasjonale kontrakter.
            </p>

            <p className="text-slate-700 mb-6">
              Hvis du seiler på et DIS-skip og er ute i minst 130 dager i året,
              kan en stor del av inntekten bli skattefri. Dette er en betydelig
              fordel, men gjelder IKKE for skip i norsk innenriksfart (som mange
              havbruk- og kystfartøy).
            </p>

            <h3 className="text-xl font-medium text-navy mb-4">
              Sjømannsfradrag
            </h3>
            <p className="text-slate-700 mb-6">
              Alle sjøfolk i norsk skipsfart kan kreve sjømannsfradrag på
              selvangivelsen. Dette er et standardfradrag som reduserer
              skattegrunnlaget, og kan utgjøre 10-30 000 kr i redusert skatt
              avhengig av fartstid.
            </p>

            <h3 className="text-xl font-medium text-navy mb-4">
              Estimat netto lønn
            </h3>
            <p className="text-slate-700 mb-6">
              For en kaptein med {formatCurrency(850000)} i bruttolønn på et
              NOR-registrert skip (normal norsk skatt), vil du typisk sitte igjen
              med 60-65% netto etter skatt og avgifter. Det tilsvarer rundt{' '}
              {formatCurrency(510000)} - {formatCurrency(550000)} i netto årlig.
            </p>

            <p className="text-slate-700 mb-6">
              Hvis du derimot seiler DIS-skip med skattefritak, kan netto lønn
              komme opp i 75-85% av brutto, altså {formatCurrency(640000)} -{' '}
              {formatCurrency(720000)} netto. Det er en massiv forskjell.
            </p>

            <p className="text-slate-700">
              Kombiner dette med at du har minimal levekostnad når du er ombord
              (kost og losji dekket), og du har en svært attraktiv økonomisk
              pakke.
            </p>
          </div>
        </Container>
      </Section>

      {/* Jobbmarked */}
      <Section>
        <Container size="md">
          <h2 className="text-3xl font-medium text-navy mb-6">
            Jobbmarkedet for kapteiner i 2026
          </h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-slate-700 mb-6">
              Det er én ting å vite hva kapteiner tjener – en annen å vite om det
              faktisk er jobber tilgjengelig. Og her er nyheten god:
            </p>

            <p className="text-slate-700 mb-6">
              <strong>Det er mangel på kvalifiserte norske kapteiner.</strong> Spesielt
              innen offshore og havbruk er etterspørselen høyere enn tilbudet.
              Rederier sliter med å rekruttere, og konkurransen om de beste folkene
              er hard.
            </p>

            <p className="text-slate-700 mb-6">
              Årsaken er todelt: For det første – det tar 10-15 år å utdanne en
              kaptein, så du kan ikke bare &ldquo;ansette flere&rdquo; over natten. For det
              andre – norsk sokkel og havbruk vokser raskere enn tilgangen på
              kvalifisert mannskap.
            </p>

            <p className="text-slate-700 mb-6">
              Dette betyr at hvis du er kvalifisert kaptein, er du i førersetet.
              Du kan velge mellom rederier, du kan forhandle lønn og betingelser,
              og du har jobbtrygghet de neste 10-15 årene.
            </p>

            <p className="text-slate-700 mb-6">
              De beste mulighetene akkurat nå er:
            </p>

            <ul className="space-y-2 mb-6">
              <li><strong>Offshore:</strong> Ekspanderende norsk sokkel, spesielt innen offshore vind</li>
              <li><strong>Havbruk:</strong> Norges voksende eksportnæring, nytt utstyr, høyt behov</li>
              <li><strong>Spesialiserte fartøy:</strong> DP-skip, ROV-fartøy, forskningsskip</li>
            </ul>

            <p className="text-slate-700">
              Cruise og tradisjonell shipping er mer stabil, men med lavere
              vekst. Hvis du vil ha høyest lønn og best jobbtilgang, er offshore
              og havbruk veien å gå i 2026.
            </p>
          </div>
        </Container>
      </Section>

      {/* Konklusjon */}
      <Section variant="navy">
        <Container size="md">
          <div className="text-cream-100">
            <h2 className="text-3xl font-medium mb-6 text-cream-50">
              Oppsummering: Hva tjener en kaptein i Norge?
            </h2>

            <div className="prose prose-lg max-w-none prose-invert">
              <p className="mb-6">
                Gjennomsnittlig kapteinlønn i Norge er {formatCurrency(850000)} i
                året, men dette varierer enormt basert på sektor, erfaring og
                skiptype. Offshore-kapteiner ligger i toppen med over{' '}
                {formatCurrency(1200000)}, mens kapteiner på mindre skip starter på{' '}
                {formatCurrency(600000)}.
              </p>

              <p className="mb-6">
                Veien til kaptein tar 10-15 år, gjennom nautisk fagskole, fartstid
                og opparbeidelse fra matros via styrmenn til kaptein. Det er ingen
                snarveier, men lønnen og ansvaret reflekterer den lange reisen.
              </p>

              <p className="mb-6">
                Tillegg som rotasjonstillegg, offshore-tillegg og ansvarstillegg
                kan utgjøre 30-50% av grunnlønnen. Kombinert med skattefordeler
                (sjømannsfradrag, eventuelt DIS-skip), sitter du igjen med svært
                god netto lønn.
              </p>

              <p>
                Jobbmarkedet er sterkt i 2026, spesielt for erfarne kapteiner innen
                offshore og havbruk. Hvis du har kompetansen, er det arbeidsgiver
                som må selge seg inn til deg – ikke omvendt.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section variant="slate">
        <Container size="md">
          <h2 className="text-3xl font-medium text-navy mb-8 text-center">
            Ofte stilte spørsmål om kaptein-lønn
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="bg-white rounded-lg border border-slate-200 p-6 hover:border-sky-300 transition-colors"
              >
                <summary className="font-medium text-slate-900 cursor-pointer select-none">
                  {faq.question}
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section>
        <Container size="md">
          <div className="bg-sky-50 rounded-lg p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-medium text-navy mb-4">
              Interessert i kaptein-stillinger?
            </h2>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Bluecrew formidler kvalifiserte kapteiner til norske rederier innen
              offshore, havbruk og shipping. Registrer deg i vår database og bli
              kontaktet når relevante stillinger blir ledige.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/meld-interesse"
                className="inline-block bg-navy text-white px-8 py-3 rounded-md font-medium hover:bg-navy-dark transition-colors"
              >
                Registrer deg som kaptein
              </Link>
              <Link
                href="/lonn"
                className="inline-block bg-white text-navy border-2 border-navy px-8 py-3 rounded-md font-medium hover:bg-slate-50 transition-colors"
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

