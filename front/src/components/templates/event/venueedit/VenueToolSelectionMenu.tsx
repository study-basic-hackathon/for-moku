import React from 'react'
import {EditorToolPairKey } from '@/types/tool'
import ToolButtonGroup from '@/components/organisms/event/venueedit/tools/ToolButtonGroup'

interface VenueToolSelectionMenuProps {
  setDrawToolFromToolKey: (toolKey: EditorToolPairKey) => void
}

export default function VenueToolSelectionMenu({ setDrawToolFromToolKey }: Readonly<VenueToolSelectionMenuProps>) {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center border border-gray-900 rounded-lg">
      <div className="h-full w-full flex flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          <ToolButtonGroup setDrawToolFromToolKey={setDrawToolFromToolKey} />
        </div>
      </div>
    </div>
  )
} 