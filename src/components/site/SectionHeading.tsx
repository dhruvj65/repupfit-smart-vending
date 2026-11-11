import { cn } from "@/lib/utils";

import { Reveal, RevealWords } from "./Reveal";

export function SectionHeading({
  index,
  label,
  title,
  description,
  className,
  align = "left",
}: {
  index?: string;
  label: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <Reveal>
        <p
          className="eyebrow mb-5 flex items-center gap-3 data-[align=center]:justify-center"
          data-align={align}
        >
          {index && <span className="text-primary">{index}</span>}
          <span className="h-px w-8 bg-primary" />
          {label}
        </p>
      </Reveal>
      <h2 className="text-balance text-3xl font-bold uppercase leading-[1.02] md:text-5xl">
        <RevealWords text={title} />
      </h2>
      {description && (
        <Reveal delay={0.15}>
          <p className="mt-5 text-pretty text-lg text-muted-foreground">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
