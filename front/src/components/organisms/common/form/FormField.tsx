import { CommonRegisterFormField } from '@/types/common/form';
import FormInput from '@/components/molecules/field/FormInput';
import FormTextarea from '@/components/molecules/field/FormTextarea';
import FormSelect from '@/components/molecules/field/FormSelect';
import FormInputDate from '@/components/molecules/field/FormInputDate';

interface FormFieldProps<T> {
  field: CommonRegisterFormField<T>;
  hasError: boolean;
  defaultValue: string;
}

/**
 * フォームフィールドのレンダリングコンポーネント(fieldの種類に応じて適切な要素をレンダリング)
 * 
 * @param field - フィールドの設定（必須）
 * @param hasError - エラー状態かどうか
 * @param defaultValue - デフォルト値
 * 
 * @example
 * ```tsx
 * <FormField
 *   field={{
 *     name: 'email',
 *     label: 'メールアドレス',
 *     elementType: 'input',
 *     inputType: 'email',
 *     required: true
 *   }}
 *   hasError={errors.email}
 *   defaultValue={'デフォルト値'}
 * />
 * ```
 */
export default function FormField<T>({ field, hasError, defaultValue }: Readonly<FormFieldProps<T>>) {
  
  // テキストエリアの場合
  if (field.elementType === 'textarea') {
    return (
      <FormTextarea
        name={field.name.toString()}
        placeholder={field.placeholder}
        required={field.required}
        hasError={hasError}
        defaultValue={defaultValue}
      />
    );
  }

  // セレクトボックスの場合
  if (field.elementType === 'select') {
    return (
      <FormSelect
        name={field.name.toString()}
        placeholder={field.placeholder}
        required={field.required}
        options={field.options ?? []}
        hasError={hasError}
        defaultValue={defaultValue}
      />
    );
  }
  // 日付入力フィールドの場合
  if (field.elementType === 'input' && field.inputType === 'date') {
    return (
      <FormInputDate
        name={field.name.toString()}
        placeholder={field.placeholder}
        hasError={hasError}
        defaultValue={defaultValue}
      />
    );
  }

  // その他のフィールドの場合
  return (
    <FormInput
      name={field.name.toString()}
      type={field.inputType ?? 'text'}
      placeholder={field.placeholder}
      required={field.required}
      hasError={hasError}
      defaultValue={defaultValue}
    />
  );
} 