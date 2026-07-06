import type { ReactNode } from "react";

import { BottomTabBar } from "@/components/layout/bottom-tab-bar";

interface MobileShellProps {
  children?: ReactNode;
}

export function MobileShell({ children }: MobileShellProps) {
  return (
    <div className="flex min-h-dvh w-full justify-center bg-muted/40">
      <div className="relative flex h-dvh w-full max-w-[393px] flex-col overflow-hidden bg-background sm:border-x sm:border-border sm:shadow-xl">
        <div aria-hidden className="h-[var(--safe-area-top)] shrink-0" />
        <main className="flex-1 overflow-y-auto">{children}</main>
        <BottomTabBar />
      </div>
    </div>
  );
}
