'use server';

import { auth } from '@/lib/auth/auth';
import { selectUserByEmail, updateUserById } from '@/lib/db/user';

/**
 * 現在のユーザーのプロフィールを取得する関数
 *
 * @returns ユーザーのプロフィール情報（名前、自己紹介、興味）またはnull
 */
export async function getMyProfile() {
  // 現在のユーザーセッションを取得
  const session = await auth();

  // ユーザーがログインしていない場合はnullを返す
  if (!session?.user?.email) {
    return null;
  }

  // ユーザーの情報をメールアドレスで取得
  const user = await selectUserByEmail(session.user.email);
  if (!user) {
    return null;
  }

  // ユーザーのプロフィール情報を返す
  return {
    name: user.name || '',
    bio: user.bio || '',
    interests: user.interests || '',
  };
}

/**
 * 現在のユーザーのプロフィールを更新する関数
 *
 * @param data 更新するユーザーの名前、自己紹介、興味のある分野
 * @throws ログインしていない場合、またはユーザーが見つからない場合にエラーをスロー
 */
export async function updateMyProfile(data: {
  name: string;
  bio: string;
  interests: string;
}) {
  // 現在のユーザーセッションを取得
  const session = await auth();

  // ユーザーがログインしていない場合はエラーをスロー
  if (!session?.user?.email) {
    throw new Error('ログインしていません');
  }

  // ユーザーの情報をメールアドレスで取得
  const user = await selectUserByEmail(session.user.email);

  // ユーザーが見つからない場合はエラーをスロー
  if (!user) {
    throw new Error('ユーザーが見つかりません');
  }

  // ユーザーのプロフィール情報を更新
  await updateUserById(user.id, {
    name: data.name,
    bio: data.bio,
    interests: data.interests,
  });
}
