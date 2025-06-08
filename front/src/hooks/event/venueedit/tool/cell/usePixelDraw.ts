import { useCallback } from 'react'
import { Color } from 'react-color'
import { useCellEditableTool } from '@/hooks/event/venueedit/tool/cell/useCellEditableTool'
import { TextState } from '@/types/event/state'

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  numPixel: number
  selectedColor: Color
  setPixelColorState: React.Dispatch<React.SetStateAction<(Color | null)[][]>>
  pixelColorState: (Color | null)[][]
  setCircleColorState: React.Dispatch<React.SetStateAction<(Color | null)[][]>>
  circleColorState: (Color | null)[][]
  textState: TextState[]
}

export const usePixelDraw = ({ canvasRef, numPixel, selectedColor, setPixelColorState, pixelColorState, circleColorState, textState }: Props) => {
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
    circleColorState,
    updatePixelState,
    textState
  })
} 