import Link from 'next/link';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { Home, Search } from '@/components/icons';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50">
      <Container size="sm">
        <div className="text-center py-16">
          <div className="text-8xl font-bold text-navy-600/20 mb-4">404</div>

          <h1 className="text-2xl md:text-3xl font-medium text-navy-900 mb-4">
            Siden finnes ikke
          </h1>

          <p className="text-slate-600 mb-8 max-w-md mx-auto">
            Beklager, vi fant ikke siden du lette etter. Den kan ha blitt
            flyttet eller slettet.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button className="bg-navy-900 hover:bg-navy-800 text-white w-full sm:w-auto">
                <Home className="w-4 h-4 mr-2" />
                Til forsiden
              </Button>
            </Link>

            <Link href="/kontakt">
              <Button variant="outline" className="w-full sm:w-auto">
                <Search className="w-4 h-4 mr-2" />
                Kontakt oss
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-500 mb-4">Populære sider:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link
                href="/sjofolk"
                className="text-sm text-navy-600 hover:text-navy-800 underline"
              >
                For sj&oslash;folk
              </Link>
              <span className="text-slate-300">|</span>
              <Link
                href="/rederi"
                className="text-sm text-navy-600 hover:text-navy-800 underline"
              >
                For rederier
              </Link>
              <span className="text-slate-300">|</span>
              <Link
                href="/lonn"
                className="text-sm text-navy-600 hover:text-navy-800 underline"
              >
                L&oslash;nn til sj&oslash;s
              </Link>
              <span className="text-slate-300">|</span>
              <Link
                href="/karriere"
                className="text-sm text-navy-600 hover:text-navy-800 underline"
              >
                Karriere
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}


