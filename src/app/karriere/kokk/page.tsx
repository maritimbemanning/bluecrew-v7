import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { IMAGE_PATHS, getImageUrl } from '@/lib/images';
import {
  ChefHat,
  ChevronRight,
  Anchor,
  BookOpen,
  Award,
  Clock,
  Ship,
  Shield,
  Heart,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Utensils
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
  { name: 'Kokk', url: '/karriere/kokk' },
];

export const metadata: Metadata = {
  title: 'Bli skipskokk – Utdanning, krav og karriere til sjøs',
  description: 'Komplett guide til å bli kokk til sjøs. Lær om utdanning, sertifikater, lønn og hverdagen som offshore-kokk, brønnbåt-kokk eller cruise-kokk.',
  keywords: [
    'bli skipskokk',
    'kokk offshore',
    'maritim kokk',
    'kokk til sjøs',
    'offshore kokk lønn',
    'kokk brønnbåt',
  ],
  openGraph: {
    title: 'Bli skipskokk – Utdanning, krav og karriere til sjøs',
    description: 'Komplett guide til å bli kokk til sjøs. Utdanning, lønn og karrieremuligheter.',
    url: 'https://bluecrew.no/karriere/kokk',
    siteName: 'Bluecrew AS',
    locale: 'nb_NO',
    type: 'article',
  },
  alternates: {
    canonical: 'https://bluecrew.no/karriere/kokk',
  },
};

const faqs = [
  {
    id: 'faq-1',
    title: 'Trenger man fagbrev for å jobbe som kokk til sjøs?',
    content: 'Fagbrev som kokk er sterkt anbefalt og ofte krevd av seriøse rederier. Noen mindre fartøy kan ansette ufaglærte med erfaring, men lønnen er lavere og jobbmulighetene færre. Med fagbrev kvalifiserer du for offshore, cruise og større skip hvor lønnen er best.',
  },
  {
    id: 'faq-2',
    title: 'Hva er forskjellen på kokk på land og til sjøs?',
    content: 'Til sjøs lager du alle måltider for mannskapet – frokost, lunsj, middag og ofte nattmat. Du har begrenset tilgang på ferske råvarer og må planlegge langt frem. Du jobber ofte alene (på mindre skip) eller i lite team. Turnus betyr at du har lange friperioder mellom jobbene.',
  },
  {
    id: 'faq-3',
    title: 'Hvor mange måltider lager en skipskokk per dag?',
    content: 'På et typisk offshore-skip med 15-25 mann lager du 3-4 hovedmåltider per dag, pluss mellommåltider og tilgang på mat døgnet rundt. Det kan bety 60-100 porsjoner daglig. På større cruise-skip med flere kokker er arbeidet mer spesialisert.',
  },
  {
    id: 'faq-4',
    title: 'Hva tjener en kokk offshore?',
    content: 'Offshore-kokk tjener typisk 500 000-650 000 kr årlig, noe mer enn kokker på land. Lønnen inkluderer ofte rotasjonstillegg og fri kost/losji om bord. Havbruk og rederi betaler noe mindre (400-550k), mens cruise har lavere lønn men større faglig variasjon.',
  },
  {
    id: 'faq-5',
    title: 'Er det krevende å jobbe som kokk til sjøs?',
    content: 'Ja og nei. Du jobber lange dager (ofte 12 timer) under jobbperioder, og må håndtere alt fra planlegging til oppvask. Men du har lange sammenhengende friperioder. Utfordringer inkluderer begrenset lagerkapasitet, rulling på sjøen, og å holde menyen variert over lengre turer.',
  },
];

