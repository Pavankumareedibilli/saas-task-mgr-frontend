import type { Card } from "../types/card";
import { useState } from "react";
import { useBoardDetail } from "./useBoardDetail";
import { usePermissions } from "../permissions/usePermissions";
import { archiveCard } from "./cardApi";
import { Trash2 } from "lucide-react";

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
      <div className="bg-white border rounded-lg p-3 shadow-sm space-y-2">
        <p className="text-sm font-medium text-gray-800 break-words">
          {card.title}
        </p>
        {canManageCards && (
          <div className="flex items-center justify-between pt-2 border-t">
            <button
              onClick={() => setShowMove((v) => !v)}
              className="text-xs text-gray-600 hover:text-black"
            >
              Move
            </button>

            <div className="flex items-center gap-1">
              <button
                onClick={() => reorderCard(card.id, "up")}
                className="h-6 w-6 flex items-center justify-center text-xs bg-gray-100 hover:bg-gray-200 rounded"
              >
                ↑
              </button>

              <button
                onClick={() => reorderCard(card.id, "down")}
                className="h-6 w-6 flex items-center justify-center text-xs bg-gray-100 hover:bg-gray-200 rounded"
              >
                ↓
              </button>

              <button
                onClick={handleArchive}
                className="p-1 rounded-md text-red-400 hover:text-red-600 hover:bg-red-50 transition"
              >
                <Trash2 size={16} />
              </button>
            </div>
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
