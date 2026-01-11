import Container from "@/components/ui/Container";

interface SectionDividerProps {
  headline?: string;
  subheadline?: string;
  size?: "default" | "sm";
}

/**
 * Greenhouse-inspired repeating headline pattern
 * Server Component for optimal performance
 */
export default function SectionDivider({
  headline,
  subheadline,
  size = "default"
}: SectionDividerProps) {
  const isSmall = size === "sm";

  return (
    <section className={isSmall ? "py-8 md:py-10 bg-white" : "py-12 md:py-16 bg-white"}>
      <Container size="lg">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <h2 className={isSmall
            ? "text-xl md:text-2xl font-medium text-navy-900"
            : "text-2xl md:text-3xl font-medium text-navy-900"
          }>
            {headline ?? (
              <>
                <span className="italic">Pålitelig</span> bemanning, <span className="italic">dokumentert</span> kvalitet
              </>
            )}
          </h2>
          {subheadline && (
            <p className={isSmall
              ? "text-base text-gold-500 italic font-medium leading-snug"
              : "text-lg text-gold-500 italic font-medium leading-snug"
            }>
              {subheadline}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}

