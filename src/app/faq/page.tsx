import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import { getOgImageUrl, IMAGE_PATHS } from '@/lib/images';

const breadcrumbs = [
  { name: 'Hjem', url: '/' },
  { name: 'FAQ', url: '/faq' },
];

// Lazy load the interactive client component
const FAQClient = dynamic(() => import('./FAQClient'), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-slate-400">Laster...</div>
    </div>
  ),
});

export const metadata: Metadata = {
  title: 'Ofte stilte spørsmål (FAQ)',
  description: 'Finn svar på vanlige spørsmål om maritim bemanning, lønn, turnus, sertifikater og mer. Komplett FAQ for sjøfolk og rederier.',
  keywords: 'maritim FAQ, sjøfolk spørsmål, rederi bemanning, maritim lønn, offshore turnus',
  alternates: {
    canonical: 'https://bluecrew.no/faq',
  },
  openGraph: {
    title: 'Ofte stilte spørsmål (FAQ)',
    description: 'Finn svar på vanlige spørsmål om maritim bemanning, lønn, turnus og sertifikater.',
    url: 'https://bluecrew.no/faq',
    siteName: 'Bluecrew AS',
    locale: 'nb_NO',
    type: 'website',
    images: [
      {
        url: getOgImageUrl(IMAGE_PATHS.og.default),
        width: 1200,
        height: 630,
        alt: 'FAQ - Bluecrew',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ofte stilte spørsmål (FAQ)',
    description: 'Finn svar på vanlige spørsmål om maritim bemanning.',
    images: [getOgImageUrl(IMAGE_PATHS.og.default)],
  },
};

// FAQ Categories
const faqCategories = [
  { id: 'sjofolk', label: 'For sjøfolk' },
  { id: 'rederi', label: 'For rederier' },
  { id: 'bluecrew', label: 'Om Bluecrew' },
];

// All FAQ items - static data that can be server-rendered
const faqItems = {
  sjofolk: [
    {
      question: 'Hvordan registrerer jeg meg hos Bluecrew?',
      answer: 'Du kan registrere deg ved å fylle ut skjemaet på vår side for sjøfolk. Vi trenger navn, kontaktinformasjon, ønsket stilling, og en kort beskrivelse av din erfaring. Etter registrering tar vi kontakt for en nærmere samtale og verifisering av dokumenter.',
    },
    {
      question: 'Koster det noe å være registrert hos Bluecrew?',
      answer: 'Nei, det er helt gratis å registrere seg og være i vår kandidatdatabase. Vi tar betalt av rederiene som benytter våre tjenester, ikke av sjøfolkene.',
    },
    {
      question: 'Hvor lang tid tar det å få jobb gjennom Bluecrew?',
      answer: 'Dette varierer basert på din erfaring, sertifikater, og hvilke stillinger som er tilgjengelige. Noen kandidater får tilbud innen få dager, mens det for andre kan ta noen uker. Vi matcher deg aktivt mot relevante stillinger så snart de dukker opp.',
    },
    {
      question: 'Må jeg ha alle sertifikater på plass før jeg registrerer meg?',
      answer: 'Du kan registrere deg selv om du mangler noen sertifikater. Vi kan veilede deg om hvilke sertifikater som kreves for ulike stillinger og hjelpe deg med å planlegge nødvendig opplæring.',
    },
    {
      question: 'Kan jeg velge hvilken type fartøy jeg vil jobbe på?',
      answer: 'Ja, du kan oppgi preferanser for fartøystype, geografisk område, og turnusordning. Vi tar hensyn til dine ønsker når vi matcher deg mot ledige stillinger.',
    },
    {
      question: 'Hva skjer etter at jeg har sendt inn registreringen?',
      answer: 'Du mottar en bekreftelse på e-post. Deretter kontakter vi deg for en kort samtale hvor vi går gjennom din bakgrunn, verifiserer dokumenter via BankID, og diskuterer dine karrieremål.',
    },
    {
      question: 'Hvordan blir jeg varslet om relevante stillinger?',
      answer: 'Vi kontakter deg direkte via telefon eller e-post når vi har stillinger som matcher din profil. Du vil også motta oppdateringer om relevante muligheter.',
    },
    {
      question: 'Kan jeg jobbe for flere rederier gjennom Bluecrew?',
      answer: 'Ja, som del av vår bemanningspool kan du jobbe for ulike rederier avhengig av behov og tilgjengelighet. Dette gir deg variert erfaring og fleksibilitet.',
    },
  ],
  rederi: [
    {
      question: 'Hvordan fungerer bemanningstjenesten deres?',
      answer: 'Vi tilbyr både innleie av mannskap og fast rekruttering. Ved innleie er sjøfolkene ansatt hos oss, og vi håndterer lønn, forsikring og administrasjon. Ved fast rekruttering finner vi kandidater som ansettes direkte hos dere.',
    },
    {
      question: 'Hva koster det å bruke Bluecrew?',
      answer: 'Prisene våre avhenger av tjenestetype og volum. Kontakt oss for et uforpliktende tilbud tilpasset deres behov. Vi tilbyr konkurransedyktige priser og fleksible avtaler.',
    },
    {
      question: 'Hvor raskt kan dere levere mannskap?',
      answer: 'Ved akutte behov kan vi ofte levere kvalifisert mannskap innen 24-72 timer. For planlagt bemanning anbefaler vi å ta kontakt minst 2-4 uker i forveien for best mulig match.',
    },
    {
      question: 'Hvordan verifiserer dere kandidatenes kompetanse?',
      answer: 'Vi verifiserer alle kandidater med BankID for identitetssjekk. Vi gjennomgår sertifikater, sjekker referanser, og sikrer at all dokumentasjon er gyldig og oppdatert.',
    },
    {
      question: 'Tilbyr dere garanti på rekrutteringene?',
      answer: 'Ja, vi tilbyr garantiperiode på våre rekrutteringer. Dersom kandidaten ikke fungerer i stillingen innen garantiperioden, finner vi en erstatning uten ekstra kostnad.',
    },
    {
      question: 'Kan dere håndtere bemanning for hele flåten vår?',
      answer: 'Ja, vi tilbyr totalløsninger for flåtebemanning. Som partner kan dere få dedikert kontaktperson, prioritert service, og skreddersydde løsninger for deres behov.',
    },
    {
      question: 'Hvilke sektorer dekker dere?',
      answer: 'Vi dekker offshore, havbruk, shipping, og ferge/passasjer-sektoren. Vår database inkluderer mannskap med erfaring fra alle disse områdene.',
    },
    {
      question: 'Hvordan blir vi partner med Bluecrew?',
      answer: 'Ta kontakt via vårt partnerskjema eller ring oss direkte. Vi arrangerer et møte for å diskutere deres behov og hvordan vi best kan samarbeide.',
    },
  ],
  bluecrew: [
    {
      question: 'Hva er Bluecrew?',
      answer: 'Bluecrew er et norsk maritimt bemanningsbyrå basert i Harstad. Vi kobler kvalifiserte sjøfolk med rederier og oppdragsgivere i hele Norge, med fokus på sikkerhet, kvalitet og personlig oppfølging.',
    },
    {
      question: 'Er Bluecrew et godkjent bemanningsforetak?',
      answer: 'Ja, vi er godkjent av Arbeidstilsynet som bemanningsforetak. Vi følger alle lover og regler for arbeidsutleie i Norge.',
    },
    {
      question: 'Hvor holder Bluecrew til?',
      answer: 'Vi er basert i Harstad, Nord-Norge, men betjener kunder og kandidater over hele Norge. Vi opererer digitalt og er tilgjengelige uansett hvor du befinner deg.',
    },
    {
      question: 'Hvem står bak Bluecrew?',
      answer: 'Bluecrew ble grunnlagt av Isak Didriksson, en DNV-sertifisert rekrutterer med bakgrunn som fullstack-utvikler. Teamet kombinerer teknologiekspertise med dyp bransjekunnskap.',
    },
    {
      question: 'Hva gjør Bluecrew annerledes enn andre bemanningsbyråer?',
      answer: 'Vi kombinerer moderne teknologi med personlig service. Digital registrering, BankID-verifisering, og effektive prosesser – men alltid med menneskelig kontakt og oppfølging.',
    },
    {
      question: 'Har Bluecrew ISO-sertifisering?',
      answer: 'Vi er i prosessen med å oppnå ISO 9001 og ISO 45001-sertifisering, planlagt ferdigstilt i 2026. Dette vil ytterligere styrke vårt kvalitets- og HMS-arbeid.',
    },
  ],
};

// Flatten all FAQs for schema markup
const allFaqs = Object.values(faqItems).flat();

export default function FAQPage() {
  return (
    <>
      {/* Schema markup for SEO - rendered on server */}
      <SchemaMarkup type="faq" faqItems={allFaqs} />
      <SchemaMarkup type="breadcrumb" breadcrumbs={breadcrumbs} />
      
      <main>
        {/* Interactive FAQ content - lazy loaded client component */}
        <FAQClient 
          categories={faqCategories}
          faqItems={faqItems}
          allFaqs={allFaqs}
        />
      </main>
    </>
  );
}

