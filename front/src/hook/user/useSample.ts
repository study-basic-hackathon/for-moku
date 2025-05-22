import { useState } from "react"

export const useSample = () => {
  const [sampleUser, setSampleUser] = useState(0)

  const incrementSampleUser = () => {
    setSampleUser((prev) => prev + 1)
  }

  return {
    sampleUser,
    incrementSampleUser,
  }
} 