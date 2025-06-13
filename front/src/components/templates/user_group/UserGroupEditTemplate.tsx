'use client';

import { useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { getUserGroupById, updateUserGroup } from '@/actions/user_group/editUserGroup';
import UserGroupForm from './UserGroupForm';

type Props = {
  groupId: string;
};

export default function UserGroupEditTemplate({ groupId }: Props) {
  const router = useRouter();
  const [initialValues, setInitialValues] = useState<{
    name: string;
    description: string;
  } | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    (async () => {
      const result = await getUserGroupById(groupId);

      if (result.success && result.data) {
        setInitialValues({
          name: result.data.name ?? '',
          description: result.data.description ?? '',
        });
      } else {
        console.error('ユーザーグループの取得に失敗:', result.error);
      }
    })();
  }, [groupId]);


  if (!initialValues) {
    return <p>読み込み中...</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-xl font-bold mb-4">ユーザーグループ編集</h1>
      <UserGroupForm
        initialValues={initialValues}
        onSubmit={async (data) => {
          startTransition(() => {
          updateUserGroup(groupId, data);
          router.push('/');
          });
        }}
        submitLabel="更新"
        pending={isPending}
      />
    </div>
  );
}