import type { Metadata } from 'next';
import { Shield, Mail, Phone } from '@/components/icons';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Personvernerklæring',
  description: 'Les om hvordan Bluecrew behandler og beskytter dine personopplysninger i henhold til GDPR.',
  alternates: {
    canonical: 'https://bluecrew.no/personvern',
  },
  openGraph: {
    title: 'Personvernerklæring - Bluecrew',
    description: 'Hvordan Bluecrew behandler og beskytter dine personopplysninger.',
    url: 'https://bluecrew.no/personvern',
    siteName: 'Bluecrew AS',
    locale: 'nb_NO',
    type: 'website',
  },
};

const sections = [
  {
    title: '1. Behandlingsansvarlig',
    content: `Bluecrew AS (org.nr. 936 463 843) er behandlingsansvarlig for personopplysninger som samles inn via bluecrew.no og i forbindelse med våre bemanningstjenester.

**Kontaktinformasjon:**
- E-post: post@bluecrew.no
- Telefon: +47 77 02 90 00
- Adresse: Ervikveien 110, 9402 Harstad`,
  },
  {
    title: '2. Hvilke opplysninger vi samler inn',
    content: `Vi samler inn følgende kategorier av personopplysninger:

**For sjøfolk/kandidater:**
- Kontaktinformasjon (navn, e-post, telefon, adresse)
- Fødselsnummer (for BankID-verifisering)
- CV og arbeidserfaring
- Sertifikater og kvalifikasjoner (STCW, helseattest, etc.)
- Referanser fra tidligere arbeidsgivere
- Profilbilde (valgfritt)

**For rederier/oppdragsgivere:**
- Kontaktinformasjon for kontaktpersoner
- Bedriftsinformasjon
- Bemanningsbehov og stillingsdetaljer

**Tekniske data:**
- IP-adresse
- Nettlesertype og enhetsinformasjon
- Informasjonskapsler (cookies)`,
  },
  {
    title: '3. Formål med behandlingen',
    content: `Vi behandler personopplysninger for følgende formål:

- **Rekruttering og bemanning:** Matche kvalifiserte kandidater med relevante stillinger hos våre oppdragsgivere
- **Verifisering:** Bekrefte identitet via BankID og validere sertifikater og kvalifikasjoner
- **Kommunikasjon:** Kontakte deg om relevante jobbtilbud, oppdateringer og oppfølging
- **Avtaleoppfyllelse:** Oppfylle våre forpliktelser overfor kandidater og oppdragsgivere
- **Forbedring av tjenester:** Analysere og forbedre våre tjenester og brukeropplevelse
- **Lovpålagte krav:** Oppfylle juridiske forpliktelser (regnskap, arbeidsmiljøloven, etc.)`,
  },
  {
    title: '4. Rettslig grunnlag',
    content: `Vi behandler personopplysninger basert på følgende rettslige grunnlag i henhold til GDPR:

- **Samtykke (Art. 6(1)(a)):** Når du registrerer deg og godtar vår personvernerklæring
- **Avtale (Art. 6(1)(b)):** Nødvendig for å oppfylle avtale med deg som kandidat eller oppdragsgiver
- **Rettslig forpliktelse (Art. 6(1)(c)):** Når vi er pålagt ved lov å behandle opplysninger
- **Berettiget interesse (Art. 6(1)(f)):** For å forbedre våre tjenester og forebygge svindel`,
  },
  {
    title: '5. Deling av opplysninger',
    content: `Vi deler personopplysninger med følgende parter:

**Oppdragsgivere:**
Når du søker på eller matches med en stilling, deler vi relevant informasjon (CV, sertifikater, kontaktinfo) med aktuelle rederier og arbeidsgivere.

**Tjenesteleverandører:**
- Supabase (database og autentisering)
- Resend (e-postutsending)
- Vipps (identitetsverifisering)
- Vercel (hosting)
- Google Ads (markedsføring - kun med samtykke)
- Meta/Facebook (markedsføring - kun med samtykke)

**Myndigheter:**
Vi utleverer opplysninger til myndigheter når vi er juridisk forpliktet til det.

Vi selger aldri personopplysninger til tredjeparter.`,
  },
  {
    title: '6. Lagring og sletting',
    content: `**Lagringstid:**
- Aktive kandidatprofiler: Så lenge du er registrert og profilen er aktiv
- Inaktive profiler: Slettes automatisk etter 24 måneder uten aktivitet
- Søknader: Lagres i 12 måneder etter avsluttet prosess
- Regnskapsdata: 5 år i henhold til bokføringsloven
- Kommunikasjonslogg: 3 år

**Sletting:**
Du kan når som helst be om sletting av din profil og tilknyttede opplysninger. Henvendelser besvares innen 30 dager.`,
  },
  {
    title: '7. Dine rettigheter',
    content: `I henhold til GDPR har du følgende rettigheter:

- **Innsyn:** Rett til å få vite hvilke opplysninger vi har om deg
- **Retting:** Rett til å korrigere feilaktige opplysninger
- **Sletting:** Rett til å be om sletting av dine opplysninger
- **Begrensning:** Rett til å begrense behandlingen av dine opplysninger
- **Dataportabilitet:** Rett til å få utlevert dine opplysninger i et strukturert format
- **Innsigelse:** Rett til å motsette deg behandling basert på berettiget interesse
- **Tilbaketrekking av samtykke:** Du kan når som helst trekke tilbake ditt samtykke

**Slik utøver du dine rettigheter:**
- **Datasletting:** Bruk vårt [slettingsskjema](/slett-data)
- **Andre forespørsler:** Kontakt oss på post@bluecrew.no
- **Responstid:** Innen 30 dager`,
  },
  {
    title: '8. Informasjonskapsler (cookies)',
    content: `Vi bruker følgende typer informasjonskapsler:

**Nødvendige cookies:**
- Sesjonshåndtering
- Sikkerhet (CSRF-beskyttelse)
- Brukerpreferanser (f.eks. samtykke til cookies)

**Analytiske cookies:**
- Plausible Analytics (personvernvennlig, ingen personopplysninger, ingen cookies)

**Markedsføringscookies (krever samtykke):**
- Google Ads - for å måle effektiviteten av annonsekampanjer
- Meta Pixel (Facebook) - for å spore konverteringer og målrette annonser

Markedsføringscookies settes kun dersom du gir samtykke via vår cookie-banner. Du kan når som helst endre ditt samtykke ved å slette cookies i nettleseren og laste siden på nytt.`,
  },
  {
    title: '9. Sikkerhet',
    content: `Vi tar sikkerhet på alvor og har implementert følgende tiltak:

- Kryptering av data under overføring (TLS/SSL)
- Kryptering av sensitive data i databasen
- BankID for sikker identitetsverifisering
- Tilgangskontroll og logging
- Regelmessige sikkerhetsvurderinger
- ISO 9001-sertifisering (under implementering)

Ved mistanke om sikkerhetsbrudd, kontakt oss umiddelbart på post@bluecrew.no.`,
  },
  {
    title: '10. Endringer i personvernerklæringen',
    content: `Vi forbeholder oss retten til å oppdatere denne personvernerklæringen. Ved vesentlige endringer vil vi varsle deg via e-post eller på nettsiden.

**Sist oppdatert:** Januar 2026`,
  },
  {
    title: '11. Klage til Datatilsynet',
    content: `Hvis du mener at vi ikke behandler personopplysningene dine i samsvar med regelverket, kan du klage til Datatilsynet:

- Nettside: datatilsynet.no
- E-post: postkasse@datatilsynet.no
- Telefon: 22 39 69 00`,
  },
];

