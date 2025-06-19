import { auth } from "@/lib/auth/auth";
import { notFound, redirect } from "next/navigation";
import { UserGroupListItem, UserGroupListViewModel } from "@/types/user_group/viewmodel"
import { Role } from "@/types/event/role";


type MockUserGroup = {
  id: number;
  name: string;
  description: string;
  role: Role;
}

// モックデータ
const mockUserGroups: MockUserGroup[] = [
  {
    id: 1,
    name: "初学者の会",
    description: "プログラミング初学者を対象にしたグループ",
    role: "admin",
  },
  {
    id: 2,
    name: "Tokyo Hackathon",
    description: "ハッカソンイベントをする団体",
    role: "admin",
  },

];

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
  const userGroups = mockUserGroups;

  // イベントの一覧をビューモデルに変換
  const userGroupListItems: UserGroupListItem[] = userGroups.map((userGroup) => ({
    id: userGroup.id.toString(),
    name: userGroup.name,
    description: userGroup.description,
    role: userGroup.role,
  }));

  return {
    userGroups: userGroupListItems,
  };
};