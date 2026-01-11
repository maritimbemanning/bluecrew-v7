"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export interface KanbanJob {
  id: string;
  title: string;
  segment: "offshore" | "oppdrett" | "shipping";
  order: number;
}

interface KanbanJobCardProps {
  job: KanbanJob;
}

export default function KanbanJobCard({ job }: KanbanJobCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: job.order * 0.1 }}
    >
      <Link
        href={`/stillinger/sok?stilling=${encodeURIComponent(job.title)}&segment=${job.segment}`}
        className="block group"
      >
        <div
          className="bg-linear-to-br from-navy-900 via-navy-800 to-navy-900/90
                      rounded-2xl p-8 min-h-[280px]
                      hover:-translate-y-2 hover:shadow-2xl
                      transition-all duration-300
                      border border-gold-400/20
                      hover:border-gold-400/40
                      flex flex-col justify-between"
        >
          {/* Bluecrew Logo */}
          <div className="mb-6">
            <Image
              src="/images/fullogo_transparent.png"
              alt="Bluecrew"
              width={140}
              height={35}
              className="h-8 w-auto object-contain brightness-0 invert opacity-90"
            />
          </div>

          {/* Stilling */}
          <div className="flex-1 flex flex-col justify-center">
            <h3 className="text-3xl font-medium text-cream-50 mb-2 group-hover:text-gold-300 transition-colors">
              {job.title}
            </h3>
            <p className="text-gold-400 italic text-lg">
              Åpen Søknad
            </p>
          </div>

          {/* CTA */}
          <div className="mt-8">
            <span
              className="inline-flex items-center gap-2 bg-gold-500 text-navy-900
                         px-6 py-3 rounded-lg font-medium
                         group-hover:bg-gold-400 transition-colors"
            >
              Søk nå
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

