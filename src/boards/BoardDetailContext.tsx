import { createContext } from "react";
import type { Board } from "../types/board";

export interface BoardDetailContextType {
  board: Board | null;
  loading: boolean;
  reloadBoard: () => Promise<void>;
  createCard: (listId: number, title: string) => Promise<void>;
  createList: (title: string) => Promise<void>;
  moveCard: (cardId: number, targetListId: number) => Promise<void>;
  reorderCard: (
  cardId: number,
  direction: "up" | "down"
) => Promise<void>;
}

export const BoardDetailContext =
  createContext<BoardDetailContextType | undefined>(undefined);
