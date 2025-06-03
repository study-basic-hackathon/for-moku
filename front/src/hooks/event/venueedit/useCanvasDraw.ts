import { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import { drawPatternCanvas, drawGrid } from '@/lib/event/venueedit/pattern'
import { DRAWABLE_TOOLS, DrawableTool, VenueEditTool } from '@/types/tool'
import { Color, color } from '@/types/color'
import { useZoom } from '@/hooks/event/venueedit/useZoom'
import { CANVAS_BASE, DEFAULT_NUM_PIXEL } from '@/lib/event/venueedit/constants'

/**
 * キャンバスの描画を管理するフックのProps
 * @param selectedColor 選択された色
 * @param selectedTool 選択されたツール
 */
interface Props {
  selectedColor?: Color
  selectedTool?: VenueEditTool
}


/**
 * キャンバスの描画を管理するフック
 * @param selectedColor 選択された色
 * @param selectedTool 選択されたツール
 * @returns キャンバスの参照、キャンバスのサイズ、セルの座標を取得する関数、描画関数
 */
export const useCanvasDraw = ({ 
  selectedColor = color('#000000'),
  selectedTool = 'ピクセル塗りつぶし'
}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [numPixel, setNumPixel] = useState(DEFAULT_NUM_PIXEL)
  const CELL_SIZE = useMemo(() => CANVAS_BASE / numPixel, [numPixel])
  const {zoom, handleZoomIn, handleZoomOut} = useZoom()
  const [pixelColorState, setPixelColorState] = useState<(Color | null)[][]>(
    Array(numPixel).fill(null).map(() => Array(numPixel).fill(null))
  )
  
  const [isDrawing, setIsDrawing] = useState(false)
  const lastCellRef = useRef<{ x: number; y: number } | null>(null)

  //console.log(pixelColorState)

  const canDraw = useCallback(() => {
    return DRAWABLE_TOOLS.includes(selectedTool as DrawableTool)
  }, [selectedTool])

  const getCellCoordinates = useCallback((x: number, y: number) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return null

    const scaleX = CANVAS_BASE / rect.width
    const scaleY = CANVAS_BASE / rect.height

    const cellX = Math.floor((x - rect.left) * scaleX / CELL_SIZE)
    const cellY = Math.floor((y - rect.top) * scaleY / CELL_SIZE)

    if (cellX < 0 || cellX >= numPixel || cellY < 0 || cellY >= numPixel) {
      return null
    }

    return { cellX, cellY }
  }, [numPixel, canvasRef, CELL_SIZE]) // CELL_SIZEを依存配列に含めることで、古いクロージャを防ぐ

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // キャンバスのサイズを設定
    canvas.width = CANVAS_BASE
    canvas.height = CANVAS_BASE

    // キャンバスをクリア
    ctx.clearRect(0, 0, CANVAS_BASE, CANVAS_BASE)

    // パターンの描画
    drawPatternCanvas(ctx, numPixel, CELL_SIZE)

    // グリッドを描画
    drawGrid(ctx, numPixel, CELL_SIZE)
  }, [numPixel])

  useEffect(() => {
    drawCanvas();
    setPixelColorState(Array(numPixel).fill(null).map(() => Array(numPixel).fill(null)))
  }, [numPixel])

  const drawPixel = useCallback((x: number, y: number, color: Color | null) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // パターンまたは色を描画
    if (color === null) {
      drawPatternCanvas(ctx, 1, CELL_SIZE)
    } else {
      ctx.fillStyle = color.toString()
      ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
    }

    // グリッドを描画
    ctx.strokeStyle = '#777777'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(x * CELL_SIZE, y * CELL_SIZE)
    ctx.lineTo((x + 1) * CELL_SIZE, y * CELL_SIZE)
    ctx.lineTo((x + 1) * CELL_SIZE, (y + 1) * CELL_SIZE)
    ctx.lineTo(x * CELL_SIZE, (y + 1) * CELL_SIZE)
    ctx.closePath()
    ctx.stroke()
  }, [numPixel])

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canDraw()) return
    setIsDrawing(true)
    const coords = getCellCoordinates(e.clientX, e.clientY)
    if (!coords) return

    lastCellRef.current = { x: coords.cellX, y: coords.cellY }
    setPixelColorState(prev => {
      const newState = [...prev]
      newState[coords.cellY] = [...newState[coords.cellY]]
      newState[coords.cellY][coords.cellX] = selectedColor
      drawPixel(coords.cellX, coords.cellY, selectedColor)
      return newState
    })
  }, [canDraw, selectedColor, drawPixel])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canDraw()) return
    const coords = getCellCoordinates(e.clientX, e.clientY)
    if (!coords) return

    // 同じセルの場合は描画しない
    if (lastCellRef.current?.x === coords.cellX && lastCellRef.current?.y === coords.cellY) {
      return
    }

    lastCellRef.current = { x: coords.cellX, y: coords.cellY }
    setPixelColorState(prev => {
      const newState = [...prev]
      newState[coords.cellY] = [...newState[coords.cellY]]
      newState[coords.cellY][coords.cellX] = selectedColor
      drawPixel(coords.cellX, coords.cellY, selectedColor)
      return newState
    })
  }, [isDrawing, canDraw, selectedColor, drawPixel])

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
    canvasRef, 
    canDraw,
    zoom,
    numPixel,
    handleZoomIn,
    handleZoomOut,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    setNumPixel
  }
} 