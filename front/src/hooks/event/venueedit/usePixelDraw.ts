import { useCallback, useRef, useState } from 'react'
import { Color } from '@/types/color'
import { drawColoredCell, drawCellGrid, getCellCoordinates } from '@/lib/event/venueedit/canvasControl'
import { CANVAS_BASE } from '@/lib/event/venueedit/constants'

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  numPixel: number
  selectedColor: Color
  setPixelColorState: React.Dispatch<React.SetStateAction<(Color | null)[][]>>
}

export const usePixelDraw = ({ canvasRef, numPixel, selectedColor, setPixelColorState }: Props) => {
  const [isDrawing, setIsDrawing] = useState(false)
  const lastCellRef = useRef<{ x: number; y: number } | null>(null)
  const CELL_SIZE = CANVAS_BASE / numPixel

  const drawPixel = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // セルを色で塗る
    drawColoredCell(ctx, x, y, CELL_SIZE, selectedColor)

    drawCellGrid(ctx, x, y, CELL_SIZE)
  }, [selectedColor, numPixel])

  const updatePixelState = useCallback((x: number, y: number, color: Color) => {
    setPixelColorState(prev => {
      const newState = [...prev]
      newState[y] = [...newState[y]]
      newState[y][x] = color
      return newState
    })
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const coords = getCellCoordinates(e.clientX, e.clientY, canvasRef, CELL_SIZE, numPixel)
    if (!coords) return

    lastCellRef.current = { x: coords.cellX, y: coords.cellY }
    updatePixelState(coords.cellX, coords.cellY, selectedColor)
    drawPixel(coords.cellX, coords.cellY)
  }, [selectedColor, updatePixelState, drawPixel])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const coords = getCellCoordinates(e.clientX, e.clientY, canvasRef, CELL_SIZE, numPixel)
    if (!coords) return

    // 同じセルの場合は描画しない
    if (lastCellRef.current?.x === coords.cellX && lastCellRef.current?.y === coords.cellY) {
      return
    }

    lastCellRef.current = { x: coords.cellX, y: coords.cellY }
    updatePixelState(coords.cellX, coords.cellY, selectedColor)
    drawPixel(coords.cellX, coords.cellY)
  }, [isDrawing, selectedColor, updatePixelState, drawPixel])

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