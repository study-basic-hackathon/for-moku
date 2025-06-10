import { CommonViewIconUnit } from "@/types/common/view";
import { EventViewViewModel } from "@/types/event/viewmodel";
import { EVENT_VIEW_ICON_UNITS_BASE } from "@/lib/event/view/constants";
import { useIconUnitList } from "@/lib/viewmodel/iconunit";

/**
 * イベントビューモデルからアイコンユニットリストを生成
 * 
 * @param event イベントビューモデル
 * @returns アイコンユニットリスト
 */
export function useEventViewIconUnits(event: EventViewViewModel): CommonViewIconUnit[] {
  return useIconUnitList(
    EVENT_VIEW_ICON_UNITS_BASE,
    {
      userGroup: { description: event.userGroupName, href: event.userGroupUrl },
      startDateTime: { description: event.eventStartDateTime },
      endDateTime: { description: `　　　〜　${event.eventEndDateTime}` },
      venueLink: event.venueUrl ? { 
        href: event.venueUrl,
        description: "会場リンク"
      } : {},
      eventLink: event.eventUrl ? { 
        href: event.eventUrl,
        description: "イベントリンク"
      } : {},
    }
  );
} 