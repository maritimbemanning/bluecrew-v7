import Image from 'next/image';
import Container from '@/components/ui/Container';
import { getImageUrl } from '@/lib/images';
import { ReactNode } from 'react';

interface AnimatedHeroProps {
  title: ReactNode;
  subtitle: string;
  variant?: 'navy' | 'slate' | 'default';
  backgroundImage?: string;
}

/**
 * Animated hero section for lønn pages
 * Uses CSS animations instead of Framer Motion
 */
export function AnimatedHero({ title, subtitle, backgroundImage }: AnimatedHeroProps) {
  return (
    <div className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-navy-900 pt-20">
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={getImageUrl(backgroundImage)}
            alt="Maritim bakgrunnsbilde"
            fill
            className="object-cover opacity-50"
            priority
          />
          {/* Stronger, warmer overlay for better contrast */}
          <div className="absolute inset-0 bg-linear-to-b from-navy-900/85 via-navy-900/65 to-navy-900/90" />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
        </div>
      )}
      
      <Container size="md" className="relative z-10 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-medium text-cream-50 mb-6 animate-fade-in-up leading-tight">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-cream-100/90 max-w-3xl mb-4 drop-shadow-lg">
          {subtitle}
        </p>
      </Container>
    </div>
  );
}


