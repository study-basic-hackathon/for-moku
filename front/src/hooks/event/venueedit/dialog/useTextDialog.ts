import { useState } from 'react'
import { Position, TextState } from '@/types/event/state'
import { Color } from '@/types/color'

interface TextDialogProps {
  textState: TextState[]
  setTextState: React.Dispatch<React.SetStateAction<TextState[]>>
  selectedColor: Color
  selectedColorBackGround?: Color
}

export const useTextDialog = ({
  textState,
  setTextState,
  selectedColor,
  selectedColorBackGround,
}: TextDialogProps) => {
  const [isTextDialogOpen, setIsTextDialogOpen] = useState(false)
  const [currentText, setCurrentText] = useState('')
  const [textPosition, setTextPosition] = useState<Position>({
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0
  })

  const handleTextAdd = () => {
    console.log("selectedColor", selectedColor)
    console.log("selectedColorBackGround", selectedColorBackGround)
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
  }

  return {
    isTextDialogOpen,
    setIsTextDialogOpen,
    currentText,
    setCurrentText,
    textPosition,
    setTextPosition,
    handleTextAdd,
    selectedColor,
    selectedColorBackGround,
  }
}