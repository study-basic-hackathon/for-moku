interface VenueToolSubMenuProps {
  selectedTool: string
}

export default function VenueToolSubMenu({ selectedTool }: VenueToolSubMenuProps) {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center border border-gray-900 rounded-lg">
      <div className="h-full w-full flex flex-col">
        <div className="flex-none p-4">
          <span className="text-lg font-semibold">サブメニュー</span>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="p-2 bg-gray-100 rounded">
            <span className="text-sm">現在のツール: {selectedTool || 'なし'}</span>
          </div>
        </div>
      </div>
    </div>
  )
} 