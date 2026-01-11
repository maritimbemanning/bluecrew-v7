'use client';

import Accordion from '@/components/ui/Accordion';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import type { FAQItem } from '@/types';

interface FAQSectionProps {
  items: FAQItem[];
  heading?: string;
  variant?: 'default' | 'navy' | 'slate';
}

/**
 * FAQSection Component
 *
 * Renders FAQ items in an accordion with schema markup
 * Includes SEO-optimized JSON-LD structured data
 */
export function FAQSection({
  items,
  heading = 'Ofte stilte spørsmål',
  variant = 'slate',
}: FAQSectionProps) {
  return (
    <>
      <SchemaMarkup type="faq" faqItems={items} />

      <Section variant={variant}>
        <Container size="md">
          <h2 className="text-3xl font-medium text-navy mb-8 text-center">
            {heading}
          </h2>

          <Accordion items={items} />
        </Container>
      </Section>
    </>
  );
}


