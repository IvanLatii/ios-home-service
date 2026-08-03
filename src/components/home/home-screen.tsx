"use client";

import { useEffect, useState } from "react";

import { CategoryGrid } from "@/components/home/category-grid";
import { HomeBottomNav } from "@/components/home/home-bottom-nav";
import { HomeStats } from "@/components/home/home-stats";
import { HomeTopBar } from "@/components/home/home-top-bar";
import { PromoBanner } from "@/components/home/promo-banner";
import { RecentOrderCard } from "@/components/home/recent-order-card";
import { SearchField } from "@/components/home/search-field";
import { SecondaryBanners } from "@/components/home/secondary-banners";
import { SectionHeading } from "@/components/home/section-heading";
import { ServiceChipRow } from "@/components/home/service-chip-row";
import {
  SECONDARY_BANNERS,
  SERVICE_CATEGORIES,
  SERVICE_CHIPS,
} from "@/lib/home-data";
import { getPatternGradientBackground } from "@/lib/pattern-background";

const RECENT_ORDER_KEY = "hs-recent-order";

interface RecentOrder {
  date: string;
  time: string;
}

/**
 * Recreation of the "402 / Home" frame from the Home Service iOS Figma file.
 * Presentational only — no navigation or interaction wiring yet.
 */
export function HomeScreen() {
  // SCREEN-HOME2.md — стан 2: тригер ?ordered=1, прапорець живе в sessionStorage,
  // щоб не злітати при переходах у межах сесії.
  const [recentOrder, setRecentOrder] = useState<RecentOrder | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("ordered") === "1") {
      const order: RecentOrder = {
        date: params.get("date") ?? "",
        time: params.get("time") ?? "",
      };
      sessionStorage.setItem(RECENT_ORDER_KEY, JSON.stringify(order));
      setRecentOrder(order);
      return;
    }

    const stored = sessionStorage.getItem(RECENT_ORDER_KEY);
    if (stored) {
      try {
        setRecentOrder(JSON.parse(stored));
      } catch {
        // ignore malformed sessionStorage content
      }
    }
  }, []);

  const hasOrder = recentOrder !== null;

  // FIXES-2.md #5 — demo reset: tapping the card clears the flag and reverts to state 1.
  const handleResetDemo = () => {
    sessionStorage.removeItem(RECENT_ORDER_KEY);
    setRecentOrder(null);
  };

  return (
    <div className="flex min-h-dvh w-full justify-center bg-hs-neutral-800/10">
      <div
        className="relative flex h-dvh w-full max-w-[402px] flex-col overflow-y-auto sm:shadow-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={getPatternGradientBackground(121.841)}
      >
        <HomeTopBar address="Shevchenka st., 47" notificationCount={8} />
        <HomeStats
          bonuses={hasOrder ? 101 : 487}
          currency="₴"
          orders={hasOrder ? 3 : 2}
        />
        {recentOrder && (
          <RecentOrderCard
            date={recentOrder.date}
            time={recentOrder.time}
            onClick={handleResetDemo}
          />
        )}

        <div className="flex w-full flex-1 flex-col items-start overflow-clip rounded-t-[16px] bg-hs-neutral-50">
          <SearchField
            placeholder="What do you need help with?"
            href="/search"
          />

          <SectionHeading title="Popular services" />
          <ServiceChipRow chips={SERVICE_CHIPS} />

          <SectionHeading title="Browse categories" actionLabel="View all" />
          <CategoryGrid categories={SERVICE_CATEGORIES} />

          <div className="flex w-full flex-col items-start gap-6 px-2 pt-10 pb-6">
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
