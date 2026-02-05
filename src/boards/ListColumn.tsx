import type { List } from "../types/list";
import { CardItem } from "./CardItem";

interface Props {
  list: List;
}

export function ListColumn({ list }: Props) {
  return (
    <div className="w-72 bg-gray-100 rounded p-3 flex-shrink-0 flex flex-col">
      <h3 className="font-semibold mb-2">{list.title}</h3>

      <div className="flex flex-col gap-2">
        {list.cards
          .sort((a, b) => a.position - b.position)
          .map((card) => (
            <CardItem key={card.id} card={card} />
          ))}
      </div>
    </div>
  );
}
