import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Share2,
  Anchor,
  Ship,
  MapPin,
  Calendar,
  Star,
  CheckCircle
} from '@/components/icons';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/motion';

const breadcrumbs = [
  { name: 'Hjem', url: '/' },
  { name: 'Aktuelt', url: '/crew' },
  { name: 'Tore Nymo – Styrmann i romjula', url: '/crew/tore-nymo' },
];

export const metadata: Metadata = {
  title: 'Tore Nymo – Styrmann i romjula',
  description: 'Les om Tore Nymo sin opplevelse som innleid styrmann i romjula og nyttårsaften. Ekte erfaring fra en av våre dyktige sjøfolk.',
  openGraph: {
    title: 'Tore Nymo – Styrmann i romjula',
    description: 'Ekte erfaring fra en av våre dyktige sjøfolk som vikarierte som styrmann i romjula.',
    url: 'https://bluecrew.no/crew/tore-nymo',
    siteName: 'Bluecrew AS',
    locale: 'nb_NO',
    type: 'article',
    images: [
      {
        url: 'https://bluecrew.no/images/CrewStory/ToreNymo/hero.webp',
        width: 1200,
        height: 630,
        alt: 'Tore Nymo – Styrmann',
      },
    ],
  },
  alternates: {
    canonical: 'https://bluecrew.no/crew/tore-nymo',
  },
};

const highlights = [
  'Topp fasiliteter om bord',
  'Godt mottatt av mannskapet',
  'Variert arbeid – anleggssjekk, henting av aggregat og ringvasker',
  'Reise fra nord til Ålesund',
];

