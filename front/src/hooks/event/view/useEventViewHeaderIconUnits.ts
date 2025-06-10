import { CommonViewIconUnit } from "@/types/common/view";
import { EventViewViewModel } from "@/types/event/viewmodel";
import { EVENT_VIEW_HEADER_ICON_UNITS_BASE } from "@/lib/event/view/constants";
import { useIconUnitList } from "@/lib/viewmodel/iconunit";

/**
 * イベントビューモデルからヘッダー用アイコンユニットリストを生成
 * 
 * @param event イベントビューモデル
 * @returns ヘッダー用アイコンユニットリスト
 */
export function useEventViewHeaderIconUnits(event: EventViewViewModel): CommonViewIconUnit[] {
  return useIconUnitList(
    EVENT_VIEW_HEADER_ICON_UNITS_BASE,
    {
      eventName: { description: event.eventName },
      eventShareLinkUrl: {
        description: "もくもく部屋リンク",
        href: event.eventShareLinkUrl,
      },
      description: { description: event.description },
    }
  );
} 