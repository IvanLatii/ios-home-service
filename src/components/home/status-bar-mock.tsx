import {
  StatusBarBatteryIcon,
  StatusBarCellularIcon,
  StatusBarWifiIcon,
} from "@/components/icons/figma-icons";

interface StatusBarMockProps {
  time?: string;
}

/**
 * Native iOS status bar ("Status bar - iPhone", Figma node 50:4536) rendered
 * with SF Pro and the exact cellular/Wi-Fi/battery glyphs from the design.
 * Purely decorative — matches no real device clock.
 */
export function StatusBarMock({ time = "17:05" }: StatusBarMockProps) {
  return (
    <div className="flex h-[62px] w-full shrink-0 items-center justify-between px-[24px] pt-[21px] pb-[19px] text-hs-neutral-0">
      <p
        className="text-[17px] leading-[22px] font-[590] tracking-[-0.17px]"
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", system-ui, sans-serif',
          fontVariationSettings: '"wdth" 100',
        }}
      >
        {time}
      </p>
      <div className="flex items-center gap-[7px]">
        <StatusBarCellularIcon className="h-[12.226px] w-[19.2px]" />
        <StatusBarWifiIcon className="h-[12.328px] w-[17.142px]" />
        <StatusBarBatteryIcon className="h-[13px] w-[27.328px]" />
      </div>
    </div>
  );
}
