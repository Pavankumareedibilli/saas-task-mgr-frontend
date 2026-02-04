import { useBoards } from "./useBoards";
import { useNavigate } from "react-router-dom";

export function BoardList() {
  const { boards, loading } = useBoards();
  const navigate = useNavigate();

  if (loading) {
    return <p>Loading boards...</p>;
  }

  if (boards.length === 0) {
    return <p>No boards yet. Create one.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
