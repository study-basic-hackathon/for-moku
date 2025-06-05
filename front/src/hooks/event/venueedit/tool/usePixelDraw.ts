import { useCallback } from 'react'
import { Color } from '@/types/color'
import { useCellEditableTool } from '@/hooks/event/venueedit/tool/useCellEditableTool'

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  numPixel: number
  selectedColor: Color
  setPixelColorState: React.Dispatch<React.SetStateAction<(Color | null)[][]>>
  pixelColorState: (Color | null)[][]
}

export const usePixelDraw = ({ canvasRef, numPixel, selectedColor, setPixelColorState, pixelColorState }: Props) => {
  const updatePixelState = useCallback((x: number, y: number) => {
    const newState = [...pixelColorState]
    newState[y] = [...newState[y]]
    newState[y][x] = selectedColor
    setPixelColorState(newState)
    return newState
  }, [selectedColor, pixelColorState])

  return useCellEditableTool({
    canvasRef,
    numPixel,
    pixelColorState,
    updatePixelState
  })
} 