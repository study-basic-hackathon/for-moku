import { useState } from 'react'

const ZOOM_LEVELS = [25, 50, 100, 200, 400] as const
type ZoomLevel = typeof ZOOM_LEVELS[number]

export const useZoom = (initialZoom: ZoomLevel = 100) => {
  const [zoom, setZoom] = useState<ZoomLevel>(initialZoom)

  const handleZoomIn = () => {
    setZoom((prevZoom: ZoomLevel) => {
      const currentIndex = ZOOM_LEVELS.indexOf(prevZoom)
      if (currentIndex < ZOOM_LEVELS.length - 1) {
        return ZOOM_LEVELS[currentIndex + 1]
      }
      return prevZoom
    })
  }

  const handleZoomOut = () => {
    setZoom((prevZoom: ZoomLevel) => {
      const currentIndex = ZOOM_LEVELS.indexOf(prevZoom)
      if (currentIndex > 0) {
        return ZOOM_LEVELS[currentIndex - 1]
      }
      return prevZoom
    })
  }

  return {
    zoom,
    setZoom,
    handleZoomIn,
    handleZoomOut,
  }
} 