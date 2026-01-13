import { NextRequest, NextResponse } from 'next/server';

// IndexNow key - must match the filename in /public
const INDEXNOW_KEY = '2e1cef9560304b3279a0a8b7101c13b3539560c2bae7077700380f741fb39d0f';

// Search engines that support IndexNow
const SEARCH_ENGINES = [
  'api.indexnow.org', // Submits to all participating engines
  // 'www.bing.com',  // Optional: Direct submission to Bing
  // 'search.yandex.com', // Optional: Direct submission to Yandex
];

/**
 * POST /api/indexnow
 * Submit URLs to IndexNow for instant indexing
 * 
 * Body: { urls: string[] } - Array of URLs to submit (max 10,000)
 * 
 * Example:
 * POST /api/indexnow
 * { "urls": ["https://bluecrew.no/stillinger/new-job"] }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { urls } = body;

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json(
        { error: 'Invalid request. Provide an array of URLs.' },
        { status: 400 }
      );
    }

    if (urls.length > 10000) {
      return NextResponse.json(
        { error: 'Too many URLs. Maximum 10,000 per request.' },
        { status: 400 }
      );
    }

    // Validate URLs
    const validUrls = urls.filter((url) => {
      try {
        const parsed = new URL(url);
        return parsed.hostname === 'bluecrew.no';
      } catch {
        return false;
      }
    });

    if (validUrls.length === 0) {
      return NextResponse.json(
        { error: 'No valid URLs found. All URLs must be from bluecrew.no' },
        { status: 400 }
      );
    }

    // Submit to IndexNow
    const results = await Promise.allSettled(
      SEARCH_ENGINES.map(async (engine) => {
        const response = await fetch(`https://${engine}/indexnow`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify({
            host: 'bluecrew.no',
            key: INDEXNOW_KEY,
            urlList: validUrls,
          }),
        });

        if (!response.ok) {
          throw new Error(`${engine} returned ${response.status}`);
        }

        return { engine, status: response.status };
      })
    );

    // Check results
    const successful = results.filter((r) => r.status === 'fulfilled');
    const failed = results.filter((r) => r.status === 'rejected');

    return NextResponse.json({
      success: true,
      submitted: validUrls.length,
      engines: {
        successful: successful.length,
        failed: failed.length,
      },
      urls: validUrls,
    });
  } catch (error) {
    console.error('IndexNow submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit URLs to IndexNow' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/indexnow
 * Submit a single URL via query parameter
 * 
 * Example: /api/indexnow?url=https://bluecrew.no/stillinger/new-job
 */
export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');

  if (!url) {
    return NextResponse.json(
      { error: 'Missing url parameter' },
      { status: 400 }
    );
  }

  // Validate URL
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== 'bluecrew.no') {
      return NextResponse.json(
        { error: 'URL must be from bluecrew.no' },
        { status: 400 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: 'Invalid URL format' },
      { status: 400 }
    );
  }

  // Submit to IndexNow
  try {
    const results = await Promise.allSettled(
      SEARCH_ENGINES.map(async (engine) => {
        const response = await fetch(
          `https://${engine}/indexnow?url=${encodeURIComponent(url)}&key=${INDEXNOW_KEY}`,
          { method: 'GET' }
        );

        if (!response.ok) {
          throw new Error(`${engine} returned ${response.status}`);
        }

        return { engine, status: response.status };
      })
    );

    const successful = results.filter((r) => r.status === 'fulfilled');
    const failed = results.filter((r) => r.status === 'rejected');

    return NextResponse.json({
      success: true,
      url,
      engines: {
        successful: successful.length,
        failed: failed.length,
      },
    });
  } catch (error) {
    console.error('IndexNow submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit URL to IndexNow' },
      { status: 500 }
    );
  }
}
