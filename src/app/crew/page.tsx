import { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen,
  ChevronRight,
  Clock,
  User,
  Anchor,
  Ship,
  Compass,
  Wrench
} from '@/components/icons';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

const breadcrumbs = [
  { name: 'Hjem', url: '/' },
  { name: 'Crew Stories', url: '/crew' },
];

export const metadata: Metadata = {
  title: 'Crew Stories – Ekte historier fra sjøfolk',
  description: 'Les ekte historier fra sjøfolk i Norge. Karriereveier, livet til sjøs, tips og råd fra erfarne kaptein, styrmann, maskinist og matros.',
  keywords: [
    'sjøfolk historier',
    'livet til sjøs',
    'maritim karriere',
    'offshore erfaring',
    'sjømann blogg',
  ],
  openGraph: {
    title: 'Crew Stories – Ekte historier fra sjøfolk',
    description: 'Les ekte historier fra sjøfolk i Norge. Karriereveier, tips og erfaringer.',
    url: 'https://bluecrew.no/crew',
    siteName: 'Bluecrew AS',
    locale: 'nb_NO',
    type: 'website',
  },
  alternates: {
    canonical: 'https://bluecrew.no/crew',
  },
};

// Articles data - Timeline order: Newest first (left to right)
const articles = [
  {
    slug: 'tore-nymo',
    title: 'Styrmann i romjula – Tore Nymo',
    excerpt: 'Tore vikarierte som styrmann i romjula og nyttårsaften. Les om hans positive opplevelse med topp fasiliteter og godt mannskap.',
    author: 'Tore Nymo',
    role: 'Styrmann, Bluecrew',
    readTime: '4 min',
    category: 'Crew Story',
    icon: Compass,
    image: '/images/CrewStory/ToreNymo/hero.webp',
  },
  {
    slug: 'zeonaqua',
    title: 'Vi takker ZeonAqua for tilliten',
    excerpt: 'Et servicerederi i vekst med fokus på kvalitet og sikkerhet. Vi er stolte av samarbeidet.',
    author: 'Bluecrew',
    role: 'Samarbeidspartner',
    readTime: '3 min',
    category: 'Suksesshistorier',
    icon: Anchor,
  },
  {
    slug: 'fra-kadett-til-kaptein',
    title: 'Fra kadett til kaptein – min 15-årige reise',
    excerpt: 'Hvordan jeg gikk fra å være nervøs kadett på min første tur til å ta over kommandoen på et offshore-skip.',
    author: 'Lars M.',
    role: 'Kaptein, Offshore Supply',
    readTime: '8 min',
    category: 'Karriereveier',
    icon: Compass,
  },
  {
    slug: 'min-forste-offshore-tur',
    title: 'Min første offshore-tur – slik var det',
    excerpt: 'Alt du lurer på om første gang til sjøs. Fra helikopterturen til første nattskift.',
    author: 'Erik S.',
    role: 'Matros, PSV',
    readTime: '6 min',
    category: 'Livet til sjøs',
    icon: Ship,
  },
  {
    slug: 'livet-som-matros-pa-bronnbat',
    title: 'Livet som matros på brønnbåt',
    excerpt: 'Havbrukssektoren vokser. Slik er hverdagen for en matros som jobber med laks og oppdrett.',
    author: 'Thomas K.',
    role: 'Matros, Brønnbåt',
    readTime: '7 min',
    category: 'Livet til sjøs',
    icon: Anchor,
  },
  {
    slug: 'hvordan-jeg-ble-maskinist',
    title: 'Hvordan jeg ble maskinist',
    excerpt: 'Fra industrimontør på land til maskinist offshore. Tips for deg som vurderer samme vei.',
    author: 'Arne B.',
    role: 'Maskinist, AHTS',
    readTime: '7 min',
    category: 'Karriereveier',
    icon: Wrench,
  },
  {
    slug: 'kvinne-i-maritim-sektor',
    title: 'Kvinne i maritim sektor – mine erfaringer',
    excerpt: 'Som kvinnelig styrmann møter jeg spørsmål og nysgjerrighet. Her er mine refleksjoner.',
    author: 'Maria H.',
    role: 'Styrmann, Tankskip',
    readTime: '8 min',
    category: 'Karriereveier',
    icon: Compass,
  },
  {
    slug: 'offshore-vs-havbruk-min-erfaring',
    title: 'Offshore vs havbruk – min erfaring fra begge',
    excerpt: 'Jeg har jobbet både offshore og i havbruk. Her er forskjellene og hva som passet best for meg.',
    author: 'Jonas R.',
    role: 'Matros, Tidligere offshore',
    readTime: '6 min',
    category: 'Tips & råd',
    icon: Ship,
  },
];

