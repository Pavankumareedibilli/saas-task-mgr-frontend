import { useContext } from "react";
import { BoardDetailContext } from "./BoardDetailContext";

export function useBoardDetail() {
  const context = useContext(BoardDetailContext);

  if (!context) {
    throw new Error(
      "useBoardDetail must be used within BoardDetailProvider"
    );
  }

  return context;
}
