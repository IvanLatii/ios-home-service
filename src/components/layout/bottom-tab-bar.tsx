import { CalendarCheck, House, MessageCircle, Search, User } from "lucide-react";

import { cn } from "@/lib/utils";

const TAB_ITEMS = [
  { id: "home", label: "Home", icon: House },
  { id: "search", label: "Search", icon: Search },
  { id: "bookings", label: "Bookings", icon: CalendarCheck },
  { id: "messages", label: "Messages", icon: MessageCircle },
  { id: "profile", label: "Profile", icon: User },
] as const;

type TabId = (typeof TAB_ITEMS)[number]["id"];

interface BottomTabBarProps {
  activeTab?: TabId;
}

export function BottomTabBar({ activeTab = "home" }: BottomTabBarProps) {
  return (
    <nav
      aria-label="Primary"
      className="flex shrink-0 items-stretch border-t border-border bg-background/80 pb-[var(--safe-area-bottom)] backdrop-blur-md"
    >
      {TAB_ITEMS.map((tab) => {
        const isActive = tab.id === activeTab;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            type="button"
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex flex-1 flex-col items-center justify-center gap-0.5 pt-2 pb-1 text-[10px] font-medium",
              isActive ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Icon className="size-6" strokeWidth={isActive ? 2.25 : 1.75} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
