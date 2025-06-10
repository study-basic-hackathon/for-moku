'use client';

import { eventContainerClass } from "@/styles/event";
import CommonViewIconUnitList from "@/components/organisms/common/view/CommonViewIconUnitList";
import { CommonViewIconUnit } from "@/types/common/view";

/**
 * イベントのビューのヘッダーのアイコンユニットリスト
 * 
 * このコンポーネントは、イベント詳細画面のヘッダーのアイコンリストを表示します
 * 
 * スタイルのカスタマイズ:
 * - eventContainerClass: コンテナのスタイルをカスタマイズします（例：背景色、パディング、ホバー効果など）
 * 
 */
export const eventViewHeaderIconUnits: CommonViewIconUnit[] = [
  {
    name: "イベント名",
    iconName: "Megaphone",
    description: "サンプルイベント",
    descriptionClassName: "text-2xl font-bold",
  },
  {
    name: "共有リンク",
    iconName: "Link2",
    description: "部屋のリンク",
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
 * イベントのビューのヘッダー
 * 
 * このコンポーネントは、イベント詳細画面のヘッダーを表示します
 * 
 * スタイルのカスタマイズ:
 * - eventContainerClass: コンテナのスタイルをカスタマイズします（例：背景色、パディング、ホバー効果など）
 * 
 * 使用例:
 */
export default function EventViewHeader() {

  return (
    <div className={eventContainerClass}>
      <CommonViewIconUnitList units={eventViewHeaderIconUnits} containerClassName="flex justify-center items-center"/>
    </div>
  )
} 