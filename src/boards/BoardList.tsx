import { useBoards } from "./useBoards";
import { useNavigate } from "react-router-dom";

export function BoardList() {
  const { boards, loading } = useBoards();
  const navigate = useNavigate();

  if (loading) {
    return <p>Loading boards...</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {boards.length === 0 && (
        <div className="bg-white border rounded-lg p-10 text-center text-gray-500">
          <p className="text-lg mb-2">No boards yet</p>
          <p className="text-sm">Create your first board to get started.</p>
        </div>
      )}
      {boards.map((board) => (
        <div
          key={board.id}
          onClick={() => navigate(`/boards/${board.id}`)}
          className="border rounded p-4 hover:bg-gray-50 cursor-pointer"
        >
          <h3 className="font-bold">{board.name}</h3>
          <p className="text-sm text-gray-500">
            Created {new Date(board.created_at).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
