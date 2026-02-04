import { createContext } from "react";
import type { Board } from "../types/board";

export interface BoardDetailContextType {
  board: Board | null;
  loading: boolean;
  reloadBoard: () => Promise<void>;
}

export const BoardDetailContext =
  createContext<BoardDetailContextType | undefined>(undefined);
