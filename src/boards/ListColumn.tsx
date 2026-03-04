import type { List } from "../types/list";
import { CardItem } from "./CardItem";
import { useState } from "react";
import { CreateCardForm } from "./CreateCardForm";
import { usePermissions } from "../permissions/usePermissions";
import { archiveList } from "./listApi";
import { Trash2 } from "lucide-react";

interface Props {
  list: List;
  onArchiveCard: (listId: number, cardId: number) => void;
  onArchiveList: (listId: number) => void;
}

export function ListColumn({ list, onArchiveCard, onArchiveList }: Props) {
  const [showForm, setShowForm] = useState(false);
  const { canManageCards, canManageLists } = usePermissions();

  async function handleArchiveList() {
    const confirmArchive = window.confirm("Archive this list?");
    if (!confirmArchive) return;

    try {
      await archiveList(list.id);
      onArchiveList(list.id);
    } catch {
      alert("Failed to archive list");
    }
  }

  return (
    <div className="w-72 bg-gray-50 border rounded-lg p-4 flex-shrink-0 flex flex-col">
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-700">{list.title}</h3>

        {canManageLists && (
          <button
            onClick={handleArchiveList}
            className="p-1 rounded-md text-red-400 hover:text-red-500 hover:bg-red-50 transition"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {list.cards.length === 0 ? (
          <p className="text-xs text-gray-400 mb-2">No cards yet</p>
        ) : (
          list.cards.map((card) => (
            <CardItem
              key={card.id}
              card={card}
              onArchive={(cardId) => onArchiveCard(list.id, cardId)}
            />
          ))
        )}
      </div>

      {canManageCards &&
        (showForm ? (
          <CreateCardForm listId={list.id} onClose={() => setShowForm(false)} />
        ) : (
          <button
            onClick={() => setShowForm(true)}
            className="mt-3 w-full bg-gray-100 hover:bg-gray-200 text-sm text-gray-700 py-2 rounded transition"
          >
            + Add card
          </button>
        ))}
    </div>
  );
}
