import type { SecondaryBanner } from "@/lib/home-data";
import { cn } from "@/lib/utils";

interface SecondaryBannersProps {
  banners: SecondaryBanner[];
}

export function SecondaryBanners({ banners }: SecondaryBannersProps) {
  return (
    <div className="flex w-full items-start px-4">
      {banners.map((banner, index) => {
        const Icon = banner.icon;
        const isFirst = index === 0;

        return (
          <div
            key={banner.id}
            className={cn(
              "flex min-w-[160px] flex-1 flex-col items-start gap-3 border-hs-neutral-800/8 py-4",
              isFirst ? "border-r border-b pr-4" : "border-b pl-4"
            )}
          >
            <div className="flex w-full items-center gap-2">
              <p className="flex-1 font-alumni text-xl leading-[18px] font-semibold text-hs-neutral-800">
                {banner.title}
              </p>
              <span className="flex shrink-0 items-center justify-center rounded-[4px] bg-hs-neutral-100 p-1.5">
                <Icon className="size-6 text-hs-neutral-700" strokeWidth={1.75} />
              </span>
            </div>
            <button
              type="button"
              className="rounded-[6px] bg-[linear-gradient(166.078deg,var(--color-hs-blue-500)_0%,var(--color-hs-blue-800)_47.617%)] bg-clip-text font-sans text-sm leading-5 font-medium tracking-[-0.14px] text-transparent"
            >
              {banner.actionLabel}
            </button>
          </div>
        );
      })}
    </div>
  );
}
