'use client'

import { useCanvasDraw } from '@/hooks/venue/useCanvasDraw'

interface VenueEditorProps {
  selectedTool: string
  n_pixel?: number
  zoom?: number
}

const canvasStyleFactory = (zoom: number, CANVAS_BASE: number) : React.CSSProperties=> {
  return {
    transform: `scale(${zoom / 100})`,
    transformOrigin: zoom < 100 ? 'center center' : 'left top',
    transition: 'transform 0.2s ease-in-out',
    position: 'relative',
    display: 'inline-block',
    transformBox: 'fill-box',
    width: `${CANVAS_BASE}px`,
    height: `${CANVAS_BASE}px`,
  }
}

export default function VenueEditor({ selectedTool, n_pixel = 8, zoom = 160 }: VenueEditorProps) {

  // キャンバスに関連するフック（いわゆるカスタムフック）
  const { canvasRef, CANVAS_BASE} = useCanvasDraw({ n_pixel }) 
  
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
    <div className="flex flex-col items-center border border-gray-900 rounded-lg p-4 overflow-x-auto">
      <div>
        <span className="text-lg font-semibold">キャンバス</span>
      </div>

      <div style={{ maxWidth: `${CANVAS_BASE}px`, maxHeight: `${CANVAS_BASE + 0}px` }}>
        <div
          className="flex"
          style={canvasStyleFactory(zoom, CANVAS_BASE)}
        >
          <canvas
            ref={canvasRef}
            onMouseMove={handleCanvasMouseMove}
            onMouseDown={handleCanvasMouseDown}
            onMouseUp={handleCanvasMouseUp}
            style={{
              width: `${CANVAS_BASE}px`,
              height: `${CANVAS_BASE}px`,
            }}
          />
        </div>
      </div>
    </div>
  )
} 