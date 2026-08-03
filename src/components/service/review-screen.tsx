"use client";

import Link from "next/link";
import { ChevronLeft, Circle, Clock, Droplet, Home, Info, MapPin, User, X } from "lucide-react";
import { useState, type ComponentType } from "react";

import {
  StatusBarCellularIcon,
  StatusBarWifiIcon,
  StatusBarBatteryIcon,
} from "@/components/icons/figma-icons";
import { cn } from "@/lib/utils";

interface ReviewScreenProps {
  serviceTitle: string;
  optionLabel: string;
  optionPrice: number;
  serviceId: string;
  rawId: string;
  optionId: string;
  date: string;
  time: string;
}

// Same source as /order/[id]: service-order-screen.tsx hardcodes "Estimated cost" as
// a literal 1,500.00 (no per-service pricing logic exists yet) — mirrored here so the
// two steps agree instead of drifting apart.
const ESTIMATED_COST = 1500;
const TRAVEL_FEE = 100;
const BONUS_BALANCE = 487;

function formatCurrency(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function ReviewScreen({
  optionLabel,
  rawId,
  optionId,
  date,
  time,
}: ReviewScreenProps) {
  const [useBonuses, setUseBonuses] = useState(true);

  const formattedDate = (() => {
    const d = Number(date);
    if (!d) return date;
    return new Date(2026, 6, d).toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  })();

  const bonusesApplied = useBonuses ? BONUS_BALANCE : 0;
  const totalToPay = Math.max(0, ESTIMATED_COST - bonusesApplied);

  const successHref = `/success/${rawId}?option=${optionId}&date=${date}&time=${encodeURIComponent(time)}`;

  const summaryRows: { icon: ComponentType<{ className?: string; strokeWidth?: number }>; label: string; value: string }[] = [
    { icon: Home, label: "Service", value: optionLabel },
    { icon: Droplet, label: "Faucet type", value: "Water" },
    { icon: Circle, label: "Diameter", value: "I don't know" },
    { icon: User, label: "Contact person", value: "Ivan L" },
    { icon: MapPin, label: "Address", value: "Shevchenka st., 47" },
    { icon: Clock, label: "Date & time", value: `${formattedDate}, ${time}` },
    { icon: User, label: "Master", value: "Automatic matching" },
  ];

  return (
    <div className="flex min-h-dvh w-full justify-center bg-hs-neutral-800/10">
      <div className="relative flex h-dvh w-full max-w-[402px] flex-col bg-hs-neutral-50 animate-slide-in overflow-hidden">

        {/* ── Header — reused from master-screen.tsx (not sticky) ─── */}
        <div className="flex shrink-0 flex-col bg-hs-neutral-50">
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
              href={`/master/${rawId}?option=${optionId}&date=${date}&time=${encodeURIComponent(time)}`}
              aria-label="Go back"
              className="flex size-10 shrink-0 items-center justify-center rounded-[6px] bg-hs-neutral-0"
            >
              <ChevronLeft className="size-4 text-hs-neutral-800" strokeWidth={2.5} />
            </Link>
            <div className="flex min-w-0 flex-1 flex-col gap-1 text-center">
              <p className="truncate font-sans text-base font-medium leading-6 tracking-[-0.16px] text-hs-neutral-800">
                Order review
              </p>
              <p className="font-sans text-xs font-medium leading-3 tracking-[-0.12px] text-hs-neutral-400">
                Step 4 of 4
              </p>
            </div>
            <Link
              href="/search"
              aria-label="Close"
              className="flex size-10 shrink-0 items-center justify-center rounded-[6px] bg-hs-neutral-0"
            >
              <X className="size-4 text-hs-neutral-800" strokeWidth={2.5} />
            </Link>
          </div>
        </div>

        {/* ── Scrollable content — keeps nav on-screen on short viewports ── */}
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

          {/* Summary card — 7 rows */}
          <div className="px-2">
            <div className="flex flex-col overflow-hidden rounded-[10px] bg-hs-neutral-0 px-4 py-2">
              {summaryRows.map((row, i) => (
                <SummaryRow
                  key={row.label}
                  icon={row.icon}
                  label={row.label}
                  value={row.value}
                  last={i === summaryRows.length - 1}
                />
              ))}
            </div>
          </div>

          {/* Use bonuses */}
          <div className="px-2 pt-2">
            <div className="flex items-center gap-3 rounded-[10px] bg-hs-neutral-0 p-4">
              <p className="flex-1 font-sans text-base font-semibold leading-6 tracking-[-0.16px] text-hs-neutral-800">
                Use bonuses
              </p>
              <p className="font-sans text-base font-semibold leading-6 tracking-[-0.16px] text-hs-neutral-800">
                {BONUS_BALANCE} ₴
              </p>
              <BonusToggle checked={useBonuses} onChange={setUseBonuses} />
            </div>
          </div>

          {/* Calculation */}
          <div className="flex flex-col gap-1 px-6 pt-8">
            <CalcRow label="Estimated cost" value={`${formatCurrency(ESTIMATED_COST)} ₴`} />
            <CalcRow label="Travel fee (included)" value={`${TRAVEL_FEE} ₴`} />
            <CalcRow label="Bonuses applied" value={`-${bonusesApplied} ₴`} />
          </div>

          {/* Total to pay */}
          <div className="flex items-center gap-2 px-6 pt-2 pb-4">
            <p className="flex-1 font-alumni text-[36px] font-semibold leading-8 tracking-[-0.36px] text-hs-neutral-800">
              Total to pay
            </p>
            <div className="flex items-start gap-1">
              <span className="font-alumni text-[36px] font-semibold leading-8 tracking-[-0.36px] text-hs-neutral-800">
                {formatCurrency(totalToPay)}
              </span>
              <span className="font-sans text-base font-medium leading-6 tracking-[-0.16px] text-hs-neutral-800">
                ₴
              </span>
            </div>
          </div>

          {/* Warning block — yellow, distinct from Master's blue info */}
          <div className="px-2 pb-4">
            <div className="flex items-center gap-2.5 rounded-[10px] bg-hs-yellow-100 px-4 py-3.5">
              <Info className="size-5 shrink-0 text-hs-yellow-700" strokeWidth={1.75} />
              <p className="flex-1 font-sans text-xs font-medium leading-3 text-hs-yellow-700">
                Final cost may vary depending on the actual scope of work and materials required.
              </p>
            </div>
          </div>

          {/* Confirm order — normal block after warning, scrolls with content (FIXES-3.md #2) */}
          <div className="px-6 pt-6 pb-4">
            <Link
              href={successHref}
              className="flex h-14 w-full items-center justify-center rounded-[8px] px-[18px] py-4 font-sans text-base font-medium leading-6 tracking-[-0.16px] text-hs-blue-50"
              style={{
                backgroundImage:
                  "linear-gradient(175.07deg, var(--color-hs-blue-500) 0%, var(--color-hs-blue-800) 47.617%)",
              }}
            >
              Confirm order
            </Link>
          </div>
        </div>

        {/* ── Home indicator — stays at the bottom of the screen ──── */}
        <div className="flex h-[34px] w-full shrink-0 items-end justify-center pb-2">
          <div className="h-[5px] w-[134px] rounded-full bg-black/30" />
        </div>

      </div>
    </div>
  );
}

function SummaryRow({
  icon: Icon,
  label,
  value,
  last = false,
}: {
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 py-3",
        !last && "border-b border-hs-neutral-100",
      )}
    >
      <div className="flex shrink-0 items-center justify-center rounded-[6px] bg-[rgba(85,60,84,0.06)] p-1">
        <Icon className="size-4 text-hs-neutral-800" strokeWidth={1.75} />
      </div>
      <div className="flex min-w-0 flex-1 items-center gap-1">
        <span className="font-sans text-base font-normal leading-6 tracking-[-0.16px] text-hs-neutral-500">
          {label}
        </span>
        <span className="flex-1 truncate text-right font-sans text-base font-semibold leading-6 tracking-[-0.16px] text-hs-neutral-800">
          {value}
        </span>
      </div>
    </div>
  );
}

function CalcRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex-1 font-sans text-base font-normal leading-6 tracking-[-0.16px] text-hs-neutral-500">
        {label}
      </span>
      <span className="flex-1 text-right font-sans text-base font-semibold leading-6 tracking-[-0.16px] text-hs-neutral-800">
        {value}
      </span>
    </div>
  );
}

/** Not a pill — rectangular, rounded-6, gradient at 166.84deg (differs from the 175.07deg button gradient). */
function BonusToggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "flex h-6 w-14 shrink-0 items-center rounded-[6px] py-0.5 transition-[padding] duration-200",
        checked ? "pl-[22px] pr-0.5" : "pl-0.5 pr-[22px]",
      )}
      style={{
        backgroundImage: checked
          ? "linear-gradient(166.84deg, var(--color-hs-blue-500) 0%, var(--color-hs-blue-800) 47.617%)"
          : undefined,
        backgroundColor: checked ? undefined : "rgba(85,60,84,0.2)",
      }}
    >
      <span className="h-5 flex-1 rounded-[4px] bg-hs-neutral-0" />
    </button>
  );
}
