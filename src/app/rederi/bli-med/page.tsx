'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Handshake,
  ChevronRight,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Star,
  Users,
  Shield
} from '@/components/icons';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import { useCsrfToken } from '@/hooks/useCsrfToken';

const breadcrumbs = [
  { name: 'Hjem', url: '/' },
  { name: 'Rederi', url: '/rederi' },
  { name: 'Bli partner', url: '/rederi/bli-med' },
];

// Schema for partner application
const partnerSchema = z.object({
  bedrift: z.string().min(2, 'Bedriftsnavn må være minst 2 tegn').max(100),
  kontakt_navn: z.string().min(2, 'Navnet må være minst 2 tegn').max(100),
  kontakt_epost: z.string().email('Ugyldig e-postadresse').toLowerCase(),
  kontakt_telefon: z.string().optional().or(z.literal('')),
  beskrivelse: z.string().min(10, 'Beskrivelsen må være minst 10 tegn').max(2000),
  antall_fartoy: z.string().optional().or(z.literal('')),
  interessert_i: z.array(z.string()).optional(),
  // GDPR compliance
  godtarVilkar: z.boolean().refine((val) => val === true, {
    message: 'Du må godta personvernerklæringen',
  }),
});

type PartnerFormData = z.infer<typeof partnerSchema>;

const interestOptions = [
  'Bemanning / Innleie',
  'Fast rekruttering',
  'Langsiktig partnerskap',
  'ROV / Spesialister',
  'Annet',
];

const benefits = [
  {
    icon: Star,
    title: 'Prioritert tilgang',
    description: 'Prioritert oppfølging og raskere avklaring når det oppstår behov.',
  },
  {
    icon: Users,
    title: 'Dedikert kontakt',
    description: 'En fast kontaktperson som kjenner din bedrift og dine behov.',
  },
  {
    icon: Shield,
    title: 'Trygg partner',
    description: 'Godkjent bemanningsforetak med DNV-sertifisert rekrutterer.',
  },
];

