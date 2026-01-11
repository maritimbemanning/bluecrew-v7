import { NextResponse } from "next/server";
import { generateCsrfToken } from "@/lib/csrf";
import { successResponse } from "@/lib/api/types";

export async function GET() {
  // Generate token (no rate limiting - this is a read-only operation)
  const token = generateCsrfToken();

  return NextResponse.json(successResponse({ token }), {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
