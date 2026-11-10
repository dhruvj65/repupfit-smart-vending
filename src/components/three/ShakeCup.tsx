import { useFrame, type ThreeElements } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import { createCupTexture } from "./textures";

const BOTTOM_R = 0.28;
const TOP_R = 0.4;
const HEIGHT = 1.1;
const COLOR_EASE = 6;

const radiusAt = (t: number) => BOTTOM_R + (TOP_R - BOTTOM_R) * t;

type Props = ThreeElements["group"] & {
  /** Flavour band color; changes are eased smoothly. */
  color: string;
};

/** A branded paper shake cup with lid and straw. Pure procedural geometry. */
export function ShakeCup({ color, ...groupProps }: Props) {
  const bandMat = useRef<THREE.MeshStandardMaterial>(null);
  const target = useMemo(() => new THREE.Color(color), [color]);

  const { body, band, paper } = useMemo(() => {
    const bodyPts: THREE.Vector2[] = [];
    for (let i = 0; i <= 12; i++) {
      const t = i / 12;
      bodyPts.push(new THREE.Vector2(radiusAt(t), t * HEIGHT));
    }
    const bandPts: THREE.Vector2[] = [];
    for (let i = 0; i <= 6; i++) {
      const t = 0.18 + (i / 6) * 0.42;
      bandPts.push(new THREE.Vector2(radiusAt(t) + 0.004, t * HEIGHT));
    }
    return {
      body: new THREE.LatheGeometry(bodyPts, 48),
      band: new THREE.LatheGeometry(bandPts, 48),
      paper: createCupTexture(),
    };
  }, []);

  useEffect(
    () => () => {
      body.dispose();
      band.dispose();
      paper.dispose();
    },
    [body, band, paper],
  );

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    bandMat.current?.color.lerp(target, 1 - Math.exp(-COLOR_EASE * dt));
  });

  return (
    <group {...groupProps}>
      <mesh geometry={body} castShadow>
        <meshStandardMaterial map={paper} roughness={0.75} side={THREE.DoubleSide} />
      </mesh>
      <mesh geometry={band}>
        <meshStandardMaterial ref={bandMat} color={color} roughness={0.55} />
      </mesh>
      {/* lid rim */}
      <mesh position={[0, HEIGHT + 0.02, 0]}>
        <cylinderGeometry args={[TOP_R + 0.025, TOP_R + 0.025, 0.06, 48]} />
        <meshPhysicalMaterial color="#f7f6f1" roughness={0.25} transmission={0.2} thickness={0.2} />
      </mesh>
      {/* lid dome */}
      <mesh position={[0, HEIGHT + 0.05, 0]} scale={[1, 0.28, 1]}>
        <sphereGeometry args={[TOP_R - 0.02, 40, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial color="#ffffff" roughness={0.15} transmission={0.5} thickness={0.3} />
      </mesh>
      {/* straw */}
      <mesh position={[0.08, HEIGHT + 0.35, 0]} rotation={[0, 0, -0.18]}>
        <cylinderGeometry args={[0.035, 0.035, 0.8, 16]} />
        <meshStandardMaterial color="#e6f03c" roughness={0.4} />
      </mesh>
    </group>
  );
}
