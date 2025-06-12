import { useState } from 'react'
import { Color } from 'react-color'
import { TextState } from '@/types/event/state'
import { EventVenueEditViewModel } from '@/types/event/viewmodel'
import { decodeVenue } from '@/lib/event/venueedit/decode'

/**
 * Propsとしてビューモデルを受け取る
 */
interface Props {
  eventVenueEditViewModel: EventVenueEditViewModel
}

/**
 * 会場編集画面の初期状態を管理するフック
 * ビューモデル(DBに登録されていた値)から初期Stateを生成する
 * @param eventVenueEditViewModel 会場編集画面のビューモデル
 * 
 * @returns 会場編集画面の状態とその更新関数
 */
export const useInitialState = ({eventVenueEditViewModel}: Props) => {

  const {imageJson} = eventVenueEditViewModel
  
  const {numPixel:initialNumPixel, 
    pixelColorState:initialPixelColorState, 
    circleColorState:initialCircleColorState, 
    textState:initialTextState} = decodeVenue(imageJson ?? JSON.parse('{}'))
  
  // ピクセルの定義
  const [numPixel, setNumPixel] = useState(initialNumPixel)
  const [pixelColorState, setPixelColorState] = useState<(Color | null)[][]>(initialPixelColorState)
  const [circleColorState, setCircleColorState] = useState<(Color | null)[][]>(initialCircleColorState)
  const [textState, setTextState] = useState<TextState[]>(initialTextState)
  const [isDialogModalOpen, setIsDialogModalOpen] = useState(false)

  return {
    numPixel,
    setNumPixel,
    pixelColorState,
    setPixelColorState,
    circleColorState,
    setCircleColorState,
    textState,
    setTextState,
    isDialogModalOpen,
    setIsDialogModalOpen,
  }
}
