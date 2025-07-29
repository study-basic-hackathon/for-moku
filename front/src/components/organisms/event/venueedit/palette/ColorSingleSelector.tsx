'use client'

import { Color } from 'react-color'
import { useState } from 'react'
import ColorPickerDialog from '@/components/organisms/event/venueedit/palette/ColorPickerDialog'
import ToggleToGenerateButton from '@/components/organisms/event/venueedit/palette/ToggleToGenerateButton'
import ToggleToEraseButton from '@/components/organisms/event/venueedit/palette/ToggleToEraseButton'
import { useSubToolSelection } from '@/hooks/event/venueedit/useSubToolSelection'

interface ColorSingleSelectorProps {
  selectedColor: Color
  selectedColorBackGround: Color
  setSelectedColor: (color: Color) => void
  setSelectedColorBackGround: (color: Color) => void
}

export default function ColorSingleSelector({
  selectedColor,
  selectedColorBackGround,  
  setSelectedColor,
  setSelectedColorBackGround,
}: Readonly<ColorSingleSelectorProps>) {
  const { isDrawingTool } = useSubToolSelection()
  const [isTextColorOpen, setIsTextColorOpen] = useState(false)
  const [isBackgroundColorOpen, setIsBackgroundColorOpen] = useState(false)

  const handleTextColorChange = (hex: string) => {
    setSelectedColor(hex as Color)
  }

  const handleBackgroundColorChange = (hex: string) => {
    setSelectedColorBackGround(hex as Color)
  }

  return (
    <>
      <div className="flex gap-2 mb-4 justify-center">
        <ToggleToGenerateButton
          className="w-1/4 h-8"
          isSelected={isDrawingTool}
        />
        <ToggleToEraseButton
          className="w-1/4 h-8"
          isSelected={!isDrawingTool}
        />
      </div>
      <div className="grid grid-cols-4 lg:grid-cols-2 gap-2 justify-center">
        <div className="col-span-1 text-left">
          <span>テキスト色</span>
        </div>
        <div className="col-span-1">
          <button
            type="button"
            className="w-1/2 h-6 rounded border border-gray-300 shadow-sm"
            style={{ backgroundColor: selectedColor.toString() }}
            onClick={() => setIsTextColorOpen(true)}
          />
        </div>
        <div className="col-span-1 text-left">
          <span>背景色</span>
        </div>
        <div className="col-span-1">
          <button
            type="button"
            className="w-1/2 h-6 rounded border border-gray-300 shadow-sm"
            style={{ backgroundColor: selectedColorBackGround.toString() }}
            onClick={() => setIsBackgroundColorOpen(true)}
          />
        </div>
      </div>
      <ColorPickerDialog
        isOpen={isTextColorOpen}
        onOpenChange={setIsTextColorOpen}
        color={selectedColor.toString()}
        onColorChange={handleTextColorChange}
        onAdd={() => setIsTextColorOpen(false)}
      />
      <ColorPickerDialog
        isOpen={isBackgroundColorOpen}
        onOpenChange={setIsBackgroundColorOpen}
        color={selectedColorBackGround.toString()}
        onColorChange={handleBackgroundColorChange}
        onAdd={() => setIsBackgroundColorOpen(false)}
      />
    </>
  )
} 