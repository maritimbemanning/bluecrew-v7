"use client";

import Link from "next/link";
import { Award, ShieldCheck } from "@/components/icons";

export default function CertificationBar() {
  return (
    <div className="w-full py-8 border-t border-gold-400/10">
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
        {/* Godkjent Bemanningsforetak */}
        <Link
          href="/trygghet#godkjent"
          className="group flex items-center gap-3 hover:opacity-100 transition-all duration-300"
        >
          <div className="p-2 bg-gold-400/10 rounded-lg">
            <ShieldCheck className="w-8 h-8 text-gold-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-cream-200/60 uppercase tracking-wider font-medium">Godkjent</span>
            <span className="text-sm font-medium text-cream-50">Bemanningsforetak</span>
          </div>
        </Link>

        {/* DNV Sertifisert */}
        <Link
          href="/trygghet#dnv"
          className="group flex items-center gap-3 hover:opacity-100 transition-all duration-300"
        >
          <div className="p-2 bg-gold-400/10 rounded-lg">
            <Award className="w-8 h-8 text-gold-300" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-cream-200/60 uppercase tracking-wider font-medium">DNV Sertifisert</span>
            <span className="text-sm font-medium text-cream-50">Rekrutterer</span>
          </div>
        </Link>

        {/* ISO 9001 & 45001 - Under utvikling */}
        <div className="group flex items-center gap-3 opacity-50 cursor-not-allowed">
          <div className="p-2 bg-cream-100/5 rounded-lg border border-cream-100/10">
            <span className="text-xl font-medium text-cream-200/60">ISO</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gold-400 uppercase tracking-wider font-medium">Under utvikling</span>
            <span className="text-sm font-medium text-cream-200/60">9001 & 45001 - Q2 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}


