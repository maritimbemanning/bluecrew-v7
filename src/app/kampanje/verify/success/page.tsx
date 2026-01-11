import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, User, Briefcase } from '@/components/icons';
import Container from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Søknad mottatt',
  description: 'Din søknad er registrert. Vi gjennomgår den og tar kontakt ved aktuelle oppdrag.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-navy-900 flex items-center justify-center py-12 px-4">
      <Container size="md">
        <div className="bg-navy-900/80 backdrop-blur-sm border border-gold-400/30 rounded-2xl p-8 md:p-10 text-center">
          {/* Success icon with animation */}
          <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-gold-400 to-gold-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-gold-400/20">
            <CheckCircle2 className="w-10 h-10 md:w-12 md:h-12 text-navy-900" />
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-cream-50 mb-3">
            Søknad <span className="italic text-gold-400">mottatt!</span>
          </h1>

          {/* Message */}
          <p className="text-lg text-cream-100/90 mb-2">
            Du er nå registrert i Bluecrew.
          </p>
          <p className="text-cream-100/60 mb-8">
            En bekreftelse er sendt til din e-post.
          </p>

          {/* What happens next */}
          <div className="bg-navy-800/60 border border-cream-100/10 rounded-xl p-6 text-left mb-8">
            <h3 className="text-cream-50 font-medium mb-4">Hva skjer nå?</h3>
            <ul className="space-y-3 text-cream-100/80 text-sm">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-gold-400/20 flex items-center justify-center shrink-0 mt-0.5 text-gold-400 text-xs font-medium">1</span>
                <span>Våre rekrutterere gjennomgår søknaden din</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-gold-400/20 flex items-center justify-center shrink-0 mt-0.5 text-gold-400 text-xs font-medium">2</span>
                <span>Vi matcher deg med relevante oppdrag</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-gold-400/20 flex items-center justify-center shrink-0 mt-0.5 text-gold-400 text-xs font-medium">3</span>
                <span>Du blir kontaktet når vi har noe som passer</span>
              </li>
            </ul>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/profil"
              className="inline-flex items-center justify-center gap-2 bg-gold-500 
                         text-navy-900 font-medium px-8 py-4 rounded-lg
                         hover:bg-gold-400 transition-colors shadow-sm"
            >
              <User className="w-5 h-5" />
              Gå til din profil
            </Link>
            <Link
              href="/stillinger"
              className="inline-flex items-center justify-center gap-2 bg-transparent border border-cream-100/20
                         text-cream-50 font-medium px-8 py-4 rounded-lg
                         hover:bg-cream-100/5 transition-colors"
            >
              <Briefcase className="w-5 h-5" />
              Se ledige stillinger
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}

