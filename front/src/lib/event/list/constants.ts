import { EventListTableColumnField } from "@/types/event/list";

/**
 * イベント一覧テーブルの列定義
 * Templateやフックなどから呼び出し、イベント一覧テーブルの列を生成するのに使う
 * @returns 列定義
 */
export const EVENT_LIST_TABLE_COLUMN_FIELDS: EventListTableColumnField[] = [
  {
    name: "role",
    label: "権限",
    dataType: "enum",
    enableHiding: true,
    enableSorting: true,
    enableFiltering: true,
    declineIncompleteFilter: true,
  } ,
  {
    name: "name",
    label: "イベント名",
    dataType: "string",
    enableHiding: true,
    enableSorting: true,
    enableFiltering: true,
    declineIncompleteFilter: false,
  },
  {
    name: "startDateTime",
    label: "開始日時",
    dataType: "date",
    enableHiding: true,
    enableSorting: true,
    enableFiltering: true,
  } ,
  {
    name: "endDateTime",
    label: "終了日時",
    dataType: "date",
    enableHiding: true,
    enableSorting: true,
    enableFiltering: true,
  } ,
  {
    name: "userGroupName",
    label: "グループ",
    dataType: "string",
    enableHiding: true,
    enableSorting: true,
    enableFiltering: true,
  } ,
];