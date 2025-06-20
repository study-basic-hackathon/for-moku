import { useCallback, useState } from "react"
import { EDITOR_TOOL_PAIR_TREE, VenueEditTool } from "@/types/tool"

/**
 * サブツール選択を管理するフック
 * 
 * @returns サブツールの状態と操作関数
 * - selectedTool: 現在選択されているツール
 * - toggleToGenerateTool: 生成系ツールに切り替える関数
 * - toggleToEraseTool: 消去系ツールに切り替える関数
 * - setDrawToolFromToolKey: ツールキーから描画系ツールに切り替える関数
 */
export const useSubToolSelection = () => {
  const [selectedTool, setSelectedTool] = useState<VenueEditTool>("ピクセル塗りつぶし")

  const toggleToGenerateTool = useCallback(() => {
    // EDITOR_TOOL_PAIR_TREEから該当するペアを探す
    const toolPair = Object.values(EDITOR_TOOL_PAIR_TREE).find(
      pair => pair.generate === selectedTool || pair.erase === selectedTool
    );
    
    if (toolPair) {
      setSelectedTool(toolPair.generate);
    }
  }, [selectedTool])

  const toggleToEraseTool = useCallback(() => {
    // EDITOR_TOOL_PAIR_TREEから該当するペアを探す
    const toolPair = Object.values(EDITOR_TOOL_PAIR_TREE).find(
      pair => pair.generate === selectedTool || pair.erase === selectedTool
    );
    
    if (toolPair) {
      setSelectedTool(toolPair.erase);
    }
  }, [selectedTool])

  const setDrawToolFromToolKey = useCallback((toolKey: keyof typeof EDITOR_TOOL_PAIR_TREE) => {
    const toolPair = EDITOR_TOOL_PAIR_TREE[toolKey]
    
    if (toolPair) {
      setSelectedTool(toolPair.generate)
    }
  }, [])

  return {
    selectedTool,
    toggleToGenerateTool,
    toggleToEraseTool,
    setDrawToolFromToolKey
  }
}