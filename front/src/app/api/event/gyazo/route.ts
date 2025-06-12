import { GYAZO_DELETE_END_POINT, GYAZO_UPLOAD_END_POINT } from "@/app/env";
import { createGyazoHeader } from "@/lib/api/gyazo";
import { NextResponse } from "next/server";

/**
 * 画像をGyazoにアップロードするAPIルート
 * reqにはblobを入れればいい
 * 使い方：
 * ```ts
 * const res = await fetch('${process.env.NEXT_PUBLIC_BASE_URL}/api/event/gyazo', {
 *   method: 'POST',
 *   body: blob
 * });
 * ```
 * 
 * 
 * @param req リクエスト(画像データ)
 * @returns レスポンス(Gyazo APIからのレスポンス)
 */
export async function POST(req: Request) {
  try {
    const imageBuffer = await req.arrayBuffer();
    if (!imageBuffer) {
      return NextResponse.json(
        { error: '画像データが必要です' },
        { status: 400 }
      );
    }

    const url = `${GYAZO_UPLOAD_END_POINT}`;
    const headers = await createGyazoHeader();
    
    const formData = new FormData();
    formData.append('imagedata', new Blob([imageBuffer], { type: 'image/png' }));

    const res = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: formData
    });
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return NextResponse.json(
        { error: 'Gyazoへのアップロードに失敗しました', details: errorData },
        { status: res.status }
      );
    }
    
    // Gyazo APIからのレスポンスをそのまま返す
    const data = await res.json();
    return NextResponse.json({ data, status: res.status });
  } catch (error) {
    console.error('Gyazoアップロードエラー:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}

/**
 * 画像をGyazoに削除するAPIルート
 * reqには画像IDを入れればいい
 * 使い方：
 * ```ts
 * const res = await fetch('${process.env.NEXT_PUBLIC_BASE_URL}/api/event/gyazo', {
 *   method: 'DELETE',
 *   body: { imageId: '1234567890' }
 * });
 * ```
 * 
 * 
 * @param req リクエスト(画像ID)
 * @returns レスポンス(Gyazo APIからのレスポンス)
 */
export async function DELETE(req: Request) {
  try {
    const { imageId } = await req.json();
    if (!imageId) {
      return NextResponse.json(
        { error: '画像IDが必要です' },
        { status: 400 }
      );
    }
    
    const url = `${GYAZO_DELETE_END_POINT}/${imageId}`;
    const headers = await createGyazoHeader();
    
    const res = await fetch(url, {
      method: 'DELETE',
      headers: headers,
    });
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return NextResponse.json(
        { error: 'Gyazoにあるデータの削除に失敗しました', details: errorData },
        { status: res.status }
      );
    }
    
    // Gyazo APIからのレスポンスをそのまま返す
    const data = await res.json();
    return NextResponse.json({ data, status: res.status });
  } catch (error) {
    console.error('Gyazo削除エラー:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}