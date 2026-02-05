import { useState } from "react";
import { useBoardDetail } from "./useBoardDetail";

interface Props {
  listId: number;
  onClose: () => void;
}

export function CreateCardForm({ listId, onClose }: Props) {
  const { createCard } = useBoardDetail();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      setLoading(true);
      await createCard(listId, title.trim());
      setTitle("");
      onClose();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        className="w-full border p-2 text-sm"
        placeholder="Card title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="flex gap-2">
        <button
          disabled={loading}
          className="bg-blue-600 text-white px-3 py-1 text-sm"
        >
          Add
        </button>
        <button
          type="button"
          onClick={onClose}
          className="text-sm"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
