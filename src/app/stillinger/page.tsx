import { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import { Briefcase } from "@/components/icons";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import { getImageUrl, IMAGE_PATHS } from "@/lib/images";
import StillingerClient from "./StillingerClient";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

const breadcrumbs = [
  { name: "Hjem", url: "/" },
  { name: "Stillinger", url: "/stillinger" },
];

const faqItems = [
  {
    question: 'Hvordan søker jeg på maritime stillinger?',
    answer: 'Opprett en gratis profil på Bluecrew, last opp sertifikater og CV, og søk direkte på ledige stillinger. Du kan også registrere deg for å bli kontaktet når passende stillinger dukker opp.',
  },
  {
    question: 'Hvilke stillinger finnes for sjøfolk?',
    answer: 'Bluecrew formidler stillinger som kaptein, styrmann, maskinist, ETO, matros, motormann og kokk. Vi dekker offshore, havbruk, tank, bulk og andre maritime sektorer.',
  },
  {
    question: 'Trenger jeg sertifikater for å jobbe til sjøs?',
    answer: 'Ja, de fleste maritime stillinger krever gyldige sertifikater fra Sjøfartsdirektoratet. Typiske krav inkluderer STCW, sikkerhetskurs, og stillingsspesifikke sertifikater som D1-D6 eller maskinistsertifikat.',
  },
  {
    question: 'Hva er lønnen for maritime stillinger?',
    answer: 'Maritime lønninger varierer fra ca. 450.000 kr for entry-level stillinger til over 1.200.000 kr for erfarne kapteiner og maskinister offshore. Lønn avhenger av stilling, erfaring, turnus og sektor.',
  },
];

export const metadata: Metadata = {
  title: "Ledige Maritime Stillinger 2026 | Sjøfolk Jobb",
  description:
    "Finn ledige maritime stillinger hos Bluecrew - Norges bemanningsbyrå for sjøfolk. Kaptein, styrmann, maskinist, matros og kokk. Offshore, havbruk og rederi stillinger. Søk via vikarbyrå nå!",
  keywords: [
    "maritime stillinger",
    "sjøfolk jobb",
    "bemanningsbyrå sjøfolk",
    "vikarbyrå maritim",
    "offshore stillinger",
    "havbruk jobb",
    "rederi stillinger",
    "kaptein jobb",
    "maskinist stilling",
    "matros jobb",
    "maritim bemanning",
    "jobb til sjøs",
  ],
  openGraph: {
    title: "Ledige Maritime Stillinger | Bemanningsbyrå Bluecrew",
    description:
      "Finn din neste sjøfolk jobb via Norges maritime bemanningsbyrå. Offshore, havbruk og rederi stillinger.",
    url: "https://bluecrew.no/stillinger",
    siteName: "Bluecrew AS",
    locale: "nb_NO",
    type: "website",
    images: [
      {
        url: "https://bluecrew.no/icon.png",
        width: 512,
        height: 512,
        alt: "Bluecrew-logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Ledige Maritime Stillinger | Bemanningsbyrå Bluecrew",
    description:
      "Finn din neste sjøfolk jobb via Norges maritime bemanningsbyrå.",
    images: ["https://bluecrew.no/icon.png"],
  },
  alternates: {
    canonical: "https://bluecrew.no/stillinger",
  },
};

// Total number of open positions (for hero badge)
const TOTAL_OPEN_POSITIONS = 15;

function JobListSkeleton() {
  return (
    <div className="space-y-12">
      {/* Tabs skeleton */}
      <div className="flex justify-center gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-14 w-32 bg-slate-200 rounded-xl animate-pulse" />
        ))}
      </div>

      {/* Cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="bg-linear-to-br from-navy-900 via-navy-800 to-navy-900/90 rounded-2xl p-8 min-h-[280px] animate-pulse"
          >
            <div className="h-8 w-28 bg-navy-700 rounded mb-6" />
            <div className="space-y-3 flex-1">
              <div className="h-8 bg-navy-700 rounded w-2/3" />
              <div className="h-6 bg-navy-700/50 rounded w-1/2" />
            </div>
            <div className="mt-8">
              <div className="h-12 w-28 bg-gold-500/30 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StillingerPage() {
  return (
    <>
      <SchemaMarkup type="breadcrumb" breadcrumbs={breadcrumbs} />
      <SchemaMarkup type="faq" faqItems={faqItems} />
      <main>
      {/* Hero Section */}
      <section className="relative bg-navy-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[4rem_4rem]" />
        
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src={getImageUrl(IMAGE_PATHS.hero.background)}
            alt="Maritime stillinger"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>

        <Container size="lg" className="relative z-10">
          <div className="min-h-[85vh] flex items-center py-20 lg:py-12">
            <div className="max-w-4xl">
              {/* Badge */}
              <div className="mb-6 lg:mb-8">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold-400/10 border border-gold-400/20 rounded-full text-gold-400 text-sm font-medium backdrop-blur-sm">
                  <Briefcase className="w-4 h-4" />
                  {TOTAL_OPEN_POSITIONS} ledige stillinger
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-cream-50 mb-4 lg:mb-6 leading-[0.95] tracking-tight">
                Ledige <span className="italic text-gold-400">Stillinger</span>
              </h1>

              {/* Subheading */}
              <p className="text-xl md:text-2xl lg:text-3xl text-cream-100/90 mb-8 lg:mb-10 leading-relaxed max-w-2xl">
                Finn din neste jobb til sjøs. Offshore, oppdrett eller shipping - vi har åpne stillinger for deg.
              </p>

              {/* Stats */}
              <div className="flex gap-8 lg:gap-12">
                <div>
                  <div className="text-4xl lg:text-5xl font-bold text-gold-400 mb-1">2,000+</div>
                  <div className="text-xs text-cream-100/70 uppercase tracking-wider font-medium">
                    Registrerte sjøfolk
                  </div>
                </div>
                <div>
                  <div className="text-4xl lg:text-5xl font-bold text-gold-400 mb-1">3</div>
                  <div className="text-xs text-cream-100/70 uppercase tracking-wider font-medium">
                    Maritime sektorer
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-100">
        <Container size="lg">
          <div className="py-3">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </Container>
      </div>

      {/* Job listings with Kanban */}
      <Section>
        <Container size="lg">
          <Suspense fallback={<JobListSkeleton />}>
            <StillingerClient />
          </Suspense>
        </Container>
      </Section>
    </main>
    </>
  );
}

