import Link from "next/link";
import { Star, Clock, ChevronRight } from "lucide-react";

import { ScreenShell } from "@/components/shared/screen-shell";
import type { ServiceDetails } from "@/lib/services-data";

interface ServiceDetailsScreenProps {
  service: ServiceDetails;
  /** ID used in the URL — may differ from service.id (e.g. a search alias) */
  rawId: string;
}

export function ServiceDetailsScreen({
  service,
  rawId,
}: ServiceDetailsScreenProps) {
  const firstOptionId = service.options[0]?.id ?? service.id;

  return (
    <ScreenShell title={service.title} backHref="/search">
      {/* Hero */}
      <div className="flex flex-col items-start gap-3 bg-[linear-gradient(135deg,var(--color-hs-blue-500)_0%,var(--color-hs-blue-800)_100%)] px-6 pt-6 pb-8">
        <p className="font-sans text-sm font-medium leading-5 text-hs-blue-400">
          Home Service
        </p>
        <h2 className="font-alumni text-5xl font-semibold leading-none tracking-[-0.5px] text-hs-neutral-0">
          {service.title}
        </h2>
        <p className="font-sans text-base leading-6 font-medium text-hs-neutral-0/80">
          {service.tagline}
        </p>
        <div className="flex items-center gap-4 pt-1">
          <div className="flex items-center gap-1.5">
            <Star className="size-4 fill-yellow-400 text-yellow-400" />
            <span className="font-sans text-sm font-medium text-hs-neutral-0">
              {service.rating}
            </span>
            <span className="font-sans text-sm text-hs-neutral-0/60">
              · {service.reviewCount} reviews
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-sans text-sm text-hs-neutral-0/60">
              from
            </span>
            <span className="font-sans text-sm font-semibold text-hs-neutral-0">
              ₴{service.startingPrice}
            </span>
          </div>
        </div>
      </div>

      {/* Options list */}
      <div className="flex flex-col gap-1 px-2 pt-6 pb-8">
        <p className="px-4 pb-3 font-alumni text-[22px] font-semibold leading-7 tracking-[-0.22px] text-hs-neutral-800">
          Choose a service
        </p>
        {service.options.map((option) => (
          <Link
            key={option.id}
            href={`/order/${rawId}?option=${option.id}`}
            className="flex items-center gap-3 rounded-[12px] bg-hs-neutral-0 px-4 py-3.5 active:bg-hs-neutral-100"
          >
            <div className="flex flex-1 flex-col gap-0.5 min-w-0">
              <span className="font-sans text-base font-semibold leading-6 tracking-[-0.16px] text-hs-neutral-800">
                {option.label}
              </span>
              <span className="truncate font-sans text-sm leading-5 font-medium tracking-[-0.14px] text-hs-neutral-600">
                {option.description}
              </span>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-0.5">
              <span className="font-sans text-base font-semibold leading-6 tracking-[-0.16px] text-hs-neutral-800">
                ₴{option.price}
              </span>
              <span className="flex items-center gap-1 font-sans text-xs leading-4 text-hs-neutral-600">
                <Clock className="size-3" strokeWidth={1.75} />
                {option.duration}
              </span>
            </div>
            <ChevronRight className="size-5 shrink-0 text-hs-neutral-400" strokeWidth={1.75} />
          </Link>
        ))}
      </div>

      {/* Sticky CTA */}
      <div className="sticky bottom-0 bg-[linear-gradient(to_top,var(--color-hs-neutral-50)_70%,transparent)] px-4 pb-8 pt-4">
        <Link
          href={`/order/${rawId}?option=${firstOptionId}`}
          className="flex w-full items-center justify-center rounded-[12px] bg-[linear-gradient(135deg,var(--color-hs-blue-500)_0%,var(--color-hs-blue-800)_100%)] px-6 py-4 font-sans text-base font-semibold tracking-[-0.16px] text-hs-neutral-0 active:opacity-80"
        >
          Continue from ₴{service.startingPrice}
        </Link>
      </div>
    </ScreenShell>
  );
}
