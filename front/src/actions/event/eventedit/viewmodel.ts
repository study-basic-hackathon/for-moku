import { auth } from "@/lib/auth/auth";
import { selectEventEditViewInfoByUserEmailAndEventId } from "@/lib/db/event";
import { formatDateTimeHHMM, formatDateTimeYYYYMMDD_HYPHEN, convertUTCToJST } from "@/lib/util/date";
import { EventEditViewModel } from "@/types/event/viewmodel";

/**
 * イベントIDからイベント詳細ビューモデルを取得
 * 
 * @param eventId イベントID
 * @returns イベント詳細のビューモデル
 */
export async function getEventEditViewModel(eventId: number): Promise<EventEditViewModel | null> {

  // いつもの認証処理、メールアドレスがなければnullを返す
  const session = await auth();
  if (!session?.user?.email) {
    return null;
  }

  // イベント編集画面で使うビュー情報を取得
  const eventEditViewInfo = await selectEventEditViewInfoByUserEmailAndEventId(session.user.email, eventId);

  // ビュー情報がない場合はnullを返す
  if (!eventEditViewInfo) {
    return null;
  }

  // データベースから取得したUTC DateをJSTに変換してから表示用にフォーマット
  const startDateTimeJST = convertUTCToJST(eventEditViewInfo.startDateTime);
  const endDateTimeJST = convertUTCToJST(eventEditViewInfo.endDateTime);

  // イベント編集ビューモデルを作成
  return {
    eventId: eventEditViewInfo.id,
    eventName: eventEditViewInfo.name,
    description: eventEditViewInfo?.description ?? '',
    eventDate: formatDateTimeYYYYMMDD_HYPHEN(startDateTimeJST),
    eventStartTime: formatDateTimeHHMM(startDateTimeJST),
    eventEndTime: formatDateTimeHHMM(endDateTimeJST),
    eventUrl: eventEditViewInfo?.eventUrl ?? undefined,
    venueUrl: eventEditViewInfo?.venueUrl ?? undefined,
  };
}