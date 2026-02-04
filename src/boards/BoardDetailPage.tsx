import { BoardDetailProvider } from "./BoardDetailProvider";
import { BoardDetailContent } from "./BoardDetailContent";

export function BoardDetailPage() {
  return (
    <BoardDetailProvider>
      <BoardDetailContent />
    </BoardDetailProvider>
  );
}