export default function ToreNymoPage() {
  return (
    <>
      <SchemaMarkup
        type="Article"
        data={{
          headline: 'Tore Nymo – Styrmann i romjula',
          description: 'Ekte erfaring fra en av våre dyktige sjøfolk som vikarierte som styrmann.',
          author: { '@type': 'Person', name: 'Tore Nymo' },
          datePublished: '2026-01-09',
          image: '/images/CrewStory/ToreNymo/hero.webp',
        }}
      />
      <SchemaMarkup type="breadcrumb" breadcrumbs={breadcrumbs} />

      <main className="bg-white pt-20">
        {/* Hero Section - Full width background */}
        <div className="relative h-[60vh] min-h-[500px] w-full flex items-end pb-12 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/CrewStory/ToreNymo/hero.webp"
              alt="Tore Nymo – Styrmann hos Bluecrew"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-linear-to-t from-navy-900 via-navy-900/60 to-transparent" />
          <Container size="lg" className="relative z-10">
            <FadeUp>
              <Link
                href="/crew"
                className="inline-flex items-center gap-2 text-cream-100/80 hover:text-cream-50 mb-6 transition-colors font-medium"
              >
                <ArrowLeft className="w-5 h-5" />
                Tilbake til Aktuelt
              </Link>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-cream-50 mb-6 max-w-4xl leading-tight">
                Styrmann i <span className="italic text-gold-400">romjula</span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="flex flex-wrap items-center gap-4 text-cream-100/90 font-medium">
                <span className="px-3 py-1 bg-gold-500/20 border border-gold-500/30 rounded-full text-gold-300 text-sm">
                  Crew Story
                </span>
                <span className="flex items-center gap-1.5">
                  <Anchor className="w-4 h-4" />
                  Tore Nymo
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  Romjul & Nyttår 2025/2026
                </span>
              </div>
            </FadeUp>
          </Container>
        </div>

        {/* Main Content Section */}
        <Section>
          <Container size="lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

              {/* Left Column: Text */}
              <FadeUp className="lg:col-span-7 space-y-8">
                <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
                  <p className="font-medium text-xl text-navy-900 leading-relaxed">
                    Tore Nymo, ansatt i Bluecrew, vikarierte som styrmann i romjula og nyttårsaften. 
                    Vi tok en prat med han om hvordan oppdraget gikk.
                  </p>
                </div>

                {/* Q&A Section */}
                <div className="space-y-8">
                  {/* Question 1 */}
                  <div className="bg-cream-50 rounded-2xl p-8 border border-cream-100">
                    <h3 className="text-lg font-medium text-navy-900 mb-3 flex items-center gap-2">
                      <Ship className="w-5 h-5 text-gold-500" />
                      Hvordan var første dag?
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Første dag var grei. Eneste var at vi var uheldige med været, slik at man ble værfast 
                      under reisen til jobb. Men det er en bit av yrket.
                    </p>
                  </div>

                  {/* Question 2 */}
                  <div className="bg-cream-50 rounded-2xl p-8 border border-cream-100">
                    <h3 className="text-lg font-medium text-navy-900 mb-3 flex items-center gap-2">
                      <Anchor className="w-5 h-5 text-gold-500" />
                      Hvordan var forholdene om bord?
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Forholdene om bord var veldig bra. Fasilitetene om bord er topp, og man ble tatt godt 
                      imot av mannskapet slik at man følte seg velkommen fra første minutt.
                    </p>
                  </div>

                  {/* Question 3 */}
                  <div className="bg-cream-50 rounded-2xl p-8 border border-cream-100">
                    <h3 className="text-lg font-medium text-navy-900 mb-3 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-gold-500" />
                      Hva gjorde dere?
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Vi hadde en dag der vi hjalp til med å sjekke et anlegg før vi startet reisen sørover. 
                      Der hentet vi et aggregat og en ringvasker før vi fortsatte turen sør mot Ålesund.
                    </p>
                  </div>

                  {/* Question 4 - Main Quote */}
                  <div className="bg-navy-900 rounded-2xl p-8">
                    <h3 className="text-lg font-medium text-cream-50 mb-4 flex items-center gap-2">
                      <Star className="w-5 h-5 text-gold-400" />
                      Generelt om opplevelsen?
                    </h3>
                    <blockquote className="text-xl text-cream-100 italic leading-relaxed mb-6">
                      &ldquo;Opplevelsen min var bare positiv. Vi ble tatt godt imot av mannskapet, 
                      fasilitetene var topp. Vi var uheldige under reise slik at bagasje forsvant på fly, 
                      men dette jobbet vi rundt slik at det ikke var noe problem.&rdquo;
                    </blockquote>
                    <p className="text-gold-400 font-medium text-lg">
                      &ldquo;For å si det slik: om jeg hadde fått et til oppdrag med disse karene, 
                      hadde jeg ikke sagt nei.&rdquo;
                    </p>
                    <div className="flex items-center gap-4 mt-6 pt-6 border-t border-cream-100/10">
                      <div className="w-12 h-12 bg-gold-500/20 rounded-full flex items-center justify-center">
                        <Anchor className="w-6 h-6 text-gold-400" />
                      </div>
                      <div>
                        <div className="font-medium text-cream-50">Tore Nymo</div>
                        <div className="text-sm text-cream-100/70">Styrmann, Bluecrew</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Highlights */}
                <div className="bg-cream-50 rounded-2xl p-8 border border-cream-100">
                  <h3 className="text-xl font-medium text-navy-900 mb-4">Oppsummert</h3>
                  <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {highlights.map((item, index) => (
                      <StaggerItem key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                        <span className="text-slate-700">{item}</span>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              </FadeUp>

              {/* Right Column: Image + Info */}
              <FadeUp delay={0.2} className="lg:col-span-5 space-y-6">
                <div className="relative aspect-4/5 w-full rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/CrewStory/ToreNymo/hero.webp"
                    alt="Tore Nymo – Styrmann"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-navy-900/90 to-transparent">
                    <p className="text-cream-50 font-medium">Tore Nymo – vikarierte som styrmann</p>
                  </div>
                </div>

                {/* Info Card */}
                <div className="bg-navy-900 rounded-2xl p-8 text-cream-100">
                  <h3 className="text-xl font-medium mb-6 text-cream-50">Om oppdraget</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Anchor className="w-5 h-5 text-gold-400" />
                      <div>
                        <div className="text-sm text-cream-100/70">Stilling</div>
                        <div className="font-medium text-cream-50">Styrmann</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gold-400" />
                      <div>
                        <div className="text-sm text-cream-100/70">Periode</div>
                        <div className="font-medium text-cream-50">Romjul & Nyttår 2025/2026</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-gold-400" />
                      <div>
                        <div className="text-sm text-cream-100/70">Rute</div>
                        <div className="font-medium text-cream-50">Nord → Ålesund</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Card */}
                <div className="bg-gold-50 rounded-2xl p-8 border border-gold-200">
                  <h3 className="text-xl font-medium text-navy-900 mb-3">
                    Vil du jobbe som sjømann?
                  </h3>
                  <p className="text-slate-600 mb-6">
                    Registrer deg i vår kandidatdatabase og bli vurdert til fremtidige oppdrag.
                  </p>
                  <Link href="/meld-interesse">
                    <Button className="w-full">
                      Meld interesse
                    </Button>
                  </Link>
                </div>
              </FadeUp>

            </div>
          </Container>
        </Section>

        {/* Footer CTA */}
        <Section className="bg-cream-50 border-t border-cream-100">
          <Container size="md">
            <FadeUp>
              <div className="flex items-center justify-between gap-8 flex-col md:flex-row">
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-medium text-navy-900 mb-2">Har dere behov for mannskap?</h3>
                  <p className="text-slate-600">Vi hjelper dere med å finne rett kompetanse – også på kort varsel.</p>
                </div>
                <div className="flex gap-4">
                  <button
                    className="p-3 bg-white rounded-lg hover:bg-cream-100 transition-colors shadow-sm text-navy-600"
                    aria-label="Del artikkel"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                  <Link href="/rederi/behov">
                    <Button>Meld behov</Button>
                  </Link>
                </div>
              </div>
            </FadeUp>
          </Container>
        </Section>
      </main>
    </>
  );
}

