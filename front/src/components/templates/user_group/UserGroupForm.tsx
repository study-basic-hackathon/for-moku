'use client';

import { useState } from 'react';

type Props = {
  initialValues?: {
    name: string;
    description: string;
  };
  onSubmit: (data: { name: string; description: string }) => Promise<void>;
  submitLabel?: string;
};

export default function UserGroupForm({
  initialValues,
  onSubmit,
  submitLabel = '送信',
}: Props) {
  const [name, setName] = useState(initialValues?.name ?? '');
  const [description, setDescription] = useState(initialValues?.description ?? '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ name, description });
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

      <div className="text-center">
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}