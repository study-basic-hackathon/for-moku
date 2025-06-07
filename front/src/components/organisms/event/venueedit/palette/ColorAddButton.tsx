'use client'

import { useState } from 'react'
import PlusButton from '@/components/molecules/button/PlusButton'
import ColorPickerDialog from './ColorPickerDialog'
import { Color, color } from '@/types/color'

interface ColorAddButtonProps {
  onAddColor: (color: Color) => void
  disabled?: boolean
}

export default function ColorAddButton({ onAddColor, disabled }: Readonly<ColorAddButtonProps>) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState('#000000')

  const handleAddColor = () => {
    // ChromePickerから受け取る色は常にhex形式（#RRGGBB）
    onAddColor(selectedColor as Color)
    setIsOpen(false)
  }

  const handleColorChange = (hex: string) => {
    // ChromePickerから受け取る色は常にhex形式（#RRGGBB）
    setSelectedColor(hex)
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