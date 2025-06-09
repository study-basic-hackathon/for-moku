import { HTMLInputTypeAttribute } from 'react';

interface FormInputProps {
  name: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  required?: boolean;
  hasError?: boolean;
  defaultValue?: string;
}

/**
 * フォームの入力フィールドコンポーネント
 * 
 * @param name - 入力フィールドの名前（必須）
 * @param type - 入力タイプ（text, email, password等）
 * @param placeholder - プレースホルダーテキスト
 * @param required - 必須入力かどうか
 * @param hasError - エラー状態かどうか
 * @param defaultValue - デフォルト値
 * 
 * @example
 * ```tsx
 * <FormInput
 *   name="email"
 *   type="email"
 *   placeholder="メールアドレスを入力"
 *   required
 *   hasError={errors.email}
 *   defaultValue={formData.email}
 * />
 * ```
 */
export default function FormInput({ name, type = 'text', placeholder, required, hasError, defaultValue }: Readonly<FormInputProps>) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      defaultValue={defaultValue}
      className={`w-full p-2 border rounded ${hasError ? 'border-red-500' : 'border-gray-300'}`}
    />
  );
} 