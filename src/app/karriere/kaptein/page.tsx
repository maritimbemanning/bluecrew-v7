import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { IMAGE_PATHS, getImageUrl } from '@/lib/images';
import {
  Compass,
  ChevronRight,
  Anchor,
  BookOpen,
  Award,
  Clock,
  Ship,
  Shield,
  Users,
  TrendingUp,
  CheckCircle2,
  AlertCircle
} from '@/components/icons';
import Section from '@/components/ui/Section';
import SummaryBox from '@/components/ui/SummaryBox';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Accordion from '@/components/ui/Accordion';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Hvordan bli kaptein 2026: Utdanning, sertifikat, lønn',
  description: 'Steg-for-steg guide til kaptein: nautisk utdanning, STCW-sertifikater, fartstid, lønn og karrierevei fra kadett til skipsfører.',
  keywords: [
    'bli kaptein',
    'kaptein utdanning',
    'kaptein sertifikater',
    'skipsfører karriere',
    'nautisk fagskole',
    'STCW kaptein',
  ],
  openGraph: {
    title: 'Hvordan bli kaptein 2026: Utdanning, sertifikat, lønn',
    description: 'Norsk guide til kaptein: utdanning, sertifikater, fartstid og karrierevei.',
    url: 'https://bluecrew.no/karriere/kaptein',
    siteName: 'Bluecrew AS',
    locale: 'nb_NO',
    type: 'article',
    images: [
      {
        url: 'https://bluecrew.no/icon.png',
        width: 512,
        height: 512,
        alt: 'Bluecrew-logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Hvordan bli kaptein 2026: Utdanning, sertifikat, lønn',
    description: 'Steg-for-steg guide til kaptein: utdanning, sertifikater, fartstid og lønn.',
    images: ['https://bluecrew.no/icon.png'],
  },
  alternates: {
    canonical: 'https://bluecrew.no/karriere/kaptein',
  },
};

const faqs = [
  {
    id: 'faq-1',
    title: 'Hvor lang tid tar det å bli kaptein?',
    content: 'Det tar typisk 10-15 år å bli kaptein fra du starter som kadett eller matros. Du må fullføre nautisk utdanning, samle tilstrekkelig fartstid, og gradvis avansere gjennom styrmannsgradene. Noen oppnår kapteinsertifikat raskere med intensiv fartstid, mens andre bruker lengre tid avhengig av karrierevalg og tilgjengelige stillinger.',
  },
  {
    id: 'faq-2',
    title: 'Kan man bli kaptein uten nautisk fagskole?',
    content: 'Nei, for å bli kaptein på større skip kreves formell nautisk utdanning. Det finnes ulike veier inn, men alle krever godkjent utdanning fra maritim fagskole eller høyskole. For mindre fartøy (under visse tonnasje-grenser) kan det være enklere krav, men for offshore og større handelsskip er full nautisk utdanning obligatorisk.',
  },
  {
    id: 'faq-3',
    title: 'Hva er forskjellen på kaptein og skipsfører?',
    content: 'Kaptein og skipsfører brukes ofte om hverandre, men teknisk sett er "skipsfører" den offisielle tittelen i norsk lovgivning. I dagligtale sier vi kaptein. På engelskspråklige skip brukes "Master" eller "Captain". Uansett tittel har personen øverste kommando og ansvar for skipet.',
  },
  {
    id: 'faq-4',
    title: 'Hvor mye tjener en kaptein?',
    content: 'Kapteinlønn varierer fra 600 000 til over 1 200 000 kr årlig, avhengig av sektor, fartøytype og erfaring. Offshore-kapteiner tjener typisk mest, etterfulgt av tankskip og spesialskip. Cruise og ferge ligger ofte lavere, men har andre fordeler som mer forutsigbar turnus.',
  },
  {
    id: 'faq-5',
    title: 'Hvilke personlige egenskaper trenger en kaptein?',
    content: 'En god kaptein må ha sterke lederegenskaper, evne til å ta raske beslutninger under press, god kommunikasjonsevne, og teknisk forståelse for skipets systemer. Ansvarsbevissthet, integritet og evnen til å holde roen i krisesituasjoner er avgjørende. Mange kapteiner fremhever også viktigheten av å være en god lytter og kunne bygge tillit hos mannskapet.',
  },
];

// HowTo Schema for AI Search and Rich Snippets
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Hvordan bli kaptein i Norge",
  "description": "Steg-for-steg guide til å bli skipsfører/kaptein i den norske maritime næringen",
  "totalTime": "PT87600H", // ~10 years
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "NOK",
    "value": "150000"
  },
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Fullfør videregående skole",
      "text": "Ta studiespesialiserende eller yrkesfag. Matematikk og fysikk er nyttig.",
      "url": "https://bluecrew.no/karriere/kaptein#steg-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Søk nautisk fagskole eller høyskole",
      "text": "2-årig fagskole eller 3-årig bachelor i nautikk. Gir grunnlag for D4-sertifikat.",
      "url": "https://bluecrew.no/karriere/kaptein#steg-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Fullfør kadett-/praksisprogram",
      "text": "12-18 måneder opplæring om bord som del av utdanningen.",
      "url": "https://bluecrew.no/karriere/kaptein#steg-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Få første sertifikat (D4/D5)",
      "text": "Søk Sjøfartsdirektoratet om dekksoffisersertifikat etter bestått utdanning.",
      "url": "https://bluecrew.no/karriere/kaptein#steg-4"
    },
    {
      "@type": "HowToStep",
      "position": 5,
      "name": "Jobb som styrmann og samle fartstid",
      "text": "3-5 år som 2. eller 1. styrmann. Dokumenter fartstid nøye.",
      "url": "https://bluecrew.no/karriere/kaptein#steg-5"
    },
    {
      "@type": "HowToStep",
      "position": 6,
      "name": "Oppgrader sertifikat til D1/D2",
      "text": "Med tilstrekkelig fartstid kan du søke om høyere sertifikat.",
      "url": "https://bluecrew.no/karriere/kaptein#steg-6"
    },
    {
      "@type": "HowToStep",
      "position": 7,
      "name": "Bli kaptein",
      "text": "Med D1-sertifikat og erfaring som overstyrmann kan du søke kapteinsstillinger.",
      "url": "https://bluecrew.no/karriere/kaptein#steg-7"
    }
  ]
};

