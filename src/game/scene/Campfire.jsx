import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const EMBERS = 24;

export function Campfire({ position, reducedMotion }) {
  const light = useRef(null);
  const flames = useRef([]);
  const embers = useRef(null);
  const emberData = useMemo(
    () =>
      Array.from({ length: EMBERS }, (_, i) => ({
        offset: (i / EMBERS) * 3,
        angle: i * 2.39,
        radius: 0.1 + (i % 5) * 0.05,
      })),
    [],
  );
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (light.current) {
      light.current.intensity = reducedMotion ? 22 : 20 + Math.sin(t * 11) * 2.5 + Math.sin(t * 23.7) * 1.5;
    }
    flames.current.forEach((flame, i) => {
      if (!flame) return;
      const s = reducedMotion ? 1 : 1 + Math.sin(t * (7 + i * 2.3) + i) * 0.18;
      flame.scale.set(1 / Math.sqrt(s), s, 1 / Math.sqrt(s));
    });
    if (embers.current) {
      emberData.forEach((ember, i) => {
        const life = ((t * 0.5 + ember.offset) % 3) / 3;
        dummy.position.set(
          Math.cos(ember.angle + t * 0.6) * ember.radius * (1 + life),
          0.3 + life * 2.4,
          Math.sin(ember.angle + t * 0.6) * ember.radius * (1 + life),
        );
        dummy.scale.setScalar(reducedMotion ? 0 : (1 - life) * 0.05);
        dummy.updateMatrix();
        embers.current.setMatrixAt(i, dummy.matrix);
      });
      embers.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group position={position}>
      <pointLight ref={light} position={[0, 0.9, 0]} color="#ff9a4a" intensity={20} distance={14} decay={1.6} />
      {[
        { y: 0.42, r: 0.26, h: 0.85, color: '#ff7a2a' },
        { y: 0.55, r: 0.16, h: 1.05, color: '#ffb347' },
        { y: 0.5, r: 0.09, h: 0.8, color: '#fff0b0' },
      ].map((flame, i) => (
        <mesh key={i} ref={(el) => (flames.current[i] = el)} position={[0, flame.y, 0]}>
          <coneGeometry args={[flame.r, flame.h, 7]} />
          <meshBasicMaterial color={flame.color} transparent opacity={0.85} toneMapped={false} />
        </mesh>
      ))}
      <instancedMesh ref={embers} args={[null, null, EMBERS]}>
        <sphereGeometry args={[1, 6, 4]} />
        <meshBasicMaterial color="#ffc070" toneMapped={false} />
      </instancedMesh>
    </group>
  );
}
