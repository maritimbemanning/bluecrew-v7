'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ChevronRight,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Upload,
  FileText,
  X,
} from '@/components/icons';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import { registrationSchema, type RegistrationFormData } from '@/lib/validations';
import { useCsrfToken } from '@/hooks/useCsrfToken';

const positions = [
  // Offshore kampanje-stillinger
  'Elektriker',
  'Rigger / Dekksoperatør',
  'ROV-pilot',
  'ETO (Elektro-Teknisk Offiser)',
  'Sveiser',
  'Mekaniker',
  // Maritime stillinger
  'Kaptein',
  'Overstyrmann',
  'Styrmann',
  'Maskinsjef',
  'Maskinist',
  'Motormann',
  'Matros',
  // Havbruk
  'Servicebåt Oppdrett',
  'Akvatekniker',
  'Skipper',
  // Service
  'Kokk',
  'Steward',
  'Forpleining',
  // Annet
  'Annet',
];

const experienceLevels = [
  { value: 'nyutdannet', label: 'Nyutdannet / Under 1 år' },
  { value: '1-3', label: '1-3 år' },
  { value: '3-5', label: '3-5 år' },
  { value: '5-10', label: '5-10 år' },
  { value: '10+', label: 'Over 10 år' },
];

// Campaign prefill data (from campaign_applications)
interface CampaignPrefill {
  position?: string;
  notes?: {
    erfaring?: string;
    sertifikater?: string;
  };
}

interface RegistrationFormProps {
  candidateId: string;
  prefillName?: string;
  prefillEmail?: string;
  prefillPhone?: string;
  returnTo?: string;
  campaignPrefill?: CampaignPrefill | null;
}

