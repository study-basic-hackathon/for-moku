import { useDragging } from '@/hooks/event/venueedit/tool/select/useDragging'
import { useCallback } from 'react'
import { useTextDialog } from '@/hooks/event/venueedit/tool/select/dialog/useTextDialog'
import { Color } from 'react-color'
import { TextState } from '@/types/event/state'

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  numPixel: number
  draggingColor: string
  selectedColor: Color
  selectedColorBackGround?: Color
  textState: TextState[]
  setTextState: React.Dispatch<React.SetStateAction<TextState[]>>
  isDialogModalOpen: boolean
  setIsDialogModalOpen: (isOpen: boolean) => void
}

export const useTextAdd = ({ 
  canvasRef, 
  numPixel, 
  draggingColor, 
  selectedColor,
  selectedColorBackGround,
  textState,
  setTextState,
  isDialogModalOpen,
  setIsDialogModalOpen
}: Props) => {

  // テキストダイアログに関するフック
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
    isDialogModalOpen,
    setIsDialogModalOpen
  })

  const handleMouseRelieveText = useCallback((startX: number, startY: number, endX: number, endY: number) => {
    setIsTextDialogOpen(true)
    setTextPosition({
      startX,
      startY,
      endX,
      endY
    })
  }, [setIsTextDialogOpen, setTextPosition])

  return {
    isTextDialogOpen,
    setIsTextDialogOpen,
    currentText,
    setCurrentText,
    textPosition,
    setTextPosition,
    handleTextAdd,
    ...useDragging({
      canvasRef,
      numPixel,
      draggingColor,
      handleMouseRelieve: handleMouseRelieveText
    })
  }
} 