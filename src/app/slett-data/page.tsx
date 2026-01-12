'use client';

import { useState } from 'react';
import { Shield, Trash2, CheckCircle2, AlertCircle } from '@/components/icons';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import { useCsrfToken } from '@/hooks/useCsrfToken';

export default function DataDeletionPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { token: csrfToken, isLoading: csrfLoading } = useCsrfToken();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!csrfToken) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      navn: formData.get('navn'),
      epost: formData.get('epost'),
      bekreft_epost: formData.get('bekreft_epost'),
      begrunnelse: formData.get('begrunnelse'),
      type: 'data_deletion_request',
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken,
        },
        body: JSON.stringify({
          navn: data.navn,
          epost: data.epost,
          melding: `DATASLETTING FORESPØRSEL\n\nBekreftet epost: ${data.bekreft_epost}\nBegrunnelse: ${data.begrunnelse}`,
          godtarVilkar: true, // Required by validation schema
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <Section noPadding className="relative min-h-screen flex items-center bg-linear-to-br from-navy-900 via-navy-900 to-navy-800 pt-20">
        <Container size="lg" className="relative z-10">
          <div className="stagger-container max-w-2xl">
            <div className="stagger-item mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-300 text-sm font-medium backdrop-blur-sm">
                <Shield className="w-4 h-4" />
                GDPR
              </div>
            </div>

            <h1 className="stagger-item text-4xl md:text-5xl font-medium text-cream-50 mb-6 leading-tight font-heading">
              Slett dine data
            </h1>

            <p className="stagger-item text-xl text-cream-100/80 leading-relaxed">
              I henhold til GDPR har du rett til å få slettet dine personopplysninger. Vi behandler forespørselen innen 30 dager.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container size="md">
          <div className="bg-white rounded-3xl p-10 shadow-xl shadow-navy-900/5 border border-slate-200">
            {submitStatus === 'success' ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-medium text-navy-900 mb-4">
                  Forespørsel mottatt
                </h2>
                <p className="text-slate-600 text-lg">
                  Vi har mottatt din forespørsel om datasletting. Du vil motta bekreftelse på e-post innen 30 dager.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <h2 className="text-2xl font-medium text-navy-900 mb-4">
                    Be om sletting av dine data
                  </h2>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
                    <p className="text-sm text-amber-900">
                      <strong>OBS:</strong> Datasletting er permanent og kan ikke angres. Vi sletter all informasjon knyttet til din e-postadresse.
                    </p>
                  </div>
                </div>

                <Input
                  name="navn"
                  label="Fullt navn"
                  placeholder="Som registrert hos oss"
                  required
                />

                <Input
                  name="epost"
                  type="email"
                  label="E-postadresse"
                  placeholder="din@epost.no"
                  required
                />

                <Input
                  name="bekreft_epost"
                  type="email"
                  label="Bekreft e-postadresse"
                  placeholder="din@epost.no"
                  required
                />

                <Textarea
                  name="begrunnelse"
                  label="Begrunnelse (valgfritt)"
                  placeholder="Hvorfor ønsker du å slette dine data?"
                  rows={4}
                />

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                  <h3 className="font-medium text-navy-900 mb-3">Hva slettes:</h3>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• Din kandidatprofil og CV</li>
                    <li>• Kontaktinformasjon</li>
                    <li>• Søknadshistorikk</li>
                    <li>• Kommunikasjonslogg</li>
                  </ul>
                  <p className="text-xs text-slate-500 mt-4">
                    Noe data kan beholdes i henhold til bokføringsloven (5 år) og for å oppfylle juridiske forpliktelser.
                  </p>
                </div>

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-800">Feil ved innsending</p>
                      <p className="text-sm text-red-600">Prøv igjen senere eller kontakt oss direkte.</p>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  loading={isSubmitting}
                  disabled={isSubmitting || csrfLoading}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <Trash2 className="w-5 h-5" />
                  Send slettingsforespørsel
                </Button>
              </form>
            )}
          </div>
        </Container>
      </Section>
    </main>
  );
}


