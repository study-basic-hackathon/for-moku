'use client';


import { useRouter } from 'next/navigation';
import { registerMyUserGroup } from '@/actions/user_group/registerUserGroup';
import UserGroupForm from './UserGroupForm';

export default function UserGroupRegisterTemplate() {
  const router = useRouter();

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-xl font-bold mb-4">ユーザーグループ登録</h1>
      <UserGroupForm
        onSubmit={async (data) => {
          await registerMyUserGroup(data);
          router.push('/');
        }}
        submitLabel="登録"
      />
    </div>
  );
}