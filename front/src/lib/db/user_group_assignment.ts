import { Transaction } from '@/types/db';
import { userGroupAssignments } from '@/lib/db/schema/user_group_assignment';
import { NewUserGroupAssignment } from '@/types/user_group_assignment/schema';
import { db } from '@/lib/db';
import { and, eq } from 'drizzle-orm';

/**
 * 新しいユーザーグループ割り当てをデータベースに挿入する関数
 *
 * @param tx トランザクションオブジェクト
 * @param data 新しいユーザーグループ割り当てのデータ
 */
export async function insertUserGroupAssignment(
  tx: Transaction,
  data: NewUserGroupAssignment
) {
  await tx.insert(userGroupAssignments).values(data);
}



/**
 * 指定されたグループIDに対して、ユーザーが管理者であるかを確認する関数
 *
 * @param userId ユーザーID
 * @param groupId グループID
 * @returns 管理者であるかどうかのフラグ
 */
export async function isUserAdminOfGroup(userId: number, groupId: number): Promise<boolean> {
  const assignment = await db
    .select()
    .from(userGroupAssignments)
    .where(
      and(
        eq(userGroupAssignments.userId, userId),
        eq(userGroupAssignments.userGroupId, groupId),
        eq(userGroupAssignments.role, 'admin')
      )
    )
    .limit(1);

  return assignment.length > 0;
}
