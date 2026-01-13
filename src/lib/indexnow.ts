/**
 * IndexNow utility for instant search engine indexing
 * 
 * Usage:
 * - Call submitToIndexNow() after creating/updating content
 * - Automatically notifies search engines of changes
 */

const INDEXNOW_API = '/api/indexnow';

/**
 * Submit a single URL to IndexNow
 */
export async function submitUrlToIndexNow(url: string): Promise<boolean> {
  try {
    const response = await fetch(`${INDEXNOW_API}?url=${encodeURIComponent(url)}`, {
      method: 'GET',
    });
    return response.ok;
  } catch (error) {
    console.error('Failed to submit URL to IndexNow:', error);
    return false;
  }
}

/**
 * Submit multiple URLs to IndexNow (max 10,000)
 */
export async function submitUrlsToIndexNow(urls: string[]): Promise<boolean> {
  try {
    const response = await fetch(INDEXNOW_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ urls }),
    });
    return response.ok;
  } catch (error) {
    console.error('Failed to submit URLs to IndexNow:', error);
    return false;
  }
}

/**
 * Submit all sitemap URLs to IndexNow
 * Useful for initial setup or bulk re-indexing
 */
export async function submitSitemapToIndexNow(): Promise<boolean> {
  try {
    // Fetch sitemap
    const response = await fetch('https://bluecrew.no/sitemap.xml');
    const xml = await response.text();
    
    // Extract URLs from sitemap
    const urlMatches = xml.matchAll(/<loc>(.*?)<\/loc>/g);
    const urls = Array.from(urlMatches, (match) => match[1]);
    
    if (urls.length === 0) {
      console.error('No URLs found in sitemap');
      return false;
    }
    
    // Submit in batches of 10,000
    const batchSize = 10000;
    for (let i = 0; i < urls.length; i += batchSize) {
      const batch = urls.slice(i, i + batchSize);
      await submitUrlsToIndexNow(batch);
    }
    
    return true;
  } catch (error) {
    console.error('Failed to submit sitemap to IndexNow:', error);
    return false;
  }
}
