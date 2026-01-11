'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

// Meta Pixel ID
const META_PIXEL_ID = '2104566860356121';

/**
 * GDPR-compliant tracking scripts loader.
 * Meta Pixel is loaded only after user consent.
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

  // Don't render anything if no consent
  if (!hasConsent) return null;

  return (
    <>
      {/* Meta Pixel */}
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}


