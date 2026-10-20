import { useMemo } from 'react';
import * as THREE from 'three';

// Far silhouettes; purely decorative and fictional.
const PEAKS = [
  { angle: 2.2, distance: 95, height: 38, radius: 34 },
  { angle: 2.6, distance: 110, height: 52, radius: 40 },
  { angle: 3.0, distance: 100, height: 44, radius: 36 },
  { angle: 3.5, distance: 115, height: 60, radius: 46 },
  { angle: 3.9, distance: 98, height: 40, radius: 34 },
  { angle: 4.3, distance: 108, height: 48, radius: 40 },
  { angle: 1.7, distance: 105, height: 34, radius: 32 },
  { angle: 4.75, distance: 112, height: 36, radius: 34 },
  { angle: 0.6, distance: 160, height: 30, radius: 40 },
  { angle: -0.4, distance: 170, height: 24, radius: 38 },
];

export function Mountains() {
  const peaks = useMemo(
    () =>
      PEAKS.map((peak, index) => {
        const geometry = new THREE.ConeGeometry(peak.radius, peak.height, 7, 3);
        const position = geometry.attributes.position;
        for (let i = 0; i < position.count; i += 1) {
          const y = position.getY(i);
          if (y < peak.height / 2 - 0.01) {
            const jitter = Math.sin(i * 12.9898 + index) * 0.12;
            position.setX(i, position.getX(i) * (1 + jitter));
            position.setZ(i, position.getZ(i) * (1 - jitter));
          }
        }
        geometry.computeVertexNormals();
        return {
          geometry,
          position: [Math.sin(peak.angle) * peak.distance, peak.height / 2 - 4, Math.cos(peak.angle) * peak.distance],
          snow: index % 3 === 1,
        };
      }),
    [],
  );

  return peaks.map((peak, index) => (
    <mesh key={index} geometry={peak.geometry} position={peak.position}>
      <meshStandardMaterial color={peak.snow ? '#7d6a78' : '#5e5266'} flatShading roughness={1} />
    </mesh>
  ));
}
