/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Fix for missing R3F intrinsic elements in the JSX namespace
declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshStandardMaterial: any;
      ambientLight: any;
      spotLight: any;
      pointLight: any;
    }
  }
}

const ElegantBubble = ({ position, color, scale = 1, speed = 1 }: { position: [number, number, number]; color: string; scale?: number; speed?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      // Gentle floating movement
      ref.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.5 * speed) * 0.2;
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.1 * speed;
      ref.current.rotation.z = state.clock.getElapsedTime() * 0.05 * speed;
    }
  });

  return (
    <Sphere ref={ref} args={[1, 64, 64]} position={position} scale={scale}>
      <MeshDistortMaterial
        color={color}
        envMapIntensity={0.8}
        clearcoat={1}
        clearcoatRoughness={0.1}
        metalness={0.2}
        roughness={0.1}
        distort={0.3}
        speed={1.5}
      />
    </Sphere>
  );
};

const GoldAccent = ({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) => {
    const ref = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if(ref.current) {
             ref.current.rotation.x = state.clock.getElapsedTime() * 0.2;
             ref.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        }
    })

    return (
        <Sphere ref={ref} args={[0.5, 32, 32]} position={position} scale={scale}>
             <meshStandardMaterial color="#C5A059" metalness={1} roughness={0.2} />
        </Sphere>
    )
}

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-40 pointer-events-none bg-[#FDFAF5]">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={1} color="#fff0f0" />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#C5A059" />
        
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
          {/* Main soft pink bubbles */}
          <ElegantBubble position={[0, 0, -2]} color="#E8C4C4" scale={2.5} speed={0.8} />
          <ElegantBubble position={[-4, 2, -5]} color="#FCE7E7" scale={1.8} speed={1} />
          <ElegantBubble position={[4, -2, -4]} color="#FCE7E7" scale={2} speed={0.9} />
          
          {/* Gold accents */}
          <GoldAccent position={[2, 3, 0]} scale={0.4} />
          <GoldAccent position={[-2, -3, 1]} scale={0.3} />
          <GoldAccent position={[3, 0, 2]} scale={0.2} />
        </Float>

        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export const QuantumComputerScene: React.FC = () => {
    // Placeholder for compatibility, though we might not use it
    return <HeroScene />
}