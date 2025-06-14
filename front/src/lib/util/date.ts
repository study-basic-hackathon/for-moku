/**
 * 日時を日本語形式（YYYY年MM月dd日 HH:mm）にフォーマット
 * 
 * @param date 日時
 * @returns フォーマットされた日時文字列（YYYY年MM月dd日 HH:mm）
 */
export function formatDateTimeYYYYMMDDHHMMJPN(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${year}年${month}月${day}日 ${hours}:${minutes}`;
} 
/**
 * 日時を日本語形式（YYYY/MM/dd）にフォーマット
 * 
 * @param date 日時
 * @returns フォーマットされた日時文字列（YYYY/MM/dd）
 */
export function formatDateTimeYYYYMMDD_SLASH(date: Date): string {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}/${month}/${day}`;
}

/**
 * 日時を日本語形式（YYYY-MM-dd）にフォーマット
 * 
 * @param date 日時
 * @returns フォーマットされた日時文字列（YYYY-MM-dd）
 */
export function formatDateTimeYYYYMMDD_HYPHEN(date: Date): string {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

/**
 * 日時を日本語形式（HH:mm）にフォーマット
 * 
 * @param date 日時
 * @returns フォーマットされた日時文字列（YYYY年MM月dd日 HH:mm）
 */
export function formatDateTimeHHMM(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
}