'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ChevronRight,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from '@/components/icons';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import HoneypotField from '@/components/ui/HoneypotField';
import { contactSchema, type ContactFormData } from '@/lib/validations';
import { useCsrfToken } from '@/hooks/useCsrfToken';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const { token: csrfToken, isLoading: csrfLoading } = useCsrfToken();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    if (!csrfToken) {
      setErrorMessage('Sikkerhetsfeil. Vennligst last siden på nytt.');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        reset();
      } else {
        setErrorMessage(result.error || 'Noe gikk galt. Prøv igjen senere.');
        setSubmitStatus('error');
      }
    } catch {
      setErrorMessage('Kunne ikke sende skjemaet. Sjekk internettforbindelsen din.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-medium text-navy mb-4">
          Takk for henvendelsen!
        </h3>
        <p className="text-slate-600 mb-4">
          Vi svarer innen én arbeidsdag.
        </p>
        <p className="text-sm text-slate-500 mb-6">
          Haster det? Ring oss direkte på{' '}
          <a href="tel:+4777029000" className="text-sky hover:underline font-medium">+47 77 02 90 00</a>
        </p>
        <Button onClick={() => setSubmitStatus('idle')}>
          Send ny melding
        </Button>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-2xl font-medium text-navy mb-2">
        Send oss en melding
      </h2>
      <p className="text-slate-600 mb-6">
        Fyll ut skjemaet under, så tar vi kontakt.
      </p>

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-red-800">Feil ved innsending</p>
            <p className="text-sm text-red-600">{errorMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <HoneypotField />

        <Input
          label="Navn"
          placeholder="Ditt fulle navn"
          error={errors.navn?.message}
          {...register('navn')}
        />

        <Input
          label="E-post"
          type="email"
          placeholder="din@epost.no"
          error={errors.epost?.message}
          {...register('epost')}
        />

        <Input
          label="Telefon (valgfritt)"
          type="tel"
          placeholder="+47 123 45 678"
          error={errors.telefon?.message}
          {...register('telefon')}
        />

        <Textarea
          label="Melding"
          placeholder="Skriv din melding her..."
          rows={5}
          error={errors.melding?.message}
          {...register('melding')}
        />

        {/* GDPR Consent Checkbox - Required */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              {...register('godtarVilkar')}
              className="mt-1 w-5 h-5 text-arctic-600 border-slate-300 rounded focus:ring-gold-500 focus:ring-2"
            />
            <span className="text-sm text-slate-600 group-hover:text-slate-800">
              Jeg godtar{' '}
              <Link href="/personvern" className="text-arctic-600 hover:underline font-medium" target="_blank">
                personvernerklæringen
              </Link>
              {' '}og{' '}
              <Link href="/vilkar" className="text-arctic-600 hover:underline font-medium" target="_blank">
                brukervilkårene
              </Link>
              . <span className="text-red-500">*</span>
            </span>
          </label>
          {errors.godtarVilkar && (
            <p className="mt-1 text-sm text-red-500">{errors.godtarVilkar.message}</p>
          )}
        </div>

        <Button
          type="submit"
          fullWidth
          size="lg"
          loading={isSubmitting}
          disabled={csrfLoading || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sender...
            </>
          ) : (
            <>
              Send melding
              <ChevronRight className="w-5 h-5" />
            </>
          )}
        </Button>
      </form>
    </>
  );
}

