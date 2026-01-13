'use client';

import { useState } from 'react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';

export default function AdminIndexNowPage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch(`/api/indexnow?url=${encodeURIComponent(url)}`);
      const data = await response.json();

      if (response.ok) {
        setResult(data);
        setUrl(''); // Clear input on success
      } else {
        setError(data.error || 'Failed to submit URL');
      }
    } catch (err) {
      setError('Network error - please try again');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAll = async () => {
    if (!confirm('Submit all sitemap URLs to IndexNow? This will notify search engines about all your pages.')) {
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/indexnow/submit-all', {
        method: 'POST',
      });
      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || 'Failed to submit URLs');
      }
    } catch (err) {
      setError('Network error - please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section className="py-12">
      <Container>
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">IndexNow Admin</h1>
          <p className="text-slate-600 mb-8">
            Submit URLs to search engines for instant indexing
          </p>

          {/* Single URL Form */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Submit Single URL</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-slate-700 mb-2">
                  URL to submit
                </label>
                <input
                  type="url"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://bluecrew.no/stillinger/ny-jobb"
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  required
                />
                <p className="mt-1 text-sm text-slate-500">
                  Enter the full URL of the page you want to submit
                </p>
              </div>

              <Button
                type="submit"
                disabled={loading || !url}
                className="w-full"
              >
                {loading ? 'Submitting...' : 'Submit to IndexNow'}
              </Button>
            </form>
          </div>

          {/* Submit All Button */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Submit All URLs</h2>
            <p className="text-slate-600 mb-4">
              Submit all pages from your sitemap to IndexNow. Use this after major updates or periodically to re-index your site.
            </p>
            <Button
              onClick={handleSubmitAll}
              disabled={loading}
              variant="secondary"
              className="w-full"
            >
              {loading ? 'Submitting...' : 'Submit All Sitemap URLs'}
            </Button>
          </div>

          {/* Result Display */}
          {result && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-green-900 mb-2">✅ Success!</h3>
              <pre className="text-sm text-green-800 overflow-x-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-red-900 mb-2">❌ Error</h3>
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {/* Quick Links */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Common URLs to Submit</h3>
            <div className="space-y-2 text-sm">
              <button
                onClick={() => setUrl('https://bluecrew.no/')}
                className="block text-navy-600 hover:text-navy-800 hover:underline"
              >
                Homepage
              </button>
              <button
                onClick={() => setUrl('https://bluecrew.no/stillinger')}
                className="block text-navy-600 hover:text-navy-800 hover:underline"
              >
                Stillinger page
              </button>
              <button
                onClick={() => setUrl('https://bluecrew.no/rederi')}
                className="block text-navy-600 hover:text-navy-800 hover:underline"
              >
                Rederi page
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 text-sm text-slate-600">
            <h3 className="font-semibold text-slate-900 mb-2">When to use this:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>After creating a new job posting</li>
              <li>After updating important content</li>
              <li>After publishing a new crew story</li>
              <li>After making major changes to a page</li>
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
