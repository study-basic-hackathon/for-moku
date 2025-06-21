'use client';

import { LucideIconType } from "@/types/ui/icon";
import { cn } from "@/lib/shadcn/utils";
import MenuIcon from "@/components/atoms/menu/MenuIcon";
import MenuTitle from "@/components/atoms/menu/MenuTitle";
import { useState } from "react";

/**
 * メニューの行を表示するコンポーネントのprops
 */
interface Props {
  title: string;
  icon?: LucideIconType;
  onClick: () => Promise<void>;
  divClassName?: string | string[];
  iconClassName?: string | string[];
  titleClassName?: string | string[];
}

/**
 * デフォルトのクラス名 (flex, 中央揃え, アイコンとタイトルの間隔2rem, ホバー効果)
 */
const defaultDivClassName = ["flex", "items-center", "gap-2", "hover:bg-gray-100", "rounded-lg", "transition-colors", "cursor-pointer", "p-2"];

/**
 * メニューの行を表示するコンポーネント（クリック可能）
 * 
 * このコンポーネントは、アイコンとタイトルを横並びで表示するメニュー行を作成し、クリック可能なボタンとして機能します。
 * デフォルトでは、アイコンは40x40pxのサイズで表示され、タイトルはアイコンの右側に配置されます。
 * ホバー時には背景色が変化し、視覚的なフィードバックを提供します。
 *  
 * スタイルのカスタマイズ:
 * - divClassName: メニュー行全体のスタイルをカスタマイズします（例：背景色、パディング、ホバー効果など）
 * - iconClassName: アイコンのスタイルをカスタマイズします（例：色、サイズ、アニメーションなど）
 * - titleClassName: タイトルのスタイルをカスタマイズします（例：フォントサイズ、色、太さなど）
 * 
 * 使用例:
 * ```tsx
 * <MenuIconClickableUnit
 *   icon={User}
 *   title="ユーザー設定"
 *   onClick={() => console.log("clicked")}
 *   divClassName={["hover:bg-blue-100"]}
 *   iconClassName={["text-blue-500"]}
 *   titleClassName={["font-bold"]}
 * />
 * ```
 * 
 * @param icon - 表示するアイコン（Lucideアイコン）
 * @param title - 表示するタイトルテキスト
 * @param onClick - クリック時のコールバック関数
 * @param divClassName - メニュー行のコンテナに適用する追加のクラス名
 * @param iconClassName - アイコンに適用する追加のクラス名
 * @param titleClassName - タイトルに適用する追加のクラス名
 * @returns クリック可能なメニュー行のコンポーネント
 */
export default function MenuIconClickableUnit({ 
  icon, 
  title, 
  onClick,
  divClassName,
  iconClassName,
  titleClassName 
}: Readonly<Props>) {
  const [isPending, setIsPending] = useState(false);

  const handleClick = async () => {
    if (isPending) return;
    setIsPending(true);
    try {
      await onClick();
    } finally {
      setIsPending(false);
    }
  };

  return (
    <button 
      className={cn(
        defaultDivClassName,
        isPending && "opacity-50 cursor-not-allowed",
        divClassName
      )}
      onClick={handleClick}
      disabled={isPending}
      type="button"
    >
      {icon && <MenuIcon icon={icon} className={iconClassName} />}
      <MenuTitle title={title} className={titleClassName} />
    </button>
  )
} 