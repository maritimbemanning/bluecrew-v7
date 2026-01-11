import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import { getUser } from '@/lib/auth/get-user';
import { supabaseAdmin } from '@/lib/supabase/admin';
import RegistrationForm from './RegistrationForm';

export const metadata: Metadata = {
  title: 'Fullfør registrering',
  description: 'Fullfør din profil hos Bluecrew for å søke på stillinger.',
  robots: {
    index: false,
    follow: false,
  },
};

interface PageProps {
  searchParams: Promise<{ returnTo?: string }>;
}

// Helper to extract campaign application ID from returnTo URL
function extractApplicationId(returnTo: string): string | null {
  try {
    // Check if returnTo contains /kampanje/verify?id=xxx
    const match = returnTo.match(/[?&]id=([a-f0-9-]+)/i);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

// Prefill data from campaign application
interface CampaignPrefill {
  position?: string;
  notes?: {
    erfaring?: string;
    sertifikater?: string;
  };
}

export default async function RegistrerPage({ searchParams }: PageProps) {
  const user = await getUser();
  const params = await searchParams;

  // Must be logged in via Vipps
  if (!user) {
    redirect('/logg-inn?returnTo=/registrer');
  }

  // Get returnTo from query params (preserved from campaign flow)
  const returnTo = params.returnTo || '/stillinger';
  
  // Try to get prefill data from campaign application
  let campaignPrefill: CampaignPrefill | null = null;
  const applicationId = extractApplicationId(returnTo);
  
  if (applicationId) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: application } = await (supabaseAdmin as any)
      .from('campaign_applications')
      .select('position, notes')
      .eq('id', applicationId)
      .single();
    
    if (application) {
      campaignPrefill = {
        position: application.position,
        notes: typeof application.notes === 'string' 
          ? JSON.parse(application.notes) 
          : application.notes,
      };
    }
  }

  return (
    <Section className="min-h-screen bg-linear-to-b from-navy-900 via-navy-900 to-navy-900 pt-20">
      <Container className="max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-medium text-cream-50 mb-2">
            Fullfør din profil
          </h1>
          <p className="text-cream-100/80">
            {applicationId 
              ? 'Fullfør profilen din for å sende inn søknaden.' 
              : 'Fyll ut informasjonen under for å kunne søke på stillinger hos Bluecrew.'}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <RegistrationForm
            candidateId={user.candidateId}
            prefillName={user.name}
            prefillEmail={user.email}
            prefillPhone={user.phone}
            returnTo={returnTo}
            campaignPrefill={campaignPrefill}
          />
        </div>
      </Container>
    </Section>
  );
}

