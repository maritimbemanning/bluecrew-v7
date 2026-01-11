"use client";

import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronRight,
  Clock,
  Shield,
  Repeat,
  Ship,
  CheckCircle2,
  FileText
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
  { name: 'Bemanning', url: '/rederi/bemanning' },
];

const benefits = [
  {
    icon: Clock,
    title: 'Rask mobilisering',
    description: 'Tilgang på kvalifisert personell som kan tiltre på kort varsel ved sykdom eller akutte behov.'
  },
  {
    icon: Shield,
    title: 'Fullt arbeidsgiveransvar',
    description: 'Vi håndterer lønn, skatt, forsikringer og oppfølging. Dere mottar kun én faktura for utført arbeid.'
  },
  {
    icon: Repeat,
    title: 'Fleksibel varighet',
    description: 'Fra enkeltturer til langsiktige vikariater og sesongbemanning. Vi tilpasser oss driften.'
  },
  {
    icon: CheckCircle2,
    title: 'Verifisert kompetanse',
    description: 'Alle kandidater er kvalitetssikret med gyldige sertifikater og helseattest før utreise.'
  }
];

export default function BemanningClient() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <Image
            src={getImageUrl(IMAGE_PATHS.hero.karriere)}
            alt="Maritimt mannskap på dekk"
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
                <span className="italic">Fleksibel</span> kapasitet for
                <span className="block mt-2"><span className="text-gold-400 italic">maritime</span> <span className="text-gold-400">operasjoner</span></span>
              </h1>
            </FadeUp>
            
            <FadeUp delay={0.1}>
              <p className="text-xl text-cream-100 mb-10 leading-relaxed font-medium max-w-2xl">
                Sykdom, sesongtopper eller prosjektarbeid? Vi leverer kvalifisert mannskap som sikrer at fartøyet holdes i drift.
              </p>
            </FadeUp>
            
            <FadeUp delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/rederi/behov">
                  <Button size="lg" className="bg-gold-500 hover:bg-gold-400 text-navy-900 font-medium px-8">
                    Meld behov
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </Link>
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


      {/* Main Content */}
      <Section className="bg-white">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <FadeUp>
                <h2 className="text-3xl md:text-4xl font-medium text-navy-900 mb-6">
                  Innleie som lønner seg
                </h2>
              </FadeUp>
              
              <FadeUp delay={0.1}>
                <div className="prose prose-lg text-slate-600 mb-8">
                  <p>
                    Å ha riktig bemanning til enhver tid er en balansekunst. Fast ansatte dekker grunnbehovet, men sykdom, ferieavvikling og operasjonelle topper krever fleksibilitet.
                  </p>
                  <p>
                    Bluecrew fungerer som din forlengede HR-avdeling. Vi har en pool av verifiserte sjøfolk som er klare til å mønstre på. Vi kjenner kravene til ulike fartøystyper og sørger for at dere får folk med rett kompetanse og holdning.
                  </p>
                  <p>
                    Mange av våre kunder bruker oss både til akutt vikarbehov og planlagt sesongbemanning. Ved å ha et langsiktig samarbeid med Bluecrew får dere tilgang til dedikerte bemanningsrådgivere som kjenner deres drift og behov. Dette gjør at vi kan respondere enda raskere når behovet oppstår.
                  </p>
                </div>
              </FadeUp>
              
              <FadeUp delay={0.2}>
                <div className="bg-navy-50 p-6 rounded-xl border border-navy-100 mb-8">
                  <h3 className="text-lg font-medium text-navy-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-gold-500" />
                    Slik fungerer det
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-sm text-navy-800">
                      <span className="font-bold text-gold-600">1.</span>
                      Dere melder behov (stilling, varighet, krav).
                    </li>
                    <li className="flex items-start gap-3 text-sm text-navy-800">
                      <span className="font-bold text-gold-600">2.</span>
                      Vi finner og kvalitetssikrer kandidater.
                    </li>
                    <li className="flex items-start gap-3 text-sm text-navy-800">
                      <span className="font-bold text-gold-600">3.</span>
                      Kandidat presenteres og godkjennes av dere.
                    </li>
                    <li className="flex items-start gap-3 text-sm text-navy-800">
                      <span className="font-bold text-gold-600">4.</span>
                      Vi ordner kontrakt og utreise. Dere får én faktura.
                    </li>
                  </ul>
                </div>
              </FadeUp>

              <FadeUp delay={0.3}>
                <div className="space-y-6">
                  <h3 className="text-2xl font-medium text-navy-900">Typiske situasjoner vi løser</h3>
                  <div className="space-y-4 text-slate-600">
                    <div>
                      <h4 className="font-medium text-navy-900 mb-2">Akutte vikarbehov</h4>
                      <p>En <Link href="/karriere/matros" className="text-gold-600 hover:text-gold-700 underline">matros</Link> melder seg syk 48 timer før turstart. Vi har erstatning klar innen 24 timer. For rederier som opererer i <Link href="/rederi/havbruk" className="text-gold-600 hover:text-gold-700 underline">havbrukssektoren</Link>, kan vi også levere spesialisert personell med erfaring fra servicebåt og brønnbåt.</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-navy-900 mb-2">Sesongtopper</h4>
                      <p>Dere trenger ekstra kapasitet i høysesongen? Vi kan levere <Link href="/karriere/kokk" className="text-gold-600 hover:text-gold-700 underline">kokk</Link>, <Link href="/karriere/maskinist" className="text-gold-600 hover:text-gold-700 underline">maskinist</Link> eller <Link href="/karriere/styrmann" className="text-gold-600 hover:text-gold-700 underline">styrmann</Link> for definerte perioder. Mange av våre kandidater er erfarne rotasjonsarbeidere som ønsker fleksible oppdrag.</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-navy-900 mb-2">Prosjektbemanning</h4>
                      <p>Ved oppstart av nye ruter, prøvedrift eller spesielle operasjoner kan dere trenge ekstra hender om bord. Vi kan levere komplette crew-teams eller supplere deres eksisterende mannskap. Se våre <Link href="/stillinger" className="text-gold-600 hover:text-gold-700 underline">ledige stillinger</Link> for eksempler på kompetanse vi har tilgjengelig.</p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            </div>

            <div>
              <StaggerContainer>
                {benefits.map((benefit, index) => (
                  <StaggerItem key={index}>
                    <div className="flex gap-5 p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow mb-6">
                      <div className="shrink-0">
                        <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center text-gold-600">
                          <benefit.icon className="w-6 h-6" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-navy-900 mb-2">{benefit.title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{benefit.description}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>

          {/* Additional detailed content section */}
          <div className="mt-20 pt-20 border-t border-slate-200">
            <div className="max-w-4xl mx-auto">
              <FadeUp>
                <h2 className="text-3xl font-medium text-navy-900 mb-8 text-center">
                  Hva koster det?
                </h2>
              </FadeUp>
              
              <FadeUp delay={0.1}>
                <div className="prose prose-lg text-slate-600 mb-12">
                  <p>
                    Prisen for innleid personell avhenger av flere faktorer: stillingskategori, sertifiseringskrav, oppdragets varighet og mobiliseringstid. Som utgangspunkt kan dere forvente at timepris for innleid mannskap ligger 20-40% over ordinær lønn. Dette dekker vårt arbeidsgiveransvar, administrasjon, forsikringer og vår margin.
                  </p>
                  <p>
                    For å gi dere et perspektiv: En <Link href="/lonn/matros" className="text-gold-600 hover:text-gold-700 underline">matros</Link> tjener typisk mellom 450.000-550.000 kr årlig, mens en <Link href="/lonn/kaptein" className="text-gold-600 hover:text-gold-700 underline">kaptein</Link> kan tjene 700.000-900.000 kr. Når dere leier inn via Bluecrew slipper dere rekrutteringskostnader, opplæring og risikoen ved feilansettelser. Vi tar også ansvar for erstatning hvis kandidaten ikke fungerer.
                  </p>
                  <p>
                    Mange av våre kunder opplever at innleie faktisk er mer kostnadseffektivt enn å ha overkapasitet i fast stab. Spesielt for rederier med sesongvariasjoner eller uforutsigbar drift gir dette en god økonomisk buffer.
                  </p>
                </div>
              </FadeUp>

              <FadeUp delay={0.2}>
                <h2 className="text-3xl font-medium text-navy-900 mb-8 text-center">
                  Kvalitetssikring og oppfølging
                </h2>
              </FadeUp>
              
              <FadeUp delay={0.3}>
                <div className="prose prose-lg text-slate-600 mb-12">
                  <p>
                    Alle kandidater i vårt system er verifisert med BankID og gjennomgår en grundig screening før de sendes ut på oppdrag. Vi sjekker gyldige sertifikater, helseattest, referanser og tidligere arbeidserfaring. For spesialiserte roller som <Link href="/karriere/eto" className="text-gold-600 hover:text-gold-700 underline">ETO (Electrical Technical Officer)</Link> eller <Link href="/karriere/kaptein" className="text-gold-600 hover:text-gold-700 underline">kaptein</Link> gjennomfører vi også personlige intervjuer.
                  </p>
                  <p>
                    Under oppdraget har dere direkte kontakt med både kandidaten og vår bemanningsavdeling. Hvis noe ikke fungerer som forventet, bytter vi ut personellet innen 48 timer – ingen diskusjon. Vår <Link href="/trygghet" className="text-gold-600 hover:text-gold-700 underline">48-timers erstatningsgaranti</Link> er en av grunnene til at våre kunder stoler på oss.
                  </p>
                  <p>
                    Etter endt oppdrag følger vi opp både kunde og kandidat. Dette gir oss verdifull innsikt og sikrer kontinuerlig forbedring. Mange av våre innleide blir til slutt fast ansatt hos kundene våre – og det ser vi på som det ultimate kvalitetsstempelet.
                  </p>
                </div>
              </FadeUp>

              <FadeUp delay={0.4}>
                <div className="bg-gold-50 border border-gold-200 rounded-2xl p-8 text-center">
                  <h3 className="text-2xl font-medium text-navy-900 mb-4">
                    Klar til å komme i gang?
                  </h3>
                  <p className="text-slate-700 mb-6 max-w-2xl mx-auto">
                    Ta kontakt for en uforpliktende prat om hvordan vi kan støtte deres bemanningsbehov. Vi tilbyr også <Link href="/rederi/rekruttering" className="text-gold-700 hover:text-gold-800 underline font-medium">fast rekruttering</Link> hvis dere heller ønsker å ansette direkte.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/rederi/behov">
                      <Button size="lg" className="bg-gold-500 hover:bg-gold-400 text-navy-900">
                        Meld behov
                      </Button>
                    </Link>
                    <Link href="/kontakt">
                      <Button size="lg" variant="outline" className="border-gold-600 text-gold-700 hover:bg-gold-50">
                        Kontakt oss
                      </Button>
                    </Link>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="bg-navy-900 text-cream-100">
        <Container size="md">
          <FadeUp>
            <div className="text-center">
              <Ship className="w-16 h-16 text-gold-400 mx-auto mb-6 opacity-80" />
              <h2 className="text-3xl md:text-4xl font-medium text-cream-50 mb-6">
                Trenger dere mannskap?
              </h2>
              <p className="text-lg text-cream-100/80 mb-8 max-w-2xl mx-auto">
                Vi leverer kvalifisert personell, enten det er for en uke eller et år.
              </p>
              <div className="flex justify-center gap-4">
                 <Link href="/rederi/behov">
                  <Button size="lg" className="bg-gold-500 text-navy-900 hover:bg-gold-400 border-none">
                    Registrer behov nå
                  </Button>
                </Link>
              </div>
            </div>
          </FadeUp>
        </Container>
      </Section>
    </main>
  );
}

