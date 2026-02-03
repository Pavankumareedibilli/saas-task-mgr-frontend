import { createContext } from "react";
import type { Board } from "../types/board";

export interface BoardContextType {
  boards: Board[];
  loading: boolean;
  createBoard: (name: string) => Promise<void>;
  reloadBoards: () => Promise<void>;
}

export const BoardContext =
  createContext<BoardContextType | undefined>(undefined);
