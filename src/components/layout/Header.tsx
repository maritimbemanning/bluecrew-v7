"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, ChevronDown } from "@/components/icons";
import MobileMenu from "./MobileMenu";
import LoginButton from "@/components/auth/LoginButton";
import UserMenu from "@/components/auth/UserMenu";
import type { DropdownNavItem } from "@/types";

// Dropdown navigation structure
const mainNavigation: DropdownNavItem[] = [
  {
    label: "Rederier og Bedrifter",
    items: [
      { label: "Oversikt", href: "/rederi" },
      { label: "Våre Tjenester", href: "/tjenester" },
      { label: "Oppdrett og Akvakultur", href: "/rederi/havbruk" },
      { label: "Bli partner", href: "/rederi/partner" },
      { label: "Kontakt oss", href: "/rederi/kontakt-oss" },
    ],
  },
  {
    label: "Sjøfolk og Arbeidstakere",
    items: [
      { label: "Meld interesse", href: "/meld-interesse" },
      { label: "Ledige stillinger", href: "/stillinger" },
      { label: "Lønnsoversikt", href: "/lonn" },
      { label: "Karriereveiledning", href: "/karriere" },
      { label: "Turnuskalkulator", href: "/turnus" },
      { label: "Maritim ordbok", href: "/ordbok" },
    ],
  },
  {
    label: "Offshore",
    items: [
      { label: "Alle stillinger", href: "/kampanje/offshore" },
      { label: "Elektriker", href: "/kampanje/elektriker" },
      { label: "Riggere", href: "/kampanje/riggere" },
      { label: "ROV-Pilot", href: "/kampanje/rov" },
      { label: "ETO", href: "/kampanje/eto" },
      { label: "Sveiser", href: "/kampanje/sveiser" },
      { label: "Mekaniker", href: "/kampanje/mekaniker" },
    ],
  },
  {
    label: "Hvorfor Bluecrew?",
    items: [
      { label: "Om oss", href: "/om-oss" },
      { label: "Trygghet og etterlevelse", href: "/trygghet" },
      { label: "Ofte stilte spørsmål", href: "/faq" },
      { label: "Nyheter", href: "/#aktuelt" },
      { label: "Crew-historier", href: "/crew" },
      { label: "Kontakt", href: "/kontakt" },
    ],
  },
];

interface HeaderProps {
  user?: {
    candidateId: string;
    name: string;
    email: string;
  } | null;
}

// Dropdown component - HOVER based, not click
function NavDropdown({
  item,
  scrolled,
}: {
  item: DropdownNavItem;
  scrolled: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`group flex items-center gap-1 text-sm font-medium transition-colors py-2 ${
          scrolled
            ? 'text-navy-900 hover:text-gold-600'
            : 'text-cream-100/90 hover:text-cream-50'
        }`}
      >
        {item.label}
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 pt-2">
          <div className="w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2">
            {item.items.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2.5 text-sm font-medium text-navy-900 hover:bg-gold-50 hover:text-gold-600 hover:translate-x-1 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Header({ user }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white shadow-md py-3'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              {scrolled ? (
                /* Full logo after scroll */
                <Image
                  src="/images/fullogo_transparent.png"
                  alt="Bluecrew"
                  width={160}
                  height={40}
                  loading="eager"
                  className="h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                />
              ) : (
                /* Icon + text before scroll */
                <>
                  <div className="relative w-10 h-10 transition-transform duration-200 group-hover:scale-105">
                    <Image
                      src="/icon.png"
                      alt="Bluecrew"
                      width={40}
                      height={40}
                      loading="eager"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="ml-3 text-4xl font-medium tracking-tight bg-clip-text text-transparent bg-linear-to-r from-cream-50 to-gold-200">
                    Bluecrew
                  </span>
                </>
              )}
            </Link>

            {/* Desktop Navigation - Dropdowns */}
            <nav className="hidden xl:flex items-center gap-8" aria-label="Hovednavigasjon">
              {mainNavigation.map((item) => (
                <NavDropdown
                  key={item.label}
                  item={item}
                  scrolled={scrolled}
                />
              ))}
            </nav>

            {/* Utility Nav: Kalkulator + Turnus + Auth */}
            <div className="hidden lg:flex items-center gap-2">
              <Link
                href="/lonn/kalkulator"
                className={`text-sm font-medium transition-colors px-3 py-2 rounded-lg flex items-center gap-1.5 ${
                  scrolled
                    ? 'text-navy-900 hover:text-navy-900 hover:bg-gold-50'
                    : 'text-cream-100/80 hover:text-cream-50 hover:bg-gold-400/10'
                }`}
              >
                <svg className="w-4 h-4 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Kalkulator
              </Link>
              <Link
                href="/turnus"
                className={`text-sm font-medium transition-colors px-3 py-2 rounded-lg flex items-center gap-1.5 ${
                  scrolled
                    ? 'text-navy-900 hover:text-navy-900 hover:bg-gold-50'
                    : 'text-cream-100/80 hover:text-cream-50 hover:bg-gold-400/10'
                }`}
              >
                <svg className="w-4 h-4 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Turnus
              </Link>
              
              <div className={`w-px h-6 mx-1 ${scrolled ? 'bg-slate-200' : 'bg-gold-400/20'}`} />
              
              {user ? (
                <UserMenu user={{ name: user.name, email: user.email }} />
              ) : (
                <LoginButton 
                  variant="ghost" 
                  className={scrolled 
                    ? "text-navy-800 hover:text-navy-900 hover:bg-slate-100" 
                    : "text-cream-100/80 hover:text-cream-50 hover:bg-gold-400/10"
                  } 
                />
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                scrolled
                  ? 'text-navy-800 hover:text-navy-900 hover:bg-slate-50'
                  : 'text-cream-100 hover:text-cream-50 hover:bg-gold-400/10'
              }`}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Åpne meny"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navigation={mainNavigation}
        user={user}
      />
    </>
  );
}


