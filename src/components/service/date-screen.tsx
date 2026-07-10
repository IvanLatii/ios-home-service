"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, Phone, X } from "lucide-react";
import { useState } from "react";

import {
  StatusBarCellularIcon,
  StatusBarWifiIcon,
  StatusBarBatteryIcon,
} from "@/components/icons/figma-icons";
import { cn } from "@/lib/utils";

interface DateScreenProps {
  serviceId: string;
  optionId: string;
  rawId: string;
}

/* ── July 2026 calendar data ───────────────────────────────────────────
   July 1 = Wednesday → offset 2 (Mon-indexed)
   Weeks: - - 1 2 3 4 5 | 6…12 | 13…19 | 20…26 | 27…31 - -
──────────────────────────────────────────────────────────────────────── */
const DAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];

// Each row: 7 slots, 0 = empty
const CALENDAR_ROWS = [
  [0,  0,  1,  2,  3,  4,  5],
  [6,  7,  8,  9,  10, 11, 12],
  [13, 14, 15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24, 25, 26],
  [27, 28, 29, 30, 31, 0,  0],
];

const TIME_SLOTS = [
  "09:00 – 11:00",
  "11:00 – 13:00",
  "13:00 – 15:00",
  "15:00 – 17:00",
  "17:00 – 19:00",
];

const TODAY = 7; // July 7, 2026

