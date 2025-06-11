import { useState } from 'react'
import { VenueEditTool } from '@/types/tool'
import { Color } from 'react-color'
import { useZoom } from '@/hooks/event/venueedit/useZoom'
import { DEFAULT_NUM_PIXEL } from '@/lib/event/venueedit/constants'
import { useToolSelect } from '@/hooks/event/venueedit/tool/useToolSelect'
import { TextState } from '@/types/event/state'
import { useDrawingState } from '@/hooks/event/venueedit/useDrawingState'
import { useImageAction } from './image/useImageAction'

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
  // ピクセルの定義
  const [numPixel, setNumPixel] = useState(DEFAULT_NUM_PIXEL)
  const {zoom, handleZoomIn, handleZoomOut} = useZoom()

  const [pixelColorState, setPixelColorState] = useState<(Color | null)[][]>(
    Array(numPixel).fill(null).map(() => Array(numPixel).fill(null))
  )
  const [circleColorState, setCircleColorState] = useState<(Color | null)[][]>(
    Array(numPixel).fill(null).map(() => Array(numPixel).fill(null))
  )
  const [textState, setTextState] = useState<TextState[]>([])
  const [isDialogModalOpen, setIsDialogModalOpen] = useState(false)

  const { canvasRef, startDrawing, endDrawing } = useDrawingState({
    numPixel,
    pixelColorState,
    circleColorState,
    textState,
    setPixelColorState,
    setCircleColorState,
    setTextState,
    isDialogModalOpen
  })

  const {saveImageAction, isPendingForSave} = useImageAction({
    numPixel,
    pixelColorState,
    circleColorState,
    textState
  })

  const { canDraw: toolCanDraw,
      handleMouseDown,
      handleMouseMove,
      handleMouseUp,
      handleMouseLeave,
      isTextDialogOpen, 
      setIsTextDialogOpen, 
      currentText, 
      setCurrentText, 
      textPosition, 
      setTextPosition, 
      handleTextAdd } = useToolSelect({
    selectedTool,
    selectedColor,
    selectedColorBackGround,
    canvasRef,
    numPixel,
    setPixelColorState,
    pixelColorState,
    setCircleColorState,
    circleColorState,
    textState,
    startDrawing,
    endDrawing,
    setTextState,
    isDialogModalOpen,
    setIsDialogModalOpen
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
    saveImageAction,
    isPendingForSave
  }
} 