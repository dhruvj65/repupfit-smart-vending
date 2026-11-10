import { Asterisk } from "lucide-react";

/** Infinite horizontal ticker. Items are duplicated so the loop is seamless. */
export function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-border bg-primary py-5 text-primary-foreground">
      <div className="flex w-max animate-marquee items-center gap-10">
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 font-display text-xl font-bold uppercase tracking-tight md:text-2xl"
            aria-hidden={i >= items.length}
          >
            {item}
            <Asterisk className="size-6" strokeWidth={3} />
          </span>
        ))}
      </div>
    </div>
  );
}
