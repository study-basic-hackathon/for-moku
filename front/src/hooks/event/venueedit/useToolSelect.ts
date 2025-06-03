import { useCallback } from 'react'
import { DRAWABLE_TOOLS, DrawableTool, VenueEditTool } from '@/types/tool'
import { usePixelDraw } from './usePixelDraw'
import { usePixelErase } from './usePixelErase'
import { Color } from '@/types/color'

interface Props {
  selectedTool: VenueEditTool
  selectedColor: Color
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  numPixel: number
  setPixelColorState: React.Dispatch<React.SetStateAction<(Color | null)[][]>>
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
  setPixelColorState
}: Props) => {
  const canDraw = useCallback(() => {
    return DRAWABLE_TOOLS.includes(selectedTool as DrawableTool)
  }, [selectedTool])

  const pixelDraw = usePixelDraw({
    canvasRef,
    numPixel,
    selectedColor,
    setPixelColorState
  })

  const pixelErase = usePixelErase({
    canvasRef,
    numPixel,
    setPixelColorState
  })


  const toolHandlers: Partial<Record<VenueEditTool, ToolHandlers>> = {
    'ピクセル塗りつぶし': pixelDraw,
    'ピクセル消去': pixelErase
  }

  const createHandler = (eventName: keyof ToolHandlers) => {
    return (e?: React.MouseEvent<HTMLCanvasElement>) => {
      if (!canDraw()) return
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