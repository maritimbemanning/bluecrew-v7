import type { Metadata } from "next";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";

const breadcrumbs = [
  { name: "Hjem", url: "/" },
  { name: "Rederi", url: "/rederi" },
  { name: "Kontakt", url: "/rederi/kontakt-oss" },
];

export const metadata: Metadata = {
  title: "Kontakt for rederier",
  description:
    "Kontakt Bluecrew for bemanning eller rekruttering. Direkte kontakt, firmainformasjon og trygghet/etterlevelse samlet.",
  alternates: {
    canonical: "https://bluecrew.no/rederi/kontakt-oss",
  },
  openGraph: {
    title: "Kontakt for rederier",
    description: "Kontakt Bluecrew for bemanning eller rekruttering.",
    url: "https://bluecrew.no/rederi/kontakt-oss",
    siteName: "Bluecrew AS",
    locale: "nb_NO",
    type: "website",
  },
};

export default function KontaktOssLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SchemaMarkup type="breadcrumb" breadcrumbs={breadcrumbs} />
      {children}
    </>
  );
}

