"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useMemo, useState } from "react";

import { SearchField } from "@/components/home/search-field";
import { SectionHeading } from "@/components/home/section-heading";
import { ServiceChipRow } from "@/components/home/service-chip-row";
import { StatusBarMock } from "@/components/home/status-bar-mock";
import { KeyboardMock } from "@/components/search/keyboard-mock";
import { SearchHistoryRow } from "@/components/search/search-history-row";
import { SearchResultRow } from "@/components/search/search-result-row";
import { SERVICE_CATEGORIES } from "@/lib/home-data";
import { getPatternGradientBackground } from "@/lib/pattern-background";
import {
  DEFAULT_SERVICES,
  INITIAL_RECENT_SEARCHES,
  SEARCHABLE_SERVICES,
  type SearchableService,
} from "@/lib/search-data";

export function SearchScreen() {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<SearchableService[]>(
    INITIAL_RECENT_SEARCHES,
  );

  const filteredServices = useMemo(() => {
    if (!query) return [];
    const needle = query.toLowerCase();
    return SEARCHABLE_SERVICES.filter((service) =>
      service.label.toLowerCase().includes(needle),
    );
  }, [query]);

  const suggestions = query
    ? ([
        query,
        (filteredServices[0]?.label.split(" ")[0] ?? query).toLowerCase(),
        query,
      ] as [string, string, string])
    : undefined;

  return (
    <div className="flex min-h-dvh w-full justify-center bg-hs-neutral-800/10">
      <div
        className="relative flex h-dvh w-full max-w-[402px] flex-col overflow-y-auto sm:shadow-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={getPatternGradientBackground(130.145)}
      >
        <StatusBarMock />

        <div className="flex w-full flex-1 flex-col items-start overflow-clip rounded-t-[16px] bg-hs-neutral-50">
          <div className="flex w-full items-start gap-2 px-2 pt-2">
            <SearchField
              placeholder="What do you need help with?"
              value={query}
              onValueChange={setQuery}
              autoFocus
              className="flex-1 px-0 pt-0"
            />
            <Link
              href="/"
              aria-label="Close search"
              className="flex size-14 shrink-0 items-center justify-center rounded-[8px] bg-hs-neutral-0"
            >
              <X className="size-5 text-hs-neutral-800" strokeWidth={2} />
            </Link>
          </div>

          {query === "" ? (
            <>
              {recentSearches.length > 0 ? (
                <>
                  <SectionHeading
                    title="History"
                    actionLabel="Clear"
                    onActionClick={() => setRecentSearches([])}
                  />
                  <div className="flex w-full flex-col gap-1.5 px-2">
                    {recentSearches.map((item) => (
                      <SearchHistoryRow
                        key={item.id}
                        label={item.label}
                        onSelect={() => setQuery(item.label)}
                        onRemove={() =>
                          setRecentSearches((prev) =>
                            prev.filter((entry) => entry.id !== item.id),
                          )
                        }
                      />
                    ))}
                  </div>
                </>
              ) : null}

              <SectionHeading title="Services" />
              <div className="flex w-full flex-col gap-1 px-2">
                {DEFAULT_SERVICES.map((service) => (
                  <SearchResultRow
                    key={service.id}
                    label={service.label}
                    href={`/order/${service.id}`}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <SectionHeading
                title="Categories"
                actionLabel="Clear"
                onActionClick={() => setQuery("")}
              />
              <ServiceChipRow
                chips={SERVICE_CATEGORIES}
                radius={8}
                onChipClick={(category) => setQuery(category.label)}
              />

              <SectionHeading title="Services" />
              <div className="flex w-full flex-col gap-1 px-2">
                {filteredServices.length > 0 ? (
                  filteredServices.map((service) => (
                    <SearchResultRow
                      key={service.id}
                      label={service.label}
                      href={`/order/${service.id}`}
                      highlight={query}
                    />
                  ))
                ) : (
                  <p className="w-full px-2 py-3 font-sans text-base leading-6 tracking-[-0.16px] text-hs-neutral-600">
                    No services found.
                  </p>
                )}
              </div>
            </>
          )}
        </div>

        <KeyboardMock suggestions={suggestions} />
      </div>
    </div>
  );
}
