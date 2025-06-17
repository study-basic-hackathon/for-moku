import { RowData, Table as TableType, flexRender } from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/atoms/shadcn/table"

/**
 * テーブルのデータの型
 * @generic T テーブルのデータの型
 * 
 * @example
 * ```tsx
 *  <ListTableData<EventListItem> table={table} />
 * ```
 */
interface Props<T extends RowData> {
  table: TableType<T>
}

/**
 * 【共通コンポーネント】テーブルのデータを表示するコンポーネント
 * @param table テーブルのデータ * 
 * @generic T テーブルのデータの型
 * 
 * @returns テーブルのデータ(ヘッダーとテーブルの両方が返ってくる)
 * @example
 * ```tsx
 *  <ListTableData<EventListItem> table={table} />
 * ```
 */
export function ListTableData<T extends RowData>({ table }: Readonly<Props<T>>) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {flexRender(
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
                colSpan={table.getAllColumns().length}
                className="h-24 text-center"
              >
                データがありません。
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
} 