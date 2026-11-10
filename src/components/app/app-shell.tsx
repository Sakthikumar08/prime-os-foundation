import { useState, type ReactNode } from "react";

import { NavBar } from "@/components/app/nav-bar";
import { OfflineIndicator } from "@/components/app/offline-indicator";
import { QuickAddSheet } from "@/components/app/quick-add-sheet";

/** Signed-in chrome: navigation, quick add, offline pill and the page column. */
export function AppShell({ children }: { children: ReactNode }) {
  const [quickAddOpen, setQuickAddOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-background">
      <OfflineIndicator />
      <NavBar onQuickAdd={() => setQuickAddOpen(true)} />
      <main
        id="main"
        className="pt-safe pb-[calc(var(--spacing-nav)+env(safe-area-inset-bottom)+6rem)] md:pb-12 md:pl-rail lg:pl-rail-wide"
      >
        <div className="mx-auto w-full max-w-content px-page pt-8 md:px-8 md:pt-12">{children}</div>
      </main>
      <QuickAddSheet open={quickAddOpen} onOpenChange={setQuickAddOpen} />
    </div>
  );
}
