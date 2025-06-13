import { Color } from "react-color"
import { EncodedVenue, TextState } from "@/types/event/state"
import { DEFAULT_NUM_PIXEL } from "@/lib/event/venueedit/constants"

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
export function decodeVenue(json: string | EncodedVenue): DecodedVenue {
  const data: EncodedVenue = typeof json === "string" ? JSON.parse(json) : json;

  if (!data) {
    return {
      numPixel: DEFAULT_NUM_PIXEL,
      pixelColorState: Array(DEFAULT_NUM_PIXEL).fill(null).map(() => Array(DEFAULT_NUM_PIXEL).fill(null)),
      circleColorState: Array(DEFAULT_NUM_PIXEL).fill(null).map(() => Array(DEFAULT_NUM_PIXEL).fill(null)),
      textState: []
    }
  }

  const { numPixel, encodedPixelColor, encodedCircleColor, textState } = data

  // 空の二次元配列を作成
  const numPixelNew = numPixel ?? DEFAULT_NUM_PIXEL
  const pixelColorState: (Color | null)[][] = Array(numPixelNew).fill(null).map(() => Array(numPixelNew).fill(null))
  const circleColorState: (Color | null)[][] = Array(numPixelNew).fill(null).map(() => Array(numPixelNew).fill(null))
  const textStateNew: TextState[] = textState ?? []
  if(encodedPixelColor) {
    // ピクセルカラーを復元
    Object.entries(encodedPixelColor).forEach(([color, positions]) => {
      (positions as {x: number, y: number}[]).forEach(({x, y}) => {
        pixelColorState[y][x] = color as Color
      })
    })
  }
  if(encodedCircleColor) {
    // 円のカラーを復元
    Object.entries(encodedCircleColor).forEach(([color, positions]) => {
      (positions as {x: number, y: number}[]).forEach(({x, y}) => {
        circleColorState[y][x] = color as Color
      })
    })
  }

  return {
    numPixel: numPixelNew,
    pixelColorState,
    circleColorState,
    textState: textStateNew
  }
} 