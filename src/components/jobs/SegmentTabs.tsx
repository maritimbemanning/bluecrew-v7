"use client";

import { motion } from "framer-motion";

export type Segment = "offshore" | "oppdrett" | "shipping";

interface SegmentTabsProps {
  activeSegment: Segment;
  onSegmentChange: (segment: Segment) => void;
}

const segments: { id: Segment; label: string }[] = [
  { id: "offshore", label: "Offshore" },
  { id: "oppdrett", label: "Oppdrett" },
  { id: "shipping", label: "Shipping" },
];

export default function SegmentTabs({
  activeSegment,
  onSegmentChange,
}: SegmentTabsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-4">
      {segments.map((segment) => {
        const isActive = activeSegment === segment.id;
        return (
          <button
            key={segment.id}
            onClick={() => onSegmentChange(segment.id)}
            className={`
              relative px-6 py-3 md:px-8 md:py-4 rounded-xl font-medium text-base md:text-lg
              transition-all duration-300
              ${
                isActive
                  ? "bg-navy-900 text-cream-50 shadow-lg"
                  : "bg-white text-navy-800 hover:bg-navy-50 border border-slate-200"
              }
            `}
          >
            {segment.label}

            {/* Active indicator */}
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-1 bg-gold-500 rounded-full"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

