import { useState } from "react"

export const useSample = () => {
  const [sampleVenue, setSampleVenue] = useState(0)

  const incrementSampleVenue = () => {
    setSampleVenue((prev) => prev + 1)
  }

  return {
    sampleVenue,
    incrementSampleVenue,
  }
} 