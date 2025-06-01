import { cn } from "@/lib/shadcn/utils"

/**
 * モノクロームスタイルのボタンコンポーネント
 * 
 * このコンポーネントは、シンプルな黒背景に白文字のデザインで、ホバー時に色が変化するボタンを提供します。
 * デフォルトでは、ボタンは幅いっぱいに広がり、適度なパディングを持ちます。
 * 
 * スタイルの特徴:
 * - 背景色: 濃いグレー（bg-gray-900）
 * - 文字色: 白（text-white）
 * - ホバー時: 明るいグレー（hover:bg-gray-600）
 * - 角丸: 標準的な丸み（rounded）
 * - パディング: 適度な余白（p-2）
 * - 幅: 親要素いっぱい（w-full）
 * 
 * 使用例:
 * ```tsx
 * <MonoClomeButton 
 *   onClick={() => console.log('clicked')}
 *   className="bg-blue-500 hover:bg-blue-600"
 * >
 *   ボタンテキスト
 * </MonoClomeButton>
 * ```
 * 
 * @param onClick - ボタンクリック時に実行されるコールバック関数
 * @param children - ボタン内に表示するコンテンツ（テキストやアイコンなど）
 * @param className - ボタンに適用する追加のクラス名（デフォルトのスタイルとマージされます）
 * @returns モノクロームスタイルのボタンコンポーネント
 */
interface MonoClomeButtonProps {
  /** ボタンクリック時に実行されるコールバック関数 */
  onClick: () => void
  /** ボタン内に表示するコンテンツ（テキストやアイコンなど） */
  children: React.ReactNode
  /** ボタンに適用する追加のクラス名（デフォルトのスタイルとマージされます） */
  className?: string
}

/** デフォルトのスタイルクラス */
const defaultClassName = "w-full p-2 bg-gray-900 text-white rounded hover:bg-gray-600"

export default function MonoClomeButton({ 
  onClick, 
  children,
  className 
}: Readonly<MonoClomeButtonProps>) {
  return (
    <button 
      className={cn(defaultClassName, className)}
      onClick={onClick}
    >
      {children}
    </button>
  )
} 