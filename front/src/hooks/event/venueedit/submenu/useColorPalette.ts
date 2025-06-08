import { Color } from 'react-color'
import { useState, Dispatch, SetStateAction } from 'react'
import { DEFAULT_COLORS } from '@/lib/event/venueedit/constants'

/**
 * useColorPaletteフックの戻り値の型定義
 */
interface UseColorPaletteReturn {
  selectedColor: Color
  colorPalette: Color[]
  setSelectedColor: Dispatch<SetStateAction<Color>>
  selectedColorBackGround: Color
  setSelectedColorBackGround: Dispatch<SetStateAction<Color>>
  addColor: (color: Color) => void
  removeColor: (color: Color) => void
  resetColors: () => void
}

/**
 * カラーパレットを管理するフック
 * @returns カラーパレットの状態と操作関数
 */
export const useColorPalette = (): UseColorPaletteReturn => {
  const [selectedColor, setSelectedColor] = useState<Color>(DEFAULT_COLORS[0])
  const [selectedColorBackGround, setSelectedColorBackGround] = useState<Color>(DEFAULT_COLORS[1])
  const [colorPalette, setColorPalette] = useState<Color[]>(DEFAULT_COLORS)

  /**
   * 新しい色を追加する
   * @param color 追加する色（HEX形式）
   */
  const addColor = (color: Color) => {
    // 重複チェック
    if (colorPalette.includes(color)) return
    setColorPalette([...colorPalette, color])
    setSelectedColor(color) // 追加した色を選択状態にする
  }

  /**
   * 色を削除する
   * @param color 削除する色
   */
  const removeColor = (color: Color) => {
    setColorPalette(colorPalette.filter(c => c !== color))
    // 削除した色が選択されていた場合、最初の色を選択
    if (selectedColor === color) {
      setSelectedColor(colorPalette[0])
    }
  }

  /**
   * カラーパレットをデフォルトにリセットする
   */
  const resetColors = () => {
    setColorPalette(DEFAULT_COLORS)
    setSelectedColor(DEFAULT_COLORS[0])
  }

  return {
    selectedColor,
    colorPalette,
    setSelectedColor,
    selectedColorBackGround,
    setSelectedColorBackGround,
    addColor,
    removeColor,
    resetColors
  }
} 