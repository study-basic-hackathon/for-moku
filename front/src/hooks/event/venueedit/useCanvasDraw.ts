import { useRef, useEffect, useState, useMemo } from 'react'
import { drawPatternCanvas, drawAllGrid } from '@/lib/event/venueedit/canvasControl'
import { VenueEditTool } from '@/types/tool'
import { Color, color } from '@/types/color'
import { useZoom } from '@/hooks/event/venueedit/useZoom'
import { CANVAS_BASE, DEFAULT_NUM_PIXEL } from '@/lib/event/venueedit/constants'
import { useToolSelect } from '@/hooks/event/venueedit/useToolSelect'

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

  useEffect(() => {
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
    drawPatternCanvas(ctx)

    // グリッドを描画
    drawAllGrid(ctx, numPixel, CELL_SIZE)

    setPixelColorState(Array(numPixel).fill(null).map(() => Array(numPixel).fill(null)))
  }, [numPixel])

  const { canDraw, handleMouseDown, handleMouseMove, handleMouseUp, handleMouseLeave } = useToolSelect({
    selectedTool,
    selectedColor,
    canvasRef,
    numPixel,
    setPixelColorState
  })

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