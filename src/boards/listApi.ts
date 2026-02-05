import { http } from "../api/http";
import type { List } from "../types/list";

export async function createList(
  title: string,
  boardId: number
): Promise<List> {
  const response = await http.post<List>("/lists/", {
    title,
    board_id: boardId,
  });
  return response.data;
}
