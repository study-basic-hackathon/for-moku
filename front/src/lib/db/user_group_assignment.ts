import { db } from '@/lib/db';
import { userGroupAssignments } from '@/lib/db/schema/user_group_assignment';
import { InferInsertModel } from 'drizzle-orm';

export type NewUserGroupAssignment = InferInsertModel<typeof userGroupAssignments>;
type Transaction = Parameters<typeof db.transaction>[0] extends (tx: infer T) => any ? T : never;

export async function insertUserGroupAssignment(
  tx: Transaction,
  data: NewUserGroupAssignment
) {
  await tx.insert(userGroupAssignments).values(data);
}
