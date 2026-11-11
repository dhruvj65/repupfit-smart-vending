export type MachineVariant = "jk91" | "pro" | "compact";

export type MachineFeature = { title: string; text: string };

export type Machine = {
  id: MachineVariant;
  name: string;
  model: string;
  tag: string;
  summary: string;
  highlights: string[];
  specs: { label: string; value: string }[];
  /** Detailed capability list, shown on the machines page. */
  features: MachineFeature[];
};

/**
 * JK91 specs come from the manufacturer brochure supplied by the client.
 * Pro 8 and Compact 7 are PLACEHOLDER specs — replace with real data sheets.
 */
export const MACHINES: Machine[] = [
  {
    id: "jk91",
    name: "RepUp JK91",
    model: "JK91",
    tag: "New flagship",
    summary:
      "Our biggest kiosk yet: a 32\" HD touchscreen, nine powder canisters and automatic cleaning after every cup. Its standout feature is Bring-Your-Own-Cup mode.",
    highlights: ['32" HD touchscreen', "9 powder canisters", "Bring-Your-Own-Cup mode"],
    specs: [
      { label: "Model", value: "JK91" },
      { label: "Size (W × D × H)", value: "700 × 740 × 1900 mm" },
      { label: "Colour", value: "Black" },
      { label: "Screen size", value: "32-inch" },
      { label: "Rated power", value: "1600 W" },
      { label: "Canister capacity", value: "5 × 4 L + 4 × 2.2 L" },
      { label: "Drink output", value: "Automatic cup dropping" },
      { label: "Cup lid type", value: "Auto-drop lid" },
      { label: "Cup dispenser", value: "120 pcs, 14 oz" },
      { label: "Cleaning method", value: "High pressure / temperature cleaning" },
      { label: "Drinking outlet door", value: "Automatic door" },
      { label: "Networking", value: "4G + Wi-Fi" },
      { label: "Water supply", value: "Pump water / tap water" },
      { label: "Material", value: "Cold-rolled steel + tempered glass" },
    ],
    features: [
      {
        title: "32\" large HD screen",
        text: "A big touchscreen that's effortless to use and doubles as a video screen for brand and promo content.",
      },
      {
        title: "Expanded to 9 canisters",
        text: "Nine powder canisters in a modular layout that keeps maintenance quick and costs down.",
      },
      {
        title: "5 types of mixing blades",
        text: "Fixed-point, mobile and intermittent mixing with custom durations — tuned to each powder's density.",
      },
      {
        title: "Well-mixed every time",
        text: "Multi-directional layered mixing gives a consistent, smooth texture in every drink.",
      },
      {
        title: "20+ flavours",
        text: "Blend whey, plant protein and more for muscle-building, meal replacement and recovery.",
      },
      {
        title: "Auto-clean after each cup",
        text: "High-temperature, high-pressure cleaning of the stir head after every drink — no cross-contamination.",
      },
      {
        title: "Auto door & auto lid",
        text: "The outlet door opens by itself and a lid drops onto every cup automatically.",
      },
      {
        title: "Flexible water supply",
        text: "Connect to a purified water tap or run from a pump and water bottle, with automatic refill and rapid heating.",
      },
      {
        title: "Bring your own cup",
        text: "Works with 14 oz and 16 oz cups — or your own shaker bottle.",
      },
      {
        title: "Touch-to-open, auto-lock",
        text: "Service door with auto-lock and remote opening from a phone or computer.",
      },
      {
        title: "Multiple payment options",
        text: "Card reader and contactless payments for a fast checkout.",
      },
      {
        title: "Remote monitoring",
        text: "Live machine status and fault warnings online, cutting manual inspection time.",
      },
    ],
  },
  {
    id: "pro",
    name: "RepUp Pro 8",
    model: "Pro 8",
    tag: "Club favourite",
    summary:
      "Built for busy clubs. Eight powder containers, a 21.5\" touchscreen and the fastest mix cycle we make.",
    highlights: ["8 drink containers", '21.5" touchscreen', "~40 s mix cycle"],
    specs: [
      { label: "Height", value: "1940 mm" },
      { label: "Width", value: "750 mm" },
      { label: "Depth", value: "760 mm" },
      { label: "Net weight", value: "150 kg" },
      { label: "Containers", value: "8" },
      { label: "Power supply", value: "220–230 V" },
      { label: "Peak consumption", value: "300 W" },
      { label: "Standby consumption", value: "150 W" },
    ],
    features: [
      { title: "Fast mix cycle", text: "Around 40 seconds from tap to shake, even at peak hours." },
      { title: "8 containers", text: "Room for the full menu of protein, collagen, BCAA and isotonic drinks." },
      { title: "Contactless payments", text: "Bank cards, Apple Pay, Google Pay and QR codes." },
      { title: "Sealed cups & lids", text: "Every drink comes in a fresh cup — no shaker needed." },
    ],
  },
  {
    id: "compact",
    name: "RepUp Compact 7",
    model: "Compact 7",
    tag: "Small spaces",
    summary:
      "A slimmer footprint for boutique studios and shopping centres, with the same smooth-mix technology inside.",
    highlights: ["7 drink containers", '15.6" touchscreen', "Fits tight corners"],
    specs: [
      { label: "Height", value: "1810 mm" },
      { label: "Width", value: "600 mm" },
      { label: "Depth", value: "750 mm" },
      { label: "Net weight", value: "145 kg" },
      { label: "Containers", value: "7" },
      { label: "Power supply", value: "220–230 V" },
      { label: "Peak consumption", value: "220 W" },
      { label: "Standby consumption", value: "160 W" },
    ],
    features: [
      { title: "Slim footprint", text: "Just 600 mm wide — fits beside a reception desk or in a corridor." },
      { title: "7 containers", text: "Covers the most popular drinks on our menu." },
      { title: "Smooth-mix tech", text: "The same vortex mixer as our larger models." },
      { title: "Low standby draw", text: "Efficient components keep running costs down." },
    ],
  },
];

export const MACHINE_IDS = MACHINES.map((m) => m.id);

export function isMachineVariant(value: unknown): value is MachineVariant {
  return typeof value === "string" && (MACHINE_IDS as string[]).includes(value);
}

export function getMachine(id: MachineVariant): Machine {
  const machine = MACHINES.find((m) => m.id === id);
  if (!machine) throw new Error(`Unknown machine: ${id}`);
  return machine;
}

/** After-sales service included with every installed kiosk. */
export const AFTER_SALES = [
  "1-year full machine warranty",
  "Lifetime maintenance",
  "Quick response",
  "Technical support",
  "Product training",
];
