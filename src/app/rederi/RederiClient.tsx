"use client";

import Link from 'next/link';
import Image from 'next/image';
import {
  Users,
  Briefcase,
  FileText,
  Phone,
  ChevronRight,
  CheckCircle2,
  Shield,
  Award,
  Globe,
  Ship,
  Anchor
} from '@/components/icons';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { getImageUrl, IMAGE_PATHS } from '@/lib/images';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/motion';

const breadcrumbs = [
  { name: 'Hjem', url: '/' },
  { name: 'Rederi', url: '/rederi' },
];

const services = [
  {
    icon: Users,
    title: 'Innleie og Bemanning',
    description: 'Fleksibel kapasitet ved sykdom, topper eller prosjekter. Kvalifisert mannskap klart på kort varsel.',
    href: '/rederi/bemanning',
  },
  {
    icon: Briefcase,
    title: 'Rekruttering og Headhunting',
    description: 'Vi finner de rette kandidatene til faste stillinger. Grundig prosess fra søk til signering.',
    href: '/rederi/rekruttering',
  },
  {
    icon: Anchor,
    title: 'Havbruk og Service',
    description: 'Spesialisert bemanning for servicefartøy, brønnbåt og maritime operasjoner i havbruksnæringen.',
    href: '/rederi/havbruk',
  },
];

const trustSignals = [
  { icon: Shield, text: 'Godkjent Bemanningsforetak' },
  { icon: Award, text: 'DNV Sertifisert Rekrutterer' },
  { icon: CheckCircle2, text: 'Kvalitetssikret Kompetanse' },
];

const quickLinks = [
  {
    title: 'Meld behov',
    description: 'Beskriv bemanningsbehovet – vi finner løsningen.',
    href: '/rederi/behov',
    icon: FileText,
  },
  {
    title: 'Kontakt oss',
    description: 'Direkte linje til våre bemanningsrådgivere.',
    href: '/rederi/kontakt-oss',
    icon: Phone,
  },
];

