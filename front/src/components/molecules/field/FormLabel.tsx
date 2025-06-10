interface FormLabelProps {
  label: string;
  required?: boolean;
}

/**
 * フォームのラベルコンポーネント
 * 
 * @param label - ラベルのテキスト（必須）
 * @param required - 必須入力かどうか
 * 
 * @example
 * ```tsx
 * <FormLabel
 *   label="メールアドレス"
 *   required
 * />
 * ```
 */
export default function FormLabel({ label, required }: Readonly<FormLabelProps>) {
  return (
    <label className="block mb-1 font-medium">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
} 