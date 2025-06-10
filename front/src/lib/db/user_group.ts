import { db } from '@/lib/db';
import { Transaction } from '@/types/db';
import { NewUserGroup } from '@/types/user_group/schema';
import { userGroups } from '@/lib/db/schema/user_group';
import { userGroupAssignments } from '@/lib/db/schema/user_group_assignment';
import { users } from '@/lib/db/schema/user';
import {  and, eq } from 'drizzle-orm';




export async function selectUserGroupByName(name: string) {
  const result = await db
    .select()
    .from(userGroups)
    .where(eq(userGroups.name, name))
    .limit(1);

  return result[0] ?? null;
}

/**
 * 指定したメールアドレスを持つユーザーが管理するユーザーグループのリストを取得
 * 見つからなければ、[]を返却
 *
 * @param email ユーザーのメールアドレス
 * @returns ユーザーグループの配列
 */
export async function selectAuthedUserGroupsByEmail(email: string) {
  const results = await db
    .select({
      userGroup: userGroups
    })
    .from(userGroupAssignments)
    .innerJoin(users, eq(userGroupAssignments.userId, users.id))
    .innerJoin(userGroups, eq(userGroupAssignments.userGroupId, userGroups.id))
    .where(
      and(
        eq(userGroupAssignments.role, "admin"),
        eq(users.email, email)
      )
    );

  return results?.map((e) => e.userGroup) ?? [];
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
