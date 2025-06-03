/**
 * 会場編集で使用するツールの種類
 */
export { VENUE_EDIT_TOOLS, PIXEL_TOOLS } from '@/types/tool'
export type { VenueEditTool, PixelTool } from '@/types/tool'

import { Color } from 'react-color'

/**
 * デフォルトのカラーパレット
 */
export const DEFAULT_COLORS: Color[] = [
  '#000000', // 黒
  '#FFFFFF', // 白
  '#FF0000', // 赤
  '#00FF00', // 緑
  '#0000FF', // 青
  '#FFFF00', // 黄
  '#FF00FF', // マゼンタ
  '#00FFFF', // シアン
  '#FFA500', // オレンジ
  '#800080', // 紫
  '#A52A2A', // 茶
  '#808080', // グレー
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