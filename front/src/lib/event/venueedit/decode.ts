import { Color } from "react-color"
import { TextState } from "@/types/event/state"

/**
 * 復元された会場の情報
 */
interface DecodedVenue {
  numPixel: number
  pixelColorState: (Color | null)[][]
  circleColorState: (Color | null)[][]
  textState: TextState[]
}

/**
 * 会場の情報を復元する
 * @param json 会場の情報
 * @returns 復元された会場の情報
 */
export function decodeVenue(json: string): DecodedVenue {
  const data = JSON.parse(json)
  const { numPixel, encodedPixelColor, encodedCircleColor, textState } = data

  // 空の二次元配列を作成
  const pixelColorState: (Color | null)[][] = Array(numPixel).fill(null).map(() => Array(numPixel).fill(null))
  const circleColorState: (Color | null)[][] = Array(numPixel).fill(null).map(() => Array(numPixel).fill(null))

  // ピクセルカラーを復元
  Object.entries(encodedPixelColor).forEach(([color, positions]) => {
    (positions as {x: number, y: number}[]).forEach(({x, y}) => {
      pixelColorState[y][x] = color as Color
    })
  })

  // 円のカラーを復元
  Object.entries(encodedCircleColor).forEach(([color, positions]) => {
    (positions as {x: number, y: number}[]).forEach(({x, y}) => {
      circleColorState[y][x] = color as Color
    })
  })

  return {
    numPixel,
    pixelColorState,
    circleColorState,
    textState
  }
} 