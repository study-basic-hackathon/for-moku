"use client"

import { useState, useMemo } from "react"
import { useReactTable, getCoreRowModel
          , getPaginationRowModel, getSortedRowModel
          , getFilteredRowModel, SortingState
          , ColumnFiltersState
          , PaginationState, 
          ColumnDef,
          RowData} from "@tanstack/react-table"
import { dateRangeFilter, enumFilter, stringEqualsCompleteFilter } from "@/lib/list/filters"

/**
 * 【共通フック】テーブル(tanstackのテーブル)を使用するためのフック
 * @param events テーブルのデータ
 * @param columns テーブルの列
 * 
 * @generic T テーブルの行データの型
 * @example
 * ```tsx
 *  const { table } = useCommonListTable<EventListItem>(events, columns)
 * ```
 * @returns テーブルの関数そのもの(useReactTableの返り値)
 */
export function useCommonListTable<T extends RowData>(events: T[], columns: ColumnDef<T>[]) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  })

  // テーブルの設定を返却する関数(メモ化することで、テーブルの設定が変更されない限り、再レンダリングされないようにする)
  const tableConfig = useMemo(() => ({
    data: events,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    filterFns: {
      dateRangeFilter: dateRangeFilter<T>(),
      stringEqualsCompleteFilter: stringEqualsCompleteFilter<T>(),
      enumFilter: enumFilter<T>(),
    },
    state: {
      sorting,
      columnFilters,
      pagination,
    },
    pageCount: Math.ceil(events.length / pagination.pageSize),
  }), [events, columns, sorting, columnFilters, pagination])

  // テーブルの関数そのもの(useReactTableの返り値)を返却する
  const table = useReactTable(tableConfig)

  return {
    table
  }
} 