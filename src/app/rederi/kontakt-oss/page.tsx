'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Phone,
  Mail,
  ChevronRight,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Clock,
  MapPin,
  Building2
} from '@/components/icons';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import HoneypotField from '@/components/ui/HoneypotField';
import { contactSchema, type ContactFormData } from '@/lib/validations';
import { useCsrfToken } from '@/hooks/useCsrfToken';

const breadcrumbs = [
  { name: 'Hjem', url: '/' },
  { name: 'Rederi', url: '/rederi' },
  { name: 'Kontakt', url: '/rederi/kontakt-oss' },
];

const contacts = [
  {
    name: 'Isak Didriksson',
    title: 'Daglig leder',
    phone: '+47 923 28 850',
    email: 'isak@bluecrew.no',
  },
  {
    name: 'Tor Faafeng',
    title: 'Recruitment Manager',
    phone: '+47 401 75 841',
    email: 'tf@bluecrew.no',
  },
];

export default function KontaktOssPage() {
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

  return (
    <main>
      {/* Hero Section */}
      <Section variant="navy" className="pt-20">
        <Container size="lg">
          <div className="py-12 md:py-20">
            <div className="stagger max-w-3xl">
              <div className="animate-fade-in-up mb-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-sky/20 rounded-full text-sky-200 text-sm font-medium">
                  <Phone className="w-4 h-4" />
                  Kontakt for rederier
                </span>
              </div>

              <h1 className="animate-fade-in-up text-4xl md:text-5xl font-medium text-cream-50 mb-6">
                Snakk med oss direkte
              </h1>

              <p className="animate-fade-in-up text-xl text-cream-100/80 mb-8">
                Trenger du mannskap raskt? Ring oss direkte eller send en melding. Vi tar kontakt så raskt som praktisk mulig.
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

      {/* Contact Info & Form */}
      <Section variant="slate">
        <Container size="lg">
          <div className="stagger">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="animate-fade-in-up">
                <h2 className="text-2xl md:text-3xl font-medium text-navy mb-6">
                  Kontaktinformasjon
                </h2>

                <div className="space-y-6 mb-8">
                  {contacts.map((contact, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                      <h3 className="font-medium text-navy text-lg mb-1">{contact.name}</h3>
                      <p className="text-slate-500 text-sm mb-4">{contact.title}</p>
                      <div className="space-y-2">
                        <a
                          href={`tel:${contact.phone.replace(/\s/g, '')}`}
                          className="flex items-center gap-3 text-slate-600 hover:text-sky transition-colors"
                        >
                          <Phone className="w-5 h-5 text-sky" />
                          {contact.phone}
                        </a>
                        <a
                          href={`mailto:${contact.email}`}
                          className="flex items-center gap-3 text-slate-600 hover:text-sky transition-colors"
                        >
                          <Mail className="w-5 h-5 text-sky" />
                          {contact.email}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-medium text-navy text-lg mb-4">Bluecrew AS</h3>
                  <div className="space-y-3 text-slate-600">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-sky shrink-0 mt-0.5" />
                      <span>Harstad, Norge</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Building2 className="w-5 h-5 text-sky shrink-0 mt-0.5" />
                      <span>Org.nr: 936 463 843</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-sky shrink-0 mt-0.5" />
                      <a href="mailto:post@bluecrew.no" className="hover:text-sky transition-colors">
                        post@bluecrew.no
                      </a>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-sky shrink-0 mt-0.5" />
                      <a href="tel:+4777029000" className="hover:text-sky transition-colors">
                        +47 77 02 90 00
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 text-slate-500 text-sm">
                  <Clock className="w-4 h-4" />
                  Responstid: I åpningstid
                </div>
              </div>

              {/* Contact Form */}
              <div className="animate-fade-in-up">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  {submitStatus === 'success' ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-medium text-navy mb-4">
                        Takk for henvendelsen!
                      </h3>
                      <p className="text-slate-600 mb-6">
                        Vi tar kontakt så snart som mulig.
                      </p>
                      <Button onClick={() => setSubmitStatus('idle')}>
                        Send ny melding
                      </Button>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-2xl font-medium text-navy mb-2">
                        Send oss en melding
                      </h2>
                      <p className="text-slate-600 mb-6">
                        Fortell oss hva du trenger, så tar vi kontakt.
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
                          placeholder="Ditt navn"
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
                          placeholder="Fortell oss hva du trenger..."
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
                              className="mt-1 w-5 h-5 text-sky border-slate-300 rounded focus:ring-sky focus:ring-2"
                            />
                            <span className="text-sm text-slate-600 group-hover:text-slate-800">
                              Jeg godtar{' '}
                              <Link href="/personvern" className="text-sky hover:underline font-medium" target="_blank">
                                personvernerklæringen
                              </Link>
                              {' '}og{' '}
                              <Link href="/vilkar" className="text-sky hover:underline font-medium" target="_blank">
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
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Quick action */}
      <Section>
        <Container size="md">
          <div className="stagger text-center">
            <div className="animate-fade-in-up">
              <h2 className="text-2xl md:text-3xl font-medium text-navy mb-4">
                Vet du allerede hva du trenger?
              </h2>
              <p className="text-slate-600 mb-6">
                Gå direkte til skjemaet for bemanningsbehov.
              </p>
              <Link href="/rederi/behov">
                <Button size="lg">
                  Registrer bemanningsbehov
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}

