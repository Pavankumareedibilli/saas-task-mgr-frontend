import { useBoardDetail } from "./useBoardDetail";
import { ListColumn } from "./ListColumn";
import { useState } from "react";
import { CreateListForm } from "./CreateListForm";
import { usePermissions } from "../permissions/usePermissions";
import { PageContainer } from "../layout/PageContainer";
import { useNavigate } from "react-router-dom";

export function BoardDetailContent() {
  const [showCreateList, setShowCreateList] = useState(false);
  const { board, loading,setBoard  } = useBoardDetail();
  const { canManageLists } = usePermissions();
  const navigate = useNavigate();

  function handleArchiveCard(listId: number, cardId: number) {
  setBoard((prev) => {
    if (!prev) return prev;

    return {
      ...prev,
      lists: prev.lists.map((l) =>
        l.id === listId
          ? { ...l, cards: l.cards.filter((c) => c.id !== cardId) }
          : l
      ),
    };
  });
}

  if (loading) {
    return (
      <PageContainer>
        <div className="animate-pulse space-y-6">
          <div className="h-6 bg-gray-200 rounded w-1/4" />
          <div className="flex gap-6">
            <div className="w-72 h-64 bg-gray-100 rounded-lg" />
            <div className="w-72 h-64 bg-gray-100 rounded-lg" />
            <div className="w-72 h-64 bg-gray-100 rounded-lg" />
          </div>
        </div>
      </PageContainer>
    );
  }

  if (!board) {
    return null;
  }

  return (
    <PageContainer>
      <div className="flex flex-col h-full">
        <button
          onClick={() => navigate("/")}
          className="text-sm text-gray-600 hover:text-black mb-4"
        >
          ← Back to Boards
        </button>
        <div
          onClick={() => navigate(`/boards/${board.id}`)}
          className="bg-white border rounded-lg p-5 shadow-sm hover:shadow-md transition cursor-pointer"
        >
          <h3 className="text-lg font-medium mb-2">{board.name}</h3>

          <p className="text-sm text-gray-500">
            Created {new Date(board.created_at).toLocaleDateString()}
          </p>
        </div>

        {board.lists.length === 0 && (
          <div className="bg-white border rounded-lg p-8 text-center text-gray-500">
            <p className="mb-2">No lists yet</p>
            {canManageLists && (
              <p className="text-sm">
                Create your first list to start organizing.
              </p>
            )}
          </div>
        )}

        <div className="flex-1 overflow-x-auto overflow-y-hidden">
          <div className="flex gap-4 p-6 min-h-full">
            {board.lists
              .sort((a, b) => a.position - b.position)
              .map((list) => (
                <ListColumn key={list.id} list={list} onArchiveCard={handleArchiveCard} />
              ))}
          </div>
        </div>
        {canManageLists &&
          (showCreateList ? (
            <CreateListForm onClose={() => setShowCreateList(false)} />
          ) : (
            <button
              onClick={() => setShowCreateList(true)}
              className="w-72 bg-gray-100 hover:bg-gray-200 border border-dashed border-gray-300 rounded-lg p-4 text-sm text-gray-600 transition"
            >
              + Add another list
            </button>
          ))}
      </div>
    </PageContainer>
  );
}
