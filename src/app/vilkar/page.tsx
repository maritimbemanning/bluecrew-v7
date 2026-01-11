import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, Phone } from '@/components/icons';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Brukervilkår',
  description: 'Les brukervilkårene for Bluecrew. Her finner du informasjon om bruk av plattformen, ansvar og rettigheter for sjøfolk og rederier.',
  openGraph: {
    title: 'Brukervilkår',
    description: 'Les brukervilkårene for Bluecrew. Informasjon om bruk av plattformen.',
    url: 'https://bluecrew.no/vilkar',
  },
  alternates: {
    canonical: 'https://bluecrew.no/vilkar',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const sections = [
  {
    title: '1. Om Bluecrew',
    content: `Bluecrew AS (org.nr. 936 463 843) er et bemanningsselskap som formidler kvalifiserte sjøfolk til rederier og maritime oppdragsgivere i Norge.

Disse brukervilkårene regulerer bruk av bluecrew.no og våre bemanningstjenester. Ved å bruke nettsiden eller våre tjenester aksepterer du disse vilkårene.`,
  },
  {
    title: '2. Definisjoner',
    content: `**Kandidat:** Person som registrerer seg hos Bluecrew for å søke maritime stillinger.

**Oppdragsgiver:** Rederi eller selskap som benytter Bluecrews bemanningstjenester.

**Plattformen:** Nettsiden bluecrew.no og tilhørende tjenester.

**Tjenestene:** Bemanningstjenester, rekruttering og formidling av maritime stillinger.`,
  },
  {
    title: '3. Registrering og konto',
    content: `**For kandidater:**
- Du må være minst 18 år for å registrere deg
- All informasjon du oppgir må være korrekt og oppdatert
- Du er ansvarlig for å holde påloggingsinformasjon konfidensiell
- Du må gi beskjed om endringer i sertifikater, kvalifikasjoner eller tilgjengelighet
- Vi forbeholder oss retten til å verifisere opplysninger via BankID og andre kilder

**For oppdragsgivere:**
- Du må ha fullmakt til å representere selskapet
- Bemanningsbehov og stillingsbeskrivelser må være korrekte
- Du forplikter deg til å følge norsk arbeidsrett og tariffavtaler`,
  },
  {
    title: '4. Våre tjenester',
    content: `**Bemanning (innleie):**
- Vi formidler kvalifiserte kandidater til midlertidige oppdrag
- Kandidater er ansatt hos Bluecrew under oppdraget
- Dagsrater avtales direkte med oppdragsgiver
- Vi håndterer lønn, skatt og forsikring for innleide kandidater

**Rekruttering (fast ansettelse):**
- Vi bistår med å finne kandidater til faste stillinger
- Honorar avtales før oppstart av rekrutteringsprosess
- Garanti på ansettelser i henhold til avtale

**Formidling:**
- Vi kobler kandidater og oppdragsgivere
- Kandidater ansettes direkte hos oppdragsgiver`,
  },
  {
    title: '5. Kandidatens forpliktelser',
    content: `Som kandidat hos Bluecrew forplikter du deg til å:

- Oppgi korrekt og fullstendig informasjon om utdanning, erfaring og sertifikater
- Holde profilen din oppdatert, spesielt med tanke på sertifikatfornyelser og helseattest
- Svare på henvendelser fra Bluecrew innen rimelig tid
- Møte til avtalte oppdrag med nødvendig utstyr og dokumentasjon
- Følge arbeidsgivers instrukser og HMS-retningslinjer
- Ikke akseptere oppdrag du ikke er kvalifisert for
- Informere Bluecrew om eventuelle forhold som kan påvirke din arbeidsevne`,
  },
  {
    title: '6. Oppdragsgivers forpliktelser',
    content: `Som oppdragsgiver hos Bluecrew forplikter du deg til å:

- Gi korrekt informasjon om stillinger, fartøy og arbeidsforhold
- Følge tariffavtaler og norsk arbeidsrett
- Sørge for forsvarlige HMS-forhold om bord
- Betale faktura innen avtalt betalingsfrist
- Gi tilbakemelding på kandidater etter oppdrag
- Ikke rekruttere kandidater direkte uten avtale med Bluecrew
- Informere om endringer i bemanningsbehov så tidlig som mulig`,
  },
  {
    title: '7. Betaling og priser',
    content: `**For kandidater:**
- Det er gratis å registrere seg og bruke plattformen
- Lønn og godtgjørelser avtales før hvert oppdrag
- Utbetaling skjer i henhold til gjeldende lønnsrutiner

**For oppdragsgivere:**
- Priser for bemanning og rekruttering oppgis ikke på nettsiden
- Dagsrater og honorarer avtales direkte med vår salgsavdeling
- Betalingsbetingelser: 14 dager fra fakturadato
- Ved forsinket betaling påløper forsinkelsesrente i henhold til forsinkelsesrenteloven`,
  },
  {
    title: '8. Konfidensialitet',
    content: `Begge parter forplikter seg til å behandle konfidensiell informasjon med aktsomhet.

**Konfidensiell informasjon inkluderer:**
- Kandidaters personopplysninger og CV
- Oppdragsgivers forretningsinformasjon
- Priser og avtalevilkår
- Interne prosesser og rutiner

Konfidensialitetsplikten gjelder også etter at avtaleforholdet er avsluttet.`,
  },
  {
    title: '9. Immaterielle rettigheter',
    content: `Alt innhold på bluecrew.no, inkludert tekst, grafikk, logoer og programvare, tilhører Bluecrew AS eller våre lisensgivere.

Du har ikke rett til å:
- Kopiere eller reprodusere innhold uten samtykke
- Bruke Bluecrews logo eller varemerker
- Modifisere eller skape avledede verk
- Distribuere innhold til tredjepart`,
  },
  {
    title: '10. Ansvarsbegrensning',
    content: `**Bluecrew er ikke ansvarlig for:**
- Indirekte tap eller følgeskader
- Tap som skyldes kandidatens eller oppdragsgivers egne forhold
- Feil i informasjon oppgitt av kandidater eller oppdragsgivere
- Tekniske feil på plattformen
- Force majeure-hendelser

**Vårt ansvar er begrenset til:**
- Direkte dokumenterte tap
- Maksimalt beløpet betalt for den aktuelle tjenesten`,
  },
  {
    title: '11. Varighet og oppsigelse',
    content: `**For kandidater:**
- Registreringen gjelder inntil du selv sletter profilen eller vi avslutter den
- Inaktive profiler kan slettes etter 24 måneder
- Du kan når som helst be om sletting av din profil

**For oppdragsgivere:**
- Avtaler om enkeltoppdrag gjelder til oppdraget er fullført
- Rammeavtaler har varighet som spesifisert i avtalen
- Oppsigelse av rammeavtaler krever 3 måneders varsel`,
  },
  {
    title: '12. Tvister og lovvalg',
    content: `Disse vilkårene er underlagt norsk rett.

Eventuelle tvister søkes løst gjennom forhandlinger. Dersom enighet ikke oppnås, kan tvisten bringes inn for de ordinære domstoler med Nord-Troms tingrett som verneting.`,
  },
  {
    title: '13. Endringer i vilkårene',
    content: `Bluecrew forbeholder seg retten til å endre disse vilkårene. Ved vesentlige endringer vil vi varsle berørte parter via e-post eller på plattformen.

Fortsatt bruk av tjenestene etter endringer anses som aksept av de nye vilkårene.

**Sist oppdatert:** Januar 2026`,
  },
];

export default function VilkarPage() {
  return (
    <main>
      {/* Hero Section */}
      <Section variant="navy" className="relative overflow-hidden pt-20">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <Container size="lg" className="relative">
          <div className="py-16 md:py-24 lg:py-32">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-cream-50 mb-6 leading-tight">
                Brukervilkår
              </h1>

              <p className="text-xl md:text-2xl text-cream-100/80">
                Vilkår for bruk av Bluecrews tjenester og plattform.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Content */}
      <Section>
        <Container size="md">
          <div className="space-y-12">
            {sections.map((section, index) => (
              <div key={index}>
                <h2 className="text-2xl font-medium text-navy mb-4">
                  {section.title}
                </h2>
                <div className="prose prose-slate max-w-none">
                  {section.content.split('\n\n').map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-slate-600 mb-4 whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Contact */}
      <Section variant="slate">
        <Container size="md">
          <div className="text-center">
            <h2 className="text-2xl font-medium text-navy mb-4">
              Spørsmål om vilkårene?
            </h2>
            <p className="text-slate-600 mb-8">
              Ta kontakt hvis du har spørsmål om våre brukervilkår.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:post@bluecrew.no"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold-500 text-navy-900 italic rounded-lg hover:bg-gold-400 transition-colors"
              >
                <Mail className="w-5 h-5" />
                post@bluecrew.no
              </a>
              <a
                href="tel:+4777029000"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-navy border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <Phone className="w-5 h-5" />
                +47 77 02 90 00
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* Related Links */}
      <Section>
        <Container size="md">
          <div className="text-center">
            <p className="text-slate-600">
              Se også vår{' '}
              <Link href="/personvern" className="text-sky hover:underline">
                personvernerklæring
              </Link>
              .
            </p>
          </div>
        </Container>
      </Section>
    </main>
  );
}

