import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Always allow indexing on production (bluecrew.no)
  // This runs at build time on Vercel, so we hardcode production behavior
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/images/fullogo_transparent.png',
        ],
      },
    ],
    sitemap: 'https://bluecrew.no/sitemap.xml',
  };
}
