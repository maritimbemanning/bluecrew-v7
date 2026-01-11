'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ChevronRight,
  CheckCircle2,
  Loader2,
  AlertCircle,
  FileText,
  MessageSquare,
} from '@/components/icons';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import HoneypotField from '@/components/ui/HoneypotField';
import { staffingNeedsSchema, interestLeadSchema, type StaffingNeedsFormData, type InterestLeadFormData } from '@/lib/validations';
import { useCsrfToken } from '@/hooks/useCsrfToken';

const breadcrumbs = [
  { name: 'Hjem', url: '/' },
  { name: 'Rederi', url: '/rederi' },
  { name: 'Registrer behov', url: '/rederi/behov' },
];

const positionOptions = [
  'Kaptein',
  'Overstyrmann',
  'Styrmann',
  'Maskinist',
  'ETO',
  'Matros',
  'Kokk',
  'Annet',
];

type FormMode = 'detailed' | 'simple';

export default function BehovPage() {
  const [formMode, setFormMode] = useState<FormMode>('detailed');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const { token: csrfToken, isLoading: csrfLoading } = useCsrfToken();

  // Detailed form
  const detailedForm = useForm<StaffingNeedsFormData>({
    resolver: zodResolver(staffingNeedsSchema),
    defaultValues: { stillinger: [], antall: 1, godtarVilkar: false },
  });

  // Simple form
  const simpleForm = useForm<InterestLeadFormData>({
    resolver: zodResolver(interestLeadSchema),
    defaultValues: { type: 'rederi' },
  });

  // Register stillinger field on mount
  useEffect(() => {
    detailedForm.register('stillinger');
  }, [detailedForm]);

  const togglePosition = (position: string) => {
    const newPositions = selectedPositions.includes(position)
      ? selectedPositions.filter(p => p !== position)
      : [...selectedPositions, position];
    setSelectedPositions(newPositions);
    detailedForm.setValue('stillinger', newPositions, { shouldValidate: true });
  };

  const onSubmitDetailed = async (data: StaffingNeedsFormData) => {
    if (!csrfToken) {
      setErrorMessage('Sikkerhetsfeil. Vennligst last siden på nytt.');
      setSubmitStatus('error');
      return;
    }

    // Validate positions selected
    if (selectedPositions.length === 0) {
      setErrorMessage('Velg minst én stilling');
      setSubmitStatus('error');
      return;
    }

    // Ensure stillinger is included from state
    const submitData = {
      ...data,
      stillinger: selectedPositions,
    };

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/rederi/behov', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-csrf-token': csrfToken },
        body: JSON.stringify(submitData),
      });
      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        detailedForm.reset();
        setSelectedPositions([]);
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

  const onSubmitSimple = async (data: InterestLeadFormData) => {
    if (!csrfToken) {
      setErrorMessage('Sikkerhetsfeil. Vennligst last siden på nytt.');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/meld-interesse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-csrf-token': csrfToken },
        body: JSON.stringify({ ...data, type: 'rederi' }),
      });
      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        simpleForm.reset();
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
      <main>
        <Section variant="slate" className="pt-32 pb-20">
          <Container size="sm">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-medium text-navy-900 mb-4">
                Takk for henvendelsen!
              </h1>
              <p className="text-slate-600 mb-8">
                Vi tar kontakt innen 24 timer.
              </p>
              <Link href="/rederi">
                <Button>Tilbake til rederi</Button>
              </Link>
            </div>
          </Container>
        </Section>
      </main>
    );
  }

  return (
    <main>
      <Section variant="slate" className="pt-32 pb-20">
        <Container size="sm">
          {/* Breadcrumbs */}
          <div className="mb-6">
            <Breadcrumbs items={breadcrumbs} />
          </div>
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
            <div className="mb-6">
              <h1 className="text-2xl font-medium text-navy-900 mb-2">
                Kontakt oss
              </h1>
              <p className="text-slate-600 text-sm">
                Vi tar kontakt innen 24 timer.
              </p>
            </div>

            <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-medium text-navy-900 mb-2">
                Når det haster: slik reduserer vi risiko
              </p>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>
                  <span className="font-medium text-slate-800">Verifisering:</span> identitet og dokumentasjon før oppstart.
                </li>
                <li>
                  <span className="font-medium text-slate-800">Arbeidsgiveransvar:</span> vi håndterer lønn, skatt og forsikring ved innleie.
                </li>
                <li>
                  <span className="font-medium text-slate-800">Garanti:</span> 48 timers erstatningsgaranti (vilkår i avtale).
                </li>
              </ul>
              <p className="mt-3 text-xs text-slate-500">
                Les mer på{" "}
                <Link href="/trygghet" className="text-sky-600 hover:underline">
                  trygghet & etterlevelse
                </Link>
                {" "}og{" "}
                <Link href="/vilkar" className="text-sky-600 hover:underline">
                  vilkår
                </Link>
                .
              </p>
            </div>

            {/* Mode Toggle */}
            <div className="flex gap-2 mb-6 p-1 bg-slate-100 rounded-lg">
              <button
                type="button"
                onClick={() => setFormMode('simple')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-md text-sm font-medium transition-colors ${
                  formMode === 'simple'
                    ? 'bg-white text-navy-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                Enkel henvendelse
              </button>
              <button
                type="button"
                onClick={() => setFormMode('detailed')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-md text-sm font-medium transition-colors ${
                  formMode === 'detailed'
                    ? 'bg-white text-navy-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileText className="w-4 h-4" />
                Spesifikt behov
              </button>
            </div>

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <p className="text-sm text-red-600">{errorMessage}</p>
              </div>
            )}

            {/* Simple Form */}
            {formMode === 'simple' && (
              <form onSubmit={simpleForm.handleSubmit(onSubmitSimple)} className="space-y-5">
                <HoneypotField />
                
                <Input
                  label="Ditt navn"
                  placeholder="Ola Nordmann"
                  error={simpleForm.formState.errors.navn?.message}
                  required
                  {...simpleForm.register('navn')}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="E-post"
                    type="email"
                    placeholder="ola@rederi.no"
                    error={simpleForm.formState.errors.epost?.message}
                    required
                    {...simpleForm.register('epost')}
                  />
                  <Input
                    label="Telefon"
                    type="tel"
                    placeholder="12345678"
                    error={simpleForm.formState.errors.telefon?.message}
                    {...simpleForm.register('telefon')}
                  />
                </div>

                <Textarea
                  label="Hva trenger du hjelp med?"
                  placeholder="Beskriv kort hva du trenger..."
                  rows={3}
                  error={simpleForm.formState.errors.melding?.message}
                  {...simpleForm.register('melding')}
                />

                {/* GDPR Consent */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      {...simpleForm.register('godtarVilkar')}
                      className="mt-1 w-5 h-5 text-sky-500 border-slate-300 rounded focus:ring-sky-500 focus:ring-2"
                    />
                    <span className="text-sm text-slate-600 group-hover:text-slate-800">
                      Jeg godtar{' '}
                      <Link href="/personvern" className="text-sky-600 hover:underline" target="_blank">
                        personvernerklæringen
                      </Link>
                      . <span className="text-red-500">*</span>
                    </span>
                  </label>
                  {simpleForm.formState.errors.godtarVilkar && (
                    <p className="mt-1 text-sm text-red-500">{simpleForm.formState.errors.godtarVilkar.message}</p>
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
                      Send henvendelse
                      <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>
            )}

            {/* Detailed Form */}
            {formMode === 'detailed' && (
              <form onSubmit={detailedForm.handleSubmit(onSubmitDetailed)} className="space-y-5">
                <HoneypotField />

                {/* Position Selection */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Stillinger du trenger <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {positionOptions.map((position) => (
                      <button
                        key={position}
                        type="button"
                        onClick={() => togglePosition(position)}
                        className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                          selectedPositions.includes(position)
                            ? 'bg-sky-500 text-white border-sky-500'
                            : 'bg-white text-slate-700 border-slate-300 hover:border-sky-400'
                        }`}
                      >
                        {position}
                      </button>
                    ))}
                  </div>
                  {detailedForm.formState.errors.stillinger && (
                    <p className="mt-1 text-sm text-red-600">{detailedForm.formState.errors.stillinger.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Fartøytype"
                    placeholder="PSV, Brønnbåt..."
                    error={detailedForm.formState.errors.fartoytype?.message}
                    required
                    {...detailedForm.register('fartoytype')}
                  />
                  <Input
                    label="Antall"
                    type="number"
                    min={1}
                    max={99}
                    error={detailedForm.formState.errors.antall?.message}
                    required
                    {...detailedForm.register('antall', { valueAsNumber: true })}
                  />
                </div>

                <Input
                  label="Ditt navn"
                  placeholder="Ola Nordmann"
                  error={detailedForm.formState.errors.kontakt_navn?.message}
                  required
                  {...detailedForm.register('kontakt_navn')}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="E-post"
                    type="email"
                    placeholder="ola@rederi.no"
                    error={detailedForm.formState.errors.kontakt_epost?.message}
                    required
                    {...detailedForm.register('kontakt_epost')}
                  />
                  <Input
                    label="Telefon"
                    type="tel"
                    placeholder="+47 123 45 678"
                    error={detailedForm.formState.errors.kontakt_telefon?.message}
                    {...detailedForm.register('kontakt_telefon')}
                  />
                </div>

                <Textarea
                  label="Merknad (valgfritt)"
                  placeholder="Oppstart, rotasjon, bedrift..."
                  rows={3}
                  error={detailedForm.formState.errors.merknad?.message}
                  {...detailedForm.register('merknad')}
                />

                {/* GDPR Consent */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      {...detailedForm.register('godtarVilkar')}
                      className="mt-1 w-5 h-5 text-sky-500 border-slate-300 rounded focus:ring-sky-500 focus:ring-2"
                    />
                    <span className="text-sm text-slate-600 group-hover:text-slate-800">
                      Jeg godtar{' '}
                      <Link href="/personvern" className="text-sky-600 hover:underline" target="_blank">
                        personvernerklæringen
                      </Link>
                      . <span className="text-red-500">*</span>
                    </span>
                  </label>
                  {detailedForm.formState.errors.godtarVilkar && (
                    <p className="mt-1 text-sm text-red-500">{detailedForm.formState.errors.godtarVilkar.message}</p>
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
                      Send forespørsel
                      <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </Container>
      </Section>
    </main>
  );
}

