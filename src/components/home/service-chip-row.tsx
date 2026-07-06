import type { ServiceChip } from "@/lib/home-data";

interface ServiceChipRowProps {
  chips: ServiceChip[];
}

export function ServiceChipRow({ chips }: ServiceChipRowProps) {
  return (
    <div className="w-full overflow-x-auto px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex w-max items-center gap-1">
        {chips.map((chip) => (
          <button
            key={chip.id}
            type="button"
            className="shrink-0 rounded-[6px] bg-hs-neutral-0 px-4 py-3 font-sans text-base leading-6 font-medium whitespace-nowrap text-hs-neutral-700 tracking-[-0.16px]"
          >
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  );
}
