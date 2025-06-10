'use client';

import { useParams } from 'next/navigation';
import UserGroupEditTemplate from "@/components/templates/user_group/UserGroupEditTemplate";

export default function UserGroupEditPage() {
  const { id } = useParams(); // ルートパラメータからidを取得

  // idがまだ取得できていない場合は何も表示しない
  if (!id) {
    return <p>読み込み中...</p>;
  }

  return <UserGroupEditTemplate groupId={id as string} />;
}