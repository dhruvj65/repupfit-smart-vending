import { Float, Html, Sparkles } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";

import { ReadySignal, Stage } from "./Stage";
import { ShakeCup } from "./ShakeCup";
import shakerTouch from "@/assets/vendofit-shaker-touch.jpg";

const POINTER_FOLLOW = 3;
const SCROLL_TURN = 0.0012;

function Rig({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { viewport, pointer } = useThree();
  const wide = viewport.aspect > 1.1;

  useFrame(({ clock }, delta) => {
    const g = group.current;
    if (!g) return;
    const dt = Math.min(delta, 0.05);
    const t = clock.getElapsedTime();
    const scroll = typeof window !== "undefined" ? window.scrollY : 0;
    const idle = reducedMotion ? 0 : Math.sin(t * 0.4) * 0.12;
    const targetY = -0.45 + idle + pointer.x * 0.35 + scroll * SCROLL_TURN;
    const targetX = pointer.y * -0.06;
    const k = 1 - Math.exp(-POINTER_FOLLOW * dt);
    g.rotation.y += (targetY - g.rotation.y) * k;
    g.rotation.x += (targetX - g.rotation.x) * k;
  });

  return (
    <group position={[wide ? 2.1 : 0, -2.05, 0]} scale={wide ? 1 : 0.82}>
      <group ref={group}>
        <Html center position={[0, 0.2, 0]} style={{ width: "clamp(280px, 42vw, 560px)" }}>
          <img
            src={shakerTouch}
            alt=""
            className="block w-full rounded-[1.5rem] border border-white/10 object-cover shadow-2xl"
          />
        </Html>
      </group>
      {!reducedMotion && (
        <>
          <Float speed={1.6} rotationIntensity={0.8} floatIntensity={1.2}>
            <ShakeCup
              color="#e8667a"
              position={[-1.75, 2.9, 0.6]}
              rotation={[0.2, 0.4, 0.25]}
              scale={0.75}
            />
          </Float>
          <Float speed={1.2} rotationIntensity={0.6} floatIntensity={1}>
            <ShakeCup
              color="#8fd14f"
              position={[1.6, 3.4, -0.4]}
              rotation={[-0.15, 0, -0.3]}
              scale={0.6}
            />
          </Float>
          <Float speed={2} rotationIntensity={1} floatIntensity={1.4}>
            <ShakeCup
              color="#c98a3c"
              position={[-1.3, 0.9, 1.2]}
              rotation={[0.3, 0, 0.5]}
              scale={0.55}
            />
          </Float>
        </>
      )}
      <Stage shadowY={0} shadowScale={9} />
    </group>
  );
}

export default function HeroScene({ reducedMotion = false }: { reducedMotion?: boolean }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.4, 8.5], fov: 38 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      aria-hidden
    >
      <fog attach="fog" args={["#1b1b18", 9, 20]} />
      <Suspense fallback={null}>
        <Rig reducedMotion={reducedMotion} />
        {!reducedMotion && (
          <Sparkles
            count={60}
            scale={[12, 6, 4]}
            size={2.2}
            speed={0.35}
            color="#e6f03c"
            opacity={0.6}
          />
        )}
      </Suspense>
      <ReadySignal />
    </Canvas>
  );
}
