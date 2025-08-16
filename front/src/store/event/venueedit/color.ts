import { atom } from 'jotai'
import { Color } from 'react-color'
import { DEFAULT_COLORS } from '@/lib/event/venueedit/constants'

// アクションの型を定義
export type ColorAction =
  | { type: 'SET_SELECTED_COLOR'; color: Color }
  | { type: 'SET_BACKGROUND_COLOR'; color: Color }

// 状態を保持するプライベートなベースatom
const _selectedColorAtom = atom<Color>(DEFAULT_COLORS[0]);
const _selectedColorBackGroundAtom = atom<Color>(DEFAULT_COLORS[1]);

// 読み取り専用のatom
export const selectedColorAtom = atom((get) => get(_selectedColorAtom));
export const selectedColorBackGroundAtom = atom((get) => get(_selectedColorBackGroundAtom));

// 更新ロジックをカプセル化した書き込み専用atom
export const colorActionAtom = atom(
  null,
  (get, set, action: ColorAction) => {
    switch (action.type) {
      case 'SET_SELECTED_COLOR':
        set(_selectedColorAtom, action.color);
        break;
      case 'SET_BACKGROUND_COLOR':
        set(_selectedColorBackGroundAtom, action.color);
        break;
    }
  }
);
