'use server';

import { auth } from "@/lib/auth/auth";
import { EventVenueEditViewModel } from "@/types/event/viewmodel";
import { selectEventById } from "@/lib/db/event";


/**
 * イベント会場編集画面用のビューモデルを取得するためのパラメータ
 * 
 * @param eventId イベントID
 */
interface Props {
  eventId: number
}

/**
 * 会場の情報を永続化する
 * 
 * @param props イベントID
 * @returns イベント会場編集画面用のビューモデル
 */
export async function getVenueEditViewmodel({eventId} : Props): Promise<EventVenueEditViewModel | null> {
  const session = await auth();
  if (!session) {
    console.error('認証が必要です');
    return null;
  }

  const event = await selectEventById(eventId);
  if (!event) {
    console.error('イベントが見つかりません', eventId);
    return null;
  }

  // TODO: 権限の確認

  // イベント会場編集画面用のビューモデルを作成
  return {
    eventId: event.id,
    eventName: event.name,
    imageJson: event.imageJson as JSON ?? undefined,
  };
}