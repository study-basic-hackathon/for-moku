import { InputType } from "@/types/common/form";

interface FormInputProps {
  name: string;
  type?: InputType;
  placeholder?: string;
  required?: boolean;
}
/**
 * フォームの入力フィールド(input要素のラッパー)
 * 
 * @param name フィールド名
 * @param type 入力タイプ
 * @param placeholder プレースホルダー
 * @param required 必須かどうか
 * @returns 入力フィールド
 */
export default function FormInput({ name, type = 'text', placeholder, required }: Readonly<FormInputProps>) {
  return (
    <input
      type={type}
      name={name}
      className="w-full border px-3 py-2 rounded"
      placeholder={placeholder}
      required={required}
    />
  );
} 