"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { CheckCircle, AlertCircle, FileText, X, Upload, User } from "@/components/icons";

interface VerifyClientProps {
  applicationId: string | null;
  candidateId: string | null;
  candidateName: string | null;
  existingCvKey: string | null;
}

export default function VerifyClient({ 
  applicationId, 
  candidateId, 
  candidateName,
  existingCvKey 
}: VerifyClientProps) {
  const router = useRouter();

  // CV is ALWAYS from profile - no choice needed
  // Extra documents (sertifikater, søknad) are optional
  const [extraDocument, setExtraDocument] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setUploadError("Filen er for stor. Maks 10 MB.");
        return;
      }
      setExtraDocument(file);
      setUploadError(null);
    }
  };

  const handleSubmit = async () => {
    if (!applicationId) {
      setUploadError("Mangler søknads-ID. Prøv å starte på nytt.");
      return;
    }

    // CV from profile is required
    if (!existingCvKey) {
      setUploadError("Du må ha CV i profilen din for å søke. Gå til profilen og last opp CV først.");
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("applicationId", applicationId);
      
      // Link to candidate profile
      if (candidateId) {
        formData.append("candidateId", candidateId);
      }
      
      // Always use CV from profile
      formData.append("useExistingCv", "true");
      formData.append("existingCvKey", existingCvKey);
      
      // Optional: cover letter
      if (coverLetter.trim()) {
        formData.append("coverLetter", coverLetter.trim());
      }
      
      // Optional: extra document (sertifikater, søknad, etc.)
      if (extraDocument) {
        formData.append("extraDocument", extraDocument);
      }

      const response = await fetch("/api/campaign/complete", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Opplasting feilet");
      }

      // Track conversion in Plausible
      if (typeof window !== "undefined" && (window as unknown as { plausible?: (event: string) => void }).plausible) {
        (window as unknown as { plausible: (event: string) => void }).plausible("campaign_complete");
      }

      // Redirect to success page
      router.push("/kampanje/verify/success");
    } catch (error) {
      console.error("Upload error:", error);
      setUploadError(
        error instanceof Error ? error.message : "Noe gikk galt. Prøv igjen."
      );
    } finally {
      setIsUploading(false);
    }
  };

  // Missing application ID
  if (!applicationId) {
    return (
      <section className="min-h-[60vh] bg-slate-50 py-20">
        <Container size="sm">
          <div className="bg-white rounded-2xl p-8 md:p-12 text-center shadow-sm border border-slate-100">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl md:text-3xl font-medium text-navy-900 mb-4">
              Noe gikk galt
            </h1>
            <p className="text-slate-600 mb-8">
              Vi fant ikke søknaden din. Vennligst prøv å søke på nytt.
            </p>
            <Button onClick={() => router.push("/stillinger")} variant="primary">
              Tilbake til stillinger
            </Button>
          </div>
        </Container>
      </section>
    );
  }

  // No CV in profile - must upload first
  if (!existingCvKey) {
    return (
      <section className="min-h-[60vh] bg-slate-50 py-20">
        <Container size="sm">
          <div className="bg-white rounded-2xl p-8 md:p-12 text-center shadow-sm border border-slate-100">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-amber-600" />
            </div>
            <h1 className="text-2xl md:text-3xl font-medium text-navy-900 mb-4">
              CV mangler i profilen
            </h1>
            <p className="text-slate-600 mb-8">
              For å søke på stillinger må du først laste opp CV i din Bluecrew-profil.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => router.push("/profil")} variant="primary">
                Gå til profilen
              </Button>
              <Button onClick={() => router.push("/stillinger")} variant="outline">
                Tilbake til stillinger
              </Button>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  // Main form - CV from profile, optional extras
  return (
    <section className="min-h-[60vh] bg-slate-50 py-20">
      <Container size="sm">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-7 h-7 text-green-600" />
            </div>
            <h1 className="text-2xl md:text-3xl font-medium text-navy-900 mb-2">
              Identitet verifisert!
            </h1>
            {candidateName && (
              <p className="text-slate-600">
                Velkommen tilbake, <span className="font-medium">{candidateName}</span>!
              </p>
            )}
          </div>

          <div className="space-y-6">
            {/* CV from profile - always shown, not editable */}
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-2">
                Din CV
              </label>
              <div className="w-full p-4 border-2 border-green-500 bg-green-50 rounded-lg flex items-center gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-500">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-navy-900">
                    CV fra din Bluecrew-profil
                  </p>
                  <p className="text-sm text-slate-500">
                    Oppdater CV i profilen din hvis du ønsker endringer
                  </p>
                </div>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
            </div>

            {/* Cover letter - optional */}
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-2">
                Søknadstekst / Følgebrev <span className="text-slate-400 font-normal">(valgfritt)</span>
              </label>
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Fortell kort om hvorfor du søker denne stillingen, relevant erfaring, eller annet du ønsker å formidle..."
                rows={4}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent resize-none text-navy-900 placeholder:text-slate-400"
              />
            </div>

            {/* Extra documents - optional */}
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-2">
                Sertifikater eller ekstra dokumenter <span className="text-slate-400 font-normal">(valgfritt)</span>
              </label>
              {extraDocument ? (
                <div className="flex items-center justify-between p-4 bg-slate-50 border-2 border-gold-500 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gold-500" />
                    <span className="text-sm text-slate-700 truncate max-w-[200px]">
                      {extraDocument.name}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setExtraDocument(null)}
                    className="p-1 hover:bg-slate-200 rounded transition-colors"
                    title="Fjern dokument"
                    aria-label="Fjern dokument"
                  >
                    <X className="w-4 h-4 text-slate-500" />
                  </button>
                </div>
              ) : (
                <label className="relative block w-full p-6 border-2 border-dashed border-slate-200 hover:border-slate-300 rounded-lg transition-colors text-center cursor-pointer">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    aria-label="Last opp sertifikater eller dokumenter"
                  />
                  <div className="flex flex-col items-center gap-2 pointer-events-none">
                    <Upload className="w-8 h-8 text-slate-400" />
                    <span className="text-sm text-slate-600">
                      Klikk for å laste opp sertifikater, attester eller andre dokumenter
                    </span>
                  </div>
                </label>
              )}
              <p className="text-xs text-slate-500 mt-2">
                PDF, DOC, DOCX, JPG eller PNG. Maks 10 MB.
              </p>
            </div>

            {/* Error message */}
            {uploadError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{uploadError}</p>
              </div>
            )}

            {/* Submit button */}
            <Button
              onClick={handleSubmit}
              disabled={isUploading}
              variant="primary"
              fullWidth
              loading={isUploading}
            >
              {isUploading ? "Sender søknad..." : "Send inn søknad"}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

