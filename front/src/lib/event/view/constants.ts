import { CommonViewIconUnit } from "@/types/common/view";

/**
 * イベントのビューのヘッダーのアイコンユニットリストのデフォルト
 */
export const EVENT_VIEW_HEADER_ICON_UNITS_BASE: CommonViewIconUnit[] = [
  {
    name: "eventName",
    iconName: "Megaphone",
    description: "サンプルイベント",
    descriptionClassName: "text-2xl font-bold",
  },
  {
    name: "eventShareLinkUrl",
    iconName: "Link2",
    description: "もくもく部屋リンク",
    href: "/room/sample",
    descriptionClassName: "text-xl font-bold",
  },
  {
    name: "description",
    iconName: "FileText",
    description: "オフラインで開催予定のイベントです",
    descriptionClassName: "text-lg font-bold",
  },
]; 

/**
 * イベントのビューのアイコンユニットリストのデフォルト
 */
export const EVENT_VIEW_ICON_UNITS_BASE: CommonViewIconUnit[] = [
  {
    name: "userGroup",
    iconName: "Users",
    description: "ユーザーグループ",
    descriptionClassName: "text-xl font-bold",
  },
  {
    name: "startDateTime",
    iconName: "Calendar",
    description: "開始時間",
    descriptionClassName: "text-lg font-bold",
  },
  {
    name: "endDateTime",
    description: "終了時間",
    descriptionClassName: "text-lg font-bold",
  },
  {
    name: "venueLink",
    iconName: "Link",
    descriptionClassName: "text-md font-bold",
  },
  {
    name: "eventLink",
    iconName: "Link",
    descriptionClassName: "text-md font-bold",
  }
];