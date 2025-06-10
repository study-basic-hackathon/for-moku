'use client';

import { useEffect, useState } from 'react';
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

  useEffect(() => {
    (async () => {
      // 指定されたグループIDでユーザーグループ情報を取得
      const group = await getUserGroupById(groupId);
      if (group) {
        setInitialValues({
          name: group.name || '',
          description: group.description || '',
        });
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
          await updateUserGroup(groupId, data);
          router.push('/');
        }}
        submitLabel="更新"
      />
    </div>
  );
}