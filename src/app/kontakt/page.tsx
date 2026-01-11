import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Building2
} from '@/components/icons';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { getOgImageUrl, IMAGE_PATHS } from '@/lib/images';

const breadcrumbs = [
  { name: 'Hjem', url: '/' },
  { name: 'Kontakt', url: '/kontakt' },
];

// Lazy load the form - react-hook-form + zod only load when needed
const ContactForm = dynamic(() => import('./ContactForm'), {
  loading: () => (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="animate-pulse text-slate-500">Laster skjema...</div>
    </div>
  ),
});

export const metadata: Metadata = {
  title: 'Kontakt oss',
  description: 'Ta kontakt med Bluecrew for maritime bemanningsbehov eller spørsmål. Vi svarer innen én arbeidsdag. Ring, send e-post eller bruk kontaktskjemaet.',
  keywords: ['kontakt bluecrew', 'maritim bemanning kontakt', 'sjøfolk spørsmål'],
  alternates: {
    canonical: 'https://bluecrew.no/kontakt',
  },
  openGraph: {
    title: 'Kontakt Bluecrew',
    description: 'Ta kontakt med Bluecrew for maritime bemanningsbehov. Vi svarer innen én arbeidsdag.',
    url: 'https://bluecrew.no/kontakt',
    siteName: 'Bluecrew AS',
    locale: 'nb_NO',
    type: 'website',
    images: [
      {
        url: getOgImageUrl(IMAGE_PATHS.og.default),
        width: 1200,
        height: 630,
        alt: 'Kontakt Bluecrew',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kontakt Bluecrew',
    description: 'Ta kontakt med Bluecrew for maritime bemanningsbehov. Vi svarer innen én arbeidsdag.',
    images: [getOgImageUrl(IMAGE_PATHS.og.default)],
  },
};

const faqItems = [
  {
    question: 'Hvor raskt svarer Bluecrew på henvendelser?',
    answer: 'Vi svarer på alle henvendelser innen én arbeidsdag. Ved hastesaker kan du ringe oss direkte for umiddelbar hjelp.',
  },
  {
    question: 'Hvilke åpningstider har Bluecrew?',
    answer: 'Kontoret er åpent hverdager 08:00-16:00. Ved akutt bemanningsbehov har vi beredskap utenom kontortid.',
  },
  {
    question: 'Hvor holder Bluecrew til?',
    answer: 'Bluecrew har hovedkontor i Harstad og avdelingskontor i Stavanger. Vi opererer nasjonalt med kandidater og rederikunder langs hele norskekysten.',
  },
  {
    question: 'Kan jeg besøke Bluecrews kontor?',
    answer: 'Ja, du er velkommen til å besøke oss etter avtale. Ta kontakt for å avtale et møte med en av våre rekrutterere.',
  },
];

export default function KontaktPage() {
  return (
    <>
      <SchemaMarkup type="breadcrumb" breadcrumbs={breadcrumbs} />
      <SchemaMarkup type="faq" faqItems={faqItems} />
      <main>
      {/* Hero Section */}
      <Section variant="navy" noPadding className="pt-20">
        <Container size="lg">
          <div className="py-12 md:py-20">
            <div className="stagger-container max-w-3xl">
              <div className="stagger-item mb-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-sky/20 rounded-full text-sky-200 text-sm font-medium">
                  <Mail className="w-4 h-4" />
                  Kontakt oss
                </span>
              </div>

              <h1 className="stagger-item text-4xl md:text-5xl font-medium text-cream-50 mb-6">
                Vi er her for å hjelpe
              </h1>

              <p className="stagger-item text-xl text-cream-100/80">
                Har du spørsmål? Ta kontakt – vi svarer innen én arbeidsdag.
              </p>

              {/* Prominent Phone CTA */}
              <div className="stagger-item mt-8">
                <a
                  href="tel:+4777029000"
                  className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-4 transition-colors group"
                >
                  <div className="w-12 h-12 bg-sky rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-cream-50" />
                  </div>
                  <div>
                    <p className="text-sm text-cream-100/70">Ring oss direkte</p>
                    <p className="text-xl font-medium text-cream-50 group-hover:text-sky-200 transition-colors">+47 77 02 90 00</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Contact Info & Form */}
      <Section variant="slate">
        <Container size="lg">
          <div className="stagger-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="stagger-item">
                <h2 className="text-2xl md:text-3xl font-medium text-navy mb-8">
                  Kontaktinformasjon
                </h2>

                <div className="space-y-6 mb-8">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-sky/10 rounded-lg flex items-center justify-center shrink-0">
                        <Mail className="w-6 h-6 text-sky" />
                      </div>
                      <div>
                        <h3 className="font-medium text-navy mb-1">E-post</h3>
                        <a
                          href="mailto:post@bluecrew.no"
                          className="text-sky hover:underline"
                        >
                          post@bluecrew.no
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-sky/10 rounded-lg flex items-center justify-center shrink-0">
                        <Phone className="w-6 h-6 text-sky" />
                      </div>
                      <div>
                        <h3 className="font-medium text-navy mb-1">Telefon</h3>
                        <a
                          href="tel:+4777029000"
                          className="text-sky hover:underline"
                        >
                          +47 77 02 90 00
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-sky/10 rounded-lg flex items-center justify-center shrink-0">
                        <MapPin className="w-6 h-6 text-sky" />
                      </div>
                      <div>
                        <h3 className="font-medium text-navy mb-1">Lokasjon</h3>
                        <p className="text-slate-600">Harstad, Norge</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-sky/10 rounded-lg flex items-center justify-center shrink-0">
                        <Building2 className="w-6 h-6 text-sky" />
                      </div>
                      <div>
                        <h3 className="font-medium text-navy mb-1">Org.nr</h3>
                        <p className="text-slate-600">936 463 843</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <Clock className="w-4 h-4" />
                  Responstid: Innen 1 arbeidsdag
                </div>

                {/* Trust Signals */}
                <div className="mt-8 p-6 bg-navy/5 rounded-xl border border-navy/10">
                  <h3 className="font-medium text-navy mb-4">Derfor kan du stole på oss</h3>
                  <ul className="space-y-3 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-sky mt-0.5">✓</span>
                      <span><strong>DNV-sertifisert</strong> rekrutteringsprosess</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-sky mt-0.5">✓</span>
                      <span><strong>48-timers erstatningsgaranti</strong> ved mismatch</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-sky mt-0.5">✓</span>
                      <span>Vi tar <strong>fullt arbeidsgiveransvar</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-sky mt-0.5">✓</span>
                      <span>Beredskap utenom kontortid ved akutte behov</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Contact Form */}
              <div className="stagger-item">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Quick Links */}
      <Section>
        <Container size="lg">
          <div className="stagger-container">
            <div className="stagger-item text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-medium text-navy mb-4">
                Leter du etter noe spesifikt?
              </h2>
            </div>

            <div className="stagger-item grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'For sjøfolk', href: '/sjofolk', desc: 'Registrer deg i vår database' },
                { title: 'For rederier', href: '/rederi', desc: 'Se våre tjenester' },
                { title: 'Lønnsoversikt', href: '/lonn', desc: 'Sjekk maritim lønn' },
                { title: 'FAQ', href: '/faq', desc: 'Vanlige spørsmål' },
              ].map((link, index) => (
                <Link key={index} href={link.href} className="group">
                  <div className="bg-slate-50 rounded-xl p-6 hover:bg-slate-100 transition-colors h-full">
                    <h3 className="font-medium text-navy mb-1 group-hover:text-sky transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-sm text-slate-500">{link.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </main>
    </>
  );
}

