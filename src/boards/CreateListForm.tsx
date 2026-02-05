import { useState } from "react";
import { useBoardDetail } from "./useBoardDetail";

interface Props {
  onClose: () => void;
}

export function CreateListForm({ onClose }: Props) {
  const { createList } = useBoardDetail();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setLoading(true);
      await createList(title.trim());
      setTitle("");
      onClose();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-72 bg-gray-100 rounded p-3 flex-shrink-0"
    >
      <input
        className="w-full border p-2 text-sm mb-2"
        placeholder="List title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="flex gap-2">
        <button
          disabled={loading}
          className="bg-blue-600 text-white px-3 py-1 text-sm"
        >
          Add List
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
