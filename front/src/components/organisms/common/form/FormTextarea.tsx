interface FormTextareaProps {
  name: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}

/**
 * フォームのテキストエリア要素(textarea要素のラッパー)
 * 
 * @param name フィールド名
 * @param placeholder プレースホルダー
 * @param required 必須かどうか
 * @param rows 行数
 * @returns テキストエリア要素
 */
export default function FormTextarea({ name, placeholder, required, rows = 4 }: Readonly<FormTextareaProps>) {
  return (
    <textarea
      name={name}
      rows={rows}
      className="w-full border px-3 py-2 rounded"
      placeholder={placeholder}
      required={required}
    />
  );
} 