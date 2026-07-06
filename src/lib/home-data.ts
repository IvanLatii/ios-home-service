import { HandCoins, UserPlus, type LucideIcon } from "lucide-react";

import {
  IconAppliances,
  IconCleaning,
  IconConsulting,
  IconFurniture,
  IconGarden,
  IconMoving,
  IconRenovation,
  IconRepairs,
} from "@/components/icons/figma-icons";
import type { ComponentType, SVGProps } from "react";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export interface ServiceChip {
  id: string;
  label: string;
}

export const SERVICE_CHIPS: ServiceChip[] = [
  { id: "clean-home", label: "Clean home" },
  { id: "fix-leak", label: "Fix a leak" },
  { id: "fix-power", label: "Fix power issues" },
  { id: "fix-dishwasher", label: "Fix dishwasher" },
  { id: "fix-washing-machine", label: "Fix washing machine" },
  { id: "move-furniture", label: "Move furniture" },
  { id: "fix-refrigerator", label: "Fix refrigerator" },
  { id: "trim-trees", label: "Trim trees" },
];

export interface ServiceCategory {
  id: string;
  label: string;
  icon: IconComponent;
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  { id: "repairs", label: "Repairs", icon: IconRepairs },
  { id: "appliances", label: "Appliances", icon: IconAppliances },
  { id: "cleaning", label: "Cleaning", icon: IconCleaning },
  { id: "furniture", label: "Furniture", icon: IconFurniture },
  { id: "moving", label: "Moving", icon: IconMoving },
  { id: "renovation", label: "Renovation", icon: IconRenovation },
  { id: "garden", label: "Garden", icon: IconGarden },
  { id: "consulting", label: "Consulting", icon: IconConsulting },
];

export interface SecondaryBanner {
  id: string;
  title: string;
  actionLabel: string;
  icon: LucideIcon;
}

export const SECONDARY_BANNERS: SecondaryBanner[] = [
  {
    id: "bonuses",
    title: "You have ₴487 in bonuses",
    actionLabel: "Use bonuses",
    icon: HandCoins,
  },
  {
    id: "invite",
    title: "Share your link and earn rewards",
    actionLabel: "Invite",
    icon: UserPlus,
  },
];
