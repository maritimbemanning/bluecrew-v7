/**
 * Server-side user fetching utility
 *
 * Use this in Server Components to get the current authenticated user.
 */

import { cookies } from 'next/headers';
import { verifySession, SESSION_COOKIE_CONFIG, type SessionPayload } from './session';

/**
 * Get the currently authenticated user from session cookie
 *
 * @returns Session payload if authenticated, null otherwise
 *
 * @example
 * ```tsx
 * // In a Server Component
 * import { getUser } from '@/lib/auth/get-user';
 *
 * export default async function ProfilePage() {
 *   const user = await getUser();
 *
 *   if (!user) {
 *     redirect('/logg-inn');
 *   }
 *
 *   return <div>Velkommen, {user.name}!</div>;
 * }
 * ```
 */
export async function getUser(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_CONFIG.name);

  if (!sessionCookie?.value) {
    return null;
  }

  try {
    return await verifySession(sessionCookie.value);
  } catch {
    return null;
  }
}

/**
 * Check if user is authenticated (without full session data)
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getUser();
  return user !== null;
}
