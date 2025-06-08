import { db } from '@/lib/db';
import { userGroups } from '@/lib/db/schema/user_group';
import { eq, InferInsertModel } from 'drizzle-orm';


export type NewUserGroup = InferInsertModel<typeof userGroups>;
type Transaction = Parameters<typeof db.transaction>[0] extends (tx: infer T) => any ? T : never;

export async function selectUserGroupByName(name: string) {
  const result = await db
    .select()
    .from(userGroups)
    .where(eq(userGroups.name, name))
    .limit(1);

  return result[0] ?? null;
}

export async function insertUserGroup(
  tx: Transaction,
  data: NewUserGroup
) {
  const [inserted] = await tx
    .insert(userGroups)
    .values(data)
    .returning();

  return inserted;
}
