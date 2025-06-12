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