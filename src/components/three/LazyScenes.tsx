import { ClientOnly } from "@tanstack/react-router";
import { useReducedMotion } from "motion/react";
import { lazy, Suspense, type ComponentProps, type ReactNode } from "react";

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

function SceneShell({ className, children }: { className?: string | undefined; children: ReactNode }) {
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

export function HeroScene({ className }: { className?: string | undefined }) {
  const reduced = useReducedMotion() ?? false;
  return (
    <SceneShell className={className}>
      <HeroSceneImpl reducedMotion={reduced} />
    </SceneShell>
  );
}

export function FlavourScene({
  className,
  ...props
}: Omit<ComponentProps<typeof FlavourSceneImpl>, "reducedMotion"> & { className?: string | undefined }) {
  const reduced = useReducedMotion() ?? false;
  return (
    <SceneShell className={className}>
      <FlavourSceneImpl {...props} reducedMotion={reduced} />
    </SceneShell>
  );
}

export function MachineScene({
  className,
  ...props
}: Omit<ComponentProps<typeof MachineSceneImpl>, "reducedMotion"> & { className?: string | undefined }) {
  const reduced = useReducedMotion() ?? false;
  return (
    <SceneShell className={className}>
      <MachineSceneImpl {...props} reducedMotion={reduced} />
    </SceneShell>
  );
}
