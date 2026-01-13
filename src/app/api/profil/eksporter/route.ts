/**
 * GDPR Data Export API
 * Allows users to download all their personal data in JSON format
 */

import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth/get-user";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  try {
    // Get authenticated user from Vipps session
    const user = await getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Ikke autentisert. Vennligst logg inn med Vipps." },
        { status: 401 }
      );
    }

    const candidateId = user.candidateId;

    // Fetch candidate profile using admin client (bypasses RLS)
    const { data: profile } = await supabaseAdmin
      .from("candidates")
      .select("*")
      .eq("id", candidateId)
      .single();

    // Fetch job applications by email (more reliable than candidate_id which may not be set)
    const { data: applications } = await supabaseAdmin
      .from("job_applications")
      .select("id, job_posting_id, candidate_id, status, cover_letter, created_at, updated_at, name, email")
      .eq("email", user.email.toLowerCase())
      .order("created_at", { ascending: false });

    // Fetch campaign applications by email
    const { data: campaignApplications } = await supabaseAdmin
      .from("campaign_applications")
      .select("id, name, email, phone, position, segment, status, created_at")
      .eq("email", user.email.toLowerCase())
      .order("created_at", { ascending: false });

    // Compile all data
    const exportData = {
      exportedAt: new Date().toISOString(),
      candidateId,
      email: user.email,
      name: user.name,
      vippsVerified: user.vippsVerified,
      profile: profile || null,
      applications: applications || [],
      campaignApplications: campaignApplications || [],
      metadata: {
        dataController: "Bluecrew AS",
        orgNumber: "936 463 843",
        contact: "post@bluecrew.no",
        purpose: "GDPR Article 15 - Right to access personal data",
      },
    };

    // Return as downloadable JSON file
    return new NextResponse(JSON.stringify(exportData, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="bluecrew-data-${candidateId}-${Date.now()}.json"`,
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Kunne ikke eksportere data" },
      { status: 500 }
    );
  }
}
