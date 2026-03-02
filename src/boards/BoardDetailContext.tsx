import { createContext } from "react";
import type { Board } from "../types/board";
import type { Dispatch, SetStateAction } from "react";

export interface BoardDetailContextType {
  board: Board | null;
  setBoard: Dispatch<SetStateAction<Board | null>>;
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
