import PlusButton from '@/components/molecules/button/PlusButton'
import { useSubToolSelection } from '@/hooks/event/venueedit/useSubToolSelection'

/**
 * 生成系ツールに切り替えるボタンコンポーネント
 * 
 * このコンポーネントは、生成系ツールに切り替えるためのボタンです。
 * PlusButtonをラップして、生成系ツールに切り替える機能に特化したコンポーネントです。
 * 
 * 使用例:
 * ```tsx
 * <ToggleToGenerateButton 
 *   disabled={false}
 *   isSelected={true}
 *   className="w-8 h-8"
 * />
 * ```
 * 
 * @param disabled - ボタンを無効化するかどうか
 * @param isSelected - ボタンが選択されているかどうか
 * @param className - ボタンに適用する追加のクラス名
 * @returns テキスト追加選択ボタンコンポーネント
 */
interface ToggleToGenerateButtonProps {
  /** ボタンを無効化するかどうか */
  disabled?: boolean
  /** ボタンが選択されているかどうか */
  isSelected?: boolean
  /** ボタンに適用する追加のクラス名 */
  className?: string
}

/**
 * 生成系ツールに切り替えるボタンコンポーネント
 * 
 * このコンポーネントは、生成系ツールに切り替えるためのボタンです。
 * PlusButtonをラップして、生成系ツールに切り替える機能に特化したコンポーネントです。
 * 
 * 使用例:
 * ```tsx
 * <ToggleToGenerateButton 
 *   disabled={false}
 *   isSelected={true}
 *   className="w-8 h-8"
 * />
 * ```
 * 
 * @param disabled - ボタンを無効化するかどうか
 * @param isSelected - ボタンが選択されているかどうか
 * @param className - ボタンに適用する追加のクラス名
 * @returns テキスト追加選択ボタンコンポーネント
 */
export default function ToggleToGenerateButton({
  disabled,
  isSelected,
  className 
}: Readonly<ToggleToGenerateButtonProps>) {
  const { toggleToGenerateTool } = useSubToolSelection()
  return (
    <PlusButton
      onClick={toggleToGenerateTool}
      disabled={disabled}
      className={`${isSelected ? "ring-2 ring-blue-500 ring-offset-2" : ""} ${className || ""}`}
    />
  )
} 