"use client";

import {
  Shield,
  Award,
  Heart,
  MapPin,
  CheckCircle2,
  Building2
} from '@/components/icons';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import TeamMemberCard from '@/components/ui/TeamMemberCard';
import { AnimatedHero } from '@/components/animated';
import { IMAGE_PATHS } from '@/lib/images';
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/motion';

// Team members
const team = [
  {
    name: 'Isak Didriksson',
    role: 'Daglig leder',
    description: 'Med bakgrunn fra maritim teknologi, kombinerer Isak hands-on erfaring med moderne rekrutteringsmetoder. Har selv jobbet i oppdrettsnæringen.',
    credentials: ['DNV Sertifisert Rekrutterer', 'Erfaring fra oppdrettsnæringen', 'Full-stack teknologi'],
    imagePath: IMAGE_PATHS.team.isak,
    initials: 'ID',
  },
  {
    name: 'Tor Faafeng',
    role: 'Recruitment Manager',
    description: 'Tor har dedikert karrieren sin til å finne den perfekte matchen mellom sjøfolk og arbeidsgivere i maritim næring. Har selv jobbet offshore og i havbruk.',
    credentials: ['15 års erfaring fra Offshore', 'Spesialist på maritim rekruttering', 'Dyp bransjekunnskap'],
    imagePath: IMAGE_PATHS.team.tor,
    initials: 'TF',
  },
];

// Values
const values = [
  {
    icon: Shield,
    title: 'Sikkerhet',
    description: 'Sikkerhet til sjøs er ikke-forhandlingsbart. Vi verifiserer alle kandidater grundig med BankID og gjennomgår sertifikater og dokumentasjon.',
  },
  {
    icon: Award,
    title: 'Kvalitet',
    description: 'Riktig person til riktig stilling. Vi matcher ikke bare kompetanse, men også personlighet og forventninger for langvarige, vellykkede plasseringer.',
  },
  {
    icon: Heart,
    title: 'Menneskelighet',
    description: 'Trivsel til sjøs betyr noe. Vi følger opp både kandidater og oppdragsgivere gjennom hele prosessen fordi relasjoner bygges over tid.',
  },
];

// Certifications
const certifications = [
  { name: 'Godkjent Bemanningsforetak', status: 'active', issuer: 'Arbeidstilsynet' },
  { name: 'DNV Sertifisert Rekrutterer', status: 'active', issuer: 'DNV' },
];

// Timeline
const timeline = [
  { year: '2025', event: 'Bluecrew AS grunnlagt i Harstad' },
  { year: '2025', event: 'Godkjent som bemanningsforetak' },
  { year: '2025', event: 'Landsdekkende med kontor i Stavanger' },
];

