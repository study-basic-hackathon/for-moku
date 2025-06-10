'use server';

import { auth } from '@/lib/auth/auth';
import { selectUserByEmail, insertUser } from '@/lib/db/user';

/**
 * ユーザーを登録する関数
 *
 * @param formData ユーザーの名前、自己紹介、興味のある分野を含むフォームデータ
 * @throws ログインしていない場合、または既にアカウントが登録されている場合にエラーをスロー
 */
export async function registerUser(formData: {
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

  // ユーザーのメールアドレスを取得
  const email = session.user.email;

  // すでに登録されているかチェック（メール重複防止）
  const existing = await selectUserByEmail(email);

  // 既にアカウントが登録されている場合はエラーをスロー
  if (existing) {
    throw new Error('既にアカウントが登録されています');
  }

  // 新しいユーザーをデータベースに挿入
  await insertUser({
    email,
    name: formData.name,
    bio: formData.bio,
    interests: formData.interests,
  });
}
