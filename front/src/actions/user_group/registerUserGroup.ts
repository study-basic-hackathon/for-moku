'use server';

import { db } from '@/lib/db';
import { insertUserGroupWithTx, selectUserGroupByName } from '@/lib/db/user_group';
import { insertUserGroupAssignmentWithTx } from '@/lib/db/user_group_assignment';
import { selectUserByEmail } from '@/lib/db/user';
import { auth } from '@/lib/auth/auth';

export async function registerUserGroup(
  _prevState: { success: boolean; error: string },
  formData: FormData
): Promise<{ success: boolean; error: string }> {
  const session = await auth();
  if (!session?.user?.email) {
    return { success: false, error: 'ログインしていません' };
  }

  const name = formData.get('name')?.toString().trim();
  const description = formData.get('description')?.toString().trim() ?? '';

  if (!name) {
    return { success: false, error: 'グループ名は必須です' };
  }

  const existing = await selectUserGroupByName(name);
  if (existing) {
    return { success: false, error: 'このグループ名はすでに使われています' };
  }

  try {
    const user = await selectUserByEmail(session.user.email);
    if (!user) {
      return { success: false, error: 'ユーザー情報が見つかりません' };
    }

    await db.transaction(async (tx) => {
      // グループを作成
      const group = await insertUserGroupWithTx(tx, {
        name,
        description,
      });

      if (!group?.id) {
        throw new Error('グループの作成に失敗しました');
      }

      // 作成者を admin として割り当て
      await insertUserGroupAssignmentWithTx(tx, {
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
