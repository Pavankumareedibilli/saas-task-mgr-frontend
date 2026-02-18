import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function PageContainer({ children }: Props) {
  return (
    <div className="px-6 py-6 max-w-7xl mx-auto">
      {children}
    </div>
  );
}