const breadcrumbs = [
  { name: 'Hjem', url: '/' },
  { name: 'Karriere', url: '/karriere' },
  { name: 'Kaptein', url: '/karriere/kaptein' },
];

export default function KapteinKarrierePage() {
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
      
      {/* HowTo Schema for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <main>
        {/* Hero Section */}
        <div className="relative min-h-screen flex items-center overflow-hidden bg-navy-900 pt-20">
          <div className="absolute inset-0 z-0">
            <Image
              src={getImageUrl(IMAGE_PATHS.careers.kaptein)}
              alt="Kaptein på skipsbro - maritim lederstilling"
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
                  <Compass className="w-8 h-8 text-gold-400" />
                </div>
                <div>
                  <span className="text-gold-400 text-sm font-medium tracking-wider uppercase">Karrierevei</span>
                  <h1 className="text-4xl md:text-6xl font-medium text-cream-50">
                    Bli <em className="not-italic font-medium text-gold-400">Kaptein</em>
                  </h1>
                </div>
              </div>

              <p className="text-xl text-cream-100/90 mb-8 leading-relaxed font-medium">
                Kapteinen er skipets øverste leder med fullt ansvar for fartøy, mannskap, last og passasjerer.
                En krevende, men givende karriere for de som drømmer om å styre sitt eget skip.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="bg-gold-400/10 border border-gold-400/20 rounded-lg px-6 py-3 backdrop-blur-sm">
                  <span className="text-gold-300/70 text-xs uppercase tracking-wider">Lønnsnivå</span>
                  <p className="text-cream-50 font-bold text-lg">600k – 1,2M kr</p>
                </div>
                <div className="bg-gold-400/10 border border-gold-400/20 rounded-lg px-6 py-3 backdrop-blur-sm">
                  <span className="text-gold-300/70 text-xs uppercase tracking-wider">Tid til stilling</span>
                  <p className="text-cream-50 font-bold text-lg">10-15 år</p>
                </div>
                <div className="bg-gold-400/10 border border-gold-400/20 rounded-lg px-6 py-3 backdrop-blur-sm">
                  <span className="text-gold-300/70 text-xs uppercase tracking-wider">Utdanning</span>
                  <p className="text-cream-50 font-bold text-lg">Nautisk fagskole</p>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Breadcrumbs */}
        <div className="bg-white border-b border-slate-100">
          <Container size="md">
            <div className="py-3">
              <Breadcrumbs items={breadcrumbs} />
            </div>
          </Container>
        </div>

        <Section>
          <Container size="md">
            <SummaryBox variant="gold">
              <p>
                <strong>Kaptein:</strong> Skipets øverste leder med fullt ansvar for sikkerhet, mannskap og last.
                Lønn: 600 000 – 1 200 000+ kr. Krever nautisk utdanning og 10-15 års erfaring fra dekk og styrmannsgrader.
              </p>
            </SummaryBox>
          </Container>
        </Section>

        {/* What does a captain do */}
        <Section>
          <Container size="lg">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-medium text-navy mb-6">
                  Hva gjør en kaptein?
                </h2>
                <div className="prose prose-lg max-w-none text-slate-600">
                  <p>
                    Kapteinen, eller skipsføreren som er den offisielle norske tittelen, har det øverste ansvaret
                    for alt som skjer om bord på et skip. Dette inkluderer sikker navigasjon, mannskapets ve og vel,
                    lastens tilstand, og overholdelse av alle maritime lover og regler.
                  </p>
                  <p>
                    I praksis betyr dette at kapteinen må mestre et bredt spekter av ferdigheter. Du må kunne
                    navigere i alle værforhold, håndtere krisesituasjoner, lede et team med ulik bakgrunn og
                    kompetanse, og samtidig holde orden på økonomien om bord. Det er en jobb som krever både
                    teknisk dyktighet og sterke mellommenneskelige ferdigheter.
                  </p>
                  <p>
                    Mange tenker på kapteinen som den som står på broen og styrer skipet, men i virkeligheten
                    tilbringer kapteinen mye tid på administrative oppgaver. Dokumentasjon, rapportering til
                    rederiet, planlegging av vedlikehold, og kommunikasjon med havnemyndigheter er en stor del
                    av hverdagen.
                  </p>
                  <p>
                    Ansvaret er enormt. Kapteinen har kommandomyndighet og er juridisk ansvarlig for skipet.
                    Ved ulykker eller hendelser er det kapteinen som må stå til rette. Dette ansvaret kompenseres
                    med høy lønn og stor respekt i maritim sektor.
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
                      Morgenbrief med offiserer
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky shrink-0 mt-0.5" />
                      Gjennomgang av seilingsplan
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky shrink-0 mt-0.5" />
                      Sikkerhetsinspeksjoner
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky shrink-0 mt-0.5" />
                      Kommunikasjon med rederi
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky shrink-0 mt-0.5" />
                      Dokumentasjon og rapporter
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky shrink-0 mt-0.5" />
                      Brovakt ved krevende forhold
                    </li>
                  </ul>
                </div>

                <div className="bg-sky/10 rounded-2xl p-6">
                  <h3 className="font-medium text-navy mb-4 flex items-center gap-2">
                    <Ship className="w-5 h-5 text-sky" />
                    Fartøytyper
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• Offshore supply (PSV, AHTS)</li>
                    <li>• Konstruksjonsskip (CSV)</li>
                    <li>• Tankskip og kjemikalietankere</li>
                    <li>• Cruise- og passasjerskip</li>
                    <li>• Ferger og hurtigbåter</li>
                    <li>• Havbruksfartøy (brønnbåt)</li>
                    <li>• Lasteskip og bulkcarriers</li>
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Responsibilities */}
        <Section variant="slate">
          <Container size="lg">
            <h2 className="text-3xl font-medium text-navy mb-8 text-center">
              Ansvarsområder
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Shield,
                  title: 'Sikkerhet',
                  description: 'Øverste ansvar for sikkerhet til mannskap, passasjerer og fartøy. Leder sikkerhetsøvelser og beredskap.',
                },
                {
                  icon: Compass,
                  title: 'Navigasjon',
                  description: 'Planlegger seilingsruter, godkjenner navigasjonsbeslutninger, og overtar kommando i krevende situasjoner.',
                },
                {
                  icon: Users,
                  title: 'Personalledelse',
                  description: 'Leder og motiverer mannskapet, løser konflikter, og sørger for godt arbeidsmiljø om bord.',
                },
                {
                  icon: BookOpen,
                  title: 'Compliance',
                  description: 'Sikrer at skipet følger alle maritime regler, flaggstatkrav, og internasjonale konvensjoner.',
                },
                {
                  icon: TrendingUp,
                  title: 'Økonomi',
                  description: 'Ansvar for budsjett om bord, drivstofføkonomi, og kostnadseffektiv drift.',
                },
                {
                  icon: Award,
                  title: 'Representasjon',
                  description: 'Representerer rederiet overfor myndigheter, kunder og samarbeidspartnere.',
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

        {/* Step-by-Step Career Path - AI Search Optimized */}
        <Section className="bg-white">
          <Container size="lg">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-medium text-navy mb-4">
                Hvordan bli kaptein i Norge?
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Steg-for-steg veien fra start til skipsfører. Typisk 10-15 år, avhengig av tempo og muligheter.
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-sky-400 via-gold-400 to-green-400" />

              <div className="space-y-8 lg:space-y-0">
                {[
                  { step: 1, title: 'Fullfør videregående', time: 'År 0-3', desc: 'Studiespesialiserende eller yrkesfag. Matematikk og fysikk anbefales.' },
                  { step: 2, title: 'Nautisk fagskole/høyskole', time: 'År 3-6', desc: '2-3 år utdanning. Gir grunnlag for D4/D5-sertifikat. Inkluderer teori og simulatortrening.' },
                  { step: 3, title: 'Kadett-/praksisprogram', time: 'År 6-7', desc: '12-18 måneder opplæring om bord som del av utdanningen. Første erfaring til sjøs.' },
                  { step: 4, title: 'Første styrmannsjobb', time: 'År 7-8', desc: 'Start som 3. eller 2. styrmann. Søk bredt og vær fleksibel på fartøytype.' },
                  { step: 5, title: 'Samle fartstid som styrmann', time: 'År 8-12', desc: 'Minimum 36 måneder som ansvarlig navigasjonsoffiser. Dokumenter alt.' },
                  { step: 6, title: 'Oppgrader til overstyrmann', time: 'År 12-14', desc: 'Med erfaring blir du 1. styrmann/overstyrmann. Nestkommanderende om bord.' },
                  { step: 7, title: 'Bli kaptein', time: 'År 14+', desc: 'Med D1-sertifikat og bred erfaring kan du søke kapteinsstillinger. Gratulerer!' },
                ].map((item, index) => (
                  <div key={item.step} id={`steg-${item.step}`} className={`relative flex flex-col lg:flex-row items-center gap-6 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                    <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:text-left lg:pl-12'}`}>
                      <span className="text-sm font-medium text-gold-600">{item.time}</span>
                      <h3 className="text-xl font-medium text-navy mt-1 mb-2">{item.title}</h3>
                      <p className="text-slate-600">{item.desc}</p>
                    </div>
                    <div className="relative z-10 w-12 h-12 bg-linear-to-br from-sky-500 to-navy-700 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                      {item.step}
                    </div>
                    <div className="flex-1 hidden lg:block" />
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* Sector Comparison Table - AI Search Optimized */}
        <Section variant="slate">
          <Container size="lg">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-medium text-navy mb-4">
                Kaptein i ulike sektorer
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Sammenlign lønn, turnus og krav på tvers av maritime sektorer.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-xl shadow-sm overflow-hidden">
                <thead className="bg-navy-900 text-cream-50">
                  <tr>
                    <th className="px-6 py-4 text-left font-medium">Sektor</th>
                    <th className="px-6 py-4 text-left font-medium">Årslønn</th>
                    <th className="px-6 py-4 text-left font-medium">Turnus</th>
                    <th className="px-6 py-4 text-left font-medium">Ekstra krav</th>
                    <th className="px-6 py-4 text-left font-medium">Tilgang</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-navy">Offshore (PSV/AHTS)</td>
                    <td className="px-6 py-4 text-slate-700">900k – 1,2M</td>
                    <td className="px-6 py-4 text-slate-700">4-4 eller 2-4</td>
                    <td className="px-6 py-4 text-slate-700">DP-sertifikat</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">Moderat</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-navy">Tankskip</td>
                    <td className="px-6 py-4 text-slate-700">800k – 1,1M</td>
                    <td className="px-6 py-4 text-slate-700">3-3 eller 4-4</td>
                    <td className="px-6 py-4 text-slate-700">Tanker endorsement</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">Moderat</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-navy">Cruise/Passasjer</td>
                    <td className="px-6 py-4 text-slate-700">700k – 950k</td>
                    <td className="px-6 py-4 text-slate-700">Varierende</td>
                    <td className="px-6 py-4 text-slate-700">Passasjerhåndtering</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Vanskelig</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-navy">Havbruk (Brønnbåt)</td>
                    <td className="px-6 py-4 text-slate-700">750k – 950k</td>
                    <td className="px-6 py-4 text-slate-700">2-4 eller 1-2</td>
                    <td className="px-6 py-4 text-slate-700">Ofte lokalt D2</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Tilgjengelig</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-navy">Ferge/Hurtigbåt</td>
                    <td className="px-6 py-4 text-slate-700">600k – 800k</td>
                    <td className="px-6 py-4 text-slate-700">Dagskift/Ukeskift</td>
                    <td className="px-6 py-4 text-slate-700">Hurtigbåtsertifikat</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Tilgjengelig</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-navy">Konstruksjon (CSV)</td>
                    <td className="px-6 py-4 text-slate-700">950k – 1,2M+</td>
                    <td className="px-6 py-4 text-slate-700">4-4</td>
                    <td className="px-6 py-4 text-slate-700">DP Full, ROV-kjennskap</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Vanskelig</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 text-center">
              <Link href="/lonn/kaptein" className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-medium">
                Se detaljert lønnsoversikt for kaptein
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </Container>
        </Section>

        {/* Education and Certifications */}
        <Section>
          <Container size="lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-medium text-navy mb-6">
                  Utdanning og krav
                </h2>
                <div className="prose prose-lg max-w-none text-slate-600">
                  <p>
                    For å bli kaptein må du gjennom en omfattende utdanning som kombinerer teori og praksis.
                    De fleste starter med videregående skole med maritim linje, etterfulgt av nautisk fagskole
                    eller bachelor i nautikk ved en høyskole.
                  </p>
                  <p>
                    Utdanningen tar minimum 3 år på fagskole, og du må i tillegg samle fartstid for å kunne
                    løse ut sertifikater. For å få kapteinsertifikat (STCW II/2) kreves betydelig fartstid
                    som styrmann, typisk 36 måneder som ansvarlig offiser.
                  </p>
                  <p>
                    I tillegg til grunnutdanning må du ta en rekke tilleggskurs som GOC (radio), Advanced Fire
                    Fighting, Medical Care, og Ship Security Officer. Mange offshore-rederier krever også
                    DP-sertifikat (Dynamic Positioning).
                  </p>
                  <h3>Helsekrav</h3>
                  <p>
                    Du må ha gyldig helseerklæring for sjøfolk. Kravene inkluderer godt syn (kan korrigeres),
                    god hørsel, og generelt god helse. Helseerklæringen må fornyes regelmessig, vanligvis
                    hvert andre år.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-navy rounded-2xl p-6 text-cream-100">
                  <h3 className="font-medium text-lg mb-4 text-cream-50">Påkrevde sertifikater</h3>
                  <ul className="space-y-3">
                    {[
                      'STCW II/2 – Kapteinssertifikat',
                      'GOC – General Operator Certificate',
                      'Basic Safety Training (BST)',
                      'Advanced Fire Fighting',
                      'Medical Care',
                      'Ship Security Officer (SSO)',
                      'Gyldig helseerklæring',
                    ].map((cert, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-sky shrink-0" />
                        <span className="text-cream-100">{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
                    <div>
                      <h3 className="font-medium text-amber-800 mb-2">Viktig om fartstid</h3>
                      <p className="text-sm text-amber-700">
                        Fartstid må dokumenteres nøyaktig i sertifikatbok. Kun tid på kvalifiserende stillinger
                        teller. Sjøfartsdirektoratet har strenge krav, så sørg for at all fartstid registreres
                        korrekt underveis.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Career Path */}
        <Section variant="slate">
          <Container size="lg">
            <h2 className="text-3xl font-medium text-navy mb-8 text-center">
              Karriereveien til kaptein
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none text-slate-600 mb-8">
                <p>
                  Veien til kapteinsstolen er lang, men strukturert. De fleste starter som kadett eller matros
                  og jobber seg oppover gjennom styrmannsgradene. Her er den typiske karriereveien:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { step: 1, title: 'Kadett / Lærling', years: '0-2 år', desc: 'Praktisk opplæring om bord kombinert med skole' },
                  { step: 2, title: 'Matros', years: '2-4 år', desc: 'Dekksarbeid, vakthold, grunnleggende erfaring' },
                  { step: 3, title: '3. Styrmann', years: '4-6 år', desc: 'Første offiserstilling, brovakt under oppsyn' },
                  { step: 4, title: '2. Styrmann', years: '6-8 år', desc: 'Selvstendig brovakt, lastansvar' },
                  { step: 5, title: '1. Styrmann', years: '8-12 år', desc: 'Nestkommanderende, stedfortreder for kaptein' },
                  { step: 6, title: 'Kaptein', years: '12+ år', desc: 'Øverste kommando, fullt ansvar' },
                ].map((item) => (
                  <div
                    key={item.step}
                    className={`rounded-xl p-4 ${
                      item.step === 6 ? 'bg-sky text-white' : 'bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        item.step === 6 ? 'bg-white text-sky' : 'bg-sky/10 text-sky'
                      }`}>
                        {item.step}
                      </span>
                      <span className={`text-sm ${item.step === 6 ? 'text-sky-100' : 'text-slate-500'}`}>
                        {item.years}
                      </span>
                    </div>
                    <h3 className={`font-medium mb-1 ${item.step === 6 ? 'text-white' : 'text-navy'}`}>
                      {item.title}
                    </h3>
                    <p className={`text-sm ${item.step === 6 ? 'text-sky-100' : 'text-slate-600'}`}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 prose prose-lg max-w-none text-slate-600">
                <h3>Spesialiseringer</h3>
                <p>
                  Etter å ha oppnådd kapteinsertifikat kan du spesialisere deg innen ulike områder:
                </p>
                <ul>
                  <li><strong>Offshore kaptein:</strong> Supply, konstruksjon, subsea. Krever ofte DP-sertifikat.</li>
                  <li><strong>Tankskip kaptein:</strong> Olje, kjemikalier, LNG. Krever spesialkompetanse på last.</li>
                  <li><strong>Cruise kaptein:</strong> Passasjerfokus, høy servicegrad, store skip.</li>
                  <li><strong>Havbruk fartøysjef:</strong> Brønnbåter, servicefartøy. Kombinerer sjøfart med oppdrett.</li>
                </ul>
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
                Klar for å starte reisen mot kaptein?
              </h2>
              <p className="text-xl text-cream-100/80 mb-8 max-w-xl mx-auto">
                Registrer deg hos Bluecrew. Vi hjelper deg med å finne stillinger som bygger din karriere.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/meld-interesse">
                  <Button size="lg" className="bg-sky hover:bg-sky-dark">
                    Registrer deg nå
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/lonn/kaptein">
                  <Button size="lg" variant="outline" className="border-gold-400/30 text-cream-50 hover:bg-gold-400/10">
                    Se kapteinlønn
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

