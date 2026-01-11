"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Instagram, Linkedin, Facebook, User, LogOut, Phone, Calculator, ChevronDown } from "@/components/icons";
import Button from "@/components/ui/Button";
import LoginButton from "@/components/auth/LoginButton";
import type { DropdownNavItem } from "@/types";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: DropdownNavItem[];
  user?: {
    candidateId: string;
    name: string;
    email: string;
  } | null;
}

export default function MobileMenu({
  isOpen,
  onClose,
  navigation,
  user,
}: MobileMenuProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const isOpenRef = useRef(isOpen);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && !shouldRender) {
      const timeoutId = setTimeout(() => {
        setShouldRender(true);
        setIsClosing(false);
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, shouldRender]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShouldRender(false);
      setOpenAccordion(null);
      onClose();
    }, 200);
  };

  const toggleAccordion = (label: string) => {
    setOpenAccordion(openAccordion === label ? null : label);
  };

  if (!shouldRender) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 z-60 lg:hidden backdrop-blur-sm menu-overlay ${isClosing ? 'animate-fade-out' : ''}`}
        onClick={handleClose}
      />

      {/* Menu Panel */}
      <nav
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobilmeny"
        className={`fixed right-0 top-0 bottom-0 w-full max-w-sm bg-navy-900/95 backdrop-blur-xl z-70 shadow-2xl lg:hidden border-l border-white/10 menu-panel ${isClosing ? 'closing' : ''}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gold-400/20">
            <div className="flex items-center gap-2.5">
              <Image
                src="/icon.png"
                alt="Bluecrew"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-lg font-medium text-cream-50 tracking-wide uppercase">
                Bluecrew
              </span>
            </div>
            <button
              onClick={handleClose}
              className="p-2 text-cream-200 hover:text-cream-50 hover:bg-gold-400/10 rounded-lg transition-colors"
              aria-label="Lukk meny"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* User Info (if logged in) */}
          {user && (
            <div className="p-6 border-b border-gold-400/20 bg-gold-400/5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500 text-navy-900 italic font-medium">
                  {user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
                </div>
                <div>
                  <p className="font-medium text-cream-50">{user.name}</p>
                  <p className="text-sm text-cream-200/70">{user.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Links - Accordion Style */}
          <nav className="flex-1 overflow-y-auto p-6 scrollbar-hide">
            <ul className="space-y-2">
              {navigation.map((group) => (
                <li key={group.label}>
                  <button
                    onClick={() => toggleAccordion(group.label)}
                    className="w-full flex items-center justify-between text-lg font-medium text-cream-100/90 hover:text-gold-300 transition-colors py-2"
                  >
                    {group.label}
                    <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${openAccordion === group.label ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {openAccordion === group.label && (
                    <ul className="mt-1 ml-4 space-y-1 border-l border-gold-400/20 pl-4 animate-fade-in">
                      {group.items.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="block text-base text-cream-100/70 hover:text-gold-300 transition-colors py-1.5"
                            onClick={handleClose}
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}

              {/* Ekstra verktøy */}
              <li className="pt-4 border-t border-gold-400/20">
                <Link
                  href="/lonn/kalkulator"
                  className="flex items-center gap-3 text-lg font-medium text-gold-300 hover:text-gold-200 transition-colors py-2"
                  onClick={handleClose}
                >
                  <Calculator className="w-5 h-5" />
                  Lønnskalkulator
                </Link>
              </li>
              <li>
                <Link
                  href="/turnus"
                  className="flex items-center gap-3 text-lg font-medium text-gold-300 hover:text-gold-200 transition-colors py-2"
                  onClick={handleClose}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Turnuskalkulator
                </Link>
              </li>

              {/* User-specific links */}
              {user && (
                <>
                  <li className="pt-4 border-t border-gold-400/20">
                    <Link
                      href="/profil"
                      className="flex items-center gap-3 text-lg font-medium text-cream-100/80 hover:text-gold-300 transition-colors py-2"
                      onClick={handleClose}
                    >
                      <User className="w-5 h-5" />
                      Min profil
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/logg-ut"
                      className="flex items-center gap-3 text-lg font-medium text-red-400 hover:text-red-300 transition-colors py-2"
                      onClick={handleClose}
                    >
                      <LogOut className="w-5 h-5" />
                      Logg ut
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>

          {/* Footer / CTA */}
          <div className="p-6 border-t border-gold-400/20 space-y-4 bg-navy-900/50">
            {/* Call to Actions - different for logged in vs logged out */}
            {user ? (
              <div className="grid grid-cols-2 gap-3">
                <Link href="/profil" onClick={handleClose} className="block w-full">
                  <Button className="w-full bg-gold-500 text-navy-900 hover:bg-gold-400 justify-center">
                    <User className="w-4 h-4 mr-2" />
                    Min profil
                  </Button>
                </Link>
                <Link href="/stillinger" onClick={handleClose} className="block w-full">
                  <Button variant="outline" className="w-full border-gold-400/30 text-cream-50 hover:bg-gold-400/10 justify-center">
                    Se stillinger
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <LoginButton className="w-full text-center justify-center bg-gold-500 text-navy-900 italic hover:bg-gold-400" />
                <Link href="/meld-interesse" onClick={handleClose} className="block w-full">
                  <Button variant="outline" className="w-full border-gold-400/30 text-cream-50 hover:bg-gold-400/10 justify-center">
                    Meld interesse
                  </Button>
                </Link>
              </div>
            )}

            {/* Quick Contact - Phone */}
            <a 
              href="tel:+4777029000" 
              className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-navy-800 border border-gold-400/20 rounded-lg text-gold-300 hover:bg-navy-700 transition-colors shadow-sm"
            >
              <Phone className="w-5 h-5" />
              <span className="font-medium">Ring 77 02 90 00</span>
            </a>

            {/* Socials */}
            <div className="flex items-center justify-center gap-8 pt-2">
              <a href="https://www.facebook.com/profile.php?id=61582845493676" target="_blank" rel="noopener noreferrer" className="text-cream-200/50 hover:text-gold-400 transition-colors" aria-label="Facebook">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com/company/bluecrewas" target="_blank" rel="noopener noreferrer" className="text-cream-200/50 hover:text-gold-400 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://instagram.com/bluecrew.no" target="_blank" rel="noopener noreferrer" className="text-cream-200/50 hover:text-gold-400 transition-colors" aria-label="Instagram">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}


