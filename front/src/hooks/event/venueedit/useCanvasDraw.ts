
import { Color } from 'react-color';
import { useZoom } from '@/hooks/event/venueedit/useZoom';
import { useToolSelect } from '@/hooks/event/venueedit/tool/useToolSelect';
import { useDrawingState } from '@/hooks/event/venueedit/useDrawingState';
import { useImageAction } from './image/useImageAction';
import { EventVenueEditViewModel } from '@/types/event/viewmodel';
import { useInitialState } from '@/hooks/event/venueedit/useInitialState';

/**
 * キャンバスの描画を管理するフックのProps
 * @param selectedColor 選択された色
 */
interface Props {
  selectedColor: Color;
  selectedColorBackGround?: Color;
  eventVenueEditViewModel: EventVenueEditViewModel;
}

/**
 * キャンバスの描画を管理するフック
 * @param selectedColor 選択された色
 * @returns キャンバスの参照、キャンバスのサイズ、セルの座標を取得する関数、描画関数
 */
export const useCanvasDraw = ({ 
  selectedColor,
  selectedColorBackGround,
  eventVenueEditViewModel
}: Props) => {

  const {
    numPixel,
    setNumPixel,
    pixelColorState,
    setPixelColorState,
    circleColorState,
    setCircleColorState,
    textState,
    setTextState,
    isDialogModalOpen,
    setIsDialogModalOpen
  } = useInitialState({eventVenueEditViewModel})

  const {zoom, handleZoomIn, handleZoomOut} = useZoom()

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
    textState,
    eventId: eventVenueEditViewModel.eventId
  })

  const {
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