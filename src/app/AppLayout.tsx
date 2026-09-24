import type { ReactNode } from "react";

interface AppLayoutProps {
  sidebar: ReactNode;
  children: ReactNode;
}

export function AppLayout({ sidebar, children }: AppLayoutProps) {
  return (
    <div className="flex h-screen w-screen">
      <aside className="w-80 shrink-0 overflow-y-auto border-r p-4">
        {sidebar}
      </aside>
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
