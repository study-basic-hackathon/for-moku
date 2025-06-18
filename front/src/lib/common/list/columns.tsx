import React from "react"
import { ColumnDef, CellContext, HeaderContext, RowData } from "@tanstack/react-table"
import { formatDateTimeYYYYMMDDHHMMJPN } from "@/lib/util/date"
import { Button } from "@/components/atoms/shadcn/button"
import { ArrowUpDown } from "lucide-react"
import { dateRangeFilter, enumFilter, stringEqualsCompleteFilter } from "@/lib/list/filters"
import { CommonTableColumnField } from "@/types/common/list"


// フィルタコンフィグを生成
const generateFilterConfig = <T extends RowData>(field: CommonTableColumnField<T>) => {
  let filterConfig = {}
  if (field.dataType === "date") {
    filterConfig = { filterFn: dateRangeFilter<T>() }
  } else if (field.declineIncompleteFilter) {
    filterConfig = { filterFn: stringEqualsCompleteFilter<T>() }
  } else if (field.dataType === "enum") {
    filterConfig = { filterFn: enumFilter<T>() }
  }
  // それ以外はデフォルトのフィルタが適用される(like検索)
  return filterConfig
}

/**
 * 【共通関数】テーブルの列を生成する関数
 * すでに定義されているフィールドを使って、テーブルの列を生成する
 * 
 * 大まかなルールは以下の通り
 * 1. フィルタコンフィグについて
 * - データ型がdateの場合は、dateRangeFilterを使用する
 * - declineIncompleteFilterがtrueの場合は、stringEqualsCompleteFilterを使用する
 * - データ型がenumの場合は、enumFilterを使用する
 * 2. ヘッダコンフィグについて
 * - enableSortingがtrueの場合は、ヘッダの列をクリックするとソートが有効になる
 * 3. 表示コンフィグについて
 * - enableHidingがtrueの場合は、非表示にする
 * 
 * 
 * @param fields テーブルの列のフィールド
 * @param actions テーブルの列のアクション
 * 
 * @generic T テーブルの行データの型
 * @returns テーブルの列
 * @example
 * ```tsx
 *  const columns = generateColumns<EventListItem>(
 *    EVENT_LIST_TABLE_COLUMN_FIELDS,
    {
      id: "actions",
      cell: ({ row }: CellContext<EventListItem, unknown>) => {
        const event = row.original
        return <EventListRowMenu event={event} />
      },
    }
  )
 * ```
 */
export function generateColumns<T extends RowData>(
  fields: CommonTableColumnField<T>[],
  actions?: {
    id: string
    cell: (props: CellContext<T, unknown>) => React.ReactNode
  }
): ColumnDef<T>[] {
  const columns: ColumnDef<T>[] = []
  // もし、行にアクション列があれば左側に追加する
  if (actions) {
    columns.push({
      id: actions.id,
      enableHiding: false,
      cell: actions.cell,
    })
  }

  // フィールドの列を追加する
  columns.push(...fields.map((field) => {


    return {
      accessorKey: field.name,
      // ヘッダについては、enableSortingがtrueの場合は、ヘッダの列をクリックするとソートが有効になりボタン要素に変化する
      header: ({ column }: HeaderContext<T, unknown>) => {
        if (field.enableSorting) {
          return (
            <div className="flex flex-col gap-2">
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                {field.label}
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )
        }
        return (
          <div className="flex flex-col gap-2 text-center text-sm">
            {field.label}
          </div>
        )
      },
      // 日時型のデータであれば、日本語に変換する
      cell: ({ row }: CellContext<T, unknown>) => {
        const value = row.original[field.name]
        if (field.dataType === "date") {
          return <div className="text-bold">{formatDateTimeYYYYMMDDHHMMJPN(new Date(value as string))}</div>
        }
        return <div className="text-bold">{value as string}</div>
      },
      // フィルタコンフィグを追加する(前の処理で指定)
      ...generateFilterConfig<T>(field)
    }
  }))

  return columns
} 