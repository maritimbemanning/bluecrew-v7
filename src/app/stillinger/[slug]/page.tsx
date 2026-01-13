import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Banknote,
  Calendar,
  Briefcase,
  CheckCircle,
  ArrowLeft,
  Share2,
  Building2,
  Clock,
} from "@/components/icons";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { createClient } from "@/lib/supabase/server";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { JobPosting } from "@/types/database.types";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { JobList } from "@/components/jobs";

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

async function getSimilarJobs(job: JobPosting): Promise<JobPosting[]> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("job_postings")
    .select("*")
    .eq("status", "active")
    .neq("id", job.id)
    .or(`category.eq.${job.category},fylke.eq.${job.fylke}`)
    .limit(3);

  return data || [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJob(slug);

  if (!job) {
    return {
      title: "Stilling ikke funnet",
    };
  }

  const salaryText =
    job.salary_min && job.salary_max
      ? `${formatCurrency(job.salary_min)} - ${formatCurrency(job.salary_max)}`
      : job.salary_text || "";

  const categoryLabel = job.category ? (categoryLabels[job.category] || job.category) : "Maritim";

  return {
    title: job.meta_title || `${job.title} | ${job.company_name || "Bluecrew"}`,
    description:
      job.meta_description ||
      `${job.title} i ${job.location}. ${categoryLabel} stilling. ${salaryText ? `Lønn: ${salaryText}.` : ""} Søk nå!`,
    openGraph: {
      title: `${job.title} – ${job.company_name || "Bluecrew"}`,
      description: `Ledig stilling som ${categoryLabel} i ${job.location}. Søk via Bluecrew.`,
      url: `https://bluecrew.no/stillinger/${job.slug}`,
      siteName: "Bluecrew AS",
      locale: "nb_NO",
      type: "article",
    },
    alternates: {
      canonical: `https://bluecrew.no/stillinger/${job.slug}`,
    },
  };
}

export const revalidate = 3600;

