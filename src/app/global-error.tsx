'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In production, errors should be sent to an error tracking service
    // Only log in development to prevent information leakage in production
    if (process.env.NODE_ENV === 'development') {
      console.error('Global error:', error);
    }
    // TODO: Add Sentry for production error tracking
    // Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="no">
      <body className="bg-white">
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            <h1 className="text-2xl font-medium text-gray-900 mb-4">
              Kritisk feil
            </h1>

            <p className="text-gray-600 mb-8">
              En alvorlig feil har oppst&aring;tt. Vennligst last siden p&aring; nytt.
            </p>

            <button
              onClick={reset}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Last siden p&aring; nytt
            </button>

            {error.digest && (
              <p className="mt-6 text-sm text-gray-400">
                Ref: {error.digest}
              </p>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}


