import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';

/* ── Board shaders ──────────────────────────────────────────────────── */
const BOARD_VERT = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const BOARD_FRAG = `
varying vec2 vUv;
uniform float uTime;
void main() {
  vec2  cell    = floor(vUv * 8.0);
  float checker = mod(cell.x + cell.y, 2.0);
  vec3  dark    = vec3(0.008, 0.048, 0.040);
  vec3  light   = vec3(0.028, 0.108, 0.090);
  vec3  col     = mix(dark, light, checker);

  // grid lines
  vec2  f    = fract(vUv * 8.0);
  float line = max(
    1.0 - smoothstep(0.0, 0.05, f.x),
    1.0 - smoothstep(0.0, 0.05, f.y)
  );
  col = mix(col, vec3(0.0, 0.90, 0.75), line * 0.22);

  // board border
  float bx   = min(vUv.x, 1.0 - vUv.x);
  float bz   = min(vUv.y, 1.0 - vUv.y);
  float edge = 1.0 - smoothstep(0.0, 0.02, min(bx, bz));
  col = mix(col, vec3(0.0, 1.0, 0.80), edge * 0.6);

  // goal row pulse  (vUv.y ≈ 0 = far/goal end after -PI/2 X rotation)
  float goal  = 1.0 - smoothstep(0.0, 0.10, vUv.y);
  float pulse = sin(uTime * 2.6) * 0.4 + 0.6;
  col = mix(col, vec3(0.0, 1.0, 0.80), goal * pulse * 0.55);

  gl_FragColor = vec4(col, 1.0);
}`;

/* ── Board ──────────────────────────────────────────────────────────── */
function Board({ onBoardClick }: { onBoardClick: (pt: THREE.Vector3) => void }) {
  const matRef   = useRef<THREE.ShaderMaterial>(null!);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);
  useFrame(s => { matRef.current.uniforms.uTime.value = s.clock.elapsedTime; });
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
      onPointerDown={e => { e.stopPropagation(); onBoardClick(new THREE.Vector3(e.point.x, 0, e.point.z)); }}
    >
      <planeGeometry args={[8, 8]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={BOARD_VERT}
        fragmentShader={BOARD_FRAG}
        uniforms={uniforms}
      />
    </mesh>
  );
}

/* ── Goal ring ──────────────────────────────────────────────────────── */
function GoalRing() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(s => {
    ref.current.rotation.y = s.clock.elapsedTime * 0.6;
    ref.current.position.y = 0.55 + Math.sin(s.clock.elapsedTime * 1.4) * 0.08;
  });
  return (
    <mesh ref={ref} position={[0.5, 0.55, 3.5]}>
      <torusGeometry args={[0.38, 0.025, 8, 48]} />
      <meshStandardMaterial color="#00ffcc" emissive="#00ffcc" emissiveIntensity={1.2} />
    </mesh>
  );
}

/* ── King mesh (shared geometry) ────────────────────────────────────── */
function KingMesh({ color, emissive, emissiveIntensity = 0.1 }: { color: string; emissive: string; emissiveIntensity?: number }) {
  const { scene } = useGLTF('/chess_king.glb');
  const model = useMemo(() => {
    const clone = scene.clone(true);
    const box   = new THREE.Box3().setFromObject(clone);
    const size  = box.getSize(new THREE.Vector3());
    const s     = 1.1 / Math.max(size.x, size.y, size.z);
    clone.scale.setScalar(s);
    clone.position.y = -box.min.y * s;
    clone.traverse(n => {
      const m = n as THREE.Mesh;
      if (!m.isMesh) return;
      m.material = new THREE.MeshStandardMaterial({
        color, emissive, emissiveIntensity, metalness: 0.3, roughness: 0.4,
      });
      m.castShadow = true;
    });
    return clone;
  }, [scene, color, emissive, emissiveIntensity]);
  return <primitive object={model} />;
}

