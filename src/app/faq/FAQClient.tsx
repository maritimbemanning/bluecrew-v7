'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ChevronRight, HelpCircle, Anchor, Building2, DollarSign, Clock } from '@/components/icons';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Button from '@/components/ui/Button';
import Accordion from '@/components/ui/Accordion';

type FAQItem = {
  question: string;
  answer: string;
};

type FAQCategory = {
  id: string;
  label: string;
};

interface FAQClientProps {
  categories: FAQCategory[];
  faqItems: Record<string, FAQItem[]>;
  allFaqs: FAQItem[];
}

const breadcrumbs = [
  { name: 'Hjem', url: '/' },
  { name: 'FAQ', url: '/faq' },
];

export default function FAQClient({ categories, faqItems, allFaqs }: FAQClientProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || 'sjofolk');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter FAQs based on search
  const filteredFaqs = searchQuery.trim()
    ? allFaqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqItems[activeCategory] || [];

  return (
    <>
      {/* Hero Section */}
      <Section noPadding className="relative min-h-screen flex items-center bg-linear-to-br from-navy-900 via-navy-900 to-navy-800 pt-20">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.02] pointer-events-none" />
        
        <Container size="lg" className="relative z-10">
          <div className="max-w-3xl stagger">
            <h1 className="animate-fade-in-up text-4xl md:text-6xl font-medium text-cream-50 mb-6 leading-tight">
              Ofte stilte
              <span className="text-gold-400"> spørsmål</span>
            </h1>

            <p className="animate-fade-in-up text-xl text-cream-100/80 mb-10 leading-relaxed">
              Finn svar på vanlige spørsmål om maritim bemanning, lønn, turnus og mer.
            </p>

            {/* Search */}
            <div className="animate-fade-in-up relative max-w-2xl">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Søk etter svar (f.eks. 'lønn', 'turnus', 'sertifikater')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-5 rounded-2xl bg-cream-100/5 border border-cream-100/10 text-cream-50 placeholder-cream-100/50 focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all backdrop-blur-sm text-lg"
              />
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

      {/* Category Tabs & FAQ Content */}
      <Section className="bg-white">
        <Container size="lg">
          <div className="stagger">
            {/* Category tabs - only show when not searching */}
            {!searchQuery && (
              <div className="animate-fade-in-up mb-12 overflow-x-auto pb-4">
                <div className="flex gap-3 min-w-max">
                  {categories.map((category) => {
                    const isActive = activeCategory === category.id;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`px-5 py-3 rounded-xl font-medium transition-all border ${
                          isActive
                            ? 'bg-navy-900 text-white border-navy-900'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-gold-400/50 hover:text-navy-900'
                        }`}
                      >
                        {category.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Search results indicator */}
            {searchQuery && (
              <div className="animate-fade-in-up mb-8 flex items-center justify-between">
                <p className="text-lg text-navy-900">
                  Fant <strong>{filteredFaqs.length}</strong> resultater for &quot;<span className="text-arctic-600">{searchQuery}</span>&quot;
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-arctic-600 hover:text-arctic-700 hover:underline font-medium"
                >
                  Nullstill søk
                </button>
              </div>
            )}

            {/* FAQ Items */}
            <div className="animate-fade-in-up">
              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                {filteredFaqs.length > 0 ? (
                  <Accordion items={filteredFaqs} />
                ) : (
                  <div className="p-16 text-center">
                    <h3 className="text-xl font-medium text-navy-900 mb-2">Ingen treff</h3>
                    <p className="text-slate-600">
                      Vi fant ingen spørsmål som matcher søket ditt. Prøv et annet søkeord eller bla gjennom kategoriene.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Category description */}
            {!searchQuery && (
              <div className="animate-fade-in-up mt-8 text-center">
                <span className="inline-block px-4 py-2 bg-slate-50 rounded-full text-slate-500 text-sm font-medium">
                  Viser {filteredFaqs.length} spørsmål i kategorien &quot;{categories.find((c) => c.id === activeCategory)?.label}&quot;
                </span>
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* Still have questions? */}
      <Section className="bg-slate-50">
        <Container size="md">
          <div className="stagger text-center">
            <div className="animate-fade-in-up mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white text-gold-500 shadow-sm">
                <HelpCircle className="w-8 h-8" />
              </div>
            </div>

            <h2 className="animate-fade-in-up text-3xl font-medium text-navy-900 mb-4 font-heading">
              Fant du ikke svaret?
            </h2>

            <p className="animate-fade-in-up text-xl text-slate-600 mb-10 max-w-xl mx-auto">
              Ta kontakt med oss – vi svarer på alle spørsmål innen én arbeidsdag.
            </p>

            <div className="animate-fade-in-up flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/kontakt">
                <Button size="lg" className="bg-navy-900 hover:bg-navy-800 text-white px-8">
                  Kontakt oss
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/meld-interesse">
                <Button size="lg" variant="outline" className="bg-white border-slate-200 hover:border-gold-400 text-navy-900 hover:text-arctic-600">
                  Meld interesse
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Quick Links */}
      <Section className="bg-white border-t border-slate-100">
        <Container size="lg">
          <div className="stagger">
            <div className="animate-fade-in-up text-center mb-12">
              <h2 className="text-2xl font-medium text-navy-900">
                Populære ressurser
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Lønnsoversikt', href: '/lonn', desc: 'Se lønn for alle stillinger', icon: DollarSign },
                { title: 'Turnus-kalkulator', href: '/turnus', desc: 'Beregn arbeidsdager og fri', icon: Clock },
                { title: 'For sjøfolk', href: '/sjofolk', desc: 'Registrer deg i databasen', icon: Anchor },
                { title: 'For rederier', href: '/rederi', desc: 'Se våre tjenester', icon: Building2 },
              ].map((link, index) => (
                <div key={index} className="animate-fade-in-up">
                  <Link href={link.href} className="group block h-full">
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-gold-400/50 hover:shadow-lg hover:shadow-gold-400/5 transition-all h-full">
                      <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-arctic-50 transition-colors">
                        <link.icon className="w-6 h-6 text-slate-500 group-hover:text-gold-500 transition-colors" />
                      </div>
                      <h3 className="font-medium text-navy-900 mb-2 group-hover:text-arctic-600 transition-colors">
                        {link.title}
                      </h3>
                      <p className="text-sm text-slate-500">{link.desc}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

