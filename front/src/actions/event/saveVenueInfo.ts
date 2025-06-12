'use server';

import { auth } from "@/lib/auth/auth";
import { TextState } from "@/types/event/state";
import { generateImage } from "@/lib/event/venueedit/nodeCanvasControl";  
import { BASE_URL } from "@/app/env";

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
  numPixel: number
  encodedPixelColor: {[k: string]: {x: number, y: number}[]}
  encodedCircleColor: {[k: string]: {x: number, y: number}[]}
  textState: TextState[]
  pixelSize?: number
  gridColor?: string
  gridWidth?: number
}

/**
 * 会場の情報を永続化する
 * 
 * @param props: 会場の情報
 * @returns 保存された会場の情報
 */
export async function saveVenueInfo({
  numPixel,
  encodedPixelColor,
  encodedCircleColor,
  textState,
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
    numPixel,
    encodedPixelColor,
    encodedCircleColor,
    textState,
    pixelSize,
    gridColor,
    gridWidth
  });
  
  // BufferをUint8Arrayに変換してからBlobを作成
  const uint8Array = new Uint8Array(imageBuffer);
  const blob = new Blob([uint8Array], { type: 'image/png' });
  
  // APIに送信する処理
  const response = await fetch(`${BASE_URL}/api/event/gyazo`, {
    method: 'POST',
    body: blob
  });

  if (!response.ok) {
    throw new Error('画像のアップロードに失敗しました');
  }

  const result = await response.json();

  // TODO: レスポンスをそのまま表示、この中にURLが含まれる。次のブランチで消す。
  console.log(result);
  
  // TODO: 画像を保存する
  // 仮の実装として、Base64形式に変換して返す
  const base64Data = imageBuffer.toString('base64');
  const imageUrl = `data:image/png;base64,${base64Data}`;

  return {
    imageUrl,
    message: '画像が生成されました',
    gyazoUrl: result.data.url
  };
} 