import { TextState } from '@/types/event/state'
import { CANVAS_BASE } from './constants'
import { Color } from 'react-color'

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
 * チェック柄のパターンを作成する
 * @param ctx キャンバスのコンテキスト
 * @returns パターンオブジェクト
 */
const createCheckPattern = (ctx: CanvasRenderingContext2D) => {
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
  return ctx.createPattern(patternCanvas, 'repeat')
}

/**
 * パターンを作成用のキャンバスを作成し、パターンでキャンバスを埋め尽くす
 * @param ctx キャンバスのコンテキスト
 * @param pixels ピクセル数
 * @param cellSize セルサイズ
 */
export const drawPatternCanvas = (ctx: CanvasRenderingContext2D) => {
  const pattern = createCheckPattern(ctx)
  if (pattern) {
    ctx.fillStyle = pattern
    ctx.fillRect(0, 0, CANVAS_BASE, CANVAS_BASE)
  }
} 

/**
 * セルのグリッドを描画する
 * @param ctx キャンバスのコンテキスト
 * @param cellX セルのx座標インデックス
 * @param cellY セルのy座標インデックス
 * @param cellSize セルサイズ
 */
export const drawCellGrid = (ctx: CanvasRenderingContext2D, cellX: number, cellY: number, cellSize: number) => {
  ctx.strokeStyle = '#777777'
  const lineWidth = cellSize / 10
  ctx.lineWidth = lineWidth
  const padding = lineWidth / 2 // 内側に2pxの余白を設ける
  ctx.beginPath()
  ctx.moveTo(cellX * cellSize + padding, cellY * cellSize + padding)
  ctx.lineTo((cellX + 1) * cellSize - padding, cellY * cellSize + padding)
  ctx.lineTo((cellX + 1) * cellSize - padding, (cellY + 1) * cellSize - padding)
  ctx.lineTo(cellX * cellSize + padding, (cellY + 1) * cellSize - padding)
  ctx.closePath()
  ctx.stroke()
}

/**
 * グリッドを描画する
 * @param ctx キャンバスのコンテキスト
 * @param cellX セルのx座標インデックス
 * @param cellY セルのy座標インデックス
 * @param cellSize セルサイズ
 */
export const drawCellGridThin = (ctx: CanvasRenderingContext2D, cellX: number, cellY: number, cellSize: number) => {
  ctx.strokeStyle = '#777777'
  ctx.lineWidth = 2
  const padding = 0 
  ctx.beginPath()
  ctx.moveTo(cellX * cellSize + padding, cellY * cellSize + padding)
  ctx.lineTo((cellX + 1) * cellSize - padding, cellY * cellSize + padding)
  ctx.lineTo((cellX + 1) * cellSize - padding, (cellY + 1) * cellSize - padding)
  ctx.lineTo(cellX * cellSize + padding, (cellY + 1) * cellSize - padding)
  ctx.closePath()
  ctx.stroke()
} 
/**
 * セルをパターンで塗る
 * @param ctx キャンバスのコンテキスト
 * @param cellX セルのx座標インデックス
 * @param cellY セルのy座標インデックス
 * @param cellSize セルサイズ
 */
export const drawPatternCell = (ctx: CanvasRenderingContext2D, cellX: number, cellY: number, cellSize: number) => {
  const pattern = createCheckPattern(ctx)
  if (pattern) {
    ctx.fillStyle = pattern
    ctx.fillRect(cellX * cellSize, cellY * cellSize, cellSize, cellSize)
  }
}

/**
 * 色付きセルを描画する
 * @param ctx キャンバスのコンテキスト
 * @param cellX セルのx座標インデックス
 * @param cellY セルのy座標インデックス
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
 * 色付きセルを描画する
 * @param ctx キャンバスのコンテキスト
 * @param cellX セルのx座標インデックス
 * @param cellY セルのy座標インデックス
 * @param numCellX セルのx方向の数
 * @param numCellY セルのy方向の数
 * @param cellSize セルサイズ
 * @param color 色
 */
