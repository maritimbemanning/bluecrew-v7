"use client";

import Link from 'next/link';
import Image from 'next/image';
import {
  Users,
  Briefcase,
  Ship,
  Globe,
  Phone,
  ChevronRight,
  CheckCircle2,
  Shield,
  Award,
  Anchor
} from '@/components/icons';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { getImageUrl, IMAGE_PATHS } from '@/lib/images';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { FadeUp, StaggerContainer, StaggerItem, ScaleUp } from '@/components/motion';

const breadcrumbs = [
  { name: 'Hjem', url: '/' },
  { name: 'Tjenester', url: '/tjenester' },
];

// Service cards for the grid
const serviceCards = [
  {
    icon: Users,
    title: 'Bemanning',
    description: 'Fleksibel kapasitet ved sykdom, topper eller prosjekter. Kvalifisert mannskap på kort varsel.',
    details: [
      'Gjennomføring av prosjekter',
      'Ferieavvikling',
      'Sykdom og permisjoner',
      'Produksjonstopper',
    ],
    href: '/rederi/bemanning',
  },
  {
    icon: Briefcase,
    title: 'Rekruttering',
    description: 'Vi finner de rette kandidatene til faste stillinger. Grundig prosess fra søk til signering.',
    details: [
      'Headhunting og direktesøk',
      'Kompetansekartlegging',
      'Referansesjekk',
      'Onboarding-støtte',
    ],
    href: '/rederi/rekruttering',
  },
  {
    icon: Globe,
    title: 'Formidling',
    description: 'Rekruttering til midlertidige ansettelser. Vi kobler rett kompetanse med rett oppdrag.',
    details: [
      'Midlertidige stillinger',
      'Prosjektbasert arbeid',
      'Vikariater',
      'Sesongjobber',
    ],
    href: '#formidling',
  },
  {
    icon: Ship,
    title: 'Crewing Solutions',
    description: 'Komplett crewing-løsning. Vi tar ansvar for hele bemanningen på fartøyet.',
    details: [
      'Total bemanningsløsning',
      'Crew management',
      'Rotasjonsplanlegging',
      'Compliance og sertifikater',
    ],
    href: '#outsourcing',
  },
  {
    icon: Anchor,
    title: 'Våre fagområder',
    description: 'Havbruk, offshore, supply, shipping - vi dekker hele den maritime sektoren.',
    details: [
      'Havbruk og servicefartøy',
      'Offshore og supply',
      'Tank og bulk',
      'Passasjerskip og ferger',
    ],
    href: '#fagomrader',
  },
  {
    icon: Phone,
    title: 'Kontakt',
    description: 'Snakk med oss om deres bemanningsbehov. Vi er tilgjengelige for en uforpliktende prat.',
    details: [
      'Telefon: 77 02 90 00',
      'E-post: post@bluecrew.no',
      'Chat på nettsiden',
    ],
    href: '/kontakt',
  },
];

// Trust signals
const trustSignals = [
  { icon: Shield, text: 'Godkjent Bemanningsforetak' },
  { icon: Award, text: 'DNV Sertifisert Rekrutterer' },
  { icon: CheckCircle2, text: 'Verifiserte Kandidater' },
];

