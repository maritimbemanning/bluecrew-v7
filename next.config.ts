import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  // Optimize package imports (tree-shaking)
  experimental: {
    optimizePackageImports: [
      '@supabase/supabase-js',
      '@supabase/ssr',
      'react-hook-form',
      'zod',
      '@hookform/resolvers',
      'jose',
      '@upstash/redis',
      'lucide-react', // Icon library tree-shaking
    ],
    // Remove unused code more aggressively
    optimizeCss: false, // Disabled - Tailwind v4 handles CSS optimization, this causes opacity purging
    // Reduce client-side JavaScript
    webpackBuildWorker: true,
  },

  // Compiler optimizations
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Disable legacy browser polyfills - target only modern browsers
  // This removes polyfills for Array.prototype.at, Array.prototype.flat, etc.
  transpilePackages: [],
  
  // Disable source maps in production to reduce bundle size
  productionBrowserSourceMaps: false,
  
  // Minimize output
  compress: true,
  poweredByHeader: false,

  // Enable Turbopack with optimizations
  turbopack: {
    resolveAlias: {
      // Pre-resolve common paths
      '@/components': './src/components',
      '@/lib': './src/lib',
      '@/types': './src/types',
      '@/hooks': './src/hooks',
    },
  },

  // Image optimization
  images: {
    // Enable Next.js Image Optimization for local images
    unoptimized: false,
    formats: ['image/webp', 'image/avif'], // Prefer modern formats
    qualities: [75, 90],
    // Allow external images from trusted sources
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.kyst.no',
      },
    ],
    // Minimize image processing
    minimumCacheTTL: 31536000,
    // Optimize for mobile devices first (mobile-first approach)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Enable dangerouslyAllowSVG for logo/icons
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Security Headers
  async headers() {
    // In development, disable CSP entirely to avoid issues with HMR
    const isDev = process.env.NODE_ENV === 'development';
    
    const securityHeaders = [
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
      { key: 'X-XSS-Protection', value: '1; mode=block' },
      // HSTS - enabled for all environments (Vercel handles this well)
      { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
    ];

    // Only add CSP in production - Next.js HMR needs inline scripts in dev
    if (!isDev) {
      securityHeaders.push({
        key: 'Content-Security-Policy',
        value: [
          "default-src 'self'",
          // 'unsafe-inline' 'unsafe-eval' required for Next.js to work properly
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://plausible.io https://connect.facebook.net",
          "style-src 'self' 'unsafe-inline'", // Required for Next.js CSS-in-JS
          "img-src 'self' data: https: blob:",
          "font-src 'self' data:",
          "connect-src 'self' https://*.supabase.co https://plausible.io wss://*.supabase.co https://www.google.com https://www.facebook.com",
          "frame-ancestors 'none'",
          "base-uri 'self'",
          "form-action 'self'",
          "upgrade-insecure-requests", // Force HTTPS
        ].join('; '),
      });
    }

    return [
      {
        // Apply to all routes except static files
        source: '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
        headers: securityHeaders,
      },
      {
        // Cache static assets aggressively
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache images for 1 year
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache optimized images
        source: '/_next/image/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // 301 Redirects for SEO migration
  async redirects() {
    return [
      // Old URLs from v2 → New URLs
      {
        source: '/jobbsoker',
        destination: '/sjofolk',
        permanent: true,
      },
      {
        source: '/jobbsoker/registrer',
        destination: '/meld-interesse',
        permanent: true,
      },
      {
        source: '/sjofolk/registrer',
        destination: '/meld-interesse',
        permanent: true,
      },
      {
        source: '/kunde',
        destination: '/rederi',
        permanent: true,
      },
      {
        source: '/kunde/registrer-behov',
        destination: '/rederi/behov',
        permanent: true,
      },
      {
        source: '/kunde/hva-vi-hjelper-med',
        destination: '/rederi/bemanning',
        permanent: true,
      },
      {
        source: '/kunde/hva-vi-hjelper-med/',
        destination: '/rederi/bemanning',
        permanent: true,
      },
      // Note: /lonn/oversikt redirect handled by page.tsx with proper noindex
      // Common typos and variations
      {
        source: '/kontakt-oss',
        destination: '/kontakt',
        permanent: true,
      },
      {
        source: '/omoss',
        destination: '/om-oss',
        permanent: true,
      },
      {
        source: '/om',
        destination: '/om-oss',
        permanent: true,
      },
      {
        source: '/jobb',
        destination: '/stillinger',
        permanent: true,
      },
      {
        source: '/ledige-stillinger',
        destination: '/stillinger',
        permanent: true,
      },
      {
        source: '/blogg',
        destination: '/crew',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/crew',
        permanent: true,
      },
      {
        source: '/aktuelt',
        destination: '/crew',
        permanent: true,
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
