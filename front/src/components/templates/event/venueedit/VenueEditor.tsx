'use client'

import { cn } from '@/lib/shadcn/utils'
import { CANVAS_BASE } from '@/lib/event/venueedit/constants'

interface VenueEditorProps {
  zoom: number
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  handleMouseDown: (e: React.MouseEvent<HTMLCanvasElement>) => void
  handleMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => void
  handleMouseUp: () => void
  handleMouseLeave: () => void
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

export default function VenueEditor({ 
  zoom,
  canvasRef,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleMouseLeave
}: Readonly<VenueEditorProps>) {
  return (
    <div className={cn(
      "flex flex-col border border-gray-900 rounded-lg p-4 overflow-x-auto",
      zoom <= 100 && "items-center"
    )}>
      <div style={{ maxWidth: `${CANVAS_BASE}px`, maxHeight: `${CANVAS_BASE + 0}px` }}>
        <div
          className="flex"
          style={canvasStyleFactory(zoom, CANVAS_BASE)}
        >
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            style={{
              width: `${CANVAS_BASE}px`,
              height: `${CANVAS_BASE}px`,
              cursor: 'crosshair'
            }}
          />
        </div>
      </div>
    </div>
  )
} 