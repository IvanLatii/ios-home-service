import Link from "next/link";
import { CheckCircle } from "lucide-react";

interface ConfirmationScreenProps {
  service: string;
  option: string;
  date: string;
  time: string;
  price: number;
}

export function ConfirmationScreen({
  service,
  option,
  date,
  time,
  price,
}: ConfirmationScreenProps) {
  const formattedDate = (() => {
    try {
      return new Date(date + "T12:00:00").toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });
    } catch {
      return date;
    }
  })();

  return (
    <div className="flex min-h-dvh w-full justify-center bg-hs-neutral-800/10">
      <div className="flex h-dvh w-full max-w-[402px] flex-col items-center bg-hs-neutral-50 animate-slide-in">
        {/* Status bar stub */}
        <div
          className="flex h-[44px] w-full shrink-0 items-center px-6 pt-[14px]"
          aria-hidden
        >
          <span
            className="text-[17px] leading-[22px] font-[590] tracking-[-0.17px] text-hs-neutral-800"
            style={{
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
              fontVariationSettings: '"wdth" 100',
            }}
          >
            17:05
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col items-center justify-between px-4 pb-12 pt-10">
          {/* Success area */}
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <div className="animate-scale-in" style={{ animationFillMode: "both" }}>
              <CheckCircle
                className="size-20 text-hs-blue-500"
                strokeWidth={1.5}
              />
            </div>
            <div className="flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: "0.15s", animationFillMode: "both" }}>
              <h1 className="font-alumni text-[40px] font-semibold leading-none tracking-[-0.4px] text-hs-neutral-800">
                Booking confirmed!
              </h1>
              <p className="font-sans text-base leading-6 font-medium text-hs-neutral-600 text-center">
                Your specialist will arrive on time.
              </p>
            </div>
          </div>

          {/* Details card */}
          <div
            className="w-full rounded-[16px] bg-hs-neutral-0 px-5 py-5 animate-slide-up"
            style={{ animationDelay: "0.2s", animationFillMode: "both" }}
          >
            <p className="pb-4 font-sans text-xs font-semibold uppercase tracking-[0.06em] text-hs-neutral-600">
              Booking details
            </p>
            <DetailRow label="Service" value={service} />
            <DetailRow label="Option" value={option} />
            <DetailRow label="Date" value={formattedDate} />
            <DetailRow label="Time" value={time} />
            <DetailRow label="Address" value="Shevchenka st., 47" />
            <div className="mt-4 flex items-center justify-between border-t border-hs-neutral-100 pt-4">
              <span className="font-sans text-base font-semibold tracking-[-0.16px] text-hs-neutral-800">
                Total
              </span>
              <span className="font-alumni text-3xl font-semibold tracking-[-0.3px] text-hs-neutral-800">
                ₴{price}
              </span>
            </div>
          </div>

          {/* CTA */}
          <div
            className="w-full pt-6 animate-fade-in"
            style={{ animationDelay: "0.3s", animationFillMode: "both" }}
          >
            <Link
              href="/"
              className="flex w-full items-center justify-center rounded-[12px] bg-[linear-gradient(135deg,var(--color-hs-blue-500)_0%,var(--color-hs-blue-800)_100%)] px-6 py-4 font-sans text-base font-semibold tracking-[-0.16px] text-hs-neutral-0 active:opacity-80"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-1.5">
      <span className="font-sans text-sm leading-5 tracking-[-0.14px] text-hs-neutral-600 shrink-0">
        {label}
      </span>
      <span className="font-sans text-sm font-medium leading-5 tracking-[-0.14px] text-hs-neutral-800 text-right">
        {value}
      </span>
    </div>
  );
}
