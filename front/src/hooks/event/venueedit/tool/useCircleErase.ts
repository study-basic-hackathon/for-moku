import { useCallback } from 'react'
import { Color } from '@/types/color'
import { useCellEditableTool } from '@/hooks/event/venueedit/tool/useCellEditableTool'

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  numPixel: number
  selectedColor: Color
  setPixelColorState: React.Dispatch<React.SetStateAction<(Color | null)[][]>>
  pixelColorState: (Color | null)[][]
  setCircleColorState: React.Dispatch<React.SetStateAction<(Color | null)[][]>>
  circleColorState: (Color | null)[][]
}

export const useCircleErase = ({ canvasRef, numPixel, selectedColor, setCircleColorState, pixelColorState, circleColorState }: Props) => {
  const updateCircleState = useCallback((x: number, y: number) => {
    const newState = [...circleColorState]
    newState[y] = [...newState[y]]
    newState[y][x] = null
    setCircleColorState(newState)
    return newState
  }, [selectedColor, circleColorState])

  return useCellEditableTool({
    canvasRef,
    numPixel,
    pixelColorState,
    circleColorState,
    updateCircleState
  })
} 