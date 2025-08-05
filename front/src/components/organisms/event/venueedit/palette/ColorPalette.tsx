'use client'

import ColorAddButton from '@/components/organisms/event/venueedit/palette/ColorAddButton'
import ColorButton from '@/components/organisms/event/venueedit/palette/ColorButton'
import { Color } from 'react-color'
import ToggleToEraseButton from '@/components/organisms/event/venueedit/palette/ToggleToEraseButton'
import { useSubToolSelection } from '@/hooks/event/venueedit/useSubToolSelection'

interface ColorPaletteProps {
  colors: Color[]
  selectedColor: Color
  onColorSelect: (color: Color) => void
  onAddColor?: (color: Color) => void
  onDeleteColor: (color: Color) => void
}

export default function ColorPalette({
  colors,
  selectedColor,
  onColorSelect,
  onAddColor,
  onDeleteColor,
}: Readonly<ColorPaletteProps>) {
  const { toggleToGenerateTool, isDrawingTool } = useSubToolSelection()

  return (
    <div className="grid grid-cols-12 lg:grid-cols-4 xl:grid-cols-8 gap-2">
      {colors.map((color) => (
        <ColorButton
          key={color.toString()}
          color={color}
          isSelected={isDrawingTool && selectedColor === color}
          onClick={() => {onColorSelect(color); toggleToGenerateTool()}} // 色の変更とツールを変更を同時に行う
          onDelete={() => onDeleteColor(color)}
        />
      ))}
      {onAddColor && <ColorAddButton onAddColor={onAddColor} />}
      {<ToggleToEraseButton isSelected={!isDrawingTool} />}
    </div>
  )
} 