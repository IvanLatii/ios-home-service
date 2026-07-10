import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Star, MapPin, Shield, X } from "lucide-react";

import {
  StatusBarCellularIcon,
  StatusBarWifiIcon,
  StatusBarBatteryIcon,
} from "@/components/icons/figma-icons";

interface MasterScreenProps {
  serviceTitle: string;
  optionLabel: string;
  serviceId: string;
  rawId: string;
  optionId: string;
  date: string;
  time: string;
}

const MASTER = {
  name: "Oleksiy Kovalenko",
  specialty: "Plumbing specialist",
  rating: 4.9,
  reviewCount: 138,
  completedJobs: 247,
  photoUrl: "https://picsum.photos/seed/master-alex/200/200",
  badge: "Top rated",
};

export function MasterScreen({
  serviceTitle,
  optionLabel,
  serviceId,
  rawId,
  optionId,
  date,
  time,
}: MasterScreenProps) {
  const formattedDate = (() => {
    const d = Number(date);
    if (!d) return date;
    return new Date(2026, 6, d).toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  })();

  return (
    <div className="flex min-h-dvh w-full justify-center bg-hs-neutral-800/10">
      <div className="relative flex h-dvh w-full max-w-[402px] flex-col bg-hs-neutral-50 animate-slide-in overflow-hidden">

        {/* ── Sticky header ──────────────────────────────────────── */}
        <div className="sticky top-0 z-30 flex shrink-0 flex-col bg-hs-neutral-50">
          <div className="flex h-[62px] w-full shrink-0 items-center justify-between px-6 pt-[21px] pb-[19px] text-hs-neutral-1000">
            <p
              className="text-[17px] leading-[22px] font-[590]"
              style={{
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", system-ui, sans-serif',
                fontVariationSettings: '"wdth" 100',
              }}
            >
              17:05
            </p>
            <div className="flex items-center gap-[7px]">
              <StatusBarCellularIcon className="h-[12.226px] w-[19.2px]" />
              <StatusBarWifiIcon className="h-[12.328px] w-[17.142px]" />
              <StatusBarBatteryIcon className="h-[13px] w-[27.328px]" />
            </div>
          </div>

          <div className="flex items-center gap-2 px-6 pb-4">
            <Link
              href={`/date/${rawId}?option=${optionId}`}
              aria-label="Go back"
              className="flex size-10 shrink-0 items-center justify-center rounded-[6px] bg-hs-neutral-0"
            >
              <ChevronLeft className="size-4 text-hs-neutral-800" strokeWidth={2.5} />
            </Link>
            <div className="flex min-w-0 flex-1 flex-col gap-1 text-center">
              <p className="truncate font-sans text-base font-medium leading-6 tracking-[-0.16px] text-hs-neutral-800">
                Your master
              </p>
              <p className="font-sans text-xs font-medium leading-3 tracking-[-0.12px] text-hs-neutral-400">
                Step 3 of 4
              </p>
            </div>
            <Link
              href={`/service/${serviceId}`}
              aria-label="Close"
              className="flex size-10 shrink-0 items-center justify-center rounded-[6px] bg-hs-neutral-0"
            >
              <X className="size-4 text-hs-neutral-800" strokeWidth={2.5} />
            </Link>
          </div>
        </div>

        {/* ── Scrollable content ─────────────────────────────────── */}
        <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-2 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

          {/* Master profile card */}
          <div className="flex items-center gap-4 rounded-[12px] bg-hs-neutral-0 p-4">
            <div className="relative size-[72px] shrink-0 overflow-hidden rounded-full">
              <Image
                src={MASTER.photoUrl}
                alt={MASTER.name}
                fill
                sizes="72px"
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="flex flex-1 flex-col gap-1 min-w-0">
              <p className="font-alumni text-[22px] font-semibold leading-7 tracking-[-0.22px] text-hs-neutral-800">
                {MASTER.name}
              </p>
              <p className="font-sans text-sm font-medium leading-5 tracking-[-0.14px] text-hs-neutral-500">
                {MASTER.specialty}
              </p>
              <div className="flex items-center gap-3 pt-0.5">
                <div className="flex items-center gap-1">
                  <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="font-sans text-sm font-semibold leading-5 text-hs-neutral-800">
                    {MASTER.rating}
                  </span>
                  <span className="font-sans text-sm text-hs-neutral-400">
                    · {MASTER.reviewCount}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="size-3.5 text-hs-blue-500" strokeWidth={1.75} />
                  <span className="font-sans text-xs font-medium text-hs-blue-500">
                    {MASTER.badge}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking summary card */}
          <div className="flex flex-col gap-0 overflow-hidden rounded-[12px] bg-hs-neutral-0">
            <p className="px-4 pt-4 pb-3 font-alumni text-[22px] font-semibold leading-7 tracking-[-0.22px] text-hs-neutral-800">
              Booking details
            </p>

            <Row label="Service" value={serviceTitle} />
            <Row label="Type" value={optionLabel} />
            <Row label="Date" value={formattedDate} />
            <Row label="Time" value={time} last />
          </div>

          {/* Address card */}
          <div className="flex items-start gap-3 rounded-[12px] bg-hs-neutral-0 p-4">
            <MapPin className="mt-0.5 size-5 shrink-0 text-hs-neutral-500" strokeWidth={1.75} />
            <div className="flex flex-1 flex-col gap-0.5">
              <p className="font-sans text-base font-medium leading-6 tracking-[-0.16px] text-hs-neutral-800">
                Shevchenko Ave, 12, apt. 45
              </p>
              <p className="font-sans text-sm leading-5 text-hs-neutral-500">
                Kyiv, 01001
              </p>
            </div>
          </div>

          {/* Jobs stat */}
          <div className="flex items-center justify-center rounded-[12px] bg-hs-neutral-0 px-4 py-5">
            <div className="flex flex-col items-center gap-1">
              <p className="font-alumni text-[48px] font-semibold leading-none tracking-[-0.5px] text-hs-neutral-800">
                {MASTER.completedJobs}
              </p>
              <p className="font-sans text-sm font-medium leading-5 tracking-[-0.14px] text-hs-neutral-500">
                completed jobs
              </p>
            </div>
          </div>
        </div>

        {/* ── Bottom CTA ─────────────────────────────────────────── */}
        <div className="relative z-10 flex shrink-0 flex-col bg-[linear-gradient(to_top,var(--color-hs-neutral-50)_60%,rgba(247,244,240,0))]">
          <div className="px-6 pt-2 pb-0">
            <Link
              href="/"
              className="flex h-14 w-full items-center justify-center rounded-[8px] font-sans text-base font-medium leading-6 tracking-[-0.16px] text-hs-blue-50"
              style={{
                backgroundImage:
                  "linear-gradient(170deg, var(--color-hs-blue-500) 0%, var(--color-hs-blue-800) 47.617%)",
              }}
            >
              Confirm booking
            </Link>
          </div>
          <div className="flex h-[34px] w-full items-end justify-center pb-2">
            <div className="h-[5px] w-[134px] rounded-full bg-black/30" />
          </div>
        </div>

      </div>
    </div>
  );
}

function Row({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between px-4 py-3 ${
        last ? "pb-4" : "border-b border-hs-neutral-100"
      }`}
    >
      <span className="font-sans text-sm font-medium leading-5 tracking-[-0.14px] text-hs-neutral-500">
        {label}
      </span>
      <span className="font-sans text-sm font-medium leading-5 tracking-[-0.14px] text-hs-neutral-800">
        {value}
      </span>
    </div>
  );
}
