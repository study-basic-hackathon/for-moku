import { FilterFn } from "@tanstack/react-table"

/**
 * 日付範囲でフィルタリングを行う関数
 * @template T テーブルの行データの型
 * @returns 日付範囲に基づいてフィルタリングを行う関数
 * @example
 * // 2024-01-01から2024-12-31の間のデータをフィルタリング
 * filterFn: dateRangeFilter<EventListItem>()
 */
export const dateRangeFilter = <T,>(): FilterFn<T> => (row, columnId, filterValue: [Date | null, Date | null]) => {
  const value : string = row.getValue(columnId)
  const [start, end] = filterValue

  if (!start && !end) return true
  if (!start) return new Date(value) <= end!
  if (!end) return new Date(value) >= start!
  return new Date(value) >= start && new Date(value) <= end
}

/**
 * 文字列の完全一致でフィルタリングを行う関数
 * @template T テーブルの行データの型
 * @returns 文字列の完全一致に基づいてフィルタリングを行う関数
 * @example
 * // "完了"という文字列と完全一致するデータをフィルタリング
 * filterFn: stringEqualsCompleteFilter<EventListItem>()
 */
export const stringEqualsCompleteFilter = <T,>(): FilterFn<T> => (row, columnId, filterValue : string | null) => {
  const value : string = row.getValue(columnId)
  const search = filterValue
  
  if (!search) return true
  return value.toString() === search // 完全一致のみ
}

/**
 * 列挙型の値でフィルタリングを行う関数（複数選択可能）
 * @template T テーブルの行データの型
 * @returns 指定された列挙型の値に含まれるかどうかでフィルタリングを行う関数
 * @example
 * // "admin"or"user"のどれを含むのかの状態データをフィルタリング
 * filterFn: enumFilter<EventListItem>()
 */
export const enumFilter = <T,>(): FilterFn<T> => (row, columnId, filterValue: string[] | null) => {
  const value: string = row.getValue(columnId)
  const search = filterValue

  if (!search || search.length === 0) return true
  return search.includes(value) // 配列に含まれるかどうか
}