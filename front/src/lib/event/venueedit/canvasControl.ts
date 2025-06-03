import { CANVAS_BASE } from './constants'
import { Color } from '@/types/color'

/**
 * グリッドを描画する
 * @param ctx キャンバスのコンテキスト
 * @param pixels ピクセル数
 * @param cellSize セルサイズ
 */
export const drawAllGrid = (ctx: CanvasRenderingContext2D, pixels: number, cellSize: number) => {
  const canvasBase = CANVAS_BASE
  ctx.strokeStyle = '#777777'
  ctx.lineWidth = 2

  // 縦線
  for (let i = 1; i < pixels; i++) {
    ctx.beginPath()
    ctx.moveTo(i * cellSize, 0)
    ctx.lineTo(i * cellSize, canvasBase)
    ctx.stroke()
  }

  // 横線
  for (let i = 1; i < pixels; i++) {
    ctx.beginPath()
    ctx.moveTo(0, i * cellSize)
    ctx.lineTo(canvasBase, i * cellSize)
    ctx.stroke()
  }
} 


/**
 * パターンを作成用のキャンバスを作成し、パターンでキャンバスを埋め尽くす
 * @param ctx キャンバスのコンテキスト
 * @param pixels ピクセル数
 * @param cellSize セルサイズ
 */
export const drawPatternCanvas = (ctx: CanvasRenderingContext2D) => {
  const canvasBase = CANVAS_BASE

  // 白黒のチェックを作成用のキャンバスを作成
  const patternCanvas = document.createElement('canvas')
  patternCanvas.width = 8
  patternCanvas.height = 8
  const patternCtx = patternCanvas.getContext('2d')
  if (patternCtx) {
    // 白い背景
    patternCtx.fillStyle = '#ffffff'
    patternCtx.fillRect(0, 0, 8, 8)
    // グレーのチェック
    patternCtx.fillStyle = '#e0e0e0'
    patternCtx.fillRect(0, 0, 4, 4)
    patternCtx.fillRect(4, 4, 4, 4)
  }
  
  // 白黒のチェックを作成用のキャンバスからパターンを作成
  const pattern = ctx.createPattern(patternCanvas, 'repeat')

  // パターンでキャンバスを埋め尽くす
  if (pattern) {
    ctx.fillStyle = pattern
    ctx.fillRect(0, 0, canvasBase, canvasBase)
  }
} 

/**
 * セルのグリッドを描画する
 * @param ctx キャンバスのコンテキスト
 * @param x x座標
 * @param y y座標
 * @param cellSize セルサイズ
 */
export const drawCellGrid = (ctx: CanvasRenderingContext2D, x: number, y: number, cellSize: number) => {
  ctx.strokeStyle = '#777777'
  const lineWidth = cellSize / 10
  ctx.lineWidth = lineWidth
  const padding = lineWidth / 2 // 内側に2pxの余白を設ける
  ctx.beginPath()
  ctx.moveTo(x * cellSize + padding, y * cellSize + padding)
  ctx.lineTo((x + 1) * cellSize - padding, y * cellSize + padding)
  ctx.lineTo((x + 1) * cellSize - padding, (y + 1) * cellSize - padding)
  ctx.lineTo(x * cellSize + padding, (y + 1) * cellSize - padding)
  ctx.closePath()
  ctx.stroke()
}

/**
 * グリッドを描画する
 * @param ctx キャンバスのコンテキスト
 * @param pixels ピクセル数
 * @param cellSize セルサイズ
 */
export const drawCellGridThin = (ctx: CanvasRenderingContext2D, x: number, y: number, cellSize: number) => {
  ctx.strokeStyle = '#777777'
  ctx.lineWidth = 2
  const padding = 0 // 内側に2pxの余白を設ける
  ctx.beginPath()
  ctx.moveTo(x * cellSize + padding, y * cellSize + padding)
  ctx.lineTo((x + 1) * cellSize - padding, y * cellSize + padding)
  ctx.lineTo((x + 1) * cellSize - padding, (y + 1) * cellSize - padding)
  ctx.lineTo(x * cellSize + padding, (y + 1) * cellSize - padding)
  ctx.closePath()
  ctx.stroke()
} 
/**
 * セルをパターンで塗る
 * @param ctx キャンバスのコンテキスト
 * @param x x座標
 * @param y y座標
 * @param cellSize セルサイズ
 */
export const drawPatternCell = (ctx: CanvasRenderingContext2D, x: number, y: number, cellSize: number) => {
  // パターンを作成用のキャンバスを作成
  const patternCanvas = document.createElement('canvas')
  patternCanvas.width = 8
  patternCanvas.height = 8
  const patternCtx = patternCanvas.getContext('2d')
  if (patternCtx) {
    // 白い背景
    patternCtx.fillStyle = '#ffffff'
    patternCtx.fillRect(0, 0, 8, 8)
    // グレーのチェック
    patternCtx.fillStyle = '#e0e0e0'
    patternCtx.fillRect(0, 0, 4, 4)
    patternCtx.fillRect(4, 4, 4, 4)
  }
  
  // パターンを作成
  const pattern = ctx.createPattern(patternCanvas, 'repeat')
  if (pattern) {
    ctx.fillStyle = pattern
    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
  }
}

/**
 * 色付きセルを描画する
 * @param ctx キャンバスのコンテキスト
 * @param x x座標
 * @param y y座標
 * @param cellSize セルサイズ
 * @param color 色
 */
export const drawColoredCell = (ctx: CanvasRenderingContext2D, cellX : number, cellY: number, cellSize: number, color: Color | null) => {
  // パターンまたは色を描画
  if (color !== null) {
    ctx.fillStyle = color.toString()
    ctx.fillRect(cellX * cellSize, cellY * cellSize, cellSize, cellSize)
  }
}

/**
 * マウス座標からセルの座標を取得する
 * @param x マウスのx座標
 * @param y マウスのy座標
 * @param canvasRef キャンバスの参照
 * @param cellSize セルサイズ
 * @param numPixel ピクセル数
 * @returns セルの座標
 */
export const getCellCoordinates = (
  x: number, 
  y: number, 
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  cellSize: number,
  numPixel: number
) => {
  const rect = canvasRef.current?.getBoundingClientRect()
  if (!rect) return null

  const scaleX = CANVAS_BASE / rect.width
  const scaleY = CANVAS_BASE / rect.height

  const cellX = Math.floor((x - rect.left) * scaleX / cellSize)
  const cellY = Math.floor((y - rect.top) * scaleY / cellSize)

  if (cellX < 0 || cellX >= numPixel || cellY < 0 || cellY >= numPixel) {
    return null
  }

  return { cellX, cellY }
} 