import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';

function AnimatedSphere({ color, position, args, distort, speed }) {
  const sphereRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (sphereRef.current) {
      sphereRef.current.position.y += Math.sin(t * speed) * 0.005;
      sphereRef.current.rotation.x = t * 0.1;
      sphereRef.current.rotation.y = t * 0.1;
    }
  });

  return (
    <Sphere ref={sphereRef} visible args={args} position={position}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={distort}
        speed={speed}
        roughness={0}
        transparent
        opacity={0.6}
      />
    </Sphere>
  );
}

export default function ThreeBackground() {
  return (
    <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        {/* Purple Orb */}
        <AnimatedSphere 
          color="#a855f7" 
          position={[-2, 1, -2]} 
          args={[1.5, 32, 32]} 
          distort={0.4} 
          speed={2} 
        />
        
        {/* Fuchsia Orb */}
        <AnimatedSphere 
          color="#d946ef" 
          position={[2, -1, -1]} 
          args={[1.2, 32, 32]} 
          distort={0.5} 
          speed={1.5} 
        />
        
        {/* Pink Orb */}
        <AnimatedSphere 
          color="#ec4899" 
          position={[0, 0, -3]} 
          args={[2, 32, 32]} 
          distort={0.3} 
          speed={1} 
        />
      </Canvas>
      {/* Blur overlay */}
      <div className="absolute inset-0 backdrop-blur-[100px] bg-black/40" />
    </div>
  );
}
