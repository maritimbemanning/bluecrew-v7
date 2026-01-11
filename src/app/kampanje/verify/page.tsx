import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getUser } from '@/lib/auth/get-user';
import { supabaseAdmin } from '@/lib/supabase/admin';
import VerifyClient from './VerifyClient';

export const metadata: Metadata = {
  title: 'Fullfør søknad',
  description: 'Fullfør søknaden din hos Bluecrew.',
  robots: {
    index: false,
    follow: false,
  },
};

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function VerifyPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const applicationId = typeof params.id === 'string' ? params.id : null;
  
  // Check if user is logged in (from Vipps)
  const user = await getUser();
  
  // If not logged in, redirect to Vipps login
  if (!user?.candidateId) {
    const returnUrl = applicationId 
      ? `/kampanje/verify?id=${applicationId}`
      : '/kampanje/verify';
    redirect(`/api/vipps/start?returnTo=${encodeURIComponent(returnUrl)}`);
  }
  
  const candidateId = user.candidateId;
  const candidateName = user.name;
  
  // Check if candidate already has a CV
  const { data } = await supabaseAdmin
    .from('candidates')
    .select('cv_key')
    .eq('id', candidateId)
    .single();
  
  const existingCvKey = data?.cv_key || null;
  
  return (
    <VerifyClient 
      applicationId={applicationId}
      candidateId={candidateId}
      candidateName={candidateName}
      existingCvKey={existingCvKey}
    />
  );
}