export default function BliMedPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const { token: csrfToken, isLoading: csrfLoading } = useCsrfToken();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PartnerFormData>({
    resolver: zodResolver(partnerSchema),
    defaultValues: {
      interessert_i: [],
      godtarVilkar: false,
    },
  });

  const onSubmit = async (data: PartnerFormData) => {
    if (!csrfToken) {
      setErrorMessage('Sikkerhetsfeil. Vennligst last siden på nytt.');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Use contact endpoint with partner context
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken,
        },
        body: JSON.stringify({
          navn: `${data.kontakt_navn} (${data.bedrift})`,
          epost: data.kontakt_epost,
          telefon: data.kontakt_telefon,
          melding: `PARTNERFORESPØRSEL\n\nBedrift: ${data.bedrift}\nAntall fartøy: ${data.antall_fartoy || 'Ikke oppgitt'}\nInteressert i: ${selectedInterests.join(', ') || 'Ikke spesifisert'}\n\nBeskrivelse:\n${data.beskrivelse}`,
          godtarVilkar: true,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        reset();
        setSelectedInterests([]);
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
    <main>
      {/* Hero Section */}
      <Section noPadding className="relative min-h-screen flex items-center bg-linear-to-br from-navy-900 via-navy-900 to-navy-800 pt-20">
        <Container size="lg">
          <div className="max-w-3xl">
            <div className="stagger">
              <div className="animate-fade-in-up mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-300 text-sm font-medium backdrop-blur-sm">
                  <Handshake className="w-4 h-4" />
                  Bli med i nettverket
                </div>
              </div>

              <h1 className="animate-fade-in-up text-4xl md:text-6xl font-medium text-cream-50 mb-6 leading-tight font-heading">
                Bli partner med
                <span className="block text-gold-400">Bluecrew</span>
              </h1>

              <p className="animate-fade-in-up text-xl text-cream-100/80 mb-10 leading-relaxed">
                For rederier som ønsker langsiktig samarbeid med prioritert tilgang til kvalifiserte sjøfolk.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-100">
        <Container size="lg">
          <div className="py-3">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </Container>
      </div>

      {/* Benefits */}
      <Section className="bg-white">
        <Container size="lg">
          <div className="stagger">
            <div className="animate-fade-in-up text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-medium text-navy-900 mb-4">
                Hvorfor bli partner?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="animate-fade-in-up bg-slate-50 rounded-3xl p-8 text-center border border-slate-200 hover:border-gold-400/30 hover:shadow-lg hover:shadow-gold-400/5 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-sm text-gold-500">
                    <benefit.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-medium text-navy-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Form Section */}
      <Section className="bg-slate-50">
        <Container size="md">
          <div className="stagger">
            <div className="bg-white rounded-3xl p-10 md:p-12 shadow-xl shadow-navy-900/5 border border-slate-200">
              {submitStatus === 'success' ? (
                <div className="animate-fade-in-up text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-medium text-navy-900 mb-4 font-heading">
                    Takk for din interesse!
                  </h2>
                  <p className="text-slate-600 mb-10 text-lg">
                    Vi har mottatt din forespørsel og tar kontakt så raskt som praktisk mulig for å diskutere et mulig partnerskap.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/rederi">
                      <Button variant="outline">
                        Tilbake til rederi
                      </Button>
                    </Link>
                    <Link href="/">
                      <Button className="bg-navy-900 text-white hover:bg-navy-800">
                        Til forsiden
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <div className="animate-fade-in-up mb-10 text-center">
                    <h2 className="text-2xl md:text-3xl font-medium text-navy-900 mb-3 font-heading">
                      Interesseskjema for partnere
                    </h2>
                    <p className="text-slate-600">
                      Fortell oss om bedriften din og hva du ser etter i et samarbeid.
                    </p>
                  </div>

                  {submitStatus === 'error' && (
                    <div className="animate-fade-in-up mb-8 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-red-800">Feil ved innsending</p>
                        <p className="text-sm text-red-600">{errorMessage}</p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="space-y-6">
                      <div className="animate-fade-in-up">
                        <Input
                          label="Bedriftsnavn"
                          placeholder="Ditt rederi eller selskap"
                          error={errors.bedrift?.message}
                          {...register('bedrift')}
                        />
                      </div>

                      <div className="animate-fade-in-up">
                        <Input
                          label="Antall fartøy (valgfritt)"
                          placeholder="F.eks. 5 PSV, 2 AHTS..."
                          error={errors.antall_fartoy?.message}
                          {...register('antall_fartoy')}
                        />
                      </div>

                      <div className="animate-fade-in-up">
                        <label className="block text-sm font-medium text-slate-500 mb-3 ml-1">
                          Hva er dere interessert i?
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {interestOptions.map((option) => (
                            <label
                              key={option}
                              className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                                selectedInterests.includes(option)
                                  ? 'border-gold-400 bg-arctic-50/50'
                                  : 'border-slate-200 hover:border-slate-300 bg-white'
                              }`}
                            >
                              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                                selectedInterests.includes(option)
                                  ? 'bg-gold-400 border-gold-400'
                                  : 'border-slate-300 bg-white'
                              }`}>
                                {selectedInterests.includes(option) && (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                                )}
                              </div>
                              <input
                                type="checkbox"
                                className="sr-only"
                                checked={selectedInterests.includes(option)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedInterests([...selectedInterests, option]);
                                  } else {
                                    setSelectedInterests(selectedInterests.filter((i) => i !== option));
                                  }
                                }}
                              />
                              <span className="text-sm font-medium text-navy-900">{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="animate-fade-in-up border-t border-slate-200 pt-8">
                      <h3 className="text-lg font-medium text-navy-900 mb-6 font-heading">
                        Kontaktperson
                      </h3>
                      <div className="space-y-6">
                        <Input
                          label="Ditt navn"
                          placeholder="Ola Nordmann"
                          error={errors.kontakt_navn?.message}
                          {...register('kontakt_navn')}
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <Input
                            label="E-post"
                            type="email"
                            placeholder="ola@rederi.no"
                            error={errors.kontakt_epost?.message}
                            {...register('kontakt_epost')}
                          />

                          <Input
                            label="Telefon (valgfritt)"
                            type="tel"
                            placeholder="+47 123 45 678"
                            error={errors.kontakt_telefon?.message}
                            {...register('kontakt_telefon')}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="animate-fade-in-up">
                      <Textarea
                        label="Fortell oss mer om behovene deres"
                        placeholder="Beskriv hvilke stillinger dere oftest trenger, typiske rotasjoner, operasjonsområder osv..."
                        rows={6}
                        error={errors.beskrivelse?.message}
                        {...register('beskrivelse')}
                      />
                    </div>

                    {/* GDPR Consent */}
                    <div className="animate-fade-in-up">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          {...register('godtarVilkar')}
                          className="mt-1 w-5 h-5 text-gold-500 border-slate-300 rounded focus:ring-gold-500 focus:ring-2"
                        />
                        <span className="text-sm text-slate-600 group-hover:text-mist-800">
                          Jeg godtar{' '}
                          <Link href="/personvern" className="text-arctic-600 hover:underline" target="_blank">
                            personvernerklæringen
                          </Link>
                          . <span className="text-red-500">*</span>
                        </span>
                      </label>
                      {errors.godtarVilkar && (
                        <p className="mt-1 text-sm text-red-500 ml-8">{errors.godtarVilkar.message}</p>
                      )}
                    </div>

                    <div className="animate-fade-in-up pt-4">
                      <Button
                        type="submit"
                        fullWidth
                        size="lg"
                        loading={isSubmitting}
                        disabled={csrfLoading || isSubmitting}
                        className="bg-navy-900 text-white hover:bg-navy-800"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Sender...
                          </>
                        ) : (
                          <>
                            Send partnerforespørsel
                            <ChevronRight className="w-5 h-5" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* Alternative CTA */}
      <Section className="bg-white border-t border-slate-100">
        <Container size="md">
          <div className="stagger text-center">
            <div className="animate-fade-in-up">
              <h2 className="text-2xl font-medium text-navy-900 mb-4 font-heading">
                Vil du heller snakke med oss først?
              </h2>
              <p className="text-slate-600 mb-8">
                Ring oss direkte eller send en uforpliktende melding.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/rederi/kontakt-oss">
                  <Button variant="outline" className="bg-white border-slate-200 hover:border-gold-400 text-navy-900">
                    Kontakt oss
                  </Button>
                </Link>
                <Link href="/rederi/partner">
                  <Button variant="outline" className="bg-white border-slate-200 hover:border-gold-400 text-navy-900">
                    Les mer om partnerskap
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}

