'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from '@/components/icons';
import { useCsrfToken } from '@/hooks/useCsrfToken';

const schema = z.object({
  navn: z.string().min(2, 'Navn må være minst 2 tegn'),
  epost: z.string().email('Ugyldig e-postadresse'),
  telefon: z.string().min(8, 'Telefonnummer må være minst 8 siffer'),
  erfaring: z.string().min(1, 'Velg erfaring'),
  offshoreErfaring: z.string().min(1, 'Velg offshore-erfaring'),
  fagomrade: z.string().optional(),
  godtarVilkar: z.boolean().refine((val) => val === true, {
    message: 'Du må godta personvernerklæringen',
  }),
  markedsforing: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

export default function MekanikerForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { token: csrfToken, isLoading: csrfLoading } = useCsrfToken();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
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
      const payload = {
        navn: data.navn,
        epost: data.epost,
        telefon: data.telefon,
        stilling: 'mekaniker',
        segment: 'offshore',
        godtarVilkar: data.godtarVilkar,
        markedsforing: data.markedsforing,
        erfaring: data.erfaring,
        offshoreErfaring: data.offshoreErfaring,
        fagomrade: data.fagomrade || '',
      };

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
        // Redirect til Vipps verifisering med application ID
        const verifyUrl = `/kampanje/verify?id=${result.id}`;
        window.location.href = `/api/vipps/start?returnTo=${encodeURIComponent(verifyUrl)}`;
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
      <div className="text-center mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-cream-50">
          Søk som Mekaniker
        </h2>
        <p className="text-cream-100/70 text-sm mt-1">
          Mekanikk - Offshore
        </p>
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

        {/* Erfaring */}
        <div>
          <label className="block text-xs text-cream-100/80 mb-1">
            Erfaring som mekaniker <span className="text-gold-400">*</span>
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
            <option value="0-2" className="bg-navy-800">0-2 år</option>
            <option value="3-5" className="bg-navy-800">3-5 år</option>
            <option value="6-10" className="bg-navy-800">6-10 år</option>
            <option value="10+" className="bg-navy-800">10+ år</option>
          </select>
          {errors.erfaring && (
            <p className="text-red-400 text-xs mt-1">{errors.erfaring.message}</p>
          )}
        </div>

        {/* Offshore-erfaring */}
        <div>
          <label className="block text-xs text-cream-100/80 mb-1">
            Offshore-erfaring? <span className="text-gold-400">*</span>
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
            <option value="ja" className="bg-navy-800">Ja, har offshore-erfaring</option>
            <option value="noe" className="bg-navy-800">Noe erfaring</option>
            <option value="nei" className="bg-navy-800">Nei, men ønsker det</option>
          </select>
          {errors.offshoreErfaring && (
            <p className="text-red-400 text-xs mt-1">{errors.offshoreErfaring.message}</p>
          )}
        </div>

        {/* Fagområde */}
        <div>
          <label className="block text-xs text-cream-100/80 mb-1">
            Spesifikt fagområde (frivillig)
          </label>
          <input
            type="text"
            placeholder="Ex: Hydraulikk, Pneumatikk, Pumper..."
            {...register('fagomrade')}
            className="w-full bg-navy-700/50 border border-cream-100/20 rounded-lg
                       text-cream-50 placeholder:text-cream-100/40 text-sm
                       py-2.5 px-3 focus:border-gold-400 focus:outline-none
                       transition-colors"
          />
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-400 text-xs">{errorMessage}</p>
          </div>
        )}

        {/* GDPR Consent */}
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
              CV + SØKNAD →
            </>
          )}
        </button>
      </form>
    </div>
  );
}

