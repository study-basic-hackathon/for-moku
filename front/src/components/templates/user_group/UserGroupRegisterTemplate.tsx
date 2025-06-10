'use client';

import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { registerMyUserGroup } from '@/actions/user_group/registerUserGroup';
import { useEffect } from 'react';
import UserGroupForm from './UserGroupForm';

export default function UserGroupRegisterTemplate() {
  const router = useRouter();
  const initialState = { success: false, error: '' };
  const [state, formAction] = useActionState(registerMyUserGroup, initialState);

  useEffect(() => {
    // 登録が成功した場合、ホームページにリダイレクト
    if (state.success) {
      router.push('/');
    }
  }, [state.success, router]);

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-xl font-bold mb-4">ユーザーグループ登録</h1>
      <UserGroupForm
        onSubmit={async (data) => {
          const formData = new FormData();
          formData.set('name', data.name);
          formData.set('description', data.description);
          return formAction(formData);
        }}
        submitLabel="登録"
      />
      {state.error && <p className="text-red-600">{state.error}</p>}
      {state.success && <p className="text-green-600">登録に成功しました！</p>}
    </div>
  );
}