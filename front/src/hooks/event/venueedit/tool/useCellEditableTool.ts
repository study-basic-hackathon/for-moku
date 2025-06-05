import { useCallback, useRef, useState } from 'react'
import { Color } from '@/types/color'
import { getCellCoordinates, syncPixelStateToCanvas } from '@/lib/event/venueedit/canvasControl'
import { CANVAS_BASE } from '@/lib/event/venueedit/constants'

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  numPixel: number
  pixelColorState: (Color | null)[][]
  circleColorState: (Color | null)[][]
  updatePixelState?: (x: number, y: number) => (Color | null)[][]
  updateCircleState?: (x: number, y: number) => (Color | null)[][]
}

/**
 * セルの上に何かが描画されるツールのフック
 * @param canvasRef キャンバスのref
 * @param numPixel ピクセル数
 * @param pixelColorState ピクセルの色状態
 * @param updatePixelState ピクセルの色状態を更新する関数
 * @returns マウスダウン、マウスムーブ、マウスアップ、マウスリーブのハンドラー
 */
export const useCellEditableTool = ({ 
  canvasRef, 
  numPixel, 
  pixelColorState,
  circleColorState,
  updatePixelState,
  updateCircleState
}: Props) => {
  const [isDrawing, setIsDrawing] = useState(false)
  const lastCellRef = useRef<{ x: number; y: number } | null>(null)
  const CELL_SIZE = CANVAS_BASE / numPixel

  const syncToCanvas = useCallback((x: number, y: number, ctx: CanvasRenderingContext2D, pixelState: (Color | null)[][], circleState: (Color | null)[][]) => {
    syncPixelStateToCanvas(ctx, x, y, CELL_SIZE, pixelState, circleState)
  }, [CELL_SIZE])

  /**
   * マウスダウン（マウスボタンを押したとき）
   */
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const coords = getCellCoordinates(e.clientX, e.clientY, canvasRef, CELL_SIZE, numPixel)
    if (!coords) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    lastCellRef.current = { x: coords.cellX, y: coords.cellY }
    const newPixelColorState = updatePixelState ? updatePixelState(coords.cellX, coords.cellY) : pixelColorState
    const newCircleColorState = updateCircleState ? updateCircleState(coords.cellX, coords.cellY) : circleColorState
    syncToCanvas(coords.cellX, coords.cellY, ctx, newPixelColorState, newCircleColorState)

  }, [pixelColorState, updatePixelState, circleColorState, updateCircleState])

  /**
   * マウスを動かしている時
   */
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const coords = getCellCoordinates(e.clientX, e.clientY, canvasRef, CELL_SIZE, numPixel)
    if (!coords) return

    // 同じセルの場合は描画しない
    if (lastCellRef.current?.x === coords.cellX && lastCellRef.current?.y === coords.cellY) {
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    lastCellRef.current = { x: coords.cellX, y: coords.cellY }
    const newPixelColorState = updatePixelState ? updatePixelState(coords.cellX, coords.cellY) : pixelColorState
    const newCircleColorState = updateCircleState ? updateCircleState(coords.cellX, coords.cellY) : circleColorState
    syncToCanvas(coords.cellX, coords.cellY, ctx, newPixelColorState, newCircleColorState)
  }, [isDrawing, pixelColorState, updatePixelState, circleColorState, updateCircleState])

  /**
   * マウスアップ（マウスボタンを離したとき）
   */
  const handleMouseUp = useCallback(() => {
    if (!isDrawing) return
    setIsDrawing(false)
    lastCellRef.current = null
  }, [isDrawing])

  /**
   * マウスがキャンバスから離れたとき
   */
  const handleMouseLeave = useCallback(() => {
    if (!isDrawing) return
    setIsDrawing(false)
    lastCellRef.current = null
  }, [isDrawing])

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave
  }
} 