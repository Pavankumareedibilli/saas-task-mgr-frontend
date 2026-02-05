import { http } from "../api/http";
import type { Card } from "../types/card";

export async function createCard(
  title: string,
  list_id: number
): Promise<Card> {
  const response = await http.post<Card>("/cards/", {
    title,
    list_id: list_id,
  });
  return response.data;
}
