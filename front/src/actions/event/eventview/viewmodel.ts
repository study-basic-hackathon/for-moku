import { checkUserIsAdminOfEventByUserEmailAndEventId, selectEventById } from "@/lib/db/event";
import { selectUserGroupById } from "@/lib/db/user_group";
import { EventViewViewModel } from "@/types/event/viewmodel";
import { formatDateTimeYYYYMMDDHHMMJPN, convertUTCToJST } from "@/lib/util/date";
import { auth } from "@/lib/auth/auth";

/**
 * イベントIDからイベント詳細ビューモデルを取得
 * 
 * @param eventId イベントID
 * @returns イベント詳細のビューモデル
 */
export async function getEventViewViewModel(eventId: number): Promise<EventViewViewModel | null> {
  // イベントを取得
  const event = await selectEventById(eventId);
  
  // イベントが見つからない場合はnullを返す
  if (!event) {
    return null;
  }

  // ユーザーグループを取得、できなければnullを返す
  const userGroup = await selectUserGroupById(event.userGroupId);
  if (!userGroup) {
    return null;
  }

  // いつもの認証処理、メールアドレスがなければnullを返す
  const session = await auth();
  if (!session?.user?.email) {
    return null;
  }
  
  // ユーザーがイベントの管理者であるかを確認する
  const isAdmin = await checkUserIsAdminOfEventByUserEmailAndEventId(session.user.email, event.id);

  // データベースから取得したUTC DateをJSTに変換してから表示用にフォーマット
  const startDateTimeJST = convertUTCToJST(event.startDateTime);
  const endDateTimeJST = convertUTCToJST(event.endDateTime);

  // イベント詳細ビューモデルを作成
  return {
    eventId: event.id,
    eventName: event.name,
    description: event.description ?? '',
    eventShareLinkUrl: `/room/${event.id}`,
    eventStartDateTime: formatDateTimeYYYYMMDDHHMMJPN(startDateTimeJST),
    eventEndDateTime: formatDateTimeYYYYMMDDHHMMJPN(endDateTimeJST),
    eventUrl: event.eventUrl ?? undefined,
    venueUrl: event.venueUrl ?? undefined,
    userGroupName: userGroup.name,
    userGroupUrl: `/user_group/view/${userGroup.id}`,
    imageUrl: event.imageUrl ?? undefined,
    isAdmin: isAdmin,
  };
}
