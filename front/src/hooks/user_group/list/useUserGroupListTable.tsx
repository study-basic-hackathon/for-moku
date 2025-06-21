"use client"

import { UserGroupListItem } from "@/types/user_group/viewmodel"
import { useCommonListTable } from "@/hooks/common/useCommonListTable"
import { generateColumns } from "@/lib/common/list/columns"
import { USER_GROUP_LIST_TABLE_COLUMN_FIELDS } from "@/lib/user_group/constants"
import { CellContext } from "@tanstack/react-table"
import { UserGroupListRowMenu } from "@/components/organisms/user_group/list/UserGroupListRowMenu"

/**
 * ユーザーグループ一覧テーブルを使用するためのフック
 * (generateColumnsとuseCommonListTableのラッパー)
 * @param userGroups ユーザーグループ一覧のデータ
 *
 * @returns ユーザーグループ一覧テーブルの関数そのもの(useReactTableの返り値)
 */
export function useUserGroupListTable(userGroups: UserGroupListItem[]) {

  const columns = generateColumns<UserGroupListItem>(
    USER_GROUP_LIST_TABLE_COLUMN_FIELDS,
    {
      id: "actions",
      cell: ({ row }: CellContext<UserGroupListItem, unknown>) => {
        const userGroup = row.original
        return <UserGroupListRowMenu userGroup={userGroup} />
      },
    }
  )

  // テーブルの関数そのもの(useReactTableの返り値)を返却する
  return useCommonListTable<UserGroupListItem>(userGroups, columns)
}