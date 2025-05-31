import { useRef, useMemo, useEffect } from 'react';

interface CanvasDrawProps {
  size: number;
}

export const useCanvasDraw = ({ size }: CanvasDrawProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const CANVAS_BASE = size;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
  
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
  
    canvas.width = CANVAS_BASE;
    canvas.height = CANVAS_BASE;
  
    // パターンの描画
    const patternCanvas = document.createElement('canvas');
    patternCanvas.width = 8;
    patternCanvas.height = 8;
    const patternCtx = patternCanvas.getContext('2d');
    if (patternCtx) {
      // 白い背景
      patternCtx.fillStyle = '#ffffff';
      patternCtx.fillRect(0, 0, 8, 8);
      // グレーのチェック
      patternCtx.fillStyle = '#e0e0e0';
      patternCtx.fillRect(0, 0, 4, 4);
      patternCtx.fillRect(4, 4, 4, 4);
    }
  
    // パターンの適用
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const pattern = ctx.createPattern(patternCanvas, 'repeat');
        if (pattern) {
          ctx.fillStyle = pattern;
          ctx.fillRect(0, 0, CANVAS_BASE, CANVAS_BASE);
        }
      }
    }
  }, [CANVAS_BASE]);

  return {
    canvasRef,
    CANVAS_BASE
  };
}; 