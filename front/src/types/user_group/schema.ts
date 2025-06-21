import { userGroups } from '@/lib/db/schema/user_group';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { Role } from "@/types/event/role";

export type UserGroup = InferSelectModel<typeof userGroups>;
export type NewUserGroup = InferInsertModel<typeof userGroups>;

/**
 * ユーザーグループ検索結果の型
 *
 * select文で取得するフィールドに対応
 */
export type UserGroupSearchResult = {
    id: number;
    name: string;
    description: string | null;
    role: Role;
  };