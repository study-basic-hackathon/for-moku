// src/components/templates/user/UserProfileForm.tsx
'use client';

import { useState } from 'react';

type Props = {
  initialValues?: {
    name: string;
    bio: string;
    interests: string;
  };
  onSubmit: (data: { name: string; bio: string; interests: string }) => Promise<void>;
  submitLabel?: string;
  pending?: boolean;
};

export default function UserProfileForm({
  initialValues,
  onSubmit,
  submitLabel = '送信',
  pending = false,
}: Props) {
  // フォームの各フィールドの状態を管理
  const [name, setName] = useState(initialValues?.name ?? '');
  const [bio, setBio] = useState(initialValues?.bio ?? '');
  const [interests, setInterests] = useState(initialValues?.interests ?? '');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // フォーム送信時の処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      // onSubmit関数を呼び出し、成功時に成功メッセージを表示
      await onSubmit({ name, bio, interests });
      setSuccess(true);
    } catch (err: any) {
      // エラー発生時にエラーメッセージを設定
      setError(err.message || '送信に失敗しました');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">ユーザー名</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">自己紹介</label>
        <textarea
          value={bio}
          onChange={e => setBio(e.target.value)}
          rows={8}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">興味のある分野</label>
        <input
          type="text"
          value={interests}
          onChange={e => setInterests(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">{submitLabel}しました！</p>}

      <div className="text-center">
        <button
          type="submit"
          disabled={pending}
          className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
        >
          {pending ? '送信中...' : submitLabel}
        </button>
      </div>
    </form>
  );
}
