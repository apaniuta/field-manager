import type { ReactNode } from "react";

interface AppLayoutProps {
  sidebar: ReactNode;
  children: ReactNode;
}

export function AppLayout({ sidebar, children }: AppLayoutProps) {
  return (
    // Only the sidebar scrolls: the page itself never does, so opening a
    // select or focusing a field cannot scroll the map out of view.
    <div className="flex h-dvh overflow-hidden">
      <aside className="w-80 shrink-0 overflow-y-auto border-r bg-sidebar">
        {sidebar}
      </aside>
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
