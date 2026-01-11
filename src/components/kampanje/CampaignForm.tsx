'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from '@/components/icons';
import { useCsrfToken } from '@/hooks/useCsrfToken';

// Base schema - common fields for all roles
const baseSchema = z.object({
  navn: z.string().min(2, 'Navn må være minst 2 tegn'),
  epost: z.string().email('Ugyldig e-postadresse'),
  telefon: z.string().min(8, 'Telefonnummer må være minst 8 siffer'),
  erfaring: z.string().min(1, 'Velg erfaring'),
  offshoreErfaring: z.string().optional(),
  // Role-specific extra fields
  rovRolle: z.string().optional(),
  sertifikater: z.string().optional(),
  fagomrade: z.string().optional(),
  godtarVilkar: z.boolean().refine((val) => val === true, {
    message: 'Du må godta personvernerklæringen',
  }),
  markedsforing: z.boolean().optional(),
});

type FormData = z.infer<typeof baseSchema>;

// Experience options
const erfaringOptions = [
  { value: '0-2', label: '0-2 år' },
  { value: '3-5', label: '3-5 år' },
  { value: '6-10', label: '6-10 år' },
  { value: '10+', label: '10+ år' },
];

const offshoreErfaringOptions = [
  { value: 'ja', label: 'Ja, har offshore-erfaring' },
  { value: 'noe', label: 'Noe erfaring' },
  { value: 'nei', label: 'Nei, men ønsker det' },
];

// Role-specific field configurations
const roleFields: Record<string, {
  erfaringLabel: string;
  showOffshoreField: boolean;
  extraFields?: { name: string; label: string; options: { value: string; label: string }[] }[];
}> = {
  elektriker: {
    erfaringLabel: 'Erfaring som elektriker',
    showOffshoreField: true,
  },
  riggere: {
    erfaringLabel: 'Erfaring som rigger',
    showOffshoreField: true,
  },
  rov: {
    erfaringLabel: 'ROV-erfaring',
    showOffshoreField: false,
    extraFields: [{
      name: 'rovRolle',
      label: 'ROV-rolle',
      options: [
        { value: 'pilot', label: 'Pilot' },
        { value: 'supervisor', label: 'Supervisor' },
        { value: 'technician', label: 'Technician' },
        { value: 'trainee', label: 'Trainee' },
      ],
    }],
  },
  eto: {
    erfaringLabel: 'ETO-erfaring',
    showOffshoreField: false,
    extraFields: [{
      name: 'sertifikater',
      label: 'Sertifikater',
      options: [
        { value: 'stcw', label: 'STCW' },
        { value: 'goc', label: 'GOC' },
        { value: 'begge', label: 'Begge' },
        { value: 'ingen', label: 'Ingen ennå' },
      ],
    }],
  },
  sveiser: {
    erfaringLabel: 'Erfaring som sveiser',
    showOffshoreField: true,
  },
  mekaniker: {
    erfaringLabel: 'Erfaring som mekaniker',
    showOffshoreField: true,
  },
  offshore: {
    erfaringLabel: 'Total erfaring',
    showOffshoreField: true,
    extraFields: [{
      name: 'fagomrade',
      label: 'Fagområde',
      options: [
        { value: 'elektriker', label: 'Elektriker' },
        { value: 'rigger', label: 'Rigger' },
        { value: 'rov', label: 'ROV-Pilot' },
        { value: 'eto', label: 'ETO' },
        { value: 'sveiser', label: 'Sveiser' },
        { value: 'mekaniker', label: 'Mekaniker' },
        { value: 'annet', label: 'Annet' },
      ],
    }],
  },
};

interface CampaignFormProps {
  rolle: string;
  segment?: 'offshore' | 'oppdrett' | 'shipping';
}

