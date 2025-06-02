import { cn } from "@/lib/shadcn/utils"

/**
 * リング付きのボタンコンポーネント
 * 
 * このコンポーネントは、選択状態に応じてリングを表示するボタンを提供します。
 * デフォルトでは、正方形のボタンで、選択時には青いリングが表示されます。
 * 
 * スタイルの特徴:
 * - 形状: 正方形（aspect-square）
 * - 選択時: 青いリング（ring-2 ring-blue-500 ring-offset-2）
 * - 角丸: 標準的な丸み（rounded）
 * - 幅: 親要素いっぱい（w-full）
 * 
 * 使用例:
 * ```tsx
 * <RingButton 
 *   onClick={() => console.log('clicked')}
 *   isSelected={true}
 *   style={{ backgroundColor: '#FF0000' }}
 * />
 * ```
 * 
 * @param onClick - ボタンクリック時に実行されるコールバック関数
 * @param isSelected - ボタンが選択されているかどうか
 * @param style - ボタンに適用するスタイル（主に背景色）
 * @param className - ボタンに適用する追加のクラス名
 * @returns リング付きのボタンコンポーネント
 */
interface RingButtonProps {
  /** ボタンクリック時に実行されるコールバック関数 */
  onClick: () => void
  /** ボタンが選択されているかどうか */
  isSelected?: boolean
  /** ボタンに適用するスタイル（主に背景色） */
  style?: React.CSSProperties
  /** ボタンに適用する追加のクラス名 */
  className?: string
}

/** デフォルトのスタイルクラス */
const defaultClassName = "aspect-square rounded cursor-pointer border-0 w-full"

export default function RingButton({ 
  onClick, 
  isSelected,
  style,
  className 
}: Readonly<RingButtonProps>) {
  return (
    <button
      type="button"
      className={cn(
        defaultClassName,
        isSelected && 'ring-2 ring-blue-500 ring-offset-2',
        className
      )}
      style={style}
      onClick={onClick}
    />
  )
} 