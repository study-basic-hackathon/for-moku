'use client'

import ColorAddButton from '@/components/organisms/event/venueedit/palette/ColorAddButton'
import ColorButton from '@/components/organisms/event/venueedit/palette/ColorButton'
import { VenueEditTool } from '@/types/tool'
import { isDrawingTool } from '@/lib/event/venueedit/subToolSelection'
import { Color } from 'react-color'
import ToggleToEraseButton from '@/components/organisms/event/venueedit/palette/ToggleToEraseButton'

interface ColorPaletteProps {
  colors: Color[]
  selectedColor: Color
  onColorSelect: (color: Color) => void
  onAddColor?: (color: Color) => void
  onDeleteColor: (color: Color) => void
  selectedTool: VenueEditTool
  toggleToGenerateTool: () => void
  toggleToEraseTool : () => void
}

export default function ColorPalette({
  colors,
  selectedColor,
  onColorSelect,
  onAddColor,
  onDeleteColor,
  selectedTool,
  toggleToGenerateTool,
  toggleToEraseTool
}: Readonly<ColorPaletteProps>) {

  return (
    <div className="grid grid-cols-12 lg:grid-cols-4 xl:grid-cols-8 gap-2">
      {colors.map((color) => (
        <ColorButton
          key={color.toString()}
          color={color}
          isSelected={isDrawingTool(selectedTool) && selectedColor === color}
          onClick={() => {onColorSelect(color); toggleToGenerateTool()}} // 色の変更とツールを変更を同時に行う
          onDelete={() => onDeleteColor(color)}
        />
      ))}
      {onAddColor && <ColorAddButton onAddColor={onAddColor} />}
      {toggleToEraseTool && <ToggleToEraseButton toggleToEraseTool={toggleToEraseTool} isSelected={!isDrawingTool(selectedTool)}/>}
    </div>
  )
} 