'use client'

import XButton from '@/components/molecules/button/XButton'
import { useSubToolSelection } from '@/hooks/event/venueedit/useSubToolSelection'

/**
 * 削除系のツールに切り替えるボタンコンポーネント
 * 
 * このコンポーネントは、正方形のボタンにバツ記号を表示します。
 * デフォルトでは、薄い赤の背景に濃い赤のバツ記号を表示し、
 * ホバー時に背景色が変化します。
 * 
 * スタイルの特徴:
 * - 形状: 正方形（aspect-square）
 * - 背景色: 薄いグレー（bg-gray-100）
 * - ホバー時: やや濃いグレー（hover:bg-gray-200）
 * - バツ記号: 濃いグレー（text-gray-600）
 * - 無効時: 透明度50%（disabled:opacity-50）
 * - 中央揃え: フレックスボックスで中央配置
 * 
 * 使用例:
 * ```tsx
 * <ColorEraseButton 
 *   onClick={() => console.log('clicked')}
 *   disabled={false}
 *   className="w-10 h-10"
 * />
 * ```
 * 
 * @param disabled - ボタンを無効化するかどうか
 * @param isSelected - ボタンが選択されているかどうか
 * @param className - 追加のクラス名
 * @returns バツ記号を表示するボタンコンポーネント
 */
interface ToggleToEraseButtonProps {
  /** ボタンを無効化するかどうか */
  disabled?: boolean
  /** ボタンが選択されているかどうか */
  isSelected?: boolean
  /** 追加のクラス名 */
  className?: string
}

export default function ToggleToEraseButton({ disabled, isSelected, className }: Readonly<ToggleToEraseButtonProps>) {
  const { toggleToEraseTool } = useSubToolSelection()
  return (
    <XButton
      onClick={toggleToEraseTool}
      disabled={disabled}
      className={`${isSelected ? "ring-2 ring-red-500 ring-offset-2" : ""} ${className || ""}`}
    />
  )
} 