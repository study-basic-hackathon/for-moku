'use server';

import { auth } from '@/lib/auth/auth';
import { db } from '@/lib/db';
import { users } from '@/lib/schema/user';
import { eq } from 'drizzle-orm';

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
  const existing = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (existing.length > 0) {
    throw new Error('既にアカウントが登録されています');
  }

  await db.insert(users).values({
    email,
    name: formData.name,
    bio: formData.bio,
    interests: formData.interests,
  });
}
