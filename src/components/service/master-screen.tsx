"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Info, Star, X } from "lucide-react";
import { useState } from "react";

import {
  StatusBarCellularIcon,
  StatusBarWifiIcon,
  StatusBarBatteryIcon,
} from "@/components/icons/figma-icons";
import { cn } from "@/lib/utils";

interface MasterScreenProps {
  serviceTitle: string;
  optionLabel: string;
  serviceId: string;
  rawId: string;
  optionId: string;
  date: string;
  time: string;
}

type MasterMode = "auto" | "manual";

/** Decorative avatar placeholders — same picsum-by-seed convention as photo mocks. */
const AVATARS = [
  "https://picsum.photos/seed/master-avatar-1/80/80",
  "https://picsum.photos/seed/master-avatar-2/80/80",
  "https://picsum.photos/seed/master-avatar-3/80/80",
];

export function MasterScreen({
  serviceId,
  rawId,
  optionId,
  date,
  time,
}: MasterScreenProps) {
  const [masterMode, setMasterMode] = useState<MasterMode>("auto");

  const reviewHref = `/review/${rawId}?option=${optionId}&date=${date}&time=${encodeURIComponent(time)}`;

  return (
    <div className="flex min-h-dvh w-full justify-center bg-hs-neutral-800/10">
      <div className="relative flex h-dvh w-full max-w-[402px] flex-col bg-hs-neutral-50 animate-slide-in overflow-hidden">

        {/* ── Header (not sticky — differs from Date) ─────────────── */}
        <div className="flex shrink-0 flex-col bg-hs-neutral-50">
          {/* Light status bar */}
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

          {/* Toolbar — same pattern as steps 1 and 2 */}
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
                Master
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

        {/* ── Content ──────────────────────────────────────────────── */}
        <div className="flex flex-1 flex-col overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <p className="px-6 py-4 font-alumni text-[36px] font-semibold leading-8 tracking-[-0.36px] text-hs-neutral-800">
            Choose an option
          </p>

          <div className="flex flex-col gap-2 px-2">
            {/* Match me auto */}
            <button
              type="button"
              onClick={() => setMasterMode("auto")}
              className={cn(
                "flex min-w-[330px] flex-col gap-3 rounded-[10px] border bg-hs-neutral-0 p-4 text-left",
                masterMode === "auto" ? "border-hs-blue-500" : "border-transparent",
              )}
            >
              <div className="flex flex-col gap-2 border-b border-hs-neutral-100 pb-3.5">
                <div className="flex items-center gap-2">
                  <span className="flex-1 font-sans text-base font-semibold leading-6 tracking-[-0.16px] text-hs-neutral-800">
                    Match me auto
                  </span>
                  <span className="min-w-[16px] flex-1 rounded-[4px] bg-hs-blue-500 px-2 py-1.5 text-center font-sans text-xs font-medium leading-3 text-hs-blue-50">
                    Recommended
                  </span>
                </div>
                <p className="font-sans text-xs font-normal leading-3 text-hs-neutral-500">
                  We find the best available master based on ratings and proximity. Fastest option.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center">
                  {AVATARS.map((url, i) => (
                    <div
                      key={url}
                      className={cn(
                        "relative size-10 shrink-0 overflow-hidden rounded-full",
                        i > 0 && "-ml-[10px] ring-[3px] ring-hs-neutral-0",
                      )}
                    >
                      <Image
                        src={url}
                        alt=""
                        fill
                        sizes="40px"
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="font-sans text-base font-semibold leading-6 text-hs-neutral-800">
                      4.9
                    </span>
                  </div>
                  <p className="font-sans text-xs font-normal leading-3 text-hs-neutral-500">
                    Top-rated masters nearby
                  </p>
                </div>
                <RadioIndicator selected={masterMode === "auto"} />
              </div>
            </button>

            {/* Choose master manually */}
            <button
              type="button"
              onClick={() => setMasterMode("manual")}
              className={cn(
                "flex items-center gap-3 rounded-[10px] border bg-hs-neutral-0 p-4 text-left",
                masterMode === "manual" ? "border-hs-blue-500" : "border-transparent",
              )}
            >
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="font-sans text-base font-semibold leading-6 text-hs-neutral-800">
                  Choose master manually
                </span>
                <p className="font-sans text-xs font-normal leading-3 text-hs-neutral-500">
                  It may take longer and cost more than usual.
                </p>
              </div>
              <RadioIndicator selected={masterMode === "manual"} />
            </button>
          </div>

          {/* Info block */}
          <div className="px-2 py-6">
            <div className="flex items-center gap-3 overflow-hidden rounded-[10px] border-[0.5px] border-hs-neutral-100 bg-hs-blue-100 px-4 py-3.5">
              <Info className="size-5 shrink-0 text-hs-blue-500" strokeWidth={1.75} />
              <p className="flex-1 font-sans text-xs font-medium leading-3 text-hs-blue-500">
                All masters are verified, insured, and have passed background checks.
              </p>
            </div>
          </div>
        </div>

        {/* ── Bottom nav — normal flow, NOT absolute (differs from Date) ── */}
        <div className="flex w-full shrink-0 flex-col bg-[linear-gradient(to_top,var(--color-hs-neutral-50),rgba(247,244,240,0))]">
          <div className="px-6 pt-2 pb-0">
            <Link
              href={reviewHref}
              className="flex h-14 w-full items-center justify-center rounded-[8px] px-[18px] py-4 font-sans text-base font-medium leading-6 tracking-[-0.16px] text-hs-blue-50"
              style={{
                backgroundImage:
                  "linear-gradient(175.07deg, var(--color-hs-blue-500) 0%, var(--color-hs-blue-800) 47.617%)",
              }}
            >
              Continue
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

function RadioIndicator({ selected }: { selected: boolean }) {
  return (
    <div className="flex size-6 shrink-0 items-center justify-center">
      <div
        className={cn(
          "flex size-[22px] items-center justify-center rounded-full",
          selected ? "bg-hs-blue-500" : "border border-hs-neutral-800 bg-hs-neutral-0",
        )}
      >
        {selected && <span className="size-2 rounded-full bg-hs-neutral-0" />}
      </div>
    </div>
  );
}
