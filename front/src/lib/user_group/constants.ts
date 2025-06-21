import { UserGroupListTableColumnField } from "@/types/user_group/list";

/**
 * ユーザーグループ一覧テーブルの列定義
 * Templateやフックなどから呼び出し、イベント一覧テーブルの列を生成するのに使う
 * @returns 列定義
 */
export const USER_GROUP_LIST_TABLE_COLUMN_FIELDS: UserGroupListTableColumnField[] = [
  {
    name: "role",
    label: "権限",
    dataType: "enum",
    enableHiding: true,
    enableSorting: true,
    enableFiltering: true,
    declineIncompleteFilter: true,
  } ,
  {
    name: "name",
    label: "ユーザーグループ名",
    dataType: "string",
    enableHiding: true,
    enableSorting: true,
    enableFiltering: true,
    declineIncompleteFilter: false,
  },
];