import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Send søknad | Bluecrew",
  description: "Send inn åpen søknad til Bluecrew for maritime stillinger.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://bluecrew.no/stillinger/sok",
  },
};

export default function StillingerSokLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
