"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timeoutId = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timeoutId);
    }
  }, []);

  const handleConsent = (accepted: boolean) => {
    setIsClosing(true);
    setTimeout(() => {
      localStorage.setItem("cookie-consent", accepted ? "accepted" : "declined");
      // Dispatch event so TrackingScripts component can react
      window.dispatchEvent(new Event('cookie-consent-change'));
      setIsVisible(false);
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 transition-all duration-300 ${
        isClosing ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
      }`}
    >
      <div className="max-w-4xl mx-auto">
      <div className="bg-navy-900 border border-gold-400/20 rounded-2xl shadow-2xl shadow-black/20 overflow-hidden">
          
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              {/* Icon */}
              <div className="hidden md:flex w-14 h-14 rounded-xl bg-gold-400/10 border border-gold-400/20 items-center justify-center shrink-0">
                <svg className="w-7 h-7 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-cream-50 mb-2">
                    Vi bruker informasjonskapsler
                  </h3>
                  <p className="text-cream-50 text-sm leading-relaxed">
                    Vi bruker nødvendige cookies for sikkerhet og funksjonalitet.
                    Plausible Analytics samler anonyme data uten cookies.
                    Med samtykke kan vi bruke markedsføringscookies for å vise deg relevante annonser.{" "}
                    <Link 
                      href="/personvern" 
                      className="text-gold-400 hover:text-gold-300 underline underline-offset-2 transition-colors"
                    >
                      Les vår personvernerklæring
                    </Link>
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => handleConsent(true)}
                    className="px-6 py-2.5 bg-gold-500 hover:bg-gold-400 text-navy-900 font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-gold-500/20 text-sm"
                  >
                    Godta alle
                  </button>
                  <button
                    onClick={() => handleConsent(false)}
                    className="px-6 py-2.5 bg-transparent hover:bg-cream-50/5 text-cream-100 font-medium rounded-lg border border-cream-100/20 hover:border-cream-100/40 transition-all duration-200 text-sm"
                  >
                    Kun nødvendige
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


