"use client";

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';

interface SplitHeroProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  badge?: string;
  icon?: React.ElementType;
}

export default function SplitHero({ leftContent, rightContent, badge, icon: Icon }: SplitHeroProps) {

  return (
    <section className="relative min-h-screen overflow-hidden pt-20">
      {/* Split Background - full navy on mobile, split on lg */}
      <div className="absolute inset-0 bg-navy-900 lg:flex lg:bg-transparent">
        <div className="hidden lg:block lg:w-1/2 bg-navy-900" />
        <div className="hidden lg:block lg:w-1/2 bg-slate-50" />
      </div>

      {/* Content */}
      <Container size="lg" className="relative z-10 py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {badge && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-600 text-sm font-medium">
                {Icon && <Icon className="w-4 h-4" />}
                {badge}
              </div>
            )}
            <div className="text-cream-50">
              {leftContent}
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="text-cream-50 lg:text-navy-900">
              {rightContent}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

