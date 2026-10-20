import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { terrainHeight } from '../world/terrain.js';

/** Floating golden diamond above the current objective target. */
export function ObjectiveMarker({ position, height = 2.6, reducedMotion }) {
  const ref = useRef(null);
  useFrame(({ clock }) => {
    if (!ref.current || reducedMotion) return;
    ref.current.rotation.y = clock.elapsedTime * 1.4;
    ref.current.position.y = height + Math.sin(clock.elapsedTime * 2) * 0.12;
  });
  if (!position) return null;
  return (
    <group position={[position.x, terrainHeight(position.x, position.z), position.z]}>
      <mesh ref={ref} position-y={height}>
        <octahedronGeometry args={[0.2, 0]} />
        <meshBasicMaterial color="#f1cf7a" toneMapped={false} />
      </mesh>
    </group>
  );
}

/** A glowing standing stone that holds one fragment of the song (the stone itself is fictional). */
export function FragmentStone({ position, collected, reducedMotion }) {
  const glow = useRef(null);
  const orb = useRef(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime + position.x;
    if (glow.current) glow.current.intensity = collected ? 0 : 3 + (reducedMotion ? 0 : Math.sin(t * 2.4) * 1);
    if (orb.current && !reducedMotion) {
      orb.current.position.y = 1.55 + Math.sin(t * 1.8) * 0.1;
      orb.current.rotation.y = t;
    }
  });
  const y = terrainHeight(position.x, position.z);
  return (
    <group position={[position.x, y, position.z]}>
      <mesh castShadow receiveShadow position-y={0.55} rotation-y={position.x}>
        <cylinderGeometry args={[0.28, 0.42, 1.1, 6]} />
        <meshStandardMaterial color={collected ? '#6f6658' : '#a59a86'} flatShading roughness={0.9} />
      </mesh>
      {!collected && (
        <>
          <mesh ref={orb} position-y={1.55}>
            <icosahedronGeometry args={[0.16, 0]} />
            <meshBasicMaterial color="#ffb86b" toneMapped={false} />
          </mesh>
          <pointLight ref={glow} position-y={1.5} color="#ff9d5c" intensity={3} distance={4} decay={2} />
        </>
      )}
    </group>
  );
}
