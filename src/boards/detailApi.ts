import { http } from "../api/http";
import type { Board } from "../types/board";

export async function fetchBoardDetail(
  boardId: number,
  organizationId: number
): Promise<Board> {
  const response = await http.get<Board>(
    `/boards/${boardId}/detail/`,
    {
      params: { organization_id: organizationId }
    }
  );
  return response.data;
}
