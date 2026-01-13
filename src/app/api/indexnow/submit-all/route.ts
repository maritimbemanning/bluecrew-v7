import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// IndexNow key
const INDEXNOW_KEY = '2e1cef9560304b3279a0a8b7101c13b3539560c2bae7077700380f741fb39d0f';

/**
 * POST /api/indexnow/submit-all
 * Submit all important URLs to IndexNow
 * 
 * This is useful for:
 * - Initial setup
 * - After major content updates
 * - Periodic re-indexing
 */
export async function POST() {
  try {
    const baseUrl = 'https://bluecrew.no';
    
    // Static pages
    const staticPages = [
      '',
      '/rederi',
      '/rederi/havbruk',
      '/rederi/bemanning',
      '/rederi/rekruttering',
      '/rederi/behov',
      '/rederi/kontakt-oss',
      '/rederi/partner',
      '/rederi/bli-med',
      '/sjofolk',
      '/stillinger',
      '/meld-interesse',
      '/lonn',
      '/lonn/kaptein',
      '/lonn/styrmann',
      '/lonn/maskinist',
      '/lonn/eto',
      '/lonn/matros',
      '/lonn/kokk',
      '/lonn/kalkulator',
      '/karriere',
      '/karriere/kaptein',
      '/karriere/styrmann',
      '/karriere/maskinist',
      '/karriere/eto',
      '/karriere/matros',
      '/karriere/kokk',
      '/turnus',
      '/faq',
      '/ordbok',
      '/om-oss',
      '/kontakt',
      '/crew',
      '/trygghet',
      '/tjenester',
      '/crew/zeonaqua',
      '/kampanje/offshore',
      '/personvern',
      '/vilkar',
    ];

    // Crew articles
    const crewArticles = [
      'fra-kadett-til-kaptein',
      'min-forste-offshore-tur',
      'livet-som-matros-pa-bronnbat',
      'hvordan-jeg-ble-maskinist',
      'kvinne-i-maritim-sektor',
      'offshore-vs-havbruk-min-erfaring',
    ];

    // Fetch active job postings
    let jobPostings: string[] = [];
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (supabaseUrl && supabaseAnonKey) {
        const supabase = createClient(supabaseUrl, supabaseAnonKey, {
          auth: { persistSession: false },
        });
        const { data } = await supabase
          .from('job_postings')
          .select('slug')
          .eq('status', 'active');
        jobPostings = data?.map((job) => `/stillinger/${job.slug}`) || [];
      }
    } catch (error) {
      console.error('Failed to fetch job postings:', error);
    }

    // Build URL list
    const allUrls = [
      ...staticPages.map((path) => `${baseUrl}${path}`),
      ...crewArticles.map((slug) => `${baseUrl}/crew/${slug}`),
      ...jobPostings.map((path) => `${baseUrl}${path}`),
    ];

    // Submit to IndexNow
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        host: 'bluecrew.no',
        key: INDEXNOW_KEY,
        urlList: allUrls,
      }),
    });

    if (!response.ok) {
      throw new Error(`IndexNow returned ${response.status}`);
    }

    return NextResponse.json({
      success: true,
      submitted: allUrls.length,
      breakdown: {
        static: staticPages.length,
        crew: crewArticles.length,
        jobs: jobPostings.length,
      },
    });
  } catch (error) {
    console.error('Failed to submit all URLs:', error);
    return NextResponse.json(
      { error: 'Failed to submit URLs to IndexNow' },
      { status: 500 }
    );
  }
}
