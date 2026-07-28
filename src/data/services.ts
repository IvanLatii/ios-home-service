import type { Service, SelectField } from "./types";

// Загальний набір полів за замовчуванням — для всіх послуг, крім еталонної faucet-repair
const genericFields: SelectField[] = [
  {
    id: "problem-type",
    label: "Problem type",
    required: true,
    options: [
      { id: "repair", label: "Repair" },
      { id: "installation", label: "Installation" },
      { id: "consultation", label: "Consultation" },
    ],
  },
  {
    id: "service-type",
    label: "Service type",
    required: true,
    options: [
      { id: "standard", label: "Standard" },
      { id: "express", label: "Express" },
      { id: "premium", label: "Premium" },
    ],
  },
  {
    id: "preferred-option",
    label: "Preferred option",
    required: true,
    options: [
      { id: "option-a", label: "Option A" },
      { id: "option-b", label: "Option B" },
      { id: "option-c", label: "Option C" },
    ],
  },
];

// Еталонні поля faucet-repair — точно як у розділі 5 SPEC.md
const faucetRepairFields: SelectField[] = [
  {
    id: "problem-type",
    label: "Problem type",
    required: true,
    options: [
      { id: "repair", label: "Repair" },
      { id: "leak", label: "Leak" },
      { id: "replacement", label: "Replacement" },
    ],
  },
  {
    id: "faucet-type",
    label: "Faucet type",
    required: true,
    options: [
      { id: "water", label: "Water" },
      { id: "gas", label: "Gas" },
      { id: "mixer", label: "Mixer" },
    ],
  },
  {
    id: "faucet-diameter",
    label: "Faucet diameter",
    required: true,
    options: [
      { id: "unknown", label: "I don't know" },
      { id: "1-2-inch", label: "1/2 inch" },
      { id: "3-4-inch", label: "3/4 inch" },
      { id: "1-inch", label: "1 inch" },
      { id: "1-1-4-inch", label: "1 1/4 inch" },
    ],
  },
];

