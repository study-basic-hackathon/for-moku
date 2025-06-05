import { useDragging } from '@/hooks/event/venueedit/tool/useDragging'

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  numPixel: number
  color: string
  handleMouseRelieveText: (startX: number, startY: number, endX: number, endY: number) => void
}

export const useTextAdd = ({ canvasRef, numPixel, color, handleMouseRelieveText }: Props) => {

  return useDragging({
    canvasRef,
    numPixel,
    color,
    handleMouseRelieve: handleMouseRelieveText
  })
} 