/* ── Enemy king (stationary) ────────────────────────────────────────── */
function EnemyKing() {
  const ref = useRef<THREE.Group>(null!);
  useFrame(s => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.4) * 0.15 + Math.PI;
  });
  return (
    <group ref={ref} position={[0.5, 0, 3.5]}>
      <Suspense fallback={
        <mesh position={[0, 0.6, 0]}>
          <boxGeometry args={[0.3, 1.2, 0.3]} />
          <meshStandardMaterial color="#cc2200" emissive="#ff3300" emissiveIntensity={0.3} />
        </mesh>
      }>
        <KingMesh color="#3a0a00" emissive="#ff2200" emissiveIntensity={0.35} />
      </Suspense>
      {/* shadow circle */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[0.35, 32]} />
        <meshBasicMaterial color="#ff2200" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

/* ── Target indicator ───────────────────────────────────────────────── */
function TargetIndicator({ targetRef }: { targetRef: React.MutableRefObject<THREE.Vector3 | null> }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(s => {
    if (!ref.current) return;
    const t = targetRef.current;
    if (t) {
      ref.current.visible = true;
      ref.current.position.set(t.x, 0.02, t.z);
      ref.current.rotation.y = s.clock.elapsedTime * 1.5;
      const pulse = 0.7 + Math.sin(s.clock.elapsedTime * 4) * 0.3;
      ref.current.scale.setScalar(pulse);
    } else {
      ref.current.visible = false;
    }
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} visible={false}>
      <ringGeometry args={[0.28, 0.38, 16]} />
      <meshBasicMaterial color="#00ffcc" transparent opacity={0.6} />
    </mesh>
  );
}

const ENEMY_POS = new THREE.Vector3(0.5, 0, 3.5);

/* ── King controller ────────────────────────────────────────────────── */
function KingController({ targetRef, onWin }: { targetRef: React.MutableRefObject<THREE.Vector3 | null>; onWin: () => void }) {
  const groupRef = useRef<THREE.Group>(null!);
  const posRef   = useRef(new THREE.Vector3(0.5, 0, -3.5));
  const wonRef   = useRef(false);

  useFrame((state, delta) => {
    if (!groupRef.current || wonRef.current) return;

    const target = targetRef.current;
    if (target) {
      const dir = new THREE.Vector3().subVectors(target, posRef.current);
      dir.y = 0;
      const dist = dir.length();
      if (dist > 0.08) {
        dir.normalize();
        const speed = Math.min(dist * 3.5, 4.0);
        posRef.current.x = THREE.MathUtils.clamp(posRef.current.x + dir.x * speed * delta, -3.5, 3.5);
        posRef.current.z = THREE.MathUtils.clamp(posRef.current.z + dir.z * speed * delta, -3.5, 3.5);
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y, Math.atan2(dir.x, dir.z), 0.14
        );
      } else {
        targetRef.current = null;
      }
    }

    groupRef.current.position.lerp(posRef.current, 0.15);

    if (posRef.current.distanceTo(ENEMY_POS) < 1.5 && !wonRef.current) {
      wonRef.current = true;
      onWin();
    }

    // 3rd-person camera — closer, more immersive
    const kp  = groupRef.current.position;
    const cam = new THREE.Vector3(kp.x * 0.5, 1.6, kp.z - 2.2);
    state.camera.position.lerp(cam, 0.07);
    state.camera.lookAt(kp.x * 0.6, 0.6, kp.z + 1.5);
  });

  return (
    <group ref={groupRef} position={[0.5, 0, -3.5]}>
      <Suspense fallback={
        <mesh position={[0, 0.6, 0]}>
          <boxGeometry args={[0.3, 1.2, 0.3]} />
          <meshStandardMaterial color="#dff5ef" emissive="#00ffcc" emissiveIntensity={0.2} />
        </mesh>
      }>
        <KingMesh color="#dff5ef" emissive="#00ffcc" emissiveIntensity={0.1} />
      </Suspense>
      {/* shadow circle on board */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[0.35, 32]} />
        <meshBasicMaterial color="#00ffcc" transparent opacity={0.10} />
      </mesh>
    </group>
  );
}

/* ── Scene ──────────────────────────────────────────────────────────── */
export default function ChessScene({ onWin }: { onWin: () => void }) {
  const targetRef = useRef<THREE.Vector3 | null>(null);

  return (
    <Canvas
      camera={{ position: [0.25, 1.6, -5.7], fov: 70 }}
      gl={{ antialias: true, powerPreference: 'low-power' }}
      dpr={[1, 1.5]}
      shadows
      style={{ background: '#020c0a', cursor: 'crosshair' }}
    >
      <fog attach="fog" args={['#020c0a', 9, 22]} />
      <ambientLight intensity={0.10} color="#001a14" />
      <directionalLight position={[3, 8, 2]} intensity={0.65} color="#e0fff8" castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[ 4, 3,  4]} intensity={0.55} color="#00ffcc" />
      <pointLight position={[-4, 3,  4]} intensity={0.55} color="#00ffcc" />
      <pointLight position={[ 0, 2, -5]} intensity={0.30} color="#004433" />
      <pointLight position={[ 0.5, 2, 3.5]} intensity={0.8} color="#ff2200" />
      <Board onBoardClick={pt => { targetRef.current = pt; }} />
      <GoalRing />
      <TargetIndicator targetRef={targetRef} />
      <EnemyKing />
      <KingController targetRef={targetRef} onWin={onWin} />
    </Canvas>
  );
}

useGLTF.preload('/chess_king.glb');
