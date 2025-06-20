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

  // 生成系ツールに切り替える
  // セッターには現在のツールを参照して変換する関数を受け取ることができる
  // 依存配列に現在の配列をいれて書くよりも、効率が上がるためこちらの方が望ましいとのこと
  const toggleToGenerateTool = useCallback(() => {
    setSelectedTool(prevTool => {
      const toolPair = Object.values(EDITOR_TOOL_PAIR_TREE).find(
        pair => pair.generate === prevTool || pair.erase === prevTool
      );
      
      return toolPair ? toolPair.generate : prevTool;
    });
  }, [])

  // 消去系ツールに切り替える関数
  const toggleToEraseTool = useCallback(() => {
    setSelectedTool(prevTool => {
      const toolPair = Object.values(EDITOR_TOOL_PAIR_TREE).find(
        pair => pair.generate === prevTool || pair.erase === prevTool
      );
      
      return toolPair ? toolPair.erase : prevTool;
    });
  }, [])

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