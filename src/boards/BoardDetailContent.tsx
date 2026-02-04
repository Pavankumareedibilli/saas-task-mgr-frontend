import { useBoardDetail } from "./useBoardDetail";
import { ListColumn } from "./ListColumn";

export function BoardDetailContent() {
  const { board, loading } = useBoardDetail();

  if (loading) {
    return <div className="p-6">Loading board...</div>;
  }

  if (!board) {
    return null;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="border-b px-6 py-4">
        <h1 className="text-xl font-bold">{board.name}</h1>
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
    </div>
  );
}
