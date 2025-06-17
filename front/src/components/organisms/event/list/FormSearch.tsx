import { Table } from "@tanstack/react-table"
import { Input } from "@/components/atoms/shadcn/input"

import { EventListItem } from "@/types/event/viewmodel"

interface Props {
  table: Table<EventListItem>
}

export function FormSearch({ table }: Readonly<Props>) {
  return (
    <div className="flex items-center py-4">
      <Input
        placeholder="イベント名で検索..."
        onChange={(event) => {
          const value = event.target.value
          table.getColumn("name")?.setFilterValue(value)
        }}
        className="max-w-sm"
      />
      <div className="flex gap-2">
        <Input
          type="datetime-local"
          placeholder="開始日時"
          onChange={(e) => {
            const value = e.target.value ? new Date(e.target.value) : null
            table.getColumn("startDateTime")?.setFilterValue([value, null])
          }}
          className="max-w-sm"
        />
        <Input
          type="datetime-local"
          onChange={(e) => {
            const value = e.target.value ? new Date(e.target.value) : null
            table.getColumn("endDateTime")?.setFilterValue([null, value])
          }}
          className="max-w-sm"
        />
      </div>
    </div>
  )
} 