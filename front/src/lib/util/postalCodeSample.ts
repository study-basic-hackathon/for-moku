/**
 * 郵便番号の形式を判定する
 * @param postalCode 判定する郵便番号
 * @returns 郵便番号の形式が正しい場合はtrue、そうでない場合はfalse
 */
export const isValidPostalCode = (postalCode: string): boolean => {
  // ハイフンありの形式（123-4567）またはハイフンなしの形式（1234567）を判定
  const postalCodeRegex = /^\d{3}-?\d{4}$/;
  return postalCodeRegex.test(postalCode);
};

/**
 * 郵便番号をハイフン付きの形式に変換する
 * @param postalCode 変換する郵便番号
 * @returns ハイフン付きの郵便番号（例：123-4567）
 */
export const formatPostalCode = (postalCode: string): string => {
  // ハイフンを除去して数字のみにする
  const numbers = postalCode.replace(/-/g, '');
  
  // 7桁の数字でない場合はそのまま返す
  if (numbers.length !== 7) {
    return postalCode;
  }
  
  // ハイフンを挿入して返す
  return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
};
