import { EDITOR_TOOL_PAIR_TREE, EditorToolPairKey } from '@/types/tool'
import MonoClomeButton from '@/components/atoms/button/MonoClomeButton'

interface ToolButtonGroupProps {
  setDrawToolFromToolKey: (toolKey: keyof typeof EDITOR_TOOL_PAIR_TREE) => void
}

/**
 * ツールボタングループ
 * 
 * @param onToolSelect ツール選択時のコールバック
 * @returns ツールボタングループ
 */
export default function ToolButtonGroup({ setDrawToolFromToolKey }: Readonly<ToolButtonGroupProps>) {
  return (
    <div className="grid grid-cols-3 xl:grid-cols-1 gap-2 justify-center">
      {Object.entries(EDITOR_TOOL_PAIR_TREE).map(([toolKey, toolPair]) => (
        <MonoClomeButton 
          key={toolKey}  
          onClick={() => setDrawToolFromToolKey(toolKey as EditorToolPairKey)}
          className="col-span-1 grid grid-cols-1 gap-2"
          >
          {toolPair.name}
        </MonoClomeButton>
      ))}
    </div>
  )
} 