export interface ServiceOption {
  id: string;
  label: string;
  description: string;
  price: number;
  /** e.g. "2–3 hrs" */
  duration: string;
}

export interface ServiceDetails {
  id: string;
  title: string;
  tagline: string;
  rating: number;
  reviewCount: number;
  /** Starting price for display */
  startingPrice: number;
  options: ServiceOption[];
}

export const SERVICES: Record<string, ServiceDetails> = {
  repairs: {
    id: "repairs",
    title: "Repairs",
    tagline: "Fast, reliable fixes for every home issue",
    rating: 4.8,
    reviewCount: 312,
    startingPrice: 450,
    options: [
      { id: "faucet-repair", label: "Faucet repair", description: "Dripping or leaking faucet fixed same day", price: 450, duration: "1 hr" },
      { id: "pipe-fix", label: "Pipe leak fix", description: "Locate and seal pipe leaks", price: 680, duration: "1–2 hrs" },
      { id: "toilet-repair", label: "Toilet repair", description: "Running, clogged, or broken toilet", price: 520, duration: "1 hr" },
      { id: "door-lock", label: "Door & lock repair", description: "Squeaky hinges, broken locks, stuck doors", price: 390, duration: "1 hr" },
    ],
  },
  appliances: {
    id: "appliances",
    title: "Appliances",
    tagline: "Expert repair for all home appliances",
    rating: 4.7,
    reviewCount: 198,
    startingPrice: 550,
    options: [
      { id: "washing-machine", label: "Washing machine", description: "Diagnose and fix any washer fault", price: 750, duration: "1–2 hrs" },
      { id: "dishwasher", label: "Dishwasher", description: "Leaks, drainage and cycle issues", price: 680, duration: "1–2 hrs" },
      { id: "refrigerator", label: "Refrigerator", description: "Cooling, ice-maker and compressor faults", price: 850, duration: "2–3 hrs" },
      { id: "oven-stove", label: "Oven & stove", description: "Burners, ignition and thermostat repairs", price: 550, duration: "1–2 hrs" },
    ],
  },
  cleaning: {
    id: "cleaning",
    title: "Cleaning",
    tagline: "Spotless results, every time",
    rating: 4.9,
    reviewCount: 541,
    startingPrice: 850,
    options: [
      { id: "quick-clean", label: "Quick tidy-up", description: "Vacuum, mop, dusting & surfaces", price: 850, duration: "2 hrs" },
      { id: "deep-clean", label: "Deep cleaning", description: "Full clean including appliances & bathrooms", price: 1450, duration: "4 hrs" },
      { id: "move-in-clean", label: "Move-in / move-out", description: "Thorough clean for handovers", price: 2100, duration: "6 hrs" },
      { id: "office-clean", label: "Office cleaning", description: "Daily or weekly workplace cleaning", price: 1200, duration: "3 hrs" },
    ],
  },
  furniture: {
    id: "furniture",
    title: "Furniture",
    tagline: "Assembly, repair and restoration",
    rating: 4.7,
    reviewCount: 164,
    startingPrice: 400,
    options: [
      { id: "flat-pack", label: "Flat-pack assembly", description: "IKEA and any flat-pack furniture", price: 400, duration: "1–3 hrs" },
      { id: "furniture-repair", label: "Furniture repair", description: "Fix broken frames, drawers and hinges", price: 480, duration: "1–2 hrs" },
      { id: "sofa-clean", label: "Sofa & upholstery clean", description: "Steam cleaning for sofas and chairs", price: 950, duration: "2–3 hrs" },
    ],
  },
  moving: {
    id: "moving",
    title: "Moving",
    tagline: "Stress-free moves, big or small",
    rating: 4.6,
    reviewCount: 237,
    startingPrice: 1200,
    options: [
      { id: "local-move", label: "Local move", description: "Same-city apartment or house move", price: 1200, duration: "4–6 hrs" },
      { id: "single-item", label: "Single-item delivery", description: "Sofa, fridge, or any bulky item", price: 650, duration: "2 hrs" },
      { id: "packing-service", label: "Packing service", description: "Professional packing of all belongings", price: 900, duration: "3–4 hrs" },
    ],
  },
  renovation: {
    id: "renovation",
    title: "Renovation",
    tagline: "Transform your space with skilled pros",
    rating: 4.8,
    reviewCount: 89,
    startingPrice: 1500,
    options: [
      { id: "painting", label: "Painting & decorating", description: "Interior walls, ceilings and trim", price: 1500, duration: "1 day" },
      { id: "tiling", label: "Tiling", description: "Kitchen, bathroom or floor tiles", price: 2200, duration: "1–2 days" },
      { id: "flooring", label: "Flooring installation", description: "Laminate, vinyl or hardwood", price: 3500, duration: "2–3 days" },
    ],
  },
  garden: {
    id: "garden",
    title: "Garden",
    tagline: "Keep your outdoor space beautiful",
    rating: 4.7,
    reviewCount: 143,
    startingPrice: 600,
    options: [
      { id: "lawn-mowing", label: "Lawn mowing", description: "Regular or one-off lawn mowing", price: 600, duration: "1–2 hrs" },
      { id: "tree-trimming", label: "Tree & hedge trimming", description: "Shape hedges and trim overgrown trees", price: 950, duration: "2–3 hrs" },
      { id: "garden-tidy", label: "Garden tidy-up", description: "Weeding, raking, waste removal", price: 800, duration: "2–3 hrs" },
    ],
  },
  consulting: {
    id: "consulting",
    title: "Consulting",
    tagline: "Expert advice before you commit",
    rating: 4.9,
    reviewCount: 72,
    startingPrice: 350,
    options: [
      { id: "home-inspection", label: "Home inspection", description: "Full walkthrough and condition report", price: 900, duration: "2 hrs" },
      { id: "renovation-consult", label: "Renovation consult", description: "Plan and budget your renovation", price: 500, duration: "1 hr" },
      { id: "energy-audit", label: "Energy audit", description: "Find savings on heating and electricity", price: 350, duration: "1 hr" },
    ],
  },
};

/** Search-result service IDs resolve to their parent category. */
const SEARCH_ID_MAP: Record<string, string> = {
  "faucet-replacement":  "repairs",
  "faucet-installation": "repairs",
  "buy-a-faucet":        "repairs",
  "clean-home":          "cleaning",
  "fix-leak":            "repairs",
  "fix-power":           "repairs",
  "fix-dishwasher":      "appliances",
  "fix-washing-machine": "appliances",
  "move-furniture":      "moving",
  "fix-refrigerator":    "appliances",
  "trim-trees":          "garden",
};

export function getService(id: string): ServiceDetails | null {
  return SERVICES[SEARCH_ID_MAP[id] ?? id] ?? null;
}

/** Convenience for the 4 time-slot rows shown in the Booking screen. */
export const TIME_SLOTS = [
  "08:00", "09:00", "10:00", "11:00",
  "12:00", "13:00", "14:00", "15:00",
  "16:00", "17:00", "18:00", "19:00",
];
