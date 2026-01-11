import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronRight,
  Target,
  FileCheck,
  Phone
} from '@/components/icons';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { getImageUrl, IMAGE_PATHS } from '@/lib/images';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Maritim Rekruttering og Headhunting | Bemanningsbyrå',
  description: 'Bemanningsbyrå med spesialisert maritim rekruttering og headhunting. Vi finner de rette kandidatene til faste stillinger om bord og på land. DNV-sertifisert.',
  keywords: [
    'maritim rekruttering',
    'bemanningsbyrå rekruttering',
    'headhunting sjøfolk',
    'headhunting maritim',
    'rekruttering rederi',
    'rekruttering sjøfolk',
    'maritime recruitment',
    'ansettelse sjøfolk',
    'maritim headhunting',
  ],
  openGraph: {
    title: 'Maritim Rekruttering og Headhunting',
    description: 'Bemanningsbyrå med spesialisert maritim rekruttering. Vi finner kandidatene som ikke ligger på Finn.no.',
    url: 'https://bluecrew.no/rederi/rekruttering',
  },
  alternates: {
    canonical: 'https://bluecrew.no/rederi/rekruttering',
  },
};

// Breadcrumb data
const breadcrumbs = [
  { name: 'Hjem', url: '/' },
  { name: 'For rederier', url: '/rederi' },
  { name: 'Rekruttering', url: '/rederi/rekruttering' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Maritim Rekruttering',
  provider: {
    '@type': 'Organization',
    name: 'Bluecrew AS'
  },
  description: 'Rekruttering og headhunting av maritimt personell til faste stillinger.',
  areaServed: 'Norway'
};

export default function RekrutteringPage() {
  return (
    <main>
      <SchemaMarkup type="custom" data={serviceSchema} />
      <SchemaMarkup type="breadcrumb" breadcrumbs={breadcrumbs} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <Image
            src={getImageUrl(IMAGE_PATHS.hero.rederi)}
            alt="Rekrutteringsmøte maritimt"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-navy-900/80" />
        <Container size="lg" className="relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-cream-50 mb-6 leading-[1.1]">
              Vi finner talentene som
              <span className="block text-gold-400 mt-2">bygger rederiet</span>
            </h1>
            <p className="text-xl text-cream-100 mb-10 leading-relaxed font-medium">
              Fra kapteiner til tekniske sjefer. Vi kombinerer bransjeinnsikt med aktiv headhunting for å finne kandidatene som ikke ligger på Finn.no.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/rederi/kontakt-oss">
                <Button size="lg" className="bg-gold-500 hover:bg-gold-400 text-navy-900 font-medium px-8">
                  Start prosessen
                  <ChevronRight className="w-5 h-5" />
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


      {/* Main Content */}
      <Section className="bg-white">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-medium text-navy-900 mb-6">
                Rekruttering for fremtiden
              </h2>
              <div className="prose prose-lg text-slate-600 mb-8">
                <p>
                  Feilansettelser er kostbart, spesielt i maritim sektor hvor kompetanse og personlig egnethet er avgjørende for sikkerheten om bord.
                </p>
                <p>
                  Bluecrew går grundig til verks. Vi annonserer ikke bare; vi leter. Vårt nettverk og våre metoder gjør at vi når ut til de passive kandidatene – de dyktige fagfolkene som allerede er i jobb, men som er klare for neste steg.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div className="p-5 bg-slate-50 rounded-xl">
                   <Target className="w-8 h-8 text-gold-500 mb-3" />
                   <h3 className="font-medium text-navy-900 mb-2">Presisjonssøk</h3>
                   <p className="text-sm text-slate-600">Vi kartlegger markedet og kontakter relevante kandidater direkte.</p>
                 </div>
                 <div className="p-5 bg-slate-50 rounded-xl">
                   <FileCheck className="w-8 h-8 text-gold-500 mb-3" />
                   <h3 className="font-medium text-navy-900 mb-2">Kvalitetssikring</h3>
                   <p className="text-sm text-slate-600">Dybdeintervjuer, sjekk av sertifikater og referanser.</p>
                 </div>
              </div>
            </div>

            <div className="bg-navy-900 text-cream-100 p-10 rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-medium mb-6 text-gold-400">Vår prosess</h3>
                <ul className="space-y-6">
                  {[
                    { title: '1. Analyse', text: 'Vi definerer kravprofil og suksesskriterier sammen med dere.' },
                    { title: '2. Søk & Headhunting', text: 'Vi aktiverer nettverket og søker i baser og sosiale medier.' },
                    { title: '3. Utvelgelse', text: 'Vi intervjuer, tester og verifiserer kandidatene.' },
                    { title: '4. Presentasjon', text: 'Dere får presentert de beste kandidatene med vår vurdering.' },
                    { title: '5. Oppfølging', text: 'Vi bistår i forhandlinger og følger opp etter ansettelse.' },
                  ].map((step, i) => (
                    <li key={i} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center font-bold shrink-0 border border-gold-500/40">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="font-medium text-lg">{step.title}</h4>
                        <p className="text-cream-200/80 text-sm">{step.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="bg-slate-50 border-t border-slate-200">
        <Container size="md">
          <div className="text-center">
            <h2 className="text-3xl font-medium text-navy-900 mb-6">
              Skal vi finne deres neste nøkkelperson?
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Ta kontakt for en uforpliktende prat om deres rekrutteringsbehov.
            </p>
            <div className="flex justify-center">
              <Link href="/rederi/kontakt-oss">
                <Button size="lg" className="bg-navy-900 text-white hover:bg-navy-800">
                  <Phone className="w-5 h-5 mr-2" />
                  Kontakt oss
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}

