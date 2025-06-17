'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import UserGroupEditTemplate from "@/components/templates/user_group/UserGroupEditTemplate";
import { ensureAdmin } from '@/actions/user_group/editUserGroup';

export default function UserGroupEditPage() {
  const { id } = useParams(); // ルートパラメータからidを取得
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      if (typeof id === 'string') {
        const { success, error } = await ensureAdmin(id);
        if (!success) {
          console.error(error);
          router.push('/');
        }
      }
    };

    checkAdmin();
  }, [id, router]);

  if (!id || typeof id !== 'string') {
    return <p>読み込み中...</p>;
  }

  return <UserGroupEditTemplate groupId={id as string} />;
}
