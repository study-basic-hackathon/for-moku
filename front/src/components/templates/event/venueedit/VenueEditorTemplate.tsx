'use client'

import { useState } from 'react'
import VenueActionHeader from "./VenueActionHeader"
import VenueEditor from "./VenueEditor"
import VenueToolSubMenu from "./VenueToolSubMenu"
import VenueToolSelectionMenu from "./VenueToolSelectionMenu"

export default function VenueEditorTemplate() {
  const [selectedTool, setSelectedTool] = useState<string>('')
  const [zoom] = useState(100)
  const [n_pixel] = useState(16)

  return (
    <div className="pb-10">
      <VenueActionHeader />
      <div className="p-5">
        <div className="grid grid-cols-1 lg:grid-cols-8 xl:grid-cols-12 gap-4">
          <div className="col-span-1 md:col-span-1 lg:col-span-6 xl:col-span-6">
            <VenueEditor 
              selectedTool={selectedTool} 
              n_pixel={n_pixel}
              zoom={zoom}
            />
          </div>
          <div className="col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-2">
            <VenueToolSubMenu selectedTool={selectedTool} />
          </div>
          <div className="col-span-1 md:col-span-1 lg:col-span-8 xl:col-span-4">
            <VenueToolSelectionMenu 
              selectedTool={selectedTool}
              onToolSelect={setSelectedTool}
            />
          </div>
        </div>
      </div>
    </div>
  )
}