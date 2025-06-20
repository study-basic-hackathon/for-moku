import PlusButton from '@/components/molecules/button/PlusButton'

/**
 * 生成系ツールに切り替えるボタンコンポーネント
 * 
 * このコンポーネントは、生成系ツールに切り替えるためのボタンです。
 * PlusButtonをラップして、生成系ツールに切り替える機能に特化したコンポーネントです。
 * 
 * 使用例:
 * ```tsx
 * <ToggleToGenerateButton 
 *   onClick={() => console.log('text add selected')}
 *   disabled={false}
 *   isSelected={true}
 *   className="w-8 h-8"
 * />
 * ```
 * 
 * @param onClick - ボタンクリック時に実行されるコールバック関数
 * @param disabled - ボタンを無効化するかどうか
 * @param isSelected - ボタンが選択されているかどうか
 * @param className - ボタンに適用する追加のクラス名
 * @returns テキスト追加選択ボタンコンポーネント
 */
interface ToggleToGenerateButtonProps {
  /** ボタンクリック時に実行されるコールバック関数 */
  onClick: () => void
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
 *   onClick={() => console.log('text add selected')}
 *   disabled={false}
 *   isSelected={true}
 *   className="w-8 h-8"
 * />
 * ```
 * 
 * @param onClick - ボタンクリック時に実行されるコールバック関数
 * @param disabled - ボタンを無効化するかどうか
 * @param isSelected - ボタンが選択されているかどうか
 * @param className - ボタンに適用する追加のクラス名
 * @returns テキスト追加選択ボタンコンポーネント
 */
export default function ToggleToGenerateButton({ 
  onClick, 
  disabled,
  isSelected,
  className 
}: Readonly<ToggleToGenerateButtonProps>) {
  return (
    <PlusButton
      onClick={onClick}
      disabled={disabled}
      className={`${isSelected ? "ring-2 ring-blue-500 ring-offset-2" : ""} ${className || ""}`}
    />
  )
} 