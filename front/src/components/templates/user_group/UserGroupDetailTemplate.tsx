'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserGroupById, ensureAdmin } from '@/actions/user_group/editUserGroup';

type Props = {
  groupId: string;
};

export default function UserGroupDetailTemplate({ groupId }: Props) {
  const router = useRouter();
  const [group, setGroup] = useState<{ name: string; description: string } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false); // 権限判定用


  useEffect(() => {
    (async () => {
      const result = await getUserGroupById(groupId);

      if (result.success && result.data) {
        setGroup({
          name: result.data.name ?? '',
          description: result.data.description ?? '',
        });
      } else {
        console.error('ユーザーグループの取得に失敗:', result.error);
      }
      const authResult = await ensureAdmin(groupId);
      setIsAdmin(authResult.success);
    })();
  }, [groupId]);

  if (!group) {
    return <p>読み込み中...</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-xl font-bold mb-4">ユーザーグループ詳細</h1>
      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700">グループ名</label>
          <p className="border px-3 py-2 rounded bg-gray-100">{group.name}</p>
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">グループの概要</label>
          <p className="border px-3 py-2 rounded bg-gray-100 whitespace-pre-wrap">{group.description}</p>
        </div>
      </div>
      {isAdmin && (
        <div className="mt-6 text-center">
          <button
            onClick={() => router.push(`/user_group/edit/${groupId}`)}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            編集する
          </button>
        </div>
      )}
    </div>
  );
}
