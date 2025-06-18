'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import UserGroupDetailTemplate from "@/components/templates/user_group/UserGroupDetailTemplate";
import { ensureCanViewOrRedirect } from '@/actions/user_group/viewUserGroup';

export default function UserGroupDetailPage() {
  const { id } = useParams(); // ルートパラメータからidを取得
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      if (typeof id === 'string') {
        const { success, error } = await ensureCanViewOrRedirect(id);
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

  return <UserGroupDetailTemplate groupId={id} />;
}
