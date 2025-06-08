import { CommonRegisterFormField } from '@/types/common/form';
import FormInput from '@/components/organisms/common/form/FormInput';
import FormTextarea from '@/components/organisms/common/form/FormTextarea';
import FormSelect from '@/components/organisms/common/form/FormSelect';

interface CommonRegisterTemplateProps<T> {
  title: string;
  fields: CommonRegisterFormField<T>[];
  onSubmit: (formData: FormData) => Promise<void>;
}

/**
 * どこでも使える新規登録フォームテンプレート
 * 
 * @param title タイトル
 * @param fields フィールド（詳細は）
 * @param onSubmit 送信処理
 * @returns 登録フォームテンプレート
 */
export default function CommonRegisterTemplate<T>({ title, fields, onSubmit }: Readonly<CommonRegisterTemplateProps<T>>) {
  const renderField = (field: CommonRegisterFormField<T>) => {
    if (field.elementType === 'textarea') {
      return (
        <FormTextarea
          name={field.name.toString()}
          placeholder={field.placeholder}
          required={field.required}
        />
      );
    }

    if (field.elementType === 'select') {
      return (
        <FormSelect
          name={field.name.toString()}
          placeholder={field.placeholder}
          required={field.required}
          options={field.options ?? []}
        />
      );
    }

    return (
      <FormInput
        name={field.name.toString()}
        type={field.inputType}
        placeholder={field.placeholder}
        required={field.required}
      />
    );
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-xl font-bold mb-4">{title}</h1>
      <form action={onSubmit} className="space-y-4">
        {fields.map((field) => (
          <div key={field.name.toString()}>
            <label className="block mb-1 font-medium">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {renderField(field)}
          </div>
        ))}

        <div className="text-center">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
            登録
          </button>
        </div>
      </form>
    </div>
  );
}