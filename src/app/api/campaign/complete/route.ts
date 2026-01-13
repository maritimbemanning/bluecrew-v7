import { NextResponse, NextRequest } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sendCampaignCompleteNotification, sendCampaignConfirmation } from "@/lib/email/send";

// Type assertion for campaign_applications table (not in generated types yet)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const campaignTable = () => (supabaseAdmin as any).from("campaign_applications");

// Debug helper
function debugLog(requestId: string, step: string, data?: unknown) {
  console.log(
    `[CAMPAIGN_COMPLETE:${requestId}] ${step}`,
    data ? JSON.stringify(data, null, 2) : ""
  );
}

export async function POST(request: NextRequest) {
  const requestId = Math.random().toString(36).substring(7);
  debugLog(requestId, "=== START CAMPAIGN COMPLETE ===");

  try {
    const formData = await request.formData();
    
    const applicationId = formData.get("applicationId") as string;
    const candidateId = formData.get("candidateId") as string | null;
    const useExistingCv = formData.get("useExistingCv") === "true";
    const existingCvKey = formData.get("existingCvKey") as string | null;
    // Support both old and new field names for backwards compatibility
    const coverLetter = (formData.get("coverLetter") || formData.get("soknadstekst")) as string | null;
    const extraDocument = (formData.get("extraDocument") || formData.get("folgebrev")) as File | null;

    debugLog(requestId, "Application ID:", applicationId);
    debugLog(requestId, "Candidate ID:", candidateId);
    debugLog(requestId, "Use existing CV:", useExistingCv);
    debugLog(requestId, "Has cover letter:", !!coverLetter);
    debugLog(requestId, "Has extra document:", !!extraDocument);

    if (!applicationId) {
      return NextResponse.json(
        { error: "Mangler søknad-ID" },
        { status: 400 }
      );
    }

    // Verify application exists and get ALL data including notes
    const { data: application, error: fetchError } = await campaignTable()
      .select("id, email, name, phone, position, segment, notes, source_url")
      .eq("id", applicationId)
      .single();

    if (fetchError || !application) {
      debugLog(requestId, "Application not found:", fetchError);
      return NextResponse.json(
        { error: "Søknad ikke funnet" },
        { status: 404 }
      );
    }

    debugLog(requestId, "Application found:", application.name);

    // Prepare update data
    const updateData: Record<string, unknown> = {
      status: "pending", // Mark as ready for review
    };

    // Link to Bluecrew Profile if candidateId provided
    if (candidateId) {
      updateData.candidate_id = candidateId;
      debugLog(requestId, "Linking to candidate:", candidateId);
    }

    // Handle CV - always from existing profile now
    if (useExistingCv && existingCvKey) {
      // Use existing CV from candidate profile
      updateData.cv_url = existingCvKey;
      updateData.cv_filename = existingCvKey.split("/").pop() || "cv.pdf";
      debugLog(requestId, "Using existing CV from profile:", existingCvKey);
    }

    // Add cover letter (søknadstekst) to notes if provided
    if (coverLetter && coverLetter.trim()) {
      // Get existing notes and merge
      const { data: existing } = await campaignTable()
        .select("notes")
        .eq("id", applicationId)
        .single();
      
      let existingNotes = {};
      try {
        if (existing?.notes) {
          existingNotes = JSON.parse(existing.notes);
        }
      } catch {
        // Ignore parse errors
      }

      updateData.notes = JSON.stringify({
        ...existingNotes,
        coverLetter: coverLetter.trim(),
      });
    }

    // Upload extra document (sertifikater, etc.) if provided
    if (extraDocument && extraDocument.size > 0) {
      const docBuffer = await extraDocument.arrayBuffer();
      const docFileName = `${applicationId}/extra_${Date.now()}_${extraDocument.name}`;
      
      debugLog(requestId, "Uploading extra document:", docFileName);
      
      const { error: docUploadError } = await supabaseAdmin.storage
        .from("documents")
        .upload(docFileName, docBuffer, {
          contentType: extraDocument.type,
          upsert: false,
        });

      if (docUploadError) {
        debugLog(requestId, "Extra document upload error:", docUploadError);
        // Don't fail the whole request, just log
        console.error("[CAMPAIGN_COMPLETE] Extra document upload failed:", docUploadError);
      } else {
        // Store extra document URL in notes
        let existingNotes = {};
        try {
          if (updateData.notes) {
            existingNotes = JSON.parse(updateData.notes as string);
          } else {
            const { data: existing } = await campaignTable()
              .select("notes")
              .eq("id", applicationId)
              .single();
            if (existing?.notes) {
              existingNotes = JSON.parse(existing.notes);
            }
          }
        } catch {
          // Ignore parse errors
        }

        updateData.notes = JSON.stringify({
          ...existingNotes,
          extra_document_url: docFileName,
          extra_document_filename: extraDocument.name,
        });
        debugLog(requestId, "Extra document uploaded successfully");
      }
    }

    // Update the application
    const { error: updateError } = await campaignTable()
      .update(updateData)
      .eq("id", applicationId);

    if (updateError) {
      debugLog(requestId, "Update error:", updateError);
      return NextResponse.json(
        { error: "Kunne ikke oppdatere søknaden. Prøv igjen." },
        { status: 500 }
      );
    }

    // Parse notes to get form data (erfaring, offshoreErfaring, etc.)
    let applicationFormData: Record<string, string> = {};
    try {
      // Get the final notes (either from updateData or from original application)
      const finalNotes = updateData.notes 
        ? JSON.parse(updateData.notes as string)
        : application.notes 
          ? JSON.parse(application.notes)
          : {};
      applicationFormData = finalNotes;
    } catch {
      // Ignore parse errors
    }

    // Send emails (non-blocking)
    try {
      // 1. Notify team that application is complete - with ALL data
      const notifyResult = await sendCampaignCompleteNotification({
        name: application.name,
        email: application.email,
        phone: application.phone || "",
        position: application.position,
        segment: application.segment,
        applicationId: applicationId,
        cvUrl: updateData.cv_url as string | undefined,
        // Include all form data
        erfaring: applicationFormData.erfaring,
        offshoreErfaring: applicationFormData.offshoreErfaring,
        rovRolle: applicationFormData.rovRolle,
        sertifikater: applicationFormData.sertifikater,
        fagomrade: applicationFormData.fagomrade,
        coverLetter: applicationFormData.coverLetter,
        extraDocumentFilename: applicationFormData.extra_document_filename,
        sourceUrl: application.source_url,
      });
      
      if (notifyResult.success) {
        debugLog(requestId, "Team notification email sent");
      } else {
        debugLog(requestId, "Team notification failed:", notifyResult.error);
      }

      // 2. Send confirmation to applicant
      const confirmResult = await sendCampaignConfirmation({
        name: application.name,
        email: application.email,
        position: application.position,
      });
      
      if (confirmResult.success) {
        debugLog(requestId, "User confirmation email sent");
      } else {
        debugLog(requestId, "User confirmation failed:", confirmResult.error);
      }
    } catch (emailError) {
      debugLog(requestId, "Email error (non-blocking):", emailError);
    }

    // Create BlueCrew profile (source of truth) if we have CV
    let shortId: string | null = null;
    const cvKey = updateData.cv_url as string | undefined;
    if (cvKey && candidateId) {
      try {
        // Get candidate data for profile
        const { data: candidate } = await supabaseAdmin
          .from('candidates')
          .select('first_name, last_name, email, phone, national_id_number, vipps_verified_at')
          .eq('id', candidateId)
          .single();

        if (candidate) {
          // Check if profile already exists for this candidate
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { data: existingProfile } = await (supabaseAdmin as any)
            .from('bluecrew_profiles')
            .select('short_id')
            .eq('candidate_id', candidateId)
            .single();

          if (existingProfile) {
            shortId = existingProfile.short_id;
            debugLog(requestId, "Profile already exists:", shortId);
          } else {
            // Create new profile
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { data: profile, error: profileError } = await (supabaseAdmin as any)
              .from('bluecrew_profiles')
              .insert({
                candidate_id: candidateId,
                first_name: candidate.first_name || application.name.split(' ')[0] || 'Ukjent',
                last_name: candidate.last_name || application.name.split(' ').slice(1).join(' ') || '',
                email: candidate.email || application.email,
                phone: candidate.phone || application.phone || '',
                primary_role: application.position,
                experience_years: applicationFormData.erfaring ? parseInt(applicationFormData.erfaring) || 0 : 0,
                cv_key: cvKey,
                cv_uploaded_at: new Date().toISOString(),
                gdpr_consent: true,
                gdpr_consent_date: new Date().toISOString(),
                national_id_number: candidate.national_id_number || null,
                verified_at: candidate.vipps_verified_at || new Date().toISOString(),
              })
              .select('short_id')
              .single();

            if (profileError) {
              debugLog(requestId, "Profile create error (non-blocking):", profileError);
            } else {
              shortId = profile?.short_id || null;
              debugLog(requestId, "BlueCrew profile created:", shortId);
            }
          }
        }
      } catch (profileErr) {
        debugLog(requestId, "Profile create exception (non-blocking):", profileErr);
      }
    }

    debugLog(requestId, "=== CAMPAIGN COMPLETE SUCCESS ===");

    return NextResponse.json({
      success: true,
      message: "Søknad fullført!",
      shortId: shortId,
    });
  } catch (error) {
    debugLog(requestId, "Unexpected error:", error);
    console.error("[CAMPAIGN_COMPLETE] Unexpected error:", error);
    return NextResponse.json(
      { error: "En uventet feil oppstod. Prøv igjen." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}
