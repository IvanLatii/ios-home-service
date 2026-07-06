import { Search, XCircle } from "lucide-react";
import Link from "next/link";
import type { ChangeEvent } from "react";

import { cn } from "@/lib/utils";

interface SearchFieldProps {
  placeholder: string;
  /** Renders a real, controlled text input instead of a static button. */
  value?: string;
  onValueChange?: (value: string) => void;
  autoFocus?: boolean;
  className?: string;
  /** When set (and not interactive), tapping the field navigates here. */
  href?: string;
}

/**
 * The search bar shared by the Home screen (static, tap-to-navigate) and the
 * Search screen (focused, real text input). Passing `onValueChange` switches
 * the field into its interactive, controlled mode.
 */
export function SearchField({
  placeholder,
  value,
  onValueChange,
  autoFocus,
  className,
  href,
}: SearchFieldProps) {
  const isInteractive = onValueChange !== undefined;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onValueChange?.(event.target.value);
  };

  const containerClasses = cn(
    "flex w-full items-center gap-3 rounded-[8px] border-[0.5px] bg-hs-neutral-100 p-4 text-left shadow-[inset_0px_2px_4px_0px_rgba(26,21,16,0.08),inset_0px_1px_2px_0px_rgba(26,21,16,0.05)]",
    isInteractive
      ? "border-hs-blue-400"
      : "cursor-pointer border-hs-neutral-200",
  );

  const icon = (
    <Search
      className="size-6 shrink-0 text-hs-neutral-600"
      strokeWidth={1.75}
    />
  );

  if (!isInteractive) {
    const content = (
      <>
        {icon}
        <span className="flex-1 truncate font-sans text-base leading-6 font-medium tracking-[-0.16px] text-hs-neutral-600">
          {placeholder}
        </span>
      </>
    );

    return (
      <div className={cn("w-full px-2 pt-2", className)}>
        {href ? (
          <Link href={href} className={containerClasses}>
            {content}
          </Link>
        ) : (
          <button type="button" className={containerClasses}>
            {content}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={cn("w-full px-2 pt-2", className)}>
      <div className={containerClasses}>
        {icon}
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="min-w-0 flex-1 bg-transparent font-sans text-base leading-6 font-medium tracking-[-0.16px] text-hs-neutral-800 caret-hs-blue-500 placeholder:text-hs-neutral-400 focus:outline-none"
        />
        {value ? (
          <button
            type="button"
            onClick={() => onValueChange?.("")}
            aria-label="Clear search"
            className="shrink-0"
          >
            <XCircle
              className="size-5 text-hs-neutral-400"
              strokeWidth={1.75}
            />
          </button>
        ) : null}
      </div>
    </div>
  );
}
