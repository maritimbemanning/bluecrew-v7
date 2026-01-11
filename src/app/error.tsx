'use client';

import { useEffect } from 'react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { AlertTriangle, RefreshCw } from '@/components/icons';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In production, errors should be sent to an error tracking service (e.g., Sentry)
    // For now, we only log in development to prevent information leakage
    if (process.env.NODE_ENV === 'development') {
      console.error('Application error:', error);
    }
    // TODO: Add Sentry or similar error tracking for production
    // Sentry.captureException(error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50">
      <Container size="sm">
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>

          <h1 className="text-2xl md:text-3xl font-medium text-navy-900 mb-4">
            Noe gikk galt
          </h1>

          <p className="text-slate-600 mb-8 max-w-md mx-auto">
            Vi beklager, men det oppstod en uventet feil. Vennligst pr&oslash;v igjen
            eller kontakt oss hvis problemet vedvarer.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={reset}
              className="bg-navy-900 hover:bg-navy-800 text-white"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Pr&oslash;v igjen
            </Button>

            <Button
              variant="outline"
              onClick={() => (window.location.href = '/')}
            >
              G&aring; til forsiden
            </Button>
          </div>

          {error.digest && (
            <p className="mt-8 text-sm text-slate-400">
              Feilreferanse: {error.digest}
            </p>
          )}
        </div>
      </Container>
    </main>
  );
}


