import { useState } from "react"

export const useSample = () => {
  const [sampleCommon, setSampleCommon] = useState(0)

  const incrementSampleCommon = () => {
    setSampleCommon((prev) => prev + 1)
  }

  return {
    sampleCommon,
    incrementSampleCommon,
  }
} 