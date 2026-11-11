import { DRINKS } from "./drinks";

export type DrinkId = (typeof DRINKS)[number]["id"];

/** Narrows an untrusted ?drink= search value to a known drink id. */
export function parseDrinkParam(value: unknown): string | undefined {
  return typeof value === "string" && DRINKS.some((d) => d.id === value) ? value : undefined;
}
