"use client";

import Link from "next/link";
import { MapPin, Banknote, Calendar, Briefcase } from "@/components/icons";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import type { JobPosting } from "@/types/database.types";

interface JobCardProps {
  job: JobPosting;
  className?: string;
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

export default function JobCard({ job, className }: JobCardProps) {
  const salaryText =
    job.salary_min && job.salary_max
      ? `${formatCurrency(job.salary_min)} - ${formatCurrency(job.salary_max)}`
      : job.salary_min
        ? `Fra ${formatCurrency(job.salary_min)}`
        : job.salary_max
          ? `Opp til ${formatCurrency(job.salary_max)}`
          : job.salary_text || null;

  const publishedDate = job.published_at || job.created_at;

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm",
        "hover:shadow-xl hover:shadow-gold-400/10 hover:border-gold-400/30",
        "transition-all duration-200 hover:-translate-y-1",
        className
      )}
    >
      <Link href={`/stillinger/${job.slug}`} className="block">
        <div className="p-5">
          {/* Header: Company & Title */}
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-linear-to-br from-gold-400 to-navy-600 flex items-center justify-center shrink-0">
              <Briefcase className="w-6 h-6 text-cream-50" />
            </div>
            <div className="flex-1 min-w-0">
              {job.company_name && (
                <p className="text-sm text-slate-600 truncate">{job.company_name}</p>
              )}
              <h3 className="text-lg font-medium text-navy-900 line-clamp-2 leading-tight mt-0.5">
                {job.title}
              </h3>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="primary" size="sm">
              {categoryLabels[job.category] || job.category}
            </Badge>
            <Badge variant="success" size="sm">
              {jobTypeLabels[job.job_type] || job.job_type}
            </Badge>
            {job.region && (
              <Badge variant="default" size="sm">
                {job.region}
              </Badge>
            )}
          </div>

          {/* Details */}
          <div className="space-y-2 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="truncate">{job.location}</span>
            </div>

            {salaryText && (
              <div className="flex items-center gap-2">
                <Banknote className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{salaryText}</span>
              </div>
            )}
          </div>

          {/* Short description */}
          {job.short_description && (
            <p className="mt-3 text-sm text-slate-600 line-clamp-2">
              {job.short_description}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Calendar className="w-3.5 h-3.5" />
              <span>
                Publisert {publishedDate ? formatDate(publishedDate) : "i dag"}
              </span>
            </div>
            <span className="text-sm font-medium text-gold-600">Les mer →</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

