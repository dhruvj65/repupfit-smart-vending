export type Flavour = {
  name: string;
  /** Hex color used for the 3D cup band and swatches. */
  color: string;
};

export type DrinkCategory = {
  id: string;
  name: string;
  short: string;
  description: string;
  benefits: string[];
  flavours: Flavour[];
  protein: string;
};

export const DRINKS: DrinkCategory[] = [
  {
    id: "whey",
    name: "Whey Protein",
    short: "The classic post-lift refuel.",
    description:
      "A fast-absorbing whey blend mixed silky-smooth with chilled water. Built for the minutes right after your last set.",
    protein: "24 g protein",
    benefits: [
      "Supports muscle repair and growth",
      "Keeps you full for hours with few calories",
      "Rich in essential amino acids",
      "Helps maintain bone health",
    ],
    flavours: [
      { name: "Double Chocolate", color: "#6b3e26" },
      { name: "Cookies & Cream", color: "#d9d2c5" },
      { name: "Salted Caramel", color: "#c98a3c" },
      { name: "Strawberry Shake", color: "#e8667a" },
      { name: "Banana Split", color: "#f1d55c" },
      { name: "Peanut Butter Cup", color: "#a86b3c" },
    ],
  },
  {
    id: "plant",
    name: "Plant Protein",
    short: "Fully plant-based power.",
    description:
      "A pea and rice protein blend for anyone eating plant-based or avoiding dairy, with a creamy texture that doesn't taste like a compromise.",
    protein: "21 g protein",
    benefits: [
      "100% plant-based formula",
      "Low in sugar",
      "Gentle on digestion",
      "Supports recovery between sessions",
    ],
    flavours: [
      { name: "Madagascar Vanilla", color: "#efe2b8" },
      { name: "Cacao", color: "#5a3a2a" },
    ],
  },
  {
    id: "collagen",
    name: "Collagen",
    short: "Joints, skin and recovery.",
    description:
      "Hydrolysed collagen peptides in a light, fruity drink — ideal for connective tissue support on heavy training weeks.",
    protein: "10 g collagen",
    benefits: [
      "Supports skin elasticity and hydration",
      "Helps maintain healthy joints and ligaments",
      "Strengthens hair and nails",
      "Aids connective tissue repair",
    ],
    flavours: [
      { name: "Wild Blueberry", color: "#5b5bd6" },
      { name: "Pineapple", color: "#f2c53d" },
      { name: "Green Apple", color: "#8fd14f" },
      { name: "Tropical Punch", color: "#f07a3a" },
    ],
  },
  {
    id: "bcaa",
    name: "BCAA",
    short: "Fuel during the session.",
    description:
      "Branched-chain amino acids in a crisp, zero-sugar drink to sip between sets and keep fatigue at bay.",
    protein: "6 g BCAA",
    benefits: [
      "Supports protein synthesis",
      "Reduces muscle breakdown during training",
      "Helps delay fatigue",
    ],
    flavours: [
      { name: "Cola Lime", color: "#7a3b1e" },
      { name: "Watermelon", color: "#ef4f62" },
    ],
  },
  {
    id: "isotonic",
    name: "Isotonic",
    short: "Hydration for long sessions.",
    description:
      "Electrolytes and fast carbs balanced to your body's fluids — for cardio days, classes and long workouts.",
    protein: "Electrolytes + carbs",
    benefits: [
      "Replaces electrolytes lost in sweat",
      "Boosts endurance and focus",
      "Speeds up rehydration",
      "Supports steady energy output",
    ],
    flavours: [
      { name: "Lemon Zest", color: "#f4e04d" },
      { name: "Honeydew Melon", color: "#a7e08a" },
    ],
  },
];

export const TOTAL_FLAVOURS = DRINKS.reduce((sum, d) => sum + d.flavours.length, 0);

/** Narrows an untrusted ?drink= search value to a known drink id. */
export function parseDrinkParam(value: unknown): string | undefined {
  return typeof value === "string" && DRINKS.some((d) => d.id === value) ? value : undefined;
}
