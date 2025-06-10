import { eventContainerClass } from "@/styles/event";
import CommonViewIconUnitList from "@/components/organisms/common/view/CommonViewIconUnitList";
import { EventViewViewModel } from "@/types/event/viewmodel";
import { useEventViewHeaderIconUnits } from "@/hooks/event/view/useEventViewHeaderIconUnits";

interface Props {
  event: EventViewViewModel;
}

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
export default function EventViewHeader({ event }: Readonly<Props>) {
  // アイコンユニットリストを作成
  const eventViewHeaderIconUnits = useEventViewHeaderIconUnits(event);

  return (
    <div className={eventContainerClass}>
      <CommonViewIconUnitList units={eventViewHeaderIconUnits} containerClassName="flex justify-center items-center"/>
    </div>
  )
} 