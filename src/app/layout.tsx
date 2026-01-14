import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import HeaderWrapper from "@/components/layout/HeaderWrapper";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/ui/CookieConsent";
import TrackingScripts from "@/components/analytics/TrackingScripts";
const LOGO_URL = "https://bluecrew.no/icon.png";

export const metadata: Metadata = {
  title: {
    default: "Bluecrew – Maritim Bemanning | Bemanningsbyrå & Vikarbyrå for Sjøfolk",
    template: "%s | Bluecrew",
  },
  description: "Bemanningsbyrå og vikarbyrå for maritim sektor – bygget på bransjekunnskap. Bluecrew formidler kvalifiserte sjøfolk til rederi, offshore og havbruk. DNV-sertifisert.",
  keywords: ["bemanningsbyrå", "vikarbyrå", "maritim bemanning", "bemanningsbyrå maritim", "vikarbyrå sjøfolk", "offshore bemanning", "rederi bemanning", "havbruk bemanning", "sjøfolk", "mannskap", "maritim rekruttering"],
  metadataBase: new URL("https://bluecrew.no"),
  verification: {
    google: "29DdT978Xt9BjAEjTdMmH7MsBLa2RqF62vs81Pw1C2Q",
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: "Bluecrew – Bemanningsbyrå for Maritim Sektor",
    description: "Bemanningsbyrå bygget på bransjekunnskap. Kvalifiserte sjøfolk til offshore, havbruk og rederi.",
    url: "https://bluecrew.no",
    type: "website",
    locale: "nb_NO",
    siteName: "Bluecrew AS",
    images: [
      {
        url: LOGO_URL,
        width: 512,
        height: 512,
        alt: "Bluecrew-logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Bluecrew – Bemanningsbyrå for Maritim Sektor",
    description: "Bemanningsbyrå bygget på bransjekunnskap. Kvalifiserte sjøfolk til offshore, havbruk og rederi.",
    images: [LOGO_URL],
  },
  alternates: {
    canonical: "https://bluecrew.no",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // WebSite schema for Google Sitelinks
  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://bluecrew.no/#website",
    name: "Bluecrew",
    url: "https://bluecrew.no",
    description: "Bemanningsbyrå og vikarbyrå for maritim sektor – bygget på bransjekunnskap",
    publisher: {
      "@id": "https://bluecrew.no/#organization"
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://bluecrew.no/stillinger?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    inLanguage: "nb-NO"
  };

  // LocalBusiness schema for Google Business connection
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "EmploymentAgency"],
    "@id": "https://bluecrew.no/#organization",
    name: "Bluecrew AS",
    legalName: "Bluecrew AS",
    foundingDate: "2025",
    description: "Bemanningsbyrå og vikarbyrå for maritim sektor – bygget på bransjekunnskap. Din partner innenfor maritim bemanning til offshore, havbruk og rederier.",
    alternateName: ["Bluecrew Bemanning", "Bluecrew Vikarbyrå", "Bluecrew Maritime Staffing"],
    url: "https://bluecrew.no",
    telephone: "+47 77 02 90 00",
    email: "post@bluecrew.no",
    image: LOGO_URL,
    logo: LOGO_URL,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ervikveien 110",
      addressLocality: "Harstad",
      addressRegion: "Troms og Finnmark",
      postalCode: "9402",
      addressCountry: "NO",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 68.7984,
      longitude: 16.5412,
    },
    areaServed: {
      "@type": "Country",
      name: "Norway"
    },
    sameAs: [
      "https://linkedin.com/company/bluecrewas",
      "https://www.facebook.com/profile.php?id=61582845493676",
      "https://maps.google.com/?cid=9460432501146775753"
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "16:00"
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      ratingCount: "1",
    },
  };

  return (
    <html lang="nb-NO">
      <head>
        {/* DNS Prefetch & Preconnect for external resources */}
        <link rel="dns-prefetch" href="https://plausible.io" />
        <link rel="preconnect" href="https://plausible.io" crossOrigin="anonymous" />
        
        {/* Preload critical fonts to reduce render blocking */}
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/_next/static/media/inter-latin-400-normal.woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/_next/static/media/inter-latin-500-normal.woff2"
          crossOrigin="anonymous"
        />
        
        {/* Preload critical LCP image */}
        <link
          rel="preload"
          as="image"
          href="/images/hero/background.webp"
          type="image/webp"
          fetchPriority="high"
        />
        
        {/* Plausible Analytics - lazyOnload for non-blocking */}
        <Script
          defer
          data-domain="bluecrew.no"
          src="https://plausible.io/js/script.js"
          strategy="lazyOnload"
        />
        
        {/* GTM and Meta Pixel are loaded conditionally via TrackingScripts component */}
        
        {/* WebSite Schema for Google Sitelinks - lazyOnload as not render-critical */}
        <Script
          id="website-schema"
          type="application/ld+json"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteSchema),
          }}
        />
        
        {/* LocalBusiness Schema - lazyOnload as not render-critical */}
        <Script
          id="local-business-schema"
          type="application/ld+json"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-slate-800">
        {/* Skip to main content - Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:bg-navy-900 focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:outline-none focus:ring-2 focus:ring-gold-400"
        >
          Hopp til hovedinnhold
        </a>
        <HeaderWrapper />
        <div id="main-content">
          {children}
        </div>
        <Footer />
        <CookieConsent />
        <TrackingScripts />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

