import { useEffect, useState, useCallback } from 'react'
import { Position, TextState } from '@/types/event/state'
import { Color } from 'react-color'
import { useSelectedColor } from '@/hooks/event/venueedit/submenu/useSelectedColor'

interface TextDialogProps {
  textState: TextState[]
  setTextState: React.Dispatch<React.SetStateAction<TextState[]>>
  isDialogModalOpen: boolean
  setIsDialogModalOpen: (isOpen: boolean) => void
}

export const useTextDialog = ({
  textState,
  setTextState,
  isDialogModalOpen,
  setIsDialogModalOpen,
}: TextDialogProps) => {
  const { selectedColor, selectedColorBackGround } = useSelectedColor()
  const [isTextDialogOpen, setIsTextDialogOpen] = useState(false)
  const [currentText, setCurrentText] = useState('')
  const [textPosition, setTextPosition] = useState<Position>({
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0
  })

  // isTextDialogOpenの変更をisDialogModalOpenに反映
  useEffect(() => {
    setIsDialogModalOpen(isTextDialogOpen)
  }, [isTextDialogOpen, setIsDialogModalOpen])

  // isDialogModalOpenの変更をisTextDialogOpenに反映
  useEffect(() => {
    setIsTextDialogOpen(isDialogModalOpen)
  }, [isDialogModalOpen])

  const handleTextAdd = useCallback(() => {
    const newTextState: TextState[] = [...textState, {
      text: currentText,
      textColor: selectedColor,
      backgroundColor: selectedColorBackGround ?? null,
      borderColor: null,
      orientation: 'horizontal' as const,
      startX: Math.min(textPosition.startX, textPosition.endX),
      startY: Math.min(textPosition.startY, textPosition.endY),
      endX: Math.max(textPosition.startX, textPosition.endX),
      endY: Math.max(textPosition.startY, textPosition.endY)
    }]
    setTextState(newTextState)
    setIsTextDialogOpen(false)
  }, [currentText, selectedColor, selectedColorBackGround, textState, textPosition, setTextState, setIsTextDialogOpen])

  return {
    isTextDialogOpen,
    setIsTextDialogOpen,
    currentText,
    setCurrentText,
    textPosition,
    setTextPosition,
    handleTextAdd,
  }
}
