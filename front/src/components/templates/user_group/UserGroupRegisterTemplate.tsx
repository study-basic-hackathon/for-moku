'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { registerUserGroup } from '@/actions/user_group/registerUserGroup';
import { useActionState } from 'react'; // ← 修正ポイント
import type { FormEvent } from 'react';

export default function UserGroupRegisterTemplate() {
  const router = useRouter();
  const initialState = { success: false, error: '' };
  const [state, formAction] = useActionState(registerUserGroup, initialState);

  useEffect(() => {
    if (state.success) {
      router.push('/');
    }
  }, [state.success, router]);

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-xl font-bold mb-4">ユーザーグループ登録</h1>
      <form action={formAction} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">グループ名</label>
          <input
            type="text"
            name="name"
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">グループの概要</label>
          <textarea
            name="description"
            rows={6}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {state.error && <p className="text-red-600">{state.error}</p>}
        {state.success && <p className="text-green-600">登録に成功しました！</p>}

        <div className="text-center">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
            登録
          </button>
        </div>
      </form>
    </div>
  );
}