export default function OmOssClient() {
  return (
    <main>
      {/* Hero Section */}
      <AnimatedHero
        title={<>Bygget av <em className="not-italic text-gold-400">sjøfolk</em>, for sjøfolk</>}
        subtitle="Vi forstår maritime operasjoner fordi vi har vært der selv. Fra dekk til skipsledelse – vi vet hva som kreves."
        backgroundImage={IMAGE_PATHS.hero.sjofolk}
      />

      {/* Mission & Vision */}
      <Section className="bg-white">
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FadeUp>
              <div className="bg-slate-50 rounded-3xl p-10 border border-slate-200">
                <h2 className="text-2xl font-medium text-navy-900 mb-4">Vår visjon</h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Å være et <span className="italic text-navy-900 font-medium">tillitsfullt</span> og <span className="italic text-gold-500 font-medium">teknologidrevet</span> bemanningsselskap innen maritim sektor.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="bg-navy-900 rounded-3xl p-10 border border-gold-400/20">
                <h2 className="text-2xl font-medium text-gold-400 mb-4">Vår misjon</h2>
                <p className="text-lg text-cream-100 leading-relaxed">
                  Levere <span className="italic text-gold-400">kvalifiserte</span> og <span className="italic text-gold-400">verifiserte</span> kandidater – raskt, sikkert og digitalt.
                </p>
              </div>
            </FadeUp>
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section className="bg-slate-50">
        <Container size="lg">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-medium text-navy-900 mb-4">
                Våre <span className="text-gold-500 italic">verdier</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Tre pilarer som styrer alt vi gjør – fra første kontakt til <span className="italic text-navy-900 font-medium">langvarig samarbeid</span>.
              </p>
            </div>
          </FadeUp>

          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <StaggerItem key={index}>
                  <div
                    className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 text-center hover:shadow-lg hover:border-gold-400/30 transition-all duration-300 h-full"
                  >
                    <div className="w-16 h-16 bg-linear-to-br from-gold-400 to-navy-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-gold-400/20">
                      <value.icon className="w-8 h-8 text-cream-50" />
                    </div>
                    <h3 className="text-xl font-medium text-navy-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </Container>
      </Section>

      {/* Team Section - Navy Background */}
      <Section className="bg-navy-900">
        <Container size="lg">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-medium text-cream-50 mb-4">
                <span className="text-gold-400 italic">Teamet</span> bak Bluecrew
              </h2>
              <p className="text-lg text-cream-100 max-w-2xl mx-auto">
                Våre rådgivere har selv jobbet <span className="italic text-gold-400">offshore og i havbruk</span>. Vi kombinerer <span className="italic text-gold-400">teknologiekspertise</span> med <span className="italic text-gold-400">dyp bransjekunnskap</span>.
              </p>
            </div>
          </FadeUp>

          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <StaggerItem key={index}>
                  <TeamMemberCard
                    name={member.name}
                    role={member.role}
                    description={member.description}
                    credentials={member.credentials}
                    imagePath={member.imagePath}
                    initials={member.initials}
                  />
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </Container>
      </Section>

      {/* Certifications */}
      <Section className="bg-slate-50">
        <Container size="lg">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-medium text-navy-900 mb-4">
                <span className="text-gold-500 italic">Sertifiseringer</span> og godkjenninger
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Vi tar <span className="italic text-navy-900 font-medium">kvalitet</span> og <span className="italic text-navy-900 font-medium">sikkerhet</span> på alvor.
              </p>
            </div>
          </FadeUp>

          <StaggerContainer>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {certifications.map((cert, index) => (
                <StaggerItem key={index}>
                  <div
                    className="rounded-2xl p-6 border-2 bg-white border-gold-400/20 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle2 className="w-5 h-5 text-gold-500" />
                      <span className="text-xs font-medium uppercase tracking-wider text-gold-600">
                        Godkjent
                      </span>
                    </div>
                    <h3 className="font-medium text-navy-900 mb-1">{cert.name}</h3>
                    <p className="text-sm text-slate-500">{cert.issuer}</p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </Container>
      </Section>

      {/* Timeline */}
      <Section className="bg-navy-900 text-cream-100">
        <Container size="md">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-medium text-cream-50 mb-4">
                Vår <span className="text-gold-400 italic">historie</span>
              </h2>
              <p className="text-lg text-cream-100 max-w-2xl mx-auto">
                Fra idé til <span className="italic text-gold-400">landsdekkende</span> bemanningspartner.
              </p>
            </div>
          </FadeUp>

          <StaggerContainer>
            <div className="space-y-6">
              {timeline.map((item, index) => (
                <StaggerItem key={index}>
                  <div className="flex gap-6 items-center">
                    <div className="shrink-0 w-16 h-16 rounded-full bg-gold-400/20 border-2 border-gold-400 flex items-center justify-center">
                      <span className="text-lg font-medium text-gold-400">{item.year}</span>
                    </div>
                    <div className="flex-1 bg-navy-800/50 rounded-xl p-5 border border-white/10">
                      <p className="text-cream-100/90">{item.event}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </Container>
      </Section>

      {/* Company Info */}
      <Section className="bg-white">
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FadeUp>
              <div className="bg-slate-50 rounded-3xl p-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-navy-900 shadow-sm">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-medium text-navy-900">Firmainformasjon</h3>
                </div>
                <dl className="space-y-6">
                  <div className="flex justify-between border-b border-slate-200 pb-4">
                    <dt className="text-slate-500">Firmanavn</dt>
                    <dd className="font-medium text-navy-900">Bluecrew AS</dd>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-4">
                    <dt className="text-slate-500">Organisasjonsnummer</dt>
                    <dd className="font-medium text-navy-900">936 463 843</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Etablert</dt>
                    <dd className="font-medium text-navy-900">2025</dd>
                  </div>
                </dl>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="bg-slate-50 rounded-3xl p-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-navy-900 shadow-sm">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-medium text-navy-900">Kontakt</h3>
                </div>
                <dl className="space-y-6">
                  <div className="flex justify-between border-b border-slate-200 pb-4">
                    <dt className="text-slate-500">Lokasjoner</dt>
                    <dd className="font-medium text-navy-900 text-right">Harstad, Norge<br />Stavanger, Norge</dd>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-4">
                    <dt className="text-slate-500">E-post</dt>
                    <dd className="font-medium text-navy-900">post@bluecrew.no</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Telefon</dt>
                    <dd className="font-medium text-navy-900">+47 77 02 90 00</dd>
                  </div>
                </dl>
              </div>
            </FadeUp>
          </div>
        </Container>
      </Section>
    </main>
  );
}

