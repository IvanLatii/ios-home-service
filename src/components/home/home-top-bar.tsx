import { MapPin } from "lucide-react";

import { StatusBarMock } from "@/components/home/status-bar-mock";
import { IconBell } from "@/components/icons/figma-icons";

interface HomeTopBarProps {
  address: string;
  notificationCount: number;
}

export function HomeTopBar({ address, notificationCount }: HomeTopBarProps) {
  return (
    <div className="flex w-full shrink-0 flex-col">
      <StatusBarMock />
      <div className="flex w-full items-center gap-2 px-6 py-4">
        <div className="flex min-w-0 flex-1 items-center gap-2 opacity-[0.96]">
          <MapPin className="size-5 shrink-0 text-hs-neutral-0" strokeWidth={1.75} />
          <p className="min-w-0 flex-1 truncate font-sans text-base leading-6 font-medium tracking-[-0.16px] text-hs-neutral-0">
            {address}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1 rounded-full bg-hs-pink-400 px-1.5 h-6">
          <span className="w-4 text-center font-sans text-sm leading-[14px] font-medium tracking-[-0.14px] text-hs-pink-1000">
            {notificationCount}
          </span>
          <IconBell className="size-4 text-hs-pink-1000" />
        </div>
      </div>
    </div>
  );
}
