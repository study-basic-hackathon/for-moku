'use client'

import ColorAddButton from '@/components/organisms/event/venueedit/palette/ColorAddButton'
import ColorButton from '@/components/organisms/event/venueedit/palette/ColorButton'
import { Color } from '@/types/color'

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
  onDeleteColor
}: Readonly<ColorPaletteProps>) {
  return (
    <div className="grid grid-cols-12 lg:grid-cols-4 gap-2">
      {colors.map((color) => (
        <ColorButton
          key={color.toString()}
          color={color}
          isSelected={selectedColor === color}
          onClick={() => onColorSelect(color)}
          onDelete={() => onDeleteColor(color)}
        />
      ))}
      {onAddColor && <ColorAddButton onAddColor={onAddColor} />}
    </div>
  )
} 