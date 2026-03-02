import type { Card } from "../types/card";
import { useState } from "react";
import { useBoardDetail } from "./useBoardDetail";
import { usePermissions } from "../permissions/usePermissions";
import { archiveCard } from "./cardApi";

interface Props {
  card: Card;
  onArchive: (id: number) => void;
}

export function CardItem({ card, onArchive }: Props) {
  const { board, moveCard, reorderCard } = useBoardDetail();
  const [showMove, setShowMove] = useState(false);
  const { canManageCards } = usePermissions();

  if (!board) return null;

  async function handleArchive() {
    const confirmArchive = window.confirm("Archive this card?");
    if (!confirmArchive) return;

    try {
      await archiveCard(card.id);
      onArchive(card.id);
    } catch {
      alert("Failed to archive card");
    }
  }

  return (
    <div className="bg-white border rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-150">
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium text-gray-800">{card.title}</p>

        {canManageCards && (
          <button
            onClick={() => setShowMove((v) => !v)}
            className="text-xs text-gray-500 hover:text-black transition"
          >
            Move
          </button>
        )}

        {canManageCards && (
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => reorderCard(card.id, "up")}
              className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition"
            >
              ↑
            </button>

            <button
              onClick={() => reorderCard(card.id, "down")}
              className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition"
            >
              ↓
            </button>

            <button
              onClick={handleArchive}
              className="text-xs text-red-500 hover:text-red-700 transition"
            >
              Archive
            </button>
          </div>
        )}
      </div>

      {showMove && (
        <select
          className="mt-2 w-full border text-xs"
          onChange={(e) => {
            const targetListId = Number(e.target.value);
            if (!targetListId) return;
            moveCard(card.id, targetListId);
            setShowMove(false);
          }}
        >
          <option value="">Select list</option>
          {board.lists.map((list) => (
            <option key={list.id} value={list.id}>
              {list.title}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}