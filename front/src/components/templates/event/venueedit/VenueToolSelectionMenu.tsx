import React from 'react'
import { VenueEditTool } from '@/types/tool'
import ToolButtonGroup from '@/components/organisms/event/venueedit/tools/ToolButtonGroup'

interface VenueToolSelectionMenuProps {
  onToolSelect: (tool: VenueEditTool) => void
}

export default function VenueToolSelectionMenu({ onToolSelect }: Readonly<VenueToolSelectionMenuProps>) {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center border border-gray-900 rounded-lg">
      <div className="h-full w-full flex flex-col">
        <div className="flex-none p-4">
          <span className="text-lg font-semibold">ツール選択</span>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <ToolButtonGroup onToolSelect={onToolSelect} />
        </div>
      </div>
    </div>
  )
} 