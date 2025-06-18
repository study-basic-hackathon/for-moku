"use client"

import {
  CellContext,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { ChevronDown } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

import { Button } from "@/components/atoms/shadcn/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/atoms/shadcn/dropdown-menu"
import { Input } from "@/components/atoms/shadcn/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/atoms/shadcn/table"

import { EventListRowMenu } from "@/components/organisms/event/list/EventListRowMenu"
import { generateColumns } from "@/lib/common/list/columns"
import { EVENT_LIST_TABLE_COLUMN_FIELDS } from "@/lib/event/list/constants"
import { EventListItem } from "@/types/event/viewmodel"

type PageInfo = {
  totalCount: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
}

interface Props {
  events: EventListItem[];
  pageInfo: PageInfo;
}

export const columns: ColumnDef<EventListItem>[] = generateColumns<EventListItem>(
  EVENT_LIST_TABLE_COLUMN_FIELDS,
  {
    id: "actions",
    cell: ({ row }: CellContext<EventListItem, unknown>) => {
      const event = row.original
      return <EventListRowMenu event={event} />
    },
  }
)

export function ServerPagenationTemplate({ 
  events,
  pageInfo
}: Readonly<Props>) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [sorting, setSorting] = useState<SortingState>(() => {
    const sortColumn = searchParams.get("sortColumn")
    const sortDirection = searchParams.get("sortDirection")
    if (sortColumn && sortDirection) {
      return [{
        id: sortColumn,
        desc: sortDirection === "desc"
      }]
    }
    return []
  })
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [searchValue, setSearchValue] = useState(searchParams.get("search") ?? "")

  // URLパラメータを更新する関数
  const updateParams = useCallback((updates: {
    search?: string;
    page?: number;
    pageSize?: number;
    sortColumn?: string;
    sortDirection?: "asc" | "desc";
  }) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (updates.search !== undefined) {
      if (updates.search) {
        params.set("search", updates.search)
        params.set("page", "1") // 検索時は1ページ目に戻す
      } else {
        params.delete("search")
      }
    }
    
    if (updates.page !== undefined) {
      params.set("page", updates.page.toString())
    }

    if (updates.pageSize !== undefined) {
      params.set("pageSize", updates.pageSize.toString())
      params.set("page", "1") // ページサイズ変更時は1ページ目に戻す
    }
    
    if (updates.sortColumn !== undefined) {
      if (updates.sortColumn) {
        params.set("sortColumn", updates.sortColumn)
      } else {
        params.delete("sortColumn")
      }
    }
    
    if (updates.sortDirection !== undefined) {
      if (updates.sortDirection) {
        params.set("sortDirection", updates.sortDirection)
      } else {
        params.delete("sortDirection")
      }
    }
    
    router.push(`?${params.toString()}`)
  }, [searchParams])

  // 検索値が変更されたときにURLを更新
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateParams({ search: searchValue })
    }, 1000) // 1秒のデバウンス

    return () => clearTimeout(timeoutId)
  }, [searchValue])

  // ソート状態が変更されたときにURLを更新
  useEffect(() => {
    if (sorting.length > 0) {
      const { id, desc } = sorting[0]
      updateParams({
        sortColumn: id,
        sortDirection: desc ? "desc" : "asc"
      })
    } else {
      updateParams({
        sortColumn: undefined,
        sortDirection: undefined
      })
    }
  }, [sorting])

  const table = useReactTable({
    data: events,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnVisibility,
    },
    manualPagination: true,
    manualSorting: true,
    pageCount: pageInfo.totalPages,
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="イベント名で検索..."
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              列の表示 <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  データがありません。
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex items-center space-x-2">
          <select
            className="h-8 rounded-md border border-input bg-background px-2 text-sm"
            value={searchParams.get("pageSize") ?? "5"}
            onChange={(e) => updateParams({ pageSize: Number(e.target.value) })}
          >
            <option value="5">5件</option>
            <option value="10">10件</option>
            <option value="20">20件</option>
            <option value="50">50件</option>
          </select>
          <div className="text-muted-foreground text-sm">
            {pageInfo.totalCount} 件中 {(pageInfo.currentPage - 1) * pageInfo.pageSize + 1} - {Math.min(pageInfo.currentPage * pageInfo.pageSize, pageInfo.totalCount)} 件を表示
          </div>
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateParams({ page: pageInfo.currentPage - 1 })}
            disabled={pageInfo.currentPage <= 1}
          >
            前へ
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateParams({ page: pageInfo.currentPage + 1 })}
            disabled={pageInfo.currentPage >= pageInfo.totalPages}
          >
            次へ
          </Button>
        </div>
      </div>
    </div>
  )
}
