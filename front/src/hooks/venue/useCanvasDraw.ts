import { useRef, useEffect } from 'react'
import { drawPatternCanvas, drawGrid } from '@/lib/event/venueedit/pattern'

/**
 * キャンバスの描画を管理するフックのProps
 * @param n_pixel ピクセル数
 */
interface Props {
  n_pixel?: number
}

/**
 * キャンバスのサイズ(ひとまず固定とします)
 */
const CANVAS_BASE = 512;

/**
 * キャンバスの描画を管理するフック
 * @param n_pixel ピクセル数
 * @returns キャンバスの参照、キャンバスのサイズ、セルの座標を取得する関数
 */
export const useCanvasDraw = ({ n_pixel = 8 }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const CELL_SIZE = CANVAS_BASE / n_pixel

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // キャンバスのサイズを設定
    canvas.width = CANVAS_BASE;
    canvas.height = CANVAS_BASE;

    // パターンの描画
    drawPatternCanvas(ctx, n_pixel, CELL_SIZE);

    // グリッドの描画
    drawGrid(ctx, n_pixel, CELL_SIZE);

  }, [n_pixel])

  /**
   * セルの座標を取得する関数
   * @param x ピクセルのx座標
   * @param y ピクセルのy座標
   * @returns セルの座標
   */
  const getCellCoordinates = (x: number, y: number) => {
    const cellX = Math.floor(x / CELL_SIZE);
    const cellY = Math.floor(y / CELL_SIZE);
    return { cellX, cellY };
  }

  return { canvasRef, CANVAS_BASE, getCellCoordinates };
} 