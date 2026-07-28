export type Category = {
  id: string;
  slug: string;
  title: string;
  icon: string; // емодзі
  serviceIds: string[];
};

export type SelectField = {
  id: string;
  label: string; // "Problem type"
  required: boolean;
  options: { id: string; label: string }[];
};

export type Service = {
  id: string;
  slug: string;
  categoryId: string;
  title: string; // "Faucet repair"
  basePrice: number; // грн
  fields: SelectField[];
};

export type Master = {
  id: string;
  name: string;
  initials: string;
  rating: number;
  reviews: number;
};
