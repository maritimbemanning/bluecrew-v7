import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Building2 } from "@/components/icons";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/auth/get-user";
import type { JobPosting } from "@/types/database.types";
import ApplicationForm from "./ApplicationForm";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const categoryLabels: Record<string, string> = {
  Dekk: "Dekk",
  Maskin: "Maskin",
  Catering: "Catering",
  Teknisk: "Teknisk",
  Annet: "Annet",
};

const jobTypeLabels: Record<string, string> = {
  Fast: "Fast stilling",
  Vikariat: "Vikariat",
  Sesong: "Sesong",
  Prosjekt: "Prosjekt",
};

async function getJob(slug: string): Promise<JobPosting | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("job_postings")
    .select("*")
    .eq("slug", slug)
    .eq("status", "active")
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJob(slug);

  if (!job) {
    return {
      title: "Stilling ikke funnet",
    };
  }

  return {
    title: `Søk på ${job.title}${job.company_name ? ` | ${job.company_name}` : ""}`,
    description: `Send søknad på stillingen ${job.title}${job.company_name ? ` hos ${job.company_name}` : ""}.`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function ApplicationPage({ params }: PageProps) {
  const { slug } = await params;

  // Get job
  const job = await getJob(slug);
  if (!job) {
    notFound();
  }

  // Get optional user info (Vipps verified)
  const user = await getUser();

  // Fetch candidate CV if user is logged in
  let existingCvKey: string | null = null;
  if (user?.candidateId) {
    const supabase = await createClient();
    const { data: candidate } = await supabase
      .from("candidates")
      .select("cv_key")
      .eq("id", user.candidateId)
      .single();
    existingCvKey = candidate?.cv_key || null;
  }

  // Transform user data for form
  const userInfo = user
    ? {
        name: user.name,
        email: user.email,
        phone: user.phone,
        candidateId: user.candidateId,
        vippsVerified: user.vippsVerified,
        existingCvKey: existingCvKey,
      }
    : null;

  return (
    <main>
      {/* Header */}
      <Section variant="navy" noPadding className="pt-20">
        <Container size="md">
          <div className="py-16 md:py-24 lg:py-32">
            {/* Breadcrumb */}
            <Link
              href={`/stillinger/${job.slug}`}
              className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors mb-6 text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Tilbake til stillingen
            </Link>

            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0 backdrop-blur-sm">
                <Building2 className="w-7 h-7 text-gold-400" />
              </div>

              <div>
                {job.company_name && (
                  <p className="text-gold-300 text-sm mb-1">{job.company_name}</p>
                )}
                <h1 className="text-2xl md:text-3xl font-medium text-cream-50 mb-3">
                  {job.title}
                </h1>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gold-400/10 border border-gold-400/20 rounded-full text-gold-300 text-sm font-medium">
                    {categoryLabels[job.category] || job.category}
                  </span>
                  <span className="px-3 py-1 bg-cream-50/5 border border-cream-50/10 rounded-full text-cream-100 text-sm">
                    {jobTypeLabels[job.job_type] || job.job_type}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Application form */}
      <Section>
        <Container size="md">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl font-medium text-navy-900 mb-6">
              Din søknad
            </h2>
            <ApplicationForm job={job} user={userInfo} />
          </div>
        </Container>
      </Section>
    </main>
  );
}


