interface FormSelectProps {
  name: string;
  placeholder?: string;
  required?: boolean;
  hasError?: boolean;
  defaultValue?: string;
  options: { value: string; label: string; }[];
}

/**
 * フォームのセレクトボックスコンポーネント
 * 
 * @param name - セレクトボックスの名前（必須）
 * @param placeholder - プレースホルダーテキスト
 * @param required - 必須入力かどうか
 * @param hasError - エラー状態かどうか
 * @param defaultValue - デフォルト値
 * @param options - 選択肢の配列（必須）
 * 
 * @example
 * ```tsx
 * <FormSelect
 *   name="category"
 *   placeholder="カテゴリーを選択"
 *   required
 *   hasError={errors.category}
 *   defaultValue={formData.category}
 *   options={[
 *     { value: '1', label: 'カテゴリー1' },
 *     { value: '2', label: 'カテゴリー2' }
 *   ]}
 * />
 * ```
 */
export default function FormSelect({ name, placeholder, required, hasError, defaultValue, options }: Readonly<FormSelectProps>) {
  return (
    <select
      name={name}
      required={required}
      defaultValue={defaultValue}
      className={`w-full p-2 border rounded ${hasError ? 'border-red-500' : 'border-gray-300'}`}
      key={defaultValue}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
} 