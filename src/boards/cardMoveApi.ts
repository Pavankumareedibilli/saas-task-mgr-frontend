import { http } from "../api/http";
import type { Card } from "../types/card";

export async function moveCard(
  cardId: number,
  targetListId: number
): Promise<Card & { list: number }> {
  const response = await http.patch<Card & { list: number }>(
    `/cards/${cardId}/move/`,
    {
      target_list_id: targetListId,
    }
  );
  return response.data;
}
