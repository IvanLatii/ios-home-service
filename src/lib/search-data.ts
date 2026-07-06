export interface SearchableService {
  id: string;
  label: string;
}

/** Shown under "History" while the search field is empty. */
export const INITIAL_RECENT_SEARCHES: SearchableService[] = [
  { id: "clean-home", label: "Clean home" },
  { id: "fix-leak", label: "Fix a leak" },
  { id: "fix-power", label: "Fix power issues" },
];

/** Shown under "Services" while the search field is empty. */
export const DEFAULT_SERVICES: SearchableService[] = [
  { id: "clean-home", label: "Clean home" },
  { id: "fix-leak", label: "Fix a leak" },
  { id: "fix-power", label: "Fix power issues" },
  { id: "fix-dishwasher", label: "Fix dishwasher" },
];

/** Full catalog searched (substring match) once the user starts typing. */
export const SEARCHABLE_SERVICES: SearchableService[] = [
  { id: "faucet-repair", label: "Faucet repair" },
  { id: "faucet-replacement", label: "Faucet replacement" },
  { id: "faucet-installation", label: "Faucet installation" },
  { id: "buy-a-faucet", label: "Buy a faucet" },
  { id: "clean-home", label: "Clean home" },
  { id: "fix-leak", label: "Fix a leak" },
  { id: "fix-power", label: "Fix power issues" },
  { id: "fix-dishwasher", label: "Fix dishwasher" },
  { id: "fix-washing-machine", label: "Fix washing machine" },
  { id: "move-furniture", label: "Move furniture" },
  { id: "fix-refrigerator", label: "Fix refrigerator" },
  { id: "trim-trees", label: "Trim trees" },
];
