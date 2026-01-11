"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { KanbanJobCard, SegmentTabs, type KanbanJob, type Segment } from "@/components/jobs";

// Hardcoded open positions for the campaign
const kanbanJobs: KanbanJob[] = [
  // Offshore
  { id: "offshore-1", title: "Elektriker", segment: "offshore", order: 1 },
  { id: "offshore-2", title: "ROV-Pilot", segment: "offshore", order: 2 },
  { id: "offshore-3", title: "Sveiser", segment: "offshore", order: 3 },
  { id: "offshore-4", title: "Riggere", segment: "offshore", order: 4 },
  { id: "offshore-5", title: "Mekaniker", segment: "offshore", order: 5 },

  // Oppdrett
  { id: "oppdrett-1", title: "Akvatekniker/Røkter", segment: "oppdrett", order: 1 },
  { id: "oppdrett-2", title: "Driftsoperatør", segment: "oppdrett", order: 2 },
  { id: "oppdrett-3", title: "Kaptein", segment: "oppdrett", order: 3 },
  { id: "oppdrett-4", title: "Styrmann", segment: "oppdrett", order: 4 },
  { id: "oppdrett-5", title: "Matros", segment: "oppdrett", order: 5 },

  // Shipping
  { id: "shipping-1", title: "Kaptein", segment: "shipping", order: 1 },
  { id: "shipping-2", title: "Overstyrmann", segment: "shipping", order: 2 },
  { id: "shipping-3", title: "Styrmann", segment: "shipping", order: 3 },
  { id: "shipping-4", title: "Matros", segment: "shipping", order: 4 },
  { id: "shipping-5", title: "Maskinist", segment: "shipping", order: 5 },
];

export default function StillingerClient() {
  const [activeSegment, setActiveSegment] = useState<Segment>("offshore");

  const filteredJobs = kanbanJobs
    .filter((job) => job.segment === activeSegment)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-12">
      {/* Segment Tabs */}
      <SegmentTabs
        activeSegment={activeSegment}
        onSegmentChange={setActiveSegment}
      />

      {/* Job Count */}
      <div className="text-center">
        <p className="text-slate-600">
          Viser{" "}
          <span className="font-medium text-navy-900">{filteredJobs.length}</span>{" "}
          åpne stillinger innen{" "}
          <span className="font-medium text-navy-900 capitalize">
            {activeSegment}
          </span>
        </p>
      </div>

      {/* Kanban Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSegment}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
        >
          {filteredJobs.map((job) => (
            <KanbanJobCard key={job.id} job={job} />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Call to action */}
      <div className="text-center pt-8">
        <p className="text-slate-500 text-sm">
          Finner du ikke din stilling?{" "}
          <a
            href="/meld-interesse"
            className="text-gold-600 hover:text-gold-700 font-medium underline"
          >
            Registrer deg her
          </a>{" "}
          så kontakter vi deg når noe passende dukker opp.
        </p>
      </div>
    </div>
  );
}

