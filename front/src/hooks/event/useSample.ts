import { useState } from "react"

export const useSample = () => {
  const [sampleEvent, setSampleEvent] = useState(0)

  const incrementSampleEvent = () => {
    setSampleEvent((prev) => prev + 1)
  }

  return {
    sampleEvent,
    incrementSampleEvent,
  }
} 