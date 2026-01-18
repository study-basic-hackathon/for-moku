import { db } from '@/lib/db';
import { users } from '@/lib/db/schema/user';
import { eq } from 'drizzle-orm';

/**
 * メールアドレスでユーザーを選択する関数
 *
 * @param email 検索するユーザーのメールアドレス
 * @returns ユーザー情報またはnull
 */
export async function selectUserByEmail(email: string) {
  const result = await db.select().from(users).where(eq(users.email, email));
  return result[0] ?? null;
}

/**
 * 新しいユーザーをデータベースに挿入する関数
 *
 * @param email ユーザーのメールアドレス
 * @param name ユーザーの名前
 * @param bio ユーザーの自己紹介
 * @param interests ユーザーの興味のある分野
 * @returns 挿入結果
 */
export async function insertUser({
  email,
  name,
  bio,
  interests,
}: {
  email: string;
  name: string;
  bio: string;
  interests: string;
}) {
  return await db.insert(users).values({
    email,
    name,
    bio,
    interests,
  });
}

/**
 * ユーザーIDでユーザー情報を更新する関数
 *
 * @param userId 更新するユーザーのID
 * @param data 更新するユーザーの名前、自己紹介、興味のある分野
 */
export async function updateUserById(
  userId: number,
  data: { name: string; bio: string; interests: string }
) {
  await db
    .update(users)
    .set({
      name: data.name,
      bio: data.bio,
      interests: data.interests,
      updatedAt: new Date(), // UPDATE時にupdatedAtを明示的に設定（timestamp with time zoneがUTCに自動変換）
    })
    .where(eq(users.id, userId));
}
