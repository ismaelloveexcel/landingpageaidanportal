import { Canvas } from "@react-three/fiber";
import { useGLTF, Float } from "@react-three/drei";
import { Suspense, useRef, Component, ReactNode } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

// Error boundary to gracefully handle WebGL failures
class WebGLErrorBoundary extends Component<{ children: ReactNode; fallback?: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

const demogorgonModel = "/attached_assets/Refine-this-Demogorgon-for-mobile-WebGL-keep-curre_1767555078706.glb";
const nailBatModel = "/attached_assets/Meshy_AI_Nail_Bat_0104192416_texture_1767555084784.glb";

function DemogorgonModel() {
  const { scene } = useGLTF(demogorgonModel);
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      // Rotate back and forth 45 degrees each way (90 degrees total arc) - looking left and right
      groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.8; // About 45 degrees each direction
    }
  });
  
  scene.traverse((child: THREE.Object3D) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      mesh.material = new THREE.MeshStandardMaterial({
        color: new THREE.Color("hsl(280, 80%, 60%)"),
        emissive: new THREE.Color("hsl(280, 90%, 40%)"),
        emissiveIntensity: 0.5,
        metalness: 0.3,
        roughness: 0.4,
      });
    }
  });
  
  // Position model so feet are at the bottom - no floating
  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={2.5} position={[0, -1.5, 0]} />
    </group>
  );
}

function NailBatModel() {
  const { scene } = useGLTF(nailBatModel);
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.5;
      groupRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
    }
  });
  
  scene.traverse((child: THREE.Object3D) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      mesh.material = new THREE.MeshStandardMaterial({
        color: new THREE.Color("hsl(180, 80%, 50%)"),
        emissive: new THREE.Color("hsl(180, 90%, 35%)"),
        emissiveIntensity: 0.5,
        metalness: 0.6,
        roughness: 0.3,
      });
    }
  });
  
  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
      <group ref={groupRef}>
        <primitive object={scene} scale={1.5} position={[0, 0, 0]} rotation={[0.3, 0, 0.5]} />
      </group>
    </Float>
  );
}

// Static fallback for when WebGL is unavailable
function DemogorgonFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div 
        className="w-32 h-32 md:w-48 md:h-48 rounded-full animate-pulse"
        style={{
          background: "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.6) 0%, rgba(147, 51, 234, 0.3) 50%, transparent 70%)",
          boxShadow: "0 0 60px rgba(139, 92, 246, 0.5), 0 0 120px rgba(147, 51, 234, 0.3)"
        }}
      />
    </div>
  );
}

export function DemogorgonScene() {
  return (
    <WebGLErrorBoundary fallback={<DemogorgonFallback />}>
      <div className="w-full h-full overflow-visible">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          style={{ background: "transparent", overflow: "visible" }}
          gl={{ alpha: true, antialias: true, premultipliedAlpha: false }}
        >
          <ambientLight intensity={0.7} />
          <pointLight position={[5, 5, 5]} intensity={1.5} color="#a855f7" />
          <pointLight position={[-5, -5, 5]} intensity={1.2} color="#06b6d4" />
          <pointLight position={[0, 5, -5]} intensity={1} color="#22c55e" />
          <pointLight position={[0, -3, 3]} intensity={0.6} color="#8b5cf6" />
          <Suspense fallback={null}>
            <DemogorgonModel />
          </Suspense>
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
}

export function NailBatScene() {
  return (
    <div className="w-full h-full pointer-events-none overflow-visible">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        style={{ background: "transparent", overflow: "visible" }}
        gl={{ alpha: true, antialias: true, premultipliedAlpha: false }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[3, 3, 3]} intensity={1.2} color="#06b6d4" />
        <pointLight position={[-3, -3, 3]} intensity={1} color="#a855f7" />
        <pointLight position={[0, 3, -3]} intensity={0.8} color="#10b981" />
        <Suspense fallback={null}>
          <NailBatModel />
        </Suspense>
      </Canvas>
    </div>
  );
}
