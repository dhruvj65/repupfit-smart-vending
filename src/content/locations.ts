export type Location = {
  id: string;
  venue: string;
  type: "Gym" | "Mall" | "Studio";
  address: string;
  city: string;
  hours: string;
};

/** PLACEHOLDER venues — replace with the real installed machine list. */
export const LOCATIONS: Location[] = [
  { id: "ironworks", venue: "Ironworks Athletic Club", type: "Gym", address: "12 Harbour Street", city: "Riverside", hours: "06:00 – 23:00" },
  { id: "pulse", venue: "Pulse Fitness Central", type: "Gym", address: "88 Market Avenue", city: "Riverside", hours: "Open 24/7" },
  { id: "northgate", venue: "Northgate Shopping Centre", type: "Mall", address: "1 Northgate Plaza", city: "Riverside", hours: "09:00 – 21:00" },
  { id: "forge", venue: "The Forge Strength Lab", type: "Gym", address: "4 Mill Lane", city: "Eastbrook", hours: "05:30 – 22:00" },
  { id: "flow", venue: "Flow Pilates & Ride", type: "Studio", address: "27 Linden Road", city: "Eastbrook", hours: "07:00 – 21:00" },
  { id: "summit", venue: "Summit Climbing Hall", type: "Gym", address: "300 Quarry Way", city: "Westfield", hours: "10:00 – 23:00" },
  { id: "galleria", venue: "Westfield Galleria", type: "Mall", address: "50 Central Boulevard", city: "Westfield", hours: "10:00 – 22:00" },
  { id: "corepower", venue: "CorePower Arena", type: "Gym", address: "9 Stadium Drive", city: "Westfield", hours: "06:00 – 22:00" },
];

export const CITIES = Array.from(new Set(LOCATIONS.map((l) => l.city)));

export function filterLocations(list: Location[], city: string | null, type: Location["type"] | null) {
  return list.filter((l) => (!city || l.city === city) && (!type || l.type === type));
}

export function directionsUrl(l: Location) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${l.venue} ${l.address} ${l.city}`)}`;
}
