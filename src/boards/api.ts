import { http } from "../api/http";
import type{ Board } from "../types/board";

export async function fetchBoards(
  organizationId: number
): Promise<Board[]> {
  const response = await http.get<Board[]>(
    `/boards/?organization=${organizationId}`
  );
  return response.data;
}

export async function createBoard(
  name: string,
  organizationId: number
): Promise<Board> {
  const response = await http.post<Board>("/boards/", {
    name,
    organization: organizationId,
  });
  return response.data;
}
