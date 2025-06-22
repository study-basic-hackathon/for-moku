import { ZoomIn, ZoomOut } from 'lucide-react'
import { MIN_NUM_PIXEL, MAX_NUM_PIXEL } from '@/lib/event/venueedit/constants'

interface Props {
  handleZoomIn: () => void
  handleZoomOut: () => void
  numPixel: number
  setNumPixel: (n: number) => void
  saveAction?: () => void
  isPending?: boolean
}

export default function VenueActionHeader({ 
  handleZoomIn, 
  handleZoomOut,
  numPixel,
  setNumPixel,
  saveAction,
  isPending
}: Readonly<Props>) {

  const handlePixelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (isNaN(value)) {
      return
    }
    if (value >= MIN_NUM_PIXEL && value <= MAX_NUM_PIXEL) {
      setNumPixel(value)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center border border-gray-900 mx-2 rounded-lg p-4 m-4 gap-4">
      <div className="items-center justify-between w-full grid grid-cols-4 lg:grid-cols-4 xl:grid-cols-2">
        <div className="col-span-3 xl:col-span-1 flex justify-between mx-2">
          <div className="flex space-x-2">
            {/* <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              元に戻す
            </button> */}
            <div className="flex items-center gap-2">
              <label htmlFor="pixel-size" className="text-sm">ピクセル数:</label>
              <input
                id="pixel-size"
                type="number"
                min={MIN_NUM_PIXEL}
                max={MAX_NUM_PIXEL}
                value={numPixel}
                onChange={handlePixelChange}
                className="w-16 px-2 py-1 border border-gray-300 rounded"
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <button 
              className="px-2 py-2 bg-gray-900 text-white rounded hover:bg-gray-600 flex items-center gap-2"
              onClick={handleZoomOut}
            >
              <ZoomOut size={20} />
            </button>
            <button 
              className="px-2 py-2 bg-gray-900 text-white rounded hover:bg-gray-600 flex items-center gap-2"
              onClick={handleZoomIn}
            >
              <ZoomIn size={20} />
            </button>
          </div>
        </div>
        <div className="col-span-1 flex justify-end space-x-2">
          {/* <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            取り消し
          </button> */}
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={saveAction}
            disabled={isPending}
          >
            {isPending ? '保存中...' : '保存'}
          </button>
        </div>
      </div>
    </div>
  )
} 