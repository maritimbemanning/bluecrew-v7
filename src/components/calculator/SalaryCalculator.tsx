'use client';

import { useState, useMemo } from 'react';
import { Briefcase } from '@/components/icons';
import { formatCurrency, cn } from '@/lib/utils';
import Card from '@/components/ui/Card';

const POSITIONS = {
  kaptein: { title: 'Kaptein', base: 850000 },
  overstyrmann: { title: 'Overstyrmann', base: 750000 },
  styrmann: { title: 'Styrmann', base: 650000 },
  maskinistK1: { title: 'Maskinist K1', base: 750000 },
  maskinistK2: { title: 'Maskinist K2', base: 680000 },
  eto: { title: 'ETO', base: 720000 },
  matros: { title: 'Matros', base: 550000 },
  kokk: { title: 'Kokk', base: 580000 },
};

const SECTORS = [
  { id: 'offshore', label: 'Offshore', multiplier: 1.25 },
  { id: 'havbruk', label: 'Havbruk', multiplier: 1.15 },
  { id: 'rederi', label: 'Rederi', multiplier: 1.0 },
] as const;

const EXPERIENCE_MULT = {
  entry: 1.0,   // 0-2 years
  mid: 1.25,    // 2-5 years
  senior: 1.45, // 5+ years
};

type SectorId = typeof SECTORS[number]['id'];

export default function SalaryCalculator() {
  const [sector, setSector] = useState<SectorId>('offshore');
  const [position, setPosition] = useState<keyof typeof POSITIONS>('matros');
  const [experience, setExperience] = useState(0);

  const result = useMemo(() => {
    const basePos = POSITIONS[position].base;
    let expMult = EXPERIENCE_MULT.entry;
    if (experience > 2) expMult = EXPERIENCE_MULT.mid;
    if (experience > 5) expMult = EXPERIENCE_MULT.senior;

    const sectorData = SECTORS.find(s => s.id === sector);
    const sectorMult = sectorData?.multiplier || 1.0;

    const total = Math.round(basePos * expMult * sectorMult);

    return {
      annual: total,
      monthly: Math.round(total / 12),
    };
  }, [sector, position, experience]);

  return (
    <Card className="p-4 sm:p-6 md:p-8 bg-white border-slate-200">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

        {/* Inputs */}
        <div className="space-y-6 sm:space-y-8">
          <div>
            <label className="block text-navy-900 text-sm font-medium mb-3">
              Velg sektor
            </label>
            <div className="grid grid-cols-3 gap-2 sm:flex sm:p-1 sm:bg-slate-50 sm:rounded-lg sm:border sm:border-slate-200">
              {SECTORS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSector(s.id)}
                  className={cn(
                    "py-3 sm:py-2.5 px-2 sm:px-4 rounded-lg sm:rounded-md text-sm font-medium transition-all sm:flex-1",
                    sector === s.id
                      ? "bg-gold-500 text-navy-900 italic sm:bg-white sm:text-navy-900 sm:shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:text-navy-900 sm:bg-transparent"
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="position-select" className="block text-navy-900 text-sm font-medium mb-3">
              Stilling
            </label>
            <div className="relative">
              <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select
                id="position-select"
                value={position}
                onChange={(e) => setPosition(e.target.value as keyof typeof POSITIONS)}
                className="w-full bg-white border border-slate-200 rounded-lg py-3 pl-12 pr-4 text-navy-900 focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none cursor-pointer"
              >
                {Object.entries(POSITIONS).map(([key, data]) => (
                  <option key={key} value={key}>{data.title}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="experience-slider" className="flex justify-between text-navy-900 text-sm font-medium mb-3">
              <span>Erfaring</span>
              <span className="text-gold-500">{experience} år</span>
            </label>
            <input
              id="experience-slider"
              type="range"
              min="0"
              max="10"
              step="1"
              value={experience}
              onChange={(e) => setExperience(Number(e.target.value))}
              aria-label="År med erfaring"
              className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-gold-400"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>Nyutdannet</span>
              <span>5 år</span>
              <span>10+ år</span>
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
          <div className="h-full flex flex-col justify-center">
            <div className="mb-6">
              <p className="text-slate-600 text-sm font-medium mb-2">Estimert årslønn</p>
              <div
                key={result.annual}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy-900 animate-fade-in"
              >
                {formatCurrency(result.annual)}
              </div>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <p className="text-slate-600 text-sm font-medium mb-2">Per måned</p>
              <div className="text-xl sm:text-2xl font-bold text-navy-700">
                {formatCurrency(result.monthly)}
              </div>
            </div>

            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-slate-200 text-center">
              <p className="text-xs text-slate-500">
                * Estimat basert på gjennomsnittslønn. Faktisk lønn kan variere.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}


