import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";

import type { MachineVariant } from "@/content/machines";

import { ReadySignal, Stage } from "./Stage";
import { VendingMachine } from "./VendingMachine";

export default function MachineScene({
  variant,
  reducedMotion = false,
}: {
  variant: MachineVariant;
  reducedMotion?: boolean;
}) {
  return (
    <Canvas
      shadows="basic"
      dpr={[1, 1.25]}
      camera={{ position: [3.2, 2.6, 7.4], fov: 36 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      aria-label="Interactive 3D machine. Drag to rotate."
    >
      <Suspense fallback={null}>
        <VendingMachine key={variant} variant={variant} position={[0, -2, 0]} />
        <Stage shadowY={-2} shadowScale={8} />
      </Suspense>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={!reducedMotion}
        autoRotateSpeed={0.8}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.9}
        target={[0, 0, 0]}
      />
      <ReadySignal />
    </Canvas>
  );
}
