import { VENUE_EDIT_TOOLS, VenueEditTool } from '@/types/tool'
import MonoClomeButton from '@/components/atoms/button/MonoClomeButton'

interface ToolButtonGroupProps {
  onToolSelect: (tool: VenueEditTool) => void
}

export default function ToolButtonGroup({ onToolSelect }: Readonly<ToolButtonGroupProps>) {
  return (
    <div className="grid grid-cols-6 xl:grid-cols-1 gap-2">
      <div className="col-span-1 grid grid-cols-1 xl:grid-cols-2 grid-rows-2 xl:grid-rows-1 gap-2">
        {VENUE_EDIT_TOOLS.slice(0, 2).map((tool) => (
          <MonoClomeButton 
            key={tool}
            onClick={() => onToolSelect(tool)}
          >
            {tool}
          </MonoClomeButton>
        ))}
      </div>

      <div className="col-span-1 grid grid-cols-1 xl:grid-cols-2 grid-rows-2 xl:grid-rows-1 gap-2">
        {VENUE_EDIT_TOOLS.slice(2, 4).map((tool) => (
          <MonoClomeButton 
            key={tool}
            onClick={() => onToolSelect(tool)}
          >
            {tool}
          </MonoClomeButton>
        ))}
      </div>

      <div className="col-span-1 grid grid-cols-1 xl:grid-cols-2 grid-rows-2 xl:grid-rows-1 gap-2">
        {VENUE_EDIT_TOOLS.slice(4, 6).map((tool) => (
          <MonoClomeButton 
            key={tool}
            onClick={() => onToolSelect(tool)}
          >
            {tool}
          </MonoClomeButton>
        ))}
      </div>

      <div className="col-span-1 grid grid-cols-1 xl:grid-cols-2 grid-rows-2 xl:grid-rows-1 gap-2">
        {VENUE_EDIT_TOOLS.slice(6, 8).map((tool) => (
          <MonoClomeButton 
            key={tool}
            onClick={() => onToolSelect(tool)}
          >
            {tool}
          </MonoClomeButton>
        ))}
      </div>

      <div className="col-span-1 grid grid-cols-1 xl:grid-cols-2 grid-rows-2 xl:grid-rows-1 gap-2">
        {VENUE_EDIT_TOOLS.slice(8, 10).map((tool) => (
          <MonoClomeButton 
            key={tool}
            onClick={() => onToolSelect(tool)}
          >
            {tool}
          </MonoClomeButton>
        ))}
      </div>
    </div>
  )
} 