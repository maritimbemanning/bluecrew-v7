import { getUser } from '@/lib/auth/get-user';
import Header from './Header';

/**
 * Server Component wrapper for Header
 *
 * Fetches user session on server and passes to client Header component.
 */
export default async function HeaderWrapper() {
  const user = await getUser();

  return <Header user={user} />;
}


