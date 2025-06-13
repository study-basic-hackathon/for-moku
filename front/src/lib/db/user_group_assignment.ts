import { Transaction } from '@/types/db';
import { userGroupAssignments } from '@/lib/db/schema/user_group_assignment';
import { NewUserGroupAssignment } from '@/types/user_group_assignment/schema';

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
