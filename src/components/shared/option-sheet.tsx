"use client";

import { useEffect } from "react";
import { Check, X } from "lucide-react";

import { cn } from "@/lib/utils";

interface OptionSheetProps {
  title: string;
  options: string[];
  selected: string | null;
  open: boolean;
  onSelect: (value: string) => void;
  onClose: () => void;
}

/**
 * SHEET-OPTIONS.md — dropdown option picker (Figma nodes `sheet 01` / `sheet 05`).
 * No grabber: heading (title + close button) sits directly at the top, options
 * render as one bordered group with row dividers, not separate cards.
 */
export function OptionSheet({
  title,
  options,
  selected,
  open,
  onSelect,
  onClose,
}: OptionSheetProps) {
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
          "fixed inset-0 z-40 bg-[#261B26] transition-opacity duration-300",
          open ? "pointer-events-auto opacity-40" : "pointer-events-none opacity-0",
        )}
      />

      {/* Sheet panel */}
      <div
        role="dialog"
        aria-modal
        aria-label={title}
        className={cn(
          "fixed bottom-0 left-1/2 z-50 flex w-full max-w-[402px] -translate-x-1/2 flex-col items-center",
          "rounded-t-[16px] bg-hs-neutral-50",
          "transition-transform duration-300 ease-out",
          open ? "translate-y-0" : "translate-y-full",
        )}
      >
        {/* Heading — title + close, no grabber */}
        <div className="flex w-full items-center gap-3 p-6">
          <p className="flex-1 font-alumni text-[36px] font-semibold leading-8 tracking-[-0.36px] text-hs-neutral-1000">
            {title}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex size-10 shrink-0 items-center justify-center rounded-[6px] bg-hs-neutral-0 p-3"
          >
            <X className="size-4 text-hs-neutral-800" strokeWidth={2} />
          </button>
        </div>

        {/* Option group — one bordered stack, dividers between rows */}
        <div className="w-full px-2">
          <div className="flex w-full flex-col overflow-hidden rounded-[10px] bg-hs-neutral-0">
            {options.map((option, i) => {
              const isSelected = option === selected;
              const isLast = i === options.length - 1;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => onSelect(option)}
                  className={cn(
                    "flex w-full items-center gap-2 p-4",
                    !isLast && "border-b-[0.5px] border-hs-neutral-100",
                  )}
                >
                  <span className="min-w-0 flex-1 truncate text-left font-sans text-base font-medium leading-6 tracking-[-0.16px] text-hs-neutral-700">
                    {option}
                  </span>
                  <span className="flex size-6 shrink-0 items-center justify-center">
                    <span
                      className={cn(
                        "flex size-[22px] shrink-0 items-center justify-center rounded-[4px] border",
                        isSelected
                          ? "border-hs-blue-500 bg-hs-blue-500"
                          : "border-hs-neutral-800 bg-hs-neutral-0",
                      )}
                    >
                      {isSelected && (
                        <Check className="size-3.5 text-hs-neutral-0" strokeWidth={3} />
                      )}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Home indicator */}
        <div className="flex h-[34px] w-full items-end justify-center pb-2">
          <div className="h-[5px] w-[134px] rounded-full bg-black/30" />
        </div>
      </div>
    </>
  );
}