export const drawColoredSquare = (ctx: CanvasRenderingContext2D, cellX : number, cellY: number, cellSize: number, numCellX: number, numCellY: number, color: string) => {
  // パターンまたは色を描画
  if (color !== null) {
    ctx.fillStyle = color.toString()
    ctx.fillRect(cellX * cellSize, cellY * cellSize, numCellX * cellSize, numCellY * cellSize)
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

/**
 * キャンバスを初期化する
 * @param canvas キャンバス要素
 * @param numPixel ピクセル数
 * @param pixelColorState ピクセルの色状態
 * @returns 初期化されたキャンバスのコンテキスト
 */
export const initializeCanvas = (
  canvas: HTMLCanvasElement,
  numPixel: number,
) => {
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  // キャンバスのサイズを設定
  canvas.width = CANVAS_BASE
  canvas.height = CANVAS_BASE

  // キャンバスをクリア
  ctx.clearRect(0, 0, CANVAS_BASE, CANVAS_BASE)

  // パターンの描画
  drawPatternCanvas(ctx)

  // グリッドを描画
  drawAllGrid(ctx, numPixel, CANVAS_BASE / numPixel)

  return ctx
}

/**
 * ピクセルを描画する
 * @param ctx キャンバスのコンテキスト
 * @param x x座標
 * @param y y座標
 * @param cellSize セルサイズ
 * @param pixelColorState ピクセルの色状態
 */
export const syncPixelStateToCanvas = (
  ctx: CanvasRenderingContext2D,
  cellX: number,
  cellY: number,
  cellSize: number,
  pixelColorState: (Color | null)[][],
  circleColorState: (Color | null)[][],
  textState: TextState[]
) => {
  const pixelColor = pixelColorState[cellY]?.[cellX]
  const circleColor = circleColorState[cellY]?.[cellX]

  if (textState.some(text => text.startX <= cellX && text.endX >= cellX && text.startY <= cellY && text.endY >= cellY)) {
    return;
  }

  // セルを色で塗る
  if (pixelColor != null) {
    drawColoredCell(ctx, cellX, cellY, cellSize, pixelColor)
    drawCellGrid(ctx, cellX, cellY, cellSize)
  } else {
    drawPatternCell(ctx, cellX, cellY, cellSize)
    drawCellGridThin(ctx, cellX, cellY, cellSize)
  }
  // 円を描画
  if (circleColor != null) {
    drawCircle(ctx, cellX, cellY, cellSize, circleColor)
  }
}

/**
 * ドラッグ中の状態をキャンバスに反映する
 * @param ctx キャンバスのコンテキスト
 * @param startX 開始X座標
 * @param startY 開始Y座標
 * @param endX 終了X座標
 * @param endY 終了Y座標
 * @param cellSize セルサイズ
 * @param color 色
 */
export const syncDraggingStateToCanvas = (
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  cellSize: number,
  color: string
) => {

  const fillStartX = Math.min(startX, endX)
  const fillStartY = Math.min(startY, endY)
  const fillEndX = Math.max(startX, endX)
  const fillEndY = Math.max(startY, endY)

  const cellSizeX = (fillEndX - fillStartX + 1) * cellSize
  const cellSizeY = (fillEndY - fillStartY + 1) * cellSize

  ctx.fillStyle = color.toString()
  ctx.fillRect(fillStartX * cellSize, fillStartY * cellSize, cellSizeX, cellSizeY)

}

export const syncAllStateToCanvas = (
  ctx: CanvasRenderingContext2D,
  numPixel: number,
  cellSize: number,
  pixelColorState: (Color | null)[][],
  circleColorState: (Color | null)[][],
  textState: TextState[]
) => {
  for (let i = 0; i < numPixel; i++) {
    for (let j = 0; j < numPixel; j++) {
      syncPixelStateToCanvas(ctx, i, j, cellSize, pixelColorState, circleColorState, textState)
    }
  }
  for (const text of textState) {
    if (text.backgroundColor != null) {
    drawColoredSquare(ctx, text.startX, text.startY, cellSize, text.endX - text.startX + 1, text.endY - text.startY + 1, text.backgroundColor.toString())
    }
    drawText(ctx, cellSize, text)
  }
}

/**
 * 円を描画する
 * @param ctx キャンバスのコンテキスト
 * @param cellX x座標
 * @param cellY y座標
 * @param cellSize セルサイズ
 * @param color 色
 */
export const drawCircle = (ctx: CanvasRenderingContext2D, cellX: number, cellY: number, cellSize: number, color: Color) => {
  const centerX = cellX * cellSize + cellSize / 2
  const centerY = cellY * cellSize + cellSize / 2
  const radius = (cellSize / 2) * 0.8

  ctx.fillStyle = color.toString()
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
  ctx.fill()
}

/**
 * テキストを描画する
 * @param ctx キャンバスのコンテキスト
 * @param text 描画するテキスト
 * @param startX 開始X座標
 * @param startY 開始Y座標
 * @param endX 終了X座標
 * @param endY 終了Y座標
 * @param cellSize セルサイズ
 */
export const drawText = (
  ctx: CanvasRenderingContext2D,
  cellSize: number,
  text: TextState
) => {
  const startX = text.startX
  const startY = text.startY
  const endX = text.endX
  const endY = text.endY
  const backgroundColor = text.backgroundColor
  const textColor = text.textColor
  const textLength = text.text.length

  const fontSize = Math.min(((Math.abs(endX - startX) + 1) * cellSize)/textLength, (Math.abs(endY - startY)+1) * cellSize) // yの方は長さでは割らない
  ctx.fillStyle = textColor.toString()
  ctx.font = `${fontSize}px sans-serif`
  
  // 文字の配置を計算
  const x = ((startX + endX) / 2 + 0.5) * cellSize
  const y = ((startY + endY) / 2 + 0.5) * cellSize

  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text.text, x, y)
} 