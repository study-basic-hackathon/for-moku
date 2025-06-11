/**
 * 日時を日本語形式にフォーマット
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