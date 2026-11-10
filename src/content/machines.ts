export type MachineVariant = "pro" | "compact";

export type Machine = {
  id: MachineVariant;
  name: string;
  summary: string;
  highlights: string[];
  specs: { label: string; value: string }[];
};

/** PLACEHOLDER model names and specs — replace with the real machine data sheets. */
export const MACHINES: Machine[] = [
  {
    id: "pro",
    name: "RepUp Pro 8",
    summary:
      "Our flagship kiosk for busy clubs. Eight powder containers, a 21.5\" touchscreen and the fastest mix cycle we make.",
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
  },
  {
    id: "compact",
    name: "RepUp Compact 7",
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
  },
];
