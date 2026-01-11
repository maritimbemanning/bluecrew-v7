import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const host = process.env.VERCEL_URL || '';
  
  // Block all preview/non-production deployments
  const isPreview = 
    host.includes('vercel.app') || 
    process.env.VERCEL_ENV === 'preview' ||
    process.env.VERCEL_ENV === 'development';

  if (isPreview) {
    return {
      rules: [
        {
          userAgent: '*',
          disallow: '/',
        },
      ],
    };
  }

  // Production only
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
