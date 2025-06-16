import md5 from "md5";

/**
 * 16進数の色コードをRGBに変換
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return { r, g, b };
}

/**
 * RGBを16進数の色コードに変換
 */
function rgbToHex(r: number, g: number, b: number): string {
  return [r, g, b]
    .map(x => Math.min(255, Math.max(0, x)).toString(16).padStart(2, '0'))
    .join('');
}

/**
 * 色の明るさを計算
 */
function calculateBrightness(r: number, g: number, b: number): number {
  return (r * 299 + g * 587 + b * 114) / 1000;
}

/**
 * 明るすぎる色を暗く調整
 */
function suppressBrightness(r: number, g: number, b: number, targetBrightness: number = 180): { r: number; g: number; b: number } {
  const brightness = calculateBrightness(r, g, b);
  if (brightness <= targetBrightness) {
    return { r, g, b };
  }

  const factor = targetBrightness / brightness;
  return {
    r: Math.floor(r * factor),
    g: Math.floor(g * factor),
    b: Math.floor(b * factor)
  };
}

/**
 * 文字列からRGB色を生成
 */
function generateRgbFromString(str: string): { r: number; g: number; b: number } {
  const hash = md5(str);
  const colorHex = hash.substring(0, 6);
  return hexToRgb(colorHex);
}

/**
 * 文字列からRGB色を生成
 */
export function getColorBySeedString(str: string): string {
  const { r, g, b } = generateRgbFromString(str);
  return `#${rgbToHex(r, g, b)}`;
}

/**
 * 文字列から色を生成する
 * @param seedString シード文字列(イベント名など)
 * @returns 生成された色（hex形式）
 */
export function getDarkerColorBySeedString(seedString: string): string {
  const { r, g, b } = generateRgbFromString(seedString);
  const { r: newR, g: newG, b: newB } = suppressBrightness(r, g, b);
  return `#${rgbToHex(newR, newG, newB)}`;
}