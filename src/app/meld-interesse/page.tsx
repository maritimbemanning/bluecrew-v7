import type { Metadata } from 'next';
import Link from 'next/link';
import {
  CheckCircle2,
  ChevronRight,
  Shield,
  User,
} from '@/components/icons';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Registrer deg som sjøfolk',
  description: 'Opprett din Bluecrew-profil med Vipps og bli del av vårt nettverk av maritime fagfolk.',
  alternates: {
    canonical: 'https://bluecrew.no/meld-interesse',
  },
  openGraph: {
    title: 'Registrer deg - Bluecrew',
    description: 'Opprett din Bluecrew-profil med Vipps og bli del av vårt nettverk.',
    url: 'https://bluecrew.no/meld-interesse',
    siteName: 'Bluecrew AS',
    locale: 'nb_NO',
    type: 'website',
  },
};

const benefits = [
  {
    icon: Shield,
    title: 'Trygg verifisering',
    description: 'Logg inn med Vipps - ingen passord å huske.',
  },
  {
    icon: User,
    title: 'Én profil',
    description: 'Din Bluecrew-profil brukes til alle søknader.',
  },
  {
    icon: CheckCircle2,
    title: 'Rask prosess',
    description: 'Fullfør registreringen på under 5 minutter.',
  },
];

const steps = [
  {
    step: '1',
    title: 'Logg inn med Vipps',
    description: 'Trygg verifisering av identitet via BankID.',
  },
  {
    step: '2',
    title: 'Fullfør profilen',
    description: 'Last opp CV og velg stilling.',
  },
  {
    step: '3',
    title: 'Bli kontaktet',
    description: 'Vi matcher deg med relevante oppdrag.',
  },
];

export default function MeldInteressePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-navy-900 pt-32 pb-20">
        <Container size="md">
          <div className="text-center">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold-400/10 border border-gold-400/20 rounded-full text-gold-400 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4" />
                Gratis registrering
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-cream-50 mb-6">
              Bli del av <span className="italic text-gold-400">Bluecrew</span>
            </h1>
            
            <p className="text-xl text-cream-100/80 mb-10 max-w-2xl mx-auto">
              Opprett din Bluecrew-profil med Vipps og få tilgang til maritime jobbmuligheter.
            </p>

            {/* Main CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/api/vipps/start?returnTo=/registrer">
                <Button size="lg" className="bg-gold-500 hover:bg-gold-400 text-navy-900 font-semibold px-8">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                  Registrer med Vipps
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
              </Link>
              <Link href="/stillinger">
                <Button size="lg" variant="outline" className="border-cream-100/20 text-cream-100 hover:bg-cream-100/10">
                  Se ledige stillinger
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <Section>
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-14 h-14 bg-gold-400/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-gold-500" />
                  </div>
                  <h3 className="text-lg font-medium text-navy-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-600">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* How it works */}
      <Section variant="slate">
        <Container size="md">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium text-navy-900 mb-4">
              Slik fungerer det
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              Tre enkle steg for å bli del av vårt nettverk.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-4">
            {steps.map((item, index) => (
              <div key={index} className="flex-1 relative">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-slate-200" />
                )}
                
                <div className="relative bg-white rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 bg-navy-900 text-cream-50 rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-medium text-navy-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link href="/api/vipps/start?returnTo=/registrer">
              <Button size="lg">
                Kom i gang
                <ChevronRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Already have account */}
      <Section>
        <Container size="sm">
          <div className="bg-navy-900 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-medium text-cream-50 mb-4">
              Har du allerede en profil?
            </h3>
            <p className="text-cream-100/80 mb-6">
              Logg inn for å oppdatere profilen din eller søke på stillinger.
            </p>
            <Link href="/api/vipps/start?returnTo=/profil">
              <Button variant="outline" className="border-cream-100/20 text-cream-100 hover:bg-cream-100/10">
                Logg inn med Vipps
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  );
}

