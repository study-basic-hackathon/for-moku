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
export async function ensureCanViewOrRedirect(groupId: string): Promise<{ success: boolean; error: string }> {
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

  return { success: true, error: '' };
}
