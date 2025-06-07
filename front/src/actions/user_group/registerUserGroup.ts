'use server';

import { auth } from '@/lib/auth/auth';
import { insertUserGroup, selectUserGroupByName } from '@/lib/db/user_group';

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
    await insertUserGroup({ name, description });
    return { success: true, error: '' };
  } catch (e: any) {
    return {
      success: false,
      error: e?.message || '登録に失敗しました',
    };
  }
}
