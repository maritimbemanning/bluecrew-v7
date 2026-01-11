import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SummaryBox from '@/components/ui/SummaryBox';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { formatCurrency } from '@/lib/utils';
import { AnimatedHero } from '@/components/animated';
import { IMAGE_PATHS } from '@/lib/images';

const breadcrumbs = [
  { name: 'Hjem', url: '/' },
  { name: 'Lønn', url: '/lonn' },
  { name: 'Styrmann', url: '/lonn/styrmann' },
];

export const metadata: Metadata = {
  title: 'Styrmann Lønn 2026 – Hva tjener en navigatør?',
  description: 'Gjennomsnittlig styrmannlønn i Norge er 620 000 kr. Se forskjeller mellom 1., 2. og 3. styrmann. Offshore, havbruk og cruise-lønn sammenlignet.',
  keywords: ['styrmann lønn', 'navigatør lønn', 'styrmann lønn Norge', 'hva tjener en styrmann', '1. styrmann lønn'],
  openGraph: {
    title: 'Styrmann Lønn i Norge 2026',
    description: 'Gjennomsnittlig lønn 620 000 kr. Se lønnsforskjeller mellom 1., 2. og 3. styrmann.',
    url: 'https://bluecrew.no/lonn/styrmann',
    siteName: 'Bluecrew AS',
    locale: 'nb_NO',
    type: 'article',
  },
  alternates: {
    canonical: 'https://bluecrew.no/lonn/styrmann',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function StyrmannLonnPage() {
  const faqs = [
    {
      question: 'Hvor mye tjener en styrmann i Norge?',
      answer: 'Gjennomsnittlig styrmannlønn i Norge er 620 000 kr årlig. 3. styrmann starter på 500-600 000 kr, 2. styrmann tjener 580-700 000 kr, mens 1. styrmann (overstyrmann) kan tjene 700-900 000 kr. Offshore-styrmenn ligger øverst i lønnsskalaen.',
    },
    {
      question: 'Hva er forskjellen på 1., 2. og 3. styrmann?',
      answer: '3. styrmann er ansvarlig for sikkerhetsutstyr og assisterer i brovakt. 2. styrmann har navigasjonsansvar og leder vakthavende mannskap. 1. styrmann (overstyrmann) er kapteinens stedfortreder med overordnet ansvar for dekksoperasjoner og lasting/lossing. Lønn og ansvar øker betydelig for hver rang.',
    },
    {
      question: 'Hvor lang tid tar det å bli 1. styrmann?',
      answer: 'Fra matros til 1. styrmann tar det typisk 8-12 år. Du må gjennom lettmatros, 3. styrmann og 2. styrmann før du kan kvalifisere til 1. styrmann. Hvert trinn krever ny utdanning, sertifikater og dokumentert fartstid. De fleste er 30-35 år når de blir 1. styrmann.',
    },
    {
      question: 'Tjener offshore-styrmann mer enn cruise-styrmann?',
      answer: 'Ja, betydelig mer. Offshore-styrmenn tjener typisk 15-30% mer enn cruise-styrmenn på samme nivå, på grunn av rotasjonstillegg, offshore-tillegg og krevende arbeidsforhold. 1. styrmann offshore kan tjene 800-900 000 kr, mens cruise ligger på 650-750 000 kr.',
    },
    {
      question: 'Kan man bli kaptein uten å være styrmann først?',
      answer: 'Nei, det er ingen snarvei til kaptein. Du må gå gjennom alle styrmannsrangene (3., 2., 1.) med påkrevd fartstid og utdanning på hvert nivå. Dette sikrer at kapteinen har allsidig erfaring fra alle aspekter av skipsdrift og ledelse.',
    },
  ];

  return (
    <>
      <SchemaMarkup type="article" position="styrmann" pageType="lonn" />
      <SchemaMarkup type="faq" faqItems={faqs} />
      <SchemaMarkup type="breadcrumb" breadcrumbs={breadcrumbs} />

      {/* Hero */}
      <AnimatedHero
        title={<>Styrmann <em className="not-italic text-gold-400">Lønn</em> i Norge 2026</>}
        subtitle="Fra 3. styrmann til overstyrmann – lønn, ansvar og karriere."
        backgroundImage={IMAGE_PATHS.careers.styrmann}
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
              <strong>Styrmannlønn i Norge:</strong> Gjennomsnitt 620 000 kr/år.
              1. styrmann (overstyrmann) tjener 700 000–900 000 kr,
              2. styrmann 580 000–750 000 kr.
              Offshore og havbruk betaler best. Krever nautisk utdanning.
            </p>
          </SummaryBox>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-slate-700 leading-relaxed mb-6">
              Styrmann er ryggraden i et skipets offiserskorps. Mens kapteinen er
              øverste sjef, er det styrmennene som holder hjulene i gang – de står
              brovakt, navigerer, håndterer last, og leder dekksmannskapet gjennom
              en travel arbeidsdag.
            </p>

            <p className="text-slate-700 mb-6">
              Men &ldquo;styrmann&rdquo; er ikke én stilling – det er tre distinkte nivåer med
              helt ulike ansvarsområder, kompetansekrav og lønnsnivåer. Tredje
              styrmann er ofte fersk fra nautisk fagskole med begrenset erfaring.
              Første styrmann er kapteinens høyre hånd, med 10+ års fartstid og
              ansvar for komplekse operasjoner.
            </p>

            <p className="text-slate-700 mb-6">
              I 2026 ligger gjennomsnittslønnen for styrmann på rundt{' '}
              {formatCurrency(620000)} årlig, men dette tallet skjuler enorme
              variasjoner. En tredje styrmann på et mindre kystfartøy kan starte på{' '}
              {formatCurrency(500000)}, mens en første styrmann på et avansert
              offshore DP-fartøy kan tjene godt over {formatCurrency(850000)}.
            </p>

            <p className="text-slate-700">
              I denne artikkelen går vi grundig gjennom hva styrmenn tjener på ulike
              nivåer, i ulike sektorer, og hvordan du bygger karrieren fra tredje til
              første styrmann – og videre mot kaptein.
            </p>
          </div>
        </Container>
      </Section>

      {/* Lønn etter rang */}
      <Section variant="slate">
        <Container size="md">
          <h2 className="text-3xl font-medium text-navy mb-6">
            Styrmannlønn etter rang – 3., 2. og 1. styrmann
          </h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-slate-700 mb-8">
              Det første du må forstå om styrmannlønn er at rang betyr alt. Det er
              ikke bare tittel – det er fundamentalt forskjellige roller med ulike
              ansvar, sertifikatkrav og lønnsnivåer.
            </p>

            {/* 3. styrmann */}
            <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-sky-600 mb-6">
              <h3 className="text-2xl font-medium text-navy mb-4">
                3. Styrmann (Tredje navigatør)
              </h3>

              <p className="text-3xl font-bold text-sky-600 mb-4">
                {formatCurrency(500000)} - {formatCurrency(650000)}
              </p>

              <p className="text-slate-700 mb-4">
                Tredje styrmann er din første offisersposisjon etter å ha vært
                matros/lettmatros. Du har fullført nautisk fagskole, bestått STCW
                II/2 eksamen for vakthavende navigatør, og er klar for å lære
                offisersrollen fra bunnen av.
              </p>

              <div className="bg-sky-50 p-4 rounded mb-4">
                <p className="font-medium text-navy mb-2">Hovedansvar:</p>
                <ul className="space-y-1 text-sm text-slate-700">
                  <li>• Sikkerhetsutstyr (brannslukningsutstyr, redningsutstyr)</li>
                  <li>• Assistere senior styrmenn med brovakt</li>
                  <li>• Vedlikehold av dekk og utstyr</li>
                  <li>• Lære navigasjon og skipsledelse under veiledning</li>
                </ul>
              </div>

              <p className="text-slate-700 mb-4">
                Som tredje styrmann er du nederst i offisershierarkiet, men det er
                her du bygger fundamentet. Du lærer hvordan et skip drives, hvordan
                du leder mannskap, og hvordan du håndterer ansvar under press.
              </p>

              <p className="text-slate-700">
                <strong>Erfaring:</strong> 3-5 år totalt (inkludert tid som matros).
                De fleste er 25-28 år.
              </p>
            </div>

            {/* 2. styrmann */}
            <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-sky-600 mb-6">
              <h3 className="text-2xl font-medium text-navy mb-4">
                2. Styrmann (Andre navigatør)
              </h3>

              <p className="text-3xl font-bold text-sky-600 mb-4">
                {formatCurrency(580000)} - {formatCurrency(750000)}
              </p>

              <p className="text-slate-700 mb-4">
                Andre styrmann er navigasjonsansvarlig ombord. Du har opparbeidet
                flere års erfaring som tredje styrmann, tatt videreutdanning, og er
                nå klar for mer selvstendig ansvar.
              </p>

              <div className="bg-sky-50 p-4 rounded mb-4">
                <p className="font-medium text-navy mb-2">Hovedansvar:</p>
                <ul className="space-y-1 text-sm text-slate-700">
                  <li>• Navigasjonsplanlegging og kartarbeid</li>
                  <li>• Vakthavende offiser med selvstendig brovakt</li>
                  <li>• Oppdatere elektroniske og papirkart</li>
                  <li>• Koordinere med loser og havnemyndigheter</li>
                  <li>• Lede dekksmannskap under operasjoner</li>
                </ul>
              </div>

              <p className="text-slate-700 mb-4">
                Som andre styrmann har du mer frihet, men også mer ansvar. Du står
                brovakt alene på nattskift, du tar beslutninger om kursjusteringer,
                og du må kunne håndtere nødsituasjoner uten å vekke kapteinen for
                hvert lite avvik.
              </p>

              <p className="text-slate-700">
                <strong>Erfaring:</strong> 5-8 år totalt. De fleste er 28-32 år når
                de blir 2. styrmann.
              </p>
            </div>

            {/* 1. styrmann */}
            <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-navy mb-6">
              <h3 className="text-2xl font-medium text-navy mb-4">
                1. Styrmann / Overstyrmann (Chief Officer)
              </h3>

              <p className="text-3xl font-bold text-sky-600 mb-4">
                {formatCurrency(700000)} - {formatCurrency(900000)}
              </p>

              <p className="text-slate-700 mb-4">
                Første styrmann – også kalt overstyrmann eller Chief Officer – er
                kapteinens stedfortreder og nest øverste offiser ombord. Dette er en
                lederrolle med betydelig ansvar og tilsvarende lønn.
              </p>

              <div className="bg-navy/5 p-4 rounded mb-4">
                <p className="font-medium text-navy mb-2">Hovedansvar:</p>
                <ul className="space-y-1 text-sm text-slate-700">
                  <li>• Overordnet ansvar for dekksoperasjoner</li>
                  <li>• Laste- og losseoperasjoner (kritisk på tankskip)</li>
                  <li>• Personalleder for dekksavdelingen</li>
                  <li>• Kapteinens stedfortreder i alle sammenhenger</li>
                  <li>• Koordinere vedlikehold og planlegge verftopphold</li>
                  <li>• Sikkerhetsledelse og HMS-ansvar</li>
                </ul>
              </div>

              <p className="text-slate-700 mb-4">
                Som overstyrmann er du den kapteinen overlater mest til. Hvis
                kapteinen er opptatt med administrasjon eller møter, er det du som
                leder daglig drift. Hvis kapteinen blir syk, overtar du umiddelbart.
                Dette er siste trinn før kaptein.
              </p>

              <p className="text-slate-700">
                <strong>Erfaring:</strong> 8-12 år totalt. De fleste er 32-38 år når
                de blir 1. styrmann. Mange forblir i denne rollen i flere år før de
                eventuelt går videre til kaptein.
              </p>
            </div>

            <p className="text-slate-700">
              Som du ser er lønnsøkningen betydelig for hvert trinn. Fra tredje til
              første styrmann kan lønnen nesten dobles – ikke bare fordi ansvaret
              øker, men fordi du har bevist at du mestrer komplekse situasjoner og
              kan lede mannskap effektivt.
            </p>
          </div>
        </Container>
      </Section>

      {/* Sektorforskjeller */}
      <Section>
        <Container size="md">
          <h2 className="text-3xl font-medium text-navy mb-6">
            Lønnsforskjeller mellom offshore, havbruk og cruise
          </h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-slate-700 mb-8">
              Akkurat som for kapteiner, varierer styrmannlønn enormt mellom
              sektorer. La oss se på hva du kan forvente i de fire hovedområdene.
            </p>

            {/* Offshore */}
            <div className="bg-navy/5 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-medium text-navy mb-3">
                Offshore-styrmann
              </h3>

              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="bg-white p-4 rounded border border-slate-200">
                  <p className="text-sm text-slate-600 mb-1">3. styrmann</p>
                  <p className="text-lg font-bold text-navy">
                    {formatCurrency(550000)} - {formatCurrency(700000)}
                  </p>
                </div>
                <div className="bg-white p-4 rounded border border-slate-200">
                  <p className="text-sm text-slate-600 mb-1">2. styrmann</p>
                  <p className="text-lg font-bold text-navy">
                    {formatCurrency(650000)} - {formatCurrency(800000)}
                  </p>
                </div>
                <div className="bg-white p-4 rounded border border-slate-200">
                  <p className="text-sm text-slate-600 mb-1">1. styrmann</p>
                  <p className="text-lg font-bold text-navy">
                    {formatCurrency(750000)} - {formatCurrency(950000)}
                  </p>
                </div>
              </div>

              <p className="text-slate-700 mb-4">
                Offshore er toppen av lønnsskalaen for styrmenn. Med 2-4 eller 4-4
                rotasjon, offshore-tillegg på 25-35%, og rotasjonstillegg, kan
                totallønnen bli vesentlig høyere enn grunnlønnen.
              </p>

              <p className="text-slate-700">
                Spesielt verdifullt er DP-kompetanse (Dynamic Positioning). En 1.
                styrmann med DP Unlimited sertifikat på et avansert subsea-fartøy kan
                forhandle seg opp mot {formatCurrency(900000)} - {formatCurrency(950000)}.
              </p>
            </div>

            {/* Havbruk */}
            <div className="bg-sky-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-medium text-navy mb-3">
                Havbruk-styrmann
              </h3>

              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="bg-white p-4 rounded border border-slate-200">
                  <p className="text-sm text-slate-600 mb-1">3. styrmann</p>
                  <p className="text-lg font-bold text-navy">
                    {formatCurrency(520000)} - {formatCurrency(650000)}
                  </p>
                </div>
                <div className="bg-white p-4 rounded border border-slate-200">
                  <p className="text-sm text-slate-600 mb-1">2. styrmann</p>
                  <p className="text-lg font-bold text-navy">
                    {formatCurrency(600000)} - {formatCurrency(750000)}
                  </p>
                </div>
                <div className="bg-white p-4 rounded border border-slate-200">
                  <p className="text-sm text-slate-600 mb-1">1. styrmann</p>
                  <p className="text-lg font-bold text-navy">
                    {formatCurrency(700000)} - {formatCurrency(850000)}
                  </p>
                </div>
              </div>

              <p className="text-slate-700 mb-4">
                Havbruk vokser raskt, og konkurransen om gode styrmenn er hard.
                Mange havbruk-rederier tilbyr nå konkurransedyktige lønninger for å
                tiltrekke seg kompetanse fra offshore og andre sektorer.
              </p>

              <p className="text-slate-700">
                Fordelen med havbruk er ofte bedre rotasjonsordninger – mange har
                2-3 eller til og med 1-1 turnus, som gir mer tid hjemme sammenlignet
                med offshore.
              </p>
            </div>

            {/* Cruise og Shipping */}
            <div className="bg-slate-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-medium text-navy mb-3">
                Cruise og Shipping
              </h3>

              <p className="text-slate-700 mb-4">
                Tradisjonell shipping (lasteskip, tankskip, cruise) ligger noe
                lavere i lønn, men tilbyr stabile karriereveier og internasjonal
                erfaring. Lønnen varierer også sterkt med rederi og skiptype.
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="bg-white p-4 rounded border border-slate-200">
                  <p className="text-sm text-slate-600 mb-1">3. styrmann</p>
                  <p className="text-lg font-bold text-navy">
                    {formatCurrency(480000)} - {formatCurrency(600000)}
                  </p>
                </div>
                <div className="bg-white p-4 rounded border border-slate-200">
                  <p className="text-sm text-slate-600 mb-1">2. styrmann</p>
                  <p className="text-lg font-bold text-navy">
                    {formatCurrency(550000)} - {formatCurrency(700000)}
                  </p>
                </div>
                <div className="bg-white p-4 rounded border border-slate-200">
                  <p className="text-sm text-slate-600 mb-1">1. styrmann</p>
                  <p className="text-lg font-bold text-navy">
                    {formatCurrency(650000)} - {formatCurrency(800000)}
                  </p>
                </div>
              </div>

              <p className="text-slate-700">
                Cruise-styrmenn har en unik rolle – i tillegg til navigasjon og
                skipsdrift, er du også representant for selskapet overfor passasjerer.
                Dette krever gode sosiale ferdigheter og serviceinnstilling.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Karrierevei */}
      <Section variant="slate">
        <Container size="md">
          <h2 className="text-3xl font-medium text-navy mb-6">
            Fra 3. styrmann til kaptein – karriereveien
          </h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-slate-700 mb-6">
              Styrmann er ikke et endepunkt – det er en gjennomgangsfase på veien
              mot kaptein. La oss se på hvordan karrieren normalt utvikler seg, og
              hva som kreves for hvert steg.
            </p>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
              <h3 className="text-xl font-medium text-navy mb-4">
                Typisk karriereprogresjon (8-15 år til kaptein)
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-sky-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-navy">
                      Matros/Lettmatros (0-3 år)
                    </p>
                    <p className="text-sm text-slate-600">
                      Bygge fartstid, fullføre nautisk fagskole, lære dekksarbeid.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-sky-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-navy">
                      3. Styrmann (3-5 år erfaring)
                    </p>
                    <p className="text-sm text-slate-600">
                      Første offisersposisjon. Lære navigasjon, skipsledelse, sikkerhet.
                      Minimum 18 måneders fartstid som vakthavende navigatør kreves.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-sky-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-navy">
                      2. Styrmann (5-8 år erfaring)
                    </p>
                    <p className="text-sm text-slate-600">
                      Navigasjonsansvarlig. Selvstendig brovakt, mer komplekse oppgaver.
                      Krever ytterligere kurs og minst 12 måneders fartstid som 3. styrmann.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-sky-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">
                    4
                  </div>
                  <div>
                    <p className="font-medium text-navy">
                      1. Styrmann (8-12 år erfaring)
                    </p>
                    <p className="text-sm text-slate-600">
                      Kapteinens stedfortreder. Overordnet ansvar for dekksoperasjoner.
                      Krever minst 18 måneders fartstid som navigasjonsansvarlig.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-navy text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">
                    5
                  </div>
                  <div>
                    <p className="font-medium text-navy">
                      Kaptein (12+ år erfaring)
                    </p>
                    <p className="text-sm text-slate-600">
                      Øverste leder. Krever sertifikat som kaptein og minst 18 måneders
                      fartstid som 1. styrmann. De fleste er 35-40 år når de blir kaptein.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-slate-700 mt-6 mb-6">
              Merk at fartstidskravene er <strong>minimum</strong>. De fleste bruker
              lengre tid på hvert nivå for å bygge erfaring og modenhet. Det er
              ingen gevinst i å stresse gjennom systemet – kapteiner som har bred
              erfaring fra ulike skip og situasjoner er langt mer ettertraktet enn
              de som bare har minimumskravene.
            </p>

            <p className="text-slate-700">
              Mange velger også å bli værende som 1. styrmann i flere år. Det er en
              svært attraktiv posisjon – høy lønn, betydelig ansvar, men uten
              kapteinens ultimate press. Noen foretrekker å være kapteinens høyre
              hånd fremfor å være kapteinen selv.
            </p>
          </div>
        </Container>
      </Section>

      {/* Tillegg */}
      <Section>
        <Container size="md">
          <h2 className="text-3xl font-medium text-navy mb-6">
            Tillegg som øker styrmannlønnen
          </h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-slate-700 mb-6">
              Som styrmann får du – akkurat som kapteinen – en rekke tillegg utover
              grunnlønnen. Disse kan øke totallønnen med 20-40%.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-sky-50 p-5 rounded-lg">
                <h4 className="font-medium text-navy mb-2">Rotasjonstillegg</h4>
                <p className="text-slate-700 text-sm mb-2">
                  Offshore og havbruk: 15-25% av grunnlønn
                </p>
                <p className="text-slate-600 text-xs">
                  Kompenserer for tid borte fra familie. Høyere prosent jo lengre
                  rotasjon (4-4 gir mer enn 2-2).
                </p>
              </div>

              <div className="bg-sky-50 p-5 rounded-lg">
                <h4 className="font-medium text-navy mb-2">Offshore-tillegg</h4>
                <p className="text-slate-700 text-sm mb-2">
                  20-35% ekstra for offshore
                </p>
                <p className="text-slate-600 text-xs">
                  Spesielt for offshore-sektoren. Kompenserer for krevende
                  arbeidsforhold og høyt kompetansekrav.
                </p>
              </div>

              <div className="bg-sky-50 p-5 rounded-lg">
                <h4 className="font-medium text-navy mb-2">DP-tillegg</h4>
                <p className="text-slate-700 text-sm mb-2">
                  50-100 000 kr årlig ekstra
                </p>
                <p className="text-slate-600 text-xs">
                  Hvis du har Dynamic Positioning sertifikat (DP Limited, DP
                  Unlimited). Høyt ettertraktet kompetanse.
                </p>
              </div>

              <div className="bg-sky-50 p-5 rounded-lg">
                <h4 className="font-medium text-navy mb-2">Overtidsgodtgjørelse</h4>
                <p className="text-slate-700 text-sm mb-2">
                  Varierer, ca 300-500 kr/time
                </p>
                <p className="text-slate-600 text-xs">
                  Mer vanlig for styrmenn enn kapteiner. Under hektiske
                  havne-operasjoner kan overtid akkumuleres raskt.
                </p>
              </div>
            </div>

            <p className="text-slate-700">
              <strong>Eksempel:</strong> En 2. styrmann offshore med{' '}
              {formatCurrency(650000)} i grunnlønn, 2-4 rotasjon (20% tillegg) og
              offshore-tillegg (25%) ender på:
            </p>

            <div className="bg-white border border-slate-200 rounded-lg p-6 my-6">
              <p className="text-slate-700 mb-2">
                Grunnlønn: <span className="font-medium">{formatCurrency(650000)}</span>
              </p>
              <p className="text-slate-700 mb-2">
                Rotasjonstillegg (20%): <span className="font-medium">+ {formatCurrency(130000)}</span>
              </p>
              <p className="text-slate-700 mb-4">
                Offshore-tillegg (25%): <span className="font-medium">+ {formatCurrency(162500)}</span>
              </p>
              <p className="text-xl font-bold text-navy">
                Total årslønn: {formatCurrency(942500)}
              </p>
            </div>

            <p className="text-slate-700">
              Dette viser hvorfor offshore er så attraktivt. En 2. styrmann kan tjene
              nesten like mye som en 1. styrmann i andre sektorer, bare på grunn av
              tilleggene.
            </p>
          </div>
        </Container>
      </Section>

      {/* Konklusjon */}
      <Section variant="navy">
        <Container size="md">
          <div className="text-cream-100">
            <h2 className="text-3xl font-medium mb-6 text-cream-50">
              Oppsummering: Hva tjener en styrmann i Norge?
            </h2>

            <div className="prose prose-lg max-w-none prose-invert">
              <p className="mb-6">
                Styrmannlønn i Norge varierer fra {formatCurrency(500000)} for
                ferske 3. styrmenn til over {formatCurrency(900000)} for erfarne 1.
                styrmenn offshore. Gjennomsnitt ligger på {formatCurrency(620000)},
                men dette skjuler store forskjeller mellom rang og sektor.
              </p>

              <p className="mb-6">
                Offshore gir høyest lønn med 15-30% mer enn cruise og shipping, på
                grunn av rotasjonstillegg og offshore-tillegg. Havbruk følger tett
                etter, med økende lønninger og bedre rotasjonsordninger.
              </p>

              <p className="mb-6">
                Karriereveien fra 3. styrmann til kaptein tar 8-12 år, med økende
                ansvar og lønn for hvert trinn. Mange velger å bli værende som 1.
                styrmann – en attraktiv posisjon med høy lønn og betydelig ansvar,
                uten kapteinens ultimate press.
              </p>

              <p>
                Jobbmarkedet er sterkt for kvalifiserte styrmenn i 2026. Spesielt
                offshore og havbruk søker aktivt etter kompetanse. Hvis du har DP-
                sertifikat eller spesialisert erfaring, er du høyt ettertraktet.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section variant="slate">
        <Container size="md">
          <h2 className="text-3xl font-medium text-navy mb-8 text-center">
            Ofte stilte spørsmål om styrmann-lønn
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
              Søker du styrmann-stillinger?
            </h2>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Bluecrew formidler kvalifiserte styrmenn (3., 2. og 1. styrmann) til
              norske rederier innen offshore, havbruk og shipping. Registrer deg og
              bli kontaktet når relevante stillinger blir ledige.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/meld-interesse"
                className="inline-block bg-navy text-white px-8 py-3 rounded-md font-medium hover:bg-navy-dark transition-colors"
              >
                Registrer deg som styrmann
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

