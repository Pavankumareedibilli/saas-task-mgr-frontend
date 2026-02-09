import type { Card } from "../types/card";
import { useState } from "react";
import { useBoardDetail } from "./useBoardDetail";
interface Props {
  card: Card;
}

export function CardItem({ card }: Props) {
  const { board, moveCard } = useBoardDetail();
  const [showMove, setShowMove] = useState(false);

  if (!board) return null;

  return (
    <div className="bg-white rounded p-3 shadow-sm border text-sm">
      <div className="flex justify-between items-center">
        <span>{card.title}</span>
        <button
          onClick={() => setShowMove((v) => !v)}
          className="text-xs text-gray-500"
        >
          Move
        </button>
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
