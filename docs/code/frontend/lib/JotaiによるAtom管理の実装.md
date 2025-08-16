# Jotaiとは

Jotaiは、Reactアプリケーションのための軽量な状態管理ライブラリである。
ReduxやMobXなどの他の状態管理ライブラリと比較して、シンプルなAPIと最小限のボイラープレートを提供することを目的としている。

Jotaiの中心的な概念は「Atom」である。
Atomは、アプリケーションの状態の最小単位を表す。
各Atomは独立した状態の一部を保持し、それらを組み合わせることで複雑な状態管理を実現する。

Jotaiの主な特徴：

- プリミティブベース：Atomという小さな単位で状態を管理
- リアクティブ：状態の変更に対して自動的にコンポーネントが再レンダリング
- コンポーネントローカル：必要な場所でのみ状態を購読可能

Jotaiは、useAtomフックを通じてReactコンポーネント内でAtomの値を読み取ったり更新したりすることができる。これにより、Reduxのような複雑なセットアップなしに、効率的な状態管理が可能となる。

# 関連するファイルの一覧

| 役割 | パス | メモ |
| --- | --- | --- |
| ストア | front/src/store/**/*.ts | atomやそれに関する操作を定義 |
| カスタムフック | front/src/hooks/**/*.ts | コンポーネントからストアで定義されたatomの参照や更新はカスタムフックを通じて行うものとする |
| 他のコンポーネント | front/src/components/**/*.ts | コンポーネントからカスタムフックを通じて、atomの参照と更新を行う |

# 1. ストアの定義

場所：front/src/store/**/*.ts

ここでは、Jotaiで管理されるべき値を定義する。管理されるべき値そのものはprivateとして、参照処理と更新処理をラッピングするAtomを他のソースから使えるようにする。

処理の構成は概ね、以下のように一般化される。

```tsx
1. アクションの一覧型（関数の引数含む）
2. ベースatom(private)
3. 値として参照できるようにするためのreadonlyAtom
4. ベースatomを更新できるようにするためのupdatableAtom
```

以下、エディタ編集画面におけるツール選択に関するstoreを例示する。

```tsx
// front/src/store/event/venueedit/tool.ts
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
```

ただし、readonlyAtomやupdatableAtomを使って値を取り出したり、更新するためには、以下のような煩雑な記述が必要になる。

```tsx
import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback, useMemo } from 'react';
import { selectedToolAtom, toolActionAtom } from '@/store/event/venueedit/tool';

// atomから値を取得
const selectedTool = useAtomValue(selectedToolAtom);

// 引数としてツールを渡して、選択中ツールを変更する
const dispatch = useSetAtom(toolActionAtom);
const setDrawToolFromToolKey = useCallback(
    (toolKey: EditorToolPairKey) => {
      dispatch({ type: 'SET_DRAW_TOOL', toolKey });
    },
    [dispatch]
 );
 setDrawToolFromToolKey("TOOL")
```

コンポーネントから呼び出す際に、いちいち呼び出したくないので次の手順で示すようなカスタムフック内で処理をラッピングしておく。

# 2. カスタムフックの定義

場所：front/src/hooks/**/*.ts

前述の処理をラッピングして、componentから簡単に使えるような関数をカスタムフック内で定義しておく。

処理の構成は概ね、以下のように一般化される。

```tsx

1. 値そのもの(useAtomValue)
2. 更新用の関数(useSetAtom → useCallback & dispatch)
3. atomから自動で計算できる値(useMemo)

※ 3の代替としてderivedAtomなるものも存在するらしい
```

以下、前述で定義したstoreをラッピングするようなカスタムフックを例示する。

```tsx
// front/src/hooks/event/venueedit/useSubToolSelection.ts
import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback, useMemo } from 'react';
import { selectedToolAtom, toolActionAtom } from '@/store/event/venueedit/tool';
import { EditorToolPairKey, PIXEL_TOOLS, TEXT_TOOLS } from '@/types/tool';
import { isDrawingTool as _isDrawingTool, getToolType } from '@/lib/event/venueedit/subToolSelection';

/**
 * サブツール選択を管理するフック
 *
 * @returns サブツールの状態と操作関数
 */
export const useSubToolSelection = () => {
  const selectedTool = useAtomValue(selectedToolAtom);
  const dispatch = useSetAtom(toolActionAtom);

  const toggleToGenerateTool = useCallback(
    () => dispatch({ type: 'TOGGLE_GENERATE' }),
    [dispatch]
  );

  const toggleToEraseTool = useCallback(
    () => dispatch({ type: 'TOGGLE_ERASE' }),
    [dispatch]
  );

  const setDrawToolFromToolKey = useCallback(
    (toolKey: EditorToolPairKey) => {
      dispatch({ type: 'SET_DRAW_TOOL', toolKey });
    },
    [dispatch]
  );

  // isDrawingToolはselectedToolに依存し、その結果をメモ化する
  const isDrawingTool = useMemo(() => _isDrawingTool(selectedTool), [selectedTool]);

  // toolTypeはselectedToolに依存し、その結果をメモ化する
  const toolType = useMemo(() => getToolType(selectedTool), [selectedTool]);

  // isPixelToolはselectedToolに依存し、その結果をメモ化する
  const isPixelTool = useMemo(() => (PIXEL_TOOLS as readonly string[]).includes(selectedTool), [selectedTool]);

  // isTextToolはselectedToolに依存し、その結果をメモ化する
  const isTextTool = useMemo(() => (TEXT_TOOLS as readonly string[]).includes(selectedTool), [selectedTool]);

  return {
    selectedTool,
    toggleToGenerateTool,
    toggleToEraseTool,
    setDrawToolFromToolKey,
    toolType,
    isDrawingTool,
    isPixelTool,
    isTextTool,
  };
};
```

# 3. コンポーネントからの利用

前の手順で作ったカスタムフックから、値そのものや操作用の関数を呼び出せば良い。

```tsx
const { selectedTool, setDrawToolFromToolKey } = useSubToolSelection()
```