import { createGyazoHeader } from "@/lib/api/gyazo";

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
      return Response.json(
        { error: '画像データが必要です' },
        { status: 400 }
      );
    }

    const url = `${process.env.GYAZO_UPLOAD_END_POINT}`;
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
      return Response.json(
        { error: 'Gyazoへのアップロードに失敗しました', details: errorData },
        { status: res.status }
      );
    }
    
    // Gyazo APIからのレスポンスをそのまま返す
    const data = await res.json();
    return Response.json({ data, status: res.status });
  } catch (error) {
    console.error('Gyazoアップロードエラー:', error);
    return Response.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}