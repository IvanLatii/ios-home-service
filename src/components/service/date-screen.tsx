"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, MapPin, Pencil, User, X } from "lucide-react";
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
const DAY_LABELS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

// Each row: 7 slots, 0 = empty
const CALENDAR_ROWS = [
  [0,  0,  1,  2,  3,  4,  5],
  [6,  7,  8,  9,  10, 11, 12],
  [13, 14, 15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24, 25, 26],
  [27, 28, 29, 30, 31, 0,  0],
];

const TIME_SLOTS = [
  "09:00 - 11:00",
  "11:00 - 13:00",
  "13:00 - 15:00",
  "15:00 - 17:00",
  "17:00 - 19:00",
  "19:00 - 21:00",
];

const TODAY = 15; // July 15, 2026

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
                Contact, date &amp; time
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
        <div className="flex flex-1 flex-col overflow-y-auto pb-28 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

          {/* Contact person */}
          <p className="px-6 py-4 font-alumni text-[36px] font-semibold leading-8 tracking-[-0.36px] text-hs-neutral-800">
            Contact person
          </p>
          <div className="flex items-center gap-3 px-6">
            <div className="flex shrink-0 items-center justify-center rounded-[6px] bg-[rgba(85,60,84,0.06)] p-2.5">
              <User className="size-5 text-hs-neutral-800" strokeWidth={1.75} />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="font-sans text-base font-medium leading-6 tracking-[-0.16px] text-hs-neutral-800">
                  Ivan L
                </span>
                <Pencil className="size-5 shrink-0 text-hs-neutral-400" strokeWidth={1.75} />
              </div>
              <span className="font-sans text-xs font-medium leading-3 tracking-[-0.12px] text-hs-neutral-400">
                +380 68 006 54 88
              </span>
            </div>
          </div>

          {/* Address */}
          <p className="px-6 pt-8 pb-4 font-alumni text-[36px] font-semibold leading-8 tracking-[-0.36px] text-hs-neutral-800">
            Address
          </p>
          <div className="flex items-center gap-3 px-6">
            <div className="flex shrink-0 items-center justify-center rounded-[6px] bg-[rgba(85,60,84,0.06)] p-2.5">
              <MapPin className="size-5 text-hs-neutral-800" strokeWidth={1.75} />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="font-sans text-base font-medium leading-6 tracking-[-0.16px] text-hs-neutral-800">
                  Shevchenka st., 47.
                </span>
                <Pencil className="size-5 shrink-0 text-hs-neutral-400" strokeWidth={1.75} />
              </div>
              <span className="font-sans text-xs font-medium leading-3 tracking-[-0.12px] text-hs-neutral-400">
                Rivne, Entrance 1, 5th Floor, Apartment 28
              </span>
            </div>
          </div>

          {/* Pick a date */}
          <p className="px-6 pt-8 pb-4 font-alumni text-[36px] font-semibold leading-8 tracking-[-0.36px] text-hs-neutral-800">
            Pick a date
          </p>
          <div className="px-2">
            <div className="flex flex-col overflow-hidden rounded-[10px] bg-hs-neutral-0 pb-4">
              {/* Calendar header */}
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="font-sans text-base font-semibold leading-6 tracking-[-0.16px] text-hs-neutral-1000">
                    July 2026
                  </span>
                  <ChevronRight className="size-5 text-hs-neutral-1000" strokeWidth={2} />
                </div>
                <div className="flex items-center gap-3">
                  <button type="button" aria-label="Previous month">
                    <ChevronLeft className="size-6 text-hs-neutral-700" strokeWidth={2} />
                  </button>
                  <button type="button" aria-label="Next month">
                    <ChevronRight className="size-6 text-hs-neutral-700" strokeWidth={2} />
                  </button>
                </div>
              </div>

              {/* Day-of-week headers */}
              <div className="flex justify-between px-4 py-2">
                {DAY_LABELS.map((d) => (
                  <div key={d} className="flex size-11 items-center justify-center">
                    <span className="font-sans text-xs font-medium leading-3 tracking-[-0.12px] text-hs-neutral-400">
                      {d}
                    </span>
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="flex flex-col gap-1.5">
                {CALENDAR_ROWS.map((row, ri) => (
                  <div key={ri} className="flex justify-between px-4">
                    {row.map((day, di) => {
                      if (day === 0) return <div key={di} className="size-11" />;
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
                            "flex size-11 items-center justify-center rounded-full font-sans text-base leading-6 transition-colors",
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
            </div>
          </div>

          {/* Pick time */}
          <p className="px-6 pt-8 pb-4 font-alumni text-[36px] font-semibold leading-8 tracking-[-0.36px] text-hs-neutral-800">
            Pick time
          </p>
          <div className="flex flex-wrap gap-1 px-2 pb-4">
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
                    "flex min-w-[132px] flex-1 items-center justify-center rounded-[6px] bg-hs-neutral-0 px-4 py-3 font-sans text-base leading-6 transition-colors",
                    isActive
                      ? "font-semibold text-hs-blue-500"
                      : isAvailable
                        ? "font-medium text-hs-neutral-700 hover:bg-hs-neutral-100"
                        : "font-medium text-hs-neutral-400",
                  )}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Bottom nav ─────────────────────────────────────────── */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col bg-[linear-gradient(to_top,var(--color-hs-neutral-50),rgba(247,244,240,0))]">
          <div className="px-6 pt-2 pb-0">
            <Link
              href={masterHref}
              aria-disabled={!canContinue}
              onClick={(e) => { if (!canContinue) e.preventDefault(); }}
              className={cn(
                "flex h-14 w-full items-center justify-center rounded-[8px] px-[18px] py-4 font-sans text-base font-medium leading-6 tracking-[-0.16px]",
                canContinue
                  ? "text-hs-blue-50"
                  : "pointer-events-none bg-hs-neutral-200 text-hs-neutral-400",
              )}
              style={
                canContinue
                  ? {
                      backgroundImage:
                        "linear-gradient(175.07deg, var(--color-hs-blue-500) 0%, var(--color-hs-blue-800) 47.617%)",
                    }
                  : undefined
              }
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
