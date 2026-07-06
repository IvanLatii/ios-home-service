"use client";

import { cn } from "@/lib/utils";
import type { ServiceChip } from "@/lib/home-data";

interface ServiceChipRowProps {
  chips: ServiceChip[];
  /** Corner radius token — Figma uses 6px for "Popular services", 8px for category chips. */
  radius?: 6 | 8;
  onChipClick?: (chip: ServiceChip) => void;
}

export function ServiceChipRow({
  chips,
  radius = 6,
  onChipClick,
}: ServiceChipRowProps) {
  return (
    <div className="w-full overflow-x-auto px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex w-max items-center gap-1">
        {chips.map((chip) => (
          <button
            key={chip.id}
            type="button"
            onClick={() => onChipClick?.(chip)}
            className={cn(
              "shrink-0 bg-hs-neutral-0 px-4 py-3 font-sans text-base leading-6 font-medium whitespace-nowrap text-hs-neutral-700 tracking-[-0.16px]",
              radius === 8 ? "rounded-[8px]" : "rounded-[6px]",
            )}
          >
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  );
}
