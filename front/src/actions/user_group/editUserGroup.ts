'use server';

import { selectUserGroupById, updateUserGroupById } from '@/lib/db/user_group';
import { auth } from '@/lib/auth/auth';

/**
 * 指定されたグループIDでユーザーグループ情報を取得する関数
 *
 * @param groupId 検索するグループID
 * @returns ユーザーグループ情報またはnull
 */
export async function getUserGroupById(groupId: string) {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error('ログインしていません');
  }

  const group = await selectUserGroupById(Number(groupId));
  if (!group) {
    throw new Error('グループが見つかりません');
  }

  return group;
}

/**
 * 指定されたグループIDでユーザーグループ情報を更新する関数
 *
 * @param groupId 更新するグループのID
 * @param data 更新するグループの名前と説明
 * @returns 処理結果（成功/失敗のフラグとエラーメッセージ）
 */
export async function updateUserGroup(
  groupId: string,
  data: { name: string; description: string }
): Promise<{ success: boolean; error: string }> {
  const session = await auth();
  if (!session?.user?.email) {
    return { success: false, error: 'ログインしていません' };
  }

  try {
    await updateUserGroupById(Number(groupId), data);
    return { success: true, error: '' };
  } catch (e: any) {
    return { success: false, error: e?.message || '更新に失敗しました' };
  }
}