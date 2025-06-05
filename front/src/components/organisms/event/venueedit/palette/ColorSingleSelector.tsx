'use client'

import { Color } from 'react-color'
import ColorPickerDialog from './ColorPickerDialog'
import { useState } from 'react'

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
      <div className="grid grid-cols-8 lg:grid-cols-2 gap-2">
        <div className="col-span-1">
          <span>テキスト色</span>
        </div>
        <div className="col-span-1">
          <button
            type="button"
            className="w-full h-6 rounded border border-gray-300 shadow-sm"
            style={{ backgroundColor: selectedColor.toString() }}
            onClick={() => setIsTextColorOpen(true)}
          />
        </div>
        <div className="col-span-1">
          <span>背景色</span>
        </div>
        <div className="col-span-1">
          <button
            type="button"
            className="w-full h-6 rounded border border-gray-300 shadow-sm"
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