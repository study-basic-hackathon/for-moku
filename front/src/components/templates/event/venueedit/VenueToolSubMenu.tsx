import React, { useMemo } from 'react'
import ColorPalette from '@/components/organisms/event/venueedit/palette/ColorPalette'
import { Color } from 'react-color'
import { PIXEL_TOOLS, VenueEditTool, PixelTool, TEXT_TOOLS, TextTool } from '@/types/tool'
import ColorSingleSelector from '@/components/organisms/event/venueedit/palette/ColorSingleSelector'
import { getToolType } from '@/lib/event/venueedit/subToolSelection'

interface VenueToolSubMenuProps {
  selectedTool: VenueEditTool
  toggleToGenerateTool: () => void
  toggleToEraseTool: () => void
  selectedColor: Color
  setSelectedColor: (color: Color) => void
  selectedColorBackGround: Color
  setSelectedColorBackGround: (color: Color) => void
  colorPalette: Color[]
  onAddColor: (color: Color) => void
  onDeleteColor: (color: Color) => void
}

function isPixelTool(tool: VenueEditTool): tool is PixelTool {
  return (PIXEL_TOOLS as readonly string[]).includes(tool)
}

function isTextTool(tool: VenueEditTool): tool is TextTool {
  return (TEXT_TOOLS as readonly string[]).includes(tool)
}

export default function VenueToolSubMenu({ 
  selectedTool,
  toggleToGenerateTool,
  toggleToEraseTool,
  selectedColor, 
  setSelectedColor,
  selectedColorBackGround,
  setSelectedColorBackGround,
  colorPalette,
  onAddColor,
  onDeleteColor
}: Readonly<VenueToolSubMenuProps>) {
  const toolType = useMemo(() => getToolType(selectedTool), [selectedTool]);

  return (
    <div className="h-full w-full flex flex-col justify-center items-center border border-gray-900 rounded-lg">
      <div className="h-full w-full flex flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          <div className="p-2 bg-gray-100 rounded mb-4">
            <span className="text-sm">現在のツール: {toolType ?? 'なし'}</span>
          </div>
          {isPixelTool(selectedTool) && (
            <ColorPalette
              onColorSelect={setSelectedColor}
              selectedColor={selectedColor}
              colors={colorPalette}
              onAddColor={onAddColor}
              onDeleteColor={onDeleteColor}
              selectedTool={selectedTool}
              toggleToGenerateTool={toggleToGenerateTool}
              toggleToEraseTool={toggleToEraseTool}
            />
          )}
          {isTextTool(selectedTool) && (
            <ColorSingleSelector
              selectedColor={selectedColor}
              selectedColorBackGround={selectedColorBackGround}
              setSelectedColor={setSelectedColor}
              setSelectedColorBackGround={setSelectedColorBackGround}
              selectedTool={selectedTool}
              toggleToGenerateTool={toggleToGenerateTool}
              toggleToEraseTool={toggleToEraseTool}
            />
          )}
        </div>
      </div>
    </div>
  )
} 