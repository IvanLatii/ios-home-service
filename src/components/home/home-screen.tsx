import { CategoryGrid } from "@/components/home/category-grid";
import { HomeBottomNav } from "@/components/home/home-bottom-nav";
import { HomeStats } from "@/components/home/home-stats";
import { HomeTopBar } from "@/components/home/home-top-bar";
import { PromoBanner } from "@/components/home/promo-banner";
import { SearchField } from "@/components/home/search-field";
import { SecondaryBanners } from "@/components/home/secondary-banners";
import { SectionHeading } from "@/components/home/section-heading";
import { ServiceChipRow } from "@/components/home/service-chip-row";
import {
  SECONDARY_BANNERS,
  SERVICE_CATEGORIES,
  SERVICE_CHIPS,
} from "@/lib/home-data";

/**
 * Recreation of the "402 / Home" frame from the Home Service iOS Figma file.
 * Presentational only — no navigation or interaction wiring yet.
 */
export function HomeScreen() {
  return (
    <div className="flex min-h-dvh w-full justify-center bg-hs-neutral-800/10">
      <div className="relative flex h-dvh w-full max-w-[402px] flex-col overflow-y-auto bg-[linear-gradient(121.841deg,var(--color-hs-blue-500)_0%,var(--color-hs-blue-800)_47.617%)] sm:border-x sm:border-black/5 sm:shadow-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[522px] opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "14px 14px",
          }}
        />

        <HomeTopBar address="Shevchenka st., 47" notificationCount={8} />
        <HomeStats bonuses={487} currency="₴" orders={2} />

        <div className="flex w-full flex-1 flex-col items-start overflow-clip rounded-t-[16px] bg-hs-neutral-50">
          <SearchField placeholder="What do you need help with?" />

          <SectionHeading title="Popular services" />
          <ServiceChipRow chips={SERVICE_CHIPS} />

          <SectionHeading title="Browse categories" actionLabel="View all" />
          <CategoryGrid categories={SERVICE_CATEGORIES} />

          <div className="flex w-full flex-col items-start gap-6 px-2 pt-10 pb-8">
            <PromoBanner
              heading="Join as a master & get new clients in your area"
              primaryActionLabel="Apply"
              secondaryActionLabel="Share"
            />
            <SecondaryBanners banners={SECONDARY_BANNERS} />
          </div>
        </div>

        <HomeBottomNav />
      </div>
    </div>
  );
}
