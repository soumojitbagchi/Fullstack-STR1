import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, MeshWobbleMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedTorusKnot({ color, position, args, distort, speed }) {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * speed * 0.15;
      meshRef.current.rotation.y = t * speed * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(t * speed * 0.5) * 0.3;
      meshRef.current.position.x = position[0] + Math.cos(t * speed * 0.3) * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusKnotGeometry args={args} />
      <MeshDistortMaterial
        color={color}
        distort={distort}
        speed={speed}
        roughness={0.15}
        metalness={0.8}
        transparent
        opacity={0.55}
      />
    </mesh>
  );
}

function WobblingIcosahedron({ color, position, radius, speed, factor }) {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.z = t * 0.08;
      meshRef.current.position.y = position[1] + Math.sin(t * 0.6) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[radius, 1]} />
      <MeshWobbleMaterial
        color={color}
        factor={factor}
        speed={speed}
        roughness={0.2}
        metalness={0.6}
        transparent
        opacity={0.5}
      />
    </mesh>
  );
}
function FloatingParticles({ count = 80 }) {
  const meshRef = useRef();

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.02;
      meshRef.current.rotation.x = t * 0.01;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#67e8f9"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}
function Scene() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 8, 5]} intensity={0.8} color="#c4b5fd" />
      <pointLight position={[-5, -3, 2]} intensity={0.6} color="#22d3ee" />

      {/* Cyan Torus Knot — top-left */}
      <AnimatedTorusKnot
        color="#06b6d4"
        position={[-2.5, 1.5, -3]}
        args={[0.8, 0.3, 100, 16]}
        distort={0.25}
        speed={1.2}
      />

      {/* Violet Torus Knot — bottom-right */}
      <AnimatedTorusKnot
        color="#8b5cf6"
        position={[2.5, -1.5, -2]}
        args={[0.6, 0.25, 100, 16]}
        distort={0.35}
        speed={1.8}
      />

      {/* Teal Icosahedron — center-left */}
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
        <WobblingIcosahedron
          color="#2dd4bf"
          position={[-1, -0.5, -1.5]}
          radius={0.9}
          speed={1}
          factor={0.6}
        />
      </Float>

      {/* Rose Icosahedron — top-right accent */}
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
        <WobblingIcosahedron
          color="#f472b6"
          position={[1.8, 2, -2.5]}
          radius={0.5}
          speed={1.5}
          factor={0.4}
        />
      </Float>

      {/* Particles */}
      <FloatingParticles count={100} />
    </>
  );
}

export default function SignupThreeBackground() {
  /* ── container: fills parent, sits behind content ── */
  const containerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
    pointerEvents: 'none',
    overflow: 'hidden',
  };

  /* ── blur + tint overlay ── */
  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backdropFilter: 'blur(80px)',
    WebkitBackdropFilter: 'blur(80px)',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  };

  return (
    <div style={containerStyle}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>

      {/* Blur overlay */}
      <div style={overlayStyle} />
    </div>
  );
}
