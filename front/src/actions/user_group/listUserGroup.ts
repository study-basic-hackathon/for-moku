import { auth } from "@/lib/auth/auth";
import { notFound, redirect } from "next/navigation";
import { UserGroupListItem, UserGroupListViewModel } from "@/types/user_group/viewmodel"
import { Role } from "@/types/event/role";
import { selectUserGroupsSearchResultByUserEmail } from "@/lib/db/user_group";
import { UserGroupSearchResult } from "@/types/user_group/schema";



  // ... existing code ...

/**
 * イベント一覧用のビューモデルを取得する
 * @returns イベント一覧用のビューモデル
 */
export const getUserGroupListViewModel = async (): Promise<UserGroupListViewModel> => {
  const session = await auth();
  if (!session?.user) {
    redirect('/user/register');
  }
  if (!session.user.email) {
    notFound();
  }

  // TODO: 現時点ではモックデータを使用しているが、データベースから取得するようにする
  const userGroups: UserGroupSearchResult[] = await selectUserGroupsSearchResultByUserEmail(session.user.email);

  // イベントの一覧をビューモデルに変換
  const userGroupListItems: UserGroupListItem[] = userGroups.map((userGroup) => ({
    id: userGroup.id.toString(),
    name: userGroup.name,
    description: userGroup.description ?? "",
    role: userGroup.role,
  }));

  return {
    userGroups: userGroupListItems,
  };
};