'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  CheckCircle2,
  Loader2,
  Upload,
  X,
  ArrowLeft,
  Phone,
  Mail
} from '@/components/icons';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useCsrfToken } from '@/hooks/useCsrfToken';

const applicationSchema = z.object({
  navn: z.string().min(2, 'Navn må være minst 2 tegn'),
  epost: z.string().email('Ugyldig e-postadresse'),
  telefon: z.string().min(8, 'Telefonnummer må være minst 8 siffer'),
  cvFile: z.instanceof(File).optional(),
  godtarVilkar: z.boolean().refine((val) => val === true, {
    message: 'Du må godta personvernerklæringen for å søke',
  }),
  markedsforing: z.boolean().optional(),
});

type ApplicationData = z.infer<typeof applicationSchema>;

const segmentLabels: Record<string, string> = {
  offshore: 'Offshore',
  oppdrett: 'Oppdrett & Havbruk',
  shipping: 'Shipping & Rederi',
};

function ApplicationFormContent() {
  const searchParams = useSearchParams();
  const stilling = searchParams.get('stilling') || 'Åpen søknad';
  const segment = searchParams.get('segment') || 'offshore';

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [cvFileName, setCvFileName] = useState<string | null>(null);
  const { token: csrfToken, isLoading: csrfLoading } = useCsrfToken();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ApplicationData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      godtarVilkar: false,
      markedsforing: false,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('Filen er for stor. Maks størrelse er 10MB.');
        return;
      }
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        alert('Ugyldig filtype. Last opp PDF eller Word-dokument.');
        return;
      }
      setCvFileName(file.name);
      setValue('cvFile', file);
    }
  };

  const removeFile = () => {
    setCvFileName(null);
    setValue('cvFile', undefined);
  };

  const onSubmit = async (data: ApplicationData) => {
    if (!csrfToken) {
      setErrorMessage('Sikkerhetsfeil. Vennligst last siden på nytt.');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/campaign/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken,
        },
        body: JSON.stringify({
          navn: data.navn,
          epost: data.epost,
          telefon: data.telefon,
          stilling: stilling,
          segment: segment,
          godtarVilkar: data.godtarVilkar,
          markedsforing: data.markedsforing,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        reset();
        setCvFileName(null);
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

  return (
    <main className="min-h-screen bg-linear-to-br from-navy-900 via-navy-800 to-navy-900">
      {/* Header */}
      <Section noPadding className="pt-24 pb-8 md:pt-32 md:pb-12">
        <Container size="md">
          {/* Back link */}
          <Link
            href="/stillinger"
            className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors mb-8 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Tilbake til stillinger
          </Link>

          {/* Logo and title */}
          <div className="text-center">
            <Image
              src="/images/fullogo_transparent.png"
              alt="Bluecrew"
              width={180}
              height={45}
              className="h-12 w-auto mx-auto mb-8 brightness-0 invert"
            />

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-white mb-4">
              {stilling}
            </h1>
            <p className="text-xl md:text-2xl text-gold-400 italic mb-2">
              Åpen Søknad
            </p>
            <p className="text-lg text-cream-100">
              {segmentLabels[segment] || segment}
            </p>
          </div>
        </Container>
      </Section>

      {/* Form Section */}
      <Section className="bg-white py-12 md:py-16 rounded-t-3xl">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left: Form */}
            <div className="lg:col-span-2">
          {submitStatus === 'success' ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-medium text-navy-900 mb-4">
                Søknad mottatt!
              </h2>
              <p className="text-xl text-slate-600 mb-2">
                Takk for din interesse i stillingen som <strong>{stilling}</strong>.
              </p>
              <p className="text-slate-500 mb-8">
                Vi tar kontakt med deg innen 24 timer.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/stillinger">
                  <Button variant="primary">
                    Se flere stillinger
                  </Button>
                </Link>
                <Button
                  onClick={() => setSubmitStatus('idle')}
                  variant="outline"
                >
                  Send ny søknad
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-medium text-navy-900 mb-3">
                  Send din søknad
                </h2>
                <p className="text-slate-600">
                  Fyll ut skjemaet under, så tar vi kontakt med deg.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Navn */}
                <Input
                  label="Fullt navn *"
                  type="text"
                  placeholder="Ola Nordmann"
                  error={errors.navn?.message}
                  {...register('navn')}
                />

                {/* E-post */}
                <Input
                  label="E-postadresse *"
                  type="email"
                  placeholder="ola@example.com"
                  error={errors.epost?.message}
                  {...register('epost')}
                />

                {/* Telefon */}
                <Input
                  label="Telefonnummer *"
                  type="tel"
                  placeholder="12345678"
                  error={errors.telefon?.message}
                  {...register('telefon')}
                />

                {/* CV Upload */}
                <div>
                  <label className="block text-sm font-medium text-navy-900 mb-3">
                    Last opp CV (valgfritt)
                  </label>
                  {!cvFileName ? (
                    <label className="flex items-center justify-center gap-3 p-6 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-gold-400 hover:bg-gold-50 transition-all">
                      <Upload className="w-6 h-6 text-slate-400" />
                      <span className="text-slate-600">
                        Klikk for å velge fil (PDF, Word - maks 10MB)
                      </span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                    </label>
                  ) : (
                    <div className="flex items-center justify-between p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span className="text-navy-900 font-medium truncate max-w-[200px]">{cvFileName}</span>
                      </div>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="p-1 hover:bg-green-100 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5 text-slate-600" />
                      </button>
                    </div>
                  )}
                </div>

                {/* GDPR Consent */}
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="mt-1 w-5 h-5 rounded border-slate-300 text-gold-500 focus:ring-gold-500"
                      {...register('godtarVilkar')}
                    />
                    <span className="text-sm text-slate-700 group-hover:text-navy-900">
                      Jeg samtykker til at Bluecrew behandler mine personopplysninger i henhold til{' '}
                      <Link href="/personvern" className="text-gold-600 hover:underline" target="_blank">
                        personvernerklæringen
                      </Link>{' '}
                      og{' '}
                      <Link href="/vilkar" className="text-gold-600 hover:underline" target="_blank">
                        brukervilkårene
                      </Link>.
                      {' '}*
                    </span>
                  </label>
                  {errors.godtarVilkar && (
                    <p className="text-red-600 text-sm">{errors.godtarVilkar.message}</p>
                  )}

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="mt-1 w-5 h-5 rounded border-slate-300 text-gold-500 focus:ring-gold-500"
                      {...register('markedsforing')}
                    />
                    <span className="text-sm text-slate-700 group-hover:text-navy-900">
                      Jeg ønsker å motta nyheter og oppdateringer om ledige stillinger (valgfritt)
                    </span>
                  </label>
                </div>

                {/* Error message */}
                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-red-800 text-sm">{errorMessage}</p>
                  </div>
                )}

                {/* Submit button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting || csrfLoading}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sender søknad...</span>
                    </>
                  ) : (
                    <span>Send søknad</span>
                  )}
                </Button>

                {/* Contact info */}
                <div className="text-center pt-6 border-t border-slate-200">
                  <p className="text-sm text-slate-500 mb-3">Har du spørsmål?</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                    <a href="tel:+4777029000" className="flex items-center gap-2 text-navy-900 hover:text-gold-600 transition-colors">
                      <Phone className="w-4 h-4" />
                      77 02 90 00
                    </a>
                    <a href="mailto:post@bluecrew.no" className="flex items-center gap-2 text-navy-900 hover:text-gold-600 transition-colors">
                      <Mail className="w-4 h-4" />
                      post@bluecrew.no
                    </a>
                  </div>
                </div>
              </form>
            </>
          )}
            </div>

            {/* Right: Position Info Box */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                {/* Apply Button */}
                <div className="p-6 bg-navy-900">
                  <button
                    type="button"
                    onClick={() => document.getElementById('navn')?.focus()}
                    className="w-full bg-gold-500 hover:bg-gold-400 text-navy-900 font-medium py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    Søk på stillingen
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>

                {/* Position Details */}
                <div className="p-6">
                  <h3 className="text-lg font-medium text-navy-900 mb-6">
                    Om stillingen
                  </h3>

                  <dl className="space-y-4">
                    <div>
                      <dt className="text-sm text-slate-500">Arbeidssted</dt>
                      <dd className="text-navy-900 font-medium">Etter avtale</dd>
                    </div>

                    <div>
                      <dt className="text-sm text-slate-500">Sektor</dt>
                      <dd className="text-navy-900 font-medium">{segmentLabels[segment] || segment}</dd>
                    </div>

                    <div>
                      <dt className="text-sm text-slate-500">Stillingstype</dt>
                      <dd className="text-navy-900 font-medium">{stilling} - åpen søknad</dd>
                    </div>

                    <div>
                      <dt className="text-sm text-slate-500">Ansettelsesform</dt>
                      <dd className="text-navy-900 font-medium">Fast / Vikariat</dd>
                    </div>

                    <div>
                      <dt className="text-sm text-slate-500">Rotasjon</dt>
                      <dd className="text-navy-900 font-medium">2/4 (2 uker på, 4 uker av)</dd>
                    </div>

                    <div>
                      <dt className="text-sm text-slate-500">Antall stillinger</dt>
                      <dd className="text-navy-900 font-medium">Flere</dd>
                    </div>

                    <div>
                      <dt className="text-sm text-slate-500">Søknadsfrist</dt>
                      <dd className="text-navy-900 font-medium text-gold-600">30.01.2026</dd>
                    </div>

                    <div>
                      <dt className="text-sm text-slate-500">Publisert</dt>
                      <dd className="text-navy-900 font-medium">09.01.2026</dd>
                    </div>
                  </dl>
                </div>

                {/* Company info */}
                <div className="p-6 border-t border-slate-200 bg-white">
                  <h4 className="text-sm font-medium text-slate-500 mb-3">Om arbeidsgiver</h4>
                  <div className="flex items-center gap-3">
                    <Image
                      src="/images/fullogo_transparent.png"
                      alt="Bluecrew"
                      width={100}
                      height={25}
                      className="h-6 w-auto"
                    />
                  </div>
                  <p className="text-sm text-slate-600 mt-3">
                    Bluecrew AS er et DNV-sertifisert bemanningsbyrå for maritim sektor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}

export default function ApplicationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-navy-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-gold-400 animate-spin" />
      </div>
    }>
      <ApplicationFormContent />
    </Suspense>
  );
}