export default async function JobDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const job = await getJob(slug);

  if (!job) {
    notFound();
  }

  const similarJobs = await getSimilarJobs(job);

  const categoryLabel = job.category ? (categoryLabels[job.category] || job.category) : "Maritim";

  const salaryText =
    job.salary_min && job.salary_max
      ? `${formatCurrency(job.salary_min)} - ${formatCurrency(job.salary_max)}`
      : job.salary_min
        ? `Fra ${formatCurrency(job.salary_min)}`
        : job.salary_max
          ? `Opp til ${formatCurrency(job.salary_max)}`
          : job.salary_text || null;

  // Ensure we always have a valid date for datePosted (required by Google)
  const publishedDate = job.published_at || job.created_at || new Date().toISOString();

  // JobPosting schema for Google Jobs - Maritim Bemanning & Bemanningsbyrå
  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    identifier: {
      "@type": "PropertyValue",
      name: "Bluecrew AS",
      value: job.id,
    },
    datePosted: publishedDate,
    ...(job.expires_at || job.application_deadline
      ? { validThrough: job.expires_at || job.application_deadline }
      : {}),
    employmentType: job.job_type === "Fast" ? "FULL_TIME" : "CONTRACT",
    hiringOrganization: {
      "@type": "Organization",
      name: job.company_name || "Bluecrew AS",
      sameAs: "https://bluecrew.no",
      logo: "https://bluecrew.no/icon.png",
      description: "Maritim bemanning og vikarbyrå - kvalifiserte sjøfolk til norsk maritim næring",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.kommune,
        addressRegion: job.fylke,
        addressCountry: "NO",
      },
    },
    // Google Jobs enhancements
    directApply: true,
    applicantLocationRequirements: {
      "@type": "Country",
      name: "Norway",
    },
    // Industry context for maritime staffing
    industry: "Maritime & Shipping",
    occupationalCategory: categoryLabel,
    // Benefits if available
    ...(job.benefits && job.benefits.length > 0 && {
      jobBenefits: job.benefits.join(", "),
    }),
    // Salary information
    ...(job.salary_min &&
      job.salary_max && {
        baseSalary: {
          "@type": "MonetaryAmount",
          currency: "NOK",
          value: {
            "@type": "QuantitativeValue",
            minValue: job.salary_min,
            maxValue: job.salary_max,
            unitText: "YEAR",
          },
        },
      }),
  };

  // Breadcrumb schema for navigation
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Hjem",
        item: "https://bluecrew.no",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Stillinger",
        item: "https://bluecrew.no/stillinger",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: job.title,
        item: `https://bluecrew.no/stillinger/${job.slug}`,
      },
    ],
  };

  return (
    <>
      <SchemaMarkup type="custom" data={jobPostingSchema} />
      <SchemaMarkup type="custom" data={breadcrumbSchema} />

      <main className="bg-navy-900 min-h-screen">
        {/* Compact Header */}
        <Section variant="navy" noPadding className="pt-20">
          <Container size="lg">
            <div className="py-8 md:py-10">
              {/* Breadcrumb */}
              <Link
                href="/stillinger"
                className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors mb-6 text-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Tilbake til stillinger</span>
              </Link>

              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex items-start gap-4">
                  {/* Company icon */}
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0">
                    <Building2 className="w-7 h-7 md:w-8 md:h-8 text-gold-400" />
                  </div>

                  <div className="flex-1 min-w-0">
                    {job.company_name && (
                      <p className="text-cream-100/70 text-sm mb-1">
                        {job.company_name}
                      </p>
                    )}
                    <h1 className="text-2xl md:text-3xl font-medium text-cream-50 mb-3 leading-tight">
                      {job.title}
                    </h1>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-gold-400/10 border border-gold-400/20 rounded-full text-gold-300 text-sm font-medium">
                        {categoryLabel}
                      </span>
                      <span className="px-3 py-1 bg-cream-50/5 border border-cream-50/10 rounded-full text-cream-100 text-sm">
                        {jobTypeLabels[job.job_type] || job.job_type}
                      </span>
                      {job.region && (
                        <span className="px-3 py-1 bg-gold-400/10 border border-gold-400/20 rounded-full text-gold-300 text-sm">
                          {job.region}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row gap-3 lg:shrink-0">
                  <Link href={`/stillinger/${job.slug}/sok`}>
                    <Button size="lg" className="w-full sm:w-auto bg-gold-500 text-navy-900 hover:bg-gold-400 font-medium">
                      Søk på stillingen
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-gold-400/30 text-cream-50 hover:bg-gold-400/10"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Del
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Quick info bar */}
        <div className="bg-navy-800/50 border-y border-cream-100/10">
          <Container size="lg">
            <div className="py-4 flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2 text-cream-100/80">
                <MapPin className="w-4 h-4 text-gold-400" />
                <span>{job.location}</span>
              </div>

              {job.start_date && (
                <div className="flex items-center gap-2 text-cream-100/80">
                  <Clock className="w-4 h-4 text-gold-400" />
                  <span>Oppstart: {formatDate(job.start_date)}</span>
                </div>
              )}

              {salaryText && (
                <div className="flex items-center gap-2 text-cream-100/80">
                  <Banknote className="w-4 h-4 text-gold-400" />
                  <span>{salaryText}</span>
                </div>
              )}

              {publishedDate && (
                <div className="flex items-center gap-2 text-cream-100/80">
                  <Calendar className="w-4 h-4 text-gold-400" />
                  <span>Publisert {formatDate(publishedDate)}</span>
                </div>
              )}
            </div>
          </Container>
        </div>

        {/* Main content */}
        <div className="py-8 md:py-12">
          <Container size="lg">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Left column - description */}
              <div className="lg:col-span-2 space-y-8">
                {/* Description */}
                <div className="bg-navy-800/50 rounded-2xl border border-cream-100/10 p-6 md:p-8">
                  <h2 className="text-xl font-medium text-cream-50 mb-4">
                    Om stillingen
                  </h2>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-cream-100/80 whitespace-pre-line leading-relaxed">
                      {job.description}
                    </p>
                  </div>
                </div>

                {/* Responsibilities */}
                {job.responsibilities && job.responsibilities.length > 0 && (
                  <div className="bg-navy-800/50 rounded-2xl border border-cream-100/10 p-6 md:p-8">
                    <h2 className="text-xl font-medium text-cream-50 mb-4 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-gold-400" />
                      Arbeidsoppgaver
                    </h2>
                    <ul className="space-y-2">
                      {job.responsibilities.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                          <span className="text-cream-100/80">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Requirements */}
                {job.requirements && job.requirements.length > 0 && (
                  <div className="bg-navy-800/50 rounded-2xl border border-cream-100/10 p-6 md:p-8">
                    <h2 className="text-xl font-medium text-cream-50 mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-gold-400" />
                      Krav og kvalifikasjoner
                    </h2>
                    <ul className="space-y-2">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                          <span className="text-cream-100/80">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Benefits */}
                {job.benefits && job.benefits.length > 0 && (
                  <div className="bg-navy-800/50 rounded-2xl border border-cream-100/10 p-6 md:p-8">
                    <h2 className="text-xl font-medium text-cream-50 mb-4">
                      Vi tilbyr
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {job.benefits.map((benefit, index) => (
                        <Badge key={index} variant="primary" size="sm">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Apply CTA */}
                <div className="bg-gradient-to-br from-gold-500/20 to-gold-600/10 rounded-2xl border border-gold-400/30 p-6 md:p-8">
                  <h3 className="text-xl font-medium text-cream-50 mb-2">
                    Interessert i stillingen?
                  </h3>
                  <p className="text-cream-100/70 mb-4">
                    Søk enkelt med din Bluecrew-profil. Du trenger kun å skrive et
                    kort følgebrev.
                  </p>
                  <Link href={`/stillinger/${job.slug}/sok`}>
                    <Button size="lg" className="bg-gold-500 text-navy-900 hover:bg-gold-400">Søk nå</Button>
                  </Link>
                </div>
              </div>

              {/* Right column - sidebar */}
              <div className="space-y-6">
                {/* Company card */}
                <div className="bg-navy-800/50 rounded-2xl border border-cream-100/10 p-6">
                  <h3 className="text-lg font-medium text-cream-50 mb-4">
                    Om bedriften
                  </h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shrink-0">
                      <Building2 className="w-7 h-7 text-navy-900" />
                    </div>
                    <div>
                      <p className="font-medium text-cream-50">
                        {job.company_name || "Bluecrew AS"}
                      </p>
                      <p className="text-sm text-cream-100/60">
                        {categoryLabel}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-cream-100/70">
                    Stillingen formidles av Bluecrew
                    {job.company_name ? ` på vegne av ${job.company_name}` : ""}.
                  </p>
                </div>

                {/* Quick facts */}
                <div className="bg-navy-800/50 rounded-2xl border border-cream-100/10 p-6">
                  <h3 className="text-lg font-medium text-cream-50 mb-4">
                    Nøkkelinfo
                  </h3>
                  <dl className="space-y-3">
                    <div className="flex justify-between">
                      <dt className="text-cream-100/60">Kategori</dt>
                      <dd className="font-medium text-cream-50">
                        {categoryLabel}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-cream-100/60">Lokasjon</dt>
                      <dd className="font-medium text-cream-50">{job.location}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-cream-100/60">Fylke</dt>
                      <dd className="font-medium text-cream-50">{job.fylke}</dd>
                    </div>
                    {job.region && (
                      <div className="flex justify-between">
                        <dt className="text-cream-100/60">Region</dt>
                        <dd className="font-medium text-cream-50">{job.region}</dd>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <dt className="text-cream-100/60">Ansettelse</dt>
                      <dd className="font-medium text-cream-50">
                        {jobTypeLabels[job.job_type] || job.job_type}
                      </dd>
                    </div>
                    {salaryText && (
                      <div className="flex justify-between">
                        <dt className="text-cream-100/60">Lønn</dt>
                        <dd className="font-medium text-gold-400">{salaryText}</dd>
                      </div>
                    )}
                  </dl>
                </div>

                {/* Deadline warning */}
                {(job.expires_at || job.application_deadline) && (
                  <div className="bg-gold-500/10 border border-gold-400/30 rounded-xl p-4 text-sm">
                    <p className="text-gold-300">
                      <strong>Søknadsfrist:</strong>{" "}
                      {formatDate(job.application_deadline || job.expires_at!)}
                    </p>
                  </div>
                )}

                {/* Contact info */}
                {(job.contact_person || job.contact_email || job.contact_phone) && (
                  <div className="bg-navy-800/50 rounded-2xl border border-cream-100/10 p-6">
                    <h3 className="text-lg font-medium text-cream-50 mb-4">
                      Kontakt
                    </h3>
                    <div className="space-y-2 text-sm">
                      {job.contact_person && (
                        <p className="text-cream-50 font-medium">
                          {job.contact_person}
                        </p>
                      )}
                      {job.contact_email && (
                        <p className="text-cream-100/70">{job.contact_email}</p>
                      )}
                      {job.contact_phone && (
                        <p className="text-cream-100/70">{job.contact_phone}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </div>

        {/* Similar jobs */}
        {similarJobs.length > 0 && (
          <div className="py-12 border-t border-cream-100/10">
            <Container size="lg">
              <h2 className="text-2xl font-medium text-cream-50 mb-6">
                Lignende stillinger
              </h2>
              <JobList jobs={similarJobs} />
            </Container>
          </div>
        )}
      </main>
    </>
  );
}


