import { auth } from '@/lib/auth/auth';
import { selectUserByEmail, insertUser } from '@/lib/db/user';

export async function registerUserLogic(formData: {
  name: string;
  bio: string;
  interests: string;
}) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error('ログインしていません');
  }

  const email = session.user.email;

  // 既存ユーザー確認
  const existingUser = await selectUserByEmail(email);
  if (existingUser) {
    throw new Error('既にアカウントが登録されています');
  }

  await insertUser({
    email,
    name: formData.name,
    bio: formData.bio,
    interests: formData.interests,
  });
}
