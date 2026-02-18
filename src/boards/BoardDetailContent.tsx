import { useBoardDetail } from "./useBoardDetail";
import { ListColumn } from "./ListColumn";
import { useState } from "react";
import { CreateListForm } from "./CreateListForm";
import { usePermissions } from "../permissions/usePermissions";
import { PageContainer } from "../layout/PageContainer";
import { useNavigate } from "react-router-dom";

export function BoardDetailContent() {
  const [showCreateList, setShowCreateList] = useState(false);
  const { board, loading } = useBoardDetail();
  const { canManageLists } = usePermissions();
  const navigate = useNavigate();

  if (loading) {
    return <div className="p-6">Loading board...</div>;
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

        <div className="flex-1 overflow-x-auto overflow-y-hidden">
          <div className="flex gap-4 p-6 min-h-full">
            {board.lists
              .sort((a, b) => a.position - b.position)
              .map((list) => (
                <ListColumn key={list.id} list={list} />
              ))}
          </div>
        </div>
        {canManageLists &&
          (showCreateList ? (
            <CreateListForm onClose={() => setShowCreateList(false)} />
          ) : (
            <button
              onClick={() => setShowCreateList(true)}
              className="w-72 border border-dashed rounded p-3 text-sm text-gray-600 flex-shrink-0"
            >
              + Add another list
            </button>
          ))}
      </div>
    </PageContainer>
  );
}
