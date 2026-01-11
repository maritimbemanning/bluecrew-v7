import Image from "next/image";
import Container from "@/components/ui/Container";
import { getImageUrl, IMAGE_PATHS } from "@/lib/images";

/**
 * "Why Bluecrew" section - Server Component for performance
 * Uses CSS animation for simple fade effect
 */
export default function WhyBluecrewSection() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={getImageUrl(IMAGE_PATHS.hero.offshore)}
          alt="Offshore servicefartøy i arbeid - Bluecrew maritim bemanning"
          fill
          className="object-cover"
          quality={75}
          sizes="100vw"
        />
      </div>
      {/* Navy overlay */}
      <div className="absolute inset-0 z-[1] bg-navy-900/90" />

      <Container size="lg" className="relative z-10">
        {/* SEO Header */}
        <div className="text-center animate-fade-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-cream-50 mb-2">
            Hvorfor <span className="text-gold-400">Bluecrew</span>?
          </h2>
          <h3 className="text-xl md:text-2xl font-medium text-cream-100 mb-4">
            Et <strong className="text-gold-400 italic">bemanningsbyrå</strong> og <strong className="text-gold-400 italic">vikarbyrå</strong> med spisskompetanse i <strong className="text-gold-400 italic">maritim bemanning</strong> og <strong className="text-gold-400 italic">rekruttering</strong>
          </h3>
          <p className="text-base md:text-lg text-cream-100/90 max-w-3xl mx-auto leading-relaxed">
            Bygget på maritim erfaring med ett mål: <span className="font-medium text-cream-50">Kvalitet i alle ledd</span>. Vi kartlegger alle søkere slik at vi alltid stiller forberedt. Vi sier heller nei enn å levere noen som ikke er trygg på jobben.
          </p>
          <p className="text-base md:text-lg text-cream-100/90 max-w-3xl mx-auto leading-relaxed mt-3">
            Hver kandidat er <span className="font-medium text-cream-50">kvalitetssikret</span>, <span className="font-medium text-cream-50">referansesjekket</span> og vurdert etter DNV sin rekrutteringsstandard.
          </p>
        </div>
      </Container>
    </section>
  );
}

