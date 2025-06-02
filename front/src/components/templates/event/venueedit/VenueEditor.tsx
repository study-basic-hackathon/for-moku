'use client'

import { useCanvasDraw } from '@/hooks/venue/useCanvasDraw'
import { cn } from '@/lib/shadcn/utils'
import { Color } from '@/types/color'
import { VenueEditTool } from '@/types/tool'

interface VenueEditorProps {
  selectedTool: VenueEditTool
  selectedColor: Color
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

export default function VenueEditor({ selectedTool, selectedColor, n_pixel = 8, zoom = 100 }: Readonly<VenueEditorProps>) {
  const { 
    canvasRef, 
    CANVAS_BASE,
    canDraw
  } = useCanvasDraw({ 
    n_pixel, 
    selectedColor,
    selectedTool
  })

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
            style={{
              width: `${CANVAS_BASE}px`,
              height: `${CANVAS_BASE}px`,
              cursor: canDraw() ? 'crosshair' : 'default'
            }}
          />
        </div>
      </div>
    </div>
  )
} 