import { useCallback, useRef, useState } from 'react'
import { getCellCoordinates, drawPatternCell, drawCellGridThin } from '@/lib/event/venueedit/canvasControl'
import { CANVAS_BASE } from '@/lib/event/venueedit/constants'
import { Color } from '@/types/color'

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  numPixel: number
  setPixelColorState: React.Dispatch<React.SetStateAction<(Color | null)[][]>>
}

export const usePixelErase = ({ canvasRef, numPixel, setPixelColorState }: Props) => {
  const [isDrawing, setIsDrawing] = useState(false)
  const lastCellRef = useRef<{ x: number; y: number } | null>(null)
  const CELL_SIZE = CANVAS_BASE / numPixel

  const erasePixel = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // セルをパターンで塗る
    drawPatternCell(ctx, x, y, CELL_SIZE)

    drawCellGridThin(ctx, x, y, CELL_SIZE)
  }, [numPixel])

  const updatePixelState = useCallback((x: number, y: number) => {
    setPixelColorState(prev => {
      const newState = [...prev]
      newState[y] = [...newState[y]]
      newState[y][x] = null
      return newState
    })
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const coords = getCellCoordinates(e.clientX, e.clientY, canvasRef, CELL_SIZE, numPixel)
    if (!coords) return

    lastCellRef.current = { x: coords.cellX, y: coords.cellY }
    updatePixelState(coords.cellX, coords.cellY)
    erasePixel(coords.cellX, coords.cellY)
  }, [updatePixelState, erasePixel])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const coords = getCellCoordinates(e.clientX, e.clientY, canvasRef, CELL_SIZE, numPixel)
    if (!coords) return

    // 同じセルの場合は描画しない
    if (lastCellRef.current?.x === coords.cellX && lastCellRef.current?.y === coords.cellY) {
      return
    }

    lastCellRef.current = { x: coords.cellX, y: coords.cellY }
    updatePixelState(coords.cellX, coords.cellY)
    erasePixel(coords.cellX, coords.cellY)
  }, [isDrawing, updatePixelState, erasePixel])

  const handleMouseUp = useCallback(() => {
    if (!isDrawing) return
    setIsDrawing(false)
    lastCellRef.current = null
  }, [isDrawing])

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