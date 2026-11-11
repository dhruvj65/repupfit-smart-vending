import { ClientOnly } from "@tanstack/react-router";
import { useReducedMotion } from "motion/react";
import { lazy, Suspense, useEffect, useState, type ComponentProps, type ReactNode } from "react";

import shakerTouch from "@/assets/vendofit-shaker-touch.jpg";
import { cn } from "@/lib/utils";

/*
 * Three.js only runs in the browser. These wrappers keep `three` out of the SSR
 * graph: the scene modules are dynamically imported after hydration.
 */
const HeroSceneImpl = lazy(() => import("./HeroScene"));
const FlavourSceneImpl = lazy(() => import("./FlavourScene"));
const MachineSceneImpl = lazy(() => import("./MachineScene"));

function SceneFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="size-16 animate-pulse-glow rounded-full bg-primary/30 blur-xl" />
    </div>
  );
}

function SceneShell({
  className,
  children,
}: {
  className?: string | undefined;
  children: ReactNode;
}) {
  return (
    <div className={cn("relative h-full w-full", className)}>
      <ClientOnly fallback={<SceneFallback />}>
        <Suspense fallback={<SceneFallback />}>
          <div className="h-full w-full">{children}</div>
        </Suspense>
      </ClientOnly>
    </div>
  );
}

function detectStaticMobileMode() {
  if (typeof window === "undefined") return false;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const narrowScreen = window.matchMedia("(max-width: 768px)").matches;
  const saveData =
    "connection" in navigator &&
    Boolean(
      (
        navigator as Navigator & {
          connection?: { saveData?: boolean };
        }
      ).connection?.saveData,
    );
  const lowPower =
    typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 4;
  return coarsePointer || narrowScreen || saveData || lowPower;
}

function useStaticMobileMode() {
  const [staticMode, setStaticMode] = useState(detectStaticMobileMode);

  useEffect(() => {
    setStaticMode(detectStaticMobileMode());
  }, []);

  return staticMode;
}

export function HeroScene({ className }: { className?: string | undefined }) {
  const reduced = useReducedMotion() ?? false;
  const staticMode = useStaticMobileMode();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const loadScene = () => setReady(true);
    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(loadScene, { timeout: 1800 });
      return () => window.cancelIdleCallback(idleId);
    }
    const timer = window.setTimeout(loadScene, 1200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <SceneShell className={className}>
      {ready && !staticMode ? (
        <HeroSceneImpl reducedMotion={reduced} />
      ) : (
        <div className="relative flex h-full w-full items-center justify-center">
          <img
            src={shakerTouch}
            alt=""
            fetchPriority="high"
            className="w-[min(74vw,560px)] rounded-[1.5rem] border border-white/10 object-contain shadow-2xl"
          />
          <span className="absolute left-[18%] top-[25%] size-2 animate-pulse-glow rounded-full bg-primary" />
          <span className="absolute right-[20%] top-[32%] size-1.5 animate-pulse-glow rounded-full bg-primary" />
          <span className="absolute bottom-[28%] left-[28%] size-1 animate-pulse-glow rounded-full bg-primary" />
        </div>
      )}
    </SceneShell>
  );
}

export function FlavourScene({
  className,
  ...props
}: Omit<ComponentProps<typeof FlavourSceneImpl>, "reducedMotion"> & {
  className?: string | undefined;
}) {
  const reduced = useReducedMotion() ?? false;
  const staticMode = useStaticMobileMode();
  return (
    <SceneShell className={className}>
      {staticMode ? (
        <div
          className="flex h-full w-full items-center justify-center"
          style={{
            background: `radial-gradient(circle, ${props.color}55 0%, transparent 62%)`,
          }}
          aria-label="Flavour product preview"
        >
          <div
            className="size-32 rounded-[2rem] border-4 border-white/60 shadow-2xl sm:size-44"
            style={{ backgroundColor: props.color }}
          />
        </div>
      ) : (
        <FlavourSceneImpl {...props} reducedMotion={reduced} />
      )}
    </SceneShell>
  );
}

export function MachineScene({
  className,
  ...props
}: Omit<ComponentProps<typeof MachineSceneImpl>, "reducedMotion"> & {
  className?: string | undefined;
}) {
  const reduced = useReducedMotion() ?? false;
  const staticMode = useStaticMobileMode();
  return (
    <SceneShell className={className}>
      {!staticMode && <MachineSceneImpl {...props} reducedMotion={reduced} />}
    </SceneShell>
  );
}
