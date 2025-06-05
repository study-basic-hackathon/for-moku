import { useRef, useEffect, useState, useCallback } from 'react'
import { initializeCanvas, syncAllStateToCanvas } from '@/lib/event/venueedit/canvasControl'
import { VenueEditTool } from '@/types/tool'
import { Color } from 'react-color'
import { useZoom } from '@/hooks/event/venueedit/useZoom'
import { DEFAULT_NUM_PIXEL, CANVAS_BASE } from '@/lib/event/venueedit/constants'
import { useToolSelect } from '@/hooks/event/venueedit/tool/useToolSelect'
import { useTextDialog } from '@/hooks/event/venueedit/dialog/useTextDialog'
import { TextState } from '@/types/event/state'

/**
 * キャンバスの描画を管理するフックのProps
 * @param selectedColor 選択された色
 * @param selectedTool 選択されたツール
 */
interface Props {
  selectedColor: Color
  selectedTool: VenueEditTool
  selectedColorBackGround?: Color
}

/**
 * キャンバスの描画を管理するフック
 * @param selectedColor 選択された色
 * @param selectedTool 選択されたツール
 * @returns キャンバスの参照、キャンバスのサイズ、セルの座標を取得する関数、描画関数
 */
export const useCanvasDraw = ({ 
  selectedColor,
  selectedTool,
  selectedColorBackGround
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
  const [textState, setTextState] = useState<TextState[]>([])

  const syncAllState = useCallback((ctx: CanvasRenderingContext2D) => {
    syncAllStateToCanvas(ctx, numPixel, CANVAS_BASE / numPixel, pixelColorState, circleColorState, textState)
  }, [numPixel, pixelColorState, circleColorState, textState])
  
  const {
    isTextDialogOpen,
    setIsTextDialogOpen,
    currentText,
    setCurrentText,
    textPosition,
    setTextPosition,
    handleTextAdd,
  } = useTextDialog({
    selectedColor,
    selectedColorBackGround,
    textState,
    setTextState,
  })

  // isTextDialogOpenの変更も検知して、StateとCanvasの同期を行う
  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')
    if (ctx) {
      syncAllState(ctx)
    }
  }, [syncAllState, isTextDialogOpen])

  // numPixelの変更が実施されたら、Stateをリセットする
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

  const handleMouseRelieveText = useCallback((startX: number, startY: number, endX: number, endY: number) => {
    setIsTextDialogOpen(true)
    setTextPosition({
      startX,
      startY,
      endX,
      endY
    })
  }, [selectedColor, selectedColorBackGround])

  const { canDraw: toolCanDraw, handleMouseDown, handleMouseMove, handleMouseUp, handleMouseLeave } = useToolSelect({
    selectedTool,
    selectedColor,
    selectedColorBackGround,
    canvasRef,
    numPixel,
    setPixelColorState,
    pixelColorState,
    setCircleColorState,
    circleColorState,
    handleMouseRelieveText,
    textState,
  })

  return { 
    canvasRef, 
    canDraw: toolCanDraw,
    zoom,
    numPixel,
    handleZoomIn,
    handleZoomOut,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    setNumPixel,
    isTextDialogOpen,
    setIsTextDialogOpen,
    currentText,
    setCurrentText,
    textPosition,
    setTextPosition,
    handleTextAdd,
  }
} 