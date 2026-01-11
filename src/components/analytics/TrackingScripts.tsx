'use client';

import { useEffect, useState } from 'react';

/**
 * GDPR-compliant tracking scripts loader.
 * Currently empty as we rely on privacy-friendly analytics (Plausible)
 * loaded in layout.tsx.
 * 
 * Keep this component structure if you need to add marketing pixels later
 * that require explicit consent.
 */
export default function TrackingScripts() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      const consent = localStorage.getItem('cookie-consent');
      setHasConsent(consent === 'accepted');
    };

    checkConsent();
    window.addEventListener('storage', checkConsent);
    const handleConsentChange = () => checkConsent();
    window.addEventListener('cookie-consent-change', handleConsentChange);

    return () => {
      window.removeEventListener('storage', checkConsent);
      window.removeEventListener('cookie-consent-change', handleConsentChange);
    };
  }, []);

  // Don't render anything if no consent (or if no scripts are active)
  if (!hasConsent) return null;

  return (
    <>
      {/* 
        Add tracking scripts here later if needed (e.g. Meta Pixel, LinkedIn Insight).
        Remember to only load them if hasConsent is true.
      */}
    </>
  );
}


