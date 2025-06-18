"use client"

import { Table } from "@tanstack/react-table"
import { Input } from "@/components/atoms/shadcn/input"
import { Label } from "@/components/atoms/shadcn/label"
import { EventListItem } from "@/types/event/viewmodel"
import { DatePicker } from "@/components/molecules/input/DatePicker"
import { createDateTime } from "@/lib/util/date"

interface Props {
  table: Table<EventListItem>
}

export function FormSearch({ table }: Readonly<Props>) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-4">
        <Label className="w-24">イベント名</Label>
        <Input
          placeholder="イベント名で検索..."
          onChange={(event) => {
            const value = event.target.value
            table.getColumn("name")?.setFilterValue(value)
          }}
          className="max-w-sm"
        />
      </div>
      <div className="flex items-center gap-4">
        <Label className="w-24">開始日時</Label>
        <DatePicker
          value={(table.getColumn("startDateTime")?.getFilterValue() as [Date | null, Date | null])?.[0] ?? undefined}
          onChange={(date) => {
            if (date) {
              table.getColumn("startDateTime")?.setFilterValue([createDateTime(date, true), null])
            } else {
              table.getColumn("startDateTime")?.setFilterValue([null, null])
            }
          }}
          placeholder="開始日を選択"
        />
        <Label className="w-24">終了日時</Label>
        <DatePicker
          value={(table.getColumn("endDateTime")?.getFilterValue() as [Date | null, Date | null])?.[1] ?? undefined}
          onChange={(date) => {
            if (date) {
              table.getColumn("endDateTime")?.setFilterValue([null, createDateTime(date, false)])
            } else {
              table.getColumn("endDateTime")?.setFilterValue([null, null])
            }
          }}
          placeholder="終了日を選択"
        />
      </div>
    </div>
  )
} 