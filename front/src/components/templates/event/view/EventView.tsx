'use client';
import { eventContainerClass } from "@/styles/event";
import CommonViewIconUnitList from "@/components/organisms/common/view/CommonViewIconUnitList";
import ViewIconUnit from "@/components/organisms/common/view/ViewIconUnit";
import { eventSample } from "@/actions/event/sample";
import { CommonViewIconUnit } from "@/types/common/view";

export const eventViewIconUnits: CommonViewIconUnit[] = [
  {
    name: "participants",
    iconName: "Users",
    description: "ユーザーグループ",
    href: "#",
    descriptionClassName: "text-xl font-bold",
  },
  {
    name: "startTime",
    iconName: "Calendar",
    description: "2024年5月1日 10:00",
    descriptionClassName: "text-lg font-bold",
  },
  {
    name: "endTime",
    description: "　　　〜　2024年5月1日 18:00",
    descriptionClassName: "text-lg font-bold",
  },
  {
    name: "venueLink",
    iconName: "Link",
    description: "会場リンク",
    descriptionClassName: "text-md font-bold",
    href: "#",
  },
  {
    name: "eventLink",
    iconName: "Link",
    description: "イベントリンク",
    descriptionClassName: "text-md font-bold",
    href: "#",
  }
];

/**
 * イベントのビュー
 * 
 * このコンポーネントは、イベント詳細画面の右下にあるテンプレートを表示します
 * 
 * スタイルのカスタマイズ:
 * - eventContainerClass: コンテナのスタイルをカスタマイズします（例：背景色、パディング、ホバー効果など）
 * 
 * 使用例:
 */
export default function EventView() {
  return (
    <div className={eventContainerClass}>
      <div className="flex justify-end items-center w-full gap-x-2">
        <ViewIconUnit unit={{
          name: "edit",
          iconName: "Pencil",
          description: "編集",
          href: "/event/eventedit/sample",
          iconClassName: "w-6 h-6",
        }} />
        <ViewIconUnit unit={{
          name: "copy",
          iconName: "Copy",
          description: "イベントコピー",
          iconClassName: "w-6 h-6",
          onClick: eventSample,
        }} />
      </div>
      <CommonViewIconUnitList units={eventViewIconUnits} />
    </div>
  )
} 