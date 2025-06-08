import { useRef, useEffect, useCallback } from 'react'
import { Color } from 'react-color'
import { TextState } from '@/types/event/state'
import { syncAllStateToCanvas, initializeCanvas } from '@/lib/event/venueedit/canvasControl'
import { CANVAS_BASE } from '@/lib/event/venueedit/constants'

interface Props {
  numPixel: number
  pixelColorState: (Color | null)[][]
  circleColorState: (Color | null)[][]
  textState: TextState[]
  setPixelColorState: React.Dispatch<React.SetStateAction<(Color | null)[][]>>
  setCircleColorState: React.Dispatch<React.SetStateAction<(Color | null)[][]>>
  setTextState: React.Dispatch<React.SetStateAction<TextState[]>>
  isDialogModalOpen: boolean
}
/**
 * Stateとキャンバスの同期を司るフック
 * @param numPixel ピクセル数
 * @param pixelColorState ピクセルの色状態
 * @param circleColorState 円の色状態
 * @param textState テキストの状態
 * @param setPixelColorState ピクセルの色状態を更新する関数
 * @param setCircleColorState 円の色状態を更新する関数
 * @param setTextState テキストの状態を更新する関数
 * @param isDialogModalOpen ダイアログの状態
 */
export const useDrawingState = ({ numPixel, pixelColorState, circleColorState, textState, setPixelColorState, setCircleColorState, setTextState, isDialogModalOpen }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isDrawingRef = useRef(false)

  const syncAllState = useCallback((ctx: CanvasRenderingContext2D) => {
    if (!isDrawingRef.current) {
      syncAllStateToCanvas(ctx, numPixel, CANVAS_BASE / numPixel, pixelColorState, circleColorState, textState)
    }
  }, [numPixel, pixelColorState, circleColorState, textState, isDialogModalOpen])

  const startDrawing = useCallback(() => {
    isDrawingRef.current = true
  }, [])

  const endDrawing = useCallback(() => {
    isDrawingRef.current = false
  }, [])

  // 初期化・リサイズ時の処理
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = initializeCanvas(canvas, numPixel)
    if (!ctx) return
    setPixelColorState(Array(numPixel).fill(null).map(() => Array(numPixel).fill(null)))
    setCircleColorState(Array(numPixel).fill(null).map(() => Array(numPixel).fill(null)))
    setTextState([])
    syncAllState(ctx)
  }, [numPixel])

  // 再描画用
  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')
    if (ctx) {
      syncAllState(ctx)
    }
  }, [syncAllState])

  return {
    canvasRef,
    startDrawing,
    endDrawing,
  }
} 