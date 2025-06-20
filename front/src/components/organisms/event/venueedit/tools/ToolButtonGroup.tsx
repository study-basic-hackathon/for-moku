import { EDITOR_TOOL_PAIR_TREE, EditorToolPairKey, VenueEditTool } from '@/types/tool'
import MonoClomeButton from '@/components/atoms/button/MonoClomeButton'
import { useCallback } from 'react'

interface ToolButtonGroupProps {
  selectedTool: VenueEditTool
  setDrawToolFromToolKey: (toolKey: keyof typeof EDITOR_TOOL_PAIR_TREE) => void
}

/**
 * ツールボタングループ
 * 
 * @param selectedTool 現在選択されているツール
 * @param setDrawToolFromToolKey ツール選択時のコールバック
 * @returns ツールボタングループ
 */
export default function ToolButtonGroup({ selectedTool, setDrawToolFromToolKey }: Readonly<ToolButtonGroupProps>) {
  
  // 現在選択されているツールがどのツールタイプに属するかを求める関数
  const isSelected = useCallback((toolKey: EditorToolPairKey) => {
    return selectedTool === EDITOR_TOOL_PAIR_TREE[toolKey].erase || selectedTool === EDITOR_TOOL_PAIR_TREE[toolKey].generate
  }, [selectedTool])

  // ツールボタングループ
  return (
    <div className="grid grid-cols-3 xl:grid-cols-1 gap-2 justify-center">
      {Object.entries(EDITOR_TOOL_PAIR_TREE).map(([toolKey, toolPair]) => (
        <MonoClomeButton 
          key={toolKey}  
          onClick={() => setDrawToolFromToolKey(toolKey as EditorToolPairKey)}
          className={`col-span-1 grid grid-cols-1 gap-2 ${isSelected(toolKey as EditorToolPairKey) ? "bg-blue-800" : ""}`}
        >
          {toolPair.name}
        </MonoClomeButton>
      ))}
    </div>
  )
} 