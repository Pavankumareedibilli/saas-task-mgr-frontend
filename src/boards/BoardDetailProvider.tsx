import { useEffect, useState } from "react";
import { BoardDetailContext } from "./BoardDetailContext";
import { fetchBoardDetail } from "./detailApi";
import type { Board } from "../types/board";
import { useParams, useNavigate } from "react-router-dom";
import { useOrganization } from "../organizations/useOrganization";
import { createCard as createCardApi } from "./cardApi";

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
            : list
        ),
      };
    });
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
      }}
    >
      {children}
    </BoardDetailContext.Provider>
  );
}