export default function CampaignForm({ rolle, segment = 'offshore' }: CampaignFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { token: csrfToken, isLoading: csrfLoading } = useCsrfToken();

  const roleConfig = roleFields[rolle] || roleFields.offshore;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(baseSchema),
    defaultValues: {
      godtarVilkar: false,
      markedsforing: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!csrfToken) {
      setErrorMessage('Sikkerhetsfeil. Vennligst last siden på nytt.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // Build payload with all fields
      const payload: Record<string, unknown> = {
        navn: data.navn,
        epost: data.epost,
        telefon: data.telefon,
        stilling: rolle,
        segment: segment,
        godtarVilkar: data.godtarVilkar,
        markedsforing: data.markedsforing,
        // Add role-specific fields
        erfaring: data.erfaring,
      };

      if (data.offshoreErfaring) payload.offshoreErfaring = data.offshoreErfaring;
      if (data.rovRolle) payload.rovRolle = data.rovRolle;
      if (data.sertifikater) payload.sertifikater = data.sertifikater;
      if (data.fagomrade) payload.fagomrade = data.fagomrade;

      const response = await fetch('/api/campaign/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.id) {
        // Track form submission in Plausible
        if (typeof window !== "undefined" && (window as unknown as { plausible?: (event: string, options?: { props: Record<string, string> }) => void }).plausible) {
          (window as unknown as { plausible: (event: string, options?: { props: Record<string, string> }) => void }).plausible("campaign_form_submit", { props: { position: rolle } });
        }

        // Redirect to verify page - check if already logged in
        const verifyUrl = `/kampanje/verify?id=${result.id}`;
        
        // Check if user is already logged in by checking for session cookie
        // If logged in, go directly to verify page. Otherwise, go through Vipps.
        const hasSession = document.cookie.includes('bluecrew_session=');
        
        if (hasSession) {
          // Already logged in - go directly to verify
          window.location.href = verifyUrl;
        } else {
          // Not logged in - go through Vipps first
          window.location.href = `/api/vipps/start?returnTo=${encodeURIComponent(verifyUrl)}`;
        }
      } else {
        setErrorMessage(result.error || 'Noe gikk galt. Prøv igjen senere.');
      }
    } catch {
      setErrorMessage('Kunne ikke sende skjemaet. Sjekk internettforbindelsen din.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-navy-800/80 backdrop-blur-sm border border-cream-100/10 rounded-2xl p-4 md:p-6">
      {/* Form Header */}
      <div className="text-center mb-4">
        <h2 className="text-2xl md:text-3xl font-medium text-cream-50">
          Registrer deg
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {/* Fullt navn */}
        <div>
          <label className="block text-xs text-cream-100/80 mb-1">
            Fullt navn <span className="text-gold-400">*</span>
          </label>
          <input
            type="text"
            placeholder="Ola Nordmann"
            {...register('navn')}
            className="w-full bg-navy-700/50 border border-cream-100/20 rounded-lg
                       text-cream-50 placeholder:text-cream-100/40 text-sm
                       py-2.5 px-3 focus:border-gold-400 focus:outline-none
                       transition-colors"
          />
          {errors.navn && (
            <p className="text-red-400 text-xs mt-1">{errors.navn.message}</p>
          )}
        </div>

        {/* E-post */}
        <div>
          <label className="block text-xs text-cream-100/80 mb-1">
            E-post <span className="text-gold-400">*</span>
          </label>
          <input
            type="email"
            placeholder="ola@example.com"
            {...register('epost')}
            className="w-full bg-navy-700/50 border border-cream-100/20 rounded-lg
                       text-cream-50 placeholder:text-cream-100/40 text-sm
                       py-2.5 px-3 focus:border-gold-400 focus:outline-none
                       transition-colors"
          />
          {errors.epost && (
            <p className="text-red-400 text-xs mt-1">{errors.epost.message}</p>
          )}
        </div>

        {/* Telefon */}
        <div>
          <label className="block text-xs text-cream-100/80 mb-1">
            Telefon <span className="text-gold-400">*</span>
          </label>
          <input
            type="tel"
            placeholder="+47 123 45 678"
            {...register('telefon')}
            className="w-full bg-navy-700/50 border border-cream-100/20 rounded-lg
                       text-cream-50 placeholder:text-cream-100/40 text-sm
                       py-2.5 px-3 focus:border-gold-400 focus:outline-none
                       transition-colors"
          />
          {errors.telefon && (
            <p className="text-red-400 text-xs mt-1">{errors.telefon.message}</p>
          )}
        </div>

        {/* Extra fields for specific roles */}
        {roleConfig.extraFields?.map((field) => (
          <div key={field.name}>
            <label className="block text-xs text-cream-100/80 mb-1">
              {field.label} <span className="text-gold-400">*</span>
            </label>
            <select
              {...register(field.name as keyof FormData)}
              className="w-full bg-navy-700/50 border border-cream-100/20 rounded-lg
                         text-cream-50 text-sm py-2.5 px-3 focus:border-gold-400 focus:outline-none
                         transition-colors appearance-none cursor-pointer"
              defaultValue=""
            >
              <option value="" disabled className="text-cream-100/40">
                Velg {field.label.toLowerCase()}
              </option>
              {field.options.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-navy-800">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        ))}

        {/* Erfaring */}
        <div>
          <label className="block text-xs text-cream-100/80 mb-1">
            {roleConfig.erfaringLabel} <span className="text-gold-400">*</span>
          </label>
          <select
            {...register('erfaring')}
            className="w-full bg-navy-700/50 border border-cream-100/20 rounded-lg
                       text-cream-50 text-sm py-2.5 px-3 focus:border-gold-400 focus:outline-none
                       transition-colors appearance-none cursor-pointer"
            defaultValue=""
          >
            <option value="" disabled className="text-cream-100/40">
              Velg erfaring
            </option>
            {erfaringOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-navy-800">
                {opt.label}
              </option>
            ))}
          </select>
          {errors.erfaring && (
            <p className="text-red-400 text-xs mt-1">{errors.erfaring.message}</p>
          )}
        </div>

        {/* Offshore-erfaring */}
        {roleConfig.showOffshoreField && (
          <div>
            <label className="block text-xs text-cream-100/80 mb-1">
              Offshore-erfaring?
            </label>
            <select
              {...register('offshoreErfaring')}
              className="w-full bg-navy-700/50 border border-cream-100/20 rounded-lg
                         text-cream-50 text-sm py-2.5 px-3 focus:border-gold-400 focus:outline-none
                         transition-colors appearance-none cursor-pointer"
              defaultValue=""
            >
              <option value="" disabled className="text-cream-100/40">
                Velg alternativ
              </option>
              {offshoreErfaringOptions.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-navy-800">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* GDPR Consent - Compact version */}
        <div className="pt-1">
          <label className="flex items-start gap-2 cursor-pointer group">
            <input
              type="checkbox"
              {...register('godtarVilkar')}
              className="mt-0.5 w-4 h-4 rounded border-cream-100/30 bg-transparent
                         text-gold-500 focus:ring-gold-500 focus:ring-offset-0
                         focus:ring-offset-transparent cursor-pointer"
            />
            <span className="text-xs text-cream-100/60 leading-relaxed">
              Jeg godtar{' '}
              <Link href="/personvern" className="text-gold-400 hover:underline" target="_blank">
                personvernerklæringen
              </Link>{' '}
              og{' '}
              <Link href="/vilkar" className="text-gold-400 hover:underline" target="_blank">
                vilkårene
              </Link>
              , inkludert deling av sertifikater med potensielle oppdragsgivere
              <span className="text-red-400"> *</span>
            </span>
          </label>
          {errors.godtarVilkar && (
            <p className="text-red-400 text-xs mt-1 ml-6">{errors.godtarVilkar.message}</p>
          )}
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
            <p className="text-red-400 text-sm">{errorMessage}</p>
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting || csrfLoading}
          className="w-full bg-linear-to-r from-gold-400 to-gold-500
                     text-navy-900 font-semibold text-base py-3 rounded-xl
                     hover:from-gold-500 hover:to-gold-400 transition-all
                     uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed
                     flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sender...
            </>
          ) : (
            <>
              CV + FØLGEBREV →
            </>
          )}
        </button>
      </form>
    </div>
  );
}

