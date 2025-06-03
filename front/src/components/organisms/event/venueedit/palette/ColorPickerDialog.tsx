'use client'

import { ChromePicker } from 'react-color'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/atoms/shadcn/dialog'
import { Button } from '@/components/atoms/shadcn/button'

interface ColorPickerDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  color: string
  onColorChange: (color: string) => void
  onAdd: () => void
}

export default function ColorPickerDialog({
  isOpen,
  onOpenChange,
  color,
  onColorChange,
  onAdd
}: Readonly<ColorPickerDialogProps>) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[300px]">
        <DialogHeader>
          <DialogTitle>色を追加</DialogTitle>
        </DialogHeader>
        <div className="py-4 w-full flex justify-center items-center">
          <ChromePicker
            color={color}
            onChange={(color) => onColorChange(color.hex)}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            キャンセル
          </Button>
          <Button onClick={onAdd}>
            追加
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 