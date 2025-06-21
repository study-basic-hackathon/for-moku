import { EncodedVenue, TextState } from "@/types/event/state"
import { createCanvas, CanvasRenderingContext2D } from 'canvas'

interface Props {
  encodedVenue: EncodedVenue
  pixelSize?: number
  backgroundColor?: string
  gridColor?: string
  gridWidth?: number
}

function drawColoredSquare(
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  cellSize: number,
  width: number,
  height: number,
  color: string
) {
  ctx.fillStyle = color
  ctx.fillRect(startX * cellSize, startY * cellSize, width * cellSize, height * cellSize)
}

function drawText(
  ctx: CanvasRenderingContext2D,
  cellSize: number,
  text: TextState
) {
  const startX = text.startX
  const startY = text.startY
  const endX = text.endX
  const endY = text.endY
  const textColor = text.textColor
  const textLength = text.text.length

  const fontSize = Math.min(((Math.abs(endX - startX) + 1) * cellSize)/textLength, (Math.abs(endY - startY)+1) * cellSize)
  ctx.fillStyle = textColor.toString()
  ctx.font = `${fontSize}px sans-serif`
  
  const x = ((startX + endX) / 2 + 0.5) * cellSize
  const y = ((startY + endY) / 2 + 0.5) * cellSize

  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text.text, x, y)
}

function drawCircle(
  ctx: CanvasRenderingContext2D,
  cellX: number,
  cellY: number,
  cellSize: number,
  color: string
) {
  const centerX = cellX * cellSize + cellSize / 2
  const centerY = cellY * cellSize + cellSize / 2
  const radius = (cellSize / 2) * 0.8

  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
  ctx.fill()
}

function drawCellGrid(
  ctx: CanvasRenderingContext2D,
  cellX: number,
  cellY: number,
  cellSize: number
) {
  ctx.strokeStyle = '#777777'
  const lineWidth = cellSize / 10
  ctx.lineWidth = lineWidth
  const padding = lineWidth / 2
  ctx.beginPath()
  ctx.moveTo(cellX * cellSize + padding, cellY * cellSize + padding)
  ctx.lineTo((cellX + 1) * cellSize - padding, cellY * cellSize + padding)
  ctx.lineTo((cellX + 1) * cellSize - padding, (cellY + 1) * cellSize - padding)
  ctx.lineTo(cellX * cellSize + padding, (cellY + 1) * cellSize - padding)
  ctx.closePath()
  ctx.stroke()
}

/**
 * 会場の画像を生成する(@サーバー側で使用)
 * 
 * @param props 会場の情報
 * @returns 会場の画像(バッファ)
 */
export function generateImage({
  encodedVenue,
  pixelSize = 30,
  backgroundColor = '#FFFFFF',
}: Props): Buffer {
  const {numPixel,encodedPixelColor ,encodedCircleColor, textState} = encodedVenue
  const canvasSize = numPixel * pixelSize
  const canvas = createCanvas(canvasSize, canvasSize)
  const ctx = canvas.getContext('2d')

  // 背景を塗りつぶし
  ctx.fillStyle = backgroundColor
  ctx.fillRect(0, 0, canvasSize, canvasSize)

  // ピクセルを描画
  for (const [color, positions] of Object.entries(encodedPixelColor)) {
    for (const {x, y} of positions) {
      ctx.fillStyle = color
      ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize)
      drawCellGrid(ctx, x, y, pixelSize)
    }
  }

  // 円を描画
  for (const [color, positions] of Object.entries(encodedCircleColor)) {
    for (const {x, y} of positions) {
      drawCircle(ctx, x, y, pixelSize, color)
    }
  }

  // テキストを描画
  for (const text of textState) {
    if (text.backgroundColor != null) {
      drawColoredSquare(
        ctx,
        text.startX,
        text.startY,
        pixelSize,
        text.endX - text.startX + 1,
        text.endY - text.startY + 1,
        text.backgroundColor.toString()
      )
    }
    drawText(ctx, pixelSize, text)
  }

  return canvas.toBuffer('image/png')
} 