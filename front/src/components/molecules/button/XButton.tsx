import { cn } from "@/lib/shadcn/utils"
import { X } from "lucide-react"

/**
 * バツ記号を表示するボタンコンポーネント
 * 
 * このコンポーネントは、正方形のボタンにバツ記号を表示します。
 * デフォルトでは、薄いグレーの背景に濃いグレーのバツ記号を表示し、
 * ホバー時に背景色が変化します。
 * 
 * スタイルの特徴:
 * - 形状: 正方形（aspect-square）
 * - 背景色: 薄い赤（bg-red-100）
 * - ホバー時: やや濃い赤（hover:bg-red-200）
 * - バツ記号: 濃い赤（text-red-600）
 * - 無効時: 透明度50%（disabled:opacity-50）
 * - 中央揃え: フレックスボックスで中央配置
 * 
 * 使用例:
 * ```tsx
 * <XButton 
 *   onClick={() => console.log('clicked')}
 *   disabled={false}
 *   className="w-10 h-10"
 * />
 * ```
 * 
 * @param onClick - ボタンクリック時に実行されるコールバック関数
 * @param disabled - ボタンを無効化するかどうか
 * @param className - ボタンに適用する追加のクラス名（デフォルトのスタイルとマージされます）
 * @returns バツ記号を表示するボタンコンポーネント
 */
interface XButtonProps {
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
  bg-red-100 hover:bg-red-200
  disabled:opacity-50 disabled:cursor-not-allowed
  flex items-center justify-center
`

export default function XButton({ 
  onClick, 
  disabled,
  className 
}: Readonly<XButtonProps>) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(defaultClassName, className)}
    > 
      <span className="text-red-600 text-xl"><X size={32}/></span>
    </button>
  )
} 