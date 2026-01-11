import type { Metadata } from "next";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { getOgImageUrl, IMAGE_PATHS } from '@/lib/images';
import TrygghetClient from "./TrygghetClient";

export const metadata: Metadata = {
  title: "Trygghet & etterlevelse",
  description:
    "Slik skaper Bluecrew trygg bemanning: godkjenninger, verifisering, arbeidsgiveransvar, garanti og kontaktinformasjon.",
  keywords: [
    'godkjent bemanningsforetak',
    'DNV sertifisert rekrutterer',
    'verifisert bemanning',
    'maritim trygghet',
    'HMS bemanning',
    'arbeidsgiveransvar',
    'bemanningsgaranti',
    'sertifisert bemanningsbyrå',
    'kvalitetssikret bemanning',
    'maritim compliance'
  ],
  alternates: {
    canonical: "https://bluecrew.no/trygghet",
  },
  openGraph: {
    title: "Trygghet & etterlevelse",
    description:
      "Godkjenninger, verifisering, arbeidsgiveransvar og garanti – samlet på ett sted.",
    url: "https://bluecrew.no/trygghet",
    siteName: "Bluecrew AS",
    locale: "nb_NO",
    type: "website",
    images: [
      {
        url: getOgImageUrl(IMAGE_PATHS.og.default),
        width: 1200,
        height: 630,
        alt: 'Trygghet og etterlevelse - Bluecrew',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Trygghet & etterlevelse",
    description: "Godkjenninger, verifisering, arbeidsgiveransvar og garanti – samlet på ett sted.",
    images: [getOgImageUrl(IMAGE_PATHS.og.default)],
  },
};

const breadcrumbs = [
  { name: "Hjem", url: "/" },
  { name: "Trygghet & etterlevelse", url: "/trygghet" },
];

export default function TrygghetPage() {
  return (
    <>
      <SchemaMarkup type="breadcrumb" breadcrumbs={breadcrumbs} />
      <TrygghetClient />
    </>
  );
}

