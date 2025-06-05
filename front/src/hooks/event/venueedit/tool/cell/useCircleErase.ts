import { useCallback } from 'react'
import { Color } from 'react-color'
import { useCellEditableTool } from '@/hooks/event/venueedit/tool/cell/useCellEditableTool'
import { TextState } from '@/types/event/state'

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  numPixel: number
  setPixelColorState: React.Dispatch<React.SetStateAction<(Color | null)[][]>>
  pixelColorState: (Color | null)[][]
  setCircleColorState: React.Dispatch<React.SetStateAction<(Color | null)[][]>>
  circleColorState: (Color | null)[][]
  textState: TextState[]
}

export const useCircleErase = ({ canvasRef, numPixel, selectedColor, setCircleColorState, pixelColorState, circleColorState, textState }: Props) => {
  const updateCircleState = useCallback((x: number, y: number) => {
    const newState = [...circleColorState]
    newState[y] = [...newState[y]]
    newState[y][x] = null
    setCircleColorState(newState)
    return newState
  }, [circleColorState])

  return useCellEditableTool({
    canvasRef,
    numPixel,
    pixelColorState,
    circleColorState,
    updateCircleState,
    textState
  })
} 