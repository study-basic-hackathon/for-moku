import path from "path";
/**
 * 画像のURLから画像IDを取得する
 * @param imageUrl 画像のURL
 * @returns 画像ID
 */
export function imageUrlToImageId(imageUrl: string) {
  const imageId = path.parse(imageUrl).name;
  return imageId;
}