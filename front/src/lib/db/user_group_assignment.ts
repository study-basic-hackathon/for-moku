import { userGroupAssignments } from '@/lib/db/schema/user_group_assignment';
import { InferInsertModel } from 'drizzle-orm';

export type NewUserGroupAssignment = InferInsertModel<typeof userGroupAssignments>;

export async function insertUserGroupAssignmentWithTx(
  tx: any,
  data: NewUserGroupAssignment
) {
  await tx.insert(userGroupAssignments).values(data);
}