export default function RegistrationForm({
  candidateId,
  prefillName,
  prefillEmail,
  prefillPhone,
  returnTo = '/stillinger',
  campaignPrefill,
}: RegistrationFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Check if coming from campaign flow
  const isCampaignFlow = returnTo.includes('/kampanje/verify');

  // File state
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [certsFiles, setCertsFiles] = useState<File[]>([]);
  const cvInputRef = useRef<HTMLInputElement>(null);
  const certsInputRef = useRef<HTMLInputElement>(null);

  const {
    token: csrfToken,
    error: csrfError,
    refresh: refreshCsrfToken,
  } = useCsrfToken();

  // Map campaign position to form position
  const getDefaultRole = () => {
    if (!campaignPrefill?.position) return '';
    const pos = campaignPrefill.position.toLowerCase();
    
    // Direct mapping for campaign positions
    const campaignMapping: Record<string, string> = {
      'elektriker': 'Elektriker',
      'riggere': 'Rigger / Dekksoperatør',
      'rov': 'ROV-pilot',
      'rov-pilot': 'ROV-pilot',
      'eto': 'ETO (Elektro-Teknisk Offiser)',
      'sveiser': 'Sveiser',
      'mekaniker': 'Mekaniker',
      'offshore': 'Annet', // General offshore goes to Annet
    };
    
    // Check direct mapping first
    if (campaignMapping[pos]) {
      return campaignMapping[pos];
    }
    
    // Fallback: Try to find matching position in our list
    const match = positions.find(p => p.toLowerCase().includes(pos) || pos.includes(p.toLowerCase()));
    return match || '';
  };

  // Map campaign experience to form experience
  const getDefaultErfaring = () => {
    if (!campaignPrefill?.notes?.erfaring) return '';
    const exp = campaignPrefill.notes.erfaring;
    // Map campaign format (0-2, 3-5, 6-10, 10+) to our format
    if (exp === '0-2') return 'nyutdannet';
    if (exp === '3-5') return '3-5';
    if (exp === '6-10' || exp === '5-10') return '5-10';
    if (exp === '10+') return '10+';
    return '';
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      rolle: getDefaultRole(),
      erfaring: getDefaultErfaring(),
      onskerMidlertidig: undefined,
      tilgjengeligFra: '',
      melding: '',
      stcwConsent: false,
      gdprConsent: false,
    },
  });

  const isAllowedFile = (file: File, allowedTypes: string[], allowedExts: string[]) => {
    const ext = `.${file.name.split('.').pop()?.toLowerCase()}`;
    if (allowedTypes.includes(file.type)) return true;
    if (!file.type || file.type === 'application/octet-stream') {
      return allowedExts.includes(ext);
    }
    return false;
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: (file: File | null) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];
      const allowedExts = ['.pdf', '.doc', '.docx'];
      if (!isAllowedFile(file, allowedTypes, allowedExts)) {
        setErrorMessage('Ugyldig filtype. Kun PDF og Word er tillatt for CV.');
        return;
      }
      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        setErrorMessage('Filen er for stor. Maks 10MB.');
        return;
      }
      setFile(file);
      setErrorMessage('');
    }
  };

  const handleCertsFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/jpeg',
        'image/png',
      ];
      const allowedExts = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'];
      
      const newFiles: File[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!isAllowedFile(file, allowedTypes, allowedExts)) {
          setErrorMessage(`Ugyldig filtype for "${file.name}". Kun PDF, Word og bilder er tillatt.`);
          return;
        }
        if (file.size > 10 * 1024 * 1024) {
          setErrorMessage(`"${file.name}" er for stor. Maks 10MB per fil.`);
          return;
        }
        newFiles.push(file);
      }
      
      setCertsFiles(prev => [...prev, ...newFiles]);
      setErrorMessage('');
    }
    // Reset input so same file can be selected again
    e.target.value = '';
  };

  const removeCertFile = (index: number) => {
    setCertsFiles(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: RegistrationFormData) => {
    const token = csrfToken ?? (await refreshCsrfToken());
    if (!token) {
      setErrorMessage('Sikkerhetsfeil. Prøv å laste siden på nytt.');
      setSubmitStatus('error');
      return;
    }

    // CV is required
    if (!cvFile) {
      setErrorMessage('Du må laste opp CV for å fullføre registreringen.');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('candidateId', candidateId);
      formData.append('rolle', data.rolle);
      formData.append('erfaring', data.erfaring);
      formData.append('onskerMidlertidig', String(data.onskerMidlertidig));
      formData.append('tilgjengeligFra', data.tilgjengeligFra || '');
      formData.append('melding', data.melding || '');
      formData.append('stcwConsent', String(data.stcwConsent));
      formData.append('gdprConsent', String(data.gdprConsent));

      if (cvFile) {
        formData.append('cv', cvFile);
      }
      // Append multiple certificate files
      certsFiles.forEach((file) => {
        formData.append('sertifikater', file);
      });

      const response = await fetch('/api/registrer', {
        method: 'POST',
        headers: {
          'x-csrf-token': token,
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        // Redirect to returnTo destination after a short delay
        // If coming from campaign flow, go back to verify page
        setTimeout(() => {
          router.push(returnTo);
        }, 2000);
      } else {
        if (response.status === 401 || response.status === 403) {
          // Not logged in or needs Vipps auth -> send to Vipps flow
          const vippsReturn = `/registrer?returnTo=${encodeURIComponent(returnTo)}`;
          router.push(`/api/vipps/start?returnTo=${encodeURIComponent(vippsReturn)}`);
          return;
        }
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
        <h3 className="text-2xl font-medium text-navy-900 mb-4">
          Profilen din er fullført!
        </h3>
        <p className="text-slate-600 mb-6">
          {isCampaignFlow 
            ? 'Du blir nå sendt tilbake for å fullføre søknaden...'
            : 'Du kan nå søke på stillinger. Du blir sendt videre...'}
        </p>
        <Link href={returnTo}>
          <Button>
            {isCampaignFlow ? 'Fullfør søknaden' : 'Se ledige stillinger'}
            <ChevronRight className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Campaign flow info banner */}
      {isCampaignFlow && (
        <div className="mb-6 p-4 bg-gold-50 border border-gold-200 rounded-lg">
          <p className="text-sm text-navy-800">
            <strong>Søknaden din er lagret!</strong> Fullfør profilen din med CV for å sende inn søknaden.
          </p>
        </div>
      )}

      {/* Pre-filled user info */}
      <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
        <p className="text-sm text-slate-600 mb-2">Logget inn som:</p>
        <p className="font-medium text-slate-900">{prefillName}</p>
        <p className="text-sm text-slate-600">{prefillEmail}</p>
        {prefillPhone && <p className="text-sm text-slate-600">{prefillPhone}</p>}
      </div>

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
        {csrfError && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800">
              Sikkerhetsfeil.{' '}
              <button
                type="button"
                onClick={() => void refreshCsrfToken()}
                className="underline font-medium"
              >
                Prøv igjen
              </button>
            </p>
          </div>
        )}

        {/* Rolle */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Hva er din foretrukne stilling? <span className="text-red-500">*</span>
          </label>
          <select
            {...register('rolle')}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky focus:border-transparent transition-all bg-white text-slate-800 ${errors.rolle ? 'border-red-300' : 'border-slate-200'}`}
          >
            <option value="">Velg stilling...</option>
            {positions.map((position) => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </select>
          {errors.rolle && (
            <p className="mt-1 text-sm text-red-600">{errors.rolle.message}</p>
          )}
        </div>

        {/* Erfaring */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Hvor mye erfaring har du? <span className="text-red-500">*</span>
          </label>
          <select
            {...register('erfaring')}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky focus:border-transparent transition-all bg-white text-slate-800 ${errors.erfaring ? 'border-red-300' : 'border-slate-200'}`}
          >
            <option value="">Velg erfaring...</option>
            {experienceLevels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
          {errors.erfaring && (
            <p className="mt-1 text-sm text-red-600">{errors.erfaring.message}</p>
          )}
        </div>

        {/* Ønsker midlertidig */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Ønsker du midlertidig ansettelse/oppdrag? <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="true"
                {...register('onskerMidlertidig')}
                className="w-4 h-4 text-sky border-slate-300 focus:ring-sky"
              />
              <span className="text-slate-700">Ja</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="false"
                {...register('onskerMidlertidig')}
                className="w-4 h-4 text-sky border-slate-300 focus:ring-sky"
              />
              <span className="text-slate-700">Nei, kun fast stilling</span>
            </label>
          </div>
          {errors.onskerMidlertidig && (
            <p className="mt-1 text-sm text-red-600">{errors.onskerMidlertidig.message}</p>
          )}
        </div>

        {/* Tilgjengelig fra */}
        <Input
          label="Tilgjengelig fra"
          type="date"
          error={errors.tilgjengeligFra?.message}
          {...register('tilgjengeligFra')}
        />

        {/* CV Upload - REQUIRED */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Last opp CV <span className="text-red-500">*</span>
          </label>
          {cvFile ? (
            <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-sky" />
                <span className="text-sm text-slate-700 truncate max-w-[200px]">
                  {cvFile.name}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setCvFile(null)}
                className="text-slate-400 hover:text-red-500"
                aria-label="Fjern CV"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <label className="relative block w-full p-4 border-2 border-dashed border-slate-300 rounded-lg hover:border-sky hover:bg-slate-50 transition-colors cursor-pointer">
              <input
                id="cv-upload"
                type="file"
                ref={cvInputRef}
                onChange={(e) => handleFileChange(e, setCvFile)}
                accept=".pdf,.doc,.docx"
                className="absolute inset-0 opacity-0 cursor-pointer"
                aria-label="Last opp CV"
              />
              <div className="flex flex-col items-center gap-2 pointer-events-none">
                <Upload className="w-6 h-6 text-slate-400" />
                <span className="text-sm text-slate-600">
                  Klikk for å laste opp CV (PDF eller Word)
                </span>
              </div>
            </label>
          )}
        </div>

        {/* Sertifikater Upload - Multiple files */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Last opp sertifikater (valgfritt) - du kan legge til flere filer
          </label>
          {/* List of uploaded certificate files */}
          {certsFiles.length > 0 && (
            <div className="space-y-2 mb-3">
              {certsFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-sky" />
                    <span className="text-sm text-slate-700 truncate max-w-[200px]">
                      {file.name}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeCertFile(index)}
                    className="text-slate-400 hover:text-red-500"
                    aria-label={`Fjern ${file.name}`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {/* Add more files button */}
          <label className="relative block w-full p-4 border-2 border-dashed border-slate-300 rounded-lg hover:border-sky hover:bg-slate-50 transition-colors cursor-pointer">
            <input
              type="file"
              ref={certsInputRef}
              onChange={handleCertsFileChange}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              multiple
              className="absolute inset-0 opacity-0 cursor-pointer"
              aria-label="Last opp sertifikater"
            />
            <div className="flex flex-col items-center gap-2 pointer-events-none">
              <Upload className="w-6 h-6 text-slate-400" />
              <span className="text-sm text-slate-600">
                {certsFiles.length > 0 
                  ? 'Klikk for å legge til flere sertifikater'
                  : 'Klikk for å laste opp sertifikater (PDF, Word eller bilde)'}
              </span>
            </div>
          </label>
        </div>

        {/* Melding/Fritekst */}
        <Textarea
          label="Er det noe mer du vil fortelle oss? (valgfritt)"
          placeholder="Fortell litt om din erfaring, ønsker, eller andre ting vi bør vite..."
          rows={4}
          error={errors.melding?.message}
          {...register('melding')}
        />

        {/* STCW/Helseattest Consent */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              {...register('stcwConsent')}
              className="mt-1 w-5 h-5 text-sky border-slate-300 rounded focus:ring-sky focus:ring-2"
            />
            <span className="text-sm text-slate-600 group-hover:text-slate-800">
              Jeg bekrefter at jeg har gyldig STCW-sertifikater og helseattest for sjøfolk, eller er villig til å skaffe dette før oppstart. <span className="text-red-500">*</span>
            </span>
          </label>
          {errors.stcwConsent && (
            <p className="mt-1 text-sm text-red-600">{errors.stcwConsent.message}</p>
          )}
        </div>

        {/* GDPR Consent */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              {...register('gdprConsent')}
              className="mt-1 w-5 h-5 text-sky border-slate-300 rounded focus:ring-sky focus:ring-2"
            />
            <span className="text-sm text-slate-600 group-hover:text-slate-800">
              Jeg godtar{' '}
              <Link href="/personvern" className="text-sky hover:underline" target="_blank">
                personvernerklæringen
              </Link>
              {' '}og{' '}
              <Link href="/vilkar" className="text-sky hover:underline" target="_blank">
                vilkårene
              </Link>
              , inkludert deling av sertifikater med potensielle oppdragsgivere.
              <span className="text-red-500"> *</span>
            </span>
          </label>
          {errors.gdprConsent && (
            <p className="mt-1 text-sm text-red-600">{errors.gdprConsent.message}</p>
          )}
        </div>

        <Button
          type="submit"
          fullWidth
          size="lg"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Lagrer...
            </>
          ) : (
            <>
              Fullfør registrering
              <ChevronRight className="w-5 h-5" />
            </>
          )}
        </Button>
      </form>
    </>
  );
}

