import { db } from '@/lib/db';
import { Transaction } from '@/types/db';
import { NewUserGroup, UserGroupSearchResult } from '@/types/user_group/schema';
import { userGroups } from '@/lib/db/schema/user_group';
import { userGroupAssignments } from '@/lib/db/schema/user_group_assignment';
import { users } from '@/lib/db/schema/user';
import { and, eq, asc } from 'drizzle-orm';

/**
 * グループ名でユーザーグループを選択する関数
 *
 * @param name 検索するグループ名
 * @returns ユーザーグループ情報またはnull
 */
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

/**
 * 新しいユーザーグループをデータベースに挿入する関数
 *
 * @param tx トランザクションオブジェクト
 * @param data 新しいユーザーグループのデータ
 * @returns 挿入されたユーザーグループ情報
 */
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

/**
 * グループIDでユーザーグループを選択する関数
 *
 * @param groupId 検索するグループID
 * @returns ユーザーグループ情報またはnull
 */
export async function selectUserGroupById(groupId: number) {
  const result = await db
    .select()
    .from(userGroups)
    .where(eq(userGroups.id, groupId))
    .limit(1);

  return result[0] ?? null;
}

/**
 * グループIDでユーザーグループを更新する関数
 *
 * @param groupId 更新するグループのID
 * @param data 更新するグループの名前と説明
 */
export async function updateUserGroupById(
  groupId: number,
  data: { name: string; description: string }
) {
  await db
    .update(userGroups)
    .set({
      name: data.name,
      description: data.description,
    })
    .where(eq(userGroups.id, groupId));
}

/**
 *
 * ユーザーのメールアドレスに基づいてユーザーグループ一覧を取得する
 *
 * 見つからなければ、空のリストを返却する
 * 取得する項目は以下に限定している。
 *
 * - id: ユーザーグループID
 * - name: ユーザーグループ名
 * - description: 説明
 * - role: ユーザーの権限
 *
 * @param email ユーザーのメールアドレス
 *
 * @returns ユーザーグループ一覧
 */
export async function selectUserGroupsSearchResultByUserEmail(email: string): Promise<UserGroupSearchResult[]> {
  const result = await db
    .select({
      id: userGroups.id,
      name: userGroups.name,
      description: userGroups.description,
      role: userGroupAssignments.role,
    })
    .from(userGroups)
    .innerJoin(userGroupAssignments, eq(userGroups.id, userGroupAssignments.userGroupId))
    .innerJoin(users, eq(userGroupAssignments.userId, users.id))
    .where(eq(users.email, email))
    .orderBy(asc(userGroups.id));

  return result;
}