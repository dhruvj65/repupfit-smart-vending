import { Float, PresentationControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";

import { ReadySignal, Stage } from "./Stage";
import { ShakeCup } from "./ShakeCup";

function SpinningCup({ color, reducedMotion }: { color: string; reducedMotion: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current && !reducedMotion) ref.current.rotation.y += Math.min(delta, 0.05) * 0.5;
  });
  return (
    <group ref={ref}>
      <ShakeCup color={color} position={[0, -0.7, 0]} scale={1.5} />
    </group>
  );
}

export default function FlavourScene({
  color,
  reducedMotion = false,
}: {
  color: string;
  reducedMotion?: boolean;
}) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.6, 5.2], fov: 35 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      aria-label="3D shake cup preview. Drag to rotate."
    >
      <Suspense fallback={null}>
        <PresentationControls
          global={false}
          snap
          polar={[-0.2, 0.3]}
          azimuth={[-Infinity, Infinity]}
        >
          <Float speed={reducedMotion ? 0 : 1.4} floatIntensity={0.5} rotationIntensity={0.2}>
            <SpinningCup color={color} reducedMotion={reducedMotion} />
          </Float>
        </PresentationControls>
        <Stage shadowY={-0.75} shadowScale={5} />
        <mesh position={[0, 0.2, -1.4]}>
          <circleGeometry args={[1.6, 64]} />
          <meshBasicMaterial color={color} transparent opacity={0.18} />
        </mesh>
      </Suspense>
      <ReadySignal />
    </Canvas>
  );
}
