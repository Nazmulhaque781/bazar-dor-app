
export interface Change {
  dir: "up" | "down" | "flat";
  pct: number;
}

export interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface Product {
  id: number;
  category: string;
  categoryIcon: string;
  categoryNameBn: string;
  change: Change;
  image: string;
  lastMonth: number;
  lastWeek: number;
  markets: Market[];
  nameBn: string;
  slug: string;
  today: number;
  unit: string;
  yesterday: number;
}

