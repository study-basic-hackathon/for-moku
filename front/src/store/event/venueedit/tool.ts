import { atom } from 'jotai'
import { EDITOR_TOOL_PAIR_TREE, VenueEditTool } from '@/types/tool'
import { EditorToolPairKey } from '@/types/tool'
import { DEFAULT_SELECTED_TOOL } from '@/lib/event/venueedit/constants'

// アクションの型を定義
export type ToolAction =
  | { type: 'TOGGLE_GENERATE' }
  | { type: 'TOGGLE_ERASE' }
  | { type: 'SET_DRAW_TOOL'; toolKey: EditorToolPairKey };

// 状態を保持するプライベートなベースatom
const _selectedToolAtom = atom<VenueEditTool>(DEFAULT_SELECTED_TOOL);

// 読み取り専用のatom（コンポーネントはこれを参照）
export const selectedToolAtom = atom((get) => get(_selectedToolAtom));

// 更新ロジックをカプセル化した書き込み専用atom
export const toolActionAtom = atom(
  null, // 読み取りはしないのでnull
  (get, set, action: ToolAction) => {
    const currentTool = get(_selectedToolAtom);
    switch (action.type) {
      case 'TOGGLE_GENERATE': {
        const toolPair = Object.values(EDITOR_TOOL_PAIR_TREE).find(
          pair => pair.generate === currentTool || pair.erase === currentTool
        );
        if (toolPair) set(_selectedToolAtom, toolPair.generate);
        break;
      }
      case 'TOGGLE_ERASE': {
        const toolPair = Object.values(EDITOR_TOOL_PAIR_TREE).find(
          pair => pair.generate === currentTool || pair.erase === currentTool
        );
        if (toolPair) set(_selectedToolAtom, toolPair.erase);
        break;
      }
      case 'SET_DRAW_TOOL': {
        const toolPair = EDITOR_TOOL_PAIR_TREE[action.toolKey];
        if (toolPair) {
          set(_selectedToolAtom, toolPair.generate);
        }
        break;
      }
    }
  }
);