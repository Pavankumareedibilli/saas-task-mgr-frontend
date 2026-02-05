import type { Card } from "../types/card";

interface Props {
  card: Card;
}

export function CardItem({ card }: Props) {
  return (
    <div className="bg-white rounded p-3 shadow-sm border text-sm">
      {card.title}
    </div>
  );
}
