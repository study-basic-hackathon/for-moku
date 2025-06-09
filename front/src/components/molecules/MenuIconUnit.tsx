import { LucideIconType } from "@/types/ui/icon";
import { cn } from "@/lib/shadcn/utils";
import MenuIcon from "@/components/atoms/MenuIcon";
import MenuTitle from "@/components/atoms/MenuTitle";

/**
 * メニューの行を表示するコンポーネントのprops
 */
interface Props {
  title: string;
  icon?: LucideIconType;
  divClassName?: string | string[];
  iconClassName?: string | string[];
  titleClassName?: string | string[];
}

/**
 * デフォルトのクラス名 (flex, 中央揃え, アイコンとタイトルの間隔2rem)
 */
const defaultDivClassName = ["flex", "items-center", "gap-2", "p-2"];

/**
 * メニューの行を表示するコンポーネント
 * 
 * このコンポーネントは、アイコンとタイトルを横並びで表示するメニュー行を作成します。
 * デフォルトでは、アイコンは40x40pxのサイズで表示され、タイトルはアイコンの右側に配置されます。
 *  
 * スタイルのカスタマイズ:
 * - divClassName: メニュー行全体のスタイルをカスタマイズします（例：背景色、パディング、ホバー効果など）
 * - iconClassName: アイコンのスタイルをカスタマイズします（例：色、サイズ、アニメーションなど）
 * - titleClassName: タイトルのスタイルをカスタマイズします（例：フォントサイズ、色、太さなど）
 * 
 * 使用例:
 * ```tsx
 * <MenuIconUnit
 *   icon={User}
 *   title="ユーザー設定"
 *   divClassName={["hover:bg-gray-100", "rounded-lg"]}
 *   iconClassName={["text-blue-500"]}
 *   titleClassName={["font-bold"]}
 * />
 * ```
 * 
 * @param icon - 表示するアイコン（Lucideアイコン）
 * @param title - 表示するタイトルテキスト
 * @param divClassName - メニュー行のコンテナに適用する追加のクラス名
 * @param iconClassName - アイコンに適用する追加のクラス名
 * @param titleClassName - タイトルに適用する追加のクラス名
 * @returns メニュー行のコンポーネント
 */
export default function MenuIconUnit({ 
  icon, 
  title, 
  divClassName,
  iconClassName,
  titleClassName 
}: Readonly<Props>) {
  return (
    <div className={cn(defaultDivClassName, divClassName)}>
      {icon && <MenuIcon icon={icon} className={iconClassName} />}
      <MenuTitle title={title} className={titleClassName} />
    </div>
  )
}
