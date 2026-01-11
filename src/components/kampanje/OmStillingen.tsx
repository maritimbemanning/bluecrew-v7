'use client';

import { Shield, Award, Briefcase, CheckCircle2 } from '@/components/icons';
import type { StillingsInfo } from '@/lib/data/kampanje-stillinger';

interface OmStillingenProps {
  stilling: StillingsInfo;
}

export default function OmStillingen({ stilling }: OmStillingenProps) {
  return (
    <div className="bg-navy-900/50 border border-cream-100/10 rounded-2xl p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-cream-50 mb-2">
          Om stillingen
        </h2>
        <p className="text-cream-100/80 leading-relaxed">
          {stilling.beskrivelse}
        </p>
      </div>

      {/* Quick Info */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-navy-800/50 rounded-xl p-4">
          <p className="text-cream-100/60 text-sm mb-1">Lønnsnivå</p>
          <p className="text-gold-400 font-semibold">{stilling.lonnRange}</p>
        </div>
        <div className="bg-navy-800/50 rounded-xl p-4">
          <p className="text-cream-100/60 text-sm mb-1">Turnus</p>
          <p className="text-cream-50 font-semibold">{stilling.turnus}</p>
        </div>
      </div>

      {/* Krav og Kvalifikasjoner */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Krav */}
        <div className="bg-navy-800/50 rounded-xl p-5 border border-red-500/20">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-red-400" />
            <h3 className="text-lg font-semibold text-cream-50">
              Krav <span className="text-red-400 text-sm">(obligatorisk)</span>
            </h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-cream-100/60 text-xs uppercase tracking-wide mb-2">Sertifikater</p>
              <ul className="space-y-2">
                {stilling.krav.sertifikater.map((sert, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-cream-100/80">
                    <span className="text-red-400 mt-1">•</span>
                    {sert}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <p className="text-cream-100/60 text-xs uppercase tracking-wide mb-2">Lovverk</p>
              <ul className="space-y-2">
                {stilling.krav.lover.map((lov, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-cream-100/60">
                    <span className="text-cream-100/40 mt-1">•</span>
                    {lov}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Kvalifikasjoner */}
        <div className="bg-navy-800/50 rounded-xl p-5 border border-gold-400/20">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-gold-400" />
            <h3 className="text-lg font-semibold text-cream-50">
              Kvalifikasjoner <span className="text-gold-400 text-sm">(ønsket)</span>
            </h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-cream-100/60 text-xs uppercase tracking-wide mb-2">Ønsket av arbeidsgiver</p>
              <ul className="space-y-2">
                {stilling.kvalifikasjoner.onsket.map((kval, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-cream-100/80">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                    {kval}
                  </li>
                ))}
              </ul>
            </div>
            
            {stilling.kvalifikasjoner.fordel.length > 0 && (
              <div>
                <p className="text-cream-100/60 text-xs uppercase tracking-wide mb-2">En fordel</p>
                <ul className="space-y-2">
                  {stilling.kvalifikasjoner.fordel.map((fordel, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-cream-100/60">
                      <span className="text-gold-400/60 mt-1">+</span>
                      {fordel}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Arbeidsoppgaver */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Briefcase className="w-5 h-5 text-cream-100/60" />
          <h3 className="text-lg font-semibold text-cream-50">Typiske arbeidsoppgaver</h3>
        </div>
        <ul className="grid sm:grid-cols-2 gap-2">
          {stilling.arbeidsoppgaver.map((oppgave, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-cream-100/70">
              <span className="text-cream-100/40">•</span>
              {oppgave}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

