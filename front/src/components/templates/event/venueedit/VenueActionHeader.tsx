export default function VenueActionHeader() {
  return (
    <div className="flex flex-col justify-center items-center border border-gray-900 mx-2 rounded-lg p-4 m-4 gap-4">
      <div className="items-center justify-between w-full grid grid-cols-4 lg:grid-cols-4 xl:grid-cols-2">
        <div className="col-span-3 xl:col-span-1 flex justify-between mx-2">
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              元に戻す
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              キャンバスサイズ変更
            </button>
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-600">
              縮小
            </button>
            <button className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-600">
              拡大
            </button>
          </div>
        </div>
        <div className="col-span-1 flex justify-end space-x-2">
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            取り消し
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            保存
          </button>
        </div>
      </div>
    </div>
  )
} 