const categories = ['Alle', 'Crew Story', 'Karriereveier', 'Livet til sjøs', 'Tips & råd', 'Suksesshistorier'];

export default function CrewPage() {
  return (
    <>
      <SchemaMarkup type="breadcrumb" breadcrumbs={breadcrumbs} />
      <main>
      {/* Hero Section */}
      <Section variant="navy" className="pt-20">
        <Container size="lg">
          <div>
            <div className="max-w-3xl">
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold-400/10 border border-gold-400/20 rounded-full text-gold-300 text-sm font-medium backdrop-blur-sm">
                  <BookOpen className="w-4 h-4" />
                  Crew Stories
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-cream-50 mb-6 leading-tight">
                Ekte historier fra
                <span className="font-medium text-gold-400"> sjøfolk</span>
              </h1>

              <p className="text-xl md:text-2xl text-cream-100/90 leading-relaxed font-medium">
                Karriereveier, livet til sjøs, og tips fra erfarne kolleger. Les og lær av de som har vært der.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-100">
        <Container size="lg">
          <div className="py-3">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </Container>
      </div>

      {/* Categories */}
      <Section className="bg-cream-50">
        <Container size="lg">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  index === 0
                    ? 'bg-navy-900 text-white shadow-sm'
                    : 'bg-white text-navy-700 hover:bg-cream-100 border border-cream-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </Container>
      </Section>

      {/* Articles Grid */}
      <Section>
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => {
              const Icon = article.icon;
              return (
                <Link
                  key={article.slug}
                  href={`/crew/${article.slug}`}
                  className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden border border-cream-100"
                >
                  {/* Article header with icon */}
                  <div className="h-32 bg-navy-900 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gold-400/5" />
                    <Icon className="w-16 h-16 text-cream-50/20 relative z-10" />
                  </div>

                  <div className="p-6">
                    {/* Category badge */}
                    <span className="inline-block px-3 py-1 bg-cream-100 text-navy-700 text-xs font-medium rounded-full mb-3">
                      {article.category}
                    </span>

                    <h2 className="text-xl font-medium text-navy-900 mb-2 group-hover:text-gold-600 transition-colors">
                      {article.title}
                    </h2>

                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>

                    {/* Author and read time */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-cream-50 rounded-full flex items-center justify-center border border-cream-100">
                          <User className="w-4 h-4 text-navy-400" />
                        </div>
                        <div>
                          <p className="font-medium text-navy-900">{article.author}</p>
                          <p className="text-slate-500 text-xs">{article.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-slate-500">
                        <Clock className="w-4 h-4" />
                        {article.readTime}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Share your story CTA */}
      <Section className="bg-cream-50">
        <Container size="md">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm text-center border border-cream-100">
            <Anchor className="w-12 h-12 text-gold-500 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-medium text-navy-900 mb-4">
              Har du en historie å dele?
            </h2>
            <p className="text-slate-600 mb-6 max-w-lg mx-auto">
              Vi vil høre fra deg! Del din erfaring fra livet til sjøs og inspirer andre som vurderer
              en maritim karriere.
            </p>
            <Link href="/kontakt">
              <Button size="lg">
                Ta kontakt
                <ChevronRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Related links */}
      <Section>
        <Container size="lg">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-medium text-navy-900">
              Utforsk mer
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Karriereveier', href: '/karriere', desc: 'Utforsk maritime yrker' },
              { title: 'Lønnsoversikt', href: '/lonn', desc: 'Se hva sjøfolk tjener' },
              { title: 'Turnus-kalkulator', href: '/turnus', desc: 'Beregn arbeidsdager og fri' },
              { title: 'Registrer deg', href: '/meld-interesse', desc: 'Bli del av Bluecrew' },
            ].map((link, index) => (
              <Link key={index} href={link.href} className="group">
                <div className="bg-cream-50 rounded-xl p-6 hover:bg-cream-100 transition-colors h-full border border-cream-100/50">
                  <h3 className="font-medium text-navy-900 mb-1 group-hover:text-gold-600 transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm text-slate-500">{link.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </main>
    </>
  );
}

