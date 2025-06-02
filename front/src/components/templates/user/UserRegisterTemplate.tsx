// src/components/templates/user/UserRegisterTemplate.tsx

'use client';

import { useState } from 'react';
import { registerUser } from '@/actions/user/registerUser';
import { useRouter } from 'next/navigation';

export default function UserRegisterTemplate() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [interests, setInterests] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      await registerUser({ name, bio, interests });
      setSuccess(true);
      router.push('/');
    } catch (err: any) {
      setError(err.message || '登録に失敗しました');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-xl font-bold mb-4">ユーザー登録</h1>
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
            rows={10}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">興味のある分野 (interests)</label>
          <input
            type="text"
            value={interests}
            onChange={e => setInterests(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">登録に成功しました！</p>}

        <div className="text-center">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
            登録
          </button>
        </div>
      </form>
    </div>
  );
}
