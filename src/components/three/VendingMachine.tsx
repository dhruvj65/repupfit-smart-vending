import { RoundedBox } from "@react-three/drei";
import { useFrame, type ThreeElements } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import type { MachineVariant } from "@/content/machines";

import { ShakeCup } from "./ShakeCup";
import {
  createBrushedTexture,
  createGrilleTexture,
  createHeaderTexture,
  createScreenTexture,
} from "./textures";

const VOLT = "#e6f03c";

/** Physical proportions per model, in scene units (~1 unit = 0.5 m). */
const DIMENSIONS: Record<MachineVariant, { w: number; h: number; d: number; screen: [number, number] }> = {
  pro: { w: 1.6, h: 3.9, d: 1.4, screen: [1.25, 1.34] },
  compact: { w: 1.25, h: 3.6, d: 1.35, screen: [0.98, 1.05] },
};

type Props = ThreeElements["group"] & {
  variant?: MachineVariant;
  cupColor?: string;
};

/** Procedural RepUpFit kiosk: brushed body, glowing touchscreen, dispenser bay with a cup. */
export function VendingMachine({ variant = "pro", cupColor = "#6b3e26", ...groupProps }: Props) {
  const { w, h, d, screen } = DIMENSIONS[variant];
  const front = d / 2;
  const cupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.MeshStandardMaterial>(null);

  const textures = useMemo(
    () => ({
      screen: createScreenTexture(),
      header: createHeaderTexture(),
      body: createBrushedTexture(),
      grille: createGrilleTexture(),
    }),
    [],
  );

  useEffect(() => () => Object.values(textures).forEach((t) => t.dispose()), [textures]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (cupRef.current) cupRef.current.rotation.y = t * 0.6;
    if (glowRef.current) glowRef.current.emissiveIntensity = 1.6 + Math.sin(t * 2.2) * 0.5;
  });

  const screenY = h * 0.66;
  const bayY = h * 0.3;

  return (
    <group {...groupProps}>
      {/* body */}
      <RoundedBox args={[w, h, d]} radius={0.07} smoothness={4} position={[0, h / 2 + 0.08, 0]} castShadow receiveShadow>
        <meshStandardMaterial map={textures.body} color="#3a3b37" metalness={0.55} roughness={0.42} />
      </RoundedBox>

      {/* header sign */}
      <mesh position={[0, h - 0.12, front + 0.006]}>
        <planeGeometry args={[w * 0.86, w * 0.86 * 0.1875]} />
        <meshBasicMaterial map={textures.header} toneMapped={false} />
      </mesh>

      {/* screen bezel + screen */}
      <RoundedBox args={[screen[0] + 0.1, screen[1] + 0.1, 0.05]} radius={0.03} position={[0, screenY, front + 0.01]}>
        <meshStandardMaterial color="#0b0b0a" roughness={0.2} metalness={0.3} />
      </RoundedBox>
      <mesh position={[0, screenY, front + 0.04]}>
        <planeGeometry args={screen} />
        <meshBasicMaterial map={textures.screen} toneMapped={false} />
      </mesh>

      {/* card reader */}
      <group position={[w * 0.3, screenY - screen[1] / 2 - 0.22, front + 0.03]}>
        <RoundedBox args={[0.28, 0.2, 0.06]} radius={0.02}>
          <meshStandardMaterial color="#111110" roughness={0.3} />
        </RoundedBox>
        <mesh position={[0, 0, 0.032]}>
          <circleGeometry args={[0.04, 24]} />
          <meshStandardMaterial ref={glowRef} color={VOLT} emissive={VOLT} emissiveIntensity={1.6} toneMapped={false} />
        </mesh>
      </group>

      {/* dispenser bay */}
      <RoundedBox args={[w * 0.58, 0.95, 0.06]} radius={0.04} position={[0, bayY, front + 0.0]}>
        <meshStandardMaterial color="#070707" roughness={0.6} />
      </RoundedBox>
      <mesh position={[0, bayY + 0.43, front + 0.035]}>
        <boxGeometry args={[w * 0.5, 0.025, 0.02]} />
        <meshStandardMaterial color={VOLT} emissive={VOLT} emissiveIntensity={2.2} toneMapped={false} />
      </mesh>
      <pointLight position={[0, bayY + 0.25, front + 0.25]} intensity={1.6} distance={1.4} color="#fff6c8" />
      <mesh position={[0, bayY - 0.44, front + 0.12]}>
        <boxGeometry args={[w * 0.62, 0.04, 0.26]} />
        <meshStandardMaterial color="#1a1a18" metalness={0.8} roughness={0.25} />
      </mesh>
      <group ref={cupRef} position={[0, bayY - 0.42, front + 0.13]}>
        <ShakeCup color={cupColor} scale={0.5} />
      </group>

      {/* volt side light strips */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * (w / 2 - 0.035), h / 2 + 0.08, front + 0.005]}>
          <boxGeometry args={[0.025, h * 0.9, 0.012]} />
          <meshStandardMaterial color={VOLT} emissive={VOLT} emissiveIntensity={1.8} toneMapped={false} />
        </mesh>
      ))}

      {/* ventilation grille */}
      <mesh position={[0, 0.32, front + 0.006]}>
        <planeGeometry args={[w * 0.7, w * 0.7 * 0.25]} />
        <meshStandardMaterial map={textures.grille} roughness={0.8} />
      </mesh>

      {/* feet */}
      {[
        [-1, -1],
        [1, -1],
        [-1, 1],
        [1, 1],
      ].map(([x, z]) => (
        <mesh key={`${x}${z}`} position={[x * (w / 2 - 0.12), 0.04, z * (d / 2 - 0.12)]}>
          <cylinderGeometry args={[0.06, 0.07, 0.08, 16]} />
          <meshStandardMaterial color="#0a0a0a" />
        </mesh>
      ))}
    </group>
  );
}
