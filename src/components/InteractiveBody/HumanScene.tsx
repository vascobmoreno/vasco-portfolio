import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { Suspense, useRef, useState } from 'react';
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

const ZONE_LABEL_DATA: { zone: Zone; pos: [number, number, number]; color: string; align: 'left' | 'right'; label: string }[] = [
  { zone: 'skills',     pos: [ 0.52,  0.80, 0], color: '#00ffcc', align: 'left',  label: 'SKILLS'     },
  { zone: 'about',      pos: [-0.52,  0.36, 0], color: '#00ffcc', align: 'right', label: 'ABOUT ME'   },
  { zone: 'experience', pos: [-0.52, -0.55, 0], color: '#00ffcc', align: 'right', label: 'EXPERIENCE' },
  { zone: 'education',  pos: [ 0.52, -0.55, 0], color: '#00ffcc', align: 'left',  label: 'EDUCATION'  },
];

function ZoneLabels({ activeZone, hoveredZone, onZoneClick }: {
  activeZone: Zone | null;
  hoveredZone: Zone | null;
  onZoneClick: (z: Zone) => void;
}) {
  return (
    <>
      {ZONE_LABEL_DATA.map(({ zone, pos, color, align, label }) => {
        const isActive  = activeZone  === zone;
        const isHovered = hoveredZone === zone;
        const visible   = isActive || isHovered;
        return (
          <Html key={zone} position={pos} center>
            <div
              onClick={() => onZoneClick(zone)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                flexDirection: align === 'left' ? 'row' : 'row-reverse',
                cursor: 'pointer',
                userSelect: 'none',
                whiteSpace: 'nowrap',
                opacity: visible ? 1 : 0,
                pointerEvents: visible ? 'auto' : 'none',
                transition: 'opacity 0.2s',
              }}
            >
              <div style={{
                width: isHovered ? '22px' : '16px',
                height: '1px',
                background: color,
                boxShadow: `0 0 6px ${color}`,
                transition: 'width 0.2s',
              }} />
              <div style={{
                fontFamily: 'monospace',
                fontSize: '9px',
                letterSpacing: '0.2em',
                color,
                padding: '2px 7px',
                border: `1px solid ${color}${isActive ? 'aa' : '66'}`,
                borderRadius: '2px',
                background: 'rgba(0,10,8,0.92)',
                boxShadow: isActive
                  ? `0 0 12px ${color}55, inset 0 0 8px ${color}22`
                  : `0 0 7px ${color}33`,
                transform: isHovered && !isActive ? 'scale(1.06)' : 'scale(1)',
                transition: 'all 0.2s',
              }}>
                {label}
              </div>
            </div>
          </Html>
        );
      })}
    </>
  );
}

const ZONE_PULSE_DATA: { zone: Zone; pos: [number, number, number]; delay: number }[] = [
  { zone: 'skills',     pos: [ 0,     0.80, 0.12], delay: 0    },
  { zone: 'about',      pos: [ 0,     0.35, 0.12], delay: 0.55 },
  { zone: 'experience', pos: [-0.18, -0.55, 0.10], delay: 1.1  },
  { zone: 'education',  pos: [ 0.18, -0.55, 0.10], delay: 1.65 },
];

function ZonePulseHints({ activeZone, hoveredZone }: { activeZone: Zone | null; hoveredZone: Zone | null }) {
  const idle = activeZone === null && hoveredZone === null;
  return (
    <>
      {ZONE_PULSE_DATA.map(({ zone, pos, delay }) => (
        <Html key={zone} position={pos} center>
          <div style={{
            position: 'relative', width: 0, height: 0,
            opacity: idle ? 1 : 0,
            transition: 'opacity 0.3s',
            pointerEvents: 'none',
          }}>
            {/* solid centre dot */}
            <div style={{
              position: 'absolute',
              width: '6px', height: '6px',
              borderRadius: '50%',
              background: '#00ffcc',
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 8px #00ffcc99',
            }} />
            {/* first ring */}
            <div className="zone-ring" style={{ animationDelay: `${delay}s` }} />
            {/* second ring, offset by half period */}
            <div className="zone-ring zone-ring-2" style={{ animationDelay: `${delay + 1.1}s` }} />
          </div>
        </Html>
      ))}
    </>
  );
}

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
  const [hoveredZone, setHoveredZone] = useState<Zone | null>(null);

  const handleZoneHover = (z: Zone | null) => { setHoveredZone(z); onZoneHover(z); };

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
          onZoneHover={handleZoneHover}
        />
        {showLabels && <ZoneLabels activeZone={activeZone} hoveredZone={hoveredZone} onZoneClick={onZoneClick} />}
        <ZonePulseHints activeZone={activeZone} hoveredZone={hoveredZone} />
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
