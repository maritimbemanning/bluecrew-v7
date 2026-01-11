import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Share2,
  Anchor,
  Facebook,
  Linkedin,
  Star
} from '@/components/icons';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import { FadeUp } from '@/components/motion';

const breadcrumbs = [
  { name: 'Hjem', url: '/' },
  { name: 'Crew Stories', url: '/crew' },
  { name: 'Zeon Aqua', url: '/crew/zeonaqua' },
];

export const metadata: Metadata = {
  title: 'Vi takker Zeon Aqua for tilliten',
  description: 'Vi er stolte leverandører av mannskap til Zeon Aqua og MS Akvafighter. Et samarbeid basert på kvalitet og sikkerhet.',
  openGraph: {
    title: 'Vi takker Zeon Aqua for tilliten',
    description: 'Et samarbeid basert på kvalitet og sikkerhet.',
    url: 'https://bluecrew.no/crew/zeonaqua',
    siteName: 'Bluecrew AS',
    locale: 'nb_NO',
    type: 'article',
    images: [
      {
        url: 'https://bluecrew.no/images/CrewStory/ZeonAqua/hero.webp',
        width: 1200,
        height: 630,
        alt: 'MS Akvafighter',
      },
    ],
  },
  alternates: {
    canonical: 'https://bluecrew.no/crew/zeonaqua',
  },
};

export default function ZeonAquaPage() {
  return (
    <>
      <SchemaMarkup
        type="Article"
        data={{
          headline: 'Vi takker Zeon Aqua for tilliten',
          description: 'Samarbeid med Zeon Aqua.',
          author: { '@type': 'Organization', name: 'Bluecrew' },
          datePublished: '2025-02-20',
          image: '/images/CrewStory/ZeonAqua/hero.webp',
        }}
      />
      <SchemaMarkup type="breadcrumb" breadcrumbs={breadcrumbs} />

      <main className="bg-white pt-20">
        {/* Hero Section - Full width background */}
        <div className="relative h-[60vh] min-h-[500px] w-full flex items-end pb-12 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/CrewStory/ZeonAqua/hero.webp"
              alt="Zeon Aqua operasjon"
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
                Tilbake til oversikt
              </Link>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-cream-50 mb-6 max-w-4xl leading-tight">
                Vi takker Zeon Aqua for tilliten
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="flex items-center gap-4 text-cream-100/90 font-medium">
                <span className="px-3 py-1 bg-gold-500/20 border border-gold-500/30 rounded-full text-gold-300 text-sm">
                  Samarbeidspartner
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                <span>MS Akvafighter</span>
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
                    Zeon Aqua er en aktør som satser tungt på kvalitet. Med servicefartøyet 
                    <span className="text-navy-900 font-bold"> MS Akvafighter</span> leverer de tjenester i toppsjiktet til havbruksnæringen.
                  </p>
                  
                  <p>
                    For oss i Bluecrew er det en stor tillitserklæring å bli valgt som samarbeidspartner på bemanning. 
                    Vi vet at kravene er høye. I hektiske perioder er det avgjørende at mannskapet som kommer om bord 
                    ikke bare har papirene i orden, men også holdningene som kreves for å gli rett inn i operasjonen.
                  </p>

                  <p>
                    Vår jobb er å sørge for at Zeon Aqua alltid har tilgang på kvalifiserte sjøfolk – raskt og effektivt. 
                    Slik kan de fokusere på det de er best på: å levere førsteklasses servicetjenester til sine kunder.
                  </p>
                </div>

                {/* Quote Block */}
                <div className="bg-cream-50 rounded-2xl p-8 border border-cream-100 my-10">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-gold-500 fill-gold-500" />
                    ))}
                  </div>
                  <blockquote className="text-2xl text-navy-900 italic mb-6 leading-normal">
                    &ldquo;Rask respons og god leveranse.&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-navy-900 rounded-full flex items-center justify-center text-gold-400">
                      <Anchor className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-bold text-navy-900">Jørgen Gamst</div>
                      <div className="text-sm text-slate-600">Daglig leder, Zeon Aqua</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
                  <h3 className="text-2xl font-medium text-navy-900 mb-2">Dokumentert kvalitet</h3>
                  <p>
                    Samarbeidet med Zeon Aqua bekrefter at vår modell fungerer. Ved å kjenne kundenes behov 
                    og ha en oppdatert base med motiverte sjøfolk, kan vi løse bemanningsutfordringer på kort varsel 
                    uten å gå på akkord med kvaliteten.
                  </p>
                  <p>
                    Vi takker for oppdraget og ser frem til det videre samarbeidet med Jørgen og resten av teamet i Zeon Aqua.
                  </p>
                </div>
              </FadeUp>

              {/* Right Column: Image + Social */}
              <FadeUp delay={0.2} className="lg:col-span-5 space-y-6">
                <div className="relative aspect-4/5 w-full rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/CrewStory/ZeonAqua/hero.webp"
                    alt="MS Akvafighter i operasjon"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-navy-900/90 to-transparent">
                    <p className="text-cream-50 font-medium">MS Akvafighter - servicefartøy i toppklassen</p>
                  </div>
                </div>

                {/* Social Proof / Follow */}
                <div className="bg-navy-900 rounded-2xl p-8 text-cream-100 text-center">
                  <h3 className="text-xl font-medium mb-4 text-cream-50">Følg Zeon Aqua</h3>
                  <div className="flex flex-col gap-3">
                    <a
                      href="https://www.facebook.com/zeonaqua.as"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-colors"
                    >
                      <Facebook className="w-5 h-5" />
                      <span>Facebook</span>
                    </a>
                    <a
                      href="https://www.linkedin.com/company/zeon-aqua"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                      <span>LinkedIn</span>
                    </a>
                  </div>
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
                  <p className="text-slate-600">Vi hjelper dere med å finne rett kompetanse.</p>
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


