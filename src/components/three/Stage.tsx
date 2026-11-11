import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";

/**
 * Shared lighting rig: local Lightformer IBL (no CDN HDR), a warm key light,
 * a volt rim light and soft contact shadows.
 */
export function Stage({
  shadowY = 0,
  shadowScale = 8,
}: {
  shadowY?: number;
  shadowScale?: number;
}) {
  return (
    <>
      <hemisphereLight args={["#fffbe8", "#1a1a16", 0.45]} />
      <directionalLight position={[4, 6, 5]} intensity={1.6} color="#fff4dc" castShadow />
      <pointLight position={[-4, 3, -2]} intensity={14} distance={12} color="#e6f03c" />
      <Environment resolution={256}>
        <Lightformer
          intensity={2.2}
          position={[0, 5, 2]}
          scale={[10, 4, 1]}
          rotation-x={Math.PI / 2}
        />
        <Lightformer
          intensity={1.4}
          color="#f2f6b0"
          position={[-5, 1.5, 0]}
          rotation-y={Math.PI / 2}
          scale={[12, 1.2, 1]}
        />
        <Lightformer
          intensity={1}
          position={[5, 2, 1]}
          rotation-y={-Math.PI / 2}
          scale={[10, 2, 1]}
        />
      </Environment>
      <ContactShadows
        position={[0, shadowY, 0]}
        opacity={0.6}
        scale={shadowScale}
        blur={2.4}
        far={4}
        resolution={512}
      />
    </>
  );
}

/** Marks the canvas wrapper with data-scene-ready after the first real frame. */
export function ReadySignal() {
  const gl = useThree((s) => s.gl);
  const done = useRef(false);
  useFrame(() => {
    if (done.current) return;
    done.current = true;
    gl.domElement.parentElement?.parentElement?.setAttribute("data-scene-ready", "true");
  });
  return null;
}
