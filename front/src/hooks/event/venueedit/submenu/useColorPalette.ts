import { Color } from 'react-color'
import { useState } from 'react'
import { DEFAULT_COLORS } from '@/lib/event/venueedit/constants'
import { useSelectedColor } from './useSelectedColor'

/**
 * useColorPaletteフックの戻り値の型定義
 */
interface UseColorPaletteReturn {
  colorPalette: Color[]
  addColor: (color: Color) => void
  removeColor: (color: Color) => void
  resetColors: () => void
}

/**
 * カラーパレットを管理するフック
 * @returns カラーパレットの状態と操作関数
 */
export const useColorPalette = (): UseColorPaletteReturn => {
  const [colorPalette, setColorPalette] = useState<Color[]>(DEFAULT_COLORS)
  const { updateSelectedColor, selectedColor } = useSelectedColor()


  /**
   * 新しい色を追加する
   * @param color 追加する色（HEX形式）
   */
  const addColor = (color: Color) => {
    // 重複チェック
    if (colorPalette.includes(color)) return
    setColorPalette([...colorPalette, color])
    updateSelectedColor(color)
  }

  /**
   * 色を削除する
   * @param color 削除する色
   */
  const removeColor = (color: Color) => {
    setColorPalette(colorPalette.filter(c => c !== color))
    if (selectedColor === color) {
      updateSelectedColor(colorPalette[0])
    }
  }

  /**
   * カラーパレットをデフォルトにリセットする
   */
  const resetColors = () => {
    setColorPalette(DEFAULT_COLORS)
    updateSelectedColor(DEFAULT_COLORS[0])
  }

  return {
    colorPalette,
    addColor,
    removeColor,
    resetColors
  }
} 