export default function KokkKarrierePage() {
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
              src={getImageUrl(IMAGE_PATHS.careers.kokk)}
              alt="Skipskokk i bysse - maritim kokkekarriere"
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
                  <ChefHat className="w-8 h-8 text-gold-400" />
                </div>
                <div>
                  <span className="text-gold-400 text-sm font-medium tracking-wider uppercase">Karrierevei</span>
                  <h1 className="text-4xl md:text-6xl font-medium text-cream-50">
                    Bli <em className="not-italic font-medium text-gold-400">Skipskokk</em>
                  </h1>
                </div>
              </div>

              <p className="text-xl text-cream-100/90 mb-8 leading-relaxed font-medium">
                Kokken er nøkkelen til trivsel om bord. Med ansvar for alle måltider spiller du en
                viktig rolle for mannskapets humør, helse og prestasjoner på jobb.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="bg-gold-400/10 border border-gold-400/20 rounded-lg px-6 py-3 backdrop-blur-sm">
                  <span className="text-gold-300/70 text-xs uppercase tracking-wider">Lønnsnivå</span>
                  <p className="text-cream-50 font-bold text-lg">400k – 650k kr</p>
                </div>
                <div className="bg-gold-400/10 border border-gold-400/20 rounded-lg px-6 py-3 backdrop-blur-sm">
                  <span className="text-gold-300/70 text-xs uppercase tracking-wider">Utdanning</span>
                  <p className="text-cream-50 font-bold text-lg">Fagbrev kokk</p>
                </div>
              </div>
            </div>
          </Container>
        </div>

        <Section>
          <Container size="md">
            <SummaryBox variant="gold">
              <p>
                <strong>Skipskokk:</strong> Ansvar for forpleining og alle måltider om bord.
                Lønn: 400 000 – 650 000 kr. Krever fagbrev som kokk og STCW-sikkerhetskurs.
                En nøkkelrolle for mannskapets trivsel og helse.
              </p>
            </SummaryBox>
          </Container>
        </Section>

        {/* What does a ship cook do */}
        <Section>
          <Container size="lg">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-medium text-navy mb-6">
                  Hva gjør en skipskokk?
                </h2>
                <div className="prose prose-lg max-w-none text-slate-600">
                  <p>
                    Skipskokken, eller byssegutten som det het i gamle dager, har ansvar for all
                    matlagning om bord. Dette er en kritisk rolle for mannskapets trivsel – god mat
                    løfter humøret, spesielt på lange turnuser langt fra land.
                  </p>
                  <p>
                    En typisk dag som skipskokk starter tidlig. Frokost må være klar når nattskiftet
                    går av, og dagturen kommer på jobb. Lunsj er ofte dagens hovedmåltid med varm mat,
                    og middag serveres senere på ettermiddagen. I tillegg lager du mellommåltider,
                    nattmat og sørger for at det alltid er noe tilgjengelig i byssekjøkkenet.
                  </p>
                  <p>
                    Menyplanlegging er en viktig del av jobben. Du må variere menyen slik at
                    mannskapet ikke går lei, samtidig som du holder deg innenfor budsjett og
                    lagerbegrensninger. Allergier og dietter må håndteres, og du må ofte tilpasse
                    deg forskjellige mattradisjoner når mannskapet er flerkulturelt.
                  </p>
                  <p>
                    Proviantering og lagerhold krever god planlegging. Du bestiller mat før avgang
                    og må beregne riktig mengde for hele turnusen. FIFO-prinsippet (First In, First Out)
                    er viktig for å unngå svinn. På lengre turer må du være kreativ når ferske
                    råvarer begynner å ta slutt.
                  </p>
                  <p>
                    Hygiene er helt sentralt. Matforgiftning om bord er katastrofalt – hele
                    operasjonen kan stoppe opp. Du må følge strenge HACCP-rutiner og holde
                    byssekjøkkenet (kombys) skinnet rent. Inspeksjoner fra helsemyndigheter
                    er vanlige, og du er ansvarlig for at alt er i orden.
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
                      05:00 – Start frokostforberedelser
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky shrink-0 mt-0.5" />
                      07:00 – Frokostservering
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky shrink-0 mt-0.5" />
                      09:00 – Lunsj-prep og baking
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky shrink-0 mt-0.5" />
                      12:00 – Lunsj/middag servering
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky shrink-0 mt-0.5" />
                      14:00 – Rengjøring og kveldsmiddag-prep
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky shrink-0 mt-0.5" />
                      17:00 – Kveldsmat/nattmat klart
                    </li>
                  </ul>
                </div>

                <div className="bg-sky/10 rounded-2xl p-6">
                  <h3 className="font-medium text-navy mb-4 flex items-center gap-2">
                    <Utensils className="w-5 h-5 text-sky" />
                    Ansvarsområder
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• Alle måltider for mannskapet</li>
                    <li>• Menyplanlegging og variasjon</li>
                    <li>• Proviantbestilling og budsjett</li>
                    <li>• Lagerhold og FIFO-rotasjon</li>
                    <li>• Hygiene og HACCP</li>
                    <li>• Dietter og allergihåndtering</li>
                    <li>• Renhold av bysse/kombys</li>
                    <li>• Avfallshåndtering</li>
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Why ship cook matters */}
        <Section variant="slate">
          <Container size="lg">
            <h2 className="text-3xl font-medium text-navy mb-8 text-center">
              Hvorfor kokken er viktig
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Heart,
                  title: 'Trivsel',
                  description: 'God mat er nøkkelen til et fornøyd mannskap. Lunsjen er dagens høydepunkt for mange.',
                },
                {
                  icon: Shield,
                  title: 'Helse',
                  description: 'Næringsrik mat holder mannskapet friske og oppmerksomme – viktig for sikkerhet til sjøs.',
                },
                {
                  icon: TrendingUp,
                  title: 'Produktivitet',
                  description: 'Et mett og fornøyd mannskap presterer bedre. Dårlig mat påvirker moralen.',
                },
                {
                  icon: Ship,
                  title: 'Rekruttering',
                  description: 'Rederier med godt rykte for mat tiltrekker seg bedre kandidater.',
                },
                {
                  icon: Award,
                  title: 'Samhold',
                  description: 'Måltidene er sosiale samlingspunkt. Kokken binder mannskapet sammen.',
                },
                {
                  icon: BookOpen,
                  title: 'Tradisjon',
                  description: 'Skipskokken har alltid hatt høy status til sjøs – det er en ærefull rolle.',
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
                    Den vanligste veien til skipskokk er gjennom Restaurant- og matfag på
                    videregående, etterfulgt av læretid og fagprøve. Fagbrev som kokk er
                    standarden de fleste rederier ser etter.
                  </p>
                  <p>
                    I tillegg til kokkefagbrev trenger du maritime sertifikater for å jobbe
                    til sjøs. Basic Safety Training (BST) er obligatorisk og inkluderer
                    sikkerhetskurs, brannvern og førstehjelp. Disse tar totalt ca. 1-2 uker.
                  </p>
                  <p>
                    Hygienekurs er også påkrevd. Du må dokumentere kunnskap om mattrygghet
                    og HACCP-prinsipper. Mange rederier arrangerer egne hygienekurs for
                    nyansatte kokker.
                  </p>
                  <h3>Erfaring teller</h3>
                  <p>
                    Selv med fagbrev er praktisk erfaring viktig. Mange starter i
                    restaurantbransjen på land før de går til sjøs. Erfaring med
                    storkjøkken, kantinedrift eller cateringbransjen er relevant.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-navy rounded-2xl p-6 text-cream-100">
                  <h3 className="font-medium text-lg mb-4 text-cream-50">Påkrevde sertifikater</h3>
                  <ul className="space-y-3">
                    {[
                      'Fagbrev kokk (sterkt anbefalt)',
                      'Basic Safety Training (BST)',
                      'Hygienesertifikat',
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
                      <h3 className="font-medium text-green-800 mb-2">Ekstra kompetanse som verdsettes</h3>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Baking og konditor-ferdigheter</li>
                        <li>• Internasjonal matlagning</li>
                        <li>• Dietter (vegetar, allergi, halal)</li>
                        <li>• Budsjettplanlegging</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
                    <div>
                      <h3 className="font-medium text-amber-800 mb-2">Fysiske krav</h3>
                      <p className="text-sm text-amber-700">
                        Du må kunne stå lange dager, løfte tunge gjenstander, og
                        jobbe i et varmt kjøkken. Sjøsyke kan være utfordrende
                        de første turene.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Career and salary */}
        <Section variant="slate">
          <Container size="lg">
            <h2 className="text-3xl font-medium text-navy mb-8 text-center">
              Karriere og lønn
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  {
                    sector: 'Offshore',
                    salary: '500-650k',
                    turnus: '2-4 (2 uker på, 4 fri)',
                    notes: 'Høyest lønn, mest krevende',
                  },
                  {
                    sector: 'Havbruk',
                    salary: '450-550k',
                    turnus: '1-1 eller 2-2',
                    notes: 'God balanse, voksende sektor',
                  },
                  {
                    sector: 'Rederi/Ferge',
                    salary: '400-500k',
                    turnus: 'Varierende',
                    notes: 'Kortere turer, mer forutsigbart',
                  },
                ].map((item, index) => (
                  <div key={index} className={`rounded-xl p-6 ${
                    index === 0 ? 'bg-sky text-white' : 'bg-white'
                  }`}>
                    <h3 className={`text-xl font-medium mb-2 ${index === 0 ? 'text-white' : 'text-navy'}`}>
                      {item.sector}
                    </h3>
                    <p className={`text-2xl font-bold mb-2 ${index === 0 ? 'text-white' : 'text-sky'}`}>
                      {item.salary} kr
                    </p>
                    <p className={`text-sm mb-2 ${index === 0 ? 'text-sky-100' : 'text-slate-600'}`}>
                      Turnus: {item.turnus}
                    </p>
                    <p className={`text-sm ${index === 0 ? 'text-sky-100' : 'text-slate-500'}`}>
                      {item.notes}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-medium text-navy mb-4">Karrieremuligheter</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-navy mb-2">Til sjøs</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• Hovmester (leder av forpleining)</li>
                      <li>• Kjøkkensjef på cruise</li>
                      <li>• Food Manager på større plattformer</li>
                      <li>• Kokk på luksusyachter</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-navy mb-2">På land</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• Cateringbransjen (maritim erfaring verdsettes)</li>
                      <li>• Innkjøpsansvarlig for rederier</li>
                      <li>• Kokkelærer (fagopplæring)</li>
                      <li>• Restaurantbransjen med offshore-rykte</li>
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
                Vil du bli skipskokk?
              </h2>
              <p className="text-xl text-cream-100/80 mb-8 max-w-xl mx-auto">
                Registrer deg hos Bluecrew. Vi har stillinger for kokker i offshore, havbruk og rederi.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/meld-interesse">
                  <Button size="lg" className="bg-sky hover:bg-sky-dark">
                    Registrer deg nå
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/lonn/kokk">
                  <Button size="lg" variant="outline" className="border-cream-100/20 text-cream-50 hover:bg-cream-100/10">
                    Se kokklønn
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

