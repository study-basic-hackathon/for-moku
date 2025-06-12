'use client'

import { useState } from 'react'
import VenueActionHeader from "./VenueActionHeader"
import VenueEditor from "./VenueEditor"
import VenueToolSubMenu from "./VenueToolSubMenu"
import VenueToolSelectionMenu from "./VenueToolSelectionMenu"
import { useColorPalette } from '@/hooks/event/venueedit/submenu/useColorPalette'
import { useCanvasDraw } from '@/hooks/event/venueedit/useCanvasDraw'
import { VenueEditTool } from '@/types/tool'
import TextDialog from '@/components/organisms/event/venueedit/text/TextDialog'
import { EventVenueEditViewModel } from '@/types/event/viewmodel'

interface Props {
  eventVenueEditViewModel: EventVenueEditViewModel
}

export default function VenueEditorTemplate({ eventVenueEditViewModel }: Readonly<Props>) {
  const [selectedTool, setSelectedTool] = useState<VenueEditTool>('ピクセル塗りつぶし')
  const { 
    selectedColor,
    setSelectedColor, 
    colorPalette, 
    selectedColorBackGround,
    setSelectedColorBackGround,
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
    handleMouseLeave,
    isTextDialogOpen,
    setIsTextDialogOpen,
    setCurrentText,
    handleTextAdd,
    saveImageAction,
    isPendingForSave
  } = useCanvasDraw({
    selectedColor,
    selectedTool,
    selectedColorBackGround,
    eventVenueEditViewModel,
  })

  return (
    <div className="pb-10">
      <VenueActionHeader
        numPixel={numPixel}
        setNumPixel={setNumPixel}
        handleZoomIn={handleZoomIn}
        handleZoomOut={handleZoomOut}
        saveAction={saveImageAction}
        isPending={isPendingForSave}
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
              setSelectedColor={setSelectedColor}
              selectedColorBackGround={selectedColorBackGround}
              setSelectedColorBackGround={setSelectedColorBackGround}
              colorPalette={colorPalette}
              onAddColor={addColor}
              onDeleteColor={removeColor}
            />
            <TextDialog
              isOpen={isTextDialogOpen}
              onOpenChange={setIsTextDialogOpen}
              onTextChange={setCurrentText}
              onAdd={handleTextAdd}
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