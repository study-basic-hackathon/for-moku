'use client'

import { useState } from 'react'
import { useCanvasDraw } from '@/hooks/venue/useCanvasDraw'

interface VenueEditorProps {
  selectedTool: string
  zoom: number
}

export default function VenueEditor({ selectedTool, zoom }: VenueEditorProps) {
  const [cursorUrl, setCursorUrl] = useState('default')
  const { canvasRef, CANVAS_BASE } = useCanvasDraw({ size: 512 })
  
  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    // マウス移動時の処理
  }

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    // マウスダウン時の処理
  }

  const handleCanvasMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    // マウスアップ時の処理
  }

  return (
    <div className="h-full border border-gray-900 rounded-lg">
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-auto p-4">
          <div
            className="min-h-full min-w-full flex items-center justify-center"
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'center center',
              transition: 'transform 0.2s ease-in-out',
            }}
          >
            <canvas
              ref={canvasRef}
              className="border border-gray-900"
              onMouseMove={handleCanvasMouseMove}
              onMouseDown={handleCanvasMouseDown}
              onMouseUp={handleCanvasMouseUp}
              style={{
                width: `${CANVAS_BASE}px`,
                height: `${CANVAS_BASE}px`,
                cursor: `${cursorUrl}, auto`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
} 