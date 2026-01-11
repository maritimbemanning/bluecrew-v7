"use client";

import { useState, useMemo } from 'react';
import { Calendar, Home, Ship, Clock, TrendingUp, Banknote, Users, ChevronDown } from '@/components/icons';
import Card from '@/components/ui/Card';
import { cn } from '@/lib/utils';

const PRESET_ROTATIONS = [
  { id: '2-4', label: '2-4 Offshore', daysOn: 14, daysOff: 28 },
  { id: '2-3', label: '2-3 Offshore', daysOn: 14, daysOff: 21 },
  { id: '4-4', label: '4-4 Sjø', daysOn: 28, daysOff: 28 },
  { id: '3-3', label: '3-3 Sjø', daysOn: 21, daysOff: 21 },
  { id: '2-2', label: '2-2 Havbruk', daysOn: 14, daysOff: 14 },
  { id: '1-1', label: '1-1 Kyst', daysOn: 7, daysOff: 7 },
  { id: 'custom', label: 'Egendefinert', daysOn: 14, daysOff: 14 },
] as const;

// Average office worker comparison
const OFFICE_WORK_DAYS = 230; // ~46 weeks * 5 days
const OFFICE_HOURS_PER_DAY = 7.5; // Standard Norwegian office day
const OFFICE_HOURS_PER_YEAR = OFFICE_WORK_DAYS * OFFICE_HOURS_PER_DAY; // ~1725 hours
const OFFICE_FREE_DAYS = 135; // weekends + holidays + vacation

