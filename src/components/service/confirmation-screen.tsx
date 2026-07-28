import Image from "next/image";
import Link from "next/link";

import { StatusBarMock } from "@/components/home/status-bar-mock";

const SHIELD_SRC = "/figma/402/sheild-dynamic-clay.png";

interface ConfirmationScreenProps {
  /** Day of month within the fixed July 2026 demo range, e.g. "17". */
  date?: string;
  time?: string;
}

// SCREEN-SUCCESS.md — це нижня модалка поверх темного тла, не сторінка.
// Три шари: тло neutral-800 → картка-«стос» neutral-400 (peek) → сам шит neutral-50.
export function ConfirmationScreen({ date = "", time = "" }: ConfirmationScreenProps) {
  const backHref = `/?ordered=1&date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}`;

  return (
    <div className="flex min-h-dvh w-full justify-center bg-hs-neutral-800">
      <div className="relative flex h-dvh w-full max-w-[402px] flex-col overflow-hidden bg-hs-neutral-800">
        {/* Status bar on dark background */}
        <StatusBarMock />

        {/* Sheet stage — sheet is pinned to the bottom of the remaining height */}
        <div className="relative flex flex-1 flex-col pt-2.5">
          {/* Layer 2: stacked card peeking out behind the sheet */}
          <div
            aria-hidden
            className="absolute inset-x-5 inset-y-0 rounded-t-[20px] bg-hs-neutral-400"
          />

          {/* Layer 3: the sheet itself */}
          <div className="relative z-10 flex flex-1 flex-col overflow-hidden rounded-t-[20px] bg-hs-neutral-50 animate-slide-up">
            {/* Noise wash */}
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[#f9f4ee] opacity-40" />

            {/* Grabber */}
            <div className="relative flex h-[14px] w-full items-center justify-center">
              <div className="h-[14px] w-[68px] rounded-full bg-hs-neutral-300" />
            </div>

            {/* Message */}
            <div className="relative flex flex-1 flex-col items-center justify-center gap-8 p-6">
              <div className="relative flex size-40 shrink-0 items-center justify-center">
                <Image
                  src={SHIELD_SRC}
                  alt=""
                  width={160}
                  height={160}
                  aria-hidden
                  className="absolute left-[-12px] top-[12px] opacity-[0.32] blur-lg"
                />
                <Image
                  src={SHIELD_SRC}
                  alt=""
                  width={160}
                  height={160}
                  className="relative"
                />
              </div>

              <div className="flex w-full flex-col gap-4 text-center">
                <h1 className="font-alumni text-[56px] leading-[48px] font-semibold tracking-[-0.56px] text-hs-neutral-800">
                  Your request has been received
                </h1>
                <p className="font-sans text-base leading-6 font-medium text-hs-neutral-500">
                  Track updates in Orders.
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="relative flex flex-col gap-2 px-6 pt-2">
              <button
                type="button"
                className="flex h-14 w-full items-center justify-center rounded-[8px] px-[18px] py-4 font-sans text-base font-medium leading-6 tracking-[-0.16px] text-hs-blue-50"
                style={{
                  backgroundImage:
                    "linear-gradient(175.07deg, var(--color-hs-blue-500) 0%, var(--color-hs-blue-800) 47.617%)",
                }}
              >
                Track order
              </button>
              <Link
                href={backHref}
                className="flex h-14 w-full items-center justify-center rounded-[8px] bg-hs-neutral-0 font-sans text-base font-medium leading-6 tracking-[-0.16px] text-hs-neutral-800"
              >
                Back to home
              </Link>
            </div>

            {/* Home indicator — visible here, unlike other screens */}
            <div className="relative flex h-[34px] w-full items-end justify-center pb-2">
              <div className="h-[5px] w-[134px] rounded-full bg-black/30" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
