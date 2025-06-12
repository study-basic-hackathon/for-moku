'use server';

import { auth } from "@/lib/auth/auth";
import { generateImage } from "@/lib/event/venueedit/nodeCanvasControl";  
import { BASE_URL } from "@/app/env";
import { selectEventById, updateEvent } from "@/lib/db/event";
import { EncodedVenue } from "@/types/event/state";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { imageUrlToImageId } from "@/lib/event/venueedit/gyazo";
import { Event, UpdateEvent } from "@/types/event/schema";

/**
 * 画像をアップロードする
 * @param imageBuffer アップロードする画像のバッファ
 * @returns アップロードされた画像のURL
 */
async function uploadImageToGyazo(imageBuffer: Buffer): Promise<string> {
  // BufferをUint8Arrayに変換してからBlobを作成
  const uint8Array = new Uint8Array(imageBuffer);
  const blob = new Blob([uint8Array], { type: 'image/png' })
  // APIに送信する処理
  const uploadResponse = await fetch(`${BASE_URL}/api/event/gyazo`, {
    method: 'POST',
    body: blob
  });

  if (!uploadResponse.ok) {
    throw new Error('画像のアップロードに失敗しました');
  }
  const uploadResult = await uploadResponse.json();
  return uploadResult.data.url;
}

/**
 * イベントレコードを更新するためのデータを作成する
 * @param event 古いイベント情報
 * @param encodedVenue 新しい会場情報
 * @param newImageUrl 新しい画像のURL
 * @returns 更新するイベントレコード
 */
function convertToUpdateEventFromVenueEdit(event: Event, encodedVenue: EncodedVenue, newImageUrl: string) : UpdateEvent {
  // 古いイベント情報からidを抜いた上で、新しいイベントレコードを作成
  const {id: _, ...rest} = event
  return {
    ...rest,
    imageJson: JSON.stringify(encodedVenue),
    imageUrl: newImageUrl
  }
}

/**
 * 会場の情報を永続化するためのパラメータ
 * 
 * @param numPixel ピクセル数
 * @param encodedPixelColor ピクセルの色状態
 * @param encodedCircleColor 円の色状態
 * @param textState テキストの状態
 * @param pixelSize ピクセルサイズ
 * @param gridColor グリッドの色
 * @param gridWidth グリッドの幅
 */
interface Props {
  eventId: number
  encodedVenue: EncodedVenue
  pixelSize?: number
  gridColor?: string
  gridWidth?: number
}

/**
 * 古い画像を削除する
 * @param oldImageUrl 削除する画像のURL
 */
async function deleteOldImage(oldImageUrl: string | null) {
  if (!oldImageUrl) return;

  const oldImageId = imageUrlToImageId(oldImageUrl);
  // 画像の削除処理
  const deleteResponse = await fetch(`${BASE_URL}/api/event/gyazo`, {
    method: 'DELETE',
    body: JSON.stringify({ imageId: oldImageId })
  });

  if (!deleteResponse.ok) {
    throw new Error('画像の削除に失敗しました');
  }
}

/**
 * 会場の情報を永続化する
 * 
 * @param props: 会場の情報
 * @returns 保存された会場の情報
 */
export async function saveVenueInfo({
  eventId,
  encodedVenue,
  pixelSize = 30,
  gridColor = '#CCCCCC',
  gridWidth = 1
}: Props) {
  const session = await auth();
  if (!session) {
    throw new Error('認証が必要です');
  }

  // PNG形式のバッファを生成
  const imageBuffer = generateImage({
    encodedVenue,
    pixelSize,
    gridColor,
    gridWidth
  });

  // 古いイベント情報を取得
  const oldEvent = await selectEventById(eventId);
  if (!oldEvent) {  
    throw new Error('イベントが見つかりません');
  }
  // 古い画像を削除
  await deleteOldImage(oldEvent.imageUrl);
  
  // 画像をアップロード
  const newImageUrl = await uploadImageToGyazo(imageBuffer);

  // イベントレコードの更新処理
  const updatedEvent = await db.transaction(async (tx) => {
    return await updateEvent(tx, eventId,  convertToUpdateEventFromVenueEdit(oldEvent, encodedVenue, newImageUrl));
  });

  if (!updatedEvent) {
    throw new Error('イベントの更新に失敗しました');
  }

  revalidatePath(`/event/venueedit/${eventId}`);
  redirect(`/event/view/${eventId}`);
} 