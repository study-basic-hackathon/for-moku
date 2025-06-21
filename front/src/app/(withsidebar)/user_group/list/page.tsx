import { UserGroupListTemplate } from "@/components/templates/user_group/UserGroupListTemplate"
import { getUserGroupListViewModel } from "@/actions/user_group/listUserGroup"

export default async function UserGroupListPage() {
  // イベント一覧のViewModelをデータベースから取得
  const viewModel = await getUserGroupListViewModel()

  return (
    <UserGroupListTemplate
      userGroupListViewModel={viewModel}
    />
  )
}
