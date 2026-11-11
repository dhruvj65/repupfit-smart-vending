import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { NAV_LINKS } from "@/content/site";
import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
const matches = (path: string) => router.matchRoutes(path).at(-1)?.routeId;

describe("App routing", () => {
  it.each(["/", "/flavours", "/machines", "/partners", "/faq"])("has a page for %s", (path) => {
    expect(matches(path)).not.toBe(rootRouteId);
  });

  it("every menu link points to a real page", () => {
    for (const link of NAV_LINKS) expect(matches(link.to)).not.toBe(rootRouteId);
  });

  it("no longer has a Locations page", () => {
    expect(NAV_LINKS.some((l) => (l.to as string) === "/locations")).toBe(false);
  });
});
