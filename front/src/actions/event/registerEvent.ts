'use server';

/**
 * イベントを登録
 * 
 * @param formData フォームデータ
 * @returns 特になし
 */
export async function registerEvent(formData: FormData) {
  console.log('Form data:', Object.fromEntries(formData));
}