import { useState } from 'react'

interface VenueToolSelectionMenuProps {
  selectedTool: string
  onToolSelect: (toolName: string) => void
}

export default function VenueToolSelectionMenu({ selectedTool, onToolSelect }: VenueToolSelectionMenuProps) {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center border border-gray-900 rounded-lg">
      <div className="h-full w-full flex flex-col">
        <div className="flex-none p-4">
          <span className="text-lg font-semibold">ツール選択メニュー</span>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-6 xl:grid-cols-1 gap-2">
            <div className="col-span-1 grid grid-cols-1 xl:grid-cols-2 grid-rows-2 xl:grid-rows-1 gap-2">
              <button 
                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => onToolSelect('ピクセル塗りつぶし')}
              >
                ピクセル塗りつぶし
              </button>
              <button 
                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => onToolSelect('ピクセル消去')}
              >
                ピクセル消去
              </button>
            </div>

            <div className="col-span-1 grid grid-cols-1 xl:grid-cols-2 grid-rows-2 xl:grid-rows-1 gap-2">
              <button 
                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => onToolSelect('丸オブジェクト配置')}
              >
                丸オブジェクト配置
              </button>
              <button 
                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => onToolSelect('丸オブジェクト消去')}
              >
                丸オブジェクト消去
              </button>
            </div>

            <div className="col-span-1 grid grid-cols-1 xl:grid-cols-2 grid-rows-2 xl:grid-rows-1 gap-2">
              <button 
                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => onToolSelect('任意オブジェクト配置')}
              >
                任意オブジェクト配置
              </button>
              <button 
                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => onToolSelect('任意オブジェクト消去')}
              >
                任意オブジェクト消去
              </button>
            </div>

            <div className="col-span-1 grid grid-cols-1 xl:grid-cols-2 grid-rows-2 xl:grid-rows-1 gap-2">
              <button 
                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => onToolSelect('テキストボックス追加')}
              >
                テキストボックス追加
              </button>
              <button 
                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => onToolSelect('テキストボックス消去')}
              >
                テキストボックス消去
              </button>
            </div>

            <div className="col-span-1 grid grid-cols-1 xl:grid-cols-2 grid-rows-2 xl:grid-rows-1 gap-2">
              <button 
                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => onToolSelect('直線描画')}
              >
                直線描画
              </button>
              <button 
                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => onToolSelect('直線消去')}
              >
                直線消去
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 