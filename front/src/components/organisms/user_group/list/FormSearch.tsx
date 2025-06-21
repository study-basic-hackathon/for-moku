"use client"

import { Table } from "@tanstack/react-table"
import { Input } from "@/components/atoms/shadcn/input"
import { Label } from "@/components/atoms/shadcn/label"
import { UserGroupListItem } from "@/types/user_group/viewmodel"

interface Props {
  table: Table<UserGroupListItem>
}

export function FormSearch({ table }: Readonly<Props>) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-4">
        <Label className="w-24">グループ名</Label>
        <Input
          placeholder="グループ名で検索..."
          onChange={(event) => {
            const value = event.target.value
            table.getColumn("name")?.setFilterValue(value)
          }}
          className="max-w-sm"
        />
      </div>
    </div>
  )
}