import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "@/components/icons";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { getImageUrl, IMAGE_PATHS } from "@/lib/images";

/**
 * HeroSection - Server Component for optimal LCP
 * Uses CSS animations instead of Framer Motion to reduce JS bundle
 */
export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-start overflow-hidden pt-24 md:pt-32">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={getImageUrl(IMAGE_PATHS.hero.background)}
          alt="Maritim bakgrunn - Bluecrew"
          fill
          className="object-cover"
          priority
          fetchPriority="high"
          quality={75}
          sizes="100vw"
        />
      </div>
      {/* Darker overlay for better text contrast */}
      <div className="absolute inset-0 z-[1] bg-navy-900/75" />

      <Container size="lg" className="relative z-10 py-8 md:py-12">
        <div className="max-w-3xl space-y-6">
          {/* H1 - CSS animation */}
          <div className="animate-fade-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.15] tracking-tight text-cream-50">
              Stolt <span className="text-gold-400 italic">partner</span> for
              <br />maritim <span className="text-gold-400 italic">bemanning</span> og <span className="text-gold-400 italic">rekruttering</span>
            </h1>
          </div>

          {/* Subheadline - CSS animation with delay */}
          <div className="animate-fade-up animation-delay-200">
            <p className="text-lg md:text-xl text-cream-100 max-w-2xl leading-relaxed">
              Vi sikrer pålitelige <span className="text-gold-400 font-medium">bemanningsløsninger</span> til oppdrettsnæringen, offshore og rederi. Spisskompetanse i en regulert og logistikk-krevende maritim sektor.
            </p>
          </div>

          {/* CTA Buttons - CSS animation with delay */}
          <div className="animate-fade-up animation-delay-400">
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link href="/rederi">
                <Button
                  size="lg"
                  className="bg-gold-500 text-navy-900 hover:bg-gold-400 px-8 py-4 rounded-md w-full sm:w-auto text-base font-medium shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  For Rederier
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/meld-interesse">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-gold-400/20 text-cream-50 hover:bg-gold-400/10 hover:border-gold-400/40 px-8 py-4 rounded-md w-full sm:w-auto text-base font-medium backdrop-blur-sm transition-all duration-300"
                >
                  For Sjøfolk
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}

