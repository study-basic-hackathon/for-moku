/**
 * 日付フォーマットの正規表現パターン
 * YYYY-MM-DD形式
 */
export const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

/**
 * 時間フォーマットの正規表現パターン
 * HH:mm形式（00-23時、00-59分）
 */
export const TIME_PATTERN = /^([01]?\d|2[0-3]):[0-5]\d$/;

/**
 * 日時フォーマットの正規表現パターン
 * YYYY-MM-DDTHH:mm形式（00-23時、00-59分）
 */
export const DATETIME_PATTERN = /^\d{4}-\d{2}-\d{2}T([01]?\d|2[0-3]):[0-5]\d$/;

/**
 * メールアドレスの正規表現パターン
 */
export const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * 電話番号の正規表現パターン
 * ハイフンありの10-11桁
 */
export const PHONE_PATTERN = /^\d{2,4}-\d{2,4}-\d{4}$/;

/**
 * 郵便番号の正規表現パターン
 * ハイフンありの7桁
 */
export const POSTAL_CODE_PATTERN = /^\d{3}-\d{4}$/;

/**
 * URLの正規表現パターン
 */
export const URL_PATTERN = /^https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+$/; 