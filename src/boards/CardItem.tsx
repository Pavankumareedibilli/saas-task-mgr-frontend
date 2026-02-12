import type { Card } from "../types/card";
import { useState } from "react";
import { useBoardDetail } from "./useBoardDetail";
import { usePermissions } from "../permissions/usePermissions";

interface Props {
  card: Card;
}

export function CardItem({ card }: Props) {
  const { board, moveCard } = useBoardDetail();
  const [showMove, setShowMove] = useState(false);
  const { reorderCard } = useBoardDetail();
  const { canManageCards } = usePermissions();

  if (!board) return null;

  return (
    <div className="bg-white rounded p-3 shadow-sm border text-sm">
      <div className="flex justify-between items-center">
        <span>{card.title}</span>
        {canManageCards && (
          <button
            onClick={() => setShowMove((v) => !v)}
            className="text-xs text-gray-500"
          >
            Move
          </button>
        )}
        {canManageCards && (
          <div className="flex gap-1">
            <button
              onClick={() => reorderCard(card.id, "up")}
              className="text-xs text-gray-500"
            >
              ↑
            </button>
            <button
              onClick={() => reorderCard(card.id, "down")}
              className="text-xs text-gray-500"
            >
              ↓
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
