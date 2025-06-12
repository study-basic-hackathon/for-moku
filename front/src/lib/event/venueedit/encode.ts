import { TextState } from "@/types/event/state"
import { Color } from "react-color"

/**
 * エンコードされた会場データのインターフェース
 */
interface EncodedVenue {
  numPixel: number
  encodedPixelColor: {[k: string]: {x: number, y: number}[]}
  encodedCircleColor: {[k: string]: {x: number, y: number}[]}
  textState: TextState[]
}

/**
 * マトリックスの要素を表すインターフェース
 */
interface MatrixElement {
  value: Color;
  x: number;
  y: number;
}

/**
 * マトリックスをフラット化し、nullを除去して色ごとに座標をグループ化する
 * @param matrix 2次元の色マトリックス
 * @returns 色をキー、座標の配列を値とするMap
 */
function flattenAndRemoveNull(matrix: (Color | null)[][]): Map<string, {x: number, y: number}[]> {
  const flatten =  matrix.flatMap((row, y) => 
    row.map((value, x) => ({ value, x, y }))
      .filter(({ value }) => value !== null) as MatrixElement[]
  )

  const colorMap = flatten.reduce((acc, element) => {
    const color = element?.value?.toString()
    if (!acc.has(color)) {
      acc.set(color, [])
    }
    acc.get(color)?.push({x: element.x, y: element.y})
    return acc
  }, new Map<string, {x: number, y: number}[]>()
  )

  return colorMap
}

/**
 * 会場データをエンコードする
 * @param numPixel ピクセル数
 * @param pixelColorState ピクセルの色状態
 * @param circleColorState 円の色状態
 * @param textState テキストの状態
 * @returns エンコードされた会場データ
 */
export function encodeVenue(numPixel: number, pixelColorState: (Color | null)[][], circleColorState: (Color | null)[][], textState: TextState[]) :EncodedVenue {
  const encodedPixelColor = Object.fromEntries(flattenAndRemoveNull(pixelColorState))
  const encodedCircleColor = Object.fromEntries(flattenAndRemoveNull(circleColorState))
  return {
    numPixel,
    encodedPixelColor,
    encodedCircleColor,
    textState
  }
}

/**
 * 会場データをJSONとしてダウンロードする
 * @param numPixel ピクセル数
 * @param pixelColorState ピクセルの色状態
 * @param circleColorState 円の色状態
 * @param textState テキストの状態
 */
export async function downloadVenueJson(numPixel: number, pixelColorState: (Color | null)[][], circleColorState: (Color | null)[][], textState: TextState[]) {
  const encoded = encodeVenue(numPixel, pixelColorState, circleColorState, textState)
  const jsonString = JSON.stringify(encoded)

  // JSONを圧縮
  const compressed = jsonString
    .replace(/\s+/g, '')  // 空白を削除
    .replace(/,}/g, '}')  // 末尾のカンマを削除
    .replace(/,]/g, ']');  // 配列の末尾のカンマを削除

  const blob = new Blob([compressed], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `venue_${new Date().toISOString()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}