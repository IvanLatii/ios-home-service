import {
  IconCardsThree,
  IconHouseFill,
  IconInfo,
  IconUser,
} from "@/components/icons/figma-icons";
import { cn } from "@/lib/utils";
import type { ComponentType, SVGProps } from "react";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

interface NavTab {
  id: string;
  label: string;
  icon: IconComponent;
}

const NAV_TABS: NavTab[] = [
  { id: "home", label: "Home", icon: IconHouseFill },
  { id: "orders", label: "Orders", icon: IconCardsThree },
];

const NAV_TABS_END: NavTab[] = [
  { id: "info", label: "Info", icon: IconInfo },
  { id: "profile", label: "Profile", icon: IconUser },
];

interface HomeBottomNavProps {
  activeTabId?: string;
}

/**
 * Static visual reproduction of the floating tab bar baked into the
 * "402 / Home" frame. No routing/interaction wired up yet, per scope.
 */
export function HomeBottomNav({ activeTabId = "home" }: HomeBottomNavProps) {
  return (
    <div className="sticky bottom-0 flex w-full shrink-0 flex-col bg-[linear-gradient(to_top,var(--color-hs-neutral-50)_60%,rgba(247,244,240,0))] pt-6">
      <div className="flex w-full flex-col items-start px-6 pt-2">
        <div className="flex w-full items-center overflow-hidden rounded-full border-[0.5px] border-hs-neutral-100 bg-hs-neutral-0 p-0.5 shadow-[0px_8px_16px_-4px_rgba(26,21,16,0.1),0px_16px_32px_-8px_rgba(26,21,16,0.14)]">
          {NAV_TABS.map((tab) => (
            <NavButton key={tab.id} tab={tab} isActive={tab.id === activeTabId} />
          ))}
          <div className="flex flex-1 flex-col items-center justify-center px-2">
            <button
              type="button"
              aria-label="Create new order"
              className="flex h-[40px] w-[54px] items-center justify-center rounded-full bg-[linear-gradient(158.003deg,var(--color-hs-blue-500)_0%,var(--color-hs-blue-800)_47.617%)]"
            >
              <span className="relative block size-4" aria-hidden>
                <span className="absolute top-0 left-1/2 h-4 w-[2px] -translate-x-1/2 rounded-[0.5px] bg-hs-neutral-0" />
                <span className="absolute top-1/2 left-0 h-[2px] w-4 -translate-y-1/2 rounded-[0.5px] bg-hs-neutral-0" />
              </span>
            </button>
          </div>
          {NAV_TABS_END.map((tab) => (
            <NavButton key={tab.id} tab={tab} isActive={tab.id === activeTabId} />
          ))}
        </div>
      </div>
      <div className="flex h-[34px] w-full items-end justify-center pb-2">
        <div className="h-[5px] w-[134px] rounded-full bg-black/30" />
      </div>
    </div>
  );
}

function NavButton({ tab, isActive }: { tab: NavTab; isActive: boolean }) {
  const Icon = tab.icon;

  return (
    <button
      type="button"
      aria-current={isActive ? "page" : undefined}
      aria-label={tab.label}
      className={cn(
        "flex flex-1 flex-col items-center justify-center gap-1.5 rounded-full p-4",
        isActive && "bg-hs-neutral-50"
      )}
    >
      <Icon className={cn("size-6", isActive ? "text-hs-neutral-800" : "text-hs-neutral-400")} />
    </button>
  );
}
