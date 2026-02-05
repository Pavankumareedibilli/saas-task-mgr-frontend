import type { List } from "../types/list";
import { CardItem } from "./CardItem";
import { useState } from "react";
import { CreateCardForm } from "./CreateCardForm";

interface Props {
  list: List;
}

export function ListColumn({ list }: Props) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="w-72 bg-gray-100 rounded p-3 flex-shrink-0 flex flex-col">
      <h3 className="font-semibold mb-2">{list.title}</h3>

      <div className="flex flex-col gap-2">
        {list.cards
          .sort((a, b) => a.position - b.position)
          .map((card) => (
            <CardItem key={card.id} card={card} />
          ))}
      </div>

      {showForm ? (
        <CreateCardForm listId={list.id} onClose={() => setShowForm(false)} />
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="text-sm text-gray-600 mt-2"
        >
          + Add card
        </button>
      )}
    </div>
  );
}
