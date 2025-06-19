import { VENUE_EDIT_TOOLS, VenueEditTool } from '@/types/tool'
import MonoClomeButton from '@/components/atoms/button/MonoClomeButton'

interface ToolButtonGroupProps {
  onToolSelect: (tool: VenueEditTool) => void
}

/**
 * ツールボタングループ
 * 
 * @param onToolSelect ツール選択時のコールバック
 * @returns ツールボタングループ
 */
export default function ToolButtonGroup({ onToolSelect }: Readonly<ToolButtonGroupProps>) {
  return (
    <div className="grid grid-cols-6 xl:grid-cols-1 gap-2">
      {VENUE_EDIT_TOOLS.map((tool) => (
        <MonoClomeButton 
          key={tool}
          onClick={() => onToolSelect(tool)}
          className="col-span-1 grid grid-cols-1 gap-2"
          >
          {tool}
        </MonoClomeButton>
      ))}
    </div>
  )
}