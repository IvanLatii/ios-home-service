import { ChevronRight } from "lucide-react";

interface SearchResultRowProps {
  label: string;
  /** Substring to highlight in pink (case-insensitive), e.g. the active query. */
  highlight?: string;
  onSelect?: () => void;
}

/** A single service row in the "Services" results list. */
export function SearchResultRow({
  label,
  highlight,
  onSelect,
}: SearchResultRowProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex min-w-[130px] w-full items-center gap-2 rounded-[8px] bg-hs-neutral-0 py-3 pl-4 pr-[14px] text-left"
    >
      <span className="min-w-0 flex-1 truncate font-sans text-base leading-6 font-medium tracking-[-0.16px] text-hs-neutral-700">
        {renderHighlighted(label, highlight)}
      </span>
      <ChevronRight className="size-5 shrink-0 text-hs-neutral-700" strokeWidth={1.75} />
    </button>
  );
}

function renderHighlighted(label: string, highlight?: string) {
  if (!highlight) return label;

  const index = label.toLowerCase().indexOf(highlight.toLowerCase());
  if (index === -1) return label;

  const before = label.slice(0, index);
  const match = label.slice(index, index + highlight.length);
  const after = label.slice(index + highlight.length);

  return (
    <>
      {before}
      <span className="text-hs-pink-500">{match}</span>
      {after}
    </>
  );
}
