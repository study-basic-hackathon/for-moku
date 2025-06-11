import { eventSample } from "@/actions/event/sample";
import { useCallback } from "react";

/**
 * イベントサンプル生成のフック
 * 
 * @returns イベントサンプル生成のコールバック関数
 */
export function useEventSample() {
  return useCallback(async () => {
    await eventSample();
  }, []);
} 