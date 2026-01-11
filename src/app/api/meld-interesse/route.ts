import { NextResponse } from "next/server";
import { errorResponse, HttpStatus } from "@/lib/api/types";

/**
 * DEPRECATED: This API route is no longer in use.
 * 
 * As of January 2026, all candidate registrations go through:
 * 1. Vipps Login → Creates BluecrewProfil
 * 2. /registrer → Completes profile with CV
 * 
 * This simplifies the system to ONE source of truth: BluecrewProfil
 * 
 * Old flow: /meld-interesse form → This API → candidates table
 * New flow: Vipps → /registrer → candidates table (unified)
 */

export async function POST() {
  return NextResponse.json(
    errorResponse(
      "Dette skjemaet er ikke lenger i bruk. Vennligst logg inn med Vipps for å registrere deg.",
      HttpStatus.GONE
    ),
    { status: HttpStatus.GONE }
  );
}

export async function GET() {
  return NextResponse.json(
    errorResponse("Method not allowed"),
    { status: HttpStatus.METHOD_NOT_ALLOWED }
  );
}
