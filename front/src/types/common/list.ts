/**
 * 共通のテーブルの列定義
 * 
 * @param name 列の名前
 * @param label 列のラベル
 * @param dataType 列のデータ型
 * @param enableHiding 列の非表示設定(非表示にできればtrue)
 * @param enableSorting 列のソート設定(ソート可能であればtrue)
 * @param enableFiltering 列のフィルタ設定(フィルタ可能であればtrue)
 * @param declineIncompleteFilter 列の不完全フィルタを拒否するか(完全一致なフィルタしか利用できないようにしたい場合はtrue)
 * 
 * @example
 * roleについては、完全一致でフィルタリングしたいのでdeclineIncompleteFilter: true としている
 * ```tsx
 *  const columns: CommonTableColumnField<EventListItem>[] = [
 *    { name: "id", label: "ID", dataType: "string" },
 *    { name: "name", label: "名前", dataType: "string" },
 *    { name: "description", label: "説明", dataType: "string" },
 *    { name: "startDateTime", label: "開始日時", dataType: "date" },
 *    { name: "endDateTime", label: "終了日時", dataType: "date" },
 *    { name: "userGroupName", label: "ユーザーグループ名", dataType: "string" },
 *    { name: "role", label: "権限", dataType: "enum", enableFiltering: true, declineIncompleteFilter: true },
 *  ]
 * ```
 * @generic T テーブルの行データの型
 * @returns 列定義
 */
export type CommonTableColumnField<T> = {
  [K in keyof T]: {
    name: K;
    label: string;
    dataType: "date" | "enum" | "string";
    enableHiding?: boolean;
    enableSorting?: boolean;
    enableFiltering?: boolean;
    declineIncompleteFilter?: boolean;
  }
}[keyof T];