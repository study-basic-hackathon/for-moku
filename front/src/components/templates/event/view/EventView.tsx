'use client';
import { eventContainerClass } from "@/styles/event";
import CommonViewIconUnitList from "@/components/organisms/common/view/CommonViewIconUnitList";
import ViewIconUnit from "@/components/organisms/common/view/ViewIconUnit";
import { EventViewViewModel } from "@/types/event/viewmodel";
import { useEventViewIconUnits } from "@/hooks/event/view/useEventViewIconUnits";

interface Props {
  event: EventViewViewModel;
}

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
export default function EventView({ event }: Readonly<Props>) {
  // アイコンユニットリストを作成
  const eventViewIconUnits = useEventViewIconUnits(event);

  return (
    <div className={eventContainerClass}>
      <div className="flex justify-end items-center w-full gap-x-2">
        <ViewIconUnit unit={{
          name: "edit",
          iconName: "Pencil",
          description: "編集",
          href: `/event/eventedit/${event.eventId}`,
          iconClassName: "w-6 h-6",
        }} />
        <ViewIconUnit unit={{
          name: "copy",
          iconName: "Copy",
          description: "イベントコピー",
          iconClassName: "w-6 h-6",
          onClick: async () => {},
        }} />
      </div>
      <CommonViewIconUnitList units={eventViewIconUnits} />
    </div>
  )
} 