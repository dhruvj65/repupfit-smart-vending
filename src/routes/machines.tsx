import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { PageHero } from "@/components/site/PageHero";
import { MachinePhoto } from "@/components/site/MachinePhoto";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import {
  AFTER_SALES,
  MACHINES,
  getMachine,
  isMachineVariant,
  type MachineVariant,
} from "@/content/machines";
import { cn } from "@/lib/utils";

type MachinesSearch = { model?: MachineVariant };

export const Route = createFileRoute("/machines")({
  validateSearch: (search: Record<string, unknown>): MachinesSearch =>
    isMachineVariant(search["model"]) ? { model: search["model"] } : {},
  head: () => ({
    meta: [
      { title: "Machines — RepUpFit JK91, Pro 8 & Compact 7 smart kiosks" },
      {
        name: "description",
        content:
          "Compare RepUpFit's smart protein shake kiosks: the 32\" JK91 with 9 canisters and auto-cleaning, the Pro 8 and the slim Compact 7. Full specs and real Vendofit machine photos.",
      },
      { property: "og:title", content: "RepUpFit machines — smart protein shake kiosks" },
      {
        property: "og:description",
        content:
          "Three kiosk models, full specs and real Vendofit machine photos with front and side views.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MachinesPage,
});

function MachinesPage() {
  const { model } = Route.useSearch();
  const navigate = Route.useNavigate();
  const machine = getMachine(model ?? MACHINES[0]!.id);

  return (
    <>
      <PageHero eyebrow={`${MACHINES.length} kiosk models`} title="Meet the machines">
        Every RepUpFit kiosk mixes a fresh shake in under a minute. Pick a model, switch between
        real Vendofit views, and see the full specs.
      </PageHero>

      <section className="container mx-auto px-5 py-16 md:px-8 md:py-24">
        <div role="tablist" aria-label="Machine model" className="grid gap-3 sm:grid-cols-3">
          {MACHINES.map((m) => {
            const selected = m.id === machine.id;
            return (
              <button
                key={m.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() =>
                  void navigate({ search: { model: m.id }, replace: true, resetScroll: false })
                }
                className={cn(
                  "group relative overflow-hidden rounded-2xl border p-5 text-left transition-colors",
                  selected
                    ? "border-primary bg-secondary"
                    : "border-border bg-card hover:border-foreground/40",
                )}
              >
                <span
                  className={cn("eyebrow", selected ? "text-primary" : "text-muted-foreground")}
                >
                  {m.tag}
                </span>
                <span className="mt-2 block font-display text-xl font-bold uppercase">
                  {m.name}
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">
                  {m.highlights.join(" · ")}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="relative min-h-[460px] overflow-hidden rounded-[2rem] border border-border bg-surface md:min-h-[620px]">
            <div className="pointer-events-none absolute inset-0 bg-spotlight" />
            <MachinePhoto variant={machine.id} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={machine.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
            >
              <p className="eyebrow">Model {machine.model}</p>
              <h2 className="mt-3 text-4xl font-bold uppercase leading-none md:text-6xl">
                {machine.name}
              </h2>
              <p className="mt-5 text-lg text-muted-foreground">{machine.summary}</p>

              <dl className="mt-8 divide-y divide-border border-y border-border">
                {machine.specs.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-baseline justify-between gap-6 py-3 text-sm"
                  >
                    <dt className="text-muted-foreground">{s.label}</dt>
                    <dd className="text-right font-semibold">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="container mx-auto px-5 py-20 md:px-8 md:py-28">
          <SectionHeading
            label={machine.name}
            title={machine.id === "jk91" ? "Built to run itself" : "What's inside"}
            description={
              machine.id === "jk91"
                ? "Everything the JK91 does automatically, so your staff never has to touch it."
                : `The essentials that make the ${machine.name} work on a busy floor.`
            }
          />
          <div
            key={machine.id}
            className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4"
          >
            {machine.features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 4) * 0.05} className="bg-background p-7">
                <span className="font-display text-sm text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-bold uppercase leading-tight">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-5 py-20 md:px-8 md:py-28">
        <SectionHeading label="Compare" title="Side by side" />
        <Reveal className="mt-12 overflow-x-auto rounded-3xl border border-border">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-surface">
              <tr>
                <th scope="col" className="p-5 font-semibold text-muted-foreground">
                  Model
                </th>
                {MACHINES.map((m) => (
                  <th
                    key={m.id}
                    scope="col"
                    className="p-5 font-display text-base font-bold uppercase"
                  >
                    {m.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {COMPARE_ROWS.map((row) => (
                <tr key={row.label}>
                  <th scope="row" className="p-5 font-semibold text-muted-foreground">
                    {row.label}
                  </th>
                  {MACHINES.map((m) => (
                    <td key={m.id} className="p-5 font-semibold">
                      {row.values[m.id]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-center">
          <Reveal>
            <p className="eyebrow mb-4 flex items-center gap-3">
              <ShieldCheck className="size-4 text-primary" /> After-sales service
            </p>
            <h3 className="text-3xl font-bold uppercase leading-tight md:text-4xl">
              We look after every machine
            </h3>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {AFTER_SALES.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 font-semibold"
                >
                  <Check className="size-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="mt-16 flex flex-col items-start justify-between gap-6 rounded-[2rem] bg-volt-gradient p-10 text-primary-foreground md:flex-row md:items-center md:p-14">
          <div>
            <h3 className="text-3xl font-extrabold uppercase leading-tight md:text-4xl">
              Want one in your venue?
            </h3>
            <p className="mt-2 font-medium opacity-80">
              Tell us about your space and we'll recommend the right model.
            </p>
          </div>
          <Link
            to="/partners"
            className="inline-flex h-14 items-center gap-2 rounded-full bg-primary-foreground px-8 font-bold text-primary transition-transform duration-300 hover:-translate-y-1"
          >
            Become a partner <ArrowRight className="size-5" />
          </Link>
        </Reveal>
      </section>
    </>
  );
}

const COMPARE_ROWS: { label: string; values: Record<MachineVariant, string> }[] = [
  { label: "Screen", values: { jk91: '32"', pro: '21.5"', compact: '15.6"' } },
  { label: "Containers", values: { jk91: "9", pro: "8", compact: "7" } },
  { label: "Width", values: { jk91: "700 mm", pro: "750 mm", compact: "600 mm" } },
  { label: "Height", values: { jk91: "1900 mm", pro: "1940 mm", compact: "1810 mm" } },
  { label: "Auto-clean after each cup", values: { jk91: "Yes", pro: "—", compact: "—" } },
  { label: "Bring your own cup", values: { jk91: "Yes", pro: "—", compact: "—" } },
  { label: "Networking", values: { jk91: "4G + Wi-Fi", pro: "—", compact: "—" } },
];
