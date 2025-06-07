import { getCellCoordinates, syncDraggingStateToCanvas } from "@/lib/event/venueedit/canvasControl"
import { CANVAS_BASE } from "@/lib/event/venueedit/constants"
import { useCallback, useRef, useState } from "react"

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  numPixel: number
  color: string
  handleMouseRelieve: (startX: number, startY: number, endX: number, endY: number) => void
}

export const useDragging = ({ canvasRef, numPixel, color, handleMouseRelieve }: Props) => {

  const [isDrawing, setIsDrawing] = useState(false)
  const [startX, setStartX] = useState<number | null>(null)
  const [startY, setStartY] = useState<number | null>(null)
  const [endX, setEndX] = useState<number | null>(null)
  const [endY, setEndY] = useState<number | null>(null)

  const lastCellRef = useRef<{ x: number; y: number } | null>(null)
  const CELL_SIZE = CANVAS_BASE / numPixel

  const syncToCanvas = useCallback((ctx: CanvasRenderingContext2D, startX: number | null, startY: number | null, endX: number | null, endY: number | null) => {
    if (startX === null || startY === null || endX === null || endY === null) return
    syncDraggingStateToCanvas(ctx, startX, startY, endX, endY, CELL_SIZE, color)
  }, [CELL_SIZE, color])

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)

    const coords = getCellCoordinates(e.clientX, e.clientY, canvasRef, CELL_SIZE, numPixel)
    if (!coords) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    lastCellRef.current = { x: coords.cellX, y: coords.cellY }
    setStartX(coords.cellX)
    setStartY(coords.cellY)
    setEndX(coords.cellX)
    setEndY(coords.cellY)
    syncToCanvas(ctx, coords.cellX, coords.cellY, coords.cellX, coords.cellY)
  }, [canvasRef, numPixel])

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
    setEndX(coords.cellX)
    setEndY(coords.cellY)
    syncToCanvas(ctx, startX, startY, coords.cellX, coords.cellY)
  }, [canvasRef, numPixel, isDrawing, startX, startY, endX, endY])

  const handleMouseUp = useCallback((e?: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(false)
    if (endX === null || endY === null) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    syncToCanvas(ctx, startX, startY, endX, endY)

    if (startX !== null && startY !== null) {
      handleMouseRelieve(startX, startY, endX, endY)
    }
  }, [canvasRef, startX, startY, endX, endY, handleMouseRelieve])

  const handleMouseLeave = useCallback((e?: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    setIsDrawing(false)
    if (endX === null || endY === null) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    syncToCanvas(ctx, startX, startY, endX, endY)

    if (startX !== null && startY !== null) {
      handleMouseRelieve(startX, startY, endX, endY)
    }
  }, [canvasRef, startX, startY, endX, endY, handleMouseRelieve, isDrawing])

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave
  }

}