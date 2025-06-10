import { useCallback, useState } from 'react'
import { Color } from 'react-color'
import { TextState } from '@/types/event/state'
import { saveVenueInfo } from '@/actions/event/saveVenueInfo'
import { downloadVenueJson, encodeVenue } from '@/lib/event/venueedit/encode'

interface Props {
  numPixel: number
  pixelColorState: (Color | null)[][]
  circleColorState: (Color | null)[][]
  textState: TextState[]
}
/**
 * 会場の画像に関連するアクションを管理するフック
 * 
 * @param props 会場の情報
 * @returns 会場の情報を永続化する関数と、永続化中かどうかのフラグ
 */
export const useImageAction = (props: Props) => {
  const { numPixel, pixelColorState, circleColorState, textState } = props
  const [isPendingForSave, setIsPendingForSave] = useState(false)

  const saveImageAction = useCallback(async () => {
    try {
      setIsPendingForSave(true)
      const encoded = encodeVenue(numPixel, pixelColorState, circleColorState, textState)
      await Promise.all([
        // TODO: 本番リリース前に必ず削除
        // デバッグ用のJSONファイルをダウンロード
        downloadVenueJson(numPixel, pixelColorState, circleColorState, textState),  

        // 画像データを保存&永続化
        saveVenueInfo({
          numPixel,
          encodedPixelColor: encoded.encodedPixelColor,
          encodedCircleColor: encoded.encodedCircleColor,
          textState: encoded.textState,
          pixelSize: 50,
          gridColor: '#CCCCCC',
          gridWidth: 1
        })
      ])
    } finally {
      setIsPendingForSave(false)
    }
  }, [numPixel, pixelColorState, circleColorState, textState])

  return {
    saveImageAction,
    isPendingForSave
  }
} 