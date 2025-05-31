import { useRef, useEffect } from 'react'
import { drawPatternCanvas, drawGrid } from '@/lib/event/venueedit/pattern'

interface Props {
  n_pixel?: number
}

const CANVAS_BASE = 512;

export const useCanvasDraw = ({ n_pixel = 8 }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const CELL_SIZE = CANVAS_BASE / n_pixel

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = CANVAS_BASE;
    canvas.height = CANVAS_BASE;

    // パターンの描画
    drawPatternCanvas(ctx, n_pixel, CELL_SIZE);

    // グリッドの描画
    drawGrid(ctx, n_pixel, CELL_SIZE);

  }, [CANVAS_BASE, n_pixel])

  const getCellCoordinates = (x: number, y: number) => {
    const cellX = Math.floor(x / CELL_SIZE);
    const cellY = Math.floor(y / CELL_SIZE);
    return { cellX, cellY };
  }

  return { canvasRef, CANVAS_BASE, getCellCoordinates };
} 