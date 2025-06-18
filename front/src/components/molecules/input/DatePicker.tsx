"use client"

import { Button } from "@/components/atoms/shadcn/button"
import { Calendar } from "@/components/atoms/shadcn/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/atoms/shadcn/popover"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { ja } from "date-fns/locale"

interface Props {
  value: Date | undefined
  onChange: (date: Date | undefined) => void
  placeholder?: string
  className?: string
}

export function DatePicker({ value, onChange, placeholder = "日付を選択", className = "w-48" }: Readonly<Props>) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`justify-between font-normal ${className}`}
        >
          {value ? value.toLocaleDateString() : placeholder}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          locale={ja}
          onSelect={(date) => {
            onChange(date)
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
