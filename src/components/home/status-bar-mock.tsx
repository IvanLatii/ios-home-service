import { BatteryFull, SignalHigh, Wifi } from "lucide-react";

interface StatusBarMockProps {
  time?: string;
}

/**
 * Static visual approximation of the iOS status bar shown at the top of the
 * "402 / Home" Figma frame. Purely decorative, matches no real device clock.
 */
export function StatusBarMock({ time = "17:05" }: StatusBarMockProps) {
  return (
    <div className="flex h-[62px] w-full shrink-0 items-center justify-between px-[27px] text-hs-neutral-0">
      <span className="font-alumni text-[17px] leading-[22px] font-semibold tracking-[-0.17px]">
        {time}
      </span>
      <div className="flex items-center gap-[6px]">
        <SignalHigh className="size-[17px]" strokeWidth={2} />
        <Wifi className="size-[17px]" strokeWidth={2} />
        <BatteryFull className="size-[21px]" strokeWidth={1.5} />
      </div>
    </div>
  );
}
