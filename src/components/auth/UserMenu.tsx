'use client';

import { useState, useRef, useEffect } from 'react';
import { User, LogOut, Settings, FileText } from '@/components/icons';
import { cn } from '@/lib/utils';

interface UserMenuProps {
  user: {
    name: string;
    email: string;
  };
}

/**
 * User Menu Dropdown
 *
 * Shows user name and provides links to profile, applications, and logout.
 */
export default function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menu on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Get initials from name
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 rounded-full p-1 pr-3',
          'bg-slate-100 hover:bg-slate-200 transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2'
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {/* Avatar */}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-500 text-white text-sm font-medium">
          {initials}
        </div>
        <span className="text-sm font-medium text-navy-900 hidden sm:block">
          {user.name.split(' ')[0]}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={cn(
            'absolute right-0 mt-2 w-56 origin-top-right',
            'rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5',
            'focus:outline-none z-50'
          )}
          role="menu"
          aria-orientation="vertical"
        >
          {/* User Info */}
          <div className="px-4 py-3 border-b border-slate-200">
            <p className="text-sm font-medium text-navy-900">{user.name}</p>
            <p className="text-xs text-slate-600 truncate">{user.email}</p>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <a
              href="/profil"
              className="flex items-center gap-2 px-4 py-2 text-sm text-navy-900 hover:bg-slate-50"
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              <User className="h-4 w-4 text-slate-500" />
              Min profil
            </a>
            <a
              href="/mine-soknader"
              className="flex items-center gap-2 px-4 py-2 text-sm text-navy-900 hover:bg-slate-50"
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              <FileText className="h-4 w-4 text-slate-500" />
              Mine søknader
            </a>
            <a
              href="/profil/rediger"
              className="flex items-center gap-2 px-4 py-2 text-sm text-navy-900 hover:bg-slate-50"
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="h-4 w-4 text-slate-500" />
              Innstillinger
            </a>
          </div>

          {/* Logout */}
          <div className="py-1 border-t border-slate-200">
            <a
              href="/logg-ut"
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              <LogOut className="h-4 w-4" />
              Logg ut
            </a>
          </div>
        </div>
      )}
    </div>
  );
}


