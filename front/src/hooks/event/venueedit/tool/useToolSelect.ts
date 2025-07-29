import { VenueEditTool } from '@/types/tool'
import { usePixelDraw } from '@/hooks/event/venueedit/tool/cell/usePixelDraw'
import { usePixelErase } from '@/hooks/event/venueedit/tool/cell/usePixelErase'
import { useCircleDraw } from '@/hooks/event/venueedit/tool/cell/useCircleDraw'
import { useTextErase } from '@/hooks/event/venueedit/tool/select/useTextErase'
import { Color } from 'react-color'
import { useCircleErase } from '@/hooks/event/venueedit/tool/cell/useCircleErase'
import { useTextAdd } from '@/hooks/event/venueedit/tool/select/useTextAdd'
import { TextState } from '@/types/event/state'
import { useSubToolSelection } from '@/hooks/event/venueedit/useSubToolSelection'

interface Props {
  selectedColor: Color
  selectedColorBackGround?: Color
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  numPixel: number
  setPixelColorState: React.Dispatch<React.SetStateAction<(Color | null)[][]>>
  pixelColorState: (Color | null)[][]
  setCircleColorState: React.Dispatch<React.SetStateAction<(Color | null)[][]>>
  circleColorState: (Color | null)[][]
  textState: TextState[]
  startDrawing: () => void
  endDrawing: () => void
  setTextState: React.Dispatch<React.SetStateAction<TextState[]>>
  isDialogModalOpen: boolean
  setIsDialogModalOpen: (isOpen: boolean) => void
}

type ToolHandlers = {
  handleMouseDown: (e: React.MouseEvent<HTMLCanvasElement>) => void
  handleMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => void
  handleMouseUp: (e?: React.MouseEvent<HTMLCanvasElement>) => void
  handleMouseLeave: () => void
}

export const useToolSelect = ({
  selectedColor,
  selectedColorBackGround,
  canvasRef,
  numPixel,
  setPixelColorState,
  pixelColorState,
  setCircleColorState,
  circleColorState,
  setTextState,
  isDialogModalOpen,
  setIsDialogModalOpen,
  textState,
  startDrawing,
  endDrawing,
}: Props) => {
  const { selectedTool } = useSubToolSelection()

  const pixelDraw = usePixelDraw({
    canvasRef,
    numPixel,
    selectedColor,
    setPixelColorState,
    pixelColorState,
    setCircleColorState,
    circleColorState,
    textState
  })

  const pixelErase = usePixelErase({
    canvasRef,
    numPixel,
    setPixelColorState,
    pixelColorState,
    setCircleColorState,
    circleColorState,
    textState
  })

  const circleDraw = useCircleDraw({
    canvasRef,
    numPixel,
    selectedColor,
    setPixelColorState,
    pixelColorState,
    setCircleColorState,
    circleColorState,
    textState
  })

  const circleErase = useCircleErase({
    canvasRef,
    numPixel,
    setPixelColorState,
    pixelColorState,
    setCircleColorState,
    circleColorState,
    textState
  })

  const textAdd = useTextAdd({
    canvasRef,
    numPixel,
    draggingColor: '#FFFF00',
    selectedColor,
    selectedColorBackGround,
    textState,
    setTextState,
    isDialogModalOpen,
    setIsDialogModalOpen
  })

  const textErase = useTextErase({
    canvasRef,
    numPixel,
    draggingColor: '#00FFFF',
    textState,
    setTextState
  })

  const toolHandlers: Partial<Record<VenueEditTool, ToolHandlers>> = {
    'ピクセル塗りつぶし': pixelDraw,
    'ピクセル消去': pixelErase,
    '丸オブジェクト配置': circleDraw,
    '丸オブジェクト消去': circleErase,
    'テキストボックス追加': textAdd,
    'テキストボックス消去': textErase,
  }

  const createHandler = (eventName: keyof ToolHandlers) => {
    return (e?: React.MouseEvent<HTMLCanvasElement>) => {
      const handler = toolHandlers[selectedTool]
      if (handler) {
        if (eventName === 'handleMouseDown') {
          if (!e) return
          startDrawing()
          handler[eventName](e)
        } else if (eventName === 'handleMouseUp' || eventName === 'handleMouseLeave') {
          endDrawing()
          handler[eventName]()
        } else if (eventName === 'handleMouseMove') {
          if (!e) return
          handler[eventName](e)
        }
      }
    }
  }

  const handleMouseDown = createHandler('handleMouseDown')
  const handleMouseMove = createHandler('handleMouseMove')
  const handleMouseUp = createHandler('handleMouseUp')
  const handleMouseLeave = createHandler('handleMouseLeave')

  return { 
    handleMouseDown, 
    handleMouseMove, 
    handleMouseUp, 
    handleMouseLeave, 
    isTextDialogOpen: textAdd.isTextDialogOpen, 
    setIsTextDialogOpen: textAdd.setIsTextDialogOpen, 
    currentText: textAdd.currentText, 
    setCurrentText: textAdd.setCurrentText, 
    textPosition: textAdd.textPosition, 
    setTextPosition: textAdd.setTextPosition, 
    handleTextAdd: textAdd.handleTextAdd, 
  }
} 