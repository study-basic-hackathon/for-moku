/**
 * グリッドを描画する
 * @param ctx キャンバスのコンテキスト
 * @param pixels ピクセル数
 * @param cellSize セルサイズ
 */
export const drawGrid = (ctx: CanvasRenderingContext2D, pixels: number, cellSize: number) => {
  const canvasBase = pixels * cellSize
  ctx.strokeStyle = '#777777'
  ctx.lineWidth = 1

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
export const drawPatternCanvas = (ctx: CanvasRenderingContext2D, pixels: number, cellSize: number) => {
  const canvasBase = pixels * cellSize

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