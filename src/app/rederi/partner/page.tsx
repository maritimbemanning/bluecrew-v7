import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Handshake,
  ChevronRight,
  Star,
  Users,
  Clock,
  Phone,
  Percent,
  Shield
} from '@/components/icons';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { getImageUrl, IMAGE_PATHS } from '@/lib/images';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';

const breadcrumbs = [
  { name: 'Hjem', url: '/' },
  { name: 'Rederi', url: '/rederi' },
  { name: 'Partner', url: '/rederi/partner' },
];

export const metadata: Metadata = {
  title: 'Bli Partner | Bemanningsbyrå for Rederier',
  description: 'Bli samarbeidspartner med Bluecrew bemanningsbyrå. Fast kontaktperson, prioritert tilgang til sjøfolk og volumfordeler for rederier.',
  keywords: ['bemanningsbyrå partner', 'maritim partner', 'rederi samarbeid', 'bemanningspartner', 'maritime partnership'],
  openGraph: {
    title: 'Bli Partner – Samarbeid med Bluecrew',
    description: 'Fast kontaktperson, tydelige rutiner og prioritert oppfølging for bemanning til sjøs.',
    url: 'https://bluecrew.no/rederi/partner',
  },
  alternates: {
    canonical: 'https://bluecrew.no/rederi/partner',
  },
};

const benefits = [
  {
    icon: Star,
    title: 'Prioritert tilgang',
    description: 'Prioritert oppfølging og raskere avklaring når det oppstår behov.',
  },
  {
    icon: Users,
    title: 'Dedikert kontaktperson',
    description: 'En fast kontakt som kjenner din bedrift, dine fartøy og dine krav.',
  },
  {
    icon: Clock,
    title: 'Raskere respons',
    description: 'Tydelige responstider og prioritert behandling av henvendelser.',
  },
  {
    icon: Percent,
    title: 'Volumfordeler',
    description: 'Bedre betingelser ved større volum og langsiktige avtaler.',
  },
];

export default function PartnerPage() {
  return (
    <>
      <SchemaMarkup type="breadcrumb" breadcrumbs={breadcrumbs} />
      <main>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={getImageUrl(IMAGE_PATHS.hero.rederi)}
            alt="Partnerskap med Bluecrew"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-navy-900/80" />
        <Container size="lg" className="relative z-10">
          <div className="stagger max-w-3xl">
            <div className="animate-fade-in-up mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-300 text-sm font-medium backdrop-blur-sm">
                <Handshake className="w-4 h-4" />
                Partnerskap
              </div>
            </div>

            <h1 className="animate-fade-in-up text-4xl md:text-6xl font-medium text-cream-50 mb-6 leading-tight font-heading">
              Bli samarbeids<span className="text-gold-400">partner</span>
            </h1>

            <p className="animate-fade-in-up text-xl text-cream-100/80 mb-10 leading-relaxed">
              Langsiktige avtaler med prioritert tilgang til kandidater, dedikert kontaktperson og volumfordeler.
            </p>

            <div className="animate-fade-in-up flex flex-col sm:flex-row gap-4">
              <Link href="/rederi/bli-med">
                <Button size="lg" className="bg-gold-500 hover:bg-gold-400 text-navy-900 font-medium border-none shadow-lg shadow-gold-500/20">
                  Bli partner
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/rederi/kontakt-oss">
                <Button size="lg" variant="outline" className="border-cream-100/20 text-cream-50 hover:bg-cream-100/10">
                  Diskuter muligheter
                </Button>
              </Link>
            </div>
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


      {/* Benefits */}
      <Section className="bg-white">
        <Container size="lg">
          <div className="stagger">
            <div className="animate-fade-in-up text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-medium text-navy-900 mb-4 font-heading">
                Fordeler med partnerskap
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Som partner får du en rekke fordeler som gjør samarbeidet enklere og mer effektivt.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="animate-fade-in-up bg-slate-50 rounded-3xl p-8 border border-slate-200 hover:border-gold-400/30 hover:shadow-lg hover:shadow-gold-400/5 transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm text-sky-500">
                    <benefit.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-medium text-navy-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* How to become partner */}
      <Section className="bg-navy-900 text-cream-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.05] pointer-events-none" />
        
        <Container size="lg" className="relative z-10">
          <div className="stagger">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="animate-fade-in-up">
                <h2 className="text-3xl md:text-4xl font-medium text-cream-50 mb-6 font-heading">
                  Hvordan bli partner?
                </h2>
                <p className="text-lg text-cream-100/80 mb-10 leading-relaxed">
                  Prosessen er enkel. Vi starter med en samtale for å forstå dine behov, og tilpasser deretter en avtale som fungerer for begge parter.
                </p>
                <div className="space-y-8 relative before:absolute before:left-6 before:top-4 before:bottom-4 before:w-0.5 before:bg-navy-800">
                  {[
                    { step: '1', title: 'Ta kontakt', desc: 'Ring eller send oss en melding.' },
                    { step: '2', title: 'Møte', desc: 'Vi møtes for å diskutere behov og muligheter.' },
                    { step: '3', title: 'Avtale', desc: 'Vi utarbeider en avtale tilpasset dine behov.' },
                    { step: '4', title: 'Start', desc: 'Du får tilgang til alle partnerfordeler.' },
                  ].map((item, index) => (
                    <div key={index} className="flex gap-6 relative">
                      <div className="w-12 h-12 bg-navy-800 text-gold-400 rounded-full flex items-center justify-center font-bold text-lg shrink-0 z-10 ring-4 ring-navy-900">
                        {item.step}
                      </div>
                      <div className="pt-1">
                        <h3 className="text-xl font-medium text-cream-50 mb-2">{item.title}</h3>
                        <p className="text-cream-100/70">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="animate-fade-in-up">
                <div className="bg-navy-800/50 backdrop-blur-sm rounded-3xl p-10 border border-white/5">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 bg-gold-400/10 rounded-2xl flex items-center justify-center text-gold-400">
                      <Phone className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-cream-50">Klar for å snakke?</h3>
                      <p className="text-cream-100/70">Kontakt oss i dag</p>
                    </div>
                  </div>
                  <p className="text-cream-100/80 mb-8 text-lg">
                    Ta kontakt med Isak eller Tor for en uforpliktende samtale om hvordan vi kan samarbeide.
                  </p>
                  <div className="space-y-4">
                    <Link href="/rederi/bli-med">
                      <Button size="lg" fullWidth className="bg-gold-500 hover:bg-gold-400 text-navy-900 font-medium border-none">
                        Send forespørsel
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                    </Link>
                    <Link href="/rederi/kontakt-oss">
                      <Button size="lg" variant="outline" fullWidth className="border-cream-100/20 text-cream-50 hover:bg-cream-100/10">
                        Ring oss direkte
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Trust */}
      <Section className="bg-white">
        <Container size="md">
          <div className="stagger text-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 text-sky-500 shadow-sm mb-6">
                <Shield className="w-8 h-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-medium text-navy-900 mb-4 font-heading">
                Trygt og profesjonelt
              </h2>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                Som godkjent bemanningsforetak og med DNV-sertifisert rekrutterer, garanterer vi kvalitet og trygghet i alle våre partnerskap.
              </p>
              <Link href="/rederi/bli-med">
                <Button size="lg" className="bg-navy-900 hover:bg-navy-800 text-white px-8">
                  Bli partner i dag
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </main>
    </>
  );
}

