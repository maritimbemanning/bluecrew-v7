"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Send, Loader2, CheckCircle, ShieldCheck, Upload, FileText, X, LogIn } from "@/components/icons";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import { useCsrfToken } from "@/hooks/useCsrfToken";
import type { JobPosting } from "@/types/database.types";

// Simplified schema - only cover letter required (user info comes from Bluecrew profile)
const applicationSchema = z.object({
  coverLetter: z
    .string()
    .min(50, "Følgebrevet må være minst 50 tegn")
    .max(2000, "Følgebrevet kan ikke være mer enn 2000 tegn"),
  godtarVilkar: z.boolean().refine((val) => val === true, {
    message: "Du må godta vilkårene for å sende søknad",
  }),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

interface UploadedFile {
  name: string;
  path: string;
  type: 'certificates';
}

interface ApplicationFormProps {
  job: JobPosting;
  user?: {
    name?: string;
    email?: string;
    phone?: string;
    candidateId?: string;
    vippsVerified?: boolean;
    existingCvKey?: string | null;
  } | null;
}

export default function ApplicationForm({ job, user }: ApplicationFormProps) {
  const router = useRouter();
  const { token: csrfToken } = useCsrfToken();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // File upload state - only certificates (optional)
  const [certFile, setCertFile] = useState<UploadedFile | null>(null);
  const [isUploadingCert, setIsUploadingCert] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  const certInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      coverLetter: "",
      godtarVilkar: false,
    },
  });

  const coverLetter = watch("coverLetter") || "";
  const charCount = coverLetter.length;

  // If user is not logged in with Vipps, show login prompt
  if (!user?.vippsVerified || !user?.candidateId) {
    return (
      <div className="bg-navy-50 border border-navy-200 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <LogIn className="w-8 h-8 text-navy-900" />
        </div>
        <h3 className="text-xl font-medium text-navy-900 mb-2">
          Logg inn for å søke
        </h3>
        <p className="text-navy-700 mb-6">
          Du må ha en komplett Bluecrew-profil for å søke på stillinger.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href={`/logg-inn?returnTo=/stillinger/${job.slug}/sok`}>
            <Button variant="primary" size="lg">
              <LogIn className="w-5 h-5 mr-2" />
              Logg inn med Vipps
            </Button>
          </Link>
          <Link href="/meld-interesse">
            <Button variant="secondary" size="lg">
              Opprett profil
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // If user is logged in but doesn't have a complete profile (no CV), prompt to complete
  if (!user.existingCvKey) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-amber-700" />
        </div>
        <h3 className="text-xl font-medium text-amber-900 mb-2">
          Fullfør profilen din
        </h3>
        <p className="text-amber-700 mb-2">
          Hei {user.name?.split(' ')[0] || 'der'}! Du må laste opp CV for å kunne søke på stillinger.
        </p>
        <p className="text-amber-600 text-sm mb-6">
          En komplett profil øker sjansene dine for å bli kontaktet.
        </p>
        <Link href={`/registrer?returnTo=/stillinger/${job.slug}/sok`}>
          <Button variant="primary" size="lg" className="bg-amber-600 hover:bg-amber-700">
            <Upload className="w-5 h-5 mr-2" />
            Fullfør profil og last opp CV
          </Button>
        </Link>
      </div>
    );
  }

  const handleFileUpload = async (file: File) => {
    if (!csrfToken) {
      setUploadError("Sikkerhetsfeil. Vennligst last siden på nytt.");
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError("Filen er for stor. Maks 10MB.");
      return;
    }

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png",
    ];
    
    if (!allowedTypes.includes(file.type)) {
      setUploadError("Ugyldig filtype. Tillatte typer: PDF, Word, JPG, PNG");
      return;
    }

    setUploadError(null);
    setIsUploadingCert(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "certificates");

      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "x-csrf-token": csrfToken,
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Kunne ikke laste opp filen");
      }

      setCertFile({
        name: file.name,
        path: result.path,
        type: 'certificates',
      });
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Opplasting feilet");
    } finally {
      setIsUploadingCert(false);
    }
  };

  const onSubmit = async (data: ApplicationFormData) => {
    if (!csrfToken) {
      setError("Sikkerhetsfeil. Vennligst last siden på nytt.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/stillinger/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken,
        },
        body: JSON.stringify({
          jobPostingId: job.id,
          candidateId: user.candidateId,
          coverLetter: data.coverLetter,
          certificatesKey: certFile?.path || undefined,
          gdprConsent: data.godtarVilkar, // Map frontend field to API field
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Noe gikk galt. Prøv igjen senere.");
      }

      setIsSuccess(true);

      // Redirect after showing success message
      setTimeout(() => {
        router.push("/stillinger?success=applied");
      }, 4000); // 4 seconds to read the message
    } catch (err) {
      setError(err instanceof Error ? err.message : "Noe gikk galt");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-medium text-green-900 mb-2">
          Søknad sendt!
        </h3>
        <p className="text-green-700">
          Vi har mottatt din søknad på stillingen {job.title}
          {job.company_name && ` hos ${job.company_name}`}. Du vil bli kontaktet når vi har noe nytt.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
          {error}
        </div>
      )}

      {/* User profile info - read only */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-green-900 mb-2">
              Du søker med din Bluecrew-profil
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-green-800">
              <div>
                <span className="text-green-600">Navn:</span> {user.name || 'Ikke angitt'}
              </div>
              <div>
                <span className="text-green-600">E-post:</span> {user.email || 'Ikke angitt'}
              </div>
              <div>
                <span className="text-green-600">Telefon:</span> {user.phone || 'Ikke angitt'}
              </div>
            </div>
            <Link 
              href="/profil" 
              className="inline-block mt-2 text-xs text-green-700 hover:text-green-900 underline"
            >
              Oppdater profil
            </Link>
          </div>
        </div>
      </div>

      {/* Cover Letter - Required */}
      <div>
        <label
          htmlFor="coverLetter"
          className="block text-sm font-medium text-navy-900 mb-2"
        >
          Følgebrev <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-slate-600 mb-3">
          Fortell kort om hvorfor du er interessert i stillingen og hva du kan bidra med.
        </p>
        <Textarea
          id="coverLetter"
          {...register("coverLetter")}
          placeholder="Skriv din motivasjon for stillingen her..."
          rows={6}
          error={errors.coverLetter?.message}
          className="resize-none"
        />
        <div className="flex justify-between items-center mt-2">
          <span className={`text-sm ${charCount < 50 ? "text-amber-600" : "text-green-600"}`}>
            {charCount < 50 ? `${50 - charCount} tegn igjen` : "✓ Minimum oppnådd"}
          </span>
          <span
            className={`text-sm ${
              charCount > 2000 ? "text-red-600" : "text-slate-500"
            }`}
          >
            {charCount}/2000
          </span>
        </div>
      </div>

      {/* Certificates Upload - Optional */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-navy-900">
            Sertifikater <span className="text-slate-500 font-normal">(valgfritt)</span>
          </h3>
        </div>

        {uploadError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
            {uploadError}
          </div>
        )}

        <input
          ref={certInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          className="hidden"
          aria-label="Last opp sertifikater"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileUpload(file);
          }}
        />
        
        {certFile ? (
          <div className="border border-green-200 bg-green-50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-900">Sertifikater lastet opp</p>
                  <p className="text-xs text-green-700 truncate max-w-[200px]">{certFile.name}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setCertFile(null)}
                className="p-1 hover:bg-green-100 rounded-full transition-colors"
                aria-label="Fjern sertifikater"
              >
                <X className="w-4 h-4 text-green-600" />
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => certInputRef.current?.click()}
            disabled={isUploadingCert}
            className="w-full border-2 border-dashed border-slate-300 hover:border-gold-400 rounded-xl p-4 transition-colors group"
          >
            <div className="flex flex-col items-center gap-2">
              {isUploadingCert ? (
                <Loader2 className="w-6 h-6 text-gold-500 animate-spin" />
              ) : (
                <Upload className="w-6 h-6 text-slate-400 group-hover:text-gold-500 transition-colors" />
              )}
              <div className="text-center">
                <p className="text-sm font-medium text-navy-900">
                  {isUploadingCert ? "Laster opp..." : "Last opp sertifikater"}
                </p>
                <p className="text-xs text-slate-500">PDF, Word eller bilde (maks 10MB)</p>
              </div>
            </div>
          </button>
        )}
      </div>

      {/* GDPR Consent Checkbox */}
      <div className="space-y-2">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            {...register("godtarVilkar")}
            className="mt-1 w-5 h-5 rounded border-slate-300 text-gold-600 focus:ring-gold-500 cursor-pointer"
          />
          <span className="text-sm text-slate-700 leading-relaxed">
            Jeg godtar at Bluecrew behandler mine personopplysninger for vurdering av denne stillingen,
            og at søknaden kan deles med arbeidsgiver. Les vår{' '}
            <a href="/personvern" target="_blank" className="text-gold-600 hover:text-gold-700 underline">
              personvernerklæring
            </a>{' '}
            og{' '}
            <a href="/vilkar" target="_blank" className="text-gold-600 hover:text-gold-700 underline">
              brukervilkår
            </a>.
          </span>
        </label>
        {errors.godtarVilkar && (
          <p className="text-sm text-red-600 ml-8">{errors.godtarVilkar.message}</p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting || isUploadingCert}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Sender søknad...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            Send søknad
          </>
        )}
      </Button>
    </form>
  );
}



