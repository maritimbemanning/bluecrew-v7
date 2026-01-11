import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Phone, FileText, Settings, Shield, Download } from '@/components/icons';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import { getUser } from '@/lib/auth/get-user';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const metadata: Metadata = {
  title: 'Min profil',
  description: 'Se og administrer din profil hos Bluecrew.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ProfilPage() {
  const user = await getUser();

  // Middleware should handle this, but double-check
  if (!user) {
    redirect('/logg-inn?returnTo=/profil');
  }

  // Fetch full candidate profile from database
  // NOTE: Using supabaseAdmin because RLS doesn't allow anon/authenticated to read candidates
  type CandidateProfile = {
    id: string;
    name: string | null;
    first_name: string | null;
    last_name: string | null;
    email: string;
    phone: string | null;
    status: string | null;
    created_at: string;
    primary_role: string | null;
    cv_key: string | null;
  };

  const { data } = await supabaseAdmin
    .from('candidates')
    .select('id, name, first_name, last_name, email, phone, status, created_at, primary_role, cv_key')
    .eq('id', user.candidateId)
    .limit(1);

  const rawCandidate = (data as CandidateProfile[] | null)?.[0];

  if (!rawCandidate) {
    // Candidate not found - redirect to logout which will clear session
    redirect('/logg-ut?error=Kunne ikke finne din profil. Vennligst logg inn på nytt.');
  }

  // Normalize candidate data
  const candidate = {
    ...rawCandidate,
    name: rawCandidate.first_name && rawCandidate.last_name 
      ? `${rawCandidate.first_name} ${rawCandidate.last_name}`
      : rawCandidate.name || 'Ukjent',
    role: rawCandidate.primary_role,
  };

  // Check if profile is complete - must have role AND cv_key
  const hasRole = typeof candidate.role === 'string' && candidate.role.trim() !== '';
  const hasCv = typeof candidate.cv_key === 'string' && candidate.cv_key.trim() !== '';
  const isProfileComplete = hasRole && hasCv;

  if (!isProfileComplete) {
    // Redirect to registration to complete profile
    redirect('/registrer');
  }

  // Format date helper
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Ikke oppgitt';
    return new Date(dateString).toLocaleDateString('nb-NO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <Section className="min-h-screen bg-linear-to-b from-navy-900 via-navy-900 to-navy-900 pt-20">
      <Container className="max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            {/* Avatar */}
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-500 text-navy-900 italic text-2xl font-bold">
              {(candidate.name || 'U').split(' ').map(n => n[0]).slice(0, 2).join('')}
            </div>
            <div>
              <h1 className="text-3xl font-medium text-cream-50">
                {candidate.name || 'Ukjent'}
              </h1>
              <p className="text-cream-100/80">
                Medlem siden {formatDate(candidate.created_at)}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Info Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-cream-50 flex items-center gap-2">
                    <User className="w-5 h-5 text-gold-400" />
                    Personlig informasjon
                  </h2>
                  <Link href="/profil/rediger">
                    <Button variant="ghost" size="sm" className="text-gold-400 hover:text-gold-300">
                      <Settings className="w-4 h-4 mr-1" />
                      Rediger
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider">E-post</p>
                    <p className="text-cream-50">{candidate.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider">Telefon</p>
                    <p className="text-cream-50">{candidate.phone || 'Ikke oppgitt'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h2 className="text-lg font-medium text-cream-50 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-gold-400" />
                  Kontostatus
                </h2>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    candidate.status === 'godkjent' ? 'bg-green-500' :
                    candidate.status === 'pending' ? 'bg-yellow-500' :
                    candidate.status === 'avslått' ? 'bg-red-500' :
                    'bg-gray-500'
                  }`} />
                  <span className="text-cream-50">
                    {candidate.status === 'godkjent' ? 'Godkjent' :
                     candidate.status === 'pending' ? 'Venter på verifisering' :
                     candidate.status === 'avslått' ? 'Avslått' :
                     candidate.status || 'Ukjent'}
                  </span>
                </div>

                {candidate.status === 'pending' && (
                  <p className="mt-4 text-sm text-cream-100/80">
                    Din konto venter på verifisering. Vi tar kontakt når profilen din er gjennomgått.
                  </p>
                )}
                
                {candidate.status === 'godkjent' && (
                  <p className="mt-4 text-sm text-cream-100/80">
                    Du er verifisert med Vipps og kan søke på stillinger.
                  </p>
                )}

                {candidate.status === 'avslått' && (
                  <p className="mt-4 text-sm text-cream-100/80">
                    Din søknad ble dessverre ikke godkjent denne gangen. Ta kontakt med oss for mer informasjon.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-3">
              <h2 className="text-lg font-medium text-cream-50 mb-4">Snarveier</h2>
              <Link href="/mine-soknader" className="block">
                <Button variant="outline" className="w-full justify-start border-gold-400/20 text-cream-50 hover:bg-gold-400/10">
                  <FileText className="w-4 h-4 mr-2" />
                  Mine søknader
                </Button>
              </Link>
              <Link href="/stillinger" className="block">
                <Button className="w-full bg-gold-500 hover:bg-gold-400 text-navy-900">
                  Se ledige stillinger
                </Button>
              </Link>
            </div>

            {/* Help Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="font-medium text-cream-50 mb-2">Trenger du hjelp?</h3>
              <p className="text-sm text-cream-100/80 mb-4">
                Kontakt oss hvis du har spørsmål om din profil eller søknadsprosessen.
              </p>
              <Link href="/kontakt">
                <Button variant="ghost" size="sm" className="text-gold-400 hover:text-gold-300">
                  Kontakt oss
                </Button>
              </Link>
            </div>

            {/* GDPR Export Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <Shield className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-cream-50 mb-1">Dine personopplysninger</h3>
                  <p className="text-xs text-cream-100/70">
                    Last ned alle dine data i henhold til GDPR
                  </p>
                </div>
              </div>
              <a href="/api/profil/eksporter" download>
                <Button variant="outline" size="sm" className="w-full border-gold-400/20 text-cream-50 hover:bg-gold-400/10">
                  <Download className="w-4 h-4 mr-2" />
                  Eksporter mine data
                </Button>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

