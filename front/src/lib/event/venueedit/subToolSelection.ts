import { VenueEditTool, EditorToolPair, EDITOR_TOOL_PAIR_TREE } from "@/types/tool";

/**
 * ツールが描画系か消去系かを判定する関数
 * 
 * @param tool 判定するツール 
 * @returns 描画系の場合はtrue、消去系の場合はfalse
 */
export function isDrawingTool(tool: VenueEditTool): boolean {
  // EDITOR_TOOL_PAIR_TREEから全てのeraseツールを取得
  const eraseTools: VenueEditTool[] = Object.values(EDITOR_TOOL_PAIR_TREE).map((pair: EditorToolPair) => pair.erase);
  
  return !eraseTools.includes(tool);
}

/**
 * 現在選択しているツールがどのツールタイプに属するかを求める関数
 * 
 * @param tool 判定するツール
 * @returns ツールタイプの名前（"ピクセル", "丸オブジェクト", "テキストボックス"）またはnull
 */
export function getToolType(tool: VenueEditTool): string | null {
  // EDITOR_TOOL_PAIR_TREEから該当するツールタイプを探す
  const toolType = Object.entries(EDITOR_TOOL_PAIR_TREE).find(
    ([_, pair]) => pair.generate === tool || pair.erase === tool
  );
  
  return toolType ? toolType[1].name : null;
}