import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface DropdownFieldProps {
  /** Placeholder label shown when nothing is selected */
  label: string;
  /** Currently selected value; null = show placeholder */
  value: string | null;
  onClick: () => void;
  className?: string;
}

export function DropdownField({
  label,
  value,
  onClick,
  className,
}: DropdownFieldProps) {
  const isFilled = value !== null;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2 overflow-hidden rounded-[8px] bg-hs-neutral-0 p-4 text-left",
        "border-[0.5px]",
        isFilled ? "border-hs-neutral-200" : "border-hs-neutral-100",
        className,
      )}
    >
      <span
        className={cn(
          "flex-1 truncate font-sans text-base leading-6 tracking-[-0.16px]",
          isFilled
            ? "font-medium text-hs-neutral-800"
            : "font-normal text-hs-neutral-500",
        )}
      >
        {isFilled ? value : label}
      </span>
      <ChevronDown
        className={cn(
          "size-5 shrink-0 transition-colors",
          isFilled ? "text-hs-neutral-700" : "text-hs-neutral-500",
        )}
        strokeWidth={1.75}
      />
    </button>
  );
}
