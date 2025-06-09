interface FormTextareaProps {
  name: string;
  placeholder?: string;
  required?: boolean;
  hasError?: boolean;
  defaultValue?: string;
}

/**
 * フォームのテキストエリアコンポーネント
 * 
 * @param name - テキストエリアの名前（必須）
 * @param placeholder - プレースホルダーテキスト
 * @param required - 必須入力かどうか
 * @param hasError - エラー状態かどうか
 * @param defaultValue - デフォルト値
 * 
 * @example
 * ```tsx
 * <FormTextarea
 *   name="description"
 *   placeholder="説明を入力"
 *   required
 *   hasError={errors.description}
 *   defaultValue={formData.description}
 * />
 * ```
 */
export default function FormTextarea({ name, placeholder, required, hasError, defaultValue }: Readonly<FormTextareaProps>) {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      required={required}
      defaultValue={defaultValue}
      className={`w-full p-2 border rounded ${hasError ? 'border-red-500' : 'border-gray-300'}`}
      rows={4}
    />
  );
} 