export default function TjenesterClient() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-20">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src={getImageUrl(IMAGE_PATHS.hero.rederi)}
            alt="Maritim operasjon"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-navy-900/85" />
        <Container size="lg" className="relative z-10">
          <Breadcrumbs items={breadcrumbs} className="mb-8" />
          
          <div className="max-w-3xl">
            <FadeUp>
              <h1 className="text-5xl md:text-6xl font-medium text-cream-50 mb-6 leading-tight">
                Våre tjenester
              </h1>
            </FadeUp>
            
            <FadeUp delay={0.1}>
              <p className="text-xl md:text-2xl text-cream-100/90 mb-8 leading-relaxed">
                Stolt leverandør og partner av maritim bemanning og rekruttering.
                Vi sikrer pålitelige bemanningsløsninger til oppdrettsnæringen, 
                offshore og rederi.
              </p>
            </FadeUp>

            {/* Trust signals */}
            <FadeUp delay={0.2}>
              <div className="flex flex-wrap gap-4 mb-10">
                {trustSignals.map((signal) => (
                  <div key={signal.text} className="flex items-center gap-2 bg-navy-900/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gold-400/20">
                    <signal.icon className="w-5 h-5 text-gold-400" />
                    <span className="text-sm text-cream-100">{signal.text}</span>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.3}>
              <Link href="/rederi/behov">
                <Button size="lg" className="bg-gold-500 hover:bg-gold-400 text-navy-900">
                  Meld bemanningsbehov
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </FadeUp>
          </div>
        </Container>
      </section>

      {/* Service Cards Grid */}
      <Section className="bg-slate-50 py-20">
        <Container size="lg">
          <FadeUp>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-medium text-navy-900 mb-4">
                Hva kan vi hjelpe deg med?
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Vi tilbyr et bredt spekter av bemanningstjenester tilpasset den maritime sektoren.
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCards.map((service) => (
              <StaggerItem key={service.title}>
                <Link 
                  href={service.href}
                  className="group block h-full"
                >
                  <Card className="h-full p-6 bg-white hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-gold-300">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-navy-50 rounded-xl group-hover:bg-gold-50 transition-colors">
                        <service.icon className="w-6 h-6 text-navy-900 group-hover:text-gold-500 transition-colors" />
                      </div>
                      <div>
                        <h3 className="text-xl font-medium text-navy-900 group-hover:text-gold-700 transition-colors">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-slate-600 mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-1">
                      {service.details.map((detail) => (
                        <li key={detail} className="flex items-center gap-2 text-sm text-slate-500">
                          <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* Formidling Section */}
      <Section id="formidling" className="bg-white py-20">
        <Container size="lg">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeUp>
              <div>
                <span className="text-gold-600 font-medium mb-2 block">Formidling</span>
                <h2 className="text-3xl md:text-4xl font-medium text-navy-900 mb-6">
                  Rekruttering til midlertidige ansettelser
                </h2>
                <p className="text-lg text-slate-600 mb-6">
                  Formidling innebærer at vi kobler arbeidssøkere med arbeidsgivere for midlertidige stillinger. 
                  Kandidaten blir ansatt direkte hos kunden, mens vi håndterer rekrutteringsprosessen.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold-500 mt-1 shrink-0" />
                    <span className="text-slate-600">Rask matching av kvalifiserte kandidater</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold-500 mt-1 shrink-0" />
                    <span className="text-slate-600">Grundig screening og referansesjekk</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold-500 mt-1 shrink-0" />
                    <span className="text-slate-600">Fleksibel løsning for sesongtopper</span>
                  </li>
                </ul>
                <Link href="/kontakt">
                  <Button variant="outline" className="border-navy-900 text-navy-900 hover:bg-navy-50">
                    Kontakt oss for formidling
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </FadeUp>
            <ScaleUp delay={0.2}>
              <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden">
                <Image
                  src={getImageUrl(IMAGE_PATHS.about.handshake)}
                  alt="Formidling av maritim arbeidskraft"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </ScaleUp>
          </div>
        </Container>
      </Section>

      {/* Outsourcing / Crewing Solutions Section */}
      <Section id="outsourcing" className="bg-navy-900 py-20">
        <Container size="lg">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScaleUp className="order-2 lg:order-1">
              <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden">
                <Image
                  src={getImageUrl(IMAGE_PATHS.hero.sjofolk)}
                  alt="Crewing Solutions - komplett bemanningsløsning"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </ScaleUp>
            <FadeUp className="order-1 lg:order-2">
              <div>
                <span className="text-gold-400 font-medium mb-2 block">Crewing Solutions</span>
                <h2 className="text-3xl md:text-4xl font-medium text-cream-50 mb-6">
                  Komplett crewing-løsning
                </h2>
                <p className="text-lg text-cream-100/80 mb-6">
                  Vi tar totalansvar for bemanningen av fartøyet ditt. Fra rekruttering og opplæring 
                  til rotasjonsplanlegging og compliance - vi håndterer alt.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold-400 mt-1 shrink-0" />
                    <span className="text-cream-100/80">Full arbeidsgiveransvar og crew management</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold-400 mt-1 shrink-0" />
                    <span className="text-cream-100/80">Rotasjonsplanlegging og vikardekning</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold-400 mt-1 shrink-0" />
                    <span className="text-cream-100/80">Sertifikathåndtering og compliance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold-400 mt-1 shrink-0" />
                    <span className="text-cream-100/80">24/7 support ved akutte behov</span>
                  </li>
                </ul>
                <Link href="/rederi/behov">
                  <Button size="lg" className="bg-gold-500 hover:bg-gold-400 text-navy-900">
                    Snakk med oss om crewing
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </FadeUp>
          </div>
        </Container>
      </Section>

      {/* Fagområder Section */}
      <Section id="fagomrader" className="bg-slate-50 py-20">
        <Container size="lg">
          <FadeUp>
            <div className="text-center mb-12">
              <span className="text-gold-600 font-medium mb-2 block">Våre fagområder</span>
              <h2 className="text-3xl md:text-4xl font-medium text-navy-900 mb-4">
                Spisskompetanse i hele den maritime sektoren
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Vi har lang erfaring med bemanning til ulike segmenter av den maritime næringen.
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Havbruk',
                description: 'Servicefartøy, brønnbåt, fôrflåter og maritime operasjoner i oppdrettsnæringen.',
                href: '/rederi/havbruk',
              },
              {
                title: 'Offshore & Supply',
                description: 'PSV, AHTS, konstruksjonsfartøy og andre offshore-operasjoner.',
                href: '/rederi',
              },
              {
                title: 'Tank & Bulk',
                description: 'Tankskip, bulkskip og annen generell shipping.',
                href: '/rederi',
              },
              {
                title: 'Passasjer & Ferge',
                description: 'Cruiseskip, ferger, hurtigbåter og passasjertransport.',
                href: '/rederi',
              },
            ].map((area) => (
              <StaggerItem key={area.title}>
                <Link href={area.href} className="group block h-full">
                  <Card className="h-full p-6 bg-white hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-gold-300">
                    <h3 className="text-lg font-medium text-navy-900 mb-2 group-hover:text-gold-700 transition-colors">
                      {area.title}
                    </h3>
                    <p className="text-slate-600 text-sm">
                      {area.description}
                    </p>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="bg-navy-900 py-20">
        <Container size="md" className="text-center">
          <FadeUp>
            <h2 className="text-3xl md:text-4xl font-medium text-cream-50 mb-6">
              Trenger dere mannskap?
            </h2>
            <p className="text-lg text-cream-100/80 mb-8 max-w-xl mx-auto">
              Ta kontakt for en uforpliktende samtale om hvordan vi kan bistå med 
              bemanning og rekruttering.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/rederi/behov">
                <Button size="lg" className="bg-gold-500 hover:bg-gold-400 text-navy-900">
                  Meld bemanningsbehov
                </Button>
              </Link>
              <Link href="/kontakt">
                <Button size="lg" variant="outline" className="border-cream-100/30 text-cream-100 hover:bg-cream-100/10">
                  Kontakt oss
                </Button>
              </Link>
            </div>
          </FadeUp>
        </Container>
      </Section>
    </main>
  );
}

