import { CommonViewIconUnit } from "@/types/common/view";
import { useMemo } from "react";

/**
 * アイコンユニットの値のマッピング
 */
export type IconUnitValueMapping = Omit<CommonViewIconUnit, 'name'>;

/**
 * アイコンユニットのアップデートロジック
 * 
 * @param baseUnits ベースとなるアイコンユニットリスト（constantとして指定）
 * @param mapping アイコンユニットの値のマッピング兼フィルタリング（ビューモデルから指定）
 * @returns アイコンユニットリスト
 */
export function useIconUnitList(
  baseUnits: CommonViewIconUnit[],
  mapping: Record<string, IconUnitValueMapping>
): CommonViewIconUnit[] {
  return useMemo(() => {
    return baseUnits
      .map((unit) => {
        const value = mapping[unit.name];
        if (!value) return unit;

        return {
          ...unit,
          ...value,
        };
      });
  }, [baseUnits, mapping]);
}
