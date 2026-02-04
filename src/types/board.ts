import type { List } from "./list";

export interface Board  {
  id: number;
  name: string;
  created_at: string;
  lists: List[];
}

