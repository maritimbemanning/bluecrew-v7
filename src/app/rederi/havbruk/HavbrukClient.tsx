"use client";

import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronRight,
  Shield,
  Users,
  Anchor,
  Phone,
  Zap,
  Ship
} from '@/components/icons';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { getImageUrl, IMAGE_PATHS } from '@/lib/images';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/motion';

const breadcrumbs = [
  { name: 'Hjem', url: '/' },
  { name: 'For rederier', url: '/rederi' },
  { name: 'Oppdrett og Akvakultur', url: '/rederi/havbruk' },
];

const solutions = [
  { text: 'Mannskap med erfaring fra servicebåt og oppdrett', icon: Users },
  { text: 'Rask responstid ved akutte behov', icon: Zap },
  { text: 'Vi tar arbeidsgiveransvar og administrasjon', icon: Shield },
  { text: 'Sertifisert personell (D6, Kran, ROC)', icon: Anchor },
];

const positions = [
  {
    title: 'Matros / Motormann',
    description: 'Erfaring med kran, vinsj og dekksarbeid. Gjerne med fagbrev.',
    tags: ['Kranfører', 'Notvask', 'Ankerhåndtering']
  },
  {
    title: 'Skipper (D6-D1)',
    description: 'Operativ erfaring fra servicefartøy og manøvrering under krevende forhold.',
    tags: ['Servicebåt', 'Navigasjon', 'Operasjonsledelse']
  },
  {
    title: 'Maskinist (M4-M1)',
    description: 'Teknisk kyndig personell for drift og vedlikehold av maskineri.',
    tags: ['Vedlikehold', 'Feilsøking', 'Drift']
  },
  {
    title: 'Røkter / Akvatekniker',
    description: 'Fagfolk til drift av anlegg, fôring og daglig tilsyn.',
    tags: ['Fagbrev', 'Biologi', 'Drift']
  },
];

const regions = [
  { name: 'Nord-Norge', description: 'Finnmark, Troms, Nordland' },
  { name: 'Midt-Norge', description: 'Trøndelag, Møre og Romsdal' },
  { name: 'Vestlandet', description: 'Vestland, Rogaland' },
];

export default function HavbrukClient() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <Image
            src={getImageUrl(IMAGE_PATHS.hero.havbruk)}
            alt="Servicebåt i operasjon ved merd"
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
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-cream-50 mb-6 leading-[1.1]">
                <span className="italic">Spesialist</span>bemanning for
                <span className="block mt-2"><span className="text-gold-400">oppdrett</span> og <span className="text-gold-400 italic">akvakultur</span></span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.1}>
              <p className="text-xl text-cream-100 mb-10 leading-relaxed max-w-2xl font-medium">
                Vi sikrer at krevende operasjoner på merdkanten løses med riktig kompetanse. Gjennomtenkt bemanning gir tryggere drift, bedre fiskevelferd og bedre resultater.
              </p>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/rederi/behov">
                  <Button size="lg" className="bg-gold-500 hover:bg-gold-400 text-navy-900 font-medium shadow-lg shadow-gold-500/20 px-8">
                    Meld behov for bemanning
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </Link>
                <a href="tel:+4792328850">
                  <Button size="lg" variant="outline" className="border-cream-200/30 text-cream-50 hover:bg-white/10 px-8">
                    <Phone className="w-5 h-5 mr-2" />
                    Vakttelefon: 923 28 850
                  </Button>
                </a>
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


      {/* Value Proposition */}
      <Section className="bg-white overflow-hidden">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-navy-50 text-navy-700 rounded-full text-sm font-medium mb-6">
                  <Ship className="w-4 h-4" />
                  Operativ støtte
                </div>
                <h2 className="text-3xl md:text-4xl font-medium text-navy-900 mb-6">
                  Folk som forstår operasjoner i havbruk
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  Krevende operasjoner på merdkanten krever folk med erfaring. Vi forstår at det ikke bare handler om sertifikater – det handler om å vite hva som skjer når kranen svinger ut mot merden, eller når det går hektisk til ved avlusing.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Våre kandidater har operativ bakgrunn fra havbruk. De har kjørt kran, vasket nett, bistått ved behandling, og holdt utstyr i drift. De vet hva som kreves, og de leverer fra dag én.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                <h3 className="text-xl font-medium text-navy-900 mb-6">Våre løsninger</h3>
                <div className="space-y-4">
                  {solutions.map((solution, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="mt-1 w-6 h-6 rounded-full bg-gold-100 flex items-center justify-center shrink-0">
                        <solution.icon className="w-4 h-4 text-gold-600" />
                      </div>
                      <span className="text-slate-700">{solution.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </Container>
      </Section>

      {/* Positions Grid */}
      <Section className="bg-slate-50">
        <Container size="lg">
          <FadeUp>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-medium text-navy-900 mb-4">
                Kompetanseområder
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Vi leverer kvalifisert personell til ulike roller i havbrukssektoren.
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid md:grid-cols-2 gap-6">
            {positions.map((position, index) => (
              <StaggerItem key={index}>
                <div className="bg-white p-6 rounded-xl border border-slate-200 hover:border-gold-300 hover:shadow-lg transition-all h-full">
                  <h3 className="text-xl font-medium text-navy-900 mb-2">{position.title}</h3>
                  <p className="text-slate-600 mb-4">{position.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {position.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-navy-50 text-navy-700 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* Regional Coverage */}
      <Section className="bg-navy-900 text-cream-100">
        <Container size="lg">
          <FadeUp>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-medium text-cream-50 mb-4">
                Landsdekkende nettverk
              </h2>
              <p className="text-lg text-cream-100/80 max-w-2xl mx-auto">
                Vi har tilgang på kvalifisert personell langs hele kysten.
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {regions.map((region, index) => (
              <StaggerItem key={index}>
                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                  <h3 className="text-xl font-medium text-cream-50 mb-2">{region.name}</h3>
                  <p className="text-cream-100/70">{region.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="bg-white">
        <Container size="md" className="text-center">
          <FadeUp>
            <h2 className="text-3xl md:text-4xl font-medium text-navy-900 mb-6">
              Trenger dere bistand?
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto">
              Ta kontakt for en uforpliktende samtale om deres bemanningsbehov.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/rederi/behov">
                <Button size="lg" className="bg-gold-500 hover:bg-gold-400 text-navy-900">
                  Meld behov
                </Button>
              </Link>
              <a href="tel:+4777029000">
                <Button size="lg" variant="outline" className="border-navy-900 text-navy-900 hover:bg-navy-50">
                  Ring oss
                </Button>
              </a>
            </div>
          </FadeUp>
        </Container>
      </Section>
    </main>
  );
}

