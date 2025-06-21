"use client"

import { UserGroupListItem } from "@/types/user_group/viewmodel"
import { Button } from "@/components/atoms/shadcn/button"
import { Lightbulb } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/atoms/shadcn/dropdown-menu"
import { BASE_URL } from "@/app/env"

/**
 * ユーザーグループのアクションを表示するコンポーネント
 * @param userGroup ユーザーグループのデータ
 *
 * @example
 * ```tsx
 *  <UserGroupActions userGroup={userGroup} />
 * ```
 */
interface Props {
  userGroup: UserGroupListItem
}

/**
 * ユーザーのアクションを表示するコンポーネント
 * @param userGroup ユーザーグループのデータ
 *
 * @returns ユーザーグループのアクションを表示するコンポーネント
 */
export function UserGroupListRowMenu({ userGroup }: Readonly<Props>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">メニューを開く</span>
          <Lightbulb className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <a href={`/user_group/view/${userGroup.id}`}>グループ詳細</a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}