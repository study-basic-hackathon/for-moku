/**
 * 会場編集で使用するツールの種類
 */
export { VENUE_EDIT_TOOLS, PIXEL_TOOLS } from '@/types/tool'
export type { VenueEditTool, PixelTool } from '@/types/tool'

import { color, Color } from '@/types/color'

/**
 * デフォルトのカラーパレット
 */
export const DEFAULT_COLORS: Color[] = [
  color('#000000'), // 黒
  color('#FFFFFF'), // 白
  color('#FF0000'), // 赤
  color('#00FF00'), // 緑
  color('#0000FF'), // 青
  color('#FFFF00'), // 黄
  color('#FF00FF'), // マゼンタ
  color('#00FFFF'), // シアン
  color('#FFA500'), // オレンジ
  color('#800080'), // 紫
  color('#A52A2A'), // 茶
  color('#808080'), // グレー
]

/**
 * デフォルトのピクセル数
 */
export const DEFAULT_NUM_PIXEL = 8
/**
 * 最小のピクセル数
 */
export const MIN_NUM_PIXEL = 4
/**
 * 最大のピクセル数
 */
export const MAX_NUM_PIXEL = 64

/**
 * キャンバスのサイズ(ひとまず固定とします)
 */
export const CANVAS_BASE = 512;