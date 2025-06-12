
/**
 * ２次元配列のサイズを変更する
 * @param prev 変更前の配列
 * @param numPixel 変更後のピクセル数
 * @returns 変更後の配列
 */
export const resizeTwoDimensionalArray = <T>(prev: T[][], numPixel: number): T[][] => {
  const newArray = Array(numPixel).fill(null).map(() => Array(numPixel).fill(null))
  prev.forEach((row, y) => {
    if (y < numPixel) {
      row.forEach((color, x) => {
        if (x < numPixel) {
          newArray[y][x] = color
        }
      })
    }
  })
  return newArray
}