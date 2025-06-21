import { format } from 'date-fns';
import { toZonedTime, fromZonedTime } from 'date-fns-tz';

/**
 * 日時を日本語形式（YYYY年MM月dd日 HH:mm）にフォーマット
 * 
 * @param date 日時
 * @returns フォーマットされた日時文字列（YYYY年MM月dd日 HH:mm）
 * 
 * @example
 * ```tsx
 *  const date = new Date("2021-01-01T12:00:00")
 *  const formattedDate = formatDateTimeYYYYMMDDHHMMJPN(date)
 *  console.log(formattedDate) // 2021年1月1日 12:00
 * ```
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
 * 
 * @example
 * ```tsx
 *  const date = new Date("2021-01-01T12:00:00")
 *  const formattedDate = formatDateTimeYYYYMMDD_SLASH(date)
 *  console.log(formattedDate) // 2021/01/01
 * ```
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
 * 
 * @example
 * ```tsx
 *  const date = new Date("2021-01-01T12:00:00")
 *  const formattedDate = formatDateTimeYYYYMMDD_HYPHEN(date)
 *  console.log(formattedDate) // 2021-01-01
 * ```
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
 * 
 * @example
 * ```tsx
 *  const date = new Date("2021-01-01T12:00:00")
 *  const formattedDate = formatDateTimeHHMM(date)
 *  console.log(formattedDate) // 12:00
 * ```
 */
export function formatDateTimeHHMM(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
}

/**
 * 日付から日時を生成する関数
 * @param date 日付
 * @param isStart 開始日時かどうか
 * @returns 日時（開始日時なら00:00:00、終了日時なら23:59:59）
 * 
 * @example
 * ```tsx
 *  const date = new Date("2021-01-01")
 *  const startDateTime = createDateTime(date, true)
 *  console.log(startDateTime) // 2021-01-01T00:00:00.000Z
 *  const endDateTime = createDateTime(date, false)
 *  console.log(endDateTime) // 2021-01-01T23:59:59.999Z
 * ```
 */
export function createDateTime(date: Date, isStart: boolean): Date {
  const newDate = new Date(date)
  if (isStart) {
    newDate.setHours(0, 0, 0, 0)
  } else {
    newDate.setHours(23, 59, 59, 999)
  }
  return newDate
}

/**
 * UTC+0のDateをUTC+9として解釈する変換関数
 * @param utcDate UTC+0のDateオブジェクト
 * @returns UTC+9として解釈されたDateオブジェクト
 */
export function convertUTCToJST(utcDate: Date): Date {
  // date-fns-tzを使用してより正確なタイムゾーン変換を行う
  // UTC+0のDateをUTC+9（Asia/Tokyo）として解釈
  const jstDate = toZonedTime(utcDate, 'Asia/Tokyo');
  return jstDate;
}

/**
 * JST（UTC+9）のDateをUTC+0に変換する関数
 * @param jstDate JST（UTC+9）のDateオブジェクト
 * @returns UTC+0のDateオブジェクト
 */
export function convertJSTToUTC(jstDate: Date): Date {
  // date-fns-tzを使用してより正確なタイムゾーン変換を行う
  // JST（UTC+9）のDateをUTC+0に変換
  const utcDate = fromZonedTime(jstDate, 'Asia/Tokyo');
  return utcDate;
}