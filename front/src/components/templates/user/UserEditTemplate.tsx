// src/components/templates/user/UserEditTemplate.tsx
'use client';

import { getMyProfile, updateMyProfile } from '@/actions/user/editUser';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import UserProfileForm from './UserProfileForm';

export default function UserEditTemplate() {
  const router = useRouter();
  const [initialValues, setInitialValues] = useState<{
    name: string;
    bio: string;
    interests: string;
  } | null>(null);

  useEffect(() => {
    (async () => {
      const profile = await getMyProfile();
      if (profile) {
        setInitialValues({
          name: profile.name || '',
          bio: profile.bio || '',
          interests: profile.interests || '',
        });
      }
    })();
  }, []);

  if (!initialValues) {
    return <p>読み込み中...</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-xl font-bold mb-4">プロフィール編集</h1>
      <UserProfileForm
        initialValues={initialValues}
        onSubmit={async (data) => {
          await updateMyProfile(data);
        }}
        submitLabel="更新"
      />
    </div>
  );
}
