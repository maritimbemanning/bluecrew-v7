'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getImageUrl } from '@/lib/images';
import { Award, Ship, Briefcase } from '@/components/icons';

interface TeamMemberCardProps {
  name: string;
  role: string;
  description: string;
  credentials: string[];
  imagePath: string;
  initials: string;
}

// Map credential text to icons
function getCredentialIcon(text: string) {
  if (text.toLowerCase().includes('dnv') || text.toLowerCase().includes('sertifisert')) return Award;
  if (text.toLowerCase().includes('sjø') || text.toLowerCase().includes('offshore') || text.toLowerCase().includes('maritim')) return Ship;
  return Briefcase;
}

export default function TeamMemberCard({ name, role, description, credentials, imagePath, initials }: TeamMemberCardProps) {
  const [imageError, setImageError] = useState(false);
  const imageUrl = getImageUrl(imagePath);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Large Photo Section */}
      <div className="relative w-full aspect-4/3 bg-linear-to-br from-navy-900 to-navy-800">
        {!imageError && imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover object-center"
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-7xl font-bold text-white/30">{initials}</span>
          </div>
        )}
        {/* Gradient overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/40 to-transparent" />
      </div>
      
      {/* Content Section */}
      <div className="p-6 md:p-8">
        {/* Name and Role */}
        <div className="mb-4">
          <h3 className="text-xl md:text-2xl font-medium text-navy-900">
            {name}
          </h3>
          <p className="text-gold-500 font-medium">{role}</p>
        </div>

        {/* Description */}
        <p className="text-slate-600 mb-6 leading-relaxed">
          {description}
        </p>

        {/* Credentials with icons */}
        <div className="space-y-3">
          {credentials.map((cred, i) => {
            const IconComponent = getCredentialIcon(cred);
            return (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gold-50 flex items-center justify-center shrink-0">
                  <IconComponent className="w-4 h-4 text-gold-500" />
                </div>
                <span className="text-sm text-navy-800 font-medium">{cred}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


