import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Anchor, Shield, CheckCircle } from '@/components/icons';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import LoginButton from '@/components/auth/LoginButton';
import { getUser } from '@/lib/auth/get-user';

export const metadata: Metadata = {
  title: 'Logg inn',
  description: 'Logg inn med Vipps for å se din profil, søke på stillinger og spore dine søknader hos Bluecrew.',
  robots: {
    index: false,
    follow: true,
  },
};

interface PageProps {
  searchParams: Promise<{ returnTo?: string; error?: string }>;
}

export default async function LoginPage({ searchParams }: PageProps) {
  const user = await getUser();
  const params = await searchParams;

  const returnTo = params.returnTo || '/profil';
  const errorMessage = params.error;

  // Only redirect if logged in AND no error (prevents infinite loop when profile doesn't exist)
  if (user && !errorMessage) {
    redirect(returnTo);
  }

  return (
    <Section className="min-h-screen bg-linear-to-b from-navy-900 via-navy-900 to-navy-900 pt-32">
      <Container className="max-w-md">
        <div className="text-center mb-8">
          {/* Logo */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gold-500/20 mb-6">
            <Anchor className="w-8 h-8 text-gold-400" />
          </div>

          <h1 className="text-3xl font-medium text-cream-50 mb-3">
            Logg inn på Bluecrew
          </h1>
          <p className="text-cream-100/80">
            Bruk Vipps for sikker og enkel pålogging
          </p>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-sm text-center">
            {errorMessage}
          </div>
        )}

        {/* Login Card */}
        <div className="bg-gold-400/5 backdrop-blur-xl rounded-2xl p-8 border border-gold-400/20">
          <div className="space-y-6">
            {/* Vipps Login Button */}
            <LoginButton returnTo={returnTo} className="w-full py-3 text-base" />

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gold-400/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-navy-900 text-cream-200/60">
                  Hvorfor Vipps?
                </span>
              </div>
            </div>

            {/* Benefits */}
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-cream-100/80">
                <Shield className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <span>BankID-verifisert identitet for sikker innlogging</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-cream-100/80">
                <CheckCircle className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <span>Ingen passord å huske - bare bekreft i Vipps-appen</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-cream-100/80">
                <CheckCircle className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <span>Personinformasjonen din fylles ut automatisk</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer links */}
        <div className="mt-8 text-center space-y-4">
          <p className="text-sm text-cream-200/70">
            Har du ikke Vipps?{' '}
            <a
              href="https://vipps.no/privat/vipps/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-400 hover:text-gold-300 underline"
            >
              Last ned her
            </a>
          </p>

          <p className="text-xs text-cream-200/60">
            Ved å logge inn godtar du våre{' '}
            <Link href="/vilkar" className="underline hover:text-cream-50">
              vilkår
            </Link>{' '}
            og{' '}
            <Link href="/personvern" className="underline hover:text-cream-50">
              personvernerklæring
            </Link>
          </p>
        </div>
      </Container>
    </Section>
  );
}

