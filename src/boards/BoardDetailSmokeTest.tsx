// BoardDetailSmokeTest.tsx
import { useBoardDetail } from "./useBoardDetail";

export function BoardDetailSmokeTest() {
  const { board, loading } = useBoardDetail();

  if (loading) return <p>Loading board...</p>;
  if (!board) return <p>No board</p>;

  return (
    <div>
      <h1>{board.name}</h1>
      <ul>
        {board.lists.map((list) => (
          <li key={list.id}>{list.title}</li>
        ))}
      </ul>
    </div>
  );
}
