'use client';

import { CommonViewIconUnit as CommonViewIconUnitType } from "@/types/common/view";
import MenuIconUnit from "@/components/molecules/menu/MenuIconUnit";
import MenuIconLinkUnit from "@/components/molecules/menu/MenuIconLinkUnit";
import MenuIconClickableUnit from "@/components/molecules/menu/MenuIconClickableUnit";
import { LucideIconType } from "@/types/ui/icon";
import * as LucideIcons from "lucide-react";

/**
 * ビューのアイコンを表示するコンポーネントのprops
 * 
 * - unit: ビューのオブジェクト
 * - index: インデックス(任意)
 */
interface Props {
  unit: CommonViewIconUnitType;
  index?: number;
}

/**
 * ビューのアイコンを表示するコンポーネント
 * 
 * このコンポーネントは、ビューのアイコンを表示します。
 * 
 * 要素が決定されるルールは以下の通り
 * - unitがnullまたはundefinedの場合にはレンダリングしない
 * - descriptionが存在しないまたは空文字の場合にはレンダリングしない
 * - hrefが存在する場合はMenuIconLinkUnit
 * - onClickが存在する場合はMenuIconClickableUnit
 * - それ以外はMenuIconUnit
 * 
 * 使用例:
 * ```tsx
 * <ViewIconUnit
 *   unit={unit}
 *   index={index}
 * />
 * ```
 * 
 * @param unit - ビューのオブジェクト
 */
export default function ViewIconUnit({ unit, index=0 }: Readonly<Props>) {
  if (!unit) return null;
  
  // descriptionが存在しないまたは空文字の場合にはレンダリングしない
  if (!unit.description || unit.description === "") return null;

  let Icon: LucideIconType | undefined;
  if (unit.iconName) {
    Icon = LucideIcons[unit.iconName as keyof typeof LucideIcons] as LucideIconType;
  }

  const commonProps = {
    title: unit.description || unit.name,
    iconClassName: unit.iconClassName,
    titleClassName: unit.descriptionClassName,
    divClassName: unit.divClassName,
  };

  if (unit.href) {
    return (
      <MenuIconLinkUnit
        key={`${unit.name}-${index}`}
        icon={Icon}
        href={unit.href}
        {...commonProps}
      />
    );
  }
  if (unit.onClick) {
    return (
      <MenuIconClickableUnit
        key={`${unit.name}-${index}`}
        icon={Icon}
        onClick={unit.onClick}
        {...commonProps}
      />
    );
  }
  return (
    <MenuIconUnit
      key={`${unit.name}-${index}`}
      icon={Icon}
      {...commonProps}
    />
  );
} 