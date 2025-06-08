import { db } from '@/lib/db';
import { Transaction } from '@/types/db';
import { NewUserGroup } from '@/types/user_group/schema';
import { userGroups } from '@/lib/db/schema/user_group';
import { eq } from 'drizzle-orm';




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
