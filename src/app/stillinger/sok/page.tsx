import { redirect } from 'next/navigation';

interface PageProps {
  searchParams: Promise<{ stilling?: string; segment?: string }>;
}

export default async function ApplicationPage({ searchParams }: PageProps) {
  await searchParams;
  // Open application = Bluecrew profile registration
  // Avoid looping back to /stillinger/sok after registration
  redirect(`/registrer?returnTo=${encodeURIComponent("/stillinger")}`);
}
