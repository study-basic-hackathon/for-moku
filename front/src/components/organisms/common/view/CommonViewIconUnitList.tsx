import { CommonViewIconUnit as CommonViewIconUnitType } from "@/types/common/view";
import { cn } from "@/lib/shadcn/utils";
import ViewIconUnit from "./ViewIconUnit";

interface Props {
  units: CommonViewIconUnitType[];
  containerClassName?: string;
}

const defaultContainerClassName = "flex flex-col gap-4";

/**
 * 共通のビューで使える、アイコンリストを表示するコンポーネントのprops
 *
 * - units: アイコンリストのユニット
 * - containerClassName: コンテナのスタイルをカスタマイズします（例：背景色、パディング、ホバー効果など）
 * 
 * 使用例:
 * ```tsx
 * <CommonViewIconUnitList
 *   units={eventViewIconUnits}
 *   containerClassName="flex justify-center items-center"
 * />
 */
export default function CommonViewIconUnitList({ units, containerClassName }: Readonly<Props>) {
  return (
    <div className={cn(defaultContainerClassName, containerClassName)}>
      {units.map((unit, index) => (
        <ViewIconUnit key={`${unit.name}-${index}`} unit={unit} index={index} />
      ))}
    </div>
  );
} 