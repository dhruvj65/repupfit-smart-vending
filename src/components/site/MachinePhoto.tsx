import { AnimatePresence, motion } from "motion/react";
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
  const [loadingView, setLoadingView] = useState<keyof typeof photos | null>(null);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    setTilt({
      x: ((event.clientY - bounds.top) / bounds.height - 0.5) * -5,
      y: ((event.clientX - bounds.left) / bounds.width - 0.5) * 7,
    });
  }

  function changeView(nextView: keyof typeof photos) {
    if (nextView === view || loadingView) return;
    setLoadingView(nextView);
    const image = new Image();
    image.onload = () => {
      setView(nextView);
      setLoadingView(null);
    };
    image.onerror = () => setLoadingView(null);
    image.src = photos[nextView];
  }

  return (
    <div
      className={cn("relative h-full w-full overflow-hidden rounded-[inherit]", className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.img
          key={`${variant}-${view}`}
          src={photos[view]}
          alt={`${variant} Vendofit machine in a fitness facility`}
          className="absolute inset-0 h-full w-full object-contain p-3 sm:p-5"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1, rotateX: tilt.x, rotateY: tilt.y }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ transformPerspective: 1000 }}
        />
      </AnimatePresence>
      <AnimatePresence>
        {loadingView && (
          <motion.div
            className="absolute inset-0 z-10 grid place-items-center bg-background/35 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center gap-3 rounded-full border border-border bg-background/85 px-4 py-2 backdrop-blur-xl">
              <img
                src={photos[loadingView]}
                alt=""
                className="size-8 rounded-full object-cover object-center"
              />
              <span className="text-[0.65rem] font-bold uppercase tracking-widest">
                Loading view
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
              onClick={() => changeView(photoView)}
              aria-busy={loadingView === photoView}
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
