import { CommonTableColumnField } from "@/types/common/list";
import { UserGroupListItem } from "@/types/user_group/viewmodel";

/**
 * ユーザーグループ一覧テーブルの列定義の型
 * CommonTableColumnFieldにおいて、nameをUserGroupListItemのフィールドと同一にしている
 *
 * @example
 * ```tsx
 *  const columns: UserGroupListTableColumnField[] = [
 *    { name: "id", label: "ID", dataType: "string" },
 *    { name: "name", label: "名前", dataType: "string" },
 *    { name: "description", label: "説明", dataType: "string" },
 *    { name: "role", label: "権限", dataType: "enum", enableFiltering: true, declineIncompleteFilter: true },
 *  ]
 * @returns フィールド
 */
export type UserGroupListTableColumnField = CommonTableColumnField<UserGroupListItem>;