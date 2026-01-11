import type { Metadata } from "next";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";

const breadcrumbs = [
  { name: "Hjem", url: "/" },
  { name: "Rederi", url: "/rederi" },
  { name: "Bli partner", url: "/rederi/bli-med" },
];

export const metadata: Metadata = {
  title: "Bli partner",
  description:
    "Partnerforespørsel for rederier. Fast kontaktperson, tydelige rutiner og prioritert oppfølging for bemanning og rekruttering til sjøs.",
  alternates: {
    canonical: "https://bluecrew.no/rederi/bli-med",
  },
  openGraph: {
    title: "Bli partner",
    description: "Partnerforespørsel for rederier.",
    url: "https://bluecrew.no/rederi/bli-med",
    siteName: "Bluecrew AS",
    locale: "nb_NO",
    type: "website",
  },
};

export default function BliMedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SchemaMarkup type="breadcrumb" breadcrumbs={breadcrumbs} />
      {children}
    </>
  );
}

