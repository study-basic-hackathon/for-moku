import { Color } from "react-color"

export type TextState = {  
  text: string
  startX: number
  startY: number
  endX: number
  endY: number
  textColor: Color
  backgroundColor: Color | null
  borderColor: Color | null
  orientation: 'horizontal' | 'vertical'
}

export type Position = {
  startX: number
  startY: number
  endX: number
  endY: number
}

/**
 * エンコード済み会場データの型
 */
export type EncodedVenue = {
  numPixel: number
  encodedPixelColor: {[k: string]: {x: number, y: number}[]}
  encodedCircleColor: {[k: string]: {x: number, y: number}[]}
  textState: TextState[]
}