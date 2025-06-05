import { LucideIconType } from "@/types/ui/icon";
import { cn } from "@/lib/shadcn/utils";

/**
 * メニューアイコンを表示するコンポーネントのprops
 */
interface Props {
  icon: LucideIconType;
  className?: string | string[];
}

/**
 * デフォルトのアイコンのクラス名 (40x40px, アイコンのサイズを固定)
 */
const defaultIconClassName = ["w-10", "h-10", "shrink-0"];

/**
 * メニューアイコンを表示するコンポーネント
 * 
 * このコンポーネントは、メニューで使用するアイコンを表示します。
 * デフォルトでは、40x40pxのサイズで表示され、サイズは固定されます。
 * 
 * スタイルのカスタマイズ:
 * - className: アイコンのスタイルをカスタマイズします（例：色、サイズ、アニメーションなど）
 * 
 * 使用例:
 * ```tsx
 * <MenuIcon
 *   icon={User}
 *   className={["text-blue-500"]}
 * />
 * ```
 * 
 * @param icon - 表示するアイコン（Lucideアイコン）
 * @param className - アイコンに適用する追加のクラス名
 * @returns メニューアイコンのコンポーネント
 */
export default function MenuIcon({ 
  icon: Icon, 
  className 
}: Readonly<Props>) {
  return (
    <Icon className={cn(defaultIconClassName, className)}/>
  )
} 