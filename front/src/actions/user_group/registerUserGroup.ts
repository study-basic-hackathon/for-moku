'use server';

import { db } from '@/lib/db';
import { insertUserGroup, selectUserGroupByName } from '@/lib/db/user_group';
import { insertUserGroupAssignment } from '@/lib/db/user_group_assignment';
import { selectUserByEmail } from '@/lib/db/user';
import { auth } from '@/lib/auth/auth';

/**
 * ユーザーグループを登録する関数
 *
 * @param formData フォームデータ（グループ名と説明）
 * @returns 処理結果（成功/失敗のフラグとエラーメッセージ）
 */
export async function registerMyUserGroup(formData: {
  name: string;
  description: string;
}): Promise<{ success: boolean; error: string }> {
  // 現在のユーザーセッションを取得
  const session = await auth();
  if (!session?.user?.email) {
    return { success: false, error: 'ログインしていません' };
  }

  // フォームデータからグループ名と説明を取得
  const name = formData.name;
  const description = formData.description;

  // グループ名がない場合はエラーを返す
  if (!name) {
    return { success: false, error: 'グループ名は必須です' };
  }

  // 既存のグループ名をチェック
  const existing = await selectUserGroupByName(name);
  if (existing) {
    return { success: false, error: 'このグループ名はすでに使われています' };
  }

  try {
    // ユーザー情報を取得
    const user = await selectUserByEmail(session.user.email);
    if (!user) {
      return { success: false, error: 'ユーザー情報が見つかりません' };
    }

    // トランザクションを開始
    await db.transaction(async (tx) => {
      // グループを作成
      const group = await insertUserGroup(tx, {
        name,
        description,
      });

      if (!group?.id) {
        throw new Error('グループの作成に失敗しました');
      }

      // 作成者を admin として割り当て
      await insertUserGroupAssignment(tx, {
        userId: user.id,
        userGroupId: group.id,
        role: 'admin',
      });
    });

    return { success: true, error: '' };
  } catch (e: any) {
    return { success: false, error: e?.message || '登録に失敗しました' };
  }
}