export default function PersonvernPage() {
  return (
    <main>
      {/* Hero Section */}
      <Section variant="navy" className="relative overflow-hidden pt-20">
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%221%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]" />

        <Container size="lg" className="relative">
          <div className="py-16 md:py-24 lg:py-32">
            <div className="stagger-container max-w-3xl">
              <div className="stagger-item mb-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-sky/20 rounded-full text-sky-200 text-sm font-medium">
                  <Shield className="w-4 h-4" />
                  Personvern
                </span>
              </div>

              <h1 className="stagger-item text-4xl md:text-5xl lg:text-6xl font-medium text-cream-50 mb-6 leading-tight">
                Personvernerklæring
              </h1>

              <p className="stagger-item text-xl md:text-2xl text-cream-100/80">
                Slik behandler og beskytter vi dine personopplysninger.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Content */}
      <Section>
        <Container size="md">
          <div className="stagger-container space-y-12">
            {sections.map((section, index) => (
              <div key={index} className="stagger-item">
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
          <div className="stagger-container text-center">
            <h2 className="stagger-item text-2xl font-medium text-navy mb-4">
              Spørsmål om personvern?
            </h2>
            <p className="stagger-item text-slate-600 mb-8">
              Kontakt oss hvis du har spørsmål om hvordan vi behandler dine personopplysninger.
            </p>
            <div className="stagger-item flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:post@bluecrew.no"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-navy text-white rounded-lg hover:bg-navy-light transition-colors"
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
    </main>
  );
}

