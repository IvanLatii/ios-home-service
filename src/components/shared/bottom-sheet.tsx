"use client";

import { useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BottomSheetProps {
  title: string;
  open: boolean;
  onClose: () => void;
  /** Option-list mode (existing dropdowns). Omit when using children. */
  options?: string[];
  selected?: string | null;
  onSelect?: (value: string) => void;
  /** Custom content replaces the options list. */
  children?: ReactNode;
}

export function BottomSheet({
  title,
  open,
  onClose,
  options,
  selected,
  onSelect,
  children,
}: BottomSheetProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Overlay */}
      <div
        aria-hidden
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 transition-opacity duration-300",
          "bg-[#261B26]",
          open
            ? "opacity-40 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      />

      {/* Sheet panel */}
      <div
        role="dialog"
        aria-modal
        aria-label={title}
        className={cn(
          "fixed bottom-0 left-1/2 z-50 flex w-full max-w-[402px] -translate-x-1/2 flex-col",
          "rounded-t-[20px] bg-hs-neutral-50 pb-[34px]",
          "transition-transform duration-300 ease-out",
          open ? "translate-y-0" : "translate-y-full",
        )}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-4">
          <div className="h-[5px] w-10 rounded-full bg-hs-neutral-300" />
        </div>

        {/* Title */}
        <p className="px-6 pb-4 font-alumni text-[36px] font-semibold leading-8 tracking-[-0.36px] text-hs-neutral-800">
          {title}
        </p>

        {/* Content — custom children OR default option list */}
        {children ?? (
          <div className="flex flex-col gap-2 px-2">
            {options?.map((option) => {
              const isSelected = option === selected;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => onSelect?.(option)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-[8px] px-4 py-[14px]",
                    "border-[0.5px] bg-hs-neutral-0",
                    isSelected ? "border-hs-blue-500" : "border-hs-neutral-100",
                  )}
                >
                  <span
                    className={cn(
                      "font-sans text-base leading-6 tracking-[-0.16px]",
                      isSelected
                        ? "font-medium text-hs-neutral-800"
                        : "font-normal text-hs-neutral-700",
                    )}
                  >
                    {option}
                  </span>
                  <span
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-full border-[1.5px]",
                      isSelected
                        ? "border-hs-blue-500 bg-hs-blue-500"
                        : "border-hs-neutral-300 bg-transparent",
                    )}
                  >
                    {isSelected && (
                      <span className="block size-2 rounded-full bg-hs-neutral-0" />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
