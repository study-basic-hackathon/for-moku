import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback, useMemo } from 'react';
import { selectedToolAtom, toolActionAtom } from '@/store/event/venueedit/tool';
import { EditorToolPairKey, PIXEL_TOOLS, TEXT_TOOLS } from '@/types/tool';
import { isDrawingTool as _isDrawingTool, getToolType as _getToolType } from '@/lib/event/venueedit/subToolSelection';

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

  // getToolTypeは純粋関数であり、その参照を安定させるためにuseMemoでラップする
  const getToolType = useMemo(() => _getToolType, []);

  // toolTypeはselectedToolとgetToolTypeに依存し、その結果をメモ化する
  const toolType = useMemo(() => getToolType(selectedTool), [selectedTool, getToolType]);

  // isPixelToolはselectedToolに依存し、その結果をメモ化する
  const isPixelTool = useMemo(() => (PIXEL_TOOLS as readonly string[]).includes(selectedTool), [selectedTool]);

  // isTextToolはselectedToolに依存し、その結果をメモ化する
  const isTextTool = useMemo(() => (TEXT_TOOLS as readonly string[]).includes(selectedTool), [selectedTool]);

  return {
    selectedTool,
    toggleToGenerateTool,
    toggleToEraseTool,
    setDrawToolFromToolKey,
    getToolType,
    toolType,
    isDrawingTool,
    isPixelTool,
    isTextTool,
  };
};