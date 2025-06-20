import React from 'react'
import {EditorToolPairKey, VenueEditTool } from '@/types/tool'
import ToolButtonGroup from '@/components/organisms/event/venueedit/tools/ToolButtonGroup'

interface VenueToolSelectionMenuProps {
  selectedTool: VenueEditTool
  setDrawToolFromToolKey: (toolKey: EditorToolPairKey) => void
}

/**
 * ツール選択メニュー
 * 
 * @param selectedTool 現在選択されているツール
 * @param setDrawToolFromToolKey ツール選択時のコールバック
 * @returns ツール選択メニュー
 */
export default function VenueToolSelectionMenu({ selectedTool, setDrawToolFromToolKey }: Readonly<VenueToolSelectionMenuProps>) {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center border border-gray-900 rounded-lg">
      <div className="h-full w-full flex flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          <ToolButtonGroup selectedTool={selectedTool} setDrawToolFromToolKey={setDrawToolFromToolKey} />
        </div>
      </div>
    </div>
  )
} 