import { auth } from '@/lib/auth/auth';
import { selectUserByEmail } from '@/lib/db/user';
import UserRegisterTemplate from '@/components/templates/user/UserRegisterTemplate';
import { redirect } from 'next/navigation';

async function isUserRegistered(): Promise<boolean> {
  const session = await auth();
  if (!session?.user?.email) return false;

  const user = await selectUserByEmail(session.user.email);
  return !!user;
}

export default async function UserRegisterPage() {
  const registered = await isUserRegistered();

  if (registered) {
    redirect('/');
  }

  return <UserRegisterTemplate />;
}
