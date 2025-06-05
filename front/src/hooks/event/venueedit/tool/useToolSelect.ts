import { useCallback } from 'react'
import { DRAWABLE_TOOLS, DrawableTool, VenueEditTool } from '@/types/tool'
import { usePixelDraw } from '@/hooks/event/venueedit/tool/usePixelDraw'
import { usePixelErase } from '@/hooks/event/venueedit/tool/usePixelErase'
import { useCircleDraw } from '@/hooks/event/venueedit/tool/useCircleDraw'
import { Color } from '@/types/color'
import { useCircleErase } from '@/hooks/event/venueedit/tool/useCircleErase'

interface Props {
  selectedTool: VenueEditTool
  selectedColor: Color
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  numPixel: number
  pixelColorState: (Color | null)[][]
  setPixelColorState: React.Dispatch<React.SetStateAction<(Color | null)[][]>>
  setCircleColorState: React.Dispatch<React.SetStateAction<(Color | null)[][]>>
  circleColorState: (Color | null)[][]
}

type ToolHandlers = {
  handleMouseDown: (e: React.MouseEvent<HTMLCanvasElement>) => void
  handleMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => void
  handleMouseUp: () => void
  handleMouseLeave: () => void
}

export const useToolSelect = ({ 
  selectedTool,
  selectedColor,
  canvasRef,
  numPixel,
  pixelColorState,
  setPixelColorState,
  setCircleColorState,
  circleColorState
}: Props) => {
  const canDraw = useCallback(() => {
    return DRAWABLE_TOOLS.includes(selectedTool as DrawableTool)
  }, [selectedTool])

  const pixelDraw = usePixelDraw({
    canvasRef,
    numPixel,
    selectedColor,
    setPixelColorState,
    pixelColorState,
    setCircleColorState,
    circleColorState
  })

  const pixelErase = usePixelErase({
    canvasRef,
    numPixel,
    setPixelColorState,
    pixelColorState,
    setCircleColorState,
    circleColorState
  })

  const circleDraw = useCircleDraw({
    canvasRef,
    numPixel,
    selectedColor,
    setPixelColorState,
    pixelColorState,
    setCircleColorState,
    circleColorState
  })

  const circleErase = useCircleErase({
    canvasRef,
    numPixel,
    selectedColor,
    setPixelColorState,
    pixelColorState,
    setCircleColorState,
    circleColorState
  })

  const toolHandlers: Partial<Record<VenueEditTool, ToolHandlers>> = {
    'ピクセル塗りつぶし': pixelDraw,
    'ピクセル消去': pixelErase,
    '丸オブジェクト配置': circleDraw,
    '丸オブジェクト消去': circleErase,
  }

  const createHandler = (eventName: keyof ToolHandlers) => {
    return (e?: React.MouseEvent<HTMLCanvasElement>) => {
      const handler = toolHandlers[selectedTool]
      if (handler) {
        if (eventName === 'handleMouseDown' || eventName === 'handleMouseMove') {
          if (!e) return
          handler[eventName](e)
        } else {
          handler[eventName]()
        }
      }
    }
  }

  const handleMouseDown = createHandler('handleMouseDown')
  const handleMouseMove = createHandler('handleMouseMove')
  const handleMouseUp = createHandler('handleMouseUp')
  const handleMouseLeave = createHandler('handleMouseLeave')

  return {
    canDraw,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave
  }
} 