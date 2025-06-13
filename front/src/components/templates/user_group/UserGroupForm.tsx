import { useEffect, useState } from 'react';

type Props = {
  initialValues?: {
    name: string;
    description: string;
  };
  onSubmit: (data: { name: string; description: string }) => Promise<void>;
  submitLabel?: string;
  pending?: boolean;
};

export default function UserGroupForm({
  initialValues,
  onSubmit,
  submitLabel = '送信',
  pending = false,
}: Props) {
  const [name, setName] = useState(initialValues?.name ?? '');
  const [description, setDescription] = useState(initialValues?.description ?? '');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);


  // 初期値が変わったらフォームに反映させる
  useEffect(() => {
    if (initialValues) {
      setName(initialValues.name);
      setDescription(initialValues.description);
    }
  }, [initialValues]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      await onSubmit({ name, description });
      setSuccess(true);
    } catch (err: any) {
      // エラー発生時にエラーメッセージを設定
      setError(err.message || '送信に失敗しました');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">グループ名</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">グループの概要</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={6}
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
