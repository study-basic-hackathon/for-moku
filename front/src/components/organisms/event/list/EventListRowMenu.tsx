"use client"

import { EventListItem } from "@/types/event/viewmodel"
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
 * イベントのアクションを表示するコンポーネント
 * @param event イベントのデータ
 * 
 * @example
 * ```tsx 
 *  <EventActions event={event} />
 * ```
 */
interface Props {
  event: EventListItem
}

/**
 * イベントのアクションを表示するコンポーネント
 * @param event イベントのデータ
 * 
 * @returns イベントのアクションを表示するコンポーネント
 */
export function EventListRowMenu({ event }: Readonly<Props>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">メニューを開く</span>
          <Lightbulb className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(`${BASE_URL}/room/${event.id}`)}
        >
          ルームリンクをコピー
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a href={`/event/view/${event.id}`}>イベント詳細</a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 