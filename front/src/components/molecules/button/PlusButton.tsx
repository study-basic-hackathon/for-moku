import { cn } from "@/lib/shadcn/utils"
import { Icon, Plus } from "lucide-react"

/**
 * プラス記号を表示するボタンコンポーネント
 * 
 * このコンポーネントは、正方形のボタンにプラス記号を表示します。
 * デフォルトでは、薄いグレーの背景に濃いグレーのプラス記号を表示し、
 * ホバー時に背景色が変化します。
 * 
 * スタイルの特徴:
 * - 形状: 正方形（aspect-square）
 * - 背景色: 薄いグレー（bg-gray-100）
 * - ホバー時: やや濃いグレー（hover:bg-gray-200）
 * - プラス記号: 濃いグレー（text-gray-600）
 * - 無効時: 透明度50%（disabled:opacity-50）
 * - 中央揃え: フレックスボックスで中央配置
 * 
 * 使用例:
 * ```tsx
 * <PlusButton 
 *   onClick={() => console.log('clicked')}
 *   disabled={false}
 *   className="w-10 h-10"
 * />
 * ```
 * 
 * @param onClick - ボタンクリック時に実行されるコールバック関数
 * @param disabled - ボタンを無効化するかどうか
 * @param className - ボタンに適用する追加のクラス名（デフォルトのスタイルとマージされます）
 * @returns プラス記号を表示するボタンコンポーネント
 */
interface PlusButtonProps {
  /** ボタンクリック時に実行されるコールバック関数 */
  onClick: () => void
  /** ボタンを無効化するかどうか */
  disabled?: boolean
  /** ボタンに適用する追加のクラス名（デフォルトのスタイルとマージされます） */
  className?: string
}

/** デフォルトのスタイルクラス */
const defaultClassName = `
  aspect-square rounded cursor-pointer border-0
  bg-gray-100 hover:bg-gray-200
  disabled:opacity-50 disabled:cursor-not-allowed
  flex items-center justify-center
`

export default function PlusButton({ 
  onClick, 
  disabled,
  className 
}: Readonly<PlusButtonProps>) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(defaultClassName, className)}
    > 
      <span className="text-gray-600 text-xl"><Plus size={16}/></span>
    </button>
  )
} 