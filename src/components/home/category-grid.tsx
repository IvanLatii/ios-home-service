import type { ServiceCategory } from "@/lib/home-data";

interface CategoryGridProps {
  categories: ServiceCategory[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="flex w-full flex-wrap gap-[2px] px-2">
      {categories.map((category) => {
        const Icon = category.icon;

        return (
          <button
            key={category.id}
            type="button"
            className="flex min-w-[130px] flex-1 basis-[calc(50%-1px)] items-center gap-2 rounded-[8px] bg-hs-neutral-0 py-3.5 pl-4 pr-[18px]"
          >
            <span className="min-w-0 flex-1 truncate text-left font-sans text-base leading-6 font-medium tracking-[-0.16px] text-hs-neutral-700">
              {category.label}
            </span>
            <span className="flex size-5 shrink-0 items-center justify-center rounded-[4px]">
              <Icon className="size-5 text-hs-neutral-700" strokeWidth={1.75} />
            </span>
          </button>
        );
      })}
    </div>
  );
}
