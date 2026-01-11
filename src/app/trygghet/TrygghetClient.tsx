"use client";

import Link from "next/link";
import { Shield, CheckCircle2, Phone, MapPin, Award, FileCheck, Users, Clock } from "@/components/icons";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion";

const breadcrumbs = [
  { name: "Hjem", url: "/" },
  { name: "Trygghet & etterlevelse", url: "/trygghet" },
];

const quickFacts = [
  { label: "Selskap", value: "Bluecrew AS" },
  { label: "Org.nr", value: "936 463 843" },
  { label: "Adresse", value: "Ervikveien 110, 9402 Harstad" },
  { label: "E-post", value: "post@bluecrew.no", href: "mailto:post@bluecrew.no" },
  { label: "Telefon", value: "+47 77 02 90 00", href: "tel:+4777029000" },
];

const trustFeatures = [
  {
    icon: Shield,
    title: "Godkjent bemanningsforetak",
    description: "Følger norsk arbeidsrett for innleie, HMS og arbeidsforhold.",
    id: "godkjent"
  },
  {
    icon: Award,
    title: "DNV-sertifisert rekrutterer",
    description: "Strukturert screening, dokumentasjon og sporbarhet i alle prosesser.",
    id: "dnv"
  },
  {
    icon: FileCheck,
    title: "Verifiserte kandidater (BankID)",
    description: "Identitetskontroll, sertifikater, referanser og tydelig forventningsavklaring.",
    id: "verifisering"
  },
  {
    icon: Users,
    title: "Fullt arbeidsgiveransvar",
    description: "Vi tar det fulle arbeidsgiveransvaret – lønn, skatt, forsikring og HMS.",
    id: "arbeidsgiver"
  },
  {
    icon: Clock,
    title: "48-timers erstatningsgaranti",
    description: "Vi stiller med erstatter så raskt som mulig ved frafall.",
    id: "garanti"
  }
];

const verificationItems = [
  { title: "Identitetskontroll", desc: "(BankID der det er relevant)" },
  { title: "Sertifikat- og dokumentkontroll", desc: "(STCW, helseattest, kurs, etc.)" },
  { title: "Referanser og erfaring", desc: "tilpasset fartøytype og oppdrag" },
  { title: "Tydelig forventningsavklaring", desc: "oppmøtetid, reise, utstyr og arbeidsoppgaver" }
];