export const services: Service[] = [
  // Cleaning
  { id: "general-cleaning", slug: "general-cleaning", categoryId: "cat-cleaning", title: "General home cleaning", basePrice: 900, fields: genericFields },
  { id: "deep-cleaning", slug: "deep-cleaning", categoryId: "cat-cleaning", title: "Deep cleaning", basePrice: 1500, fields: genericFields },
  { id: "window-cleaning", slug: "window-cleaning", categoryId: "cat-cleaning", title: "Window cleaning", basePrice: 700, fields: genericFields },
  { id: "carpet-cleaning", slug: "carpet-cleaning", categoryId: "cat-cleaning", title: "Carpet cleaning", basePrice: 850, fields: genericFields },
  { id: "post-renovation-cleaning", slug: "post-renovation-cleaning", categoryId: "cat-cleaning", title: "Post-renovation cleaning", basePrice: 2000, fields: genericFields },
  { id: "upholstery-cleaning", slug: "upholstery-cleaning", categoryId: "cat-cleaning", title: "Upholstery cleaning", basePrice: 1100, fields: genericFields },
  { id: "move-out-cleaning", slug: "move-out-cleaning", categoryId: "cat-cleaning", title: "Move-out cleaning", basePrice: 1300, fields: genericFields },
  { id: "office-cleaning", slug: "office-cleaning", categoryId: "cat-cleaning", title: "Office cleaning", basePrice: 1600, fields: genericFields },

  // Repair & Installation
  { id: "furniture-assembly", slug: "furniture-assembly", categoryId: "cat-repair-installation", title: "Furniture assembly", basePrice: 600, fields: genericFields },
  { id: "tv-mounting", slug: "tv-mounting", categoryId: "cat-repair-installation", title: "TV mounting", basePrice: 500, fields: genericFields },
  { id: "curtain-rod-installation", slug: "curtain-rod-installation", categoryId: "cat-repair-installation", title: "Curtain rod installation", basePrice: 400, fields: genericFields },
  { id: "door-installation", slug: "door-installation", categoryId: "cat-repair-installation", title: "Door installation", basePrice: 1800, fields: genericFields },
  { id: "lock-replacement", slug: "lock-replacement", categoryId: "cat-repair-installation", title: "Lock replacement", basePrice: 700, fields: genericFields },
  { id: "shelf-installation", slug: "shelf-installation", categoryId: "cat-repair-installation", title: "Shelf installation", basePrice: 450, fields: genericFields },
  { id: "blinds-installation", slug: "blinds-installation", categoryId: "cat-repair-installation", title: "Blinds installation", basePrice: 550, fields: genericFields },
  { id: "general-handyman", slug: "general-handyman", categoryId: "cat-repair-installation", title: "General handyman service", basePrice: 800, fields: genericFields },

  // Electrical
  { id: "outlet-installation", slug: "outlet-installation", categoryId: "cat-electrical", title: "Outlet installation", basePrice: 500, fields: genericFields },
  { id: "light-fixture-installation", slug: "light-fixture-installation", categoryId: "cat-electrical", title: "Light fixture installation", basePrice: 600, fields: genericFields },
  { id: "wiring-repair", slug: "wiring-repair", categoryId: "cat-electrical", title: "Wiring repair", basePrice: 1200, fields: genericFields },
  { id: "circuit-breaker-repair", slug: "circuit-breaker-repair", categoryId: "cat-electrical", title: "Circuit breaker repair", basePrice: 1000, fields: genericFields },
  { id: "chandelier-installation", slug: "chandelier-installation", categoryId: "cat-electrical", title: "Chandelier installation", basePrice: 700, fields: genericFields },
  { id: "doorbell-installation", slug: "doorbell-installation", categoryId: "cat-electrical", title: "Doorbell installation", basePrice: 450, fields: genericFields },
  { id: "electrical-panel-inspection", slug: "electrical-panel-inspection", categoryId: "cat-electrical", title: "Electrical panel inspection", basePrice: 900, fields: genericFields },
  { id: "smart-home-setup", slug: "smart-home-setup", categoryId: "cat-electrical", title: "Smart home setup", basePrice: 1500, fields: genericFields },

  // Plumbing
  { id: "faucet-repair", slug: "faucet-repair", categoryId: "cat-plumbing", title: "Faucet repair", basePrice: 1500, fields: faucetRepairFields },
  { id: "pipe-leak-repair", slug: "pipe-leak-repair", categoryId: "cat-plumbing", title: "Pipe leak repair", basePrice: 1300, fields: genericFields },
  { id: "toilet-repair", slug: "toilet-repair", categoryId: "cat-plumbing", title: "Toilet repair", basePrice: 1100, fields: genericFields },
  { id: "water-heater-installation", slug: "water-heater-installation", categoryId: "cat-plumbing", title: "Water heater installation", basePrice: 2200, fields: genericFields },
  { id: "drain-cleaning", slug: "drain-cleaning", categoryId: "cat-plumbing", title: "Drain cleaning", basePrice: 900, fields: genericFields },
  { id: "sink-installation", slug: "sink-installation", categoryId: "cat-plumbing", title: "Sink installation", basePrice: 1400, fields: genericFields },
  { id: "shower-repair", slug: "shower-repair", categoryId: "cat-plumbing", title: "Shower repair", basePrice: 1200, fields: genericFields },
  { id: "pipe-installation", slug: "pipe-installation", categoryId: "cat-plumbing", title: "Pipe installation", basePrice: 1800, fields: genericFields },

  // Home & Furniture
  { id: "furniture-repair", slug: "furniture-repair", categoryId: "cat-home-furniture", title: "Furniture repair", basePrice: 800, fields: genericFields },
  { id: "mattress-cleaning", slug: "mattress-cleaning", categoryId: "cat-home-furniture", title: "Mattress cleaning", basePrice: 700, fields: genericFields },
  { id: "wardrobe-assembly", slug: "wardrobe-assembly", categoryId: "cat-home-furniture", title: "Wardrobe assembly", basePrice: 900, fields: genericFields },
  { id: "mirror-installation", slug: "mirror-installation", categoryId: "cat-home-furniture", title: "Mirror installation", basePrice: 500, fields: genericFields },
  { id: "curtain-hanging", slug: "curtain-hanging", categoryId: "cat-home-furniture", title: "Curtain hanging", basePrice: 400, fields: genericFields },
  { id: "furniture-reupholstery", slug: "furniture-reupholstery", categoryId: "cat-home-furniture", title: "Furniture reupholstery", basePrice: 2500, fields: genericFields },
  { id: "interior-styling", slug: "interior-styling", categoryId: "cat-home-furniture", title: "Interior styling consultation", basePrice: 1000, fields: genericFields },
  { id: "storage-organization", slug: "storage-organization", categoryId: "cat-home-furniture", title: "Storage organization", basePrice: 850, fields: genericFields },

  // Yard & Garden
  { id: "lawn-mowing", slug: "lawn-mowing", categoryId: "cat-yard-garden", title: "Lawn mowing", basePrice: 600, fields: genericFields },
  { id: "tree-trimming", slug: "tree-trimming", categoryId: "cat-yard-garden", title: "Tree trimming", basePrice: 1200, fields: genericFields },
  { id: "garden-cleanup", slug: "garden-cleanup", categoryId: "cat-yard-garden", title: "Garden cleanup", basePrice: 800, fields: genericFields },
  { id: "hedge-trimming", slug: "hedge-trimming", categoryId: "cat-yard-garden", title: "Hedge trimming", basePrice: 700, fields: genericFields },
  { id: "irrigation-setup", slug: "irrigation-setup", categoryId: "cat-yard-garden", title: "Irrigation system setup", basePrice: 2000, fields: genericFields },
  { id: "leaf-removal", slug: "leaf-removal", categoryId: "cat-yard-garden", title: "Leaf removal", basePrice: 500, fields: genericFields },
  { id: "planting-service", slug: "planting-service", categoryId: "cat-yard-garden", title: "Planting service", basePrice: 900, fields: genericFields },
  { id: "patio-cleaning", slug: "patio-cleaning", categoryId: "cat-yard-garden", title: "Patio cleaning", basePrice: 650, fields: genericFields },

  // Moving & Transport
  { id: "apartment-moving", slug: "apartment-moving", categoryId: "cat-moving-transport", title: "Apartment moving", basePrice: 2500, fields: genericFields },
  { id: "furniture-transport", slug: "furniture-transport", categoryId: "cat-moving-transport", title: "Furniture transport", basePrice: 1200, fields: genericFields },
  { id: "packing-service", slug: "packing-service", categoryId: "cat-moving-transport", title: "Packing service", basePrice: 900, fields: genericFields },
  { id: "piano-moving", slug: "piano-moving", categoryId: "cat-moving-transport", title: "Piano moving", basePrice: 3000, fields: genericFields },
  { id: "office-relocation", slug: "office-relocation", categoryId: "cat-moving-transport", title: "Office relocation", basePrice: 3500, fields: genericFields },
  { id: "loading-unloading", slug: "loading-unloading", categoryId: "cat-moving-transport", title: "Loading and unloading help", basePrice: 800, fields: genericFields },
  { id: "storage-transport", slug: "storage-transport", categoryId: "cat-moving-transport", title: "Storage transport", basePrice: 1100, fields: genericFields },
  { id: "disposal-service", slug: "disposal-service", categoryId: "cat-moving-transport", title: "Old furniture disposal", basePrice: 700, fields: genericFields },

  // Other Services
  { id: "handyman-consultation", slug: "handyman-consultation", categoryId: "cat-other-services", title: "Handyman consultation", basePrice: 400, fields: genericFields },
  { id: "appliance-repair", slug: "appliance-repair", categoryId: "cat-other-services", title: "Appliance repair", basePrice: 1200, fields: genericFields },
  { id: "computer-repair", slug: "computer-repair", categoryId: "cat-other-services", title: "Computer repair", basePrice: 900, fields: genericFields },
  { id: "tv-repair", slug: "tv-repair", categoryId: "cat-other-services", title: "TV repair", basePrice: 1100, fields: genericFields },
  { id: "pest-control", slug: "pest-control", categoryId: "cat-other-services", title: "Pest control", basePrice: 1000, fields: genericFields },
  { id: "locksmith-service", slug: "locksmith-service", categoryId: "cat-other-services", title: "Locksmith service", basePrice: 800, fields: genericFields },
  { id: "air-conditioner-service", slug: "air-conditioner-service", categoryId: "cat-other-services", title: "Air conditioner service", basePrice: 1300, fields: genericFields },
  { id: "general-consultation", slug: "general-consultation", categoryId: "cat-other-services", title: "General consultation", basePrice: 300, fields: genericFields },
];
