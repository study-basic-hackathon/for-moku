"use client"

import { EventListItem } from "@/types/event/viewmodel"
import { useCommonListTable } from "@/hooks/common/useCommonListTable"
import { generateColumns } from "@/lib/common/list/columns"
import { EVENT_LIST_TABLE_COLUMN_FIELDS } from "@/lib/event/list/constants"
import { CellContext } from "@tanstack/react-table"
import { EventListRowMenu } from "@/components/organisms/event/list/EventListRowMenu"

/**
 * イベント一覧テーブルを使用するためのフック
 * (generateColumnsとuseCommonListTableのラッパー)
 * @param events イベント一覧のデータ
 * 
 * @returns イベント一覧テーブルの関数そのもの(useReactTableの返り値)
 */
export function useEventListTable(events: EventListItem[]) {
  
  const columns = generateColumns<EventListItem>(
    EVENT_LIST_TABLE_COLUMN_FIELDS,
    {
      id: "actions",
      cell: ({ row }: CellContext<EventListItem, unknown>) => {
        const event = row.original
        return <EventListRowMenu event={event} />
      },
    }
  )

  // テーブルの関数そのもの(useReactTableの返り値)を返却する
  return useCommonListTable<EventListItem>(events, columns)
} 