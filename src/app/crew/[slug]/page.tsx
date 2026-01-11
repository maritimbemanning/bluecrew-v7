import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Revalidate blog posts every 24 hours
export const revalidate = 86400;
import {
  ChevronRight,
  Clock,
  User,
  Calendar,
  ArrowLeft,
  Share2,
  Anchor
} from '@/components/icons';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import SchemaMarkup from '@/components/seo/SchemaMarkup';

// Article content database
const articles: Record<string, {
  title: string;
  excerpt: string;
  author: string;
  role: string;
  date: string;
  readTime: string;
  category: string;
  content: string;
}> = {
  'fra-kadett-til-kaptein': {
    title: 'Fra kadett til kaptein – min 15-årige reise',
    excerpt: 'Hvordan jeg gikk fra å være nervøs kadett på min første tur til å ta over kommandoen på et offshore-skip.',
    author: 'Lars M.',
    role: 'Kaptein, Offshore Supply',
    date: '2025-01-15',
    readTime: '8 min',
    category: 'Karriereveier',
    content: `
## Den nervøse starten

Jeg husker fortsatt den første dagen som kadett. Sommeren 2010, Ålesund havn, et PSV-skip på vei til Nordsjøen. Jeg var 19 år og hadde akkurat fullført første året på nautisk fagskole. Alt jeg visste om sjøfart var teori fra klasserommet.

Kapteinen den gangen – en bister kar fra Sunnmøre – så på meg og sa: "Du kommer til å gjøre masse feil det første året. Det viktigste er at du lærer av dem." De ordene har fulgt meg hele karrieren.

## Læring gjennom erfaring

De første månedene som kadett handlet om å absorbere alt. Jeg fulgte styrmannen som en skygge, stilte tusen spørsmål (noen ganger de samme flere ganger), og prøvde å forstå hvorfor ting ble gjort på bestemte måter.

Den bratteste læringskurven var ankerhåndtering. Første gang jeg så en trossebrekk under spenning, forsto jeg hvor farlig dette arbeidet kan være. Respekten for kreftene vi jobbet med satte seg dypt.

## Styrmannsårene

Etter tre år som kadett og matros fikk jeg min første styrmannsjobb. Å gå fra å følge ordrer til å gi dem var en omstilling. Plutselig var det andre som så til meg for svar.

Som 3. styrmann hadde jeg ansvar for sikkerhetsutstyret. Livbåter, brannslokking, evakueringsplaner – dette var mitt domene. Jeg tok det på alvor, kanskje litt for mye. Men bedre å være overkvalifisert enn underforberedt når det gjelder sikkerhet.

## Veien videre

2. styrmann kom etter to år. Nå hadde jeg brovakt alene, lastansvar, og begynte å se helheten i skipsdriften. Jeg forsto hvorfor kapteinen tok de beslutningene han tok.

Som overstyrmann (1. styrmann) var jeg nestkommanderende. Kapteinen stolte på meg til å ta over ved behov. Ansvaret var stort, men jeg følte meg klar. Årene med erfaring hadde forberedt meg.

## Kapteinsdagen

Den dagen jeg første gang satte meg i kapteinsstolen alene – uten noen over meg – var surrealistisk. 15 år med forberedelse, og nå var det mitt skip, mitt ansvar.

Det første jeg gjorde var å samle mannskapet. Jeg fortalte dem at jeg var ny som kaptein, men ikke ny på dette skipet. Jeg ville ha åpen dialog. Hvis noen så noe jeg ikke så, ville jeg høre om det.

## Råd til fremtidige kapteiner

For deg som drømmer om kapteinstittelen har jeg noen råd:

**Vær tålmodig.** Det tar tid, og det skal ta tid. Du trenger erfaringen fra hvert steg.

**Aldri slutt å lære.** Selv etter 15 år lærer jeg nye ting. Sjøen er uforutsigbar.

**Lytt til mannskapet.** De ser ting du ikke ser. En god kaptein er en som lytter.

**Ta vare på deg selv.** Lange turnuser tar på. Bruk friperiodene til å lade batteriene.

**Husk hvorfor du startet.** På dårlige dager, husk følelsen fra den første turen. Den magien er fortsatt der.

Reisen fra kadett til kaptein er lang, men hvert steg er verdt det. Lykke til på din reise.
    `,
  },
  'min-forste-offshore-tur': {
    title: 'Min første offshore-tur – slik var det',
    excerpt: 'Alt du lurer på om første gang til sjøs. Fra helikopterturen til første nattskift.',
    author: 'Erik S.',
    role: 'Matros, PSV',
    date: '2025-01-10',
    readTime: '6 min',
    category: 'Livet til sjøs',
    content: `
## Før avreise

Nervøsiteten startet allerede uken før. Jeg hadde fått jobben som matros på et PSV-skip etter å ha sendt ut tjue søknader. Nå skulle jeg faktisk dit.

Pakking var en utfordring. Hvor mye klær trenger man for to uker? Hva om jeg glemmer noe viktig? Rederiet hadde sendt en liste, men jeg pakket dobbelt av det meste – for sikkerhets skyld.

## Helikopterturen

For å komme til skipet måtte jeg ta helikopter fra Flesland. Det var min første helikoptertur noensinne. Sikkerhetsbriefen var grundig – overlevelsesdrakt, pusteutstyr, og hva man gjør hvis helikopteret lander på vannet.

Turen ut var spektakulær. Nordsjøen under oss, plattformer i det fjerne, og til slutt vårt skip som ventet. Landingen på helidekket var overraskende myk.

## Første inntrykk

Skipet var større enn jeg hadde forestilt meg. Jeg ble møtt av overstyrmannen som viste meg lugaren. En liten, men effektiv lugar med køye, skrivebord og skap. "Dette blir hjemmet ditt de neste to ukene," sa han.

Så ble jeg introdusert for resten av mannskapet. Alle var vennlige, men jeg følte meg som den nye gutten på skolen. Alle visste hva de skulle gjøre, unntatt meg.

## Første vakt

Min første vakt var nattskift – 00:00 til 06:00. Jeg skulle være utkikk på broen. Styrmannen forklarte oppgaven: hold øye med sjøen, rapporter alt du ser, og ikke sovn.

De første timene var intense. Hvert lys i horisonten, hver bølge som så annerledes ut – jeg rapporterte alt. Styrmannen smilte tålmodig og forklarte forskjellen på en fiskebåt og en plattform.

## Dekksarbeid

Dagen etter begynte det virkelige arbeidet. Fortøyning, vasking, maling, sjekking av utstyr. Fysisk hardt, men givende. Båtsmannen var en god læremester – streng, men rettferdig.

Den første lasteoperasjonen var nervepirrende. Kraner som svingte, containere som ble løftet, trosser under spenning. Jeg forsto plutselig hvorfor sikkerhetsreglene var så strenge.

## Mat og sosialt

Kokken om bord var fantastisk. Tre varme måltider om dagen, kaker til kaffen, og alltid noe i kjøleskapet for de som var sultne om natten. God mat gjør alt bedre.

Lunsjen var sosial samlingspunkt. Her snakket mannskapet om alt – fotball, familie, politikk, og historier fra tidligere turer. Jeg lyttet mest, men følte meg gradvis mer inkludert.

## Hva jeg lærte

Etter to uker forlot jeg skipet som en annen person. Ikke en erfaren sjømann – langt ifra – men noen som hadde tatt første steg.

Det viktigste jeg lærte var at det er ok å ikke vite alt. Spør heller en gang for mye enn en gang for lite. Alle har vært nye en gang, og de fleste husker hvordan det føltes.

Til deg som skal ut på din første tur: nyt det. Det blir aldri helt likt den første gangen.
    `,
  },
  'livet-som-matros-pa-bronnbat': {
    title: 'Livet som matros på brønnbåt',
    excerpt: 'Havbrukssektoren vokser. Slik er hverdagen for en matros som jobber med laks og oppdrett.',
    author: 'Thomas K.',
    role: 'Matros, Brønnbåt',
    date: '2025-01-05',
    readTime: '7 min',
    category: 'Livet til sjøs',
    content: `
## Hva er en brønnbåt?

For de som ikke kjenner havbruksnæringen: en brønnbåt transporterer levende fisk. Vi frakter laks fra oppdrettsanlegg til slakteri, eller mellom forskjellige lokaliteter. Skipet har store tanker fylt med sjøvann der fisken svømmer under transport.

Det er en spesiell jobb. Vi jobber ikke med containere eller olje – vi jobber med levende dyr som må behandles forsiktig.

## En typisk tur

En typisk tur starter med at vi legger til ved et oppdrettsanlegg. Der pumpes fisken om bord i brønnene. Det krever presisjon – for mye stress skader fisken.

Under transport overvåker vi oksygennivå, temperatur og fiskens adferd. Alt logges kontinuerlig. Hvis noe er feil, må vi handle raskt.

Ved ankomst pumpes fisken ut igjen, like forsiktig som den ble lastet. Så vasker og desinfiserer vi brønnene før neste tur.

## Turnus og arbeidstid

Jeg jobber 1-1 turnus – én uke på, én uke fri. Det er kortere turnuser enn offshore, noe som passer meg perfekt. Jeg er aldri lenge borte fra familien.

Arbeidsdagene er lange når vi er i operasjon – ofte 12 timer eller mer. Men det er også rolige perioder med vedlikehold og forberedelser.

## Hva jeg liker

Det beste med jobben er variasjonen. Vi opererer langs hele norskekysten, fra Rogaland til Finnmark. Vakre fjorder, små kystsamfunn, og stadig nye steder.

Jeg liker også at vi gjør noe meningsfullt. Norsk laks er ettertraktet over hele verden, og vi er en viktig del av verdikjeden.

Mannskapet er lite – ofte bare 4-6 personer. Det blir tette bånd. Vi spiser sammen, jobber sammen, og kjenner hverandre godt.

## Utfordringer

Det er ikke bare idyll. Jobben kan være fysisk krevende, spesielt i dårlig vær. Å håndtere fisk i storm er utfordrende.

Lukten er også noe man må venne seg til. Fisk lukter fisk, spesielt etter en lang tur. Men man blir vant til det.

Næringen er sesongbasert. Høst er høysesong med mye jobbing, mens sommeren kan være roligere. Det gir variasjon, men krever fleksibilitet.

## For deg som vurderer havbruk

Hvis du vurderer en jobb i havbruk, vil jeg si: gjør det! Næringen vokser, jobbmulighetene er gode, og lønnen konkurransedyktig.

Du trenger ikke maritime bakgrunn for å starte. Mange rederier lærer opp folk fra bunnen. Det viktigste er å være arbeidsom, pålitelig og villig til å lære.

Havbruk er fremtiden for norsk sjømat. Å være en del av det føles meningsfullt.
    `,
  },
  'hvordan-jeg-ble-maskinist': {
    title: 'Hvordan jeg ble maskinist',
    excerpt: 'Fra industrimontør på land til maskinist offshore. Tips for deg som vurderer samme vei.',
    author: 'Arne B.',
    role: 'Maskinist, AHTS',
    date: '2024-12-20',
    readTime: '7 min',
    category: 'Karriereveier',
    content: `
## Bakgrunn fra land

Jeg startet ikke karrieren til sjøs. I ti år jobbet jeg som industrimontør på et verft i Haugesund. God jobb, greie kollegaer, men jeg lengtet etter noe mer.

En kamerat som jobbet offshore fortalte om livet til sjøs. Turnusen, lønnen, og opplevelsene. Jeg ble nysgjerrig.

## Veien til sjøs

Overgangen var ikke rett frem. Selv med solid mekanisk bakgrunn måtte jeg ta tilleggsutdanning. Maritimt påbygningskurs, STCW-sertifikater, og fartstid som motormann.

Det tok to år før jeg hadde papirene i orden. To år med kursing på kveldstid mens jeg jobbet fulltid. Krevende, men verdt det.

## Første jobb som maskinist

Min første maskinistjobb var på et ankerhåndteringsskip (AHTS). Skipet var gammelt, maskinene krevende, og arbeidstempoet høyt. Perfekt læringsplass.

Maskinrommet var mitt domene. Hovedmotor, hjelpemotorer, hydraulikk, thrustere – alt mitt ansvar. Overgangen fra land var stor. På land kunne jeg gå hjem hvis noe var vanskelig. Her måtte problemet løses.

## Hva jeg lærte

Den største forskjellen fra land er at du må være selvgående. Når noe ryker midt på natten i Nordsjøen, er det ingen å ringe. Du må fikse det selv.

Jeg lærte også viktigheten av forebyggende vedlikehold. På land kan du ofte reparere ting når de ryker. Til sjøs kan et motorhavari bety store problemer. Bedre å bytte deler før de svikter.

## Tips til deg som vil samme vei

**Dokumenter erfaringen din.** Skriv ned alt du har jobbet med på land. Mye av det er relevant.

**Ta STCW-kursene tidlig.** Du trenger Basic Safety Training uansett. Få det unna.

**Søk bredt.** Ikke bare offshore. Havbruk, ferger, og kystfart trenger også maskinister.

**Vær forberedt på å starte nederst.** Selv med ti års erfaring fra land, startet jeg som motormann til sjøs.

**Nettverk er viktig.** Snakk med folk i bransjen. Mange jobber utlyses aldri offentlig.

## Hvorfor jeg ikke angrer

Etter fem år til sjøs har jeg ikke angret et sekund. Lønnen er bedre, fritiden er bedre, og jobben er mer variert.

Ja, jeg savner av og til stabiliteten fra land. Å være hjemme hver kveld, følge barnas hverdag tett. Men turnus-livet har også fordeler. Når jeg er hjemme, er jeg virkelig hjemme – 100% tilstede.

For deg med mekanisk bakgrunn som vurderer sjøen: det er aldri for sent å bytte.
    `,
  },
  'kvinne-i-maritim-sektor': {
    title: 'Kvinne i maritim sektor – mine erfaringer',
    excerpt: 'Som kvinnelig styrmann møter jeg spørsmål og nysgjerrighet. Her er mine refleksjoner.',
    author: 'Maria H.',
    role: 'Styrmann, Tankskip',
    date: '2024-12-15',
    readTime: '8 min',
    category: 'Karriereveier',
    content: `
## Hvorfor sjøfart?

Folk spør ofte hvordan jeg endte opp til sjøs. Svaret er enkelt: jeg ville det. Helt fra ungdomsskolen fascinerte skipsfart meg. Store fartøy, verdenshavene, og følelsen av å være del av noe større.

At jeg var jente var aldri et argument mot. Foreldrene mine støttet valget fullt ut. "Gjør det du brenner for," sa mamma.

## Første møte med bransjen

På maritim videregående var jeg én av tre jenter i klassen. Det var uvant, men ikke vanskelig. Gutta behandlet oss som likeverdige – vi delte samme drøm.

Fagskolen var lignende. Flere kvinner enn på videregående, men fortsatt klart mindretall. Jeg la merke til at jentene ofte var ekstra motiverte. Vi hadde valgt dette aktivt, ikke bare dratt med strømmen.

## Til sjøs

Min første jobb var som kadett på et tankskip. Da merket jeg forskjellen. Noen i mannskapet hadde aldri jobbet med kvinner før. Nysgjerrigheten var stor – noen ganger slitsom.

Men holdningene endret seg raskt når de så at jeg gjorde jobben. Ingen forventede at jeg skulle løfte tyngre enn de andre, men de forventet at jeg skulle gjøre min del. Det var rettferdig.

## Utfordringer

La meg være ærlig: det er utfordringer. Lugarer og fasiliteter er ikke alltid tilpasset blandede besetninger. Noen skip har separate dusjer og toaletter, andre ikke. Man tilpasser seg.

Kommentarer forekommer. Ikke nødvendigvis ondsinnede, men ubetenksomme. "Du er flink – til å være dame." Den setningen har jeg hørt for mange ganger.

Jeg har lært å svare med fakta og resultater. Gjør jobben godt, og de fleste innvendinger forstummer.

## Det positive

Det positive langt overstiger det negative. Jeg har møtt utrolig mange støttende kolleger – menn som genuint heier på mangfold i bransjen.

Flere rederier jobber aktivt for å rekruttere kvinner. De ser at mangfold gir bedre arbeidsmiljø og beslutninger. Det merkes.

Og det blir bedre for hvert år. Da jeg startet for åtte år siden, var kvinnelige offiserer sjeldne. Nå møter jeg stadig flere. Vi er fortsatt i mindretall, men trenden er positiv.

## Til andre kvinner

Hvis du vurderer maritim karriere: gjør det. Bransjen trenger deg, og du fortjener muligheten.

Noen råd fra min erfaring:

**Vær deg selv.** Ikke prøv å bli "en av gutta." Vær profesjonell, men autentisk.

**Finn mentorer.** Både kvinnelige og mannlige. De som har gått veien før kan gi uvurderlige råd.

**Dokumenter alt.** Både prestasjoner og eventuelle problemer. Det gir deg trygghet.

**Bygg nettverk.** Det finnes organisasjoner for kvinner i maritim sektor. Bruk dem.

**Ikke gi opp ved motgang.** Noen dager er tøffe. Men de gode dagene – og de er mange – er verdt det.

Sjøfart er ikke en mannsjobb. Det er en jobb for de som vil, uansett kjønn.
    `,
  },
  'offshore-vs-havbruk-min-erfaring': {
    title: 'Offshore vs havbruk – min erfaring fra begge',
    excerpt: 'Jeg har jobbet både offshore og i havbruk. Her er forskjellene og hva som passet best for meg.',
    author: 'Jonas R.',
    role: 'Matros, Tidligere offshore',
    date: '2024-12-10',
    readTime: '6 min',
    category: 'Tips & råd',
    content: `
## Min bakgrunn

Jeg startet offshore som 22-åring, fersk fra maritimt kurs. Fire år på PSV-skip i Nordsjøen ga solid erfaring. Så byttet jeg til havbruk – brønnbåt – og har vært der i tre år.

Mange spør hvorfor jeg byttet. Her er min ærlige sammenligning.

## Offshore: det gode

Offshore betaler best – ingen tvil. Min lønn sank da jeg byttet til havbruk. For noen er det avgjørende.

Offshore har også prestige. Når folk hører "offshore", forstår de at det er en seriøs jobb. "Brønnbåt" krever mer forklaring.

Utstyret offshore er ofte nyere og mer avansert. Skipene er imponerende ingeniørkunstverk.

## Offshore: utfordringene

2-4 turnus offshore betyr lange perioder borte. To uker kan føles som en måned når du savner familien. Fire uker fri høres fint ut, men du bruker den første uken på å "lande" mentalt.

Helikopterturer er nødvendige, men ikke alltid behagelige. Værforsinkelser kan ødelegge planlagt avspasering.

Jobben kan også være ensidig. Mye venting mellom oppdrag. Noen trives med det, andre ikke.

## Havbruk: det gode

Havbruk har kortere turnuser – jeg jobber 1-1. Én uke på, én uke fri. Jeg er aldri lenge borte fra barna.

Vi opererer langs norskekysten, ofte innenfor mobildekning. Jeg kan ringe hjem hver kveld. Det høres banalt ut, men det betyr mye.

Jobben er mer variert. Vi er i bevegelse mellom anlegg, møter nye folk, ser nye steder.

## Havbruk: utfordringene

Lønnen er lavere – det må jeg være ærlig på. For meg var byttet verdt det, men ikke for alle.

Næringen er sesongbasert. Høst er hektisk, sommer kan være rolig. Forutsigbarheten er lavere enn offshore.

Noen ser ned på havbruk sammenlignet med offshore. Det er urettferdig, men det skjer.

## Hva passet best for meg

For meg var havbruk riktig valg. Med små barn hjemme var kortere turnuser avgjørende. Lønnsnedgangen var håndterbar.

Men hadde jeg vært 22 og singel igjen? Da hadde jeg nok startet offshore. Høyere lønn, mer "eksotisk" CV, og turnusen hadde ikke vært et problem.

## Mitt råd

Ikke hør på de som sier at det ene er "bedre" enn det andre. Det avhenger av din livssituasjon.

**Velg offshore hvis:** Du vil maksimere lønn, liker lange friperioder, og takler å være lenge borte.

**Velg havbruk hvis:** Du vil være nærmere hjemme, trives med kortere turnuser, og er villig til noe lavere lønn.

Begge er skikkelige jobber. Begge gir verdifull erfaring. Velg det som passer deg – og husk at du kan bytte senere.
    `,
  },
};

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles[slug];

  if (!article) {
    return {
      title: 'Artikkel ikke funnet',
    };
  }

  return {
    title: `${article.title} – Crew Stories`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://bluecrew.no/crew/${slug}`,
      siteName: 'Bluecrew AS',
      locale: 'nb_NO',
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
    },
    alternates: {
      canonical: `https://bluecrew.no/crew/${slug}`,
    },
  };
}

