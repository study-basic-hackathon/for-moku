"use client"

import { UserGroupListItem, UserGroupListViewModel } from "@/types/user_group/viewmodel"
import { FormSearch } from "@/components/organisms/user_group/list/FormSearch"
import { useUserGroupListTable } from "@/hooks/user_group/list/useUserGroupListTable"
import { ListTableData } from "@/components/organisms/common/list/ListTableData"
import { ListTablePagination } from "@/components/organisms/common/list/ListTablePagination"

/**
 * ユーザーグループ一覧テンプレート
 * @param １userGroupListViewModel ユーザーグループ一覧のViewModel
 *
 * @returns ユーザーグループ一覧テンプレート
 * @example
 * ```tsx
 *  <userGroupListTemplate userGroupListViewModel={userGroupListViewModel} />
 * ```
 */
interface Props {
  userGroupListViewModel: UserGroupListViewModel
}

/**
 * ユーザーグループ一覧テンプレート
 * @param userGroupListViewModel ユーザーグループ一覧のViewModel
 *
 * @returns ユーザーグループ一覧テンプレート
 */
export function UserGroupListTemplate({ userGroupListViewModel }: Readonly<Props>) {
  const { userGroups } = userGroupListViewModel

  // テーブルを返却する関数
  const { table } = useUserGroupListTable(userGroups)

  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <FormSearch table={table} />
      <ListTableData<UserGroupListItem> table={table} />
      <ListTablePagination<UserGroupListItem>  table={table} />
    </div>
  )
}
