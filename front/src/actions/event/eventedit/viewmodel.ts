import { selectEventById } from "@/lib/db/event";
import { selectUserGroupById } from "@/lib/db/user_group";
import { formatDateTimeHHMM, formatDateTimeYYYYMMDD_HYPHEN, formatDateTimeYYYYMMDD_SLASH } from "@/lib/util/date";
import { EventEditViewModel } from "@/types/event/viewmodel";

/**
 * イベントIDからイベント詳細ビューモデルを取得
 * 
 * @param eventId イベントID
 * @returns イベント詳細のビューモデル
 */
export async function getEventEditViewModel(eventId: number): Promise<EventEditViewModel | null> {
  // イベントを取得
  const event = await selectEventById(eventId);
  
  // イベントが見つからない場合はエラーを返す
  if (!event) {
    return null;
  }

  // ユーザーグループを取得
  const userGroup = await selectUserGroupById(event.userGroupId);
  if (!userGroup) {
    return null;
  }

  // イベント詳細ビューモデルを作成
  return {
    eventId: event.id,
    eventName: event.name,
    description: event.description ?? '',
    userGroupId: event.userGroupId, 
    userGroupName: userGroup.name,
    eventDate: formatDateTimeYYYYMMDD_HYPHEN(event.startDateTime),
    eventStartTime: formatDateTimeHHMM(event.startDateTime),
    eventEndTime: formatDateTimeHHMM(event.endDateTime),
    eventUrl: event.eventUrl ?? undefined,
    venueUrl: event.venueUrl ?? undefined,
  };
}