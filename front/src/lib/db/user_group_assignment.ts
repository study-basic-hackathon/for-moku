import { Transaction } from '@/types/db';
import { userGroupAssignments } from '@/lib/db/schema/user_group_assignment';
import { NewUserGroupAssignment } from '@/types/user_group_assignment/schema';

export async function insertUserGroupAssignment(
  tx: Transaction,
  data: NewUserGroupAssignment
) {
  await tx.insert(userGroupAssignments).values(data);
}
