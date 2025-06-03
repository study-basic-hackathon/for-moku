'use client'

import { useState } from 'react'
import VenueActionHeader from "./VenueActionHeader"
import VenueEditor from "./VenueEditor"
import VenueToolSubMenu from "./VenueToolSubMenu"
import VenueToolSelectionMenu from "./VenueToolSelectionMenu"
import { useColorPalette } from '@/hooks/event/venueedit/submenu/useColorPalette'
import { useCanvasDraw } from '@/hooks/event/venueedit/useCanvasDraw'
import { VenueEditTool } from '@/types/tool'

export default function VenueEditorTemplate() {
  const [selectedTool, setSelectedTool] = useState<VenueEditTool>('ピクセル塗りつぶし')
  const { 
    selectedColor, 
    colorPalette, 
    setSelectedColor,
    addColor,
    removeColor
  } = useColorPalette()

  const {
    canvasRef,
    canDraw,
    zoom,
    numPixel,
    setNumPixel,
    handleZoomIn,
    handleZoomOut,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave
  } = useCanvasDraw({
    selectedColor,
    selectedTool
  })

  return (
    <div className="pb-10">
      <VenueActionHeader
        numPixel={numPixel}
        setNumPixel={setNumPixel}
        handleZoomIn={handleZoomIn}
        handleZoomOut={handleZoomOut}
      />
      <div className="p-5">
        <div className="grid grid-cols-1 lg:grid-cols-8 xl:grid-cols-12 gap-4">
          <div className="col-span-1 md:col-span-1 lg:col-span-6 xl:col-span-6">
            <VenueEditor 
              zoom={zoom}
              canvasRef={canvasRef}
              canDraw={canDraw}
              handleMouseDown={handleMouseDown}
              handleMouseMove={handleMouseMove}
              handleMouseUp={handleMouseUp}
              handleMouseLeave={handleMouseLeave}
            />
          </div>
          <div className="col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-2">
            <VenueToolSubMenu 
              selectedTool={selectedTool}
              onToolSelect={setSelectedTool}
              selectedColor={selectedColor}
              onColorSelect={setSelectedColor}
              colorPalette={colorPalette}
              onAddColor={addColor}
              onDeleteColor={removeColor}
            />
          </div>
          <div className="col-span-1 md:col-span-1 lg:col-span-8 xl:col-span-4">
            <VenueToolSelectionMenu 
              onToolSelect={setSelectedTool}
            />
          </div>
        </div>
      </div>
    </div>
  )
}