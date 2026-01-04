import { Canvas } from "@react-three/fiber";
import { useGLTF, Float } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const demogorgonModel = "/attached_assets/Refine-this-Demogorgon-for-mobile-WebGL-keep-curre_1767555078706.glb";
const nailBatModel = "/attached_assets/Meshy_AI_Nail_Bat_0104192416_texture_1767555084784.glb";

function DemogorgonModel() {
  const { scene } = useGLTF(demogorgonModel);
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });
  
  scene.traverse((child: THREE.Object3D) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      mesh.material = new THREE.MeshStandardMaterial({
        color: new THREE.Color("hsl(280, 80%, 60%)"),
        emissive: new THREE.Color("hsl(280, 90%, 40%)"),
        emissiveIntensity: 0.4,
        metalness: 0.2,
        roughness: 0.5,
      });
    }
  });
  
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={groupRef}>
        <primitive object={scene} scale={1.5} position={[0, -0.5, 0]} />
      </group>
    </Float>
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
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={groupRef}>
        <primitive object={scene} scale={2} position={[0, 0, 0]} rotation={[0.3, 0, 0.5]} />
      </group>
    </Float>
  );
}

export function DemogorgonScene() {
  return (
    <div className="w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#a855f7" />
        <pointLight position={[-5, -5, 5]} intensity={0.8} color="#06b6d4" />
        <pointLight position={[0, 5, -5]} intensity={0.6} color="#22c55e" />
        <Suspense fallback={null}>
          <DemogorgonModel />
        </Suspense>
      </Canvas>
    </div>
  );
}

export function NailBatScene() {
  return (
    <div className="w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[3, 3, 3]} intensity={1} color="#06b6d4" />
        <pointLight position={[-3, -3, 3]} intensity={0.8} color="#a855f7" />
        <pointLight position={[0, 3, -3]} intensity={0.6} color="#10b981" />
        <Suspense fallback={null}>
          <NailBatModel />
        </Suspense>
      </Canvas>
    </div>
  );
}
