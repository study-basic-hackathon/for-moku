import { auth } from '@/lib/auth/auth';
import { selectUserByEmail } from '@/lib/db/user';

export async function isUserRegistered(): Promise<boolean> {
  const session = await auth();
  if (!session?.user?.email) return false;

  const user = await selectUserByEmail(session.user.email);
  return !!user;
}
