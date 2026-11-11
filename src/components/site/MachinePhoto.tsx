import { motion } from "motion/react";
import { useState, type PointerEvent } from "react";

import shakerTouch from "@/assets/vendofit-shaker-touch.jpg";
import gs805 from "@/assets/vendofit-gs805.jpg";
import type { MachineVariant } from "@/content/machines";
import { cn } from "@/lib/utils";

type MachinePhotoProps = {
  variant: MachineVariant;
  className?: string;
};

const photos = {
  front: shakerTouch,
  side: gs805,
} as const;

export function MachinePhoto({ variant, className }: MachinePhotoProps) {
  const [view, setView] = useState<keyof typeof photos>("front");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    setTilt({
      x: ((event.clientY - bounds.top) / bounds.height - 0.5) * -5,
      y: ((event.clientX - bounds.left) / bounds.width - 0.5) * 7,
    });
  }

  return (
    <div
      className={cn("relative h-full w-full overflow-hidden rounded-[inherit]", className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <motion.img
        key={`${variant}-${view}`}
        src={photos[view]}
        alt={`${variant} Vendofit machine in a fitness facility`}
        className="absolute inset-0 h-full w-full object-contain p-3 sm:p-5"
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1, rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        style={{ transformPerspective: 1000 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/75 via-transparent to-transparent" />
      <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 sm:inset-x-5 sm:bottom-5">
        <span className="rounded-full border border-border bg-background/75 px-3 py-2 text-[0.65rem] font-bold uppercase tracking-widest backdrop-blur">
          Vendofit photo
        </span>
        <div className="flex gap-2" role="group" aria-label="Machine photo view">
          {(Object.keys(photos) as Array<keyof typeof photos>).map((photoView) => (
            <button
              key={photoView}
              type="button"
              onClick={() => setView(photoView)}
              className={cn(
                "rounded-full border px-3 py-2 text-[0.65rem] font-bold uppercase tracking-widest transition-colors",
                view === photoView
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background/75 backdrop-blur hover:border-foreground/50",
              )}
            >
              {photoView}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
