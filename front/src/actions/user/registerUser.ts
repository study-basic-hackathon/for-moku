'use server';

import { auth } from '@/lib/auth/auth';
import { selectUserByEmail, insertUser } from '@/lib/db/user';

export async function registerUser(formData: {
  name: string;
  bio: string;
  interests: string;
}) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error('ログインしていません');
  }

  const email = session.user.email;

  // すでに登録されているかチェック（メール重複防止）
  const existing = await selectUserByEmail(email);

  if (existing) {
    throw new Error('既にアカウントが登録されています');
  }

  await insertUser({
    email,
    name: formData.name,
    bio: formData.bio,
    interests: formData.interests,
  });
}
