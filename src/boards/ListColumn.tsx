import type { List } from "../types/list";

interface Props {
  list: List;
}

export function ListColumn({ list }: Props) {
  return (
    <div className="w-72 bg-gray-100 rounded p-3 flex-shrink-0">
      <h3 className="font-semibold mb-2">{list.title}</h3>

      <div className="text-sm text-gray-500">
        No cards yet
      </div>
    </div>
  );
}
