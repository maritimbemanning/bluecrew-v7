import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

/**
 * Health check endpoint for Supabase connectivity
 * Used during cutover to verify new Supabase connection works
 *
 * GET /api/health - Public health check
 * GET /api/health?secret=xxx - Detailed diagnostics (requires HEALTH_CHECK_SECRET)
 */
export async function GET(request: Request) {
  const startTime = Date.now();
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const isDetailed = secret === process.env.HEALTH_CHECK_SECRET && process.env.HEALTH_CHECK_SECRET;

  try {
    // Test 1: Basic connectivity - count from a known table
    const { count, error: countError } = await supabaseAdmin
      .from("interest_leads")
      .select("*", { count: "exact", head: true });

    if (countError) {
      console.error("[HEALTH] Database connectivity failed:", countError);
      return NextResponse.json(
        {
          status: "unhealthy",
          error: "Database connectivity failed",
          details: isDetailed ? countError.message : undefined,
        },
        { status: 503 }
      );
    }

    // Test 2: Verify we can read from all critical tables
    const tableChecks = await Promise.all([
      supabaseAdmin.from("interest_leads").select("id").limit(1),
      supabaseAdmin.from("staffing_needs").select("id").limit(1),
      supabaseAdmin.from("contacts").select("id").limit(1),
      supabaseAdmin.from("job_postings").select("id").limit(1),
      supabaseAdmin.from("job_applications").select("id").limit(1),
      supabaseAdmin.from("candidates").select("id").limit(1), // Critical for Vipps login
    ]);

    const tableNames = ["interest_leads", "staffing_needs", "contacts", "job_postings", "job_applications", "candidates"];
    const tableStatuses = tableNames.map((name, i) => ({
      table: name,
      accessible: !tableChecks[i].error,
      error: tableChecks[i].error?.message,
    }));

    const allTablesOk = tableStatuses.every((t) => t.accessible);

    // Test 3: Verify storage buckets exist
    const { data: buckets, error: bucketsError } = await supabaseAdmin.storage.listBuckets();
    const requiredBuckets = ["candidate-cvs", "candidate-certificates"];
    const bucketNames = buckets?.map((b) => b.name) || [];
    const bucketsOk = requiredBuckets.every((b) => bucketNames.includes(b));

    const responseTime = Date.now() - startTime;

    // Build response
    const healthStatus = allTablesOk && bucketsOk ? "healthy" : "degraded";

    const response: Record<string, unknown> = {
      status: healthStatus,
      timestamp: new Date().toISOString(),
      responseTimeMs: responseTime,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/https?:\/\//, "").split(".")[0] + ".supabase.co",
    };

    // Add detailed info only if secret is provided
    if (isDetailed) {
      response.tables = tableStatuses;
      response.storage = {
        bucketsOk,
        requiredBuckets,
        foundBuckets: bucketNames.filter((b) => requiredBuckets.includes(b)),
        error: bucketsError?.message,
      };
      response.interestLeadsCount = count;
    }

    return NextResponse.json(response, {
      status: healthStatus === "healthy" ? 200 : 503,
    });
  } catch (error) {
    console.error("[HEALTH] Unexpected error:", error);
    return NextResponse.json(
      {
        status: "unhealthy",
        error: "Unexpected error during health check",
        details: isDetailed && error instanceof Error ? error.message : undefined,
      },
      { status: 503 }
    );
  }
}
