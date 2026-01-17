import { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  FileText,
  Building2,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  ExternalLink,
  Eye,
} from "@/components/icons";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getUser } from "@/lib/auth/get-user";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Mine søknader",
  description: "Se og administrer dine jobbsøknader hos Bluecrew.",
  robots: {
    index: false,
    follow: false,
  },
};

type ApplicationStatus =
  | "new"
  | "reviewed"
  | "interview"
  | "hired"
  | "rejected"
  | "withdrawn";

const statusConfig: Record<
  ApplicationStatus,
  { label: string; variant: "default" | "primary" | "success" | "warning" | "error"; icon: React.ElementType }
> = {
  new: {
    label: "Mottatt",
    variant: "primary",
    icon: FileText,
  },
  reviewed: {
    label: "Under vurdering",
    variant: "warning",
    icon: Eye,
  },
  interview: {
    label: "Til intervju",
    variant: "success",
    icon: Calendar,
  },
  hired: {
    label: "Ansatt",
    variant: "success",
    icon: CheckCircle,
  },
  rejected: {
    label: "Avslått",
    variant: "error",
    icon: XCircle,
  },
  withdrawn: {
    label: "Trukket",
    variant: "default",
    icon: XCircle,
  },
};

interface ApplicationWithJob {
  id: string;
  status: string | null;
  cover_letter: string | null;
  created_at: string | null;
  updated_at: string | null;
  name: string;
  email: string;
  job_postings: {
    id: string;
    slug: string;
    title: string;
    company_name: string | null;
    location: string;
    category: string;
    job_type: string;
  } | null;
}

interface CampaignApplication {
  id: string;
  status: string | null;
  position: string;
  segment: string;
  created_at: string | null;
  updated_at: string | null;
  name: string;
  email: string;
  notes: string | null;
}

async function getApplications(email: string): Promise<ApplicationWithJob[]> {
  // NOTE: Using supabaseAdmin because RLS doesn't allow users to read their own applications
  const { data, error } = await supabaseAdmin
    .from("job_applications")
    .select(
      `
      id,
      status,
      cover_letter,
      created_at,
      updated_at,
      name,
      email,
      job_postings (
        id,
        slug,
        title,
        company_name,
        location,
        category,
        job_type
      )
    `
    )
    .eq("email", email.toLowerCase())
    .order("created_at", { ascending: false });

  if (error) {
    return [];
  }

  return (data || []) as unknown as ApplicationWithJob[];
}

async function getCampaignApplications(email: string): Promise<CampaignApplication[]> {
  const { data, error } = await (supabaseAdmin as any)
    .from("campaign_applications")
    .select("id, status, position, segment, created_at, updated_at, name, email, notes")
    .eq("email", email.toLowerCase())
    .order("created_at", { ascending: false });

  if (error) {
    return [];
  }

  return (data || []) as CampaignApplication[];
}

