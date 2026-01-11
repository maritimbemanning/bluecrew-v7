'use client';

import Link from 'next/link';
import { ChevronRight, Home } from '@/components/icons';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /** Show home icon instead of "Hjem" text */
  showHomeIcon?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Visual Breadcrumbs component for navigation
 * Use together with SchemaMarkup breadcrumb for SEO
 */
export default function Breadcrumbs({ 
  items, 
  showHomeIcon = true,
  className = '' 
}: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`text-sm ${className}`}
    >
      <ol className="flex items-center flex-wrap gap-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isFirst = index === 0;

          return (
            <li key={item.url} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-slate-400 mx-1" aria-hidden="true" />
              )}
              
              {isLast ? (
                <span 
                  className="text-slate-600 font-medium"
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="text-slate-500 hover:text-gold-600 transition-colors flex items-center gap-1"
                >
                  {isFirst && showHomeIcon ? (
                    <>
                      <Home className="w-4 h-4" aria-hidden="true" />
                      <span className="sr-only">{item.name}</span>
                    </>
                  ) : (
                    item.name
                  )}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}


