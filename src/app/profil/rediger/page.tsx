import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, User } from '@/components/icons';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import { getUser } from '@/lib/auth/get-user';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const metadata: Metadata = {
  title: 'Rediger profil',
  description: 'Oppdater din profilinformasjon hos Bluecrew.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function RedigerProfilPage() {
  const user = await getUser();

  if (!user) {
    redirect('/logg-inn?returnTo=/profil/rediger');
  }

  // Fetch current profile
  // NOTE: Using supabaseAdmin because RLS doesn't allow anon/authenticated to read candidates
  type CandidateEditProfile = {
    id: string;
    name: string | null;
    email: string;
    phone: string | null;
    primary_role: string | null;
    cv_key: string | null;
  };

  const { data: rawData } = await supabaseAdmin
    .from('candidates')
    .select('id, name, email, phone, primary_role, cv_key')
    .eq('id', user.candidateId)
    .single();

  const data = rawData as CandidateEditProfile | null;

  if (!data) {
    // Redirect to logout which will clear session properly via Route Handler
    redirect('/logg-ut?error=Kunne ikke finne din profil. Vennligst logg inn på nytt.');
  }

  // Check if profile is complete - must have primary_role AND cv_key
  const hasRole = typeof data.primary_role === 'string' && data.primary_role.trim() !== '';
  const hasCv = typeof data.cv_key === 'string' && data.cv_key.trim() !== '';
  const isProfileComplete = hasRole && hasCv;

  if (!isProfileComplete) {
    // Redirect to registration to complete profile
    redirect('/registrer');
  }

  return (
    <Section className="min-h-screen bg-linear-to-b from-navy-900 via-navy-900 to-navy-900 pt-32 pb-16">
      <Container className="max-w-2xl">
        {/* Back link */}
        <Link 
          href="/profil" 
          className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Tilbake til profil
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-500/20 border border-gold-500/30">
              <User className="w-7 h-7 text-gold-400" />
            </div>
            <div>
              <h1 className="text-2xl font-medium text-cream-50">
                Rediger profil
              </h1>
              <p className="text-cream-100/70">
                Oppdater din kontaktinformasjon
              </p>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-gold-400" />
            </div>
            <h2 className="text-xl font-medium text-cream-50 mb-2">
              Kommer snart
            </h2>
            <p className="text-cream-100/70 mb-6 max-w-md mx-auto">
              Profilredigering er under utvikling. Kontakt oss på{' '}
              <a href="mailto:post@bluecrew.no" className="text-gold-400 hover:text-gold-300">
                post@bluecrew.no
              </a>
              {' '}hvis du trenger å oppdatere informasjonen din.
            </p>
            
            {/* Current info display */}
            <div className="bg-white/5 rounded-xl p-6 text-left max-w-sm mx-auto mb-6">
              <h3 className="text-sm font-medium text-cream-100/60 uppercase tracking-wider mb-4">
                Nåværende informasjon
              </h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-xs text-cream-100/50">Navn</dt>
                  <dd className="text-cream-50">{data.name}</dd>
                </div>
                <div>
                  <dt className="text-xs text-cream-100/50">E-post</dt>
                  <dd className="text-cream-50">{data.email}</dd>
                </div>
                <div>
                  <dt className="text-xs text-cream-100/50">Telefon</dt>
                  <dd className="text-cream-50">{data.phone || 'Ikke oppgitt'}</dd>
                </div>
              </dl>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/profil">
                <Button variant="outline" className="border-cream-100/20 text-cream-50 hover:bg-cream-100/5">
                  Tilbake til profil
                </Button>
              </Link>
              <Link href="/kontakt">
                <Button className="bg-gold-500 hover:bg-gold-400 text-navy-900">
                  Kontakt oss
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

