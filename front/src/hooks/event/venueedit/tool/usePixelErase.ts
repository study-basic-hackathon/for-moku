import { useCallback } from 'react'
import { Color } from 'react-color'
import { useCellEditableTool } from '@/hooks/event/venueedit/tool/useCellEditableTool'
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

export const usePixelErase = ({ canvasRef, numPixel, setPixelColorState, pixelColorState, setCircleColorState, circleColorState, textState }: Props) => {
  const updatePixelState = useCallback((x: number, y: number) => {
    const newState = [...pixelColorState]
    newState[y] = [...newState[y]]
    newState[y][x] = null
    setPixelColorState(newState)
    return newState
  }, [pixelColorState])

  return useCellEditableTool({
    canvasRef,
    numPixel,
    pixelColorState,
    circleColorState,
    updatePixelState,
    textState
  })
} 