export default function RederiClient() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <Image
            src={getImageUrl(IMAGE_PATHS.hero.rederi)}
            alt="Maritim operasjon - skipsbro"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-navy-900/80" />
        <Container size="lg" className="relative z-10">
          <div className="max-w-4xl">
            <FadeUp>
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-medium leading-[1.05] mb-8">
                <span className="text-cream-50">Strategisk </span>
                <span className="text-gold-400 italic">bemanningspartner</span>
                <span className="block mt-2">
                  <span className="text-cream-50">for </span><span className="text-gold-400 italic">maritim</span><span className="text-cream-50"> næring</span>
                </span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.1}>
              <p className="text-xl md:text-2xl text-cream-100 mb-8 max-w-2xl leading-relaxed">
                Vi sikrer <span className="text-gold-400 italic font-medium">kontinuerlig drift</span> med <span className="text-cream-50 italic">kvalifisert mannskap</span>. 
                Totalleverandør av <span className="text-gold-400 italic font-medium">bemanning</span> og <span className="text-gold-400 italic font-medium">rekruttering</span> til rederi, offshore og havbruk.
              </p>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/rederi/behov">
                  <Button size="lg" className="bg-gold-500 text-navy-900 hover:bg-gold-400 font-medium shadow-lg shadow-gold-500/20 px-8 py-4">
                    Meld bemanningsbehov
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/rederi/rekruttering">
                  <Button size="lg" variant="outline" className="border-cream-200/30 text-cream-50 hover:bg-white/10 px-8 py-4">
                    Start rekruttering
                  </Button>
                </Link>
              </div>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-cream-200/80 border-t border-white/10 pt-6 mt-8">
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <Globe className="w-5 h-5 text-gold-400 shrink-0" />
                  <span>Landsdekkende nettverk</span>
                </div>
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <Ship className="w-5 h-5 text-gold-400 shrink-0" />
                  <span>Alle fartøystyper</span>
                </div>
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <Shield className="w-5 h-5 text-gold-400 shrink-0" />
                  <span>DNV-sertifisert</span>
                </div>
              </div>
            </FadeUp>
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


      {/* Services Section */}
      <Section className="bg-slate-50">
        <Container size="lg">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-medium text-navy-900 mb-4">
                <span className="italic text-navy-900">Fleksibel</span> kapasitet. <span className="italic text-navy-900">Fast</span> kvalitet.
              </h2>
              <p className="text-xl text-gold-500 italic font-medium mb-3">
                Skreddersydd bemanning for maritim sektor
              </p>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Vi tilpasser løsningen etter deres behov – enten det er <span className="text-gold-500 italic font-medium">akutt innleie</span>, 
                <span className="text-navy-900 italic font-medium"> faste rotasjoner</span> eller 
                <span className="text-gold-500 italic font-medium"> rekruttering</span> til nøkkelstillinger.
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <StaggerItem key={index}>
                <Link href={service.href} className="block h-full">
                  <Card className="h-full p-8 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-slate-200 hover:border-gold-400 group">
                    <div className="w-14 h-14 bg-navy-900 rounded-xl flex items-center justify-center mb-6 text-gold-400 group-hover:bg-gold-500 group-hover:text-navy-900 transition-colors">
                      <service.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-medium text-navy-900 mb-4 group-hover:text-gold-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 text-lg leading-relaxed mb-8">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-2 text-navy-900 font-medium mt-auto border-b-2 border-transparent group-hover:border-gold-500 w-fit pb-1 transition-all">
                      Les mer
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* Value Proposition */}
      <Section className="bg-navy-900 text-cream-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-navy-800/50 to-transparent transform skew-x-12" />
        
        <Container size="lg" className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <FadeUp>
                <h2 className="text-3xl md:text-4xl font-medium text-cream-50 mb-6">
                  Hvorfor velge Bluecrew?
                </h2>
              </FadeUp>
              
              <FadeUp delay={0.1}>
                <p className="text-lg text-cream-100/90 mb-8 leading-relaxed">
                  Vi er mer enn et vikarbyrå. Vi er en maritim partner som forstår at kvaliteten på mannskapet er avgjørende for sikkerhet og drift.
                </p>
              </FadeUp>
              
              <div className="space-y-6">
                {[
                  { title: 'Kvalitetssikret', desc: 'Alle kandidater gjennomgår omfattende verifisering av sertifikater og referanser før presentasjon.' },
                  { title: 'Operasjonell forståelse', desc: 'Vi kjenner kravene om bord. Våre kandidater har relevant erfaring for fartøystypen.' },
                  { title: 'Fullt ansvar', desc: 'Ved innleie håndterer vi alt arbeidsgiveransvar. Dere forholder dere til én faktura.' },
                ].map((item, index) => (
                  <FadeUp key={index} delay={0.2 + index * 0.1}>
                    <div className="flex gap-4">
                      <div className="mt-1 w-6 h-6 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0 border border-gold-500/40">
                        <CheckCircle2 className="w-4 h-4 text-gold-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-cream-50 mb-1">{item.title}</h4>
                        <p className="text-cream-200/80 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>

            <FadeUp delay={0.3}>
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-medium text-cream-50 mb-6">Trenger du bistand?</h3>
                <div className="space-y-4 mb-8">
                  {quickLinks.map((link, index) => (
                    <Link key={index} href={link.href} className="group block">
                      <div className="bg-navy-800/50 rounded-xl p-5 border border-white/5 hover:border-gold-500/50 transition-all hover:bg-navy-800">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-navy-900 rounded-lg flex items-center justify-center text-gold-400 group-hover:text-gold-300">
                            <link.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-medium text-cream-50 group-hover:text-gold-400 transition-colors">{link.title}</h4>
                            <p className="text-sm text-cream-200/70">{link.description}</p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-cream-100/60 ml-auto group-hover:text-gold-400 transition-colors" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="text-center">
                  <p className="text-sm text-cream-200/60">
                    Eller ring oss direkte på <a href="tel:+4777029000" className="text-gold-400 hover:text-gold-300">77 02 90 00</a>
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>
        </Container>
      </Section>

      {/* Trust Signals */}
      <Section className="bg-white border-t border-slate-200">
        <Container size="lg">
          <StaggerContainer className="flex flex-wrap justify-center gap-8 md:gap-16">
            {trustSignals.map((signal, index) => (
              <StaggerItem key={index}>
                <div className="flex items-center gap-3 text-navy-800 font-medium">
                  <signal.icon className="w-6 h-6 text-gold-500" />
                  <span>{signal.text}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>
    </main>
  );
}

