'use server';

import { auth } from '@/lib/auth/auth';
import { selectUserByEmail, updateUserById } from '@/lib/db/user';

export async function getMyProfile() {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  const user = await selectUserByEmail(session.user.email);
  if (!user) {
    return null;
  }

  return {
    name: user.name || '',
    bio: user.bio || '',
    interests: user.interests || '',
  };
}

export async function updateMyProfile(data: {
  name: string;
  bio: string;
  interests: string;
}) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error('ログインしていません');
  }

  const user = await selectUserByEmail(session.user.email);

  if (!user) {
    throw new Error('ユーザーが見つかりません');
  }

  await updateUserById(user.id, {
    name: data.name,
    bio: data.bio,
    interests: data.interests,
  });
}