// Helper to parse content
function renderContent(content: string) {
  const blocks = content.trim().split(/\n\n+/);
  
  return blocks.map((block, index) => {
    // Check for Header (## Title)
    const headerMatch = block.match(/^##\s+(.+)/);
    if (headerMatch) {
      return (
        <h2 key={index}>
          {headerMatch[1]}
        </h2>
      );
    }
    
    // Check for Bold (**text**) within paragraph
    const parts = block.split(/(\*\*.*?\*\*)/g);
    
    return (
      <p key={index}>
        {parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i}>{part.slice(2, -2)}</strong>;
          }
          return part;
        })}
      </p>
    );
  });
}

export default async function CrewArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = articles[slug];

  if (!article) {
    notFound();
  }

  const breadcrumbs = [
    { name: 'Hjem', url: '/' },
    { name: 'Crew Stories', url: '/crew' },
    { name: article.title, url: `/crew/${slug}` },
  ];

  return (
    <>
      <SchemaMarkup
        type="Article"
        data={{
          headline: article.title,
          description: article.excerpt,
          author: {
            '@type': 'Person',
            name: article.author,
          },
          datePublished: article.date,
          publisher: {
            '@type': 'Organization',
            name: 'Bluecrew',
            url: 'https://bluecrew.no',
          },
        }}
      />
      <SchemaMarkup type="breadcrumb" breadcrumbs={breadcrumbs} />

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-100">
        <Container size="lg">
          <div className="py-3">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </Container>
      </div>

      <main>
        {/* Header */}
        <Section variant="navy">
          <Container size="md">
            <div className="py-16 md:py-20">
              <Link
                href="/crew"
                className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 text-sm font-medium mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Tilbake til Crew Stories
              </Link>

              <span className="inline-block px-4 py-1.5 bg-gold-400/10 border border-gold-400/20 text-gold-300 text-sm font-medium rounded-full mb-6 backdrop-blur-sm">
                {article.category}
              </span>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-cream-50 mb-6 leading-tight">
                {article.title}
              </h1>

              <p className="text-xl text-cream-100/90 mb-8 leading-relaxed font-medium">
                {article.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-cream-200/70">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gold-400" />
                  <span className="text-cream-100">{article.author}</span>
                  <span className="text-cream-200/50">•</span>
                  <span>{article.role}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gold-400" />
                  <span>{new Date(article.date).toLocaleDateString('nb-NO', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gold-400" />
                  <span>{article.readTime} lesetid</span>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Content */}
        <Section>
          <Container size="md">
            <article className="prose prose-lg max-w-none prose-headings:text-navy-900 prose-p:text-slate-600 prose-strong:text-navy-900 prose-a:text-gold-600 prose-li:text-slate-600">
              {renderContent(article.content)}
            </article>
          </Container>
        </Section>

        {/* Share and CTA */}
        <Section className="bg-cream-50">
          <Container size="md">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <span className="text-slate-600">Del denne historien:</span>
                <button 
                  className="p-2 bg-white rounded-lg hover:bg-cream-100 transition-colors shadow-sm"
                  aria-label="Del denne historien"
                >
                  <Share2 className="w-5 h-5 text-slate-600" aria-hidden="true" />
                </button>
              </div>

              <div className="flex items-center gap-4">
                <Link href="/crew">
                  <Button variant="outline">
                    Les flere historier
                  </Button>
                </Link>
                <Link href="/meld-interesse">
                  <Button>
                    Registrer deg
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </Section>

        {/* Author CTA */}
        <Section>
          <Container size="md">
            <div className="bg-navy-900 rounded-2xl p-8 text-center border border-navy-800">
              <Anchor className="w-12 h-12 text-gold-500 mx-auto mb-4" />
              <h2 className="text-2xl font-medium text-cream-50 mb-4">
                Har du en historie å dele?
              </h2>
              <p className="text-cream-100/70 mb-6 max-w-lg mx-auto">
                Vi vil gjerne høre fra deg! Del din erfaring og inspirer andre sjøfolk.
              </p>
              <Link href="/kontakt">
                <Button>
                  Ta kontakt
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </Container>
        </Section>
      </main>
    </>
  );
}


