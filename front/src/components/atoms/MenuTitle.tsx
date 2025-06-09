import { cn } from "@/lib/shadcn/utils";

/**
 * メニュータイトルを表示するコンポーネントのprops
 */
interface Props {
  title: string;
  className?: string | string[];
}

/**
 * メニュータイトルを表示するコンポーネント
 * 
 * このコンポーネントは、メニューで使用するタイトルを表示します。
 * 
 * スタイルのカスタマイズ:
 * - className: タイトルのスタイルをカスタマイズします（例：フォントサイズ、色、太さなど）
 * 
 * 使用例:
 * ```tsx
 * <MenuTitle
 *   title="ユーザー設定"
 *   className={["font-bold"]}
 * />
 * ```
 * 
 * @param title - 表示するタイトルテキスト
 * @param className - タイトルに適用する追加のクラス名
 * @returns メニュータイトルのコンポーネント
 */
export default function MenuTitle({ 
  title, 
  className 
}: Readonly<Props>) {
  return (
    <div className={cn("break-words whitespace-pre-wrap overflow-hidden text-ellipsis", className)}>
      {title}
    </div>
  )
} 