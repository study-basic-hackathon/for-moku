'use client'

interface ColorButtonProps {
  color: string
  isSelected: boolean
  onClick: () => void
  onDelete: () => void
}

export default function ColorButton({ color, isSelected, onClick, onDelete }: Readonly<ColorButtonProps>) {
  return (
    <div className="relative w-full">
      <button
        type="button"
        className={`
          aspect-square rounded cursor-pointer border-0 w-full
          ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
        `}
        style={{ backgroundColor: color }}
        onClick={onClick}
      />
      <button
        type="button"
        onClick={onDelete}
        className="
          absolute top-1 left-1
          w-4 h-4 rounded-full bg-gray-500 text-white
          flex items-center justify-center
          hover:bg-red-600
          z-10
          text-xs
          font-bold
          shadow-md
          border
          border-white
        "
      >
        ×
      </button>
    </div>
  )
} 