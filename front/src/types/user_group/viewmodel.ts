import { Role } from "@/types/event/role";


/**
 * ユーザーグループ一覧画面用のビューモデル
 *
 * template内でデータを扱う際に使います
 */
export type UserGroupListItem = {
  id: string;
  name: string;
  description: string;
  role: Role;
}


/**
 * ユーザーグループ一覧画面用のビューモデル（実質データベースから取得したユーザーグループの一覧のみ）
 *
 * template内でデータを扱う際に使います
 */
export type UserGroupListViewModel = {
  userGroups: UserGroupListItem[];
}