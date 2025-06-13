import { selectEventById } from "@/lib/db/event";
import { selectUserGroupById } from "@/lib/db/user_group";
import { EventViewViewModel } from "@/types/event/viewmodel";
import { formatDateTimeYYYYMMDDHHMMJPN } from "@/lib/util/date";

/**
 * イベントIDからイベント詳細ビューモデルを取得
 * 
 * @param eventId イベントID
 * @returns イベント詳細のビューモデル
 */
export async function getEventViewViewModel(eventId: number): Promise<EventViewViewModel | null> {
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
    eventShareLinkUrl: `/room/${event.id}`,
    eventStartDateTime: formatDateTimeYYYYMMDDHHMMJPN(event.startDateTime),
    eventEndDateTime: formatDateTimeYYYYMMDDHHMMJPN(event.endDateTime),
    eventUrl: event.eventUrl ?? undefined,
    venueUrl: event.venueUrl ?? undefined,
    userGroupName: userGroup.name,
    userGroupUrl: `/user_group/${userGroup.id}`,
    imageUrl: event.imageUrl ?? undefined
  };
}
