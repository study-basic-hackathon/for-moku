import { CommonTableColumnField } from "@/types/common/list";
import { EventListItem } from "@/types/event/viewmodel";

/**
 * イベント一覧テーブルの列定義の型
 * CommonTableColumnFieldにおいて、nameをEventListItemのフィールドと同一にしている
 * 
 * @example
 * ```tsx
 *  const columns: EventListTableColumnField[] = [
 *    { name: "id", label: "ID", dataType: "string" },
 *    { name: "name", label: "名前", dataType: "string" },
 *    { name: "description", label: "説明", dataType: "string" },
 *    { name: "startDateTime", label: "開始日時", dataType: "date" },
 *    { name: "endDateTime", label: "終了日時", dataType: "date" },
 *    { name: "userGroupName", label: "ユーザーグループ名", dataType: "string" },
 *    { name: "role", label: "権限", dataType: "enum", enableFiltering: true, declineIncompleteFilter: true },
 *  ]
 * @returns フィールド
 */
export type EventListTableColumnField = CommonTableColumnField<EventListItem>;