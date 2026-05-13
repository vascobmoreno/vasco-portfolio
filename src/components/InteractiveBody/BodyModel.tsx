import { useRef, useState, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export type Zone = 'skills' | 'about' | 'experience' | 'education' | 'contact';
type BodyZone = 'head' | 'chest' | 'right_leg' | 'left_leg';

interface Props {
  activeZone:  Zone | null;
  onZoneClick: (z: Zone) => void;
  onZoneHover: (z: Zone | null) => void;
}

const MODEL = '/model.glb';

const BODY_ZONE_IDX: Record<BodyZone, number> = {
  head: 0, chest: 1, right_leg: 2, left_leg: 3,
};

const PANEL_ZONE_IDX: Record<Zone, number> = {
  skills: 0, about: 1, experience: 2, education: 3, contact: 4,
};

const BODY_TO_ZONE: Record<BodyZone, Zone> = {
  head: 'skills',      chest: 'about',
  right_leg: 'experience', left_leg: 'education',
};

function classifyBody(nx: number, ny: number): BodyZone | null {
  if (ny > 0.68) return 'head';
  if (ny < -0.15) return nx >= 0 ? 'left_leg' : 'right_leg';
  return 'chest';
}

// Classifies each fragment in model-local space so zone boundaries stay
// fixed to the body regardless of how the model is rotated.
const VERT = `
uniform mat4 uModelInv;
varying vec3 vLocalPos;
void main() {
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vLocalPos = (uModelInv * wp).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const OUTLINE_VERT = `
uniform mat4 uModelInv;
varying float vLocalY;
void main() {
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vLocalY = (uModelInv * wp).y;
  vec3 pos = position + normal * 0.014;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const OUTLINE_FRAG = `
uniform float uHm;
uniform float uTime;
varying float vLocalY;
void main() {
  float ny   = vLocalY / uHm;
  float wave = sin(ny * 3.0 - uTime * 1.6) * 0.5 + 0.5;
  float alpha = 0.04 + wave * 0.42;
  vec3 white = vec3(0.90, 0.97, 0.97);
  vec3 teal  = vec3(0.0,  0.95, 0.80);
  vec3 col   = mix(white, teal, wave * 0.45);
  gl_FragColor = vec4(col, alpha);
}
`;

const FRAG = `
uniform float uHm;
uniform float uHovered;
uniform float uActive;
uniform float uWire;
uniform float uTime;
varying vec3 vLocalPos;

float bodyZone(float nx, float ny) {
  if (ny >  0.68) return 0.0;
  if (ny < -0.15) return nx >= 0.0 ? 3.0 : 2.0;
  return 1.0;
}

float toPanel(float bz) {
  if (bz < 0.5) return 0.0;
  if (bz < 1.5) return 1.0;
  if (bz < 2.5) return 2.0;
  return 3.0;
}

void main() {
  float nx = vLocalPos.x / uHm;
  float ny = vLocalPos.y / uHm;

  vec3  base    = vec3(0.024, 0.102, 0.094);
  vec3  idleCol = vec3(0.0,   0.62,  0.55 );
  vec3  litCol  = vec3(0.0,   0.95,  0.82 );

  float bz = bodyZone(nx, ny);
  float pz = toPanel(bz);

  bool anyLit    = uHovered > -0.5 || uActive > -0.5;
  bool isActive  = abs(uActive  - pz) < 0.5;
  bool isHovered = abs(uHovered - bz) < 0.5;

  // Traveling gradient wave for idle state — signals interactivity
  float wave = sin(ny * 2.8 - uTime * 1.1) * 0.5 + 0.5;

  vec3  col;
  float em, alpha;

  if      (isActive)  { col = litCol;  em = 0.50; alpha = 0.62; }
  else if (isHovered) { col = litCol;  em = 0.38; alpha = 0.58; }
  else if (anyLit)    { col = idleCol; em = 0.06; alpha = 0.18; }
  else                { col = idleCol; em = 0.15 + wave * 0.28; alpha = 0.40 + wave * 0.18; }

  if (uWire > 0.5) {
    vec3  wCol   = (isActive || isHovered) ? litCol : idleCol;
    float wAlpha = isActive ? 0.22 : isHovered ? 0.16 : (anyLit ? 0.03 : 0.04 + wave * 0.08);
    gl_FragColor = vec4(wCol, wAlpha);
  } else {
    gl_FragColor = vec4(base + col * em, alpha);
  }
}
`;

function makeUniforms(halfMax: number, wire: boolean, modelInv: THREE.Matrix4, time: { value: number }) {
  return {
    uHm:       { value: halfMax },
    uHovered:  { value: -1.0 },
    uActive:   { value: -1.0 },
    uWire:     { value: wire ? 1.0 : 0.0 },
    uModelInv: { value: modelInv },
    uTime:     time,
  };
}

export default function BodyModel({ activeZone, onZoneClick, onZoneHover }: Props) {
  const { scene } = useGLTF(MODEL);
  const modelRef       = useRef<THREE.Group>(null);
  const modelInvRef    = useRef(new THREE.Matrix4());
  const sharedTime     = useRef<{ value: number }>({ value: 0.0 });
  const keysRef        = useRef({ left: false, right: false });
  const activeZoneRef  = useRef<Zone | null>(null);
  activeZoneRef.current = activeZone;
  const [hoveredBodyZone, setHoveredBodyZone] = useState<BodyZone | null>(null);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  { e.preventDefault(); keysRef.current.left  = true; }
      if (e.key === 'ArrowRight') { e.preventDefault(); keysRef.current.right = true; }
    };
    const up = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  keysRef.current.left  = false;
      if (e.key === 'ArrowRight') keysRef.current.right = false;
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup',   up);
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); };
  }, []);

  const { scale, center, halfMax } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const sz  = box.getSize(new THREE.Vector3());
    const max = Math.max(sz.x, sz.y, sz.z);
    return {
      scale:   1.9 / max,
      center:  box.getCenter(new THREE.Vector3()).negate(),
      halfMax: max / 2,
    };
  }, [scene]);

  const outlineScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse(n => {
      const m = n as THREE.Mesh;
      if (!m.isMesh) return;
      m.material = new THREE.ShaderMaterial({
        vertexShader: OUTLINE_VERT, fragmentShader: OUTLINE_FRAG,
        uniforms: {
          uModelInv: { value: modelInvRef.current },
          uHm:       { value: halfMax },
          uTime:     sharedTime.current,
        },
        side: THREE.BackSide, transparent: true, depthWrite: false,
      });
    });
    return clone;
  }, [scene]); // eslint-disable-line react-hooks/exhaustive-deps

  const solidScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse(n => {
      const m = n as THREE.Mesh;
      if (!m.isMesh) return;
      m.material = new THREE.ShaderMaterial({
        vertexShader: VERT, fragmentShader: FRAG,
        uniforms:    makeUniforms(halfMax, false, modelInvRef.current, sharedTime.current),
        transparent: true, side: THREE.DoubleSide, depthWrite: false,
      });
    });
    return clone;
  }, [scene]); // eslint-disable-line react-hooks/exhaustive-deps

  const wireScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse(n => {
      const m = n as THREE.Mesh;
      if (!m.isMesh) return;
      m.material = new THREE.ShaderMaterial({
        vertexShader: VERT, fragmentShader: FRAG,
        uniforms:    makeUniforms(halfMax, true, modelInvRef.current, sharedTime.current),
        transparent: true, wireframe: true, depthWrite: false,
      });
    });
    return clone;
  }, [scene]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const hi = hoveredBodyZone !== null ? BODY_ZONE_IDX[hoveredBodyZone] : -1.0;
    const ai = activeZone      !== null ? PANEL_ZONE_IDX[activeZone]     : -1.0;

    outlineScene.visible = hoveredBodyZone === null && activeZone === null;

    [solidScene, wireScene].forEach(s =>
      s.traverse(n => {
        const m = n as THREE.Mesh;
        if (!m.isMesh) return;
        const mat = m.material as THREE.ShaderMaterial;
        mat.uniforms.uHovered.value = hi;
        mat.uniforms.uActive.value  = ai;
      })
    );
  }, [hoveredBodyZone, activeZone, solidScene, wireScene, outlineScene]);

  useFrame((state, delta) => {
    if (!modelRef.current) return;
    sharedTime.current.value = state.clock.elapsedTime;
    const breath = 1 + Math.sin(state.clock.elapsedTime * 1.2) * 0.005;
    modelRef.current.scale.setScalar(breath * scale);
    if (!activeZoneRef.current) {
      const { left, right } = keysRef.current;
      if (left)                  modelRef.current.rotation.y -= delta * 1.8;
      else if (right)            modelRef.current.rotation.y += delta * 1.8;
      else if (!hoveredBodyZone) modelRef.current.rotation.y += delta * 0.20;
    }
    modelRef.current.updateWorldMatrix(true, false);
    modelInvRef.current.copy(modelRef.current.matrixWorld).invert();
  });

  type Ev = { point: THREE.Vector3; stopPropagation: () => void };

  const getBodyZone = (e: Ev): BodyZone | null => {
    if (!modelRef.current) return null;
    const local = modelRef.current.worldToLocal(e.point.clone());
    return classifyBody(local.x / halfMax, local.y / halfMax);
  };

  return (
    <group
      ref={modelRef}
      onPointerMove={(e: Ev) => {
        e.stopPropagation();
        const bz = getBodyZone(e);
        if (bz !== hoveredBodyZone) {
          setHoveredBodyZone(bz);
          onZoneHover(bz ? BODY_TO_ZONE[bz] : null);
        }
        document.body.style.cursor = bz ? 'pointer' : 'auto';
      }}
      onPointerOut={() => {
        setHoveredBodyZone(null);
        onZoneHover(null);
        document.body.style.cursor = 'auto';
      }}
      onClick={(e: Ev) => {
        e.stopPropagation();
        const bz = getBodyZone(e);
        if (bz) onZoneClick(BODY_TO_ZONE[bz]);
      }}
    >
      <group position={[center.x, center.y, center.z]}>
        <primitive object={outlineScene} />
        <primitive object={solidScene} />
        <primitive object={wireScene} />
      </group>
    </group>
  );
}

useGLTF.preload(MODEL);
