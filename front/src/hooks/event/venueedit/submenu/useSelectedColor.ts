import { useAtomValue, useSetAtom } from 'jotai'
import { useCallback } from 'react'
import { Color } from 'react-color'
import { 
  selectedColorAtom,
  selectedColorBackGroundAtom,
  colorActionAtom
} from '@/store/event/venueedit/color'

/**
 * 選択色の状態と操作を管理するカスタムフック
 */
export const useSelectedColor = () => {
  // Atomから状態を読み取る
  const selectedColor = useAtomValue(selectedColorAtom)
  const selectedColorBackGround = useAtomValue(selectedColorBackGroundAtom)

  // 更新用のdispatch関数を取得
  const dispatch = useSetAtom(colorActionAtom)

  // 各アクションに対応するコールバック関数を定義
  const updateSelectedColor = useCallback(
    (color: Color) => dispatch({ type: 'SET_SELECTED_COLOR', color }),
    [dispatch]
  )

  const updateSelectedColorBackGround = useCallback(
    (color: Color) => dispatch({ type: 'SET_BACKGROUND_COLOR', color }),
    [dispatch]
  )

  return {
    selectedColor,
    updateSelectedColor,
    selectedColorBackGround,
    updateSelectedColorBackGround,
  }
}