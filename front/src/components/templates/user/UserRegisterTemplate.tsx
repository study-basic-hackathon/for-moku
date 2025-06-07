// src/components/templates/user/UserRegisterTemplate.tsx
'use client';

import { registerUser } from '@/actions/user/registerUser';
import { useRouter } from 'next/navigation';
import UserProfileForm from './UserProfileForm';

export default function UserRegisterTemplate() {
  const router = useRouter();

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-xl font-bold mb-4">ユーザー登録</h1>
      <UserProfileForm
        onSubmit={async (data) => {
          await registerUser(data);
          router.push('/');
        }}
        submitLabel="登録"
      />
    </div>
  );
}
