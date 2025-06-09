interface FormSelectProps {
  name: string;
  placeholder?: string;
  required?: boolean;
  options: { value: string; label: string; }[];
}

/**
 * フォームのセレクトボックス要素(select要素のラッパー)
 * 
 * @param name フィールド名
 * @param placeholder プレースホルダー
 * @param required 必須かどうか
 * @param options 選択肢の配列
 * @returns セレクトボックス要素
 */
export default function FormSelect({ name, placeholder, required, options }: Readonly<FormSelectProps>) {
  return (
    <select
      name={name}
      className="w-full border px-3 py-2 rounded"
      required={required}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
} 