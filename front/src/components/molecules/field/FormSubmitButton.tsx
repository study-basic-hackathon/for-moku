interface FormSubmitButtonProps {
  isPending: boolean;
  label?: string;
  pendingLabel?: string;
}

/**
 * フォームの送信ボタンコンポーネント
 * 
 * @param isPending - 送信中の状態かどうか（必須）
 * @param label - ボタンのラベル（デフォルト: '登録'）
 * @param pendingLabel - 送信中のボタンのラベル（デフォルト: '送信中...'）
 * 
 * @example
 * ```tsx
 * <FormSubmitButton
 *   isPending={isPending}
 *   label="保存"
 *   pendingLabel="保存中..."
 * />
 * ```
 */
export default function FormSubmitButton({ isPending, label = '登録', pendingLabel = '送信中...' }: Readonly<FormSubmitButtonProps>) {
  return (
    <div className="text-center">
      <button 
        type="submit" 
        className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
        disabled={isPending}
      >
        {isPending ? pendingLabel : label}
      </button>
    </div>
  );
} 