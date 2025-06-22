import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { finishedEventState } from './schema/finished_event_state';
import { UserIcon } from '@/types/room/shared';

/**
 * イベントIDで終了したイベントの状態を選択する関数
 *
 * @param eventId イベントID
 * @returns イベント終了時のユーザアイコンの位置とプロフィール
 */
export async function selectFinishedEventState(eventId: number) {
  const res = await db
    .select()
    .from(finishedEventState)
    .where(eq(finishedEventState.eventId, eventId));
  return res[0].userIcons as UserIcon[] ?? null;
}

/**
 * 終了したイベントの状態を挿入する関数
 *
 * @param eventId イベントID
 * @param userIcons イベント終了時のユーザアイコンの位置とプロフィール
 * @returns 挿入結果
 */
export async function insertFinishedEventState(
  eventId: number,
  userIcons: UserIcon[],
) {
  return await db
    .insert(finishedEventState)
    .values({ eventId, userIcons })
    .returning();
}