export default function TrygghetClient() {
  return (
    <main>
      {/* Hero Section */}
      <Section variant="navy" noPadding className="relative overflow-hidden pt-20">
        <Container size="lg" className="pt-6 pb-0">
          <Breadcrumbs items={breadcrumbs} className="text-cream-100/60" />
        </Container>
        <Container size="lg" className="relative">
          <div className="py-12 md:py-16">
            <div className="max-w-4xl mx-auto text-center">
              <FadeUp>
                <div className="mb-6 inline-flex items-center gap-2 px-5 py-2.5 bg-gold-500/20 rounded-full text-gold-300 text-sm font-medium backdrop-blur-sm">
                  <Shield className="w-5 h-5" />
                  Trygghet & etterlevelse
                </div>
              </FadeUp>
              <FadeUp delay={0.1}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-cream-50 mb-5 leading-tight">
                  <span className="italic">Trygg</span> leverandør. <span className="italic">Dokumentert</span> kvalitet.
                </h1>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="text-lg md:text-xl text-cream-100/90 max-w-3xl mx-auto leading-relaxed">
                  Dokumentert kvalitet, klare rammer og rask respons når du trenger det. Her finner du alt om trygghet og etterlevelse.
                </p>
              </FadeUp>
            </div>
          </div>
        </Container>
      </Section>

      {/* Trust Features Grid */}
      <Section className="bg-slate-50">
        <Container size="lg">
          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
              {trustFeatures.map((feature, index) => (
                <StaggerItem key={index}>
                  <div
                    id={feature.id}
                    className="scroll-mt-24 group bg-white rounded-2xl p-6 lg:p-8 shadow-md shadow-slate-900/5 border border-slate-200 hover:border-gold-400/50 hover:shadow-lg hover:shadow-gold-500/10 transition-all duration-300 h-full"
                  >
                    <div className="flex items-start gap-5">
                      <div className="w-16 h-16 rounded-xl bg-linear-to-br from-gold-400 to-navy-600 flex items-center justify-center shrink-0 shadow-md shadow-gold-500/30 group-hover:scale-105 transition-transform duration-300">
                        <feature.icon className="w-7 h-7 text-cream-50" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xl font-medium text-navy-900 mb-2 group-hover:text-gold-600 transition-colors leading-tight">
                          {feature.title}
                        </h2>
                        <p className="text-slate-600 leading-relaxed text-base">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </Container>
      </Section>

      {/* Detailed Information */}
      <Section className="bg-white">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-12">
              {/* Godkjent bemanningsforetak - Extended */}
              <FadeUp>
                <div className="bg-slate-50 rounded-2xl p-6 lg:p-8 border border-slate-200">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-navy-900 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-gold-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-navy-900 mb-1">
                        Godkjent bemanningsforetak
                      </h3>
                      <p className="text-slate-500 text-sm">Org.nr: 936 463 843</p>
                    </div>
                  </div>
                  <p className="text-slate-700 leading-relaxed text-base">
                    Bluecrew AS er et bemanningsforetak og følger kravene i norsk arbeidsrett for innleie,
                    HMS og arbeidsforhold. Ved behov kan dere verifisere oss ved å søke på org.nr{" "}
                    <strong className="text-navy-900">936 463 843</strong> i relevante offentlige registre.
                  </p>
                </div>
              </FadeUp>

              {/* Verifisering */}
              <FadeUp delay={0.1}>
                <div className="bg-linear-to-br from-navy-900 to-navy-800 rounded-2xl p-6 lg:p-8 text-cream-100">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-11 h-11 rounded-xl bg-gold-500 flex items-center justify-center">
                      <FileCheck className="w-5 h-5 text-navy-900" />
                    </div>
                    <h3 className="text-xl font-medium text-cream-50">
                      <span className="italic">Verifisering</span> før vi sender folk om bord
                    </h3>
                  </div>
                  <p className="text-cream-100/90 mb-5 text-base">
                    For å redusere risiko (no-show, feil sertifikat, feil match) jobber vi med:
                  </p>
                  <ul className="space-y-3">
                    {verificationItems.map((item, index) => (
                      <li key={index} className="flex gap-3 items-start">
                        <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <strong className="text-cream-50">{item.title}</strong>{" "}
                          <span className="text-cream-100/80">{item.desc}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <p className="text-cream-100/70 mt-5 text-sm">
                    Les mer om behandling av data i{" "}
                    <Link href="/personvern" className="text-gold-400 hover:underline font-medium">
                      personvernerklæringen
                    </Link>
                    .
                  </p>
                </div>
              </FadeUp>

              {/* Anmeldelser */}
              <FadeUp delay={0.2}>
                <div className="bg-slate-50 rounded-2xl p-6 lg:p-8 border border-slate-200">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-gold-500 flex items-center justify-center">
                      <Users className="w-5 h-5 text-cream-50" />
                    </div>
                    <h3 className="text-xl font-medium text-navy-900">
                      Anmeldelser
                    </h3>
                  </div>
                  <p className="text-slate-700 leading-relaxed text-base mb-5">
                    For å se eksterne vurderinger anbefaler vi at dere sjekker våre anmeldelser på Google.
                  </p>
                  <a
                    href="https://www.google.com/search?q=Bluecrew%20AS%20Harstad%20anmeldelser"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 text-navy-900 italic rounded-xl font-medium hover:bg-gold-400 transition-colors shadow-lg"
                  >
                    Se Google-anmeldelser
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </FadeUp>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <FadeUp delay={0.3}>
                {/* Quick Facts */}
                <div className="rounded-2xl bg-linear-to-br from-navy-900 to-navy-800 p-6 shadow-xl text-cream-100 sticky top-24">
                  <h3 className="text-lg font-medium mb-5 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-gold-400" />
                    Kontaktinformasjon
                  </h3>
                  <dl className="space-y-3">
                    {quickFacts.map((item) => (
                      <div key={item.label} className="border-b border-white/10 pb-3 last:border-0 last:pb-0">
                        <dt className="text-xs text-cream-100/60 mb-1">{item.label}</dt>
                        <dd className="font-medium text-cream-50 text-sm">
                          {item.href ? (
                            <a href={item.href} className="text-gold-300 hover:text-gold-200 transition-colors">
                              {item.value}
                            </a>
                          ) : (
                            item.value
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  
                  <div className="mt-6 pt-5 border-t border-white/10 space-y-3">
                    <Link href="/rederi/behov" className="block">
                      <Button className="w-full bg-gold-500 hover:bg-gold-400 text-navy-900 font-medium shadow-lg">
                        Registrer behov
                      </Button>
                    </Link>
                    <Link href="/rederi/kontakt-oss" className="block">
                      <Button variant="outline" className="w-full border-gold-400/20 text-cream-50 hover:bg-gold-400/10">
                        Kontakt oss
                      </Button>
                    </Link>
                  </div>
                </div>
              </FadeUp>
            </aside>
          </div>
        </Container>
      </Section>

      {/* Bottom CTA */}
      <Section className="bg-navy-900 text-cream-100">
        <Container size="md">
          <div className="text-center py-8">
            <FadeUp>
              <h2 className="text-2xl md:text-3xl font-medium text-cream-50 mb-4">
                Trenger dere <span className="italic">mannskap</span>?
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="text-lg text-cream-100/80 mb-7 max-w-2xl mx-auto">
                Vi stiller med kvalifisert personell på kort varsel. 48 timers erstatningsgaranti.
              </p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/rederi/behov">
                  <Button size="lg" className="bg-gold-500 hover:bg-gold-400 text-navy-900 font-medium shadow-xl">
                    Registrer behov nå
                  </Button>
                </Link>
                <a href="tel:+4792328850">
                  <Button size="lg" variant="outline" className="border-gold-400/20 text-cream-50 hover:bg-gold-400/10">
                    <Phone className="w-5 h-5" />
                    Ring Isak: 923 28 850
                  </Button>
                </a>
              </div>
            </FadeUp>
            <FadeUp delay={0.3}>
              <p className="text-sm text-cream-100/60 mt-6">
                Les mer i{" "}
                <Link href="/vilkar" className="text-gold-400 hover:underline">
                  brukervilkår
                </Link>
              </p>
            </FadeUp>
          </div>
        </Container>
      </Section>
    </main>
  );
}

