"use client";

import JobCard from "./JobCard";
import type { JobPosting } from "@/types/database.types";
import { Briefcase } from "@/components/icons";

interface JobListProps {
  jobs: JobPosting[];
  emptyMessage?: string;
}

export default function JobList({
  jobs,
  emptyMessage = "Ingen stillinger funnet"
}: JobListProps) {
  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
          <Briefcase className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-medium text-navy-900 mb-2">
          {emptyMessage}
        </h3>
        <p className="text-slate-600 max-w-md">
          Prøv å justere filtrene dine, eller kom tilbake senere for nye muligheter.
        </p>
      </div>
    );
  }

  // Sort by published_at (newest first)
  const sortedJobs = [...jobs].sort((a, b) => {
    const dateA = a.published_at || a.created_at || "";
    const dateB = b.published_at || b.created_at || "";
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {sortedJobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}


