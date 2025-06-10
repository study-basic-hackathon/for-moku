import { InputHTMLAttributes } from "react";
import { JSX } from "react/jsx-runtime";
import { ZodIssue } from "zod";

/**
 * HTML要素の型(input, select, textareaとか)
 * 
 * @returns HTML要素の型
 */
export type HtmlElement = keyof JSX.IntrinsicElements;


/**
 * input要素のtype属性の型(text, date, timeとか)
 * 
 * @returns input要素のtype属性の型
 */
export type InputType = InputHTMLAttributes<HTMLInputElement>['type']

/**
 * 共通の登録フォームフィールド
 * 
 * 適切なフォームで使いたい場合には、Form用の型をジェネリクスに入れて動的に作成できます。
 * 例：EventRegisterForm
 * 
 * @param T フォームの型（例：EventRegisterForm）
 * @returns フィールド（詳細は下記）
 */
export type CommonRegisterFormField<T> = {
  [K in keyof T]: { // Tの各プロパティKについて繰り返します。
    name: K;
    label: string;
    required: undefined extends T[K] ? false : null extends T[K] ? false : true; // ジェネリクスの型がundefinedまたはnullを許容するならfalse, それ以外ならtrue
    elementType: HtmlElement;
    inputType?: InputType;
    placeholder?: string;
    options?: { value: string; label: string }[];
    defaultValue?: string;
  }
}[keyof T]; // nameが取りうる値を限定しています

/**
 * フォームの状態(バリデーションエラーを返す時に使う)
 * 
 * @param error バリデーションエラー
 * @param formData フォームデータ
 * @returns フォームの状態
 * 
 */
export type FormState = {
  error: ZodIssue[];
  formData?: { [key: string]: FormDataEntryValue | null };
};
