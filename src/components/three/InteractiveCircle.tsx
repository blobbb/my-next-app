"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function GlowRing() {
  const geometry = useMemo(
    () => new THREE.TorusGeometry(1.4, 0.08, 32, 200),
    []
  );
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#37f8ff"),
        emissive: new THREE.Color("#37f8ff"),
        emissiveIntensity: 0.9,
        metalness: 0.2,
        roughness: 0.2,
      }),
    []
  );

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material]
  );

  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.cos(t / 2) * 0.35;
      meshRef.current.rotation.y = Math.sin(t / 2) * 0.45;
      meshRef.current.rotation.z = Math.sin(t / 1.5) * 0.2;
    }
  });

  return <mesh ref={meshRef} geometry={geometry} material={material} />;
}

export function InteractiveCircle() {
  return (
    <div className="h-72 w-full max-w-lg">
      <Canvas camera={{ position: [0, 0, 3.5], fov: 42 }} dpr={[1, 1.75]}>
        <color attach="background" args={["#05060a"]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 5, 6]} intensity={1.2} />
        <pointLight position={[-4, -3, -5]} intensity={0.4} color="#ff3ff0" />
        <Suspense fallback={null}>
          <GlowRing />
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
    </div>
  );
}