export function DateScreen({ serviceId, optionId, rawId }: DateScreenProps) {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const canContinue = selectedDate !== null && selectedTime !== null;
  const masterHref = canContinue
    ? `/master/${rawId}?option=${optionId}&date=${selectedDate}&time=${encodeURIComponent(selectedTime ?? "")}`
    : "#";

  return (
    <div className="flex min-h-dvh w-full justify-center bg-hs-neutral-800/10">
      <div className="relative flex h-dvh w-full max-w-[402px] flex-col bg-hs-neutral-50 animate-slide-in overflow-hidden">

        {/* ── Sticky header ──────────────────────────────────────── */}
        <div className="sticky top-0 z-30 flex shrink-0 flex-col bg-hs-neutral-50">
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

          {/* Toolbar */}
          <div className="flex items-center gap-2 px-6 pb-4">
            <Link
              href={`/order/${rawId}?option=${optionId}`}
              aria-label="Go back"
              className="flex size-10 shrink-0 items-center justify-center rounded-[6px] bg-hs-neutral-0"
            >
              <ChevronLeft className="size-4 text-hs-neutral-800" strokeWidth={2.5} />
            </Link>
            <div className="flex min-w-0 flex-1 flex-col gap-1 text-center">
              <p className="truncate font-sans text-base font-medium leading-6 tracking-[-0.16px] text-hs-neutral-800">
                Select date
              </p>
              <p className="font-sans text-xs font-medium leading-3 tracking-[-0.12px] text-hs-neutral-400">
                Step 2 of 4
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
        <div className="flex flex-1 flex-col overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

          {/* Month navigation */}
          <div className="flex items-center justify-between px-6 pt-4 pb-2">
            <button type="button" className="flex size-10 items-center justify-center rounded-[6px] bg-hs-neutral-0">
              <ChevronLeft className="size-4 text-hs-neutral-700" strokeWidth={2} />
            </button>
            <p className="font-sans text-base font-semibold leading-6 tracking-[-0.16px] text-hs-neutral-800">
              July 2026
            </p>
            <button type="button" className="flex size-10 items-center justify-center rounded-[6px] bg-hs-neutral-0">
              <ChevronRight className="size-4 text-hs-neutral-700" strokeWidth={2} />
            </button>
          </div>

          {/* Day-of-week headers */}
          <div className="grid grid-cols-7 px-4 pb-1">
            {DAY_LABELS.map((d, i) => (
              <div key={i} className="flex items-center justify-center">
                <span className="font-sans text-xs font-medium leading-4 tracking-[-0.12px] text-hs-neutral-400">
                  {d}
                </span>
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="flex flex-col gap-1 px-4 pb-4">
            {CALENDAR_ROWS.map((row, ri) => (
              <div key={ri} className="grid grid-cols-7">
                {row.map((day, di) => {
                  if (day === 0) return <div key={di} />;
                  const isToday = day === TODAY;
                  const isSelected = day === selectedDate;
                  const isPast = day < TODAY;
                  return (
                    <button
                      key={di}
                      type="button"
                      disabled={isPast}
                      onClick={() => {
                        setSelectedDate(day);
                        setSelectedTime(null);
                      }}
                      className={cn(
                        "flex h-10 w-full items-center justify-center rounded-full font-sans text-sm leading-5 transition-colors",
                        isSelected
                          ? "bg-hs-blue-500 font-semibold text-hs-neutral-0"
                          : isToday
                            ? "font-semibold text-hs-blue-500"
                            : isPast
                              ? "text-hs-neutral-300"
                              : "font-medium text-hs-neutral-800 hover:bg-hs-neutral-100",
                      )}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="mx-6 border-t border-hs-neutral-100" />

          {/* Time slots */}
          <div className="px-2 pt-6 pb-2">
            <p className="mb-4 px-4 font-alumni text-[36px] font-semibold leading-8 tracking-[-0.36px] text-hs-neutral-800">
              Select time
            </p>
            <div className="flex flex-col gap-2">
              {TIME_SLOTS.map((slot) => {
                const isAvailable = selectedDate !== null;
                const isActive = slot === selectedTime;
                return (
                  <button
                    key={slot}
                    type="button"
                    disabled={!isAvailable}
                    onClick={() => setSelectedTime(slot)}
                    className={cn(
                      "flex w-full items-center rounded-[8px] border-[0.5px] px-4 py-[14px] transition-colors",
                      isActive
                        ? "border-hs-blue-500 bg-hs-blue-500/5"
                        : isAvailable
                          ? "border-hs-neutral-100 bg-hs-neutral-0 hover:bg-hs-neutral-50"
                          : "border-hs-neutral-100 bg-hs-neutral-50 opacity-40",
                    )}
                  >
                    <span
                      className={cn(
                        "flex-1 font-sans text-base leading-6 tracking-[-0.16px]",
                        isActive ? "font-medium text-hs-blue-500" : "font-normal text-hs-neutral-700",
                      )}
                    >
                      {slot}
                    </span>
                    {isActive && (
                      <span className="flex size-5 items-center justify-center rounded-full bg-hs-blue-500">
                        <span className="block size-2 rounded-full bg-hs-neutral-0" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="mx-6 mt-4 border-t border-hs-neutral-100" />

          {/* Contact section */}
          <div className="px-2 pt-6 pb-6">
            <p className="mb-4 px-4 font-alumni text-[36px] font-semibold leading-8 tracking-[-0.36px] text-hs-neutral-800">
              Contact
            </p>
            <div className="flex items-center gap-3 rounded-[8px] border-[0.5px] border-hs-neutral-100 bg-hs-neutral-0 px-4 py-[14px]">
              <Phone className="size-5 shrink-0 text-hs-neutral-500" strokeWidth={1.75} />
              <span className="flex-1 font-sans text-base font-normal leading-6 tracking-[-0.16px] text-hs-neutral-800">
                +380 (97) 234-56-78
              </span>
              <button type="button" className="font-sans text-sm font-medium leading-5 tracking-[-0.14px] text-hs-blue-500">
                Change
              </button>
            </div>
          </div>
        </div>

        {/* ── Bottom nav ─────────────────────────────────────────── */}
        <div className="relative z-10 flex shrink-0 flex-col bg-[linear-gradient(to_top,var(--color-hs-neutral-50)_60%,rgba(247,244,240,0))]">
          <div className="px-6 pt-2 pb-0">
            <Link
              href={masterHref}
              aria-disabled={!canContinue}
              onClick={(e) => { if (!canContinue) e.preventDefault(); }}
              className={cn(
                "flex h-14 w-full items-center justify-center rounded-[8px] font-sans text-base font-medium leading-6 tracking-[-0.16px] text-hs-blue-50 transition-opacity",
                canContinue ? "opacity-100" : "opacity-40 pointer-events-none",
              )}
              style={{
                backgroundImage:
                  "linear-gradient(170deg, var(--color-hs-blue-500) 0%, var(--color-hs-blue-800) 47.617%)",
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
