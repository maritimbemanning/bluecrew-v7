"use client";

import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion";
import { ChevronRight } from "@/components/icons";

interface ContentItem {
  title: string;
  excerpt: string;
  image: string;
  badge: string;
  date: string;
  ctaText: string;
  ctaUrl: string;
  isExternal?: boolean;
  linkedinUrl?: string;
  facebookUrl?: string;
  pdfUrl?: string;
}

const contentItems: ContentItem[] = [
  {
    title: "Styrmann i romjula",
    excerpt: "Tore Nymo vikarierte som styrmann i romjula og nyttårsaften. Topp fasiliteter, godt mannskap – og et oppdrag han gjerne tar igjen.",
    image: "/images/CrewStory/ToreNymo/tore-face.webp",
    badge: "Crew Story",
    date: "09.01.2026",
    ctaText: "Les historien",
    ctaUrl: "/crew/tore-nymo",
    isExternal: false,
    linkedinUrl: "https://www.linkedin.com/company/bluecrew-as",
    facebookUrl: "https://www.facebook.com/bluecrewmaritime",
  },
  {
    title: "«Må få sjangsen»",
    excerpt: "«Man får bare ett omdømme. Det tar lang tid å bygge og kort tid å miste. Vår jobb er å levere riktig hver gang og ta vare på både kunder og ansatte», sier Daglig Leder Isak Didriksson.",
    image: "/images/isak-kyst.webp",
    badge: "Kyst.no",
    date: "06.01.2026",
    ctaText: "Les saken her",
    ctaUrl: "https://www.kyst.no/bluecrew/advarer-oppdrettere-mot-denne-feilen/2048319",
    isExternal: true,
    linkedinUrl: "https://www.linkedin.com/company/bluecrew-as",
    facebookUrl: "https://www.facebook.com/bluecrewmaritime",
  },
  {
    title: "Vi takker Zeon Aqua for tilliten",
    excerpt: "Et samarbeid basert på kvalitet og sikkerhet. MS Akvafighter leverer tjenester i toppsjiktet til havbruksnæringen.",
    image: "/images/CrewStory/ZeonAqua/hero.webp",
    badge: "Crew Story",
    date: "18.12.2025",
    ctaText: "Les historien",
    ctaUrl: "/crew/zeonaqua",
    isExternal: false,
    linkedinUrl: "https://www.linkedin.com/company/zeon-aqua",
    facebookUrl: "https://www.facebook.com/zeonaqua.as",
  },
];

export default function AktueltSection() {
  return (
    <section id="aktuelt" className="py-16 md:py-20 bg-navy-900">
      <Container size="lg">
        <FadeUp>
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-medium text-cream-50">
              Aktuelt
            </h2>
          </div>
        </FadeUp>

        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {contentItems.map((item, index) => (
            <StaggerItem key={index}>
              <article className="h-full bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col">
                {/* Clickable Image */}
                <Link
                  href={item.ctaUrl}
                  target={item.isExternal ? "_blank" : undefined}
                  rel={item.isExternal ? "noopener noreferrer" : undefined}
                  className="relative aspect-[16/9] w-full block group"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                      item.badge === "Crew Story"
                        ? "bg-navy-900 text-cream-50"
                        : "bg-gold-500 text-navy-900"
                    }`}>
                      {item.badge}
                    </span>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/20 transition-colors duration-300" />
                </Link>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-slate-500">{item.date}</span>
                  </div>
                  <h3 className="text-lg font-medium text-navy-900 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1">
                    {item.excerpt}
                  </p>

                  {/* CTA + Social Links - Same layout for all items */}
                  <div className="space-y-2">
                    {/* Main CTA */}
                    <Link
                      href={item.ctaUrl}
                      target={item.isExternal ? "_blank" : undefined}
                      rel={item.isExternal ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-2 text-sm font-medium text-gold-600 hover:text-gold-500 transition-colors group"
                    >
                      {item.ctaText}
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      {item.isExternal && (
                        <>
                          <span className="text-slate-400">|</span>
                          <span className="text-slate-600">{item.badge}</span>
                        </>
                      )}
                    </Link>

                    {/* Secondary row: PDF left, Social icons right */}
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <div>
                        {item.pdfUrl && (
                          <Link
                            href={item.pdfUrl}
                            target="_blank"
                            className="text-slate-500 hover:text-navy-900 transition-colors"
                          >
                            Last ned PDF
                          </Link>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {item.facebookUrl && (
                          <Link
                            href={item.facebookUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#1877F2] hover:text-[#0d65d9] transition-colors"
                            title="Se på Facebook"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                          </Link>
                        )}
                        {item.linkedinUrl && (
                          <Link
                            href={item.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#0A66C2] hover:text-[#004182] transition-colors"
                            title="Se på LinkedIn"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}

