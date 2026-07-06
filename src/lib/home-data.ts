import {
  Armchair,
  HandCoins,
  MessageCircle,
  PaintRoller,
  SprayCan,
  Trees,
  Truck,
  UserPlus,
  WashingMachine,
  Wrench,
  type LucideIcon,
} from "lucide-react";

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
  icon: LucideIcon;
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  { id: "repairs", label: "Repairs", icon: Wrench },
  { id: "appliances", label: "Appliances", icon: WashingMachine },
  { id: "cleaning", label: "Cleaning", icon: SprayCan },
  { id: "furniture", label: "Furniture", icon: Armchair },
  { id: "moving", label: "Moving", icon: Truck },
  { id: "renovation", label: "Renovation", icon: PaintRoller },
  { id: "garden", label: "Garden", icon: Trees },
  { id: "consulting", label: "Consulting", icon: MessageCircle },
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
