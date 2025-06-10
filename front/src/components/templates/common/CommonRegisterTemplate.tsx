import { CommonRegisterFormField, FormState } from '@/types/common/form';
import CommonRegisterForm from '@/components/organisms/common/form/CommonRegisterForm';

interface CommonRegisterTemplateProps<T> {
  title: string;
  fields: CommonRegisterFormField<T>[];
  onSubmit: (state: FormState, formData: FormData) => Promise<FormState>;
}

/**
 * どこでも使える新規登録フォームテンプレート
 * 
 * @param title タイトル
 * @param fields フィールド（詳細はCommonRegisterFormFieldに従う）
 * @param onSubmit 送信処理
 * @returns 登録フォームテンプレート
 */
export default function CommonRegisterTemplate<T>({ title, fields, onSubmit }: Readonly<CommonRegisterTemplateProps<T>>) {
  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-xl font-bold mb-4">{title}</h1>
      <CommonRegisterForm fields={fields} onSubmit={onSubmit} />
    </div>
  );
}