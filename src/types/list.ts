import type { Card } from "./card";

export interface List {
  id: number;
  title: string;
  position: number;
  cards: Card[];
}
    