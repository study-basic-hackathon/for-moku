import { userGroupAssignments } from '@/lib/db/schema/user_group_assignment';
import { InferInsertModel } from 'drizzle-orm';

export type NewUserGroupAssignment = InferInsertModel<typeof userGroupAssignments>;

export async function insertUserGroupAssignment(
  tx: any,
  data: NewUserGroupAssignment
) {
  await tx.insert(userGroupAssignments).values(data);
}
