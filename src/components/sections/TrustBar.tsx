import { Shield, Award, CheckCircle2, Star } from "@/components/icons";
import Container from "@/components/ui/Container";

/**
 * TrustBar - Server Component for optimal performance
 * No animations needed - trust signals should be immediately visible
 */
export default function TrustBar() {
  const trustItems = [
    { icon: Award, text: "DNV Sertifisert" },
    { icon: Shield, text: "Godkjent Bemanningsforetak" },
    { icon: CheckCircle2, text: "Verifiserte sjøfolk" },
  ];

  return (
    <section className="py-8 md:py-10 bg-slate-50 border-b border-slate-200">
      <Container size="lg">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
          {trustItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <item.icon className="w-5 h-5 text-gold-500" />
              <span className="text-sm font-medium text-navy-900">{item.text}</span>
            </div>
          ))}
          <a 
            href="https://www.google.com/search?q=Bluecrew+AS" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 group hover:opacity-80 transition-opacity"
          >
            <Star className="w-5 h-5 text-gold-500 fill-gold-500 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-navy-900 group-hover:underline underline-offset-4">5.0 Google</span>
          </a>
        </div>
      </Container>
    </section>
  );
}

