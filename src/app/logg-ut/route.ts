import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { SESSION_COOKIE_CONFIG } from '@/lib/auth/session';

/**
 * Logout Route
 *
 * Deletes the session cookie and redirects to home page.
 */
export async function GET() {
  const cookieStore = await cookies();

  // Delete the session cookie with same options as when it was set
  cookieStore.set(SESSION_COOKIE_CONFIG.name, '', {
    ...SESSION_COOKIE_CONFIG.options,
    maxAge: 0, // Expire immediately
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  return NextResponse.redirect(new URL('/', baseUrl));
}
