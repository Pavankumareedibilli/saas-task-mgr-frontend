import { useState } from "react";
import { useBoards } from "./useBoards";

interface Props {
  onClose: () => void;
}

export function CreateBoardModal({ onClose }: Props) {
  const { createBoard } = useBoards();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Board name required");
      return;
    }

    try {
      setLoading(true);
      await createBoard(name.trim());
      onClose();
    } catch {
      setError("Failed to create board");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded w-96 space-y-4"
      >
        <h2 className="text-lg font-bold">Create Board</h2>

        {error && <p className="text-red-600">{error}</p>}

        <input
          className="w-full border p-2"
          placeholder="Board name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="border px-4 py-2"
          >
            Cancel
          </button>
          <button
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
