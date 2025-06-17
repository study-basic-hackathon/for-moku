"use client"

import { EventListItem, EventListViewModel } from "@/types/event/viewmodel"
import { FormSearch } from "@/components/organisms/event/list/FormSearch"
import { useEventListTable } from "@/hooks/event/list/useEventListTable"
import { ListTableData } from "@/components/organisms/common/list/ListTableData"
import { ListTablePagination } from "@/components/organisms/common/list/ListTablePagination"

/**
 * イベント一覧テンプレート
 * @param eventListViewModel イベント一覧のViewModel
 * 
 * @returns イベント一覧テンプレート
 * @example
 * ```tsx
 *  <EventListTemplate eventListViewModel={eventListViewModel} />
 * ```
 */
interface Props {
  eventListViewModel: EventListViewModel
}

/**
 * イベント一覧テンプレート
 * @param eventListViewModel イベント一覧のViewModel(実質イベントだけだけど)
 * 
 * @returns イベント一覧テンプレート
 */
export function EventListTemplate({ eventListViewModel }: Readonly<Props>) {
  const { events } = eventListViewModel

  // テーブルを返却する関数
  const { table } = useEventListTable(events)

  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <FormSearch table={table} /> 
      <ListTableData<EventListItem> table={table} />
      <ListTablePagination<EventListItem>  table={table} />
    </div>
  )
}
