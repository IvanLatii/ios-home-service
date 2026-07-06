import { Search } from "lucide-react";

interface SearchFieldProps {
  placeholder: string;
}

export function SearchField({ placeholder }: SearchFieldProps) {
  return (
    <div className="w-full px-2 pt-2">
      <button
        type="button"
        className="flex w-full cursor-pointer items-center gap-3 rounded-[8px] border-[0.5px] border-hs-neutral-200 bg-hs-neutral-100 p-4 text-left shadow-[inset_0px_2px_4px_0px_rgba(26,21,16,0.08),inset_0px_1px_2px_0px_rgba(26,21,16,0.05)]"
      >
        <Search className="size-6 shrink-0 text-hs-neutral-600" strokeWidth={1.75} />
        <span className="flex-1 truncate font-sans text-base leading-6 font-medium tracking-[-0.16px] text-hs-neutral-600">
          {placeholder}
        </span>
      </button>
    </div>
  );
}
