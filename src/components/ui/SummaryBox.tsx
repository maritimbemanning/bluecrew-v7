'use client';

import { Lightbulb } from '@/components/icons';
import { cn } from '@/lib/utils';

interface SummaryBoxProps {
  title?: string;
  children: React.ReactNode;
  variant?: 'default' | 'gold' | 'emerald';
  className?: string;
}

/**
 * AI-optimized summary box ("Kort oppsummert")
 * 
 * This component is designed to be easily extracted by AI search engines
 * (Google AI Overview, Bing Copilot, Perplexity, ChatGPT).
 * 
 * Features:
 * - Semantic HTML with proper ARIA labels
 * - data-ai-summary attribute for AI crawlers
 * - Schema.org microdata for Answer type
 * - Clear visual hierarchy for scanability
 */
export default function SummaryBox({ 
  title = 'Kort oppsummert', 
  children, 
  variant = 'default',
  className 
}: SummaryBoxProps) {
  const variants = {
    default: 'bg-slate-50 border-slate-200 text-slate-700',
    gold: 'bg-gold-50 border-gold-200 text-slate-700',
    emerald: 'bg-emerald-50 border-emerald-200 text-slate-700',
  };

  const iconVariants = {
    default: 'text-slate-500',
    gold: 'text-gold-600',
    emerald: 'text-emerald-600',
  };

  return (
    <aside 
      className={cn(
        'summary-box rounded-xl border-2 p-6 my-8',
        variants[variant],
        className
      )}
      aria-label="Oppsummering"
      data-ai-summary="true"
      itemScope
      itemType="https://schema.org/Answer"
    >
      <div className="flex items-start gap-3">
        <div className={cn('mt-0.5 shrink-0', iconVariants[variant])}>
          <Lightbulb className="w-5 h-5" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-sm font-medium uppercase tracking-wider mb-2 text-slate-900">
            {title}
          </h2>
          <div 
            className="summary-content text-base leading-relaxed"
            itemProp="text"
          >
            {children}
          </div>
        </div>
      </div>
    </aside>
  );
}


