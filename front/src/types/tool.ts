/**
 * 会場編集で使用するツールの種類
 */
export const VENUE_EDIT_TOOLS = [
  'ピクセル塗りつぶし',
  'ピクセル消去',
  '丸オブジェクト配置',
  '丸オブジェクト消去',
  '任意オブジェクト配置',
  '任意オブジェクト消去',
  'テキストボックス追加',
  'テキストボックス消去',
  '直線描画',
  '直線消去'
] as const

/**
 * 会場編集ツールの型定義
 */
export type VenueEditTool = typeof VENUE_EDIT_TOOLS[number]

/**
 * ピクセル操作系のツール
 */
export const PIXEL_TOOLS = [
  VENUE_EDIT_TOOLS[0], // ピクセル塗りつぶし
  VENUE_EDIT_TOOLS[1], // ピクセル消去
  VENUE_EDIT_TOOLS[2], // 丸オブジェクト配置
  VENUE_EDIT_TOOLS[3], // 丸オブジェクト消去
] as const
export type PixelTool = typeof PIXEL_TOOLS[number]

/**
 * オブジェクト操作系のツール
 */
export const OBJECT_TOOLS = [
  VENUE_EDIT_TOOLS[2], // 丸オブジェクト配置
  VENUE_EDIT_TOOLS[3], // 丸オブジェクト消去
  VENUE_EDIT_TOOLS[4], // 任意オブジェクト配置
  VENUE_EDIT_TOOLS[5], // 任意オブジェクト消去
] as const
export type ObjectTool = typeof OBJECT_TOOLS[number]

/**
 * テキスト操作系のツール
 */
export const TEXT_TOOLS = [
  VENUE_EDIT_TOOLS[6], // テキストボックス追加
  VENUE_EDIT_TOOLS[7], // テキストボックス消去
] as const
export type TextTool = typeof TEXT_TOOLS[number]

/**
 * 線操作系のツール
 */
export const LINE_TOOLS = [
  VENUE_EDIT_TOOLS[8], // 直線描画
  VENUE_EDIT_TOOLS[9], // 直線消去
] as const
export type LineTool = typeof LINE_TOOLS[number] 

/**
 * 描画可能なツールのリスト
 */
export const DRAWABLE_TOOLS = [
  PIXEL_TOOLS[0], // ピクセル塗りつぶし
  PIXEL_TOOLS[1], // ピクセル消去
] as const
export type DrawableTool = typeof DRAWABLE_TOOLS[number]