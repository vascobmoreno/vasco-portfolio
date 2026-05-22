import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';
import BodyModel, { type Zone } from './BodyModel';

interface Props {
  activeZone:     Zone | null;
  showHint:       boolean;
  showLabels?:    boolean;
  onZoneClick:    (z: Zone) => void;
  onZoneHover:    (z: Zone | null) => void;
  onMissedClick:  () => void;
  onAnchorUpdate: (pos: { x: number; y: number } | null) => void;
}

// World-space anchors — model auto-scaled to ~1.9 units, centered at origin
const ZONE_ANCHORS: Record<Zone, [number, number, number]> = {
  skills:     [ 0,     0.80,  0.10],  // head
  about:      [ 0,     0.35,  0.10],  // chest
  experience: [-0.20, -0.55,  0.00],  // left side of screen
  education:  [ 0.20, -0.55,  0.00],  // right side of screen
  contact:    [ 0,    -0.60,  0.00],  // (unused body zone, kept for safety)
};


function ZoneProjector({ zone, onUpdate }: {
  zone: Zone | null;
  onUpdate: (pos: { x: number; y: number } | null) => void;
}) {
  const { camera, size } = useThree();
  const reportedZone = useRef<Zone | null>(null);

  useFrame(() => {
    if (reportedZone.current === zone) return;
    reportedZone.current = zone;
    if (!zone) { onUpdate(null); return; }
    const v = new THREE.Vector3(...ZONE_ANCHORS[zone]);
    v.project(camera);
    onUpdate({
      x: (v.x + 1) / 2 * size.width,
      y: (-v.y + 1) / 2 * size.height,
    });
  });

  return null;
}

export default function HumanScene({ activeZone, showHint, showLabels = true, onZoneClick, onZoneHover, onMissedClick, onAnchorUpdate }: Props) {
  return (
    <Canvas
      camera={{ position: [0.5, 0, 3.5], fov: 46 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      dpr={[1, 1.5]}
      performance={{ min: 0.5 }}
      style={{ background: 'transparent' }}
      onPointerMissed={onMissedClick}
    >
      <ambientLight intensity={0.15} color="#002222" />
      <directionalLight position={[4, 6, 4]} intensity={0.9} color="#ffffff" />
      <pointLight position={[2, 2, 2]} intensity={0.7} color="#00ffcc" />
      <pointLight position={[-2, 1, 1.5]} intensity={0.5} color="#00ccff" />
      <pointLight position={[0, -1, 2]} intensity={0.3} color="#004444" />

<Suspense fallback={null}>
        <BodyModel
          activeZone={activeZone}
          onZoneClick={onZoneClick}
          onZoneHover={onZoneHover}
          showLabels={showLabels}
        />
        <ZoneProjector zone={activeZone} onUpdate={onAnchorUpdate} />

        {/* Arrow key hint anchored below model feet — desktop only */}
        {showHint && <Html position={[0, -1.18, 0]} center>
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
            pointerEvents: 'none', userSelect: 'none',
          }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['←', '→'].map(arrow => (
                <div key={arrow} style={{
                  width: '30px', height: '30px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1px solid rgba(0,255,204,0.2)',
                  borderRadius: '3px',
                  fontFamily: 'monospace', fontSize: '14px',
                  color: 'rgba(0,255,204,0.35)',
                  background: 'rgba(0,255,204,0.03)',
                }}>
                  {arrow}
                </div>
              ))}
            </div>
            <span style={{
              fontFamily: 'monospace', fontSize: '9px',
              letterSpacing: '0.3em', textTransform: 'uppercase',
              color: 'rgba(0,255,204,0.2)',
            }}>rotate</span>
          </div>
        </Html>}
      </Suspense>

      <OrbitControls
        enableRotate={false}
        enableZoom={false}
        enablePan={false}
        makeDefault
      />
    </Canvas>
  );
}
