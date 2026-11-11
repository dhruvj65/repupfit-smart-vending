import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { FlavourScene } from "@/components/three/LazyScenes";
import { Button } from "@/components/ui/button";
import { DRINKS, TOTAL_FLAVOURS, parseDrinkParam } from "@/content/drinks";
import { cn } from "@/lib/utils";

type FlavoursSearch = { drink?: string };

export const Route = createFileRoute("/flavours")({
  validateSearch: (search: Record<string, unknown>): FlavoursSearch => {
    const drink = parseDrinkParam(search.drink);
    return drink ? { drink } : {};
  },
  head: () => ({
    meta: [
      { title: "Flavours — RepUpFit protein, collagen, BCAA & isotonic drinks" },
      {
        name: "description",
        content: `Explore ${TOTAL_FLAVOURS} flavours across whey, plant protein, collagen, BCAA and isotonic drinks — freshly mixed at every RepUpFit kiosk.`,
      },
      { property: "og:title", content: "RepUpFit flavours — find your post-workout favourite" },
      {
        property: "og:description",
        content: "Five drink types and a flavour for every session. Spin the shake in 3D.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FlavoursPage,
});

function FlavoursPage() {
  const { drink } = Route.useSearch();
  const navigate = Route.useNavigate();
  const active = DRINKS.find((d) => d.id === drink) ?? DRINKS[0]!;
  const [flavourIndex, setFlavourIndex] = useState(0);
  const flavour = active.flavours[Math.min(flavourIndex, active.flavours.length - 1)]!;

  const selectDrink = (id: string) => {
    setFlavourIndex(0);
    void navigate({ search: { drink: id }, replace: true, resetScroll: false });
  };

  return (
    <>
      <PageHero eyebrow={`${TOTAL_FLAVOURS} flavours`} title="Pick your flavour">
        Five drink types, one perfect mix. Choose a drink, pick a flavour and spin the shake — it's exactly what
        comes out of the machine.
      </PageHero>

      <section className="container mx-auto px-5 py-16 md:px-8 md:py-24">
        <div role="tablist" aria-label="Drink type" className="flex flex-wrap gap-2">
          {DRINKS.map((d) => (
            <button
              key={d.id}
              type="button"
              role="tab"
              aria-selected={d.id === active.id}
              onClick={() => selectDrink(d.id)}
              className={cn(
                "relative rounded-full border px-5 py-2.5 text-sm font-bold uppercase tracking-wider transition-colors",
                d.id === active.id
                  ? "border-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground",
              )}
            >
              {d.id === active.id && (
                <motion.span
                  layoutId="drink-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              {d.name}
            </button>
          ))}
        </div>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-border bg-surface">
            <div className="pointer-events-none absolute inset-0 bg-spotlight" />
            <FlavourScene color={flavour.color} className="absolute inset-0" />
            <div className="pointer-events-none absolute bottom-5 left-5 rounded-full border border-border bg-background/70 px-4 py-2 text-xs font-bold uppercase tracking-widest backdrop-blur">
              Drag to rotate
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
            >
              <p className="eyebrow">{active.protein}</p>
              <h2 className="mt-3 text-4xl font-bold uppercase leading-none md:text-6xl">{active.name}</h2>
              <p className="mt-5 text-lg text-muted-foreground">{active.description}</p>

              <p className="eyebrow mt-10">Flavours</p>
              <div className="mt-4 flex flex-wrap gap-2" role="radiogroup" aria-label={`${active.name} flavours`}>
                {active.flavours.map((f, i) => {
                  const selected = f.name === flavour.name;
                  return (
                    <button
                      key={f.name}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setFlavourIndex(i)}
                      className={cn(
                        "flex items-center gap-3 rounded-full border py-2 pl-2 pr-4 text-sm font-semibold transition-all",
                        selected ? "border-primary bg-secondary" : "border-border hover:border-foreground/40",
                      )}
                    >
                      <span className="size-7 rounded-full border border-foreground/20" style={{ backgroundColor: f.color }} />
                      {f.name}
                    </button>
                  );
                })}
              </div>

              <ul className="mt-10 grid gap-3 sm:grid-cols-2">
                {active.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="container mx-auto px-5 py-20 md:px-8 md:py-28">
          <SectionHeading label="Full menu" title="Every flavour, at a glance" />
          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {DRINKS.map((d, i) => (
              <Reveal key={d.id} delay={i * 0.05} className="bg-background p-8">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-xl font-bold uppercase">{d.name}</h3>
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{d.protein}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{d.short}</p>
                <ul className="mt-6 space-y-2">
                  {d.flavours.map((f) => (
                    <li key={f.name} className="flex items-center gap-3 text-sm font-semibold">
                      <span className="size-3 rounded-full" style={{ backgroundColor: f.color }} />
                      {f.name}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => {
                    selectDrink(d.id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary"
                >
                  Preview in 3D <ArrowRight className="size-4" />
                </button>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14 flex flex-col items-start justify-between gap-6 rounded-3xl border border-border bg-card p-8 md:flex-row md:items-center md:p-10">
            <div>
              <h3 className="text-2xl font-bold uppercase">Mixed fresh in every machine</h3>
              <p className="mt-2 text-muted-foreground">Filtered, chilled water and certified brands — ready in about 40 seconds.</p>
            </div>
            <Button asChild variant="volt" size="xl">
              <Link to="/machines">
                Meet the machines <ArrowRight />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
