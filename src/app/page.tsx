import type { Metadata } from 'next';
import dynamic from "next/dynamic";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import HeroSection from "@/components/sections/HeroSection";
import TrustBar from "@/components/sections/TrustBar";
import SectionDivider from "@/components/sections/SectionDivider";
import WhyBluecrewSection from "@/components/sections/WhyBluecrewSection";

// Lazy load below-the-fold sections to reduce initial JS bundle
const AktueltSection = dynamic(() => import("@/components/sections/AktueltSection"), {
  loading: () => <div className="py-16 md:py-20 bg-navy-900 min-h-[400px]" />,
});

const TeamGrid = dynamic(() => import("@/components/sections/TeamGrid"), {
  loading: () => <div className="py-12 bg-white" />,
});

export const metadata: Metadata = {
  title: 'Bemanningsbyrå | Maritim Bemanning for Oppdrett, Offshore og Shipping',
  description: 'Bemanningsbyrå for oppdrett, havbruk og maritim sektor. Kvalifiserte sjøfolk til brønnbåt, servicebåt og offshore. DNV-sertifisert. Mannskap på 24t →',
  keywords: ['bemanningsbyrå', 'maritim bemanning', 'oppdrett bemanning', 'offshore bemanning', 'shipping bemanning', 'havbruk bemanning', 'brønnbåt bemanning', 'bluecrew'],
  openGraph: {
    title: 'Bemanningsbyrå | Maritim Bemanning for Oppdrett, Offshore og Shipping',
    description: 'Maritim bemanning med kvalitetssikrede tjenester innenfor Oppdrett, Offshore, Fiskeri og Rederi.',
    url: 'https://bluecrew.no',
    siteName: 'Bluecrew',
    locale: 'nb_NO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bemanningsbyrå og Akvaservice | Maritim Bemanning',
    description: 'Maritim bemanning med kvalitetssikrede tjenester innenfor Oppdrett, Offshore, Fiskeri og Rederi.',
  },
  alternates: {
    canonical: 'https://bluecrew.no',
  },
};

// Organization schema for Google Knowledge Graph
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "EmploymentAgency"],
  "@id": "https://bluecrew.no/#organization",
  name: "Bluecrew AS",
  legalName: "Bluecrew AS",
  alternateName: ["Bluecrew Bemanningsbyrå", "Bluecrew Vikarbyrå", "Bluecrew Maritime Staffing"],
  url: "https://bluecrew.no",
  logo: "https://bluecrew.no/icon.png",
  image: "https://bluecrew.no/icon.png",
  foundingDate: "2025",
  description: "Bemanningsbyrå og vikarbyrå for maritim sektor – bygget på bransjekunnskap. Din partner innenfor maritim bemanning til offshore, havbruk og rederier.",
  slogan: "Bemanningsbyrå bygget på bransjekunnskap",
  knowsAbout: ["maritim bemanning", "bemanningsbyrå", "vikarbyrå", "sjøfolk", "offshore", "havbruk", "rederi", "maritime stillinger"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ervikveien 110",
    addressLocality: "Harstad",
    postalCode: "9402",
    addressCountry: "NO",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+47-77-02-90-00",
    contactType: "Customer Service",
    areaServed: "NO",
    availableLanguage: ["Norwegian", "English"],
  },
  sameAs: [
    "https://linkedin.com/company/bluecrewas",
    "https://www.facebook.com/profile.php?id=61582845493676",
    "https://www.instagram.com/bluecrew.no",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Maritime Bemanningstjenester",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Maritim Bemanning" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Vikarbyrå Sjøfolk" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Offshore Bemanning" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Havbruk Bemanning" } },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      <SchemaMarkup type="custom" data={organizationSchema} />
      <main>
        <HeroSection />

        <TrustBar />

        <WhyBluecrewSection />

        <SectionDivider
          headline="Pålitelig bemanning. Dokumentert kvalitet. Trygg samarbeidspartner."
          subheadline="Vi opprettholder og følger kravene til anerkjente standarder. Vi er nye og klare til å bistå! Våre sertifiseringer oppdateres løpende og vi er i flere løp nå innledningsvis i Q1 og Q2."
          size="sm"
        />

        <AktueltSection />

        <SectionDivider
          headline="Bygget av sjøfolk, for sjøfolk"
          subheadline="Rett kompetanse til rett oppdrag – hver gang"
        />

        <TeamGrid />
      </main>
    </>
  );
}

