import { db } from '@/lib/db';
import { userGroups } from '@/lib/db/schema/user_group';
import { eq, InferInsertModel } from 'drizzle-orm';


export type NewUserGroup = InferInsertModel<typeof userGroups>;

export async function selectUserGroupByName(name: string) {
  const result = await db
    .select()
    .from(userGroups)
    .where(eq(userGroups.name, name))
    .limit(1);

  return result[0] ?? null;
}

export async function insertUserGroupWithTx(
  tx: any, // 型注釈を省略または any にする（実際は tx に自動で正しい型が付きます）
  data: NewUserGroup
) {
  const [inserted] = await tx
    .insert(userGroups)
    .values(data)
    .returning();

  return inserted;
}