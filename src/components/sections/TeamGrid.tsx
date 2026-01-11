"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import { Mail, Phone } from "@/components/icons";
import Image from "next/image";
import { getImageUrl, IMAGE_PATHS } from "@/lib/images";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion";

const team = [
  {
    name: "Isak Didriksson",
    role: "Daglig leder",
    email: "isak@bluecrew.no",
    phone: "+47 923 28 850",
    initials: "ID",
    imagePath: IMAGE_PATHS.team.isak,
    shortBio: "DNV sertifisert rekrutterer med erfaring fra oppdrettsnæringen.",
  },
  {
    name: "Tor Faafeng",
    role: "Recruitment Manager",
    email: "tf@bluecrew.no",
    phone: "+47 401 75 841",
    initials: "TF",
    imagePath: IMAGE_PATHS.team.tor,
    shortBio: "7 års erfaring med bemanning og rekruttering. Offshore-bakgrunn.",
  }
];

function TeamMember({ member }: { member: typeof team[0] }) {
  const [imageError, setImageError] = useState(false);
  const imageUrl = getImageUrl(member.imagePath);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        {/* Photo */}
        {!imageError && imageUrl ? (
          <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden ring-2 ring-slate-100 shrink-0">
            <Image
              src={imageUrl}
              alt={`${member.name} - ${member.role} hos Bluecrew`}
              fill
              className="object-cover"
              sizes="80px"
              onError={() => setImageError(true)}
            />
          </div>
        ) : (
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-navy-900 flex items-center justify-center text-cream-50 text-xl font-bold shrink-0">
            {member.initials}
          </div>
        )}
        
        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium text-navy-900 mb-1">
            {member.name}
          </h3>
          <p className="text-gold-500 text-sm font-medium mb-2">
            {member.role}
          </p>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            {member.shortBio}
          </p>
          
          {/* Contact links */}
          <div className="flex flex-wrap gap-2 text-xs">
            <a 
              href={`mailto:${member.email}`} 
              className="flex items-center gap-1.5 text-slate-500 hover:text-navy-900 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              {member.email}
            </a>
            <a 
              href={`tel:${member.phone}`} 
              className="flex items-center gap-1.5 text-slate-500 hover:text-navy-900 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              {member.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TeamGrid() {
  return (
    <section className="py-12 md:py-16 bg-slate-50 border-t border-slate-100">
      <Container size="lg">
        <FadeUp>
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-medium text-navy-900 mb-2">
              Snakk med oss
            </h2>
            <p className="text-slate-600">
              Maritim bakgrunn – vi forstår hva dere trenger.
            </p>
          </div>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {team.map((member, index) => (
            <StaggerItem key={index}>
              <TeamMember member={member} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}


