import { RowData, Table } from "@tanstack/react-table"

import { Button } from "@/components/atoms/shadcn/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/shadcn/select"
/**
 * テーブルのページネーションを表示するコンポーネント
 * @generic TData テーブルのデータの型
 * 
 * @example
 * ```tsx
 *  <ListTablePagination<EventListItem> table={table} />
 * ```
 */
interface Props<T extends RowData> {
  table: Table<T>
}

/**
 * 【共通コンポーネント】テーブルのページネーションを表示するコンポーネント
 * @param table テーブルのデータ
 * @generic T テーブルのデータの型
 * 
 * @returns テーブルのページネーションを制御するコンポーネント
 * @example
 * ```tsx
 *  <ListTablePagination<EventListItem> table={table} />
 * ```
 */
export function ListTablePagination<T extends RowData>({ table }: Readonly<Props<T>>) {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <div className="flex items-center space-x-2">
        <Select
          value={table.getState().pagination.pageSize.toString()}
          onValueChange={(value) => {
            table.setPageSize(Number(value))
          }}
        >
          <SelectTrigger className="h-8 w-[100px]">
            <SelectValue placeholder="5件" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5件</SelectItem>
            <SelectItem value="10">10件</SelectItem>
            <SelectItem value="20">20件</SelectItem>
            <SelectItem value="50">50件</SelectItem>
          </SelectContent>
        </Select>
        <div className="text-muted-foreground text-sm">
          {table.getFilteredRowModel().rows.length} 件中 {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} - {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getFilteredRowModel().rows.length)} 件を表示
        </div>
      </div>
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          前へ
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          次へ
        </Button>
      </div>
    </div>
  )
} 