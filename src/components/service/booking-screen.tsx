"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { useState } from "react";

import { ScreenShell } from "@/components/shared/screen-shell";
import type { ServiceDetails, ServiceOption } from "@/lib/services-data";
import { TIME_SLOTS } from "@/lib/services-data";
import { cn } from "@/lib/utils";

const DAYS = (() => {
  const now = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() + i);
    return {
      key: d.toISOString().slice(0, 10),
      dayName: d.toLocaleDateString("en-US", { weekday: "short" }),
      dayNum: d.getDate(),
    };
  });
})();

interface BookingScreenProps {
  service: ServiceDetails;
  option: ServiceOption;
  rawId: string;
}

export function BookingScreen({ service, option, rawId }: BookingScreenProps) {
  const [selectedDay, setSelectedDay] = useState(DAYS[0]!.key);
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[2]!);

  const confirmHref = `/confirmation?service=${encodeURIComponent(service.title)}&option=${encodeURIComponent(option.label)}&date=${selectedDay}&time=${selectedTime}&price=${option.price}`;

  return (
    <ScreenShell
      title={`Book ${service.title}`}
      backHref={`/service/${rawId}`}
    >
      {/* Date selector */}
      <section className="px-2 pt-6">
        <p className="px-4 pb-3 font-alumni text-[22px] font-semibold leading-7 tracking-[-0.22px] text-hs-neutral-800">
          Choose a date
        </p>
        <div className="flex gap-2 overflow-x-auto px-2 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {DAYS.map((day) => {
            const active = day.key === selectedDay;
            return (
              <button
                key={day.key}
                type="button"
                onClick={() => setSelectedDay(day.key)}
                className={cn(
                  "flex shrink-0 flex-col items-center gap-0.5 rounded-[12px] px-4 py-3 transition-colors",
                  active
                    ? "bg-[linear-gradient(135deg,var(--color-hs-blue-500)_0%,var(--color-hs-blue-800)_100%)] text-hs-neutral-0"
                    : "bg-hs-neutral-0 text-hs-neutral-700",
                )}
              >
                <span className="font-sans text-xs font-medium leading-4 opacity-70">
                  {day.dayName}
                </span>
                <span className="font-alumni text-2xl font-semibold leading-7">
                  {day.dayNum}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Time slots */}
      <section className="px-6 pt-6">
        <p className="pb-3 font-alumni text-[22px] font-semibold leading-7 tracking-[-0.22px] text-hs-neutral-800">
          Choose a time
        </p>
        <div className="grid grid-cols-4 gap-2">
          {TIME_SLOTS.map((slot) => {
            const active = slot === selectedTime;
            return (
              <button
                key={slot}
                type="button"
                onClick={() => setSelectedTime(slot)}
                className={cn(
                  "rounded-[10px] py-2.5 font-sans text-sm font-medium leading-5 tracking-[-0.14px] transition-colors",
                  active
                    ? "bg-[linear-gradient(135deg,var(--color-hs-blue-500)_0%,var(--color-hs-blue-800)_100%)] text-hs-neutral-0"
                    : "bg-hs-neutral-0 text-hs-neutral-700",
                )}
              >
                {slot}
              </button>
            );
          })}
        </div>
      </section>

      {/* Address */}
      <section className="px-6 pt-6">
        <p className="pb-3 font-alumni text-[22px] font-semibold leading-7 tracking-[-0.22px] text-hs-neutral-800">
          Address
        </p>
        <div className="flex items-center gap-3 rounded-[12px] bg-hs-neutral-0 px-4 py-3.5">
          <MapPin className="size-5 shrink-0 text-hs-blue-500" strokeWidth={1.75} />
          <span className="font-sans text-base font-medium leading-6 tracking-[-0.16px] text-hs-neutral-700">
            Shevchenka st., 47
          </span>
        </div>
      </section>

      {/* Summary */}
      <section className="mx-2 mt-6 rounded-[12px] bg-hs-neutral-0 px-4 py-4">
        <p className="pb-3 font-sans text-sm font-semibold leading-5 tracking-[-0.14px] text-hs-neutral-800 uppercase">
          Summary
        </p>
        <Row label="Service" value={option.label} />
        <Row label="Duration" value={option.duration} />
        <Row label="Date" value={new Date(selectedDay + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })} />
        <Row label="Time" value={selectedTime} />
        <div className="mt-3 flex items-center justify-between border-t border-hs-neutral-100 pt-3">
          <span className="font-sans text-base font-semibold tracking-[-0.16px] text-hs-neutral-800">
            Total
          </span>
          <span className="font-alumni text-2xl font-semibold tracking-[-0.24px] text-hs-neutral-800">
            ₴{option.price}
          </span>
        </div>
      </section>

      {/* CTA */}
      <div className="px-4 pb-10 pt-6">
        <Link
          href={confirmHref}
          className="flex w-full items-center justify-center rounded-[12px] bg-[linear-gradient(135deg,var(--color-hs-blue-500)_0%,var(--color-hs-blue-800)_100%)] px-6 py-4 font-sans text-base font-semibold tracking-[-0.16px] text-hs-neutral-0 active:opacity-80"
        >
          Confirm — ₴{option.price}
        </Link>
      </div>
    </ScreenShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="font-sans text-sm leading-5 tracking-[-0.14px] text-hs-neutral-600">
        {label}
      </span>
      <span className="font-sans text-sm font-medium leading-5 tracking-[-0.14px] text-hs-neutral-800">
        {value}
      </span>
    </div>
  );
}
