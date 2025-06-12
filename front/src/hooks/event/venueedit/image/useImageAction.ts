import { useCallback, useState } from 'react'
import { Color } from 'react-color'
import { TextState } from '@/types/event/state'
import { saveVenueInfo } from '@/actions/event/venueedit/saveVenueInfo'
import { encodeVenue } from '@/lib/event/venueedit/encode'

interface Props {
  numPixel: number
  pixelColorState: (Color | null)[][]
  circleColorState: (Color | null)[][]
  textState: TextState[],
  eventId: number
}
/**
 * 会場の画像に関連するアクションを管理するフック
 * 
 * @param props 会場の情報
 * @returns 会場の情報を永続化する関数と、永続化中かどうかのフラグ
 */
export const useImageAction = ({ numPixel, pixelColorState, circleColorState, textState, eventId }: Props) => {

  const [isPendingForSave, setIsPendingForSave] = useState(false)

  const saveImageAction = useCallback(async () => {
    try {
      setIsPendingForSave(true)
      const encodedVenue = encodeVenue(numPixel, pixelColorState, circleColorState, textState)
      await Promise.all([
        // 画像データを保存&永続化
        saveVenueInfo({
          eventId,
          encodedVenue,
          pixelSize: 50,
          gridColor: '#CCCCCC',
          gridWidth: 1
        })
      ])
    } finally {
      setIsPendingForSave(false)
    }
  }, [numPixel, pixelColorState, circleColorState, textState, eventId])

  return {
    saveImageAction,
    isPendingForSave
  }
} 