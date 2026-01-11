import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Anchor, ExternalLink } from '@/components/icons';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { getOgImageUrl, IMAGE_PATHS } from '@/lib/images';

const breadcrumbs = [
  { name: 'Hjem', url: '/' },
  { name: 'Ordbok', url: '/ordbok' },
];

export const metadata: Metadata = {
  title: 'Maritim Ordbok - Faguttrykk og Begreper',
  description: 'Komplett ordbok over maritime faguttrykk, sertifikater og begreper. STCW, DP, GMDSS, og mer forklart på norsk.',
  keywords: ['maritim ordbok', 'sjøfart begreper', 'STCW forklart', 'maritime faguttrykk', 'skipsfart terminologi'],
  alternates: {
    canonical: 'https://bluecrew.no/ordbok',
  },
  openGraph: {
    title: 'Maritim Ordbok - Faguttrykk og Begreper',
    description: 'Komplett ordbok over maritime faguttrykk, sertifikater og begreper.',
    url: 'https://bluecrew.no/ordbok',
    siteName: 'Bluecrew AS',
    locale: 'nb_NO',
    type: 'website',
    images: [
      {
        url: getOgImageUrl(IMAGE_PATHS.og.default),
        width: 1200,
        height: 630,
        alt: 'Maritim ordbok - Bluecrew',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maritim Ordbok - Faguttrykk og Begreper',
    description: 'Komplett ordbok over maritime faguttrykk, sertifikater og begreper.',
    images: [getOgImageUrl(IMAGE_PATHS.og.default)],
  },
};

// Glossary terms organized by category
const glossaryTerms = [
  {
    category: 'Sertifikater & Kvalifikasjoner',
    terms: [
      {
        term: 'STCW',
        definition: 'Standards of Training, Certification and Watchkeeping. Internasjonal konvensjon som setter minimumskrav til opplæring, sertifisering og vakthold for sjøfolk.',
        link: 'https://www.sdir.no/sjofart/sertifikater/',
      },
      {
        term: 'D1/D2/D3/D4/D5/D6',
        definition: 'Dekksoffiser-sertifikater i Norge. D1 er høyeste (skipsfører alle skip), D6 er laveste (styrmenn på mindre fartøy).',
        link: 'https://www.sdir.no/sjofart/sertifikater/dekksoffiser/',
      },
      {
        term: 'M1/M2/M3/M4/M5/M6',
        definition: 'Maskinoffiser-sertifikater i Norge. M1 er høyeste (maskinsjef alle skip), M6 er laveste.',
        link: 'https://www.sdir.no/sjofart/sertifikater/maskinoffiser/',
      },
      {
        term: 'DP-sertifikat',
        definition: 'Dynamic Positioning sertifikat. Kreves for å operere fartøy med dynamisk posisjonering. Finnes i grunnleggende, avansert og full nivå.',
      },
      {
        term: 'GMDSS',
        definition: 'Global Maritime Distress and Safety System. Radiokommunikasjonssertifikat påkrevd for navigasjonsoffiserer.',
      },
      {
        term: 'Helseattest',
        definition: 'Medisinsk sertifikat som bekrefter at sjøfolk er skikket til tjeneste. Må fornyes regelmessig (typisk hvert 2. år).',
      },
      {
        term: 'Fartstid',
        definition: 'Dokumentert tid til sjøs. Kreves for å oppnå høyere sertifikater og stillinger.',
      },
    ],
  },
  {
    category: 'Stillinger & Roller',
    terms: [
      {
        term: 'Skipsfører/Kaptein',
        definition: 'Øverste leder om bord med ansvar for fartøy, mannskap og last. Krever D1-sertifikat for alle fartøy.',
        link: '/karriere/kaptein',
      },
      {
        term: 'Overstyrmann',
        definition: 'Nestkommanderende etter kaptein. Ansvar for lasting, lossing, stabilitet og daglig drift.',
      },
      {
        term: 'Styrmann',
        definition: 'Navigasjonsoffiser med brovakt. Nivåer fra 1. styrmann (senior) til 3. styrmann (junior).',
        link: '/karriere/styrmann',
      },
      {
        term: 'Maskinsjef',
        definition: 'Øverste ansvarlig for maskinrom og teknisk drift. Krever M1-sertifikat for alle fartøy.',
        link: '/karriere/maskinist',
      },
      {
        term: '1. Maskinist',
        definition: 'Nestkommanderende i maskinrom. Assisterer maskinsjef og leder vakthold.',
      },
      {
        term: 'ETO',
        definition: 'Electro-Technical Officer. Ansvarlig for elektriske og elektroniske systemer om bord.',
        link: '/karriere/eto',
      },
      {
        term: 'Matros',
        definition: 'Dekksarbeider med ansvar for vedlikehold, fortøyning, og assistanse under navigasjon.',
        link: '/karriere/matros',
      },
      {
        term: 'Motormann',
        definition: 'Maskinarbeider som assisterer maskinoffiserer med vedlikehold og drift.',
      },
      {
        term: 'Skipskokk',
        definition: 'Ansvarlig for all matlaging og proviantering om bord.',
        link: '/karriere/kokk',
      },
    ],
  },
  {
    category: 'Fartøytyper',
    terms: [
      {
        term: 'PSV',
        definition: 'Platform Supply Vessel. Forsyningsfartøy som transporterer last til offshore-installasjoner.',
      },
      {
        term: 'AHTS',
        definition: 'Anchor Handling Tug Supply. Kraftig fartøy for ankerhåndtering og tauing av rigger.',
      },
      {
        term: 'CSV',
        definition: 'Construction Support Vessel. Spesialbygde fartøy for undervannsarbeid og konstruksjon.',
      },
      {
        term: 'Brønnbåt',
        definition: 'Fartøy for transport av levende fisk mellom oppdrettsanlegg og slakteri.',
      },
      {
        term: 'Servicefartøy',
        definition: 'Mindre fartøy som utfører daglige operasjoner ved oppdrettsanlegg.',
      },
      {
        term: 'Cruiseskip',
        definition: 'Passasjerfartøy designet for fritidsreiser med overnatting og underholdning.',
      },
      {
        term: 'RoRo',
        definition: 'Roll-on/Roll-off. Fartøy designet for lasting av kjøretøy som ruller om bord.',
      },
      {
        term: 'Bulkskip',
        definition: 'Fartøy for transport av løs last som korn, malm eller kull.',
      },
      {
        term: 'Tankskip',
        definition: 'Fartøy for transport av flytende last som olje, kjemikalier eller gass.',
      },
    ],
  },
  {
    category: 'Arbeidsordninger',
    terms: [
      {
        term: 'Turnus',
        definition: 'Rotasjonsordning mellom arbeid og friperioder. Vanlige ordninger er 2-4, 4-4, og 1-1.',
        link: '/turnus',
      },
      {
        term: '2-4 turnus',
        definition: '2 uker på jobb, 4 uker fri. Vanlig i offshore-sektoren.',
        link: '/turnus',
      },
      {
        term: '4-4 turnus',
        definition: '4 uker på jobb, 4 uker fri. Standard i mange offshorerederi.',
        link: '/turnus',
      },
      {
        term: 'Likebehandling',
        definition: 'Innleide arbeidstakere skal ha samme lønns- og arbeidsvilkår som fast ansatte (Arbeidsmiljøloven §14-12a).',
      },
      {
        term: 'Solidaransvar',
        definition: 'Innleier er medansvarlig for at innleid arbeidstaker får riktig lønn og feriepenger.',
      },
    ],
  },
  {
    category: 'Maritime Myndigheter & Organisasjoner',
    terms: [
      {
        term: 'Sjøfartsdirektoratet',
        definition: 'Norsk forvaltningsorgan for sikkerhet til sjøs. Utsteder sertifikater og godkjenninger.',
        link: 'https://www.sdir.no/',
      },
      {
        term: 'DNV',
        definition: 'Det Norske Veritas. Internasjonalt klassifikasjonsselskap som sertifiserer skip og maritime aktører.',
        link: 'https://www.dnv.com/',
      },
      {
        term: 'IMO',
        definition: 'International Maritime Organization. FNs sjøfartsorganisasjon som utvikler internasjonale regler.',
        link: 'https://www.imo.org/',
      },
      {
        term: 'NIS/NOR',
        definition: 'Norsk Internasjonalt Skipsregister / Norsk Ordinært Skipsregister. Registre for norske fartøy.',
      },
      {
        term: 'Arbeidstilsynet',
        definition: 'Godkjenner bemanningsforetak og fører tilsyn med arbeidsvilkår.',
        link: 'https://www.arbeidstilsynet.no/',
      },
    ],
  },
];

// DefinedTermSet schema for SEO
const definedTermSetSchema = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": "https://bluecrew.no/ordbok",
  name: "Maritim Ordbok",
  description: "Komplett ordbok over maritime faguttrykk, sertifikater og begreper på norsk",
  inLanguage: "nb-NO",
  publisher: {
    "@type": "Organization",
    name: "Bluecrew AS",
    url: "https://bluecrew.no"
  },
  hasPart: glossaryTerms.flatMap(category => 
    category.terms.map(t => ({
      "@type": "DefinedTerm",
      name: t.term,
      description: t.definition,
      inDefinedTermSet: "https://bluecrew.no/ordbok"
    }))
  )
};

export default function OrdbokPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetSchema) }}
      />
      <SchemaMarkup type="breadcrumb" breadcrumbs={breadcrumbs} />

      <main>
        {/* Hero Section */}
        <Section variant="navy" className="pt-20">
          <Container size="lg">
            <div className="py-12 md:py-20">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-gold-400" />
                  </div>
                  <span className="text-gold-400 font-medium">Referanse</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-medium text-cream-50 mb-6">
                  Maritim Ordbok
                </h1>

                <p className="text-xl text-cream-100/80 mb-8">
                  Komplett oversikt over maritime faguttrykk, sertifikater, stillinger og begreper. 
                  Alt du trenger å vite for en karriere til sjøs.
                </p>

                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <span>{glossaryTerms.reduce((acc, cat) => acc + cat.terms.length, 0)}+ begreper</span>
                  <span>•</span>
                  <span>{glossaryTerms.length} kategorier</span>
                  <span>•</span>
                  <span>Oppdatert 2026</span>
                </div>
              </div>
            </div>
        </Container>
      </Section>

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-100">
        <Container size="lg">
          <div className="py-3">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </Container>
      </div>

      {/* Quick Navigation */}
      <Section noPadding className="bg-slate-50 py-8">
          <Container size="lg">
            <div className="flex flex-wrap gap-3">
              {glossaryTerms.map((category) => (
                <a
                  key={category.category}
                  href={`#${category.category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'og')}`}
                  className="px-4 py-2 bg-white rounded-full text-sm font-medium text-navy-900 hover:bg-navy-900 hover:text-white transition-colors border border-slate-200"
                >
                  {category.category}
                </a>
              ))}
            </div>
          </Container>
        </Section>

        {/* Glossary Content */}
        <Section className="bg-white">
          <Container size="lg">
            <div className="space-y-16">
              {glossaryTerms.map((category) => (
                <div 
                  key={category.category} 
                  id={category.category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'og')}
                  className="scroll-mt-24"
                >
                  <h2 className="text-2xl md:text-3xl font-medium text-navy-900 mb-8 flex items-center gap-3">
                    <Anchor className="w-6 h-6 text-gold-500" />
                    {category.category}
                  </h2>

                  <div className="grid gap-4">
                    {category.terms.map((item) => (
                      <div
                        key={item.term}
                        className="bg-slate-50 rounded-xl p-6 hover:bg-slate-100 transition-colors"
                      >
                        <div className="flex flex-col md:flex-row md:items-start gap-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-medium text-navy-900 mb-2">
                              {item.term}
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                              {item.definition}
                            </p>
                          </div>
                          {item.link && (
                            <div className="shrink-0">
                              {item.link.startsWith('http') ? (
                                <a
                                  href={item.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-sm text-sky-600 hover:text-sky-700 font-medium"
                                >
                                  Les mer
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              ) : (
                                <Link
                                  href={item.link}
                                  className="inline-flex items-center gap-2 text-sm text-sky-600 hover:text-sky-700 font-medium"
                                >
                                  Les mer →
                                </Link>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* CTA Section */}
        <Section className="bg-navy-900">
          <Container size="md">
            <div className="text-center py-12">
              <h2 className="text-2xl md:text-3xl font-medium text-cream-50 mb-4">
                Klar for en karriere til sjøs?
              </h2>
              <p className="text-cream-100/80 mb-8">
                Se ledige stillinger eller registrer deg i vår database.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/stillinger"
                  className="inline-flex items-center justify-center gap-2 bg-gold-500 text-navy-900 italic px-6 py-3 rounded-lg font-medium hover:bg-gold-400 transition-colors"
                >
                  Se stillinger
                </Link>
                <Link
                  href="/meld-interesse"
                  className="inline-flex items-center justify-center gap-2 bg-cream-100/10 text-cream-50 px-6 py-3 rounded-lg font-medium hover:bg-cream-100/20 transition-colors"
                >
                  Meld interesse
                </Link>
              </div>
            </div>
          </Container>
        </Section>
      </main>
    </>
  );
}

