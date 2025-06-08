import { useDragging } from '@/hooks/event/venueedit/tool/select/useDragging'
import { useCallback } from 'react'
import { TextState } from '@/types/event/state'

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  numPixel: number
  draggingColor: string
  textState: TextState[]
  setTextState: React.Dispatch<React.SetStateAction<TextState[]>>
}

export const useTextErase = ({ 
  canvasRef, 
  numPixel, 
  draggingColor, 
  textState,
  setTextState
}: Props) => {


  const handleMouseRelieveText = useCallback((startX: number, startY: number, endX: number, endY: number) => {
    // ドラッグの方向による影響を除外して、純粋な選択範囲を計算する
    const right = Math.max(startX, endX)
    const left = Math.min(startX, endX)
    const top = Math.min(startY, endY)
    const bottom = Math.max(startY, endY)
    // 選択範囲と被るテキストを除去する
    setTextState(textState.filter((text) => text.startX > right || text.endX < left || text.startY > bottom || text.endY < top))
  }, [textState, setTextState])

  return useDragging({
      canvasRef,
      numPixel,
      draggingColor,
      handleMouseRelieve: handleMouseRelieveText
    })
} 