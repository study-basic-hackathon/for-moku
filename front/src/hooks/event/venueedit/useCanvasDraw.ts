import { useRef, useEffect, useState } from 'react'
import { initializeCanvas } from '@/lib/event/venueedit/canvasControl'
import { VenueEditTool } from '@/types/tool'
import { Color, color } from '@/types/color'
import { useZoom } from '@/hooks/event/venueedit/useZoom'
import { DEFAULT_NUM_PIXEL } from '@/lib/event/venueedit/constants'
import { useToolSelect } from '@/hooks/event/venueedit/tool/useToolSelect'

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
  const {zoom, handleZoomIn, handleZoomOut} = useZoom()
  const [pixelColorState, setPixelColorState] = useState<(Color | null)[][]>(
    Array(numPixel).fill(null).map(() => Array(numPixel).fill(null))
  )
  const [circleColorState, setCircleColorState] = useState<(Color | null)[][]>(
    Array(numPixel).fill(null).map(() => Array(numPixel).fill(null))
  )
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = initializeCanvas(canvas, numPixel, pixelColorState)
    if (!ctx) return

    setPixelColorState(Array(numPixel).fill(null).map(() => Array(numPixel).fill(null)))
    setCircleColorState(Array(numPixel).fill(null).map(() => Array(numPixel).fill(null)))
  }, [numPixel])

  const { canDraw, handleMouseDown, handleMouseMove, handleMouseUp, handleMouseLeave } = useToolSelect({
    selectedTool,
    selectedColor,
    canvasRef,
    numPixel,
    setPixelColorState,
    pixelColorState,
    setCircleColorState,
    circleColorState
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