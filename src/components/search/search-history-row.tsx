import { Clock, XCircle } from "lucide-react";

interface SearchHistoryRowProps {
  label: string;
  onSelect: () => void;
  onRemove: () => void;
}

/** A single "recent search" row — tap the label to re-run it, tap the X to remove it. */
export function SearchHistoryRow({
  label,
  onSelect,
  onRemove,
}: SearchHistoryRowProps) {
  return (
    <div className="flex w-full items-center gap-2.5 rounded-[6px] px-4">
      <button
        type="button"
        onClick={onSelect}
        className="flex flex-1 items-center gap-2.5 py-2 text-left"
      >
        <Clock className="size-4 shrink-0 text-hs-neutral-700" strokeWidth={1.75} />
        <span className="min-w-0 flex-1 truncate font-sans text-base leading-6 font-medium tracking-[-0.16px] text-hs-neutral-700">
          {label}
        </span>
      </button>
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove "${label}" from history`}
        className="shrink-0 p-1"
      >
        <XCircle className="size-4 text-hs-neutral-400" strokeWidth={1.75} />
      </button>
    </div>
  );
}
