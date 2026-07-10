import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ScreenShellProps {
  title: string;
  backHref: string;
  children: ReactNode;
  className?: string;
}

/**
 * Shared wrapper for detail screens (Service Details, Booking, Confirmation).
 * Provides iOS-style toolbar with back navigation and a scrollable content area.
 * Slides in from the right on mount via CSS animation.
 */
export function ScreenShell({
  title,
  backHref,
  children,
  className,
}: ScreenShellProps) {
  return (
    <div className="flex min-h-dvh w-full justify-center bg-hs-neutral-800/10">
      <div
        className="flex h-dvh w-full max-w-[402px] flex-col bg-hs-neutral-50 animate-slide-in"
        style={{ animationFillMode: "both" }}
      >
        {/* Status bar stub — light background variant */}
        <div
          className="flex h-[44px] shrink-0 items-center justify-between px-6 pt-[14px] pb-0"
          aria-hidden
        >
          <span
            className="text-[17px] leading-[22px] font-[590] tracking-[-0.17px] text-hs-neutral-800"
            style={{
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", system-ui, sans-serif',
              fontVariationSettings: '"wdth" 100',
            }}
          >
            17:05
          </span>
        </div>

        {/* Toolbar */}
        <div className="flex h-14 shrink-0 items-center gap-1 border-b border-hs-neutral-100 px-2">
          <Link
            href={backHref}
            className="flex size-10 shrink-0 items-center justify-center rounded-full active:bg-hs-neutral-100"
            aria-label="Go back"
          >
            <ChevronLeft className="size-6 text-hs-blue-500" strokeWidth={2.5} />
          </Link>
          <h1 className="flex-1 truncate font-alumni text-[28px] leading-8 font-semibold tracking-[-0.28px] text-hs-neutral-800">
            {title}
          </h1>
        </div>

        {/* Scrollable content */}
        <div
          className={cn(
            "flex flex-1 flex-col overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            className,
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
