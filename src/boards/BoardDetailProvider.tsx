import { useEffect, useState } from "react";
import { BoardDetailContext } from "./BoardDetailContext";
import { fetchBoardDetail } from "./detailApi";
import type { Board } from "../types/board";
import { useParams, useNavigate } from "react-router-dom";
import { useOrganization } from "../organizations/useOrganization";
import { createCard as createCardApi } from "./cardApi";
import { createList as createListApi } from "./listApi";
import { moveCard as moveCardApi } from "./cardMoveApi";
import { reorderCard as reorderCardApi } from "./cardReorderApi";

interface Props {
  children: React.ReactNode;
}

export function BoardDetailProvider({ children }: Props) {
  const { boardId } = useParams();
  const navigate = useNavigate();

  const [board, setBoard] = useState<Board | null>(null);
  const [loading, setLoading] = useState(true);
  const { activeOrg } = useOrganization();

  async function load() {
    if (!boardId || !activeOrg) return;

    try {
      setLoading(true);
      const data = await fetchBoardDetail(Number(boardId), activeOrg.id);
      setBoard(data);
    } catch {
      navigate("/", { replace: true });
    } finally {
      setLoading(false);
    }
  }

  async function createCard(listId: number, title: string) {
    if (!board) return;

    const newCard = await createCardApi(title, listId);

    setBoard((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        lists: prev.lists.map((list) =>
          list.id === listId
            ? { ...list, cards: [...list.cards, newCard] }
            : list,
        ),
      };
    });
  }

  async function createList(title: string) {
    if (!board) return;

    const newList = await createListApi(title, board.id);

    setBoard((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        lists: [...prev.lists, { ...newList, cards: [] }],
      };
    });
  }
  async function moveCard(cardId: number, targetListId: number) {
    if (!board) return;

    const movedCard = await moveCardApi(cardId, targetListId);

    setBoard((prev) => {
      if (!prev) return prev;
      const listsWithoutCard = prev.lists.map((list) => ({
        ...list,
        cards: list.cards.filter((c) => c.id !== cardId),
      }));
      return {
        ...prev,
        lists: listsWithoutCard.map((list) =>
          list.id === movedCard.list
            ? {
                ...list,
                cards: [...list.cards, movedCard],
              }
            : list,
        ),
      };
    });
  }

  async function reorderCard(cardId: number, direction: "up" | "down") {
    if (!board) return;

    let before_id: number | null = null;
    let after_id: number | null = null;

    const list = board.lists.find((l) => l.cards.some((c) => c.id === cardId));
    if (!list) return;

    const index = list.cards.findIndex((c) => c.id === cardId);
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= list.cards.length) return;

    before_id = targetIndex > 0 ? list.cards[targetIndex - 1].id : null;

    after_id =
      targetIndex < list.cards.length - 1
        ? list.cards[targetIndex + 1].id
        : null;

    setBoard((prev) => {
      if (!prev) return prev;

      const lists = prev.lists.map((l) => {
        if (l.id !== list.id) return l;

        const cards = [...l.cards];
        const [moved] = cards.splice(index, 1);
        cards.splice(targetIndex, 0, moved);

        return { ...l, cards };
      });

      return { ...prev, lists };
    });

    try {
      await reorderCardApi(cardId, {
        before_id,
        after_id,
      });
    } catch (e) {
      console.error("Reorder failed", e);
    }
  }

  useEffect(() => {
    setBoard(null);
    load();
  }, [boardId, activeOrg?.id]);

  return (
    <BoardDetailContext.Provider
      value={{
        board,
        loading,
        reloadBoard: load,
        createCard,
        createList,
        moveCard,
        reorderCard,
      }}
    >
      {children}
    </BoardDetailContext.Provider>
  );
}
