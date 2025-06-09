import { CommonRegisterFormField, FormState } from '@/types/common/form';
import FormLabel from '@/components/molecules/field/FormLabel';
import FormSubmitButton from '@/components/molecules/field/FormSubmitButton';
import FormField from '@/components/organisms/common/form/FormField';
import { useActionState } from 'react';

interface CommonRegisterFormProps<T> {
  fields: CommonRegisterFormField<T>[];
  onSubmit: (state: FormState, formData: FormData) => Promise<FormState>;
}

/**
 *  汎用的なドメインで使える登録フォーム（主に新規登録で使用）
 * 
 * @param fields フィールド（詳細はCommonRegisterFormFieldに従う）
 * @param onSubmit 送信処理
 * @returns 登録フォーム
 */
export default function CommonRegisterForm<T>({ fields, onSubmit }: Readonly<CommonRegisterFormProps<T>>) {
  const initialState: FormState = { error: [], formData: undefined };
  const [formState, dispatch, isPending] = useActionState<FormState, FormData>(onSubmit, initialState);

  return (
    <form action={dispatch} className="space-y-4">
      {fields.map((field) => {
        const hasError = formState.error?.some(error => error.path.includes(field.name.toString()));
        const value = formState.formData?.[field.name.toString()];
        const stringValue = value instanceof File ? value.name : value?.toString() ?? field.defaultValue ?? '';

        return (
          <div key={field.name.toString()}>
            <FormLabel label={field.label} required={field.required} />
            <FormField
              field={field}
              hasError={hasError}
              defaultValue={stringValue}
            />
          </div>
        );
      })}

      {formState.error && formState.error.length > 0 && (
        <div className="text-red-500 text-center">
          {formState.error.map(error => (
            <div key={error.message}>
              {error.message}
              <br />
            </div>
          ))}
        </div>
      )}

      <FormSubmitButton isPending={isPending} />
    </form>
  );
} 