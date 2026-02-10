import { http } from "../api/http";
export async function reorderCard(
  cardId: number,
  payload: {
    before_id: number | null;
    after_id: number | null;
  }
) {
  return http.patch(`/cards/${cardId}/reorder/`, payload);
}
