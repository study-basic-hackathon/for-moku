import { useCallback } from 'react'
import { Color } from 'react-color'
import { useCellEditableTool } from '@/hooks/event/venueedit/tool/cell/useCellEditableTool'
import { TextState } from '@/types/event/state'
import { useSelectedColor } from '@/hooks/event/venueedit/submenu/useSelectedColor'

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  numPixel: number
  setPixelColorState: React.Dispatch<React.SetStateAction<(Color | null)[][]>>
  pixelColorState: (Color | null)[][]
  setCircleColorState: React.Dispatch<React.SetStateAction<(Color | null)[][]>>
  circleColorState: (Color | null)[][]    
  textState: TextState[]
}

export const useCircleDraw = ({ canvasRef, numPixel, setCircleColorState, pixelColorState, circleColorState, textState }: Props) => {
  const { selectedColor } = useSelectedColor()
  const updateCircleState = useCallback((x: number, y: number) => {
    const newState = [...circleColorState]
    newState[y] = [...newState[y]]
    newState[y][x] = selectedColor
    setCircleColorState(newState)
    return newState
  }, [selectedColor, circleColorState])

  return useCellEditableTool({
    canvasRef,
    numPixel,
    pixelColorState,
    circleColorState,
    updateCircleState,
    textState
  })
} 