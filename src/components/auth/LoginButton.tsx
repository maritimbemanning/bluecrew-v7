'use client';

import { cn } from '@/lib/utils';

interface LoginButtonProps {
  returnTo?: string;
  className?: string;
  variant?: 'primary' | 'outline' | 'ghost';
}

/**
 * Vipps Login Button
 *
 * Redirects to /api/vipps/start to initiate OAuth flow.
 * Optional returnTo parameter for post-login redirect.
 */
export default function LoginButton({
  returnTo,
  className,
  variant = 'primary',
}: LoginButtonProps) {
  const href = returnTo
    ? `/api/vipps/start?returnTo=${encodeURIComponent(returnTo)}`
    : '/api/vipps/start';

  return (
    <a
      href={href}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all',
        variant === 'primary' && [
          'bg-[#FF5B24] text-white',
          'hover:bg-[#E54E1B]',
          'focus:outline-none focus:ring-2 focus:ring-[#FF5B24] focus:ring-offset-2',
        ],
        variant === 'outline' && [
          'border-2 border-[#FF5B24] text-[#FF5B24]',
          'hover:bg-[#FF5B24] hover:text-white',
          'focus:outline-none focus:ring-2 focus:ring-[#FF5B24] focus:ring-offset-2',
        ],
        variant === 'ghost' && [
          'text-current bg-transparent',
          'hover:bg-white/10',
          'focus:outline-none focus:ring-2 focus:ring-white/20',
        ],
        className
      )}
    >
      {/* Vipps Logo */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 5.516c-.281.789-.563 1.563-.844 2.32-.281.758-.562 1.477-.843 2.157h-.047c-.281-.68-.562-1.399-.843-2.157-.282-.757-.563-1.531-.844-2.32l-1.97-5.516h-2.18l3.586 9.558h2.508l3.586-9.558h-2.14z" />
      </svg>
      Logg inn
    </a>
  );
}


