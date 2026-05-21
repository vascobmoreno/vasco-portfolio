import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';

export type Keys = { up: boolean; down: boolean; left: boolean; right: boolean };

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
function Board() {
  const matRef   = useRef<THREE.ShaderMaterial>(null!);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);
  useFrame(s => { matRef.current.uniforms.uTime.value = s.clock.elapsedTime; });
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
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
    <mesh ref={ref} position={[0, 0.55, 3.6]}>
      <torusGeometry args={[0.38, 0.025, 8, 48]} />
      <meshStandardMaterial color="#00ffcc" emissive="#00ffcc" emissiveIntensity={1.2} />
    </mesh>
  );
}

/* ── King mesh ──────────────────────────────────────────────────────── */
function KingMesh() {
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
        color: '#dff5ef', emissive: '#00ffcc',
        emissiveIntensity: 0.1, metalness: 0.3, roughness: 0.4,
      });
      m.castShadow = true;
    });
    return clone;
  }, [scene]);
  return <primitive object={model} />;
}

/* ── King controller ────────────────────────────────────────────────── */
function KingController({ keysRef, onWin }: { keysRef: React.MutableRefObject<Keys>; onWin: () => void }) {
  const groupRef = useRef<THREE.Group>(null!);
  const posRef   = useRef(new THREE.Vector3(0, 0, -3));
  const wonRef   = useRef(false);

  useFrame((state, delta) => {
    if (!groupRef.current || wonRef.current) return;

    const { up, down, left, right } = keysRef.current;
    const dx = (right ? 1 : 0) - (left ? 1 : 0);
    const dz = (up    ? 1 : 0) - (down ? 1 : 0);

    posRef.current.x = THREE.MathUtils.clamp(posRef.current.x + dx * delta * 3.0, -3.5, 3.5);
    posRef.current.z = THREE.MathUtils.clamp(posRef.current.z + dz * delta * 3.0, -3.5, 3.5);

    if (dx !== 0 || dz !== 0)
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y, Math.atan2(dx, dz), 0.12
      );

    groupRef.current.position.lerp(posRef.current, 0.15);

    if (posRef.current.z >= 3.3 && !wonRef.current) {
      wonRef.current = true;
      onWin();
    }

    // 3rd-person camera follow
    const kp  = groupRef.current.position;
    const cam = new THREE.Vector3(kp.x * 0.3, 3.4, kp.z - 4.8);
    state.camera.position.lerp(cam, 0.055);
    state.camera.lookAt(kp.x * 0.5, 0.5, kp.z + 1.0);
  });

  return (
    <group ref={groupRef}>
      <Suspense fallback={
        <mesh position={[0, 0.6, 0]}>
          <boxGeometry args={[0.3, 1.2, 0.3]} />
          <meshStandardMaterial color="#dff5ef" emissive="#00ffcc" emissiveIntensity={0.2} />
        </mesh>
      }>
        <KingMesh />
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
export default function ChessScene({ keysRef, onWin }: { keysRef: React.MutableRefObject<Keys>; onWin: () => void }) {
  return (
    <Canvas
      camera={{ position: [0, 3.4, -7.8], fov: 48 }}
      gl={{ antialias: true, powerPreference: 'low-power' }}
      dpr={[1, 1.5]}
      shadows
      style={{ background: '#020c0a' }}
    >
      <fog attach="fog" args={['#020c0a', 9, 22]} />
      <ambientLight intensity={0.10} color="#001a14" />
      <directionalLight position={[3, 8, 2]} intensity={0.65} color="#e0fff8" castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[ 4, 3,  4]} intensity={0.55} color="#00ffcc" />
      <pointLight position={[-4, 3,  4]} intensity={0.55} color="#00ffcc" />
      <pointLight position={[ 0, 2, -5]} intensity={0.30} color="#004433" />
      <Board />
      <GoalRing />
      <KingController keysRef={keysRef} onWin={onWin} />
    </Canvas>
  );
}

useGLTF.preload('/chess_king.glb');