export default function TurnusCalculator() {
  const [selectedPreset, setSelectedPreset] = useState<string>('2-4');
  const [customDaysOn, setCustomDaysOn] = useState(14);
  const [customDaysOff, setCustomDaysOff] = useState(28);
  const [hoursPerDay, setHoursPerDay] = useState(12); // Maritime standard
  const [annualSalary, setAnnualSalary] = useState(700000);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Get current rotation values
  const currentRotation = useMemo(() => {
    if (selectedPreset === 'custom') {
      return { daysOn: customDaysOn, daysOff: customDaysOff };
    }
    const preset = PRESET_ROTATIONS.find(r => r.id === selectedPreset);
    return preset || { daysOn: 14, daysOff: 28 };
  }, [selectedPreset, customDaysOn, customDaysOff]);

  // Calculate statistics
  const stats = useMemo(() => {
    const cycleLength = currentRotation.daysOn + currentRotation.daysOff;
    const cyclesPerYear = 365 / cycleLength;
    const workDays = Math.round(cyclesPerYear * currentRotation.daysOn);
    const freeDays = 365 - workDays;
    const workPercent = Math.round((workDays / 365) * 100);
    
    // Hours calculation - THIS IS KEY for fair comparison
    const hoursPerYear = workDays * hoursPerDay;
    const hourlyRate = annualSalary / hoursPerYear;
    
    // Salary calculations
    const dailyRate = annualSalary / workDays;
    const monthlyNet = Math.round(annualSalary / 12);
    
    // Compare with office job - FAIR comparison based on HOURS
    const extraFreeDays = freeDays - OFFICE_FREE_DAYS;
    const freeWeeksPerYear = Math.round(freeDays / 7);
    const hoursDifference = hoursPerYear - OFFICE_HOURS_PER_YEAR;
    const hoursDifferencePercent = Math.round((hoursDifference / OFFICE_HOURS_PER_YEAR) * 100);

    return { 
      workDays, 
      freeDays, 
      workPercent, 
      dailyRate,
      hourlyRate,
      hoursPerYear,
      monthlyNet,
      extraFreeDays,
      freeWeeksPerYear,
      hoursDifference,
      hoursDifferencePercent,
      cycleLength
    };
  }, [currentRotation, annualSalary, hoursPerDay]);

  // Calendar visualization
  const calendarData = useMemo(() => {
    const days = [];
    const cycleLength = currentRotation.daysOn + currentRotation.daysOff;
    for (let i = 0; i < 365; i++) {
      const dayInCycle = i % cycleLength;
      const isWork = dayInCycle < currentRotation.daysOn;
      days.push({ isWork, dayOfYear: i });
    }
    return days;
  }, [currentRotation]);

  return (
    <div className="space-y-8">
      {/* Main Calculator Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Controls */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Rotation Selector */}
          <Card className="p-6 bg-white">
            <h3 className="text-lg font-medium text-navy-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-gold-500" />
              1. Velg rotasjon
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {PRESET_ROTATIONS.map((rot) => (
                <button
                  key={rot.id}
                  onClick={() => setSelectedPreset(rot.id)}
                  className={cn(
                    "flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-200",
                    selectedPreset === rot.id
                      ? "border-gold-400 bg-gold-50 text-navy-900"
                      : "border-slate-100 hover:border-slate-200 text-slate-600"
                  )}
                >
                  <span className="font-bold text-lg">{rot.id === 'custom' ? '?' : rot.id}</span>
                  <span className="text-xs">{rot.id === 'custom' ? 'Egendefinert' : rot.label.split(' ')[1]}</span>
                </button>
              ))}
            </div>

            {/* Custom Input */}
            {selectedPreset === 'custom' && (
              <div className="mt-4 p-4 bg-gold-50 rounded-xl border border-gold-200">
                <p className="text-sm font-medium text-navy-900 mb-3">Definer din turnus:</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="custom-days-on" className="block text-xs text-slate-600 mb-1">Dager PÅ</label>
                    <input
                      id="custom-days-on"
                      type="number"
                      min="1"
                      max="60"
                      value={customDaysOn}
                      onChange={(e) => setCustomDaysOn(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-center font-bold text-lg"
                    />
                  </div>
                  <div>
                    <label htmlFor="custom-days-off" className="block text-xs text-slate-600 mb-1">Dager FRI</label>
                    <input
                      id="custom-days-off"
                      type="number"
                      min="1"
                      max="60"
                      value={customDaysOff}
                      onChange={(e) => setCustomDaysOff(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-center font-bold text-lg"
                    />
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* Hours per day */}
          <Card className="p-6 bg-white">
            <h3 className="text-lg font-medium text-navy-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-gold-500" />
              2. Timer per dag om bord
            </h3>
            <div className="flex gap-2">
              {[8, 10, 12, 14].map((hours) => (
                <button
                  key={hours}
                  onClick={() => setHoursPerDay(hours)}
                  className={cn(
                    "flex-1 py-3 rounded-xl font-bold transition-all",
                    hoursPerDay === hours
                      ? "bg-gold-500 text-navy-900 italic"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  )}
                >
                  {hours}t
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-2 text-center">
              De fleste maritime stillinger har 12-timers vakter
            </p>
          </Card>

          {/* Salary Input */}
          <Card className="p-6 bg-white">
            <h3 className="text-lg font-medium text-navy-900 mb-4 flex items-center gap-2">
              <Banknote className="w-5 h-5 text-gold-500" />
              3. Din årslønn (valgfritt)
            </h3>
            <div className="space-y-3">
              <input
                type="range"
                aria-label="Årslønn"
                min="350000"
                max="1500000"
                step="25000"
                value={annualSalary}
                onChange={(e) => setAnnualSalary(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-gold-500"
              />
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">350k</span>
                <span className="text-2xl font-bold text-navy-900">
                  {(annualSalary / 1000).toFixed(0)}k kr
                </span>
                <span className="text-sm text-slate-500">1.5M</span>
              </div>
            </div>
          </Card>

          {/* Results Summary */}
          <Card variant="dark" className="p-6 bg-linear-to-br from-navy-900 to-navy-800 text-cream-100">
            <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-gold-400" />
              Dine tall
            </h3>
            
            <div className="space-y-4">
              {/* Work/Free days */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/10 rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold">{stats.workDays}</div>
                  <div className="text-xs text-cream-100/70">dager på jobb</div>
                </div>
                <div className="bg-white/10 rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold text-emerald-400">{stats.freeDays}</div>
                  <div className="text-xs text-cream-100/70">dager fri</div>
                </div>
              </div>

              {/* HOURS - the fair metric */}
              <div className="bg-navy-800 rounded-xl p-4 border border-gold-400/30">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-cream-100/80 text-sm">Timer per år</span>
                  <span className="text-xl font-bold text-cream-50">
                    {stats.hoursPerYear.toLocaleString('nb-NO')} t
                  </span>
                </div>
                <div className="text-xs text-cream-100/60">
                  ({stats.workDays} dager × {hoursPerDay} timer)
                </div>
              </div>

              {/* Hourly rate */}
              <div className="bg-gold-500/20 rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <span className="text-cream-100/80">Timelønn</span>
                  <span className="text-xl font-bold text-gold-400">
                    {stats.hourlyRate.toLocaleString('nb-NO', { maximumFractionDigits: 0 })} kr/t
                  </span>
                </div>
              </div>

              {/* Free weeks */}
              <div className="bg-emerald-500/20 rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <span className="text-cream-100/80">Frie uker per år</span>
                  <span className="text-xl font-bold text-emerald-400">
                    {stats.freeWeeksPerYear} uker
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right: Visual Calendar */}
        <div className="lg:col-span-7">
          <Card className="p-6 h-full bg-white">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-navy-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-navy-500" />
                Ditt år visualisert
              </h3>
              <div className="flex gap-4 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-gold-400" />
                  <span className="text-slate-600">På jobb</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-slate-600">Hjemme</span>
                </div>
              </div>
            </div>

            {/* Calendar Grid - Hidden on mobile for better UX */}
            <div className="hidden md:grid grid-cols-12 gap-1 mb-6">
              {Array.from({ length: 12 }).map((_, monthIdx) => (
                <div key={monthIdx} className="flex flex-col gap-0.5">
                  <div className="text-xs text-center text-slate-400 font-medium mb-1">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'][monthIdx]}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    {Array.from({ length: 31 }).map((_, dayIdx) => {
                      const dayOfYear = monthIdx * 30 + dayIdx;
                      if (dayOfYear >= 365) return null;
                      const data = calendarData[dayOfYear];
                      return (
                        <div
                          key={dayIdx}
                          className={cn(
                            "w-full h-2.5 rounded-sm transition-colors",
                            data?.isWork ? "bg-gold-400" : "bg-emerald-400"
                          )}
                          title={`Dag ${dayOfYear + 1}: ${data?.isWork ? 'På jobb' : 'Fri'}`}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile: Simplified visual representation */}
            <div className="md:hidden mb-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gold-100 rounded-xl p-4 text-center">
                  <Ship className="w-6 h-6 text-gold-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gold-700">{stats.workDays}</div>
                  <div className="text-sm text-gold-600">dager på jobb</div>
                </div>
                <div className="bg-emerald-100 rounded-xl p-4 text-center">
                  <Home className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-emerald-700">{stats.freeDays}</div>
                  <div className="text-sm text-emerald-600">dager fri</div>
                </div>
              </div>
              <p className="text-xs text-slate-500 text-center">
                Rotasjon: {currentRotation.daysOn} dager på / {currentRotation.daysOff} dager fri
              </p>
            </div>

            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600">Arbeidsfordeling</span>
                <span className="font-bold text-navy-900">{stats.workPercent}% jobb / {100 - stats.workPercent}% fri</span>
              </div>
              <div className="h-4 bg-slate-100 rounded-full overflow-hidden flex">
                <div 
                  className="bg-gold-400 transition-all duration-500"
                  style={{ width: `${stats.workPercent}%` }}
                />
                <div 
                  className="bg-emerald-400 transition-all duration-500"
                  style={{ width: `${100 - stats.workPercent}%` }}
                />
              </div>
            </div>

            {/* Comparison with office job */}
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-slate-500" />
                <span className="font-medium text-navy-900">Sammenlign med kontorjobb</span>
              </div>
              <ChevronDown className={cn("w-5 h-5 text-slate-500 transition-transform", showAdvanced && "rotate-180")} />
            </button>

            {showAdvanced && (
              <div className="mt-4 p-4 bg-linear-to-r from-slate-50 to-gold-50 rounded-xl border border-slate-200">
                <p className="text-sm font-bold text-navy-900 mb-3">Rettferdig sammenligning (basert på TIMER):</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-4">
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-slate-500 text-xs mb-2">Kontorjobb (7,5t/dag)</p>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>Timer/år:</span>
                        <span className="font-bold">{OFFICE_HOURS_PER_YEAR.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Dager:</span>
                        <span className="font-bold">{OFFICE_WORK_DAYS}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fridager:</span>
                        <span className="font-bold">{OFFICE_FREE_DAYS}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gold-100 rounded-lg p-3">
                    <p className="text-gold-700 text-xs mb-2">Din turnus ({hoursPerDay}t/dag)</p>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>Timer/år:</span>
                        <span className="font-bold">{stats.hoursPerYear.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Dager:</span>
                        <span className="font-bold">{stats.workDays}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fridager:</span>
                        <span className="font-bold text-emerald-600">{stats.freeDays}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* The verdict */}
                <div className={cn(
                  "rounded-lg p-3 text-sm",
                  stats.hoursDifference > 100 ? "bg-amber-100 border border-amber-300" : 
                  stats.hoursDifference < -100 ? "bg-emerald-100 border border-emerald-300" :
                  "bg-blue-100 border border-blue-300"
                )}>
                  {stats.hoursDifference > 100 ? (
                    <p className="text-amber-800">
                      ⚠️ Du jobber <strong>{stats.hoursDifference.toLocaleString()} timer mer</strong> per år enn en kontorjobb ({stats.hoursDifferencePercent}% mer). 
                      Men du får <strong>{stats.extraFreeDays} ekstra fridager</strong> i sammenhengende perioder!
                    </p>
                  ) : stats.hoursDifference < -100 ? (
                    <p className="text-emerald-800">
                      ✅ Du jobber <strong>{Math.abs(stats.hoursDifference).toLocaleString()} timer mindre</strong> per år enn en kontorjobb, 
                      OG du får <strong>{stats.extraFreeDays} ekstra fridager</strong>!
                    </p>
                  ) : (
                    <p className="text-blue-800">
                      ℹ️ Omtrent likt antall timer som kontorjobb, men du får <strong>{stats.extraFreeDays} ekstra fridager</strong> i lange, sammenhengende perioder.
                    </p>
                  )}
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}


