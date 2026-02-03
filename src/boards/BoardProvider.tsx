import { useEffect, useState } from "react";
import { BoardContext } from "./BoardContext";
import { fetchBoards, createBoard as createBoardApi } from "./api";
import type { Board } from "../types/board";
import { useOrganization } from "../organizations/useOrganization";

interface Props {
  children: React.ReactNode;
}

export function BoardProvider({ children }: Props) {
  const { activeOrg } = useOrganization();
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBoards() {
      if (!activeOrg) {
        setBoards([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      const data = await fetchBoards(activeOrg.id);
      setBoards(data);
      setLoading(false);
    }

    loadBoards();
  }, [activeOrg]);

  async function reloadBoards() {
    if (!activeOrg) return;
    setLoading(true);
    const data = await fetchBoards(activeOrg.id);
    setBoards(data);
    setLoading(false);
  }

  async function createBoard(name: string) {
    if (!activeOrg) return;
    const newBoard = await createBoardApi(name, activeOrg.id);
    setBoards((prev) => [...prev, newBoard]);
  }

  return (
    <BoardContext.Provider
      value={{
        boards,
        loading,
        createBoard,
        reloadBoards,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}
