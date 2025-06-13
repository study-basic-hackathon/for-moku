'use server';

import { selectUserGroupById, updateUserGroupById } from '@/lib/db/user_group';
import { selectUserByEmail } from '@/lib/db/user';
import { auth } from '@/lib/auth/auth';
import { isUserAdminOfGroup } from '@/lib/db/user_group_assignment';
import { UserGroup } from '@/types/user_group/schema';

/**
 * ユーザーが指定されたグループの管理者であるかを確認する関数
 *
 * @param groupId チェックするグループID
 * @returns 処理結果（成功/失敗のフラグとエラーメッセージ）
 */
export async function ensureAdminOrRedirect(groupId: string): Promise<{ success: boolean; error: string }> {
  const session = await auth();

  if (!session?.user?.email) {
    return { success: false, error: 'ログインしていません' };
  }

  const user = await selectUserByEmail(session.user.email);
  if (!user) {
    return { success: false, error: 'ユーザーが見つかりません' };
  }

  const groupIdNumber = Number(groupId);
  if (isNaN(groupIdNumber)) {
    return { success: false, error: '無効なグループIDです' };
  }

  try {
    const group = await selectUserGroupById(groupIdNumber);
    if (!group) {
      return { success: false, error: 'グループが見つかりません' };
    }
  } catch (error) {
    console.error('グループの取得中にエラーが発生しました:', error);
    return { success: false, error: 'グループの取得中にエラーが発生しました' };
  }

  const isAdmin = await isUserAdminOfGroup(user.id, groupIdNumber);
  if (!isAdmin) {
    return { success: false, error: '管理者権限がありません' };
  }

  return { success: true, error: '' };
}

/**
 * 指定されたグループIDでユーザーグループ情報を取得する関数
 *
 * @param groupId 検索するグループID
 * @returns ユーザーグループ情報またはエラーメッセージ
 */
export async function getUserGroupById(groupId: string): Promise<{
  success: boolean;
  data?: UserGroup;
  error?: string;
}> {
  const session = await auth();
  if (!session?.user?.email) {
    return { success: false, error: 'ログインしていません' };
  }

  const group = await selectUserGroupById(Number(groupId));
  if (!group) {
    return { success: false, error: 'グループが見つかりません' };
  }

  return { success: true, data: group };
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
