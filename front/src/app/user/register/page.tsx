import { isUserRegistered } from '@/lib/user/isRegistered';
import UserRegisterTemplate from '@/components/templates/user/UserRegisterTemplate';
import { redirect } from 'next/navigation';

export default async function UserRegisterPage() {
  const registered = await isUserRegistered();

  if (registered) {
    redirect('/');
  }

  return <UserRegisterTemplate />;
}