export default async function MineSoknaderPage() {
  const user = await getUser();

  if (!user || !user.email) {
    redirect("/api/vipps/start?returnTo=/mine-soknader");
  }

  const [applications, campaignApplications] = await Promise.all([
    getApplications(user.email),
    getCampaignApplications(user.email),
  ]);

  const totalApplications = applications.length + campaignApplications.length;

  return (
    <main>
      {/* Header */}
      <Section variant="navy" noPadding className="pt-20">
        <Container size="lg">
          <div className="py-12 md:py-16">
            <div className="max-w-2xl">
              <div className="mb-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/20 rounded-full text-arctic-200 text-sm font-medium">
                  <FileText className="w-4 h-4" />
                  {totalApplications}{" "}
                  {totalApplications === 1 ? "søknad" : "søknader"}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-medium text-cream-50 mb-4">
                Mine søknader
              </h1>

              <p className="text-lg text-cream-100/80">
                Her ser du alle søknadene du har sendt og deres status.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Applications list */}
      <Section>
        <Container size="lg">
          {totalApplications === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-slate-400" />
              </div>
              <h2 className="text-xl font-medium text-navy-900 mb-2">
                Ingen søknader ennå
              </h2>
              <p className="text-slate-600 mb-6 max-w-md mx-auto">
                Du har ikke sendt noen søknader ennå. Se ledige stillinger og
                finn din neste jobb i maritim sektor.
              </p>
              <Link
                href="/stillinger"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 text-navy-900 italic font-medium rounded-xl hover:bg-gold-400 transition-colors"
              >
                Se ledige stillinger
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Campaign Applications Section */}
              {campaignApplications.length > 0 && (
                <div>
                  <h2 className="text-xl font-medium text-navy-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-gold-100 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-gold-600" />
                    </span>
                    Kampanje-søknader
                  </h2>
                  <div className="space-y-4">
                    {campaignApplications.map((app) => {
                      // Map campaign status to our status config
                      const campaignStatusMap: Record<string, ApplicationStatus> = {
                        ny: "new",
                        pending: "new",
                        reviewed: "reviewed",
                        contacted: "interview",
                        hired: "hired",
                        rejected: "rejected",
                      };
                      const appStatus = campaignStatusMap[app.status || "ny"] || "new";
                      const status = statusConfig[appStatus];
                      const StatusIcon = status.icon;

                      const segmentLabels: Record<string, string> = {
                        offshore: "Offshore",
                        havbruk: "Havbruk/Akvakultur",
                        shipping: "Shipping/Rederi",
                      };

                      return (
                        <div
                          key={app.id}
                          className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-shadow"
                        >
                          <div className="flex flex-col md:flex-row md:items-center gap-4">
                            {/* Campaign icon */}
                            <div className="shrink-0">
                              <div className="w-14 h-14 rounded-xl bg-linear-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                                <FileText className="w-7 h-7 text-navy-900" />
                              </div>
                            </div>

                            {/* Application info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <Badge variant={status.variant} size="sm">
                                  <StatusIcon
                                    className={`w-3 h-3 mr-1 ${
                                      appStatus === "new" ? "animate-pulse" : ""
                                    }`}
                                  />
                                  {status.label}
                                </Badge>
                                <Badge variant="default" size="sm">
                                  Kampanje 2026
                                </Badge>
                              </div>

                              <h3 className="text-lg font-medium text-navy-900 mb-1">
                                {app.position}
                              </h3>

                              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                                <span className="flex items-center gap-1">
                                  <Building2 className="w-4 h-4" />
                                  {segmentLabels[app.segment] || app.segment}
                                </span>
                                {app.created_at && (
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    Søkt {formatDate(app.created_at)}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-3 md:shrink-0">
                              <Link
                                href="/profil"
                                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-arctic-600 hover:text-arctic-700 bg-arctic-50 hover:bg-arctic-100 rounded-lg transition-colors"
                              >
                                Se profil
                                <ExternalLink className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Regular Job Applications Section */}
              {applications.length > 0 && (
                <div>
                  {campaignApplications.length > 0 && (
                    <h2 className="text-xl font-medium text-navy-900 mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-arctic-100 flex items-center justify-center">
                        <Building2 className="w-4 h-4 text-arctic-600" />
                      </span>
                      Stillingsøknader
                    </h2>
                  )}
                  <div className="space-y-4">
                    {applications.map((app) => {
                      const job = app.job_postings;
                      const appStatus = (app.status || "new") as ApplicationStatus;
                      const status = statusConfig[appStatus] || statusConfig.new;
                      const StatusIcon = status.icon;

                      if (!job) return null;

                      return (
                        <div
                          key={app.id}
                          className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-shadow"
                        >
                          <div className="flex flex-col md:flex-row md:items-center gap-4">
                            {/* Company icon */}
                            <div className="shrink-0">
                              <div className="w-14 h-14 rounded-xl bg-linear-to-br from-gold-400 to-navy-600 flex items-center justify-center">
                                <Building2 className="w-7 h-7 text-cream-50" />
                              </div>
                            </div>

                            {/* Job info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <Badge variant={status.variant} size="sm">
                                  <StatusIcon
                                    className={`w-3 h-3 mr-1 ${
                                      appStatus === "reviewed" ? "animate-pulse" : ""
                                    }`}
                                  />
                                  {status.label}
                                </Badge>
                              </div>

                              <h3 className="text-lg font-medium text-navy-900 mb-1">
                                {job.title}
                              </h3>

                              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                                {job.company_name && (
                                  <span className="flex items-center gap-1">
                                    <Building2 className="w-4 h-4" />
                                    {job.company_name}
                                  </span>
                                )}
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {job.location}
                                </span>
                                {app.created_at && (
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    Søkt {formatDate(app.created_at)}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-3 md:shrink-0">
                              <Link
                                href={`/stillinger/${job.slug}`}
                                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-arctic-600 hover:text-arctic-700 bg-arctic-50 hover:bg-arctic-100 rounded-lg transition-colors"
                              >
                                Se stilling
                                <ExternalLink className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                          </div>

                          {/* Cover letter preview */}
                          {app.cover_letter && (
                            <div className="mt-4 pt-4 border-t border-slate-100">
                              <p className="text-sm text-slate-500 mb-1">
                                Ditt følgebrev:
                              </p>
                              <p className="text-sm text-slate-700 line-clamp-2">
                                {app.cover_letter}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </Container>
      </Section>

      {/* CTA for more jobs */}
      {totalApplications > 0 && (
        <Section variant="slate">
          <Container size="md">
            <div className="text-center">
              <h2 className="text-2xl font-medium text-navy-900 mb-3">
                Finn flere muligheter
              </h2>
              <p className="text-slate-600 mb-6">
                Se alle ledige stillinger og finn din neste utfordring.
              </p>
              <Link
                href="/stillinger"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 text-navy-900 italic font-medium rounded-xl hover:bg-gold-400 transition-colors"
              >
                Se ledige stillinger
              </Link>
            </div>
          </Container>
        </Section>
      )}
    </main>
  );
}

