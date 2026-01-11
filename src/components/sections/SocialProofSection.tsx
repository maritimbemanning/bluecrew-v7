"use client";

import Container from "@/components/ui/Container";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion";
import Link from "next/link";

/**
 * Greenhouse-inspired social proof section
 * "Great companies hire with Greenhouse" pattern
 */
export default function SocialProofSection() {
  // TODO: Replace with actual partner logos when available
  const partners = [
    "Maritim Partner A",
    "Havbruk Partner B", 
    "Offshore Partner C",
    "Rederi Partner D",
  ];

  return (
    <section className="py-12 md:py-16 bg-slate-50">
      <Container size="lg">
        <div className="text-center space-y-8">
          <FadeUp>
            <h2 className="text-2xl md:text-3xl font-medium text-navy-900">
              Stolte partnere
            </h2>
            <p className="text-lg text-gold-500 italic font-medium mt-2">
              Maritim sektor siden 2015
            </p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            {partners.map((partner, index) => (
              <StaggerItem key={index}>
                <div className="flex items-center justify-center h-16 w-full px-4">
                  {/* TODO: Replace with actual logo images */}
                  <div className="text-sm font-medium text-slate-400 text-center">
                    {partner}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeUp delay={0.3}>
            <Link 
              href="/om-oss" 
              className="inline-flex items-center gap-2 text-sm font-medium text-navy-900 hover:text-gold-500 transition-colors"
            >
              Se våre referanser
              <span aria-hidden="true">→</span>
            </Link>
          </FadeUp>
        </div>
      </Container>
    </section>
  );
}

