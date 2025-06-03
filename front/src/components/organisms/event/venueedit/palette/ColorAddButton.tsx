'use client'

import { useState } from 'react'
import PlusButton from '@/components/molecules/button/PlusButton'
import ColorPickerDialog from './ColorPickerDialog'
import { Color } from 'react-color'

interface ColorAddButtonProps {
  onAddColor: (color: Color) => void
  disabled?: boolean
}

export default function ColorAddButton({ onAddColor, disabled }: Readonly<ColorAddButtonProps>) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState<Color>('#000000')

  const handleAddColor = () => {
    // ChromePickerから受け取る色は常にhex形式（#RRGGBB）
    onAddColor(selectedColor)
    setIsOpen(false)
  }

  const handleColorChange = (color: Color) => {
    // ChromePickerから受け取る色は常にhex形式（#RRGGBB）
    setSelectedColor(color)
  }

  return (
    <>
      <PlusButton
        onClick={() => setIsOpen(true)}
        disabled={disabled}
      />
      <ColorPickerDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        color={selectedColor}
        onColorChange={handleColorChange}
        onAdd={handleAddColor}
      />
    </>
  )
} 