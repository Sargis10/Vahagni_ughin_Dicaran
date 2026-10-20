import { useMemo } from 'react';
import * as THREE from 'three';
import { shoreZ } from '../world/layout.js';
import { noise2, smoothstep, terrainHeight } from '../world/terrain.js';

const SIZE = 150;
const SEGMENTS = 150;

const SAND = new THREE.Color('#c9b083');
const WET_SAND = new THREE.Color('#8c7656');
const GRASS = new THREE.Color('#6b8a44');
const GRASS_DARK = new THREE.Color('#4f6c35');
const HILL = new THREE.Color('#7d7a52');
const ROCK = new THREE.Color('#8a7a66');

function buildGeometry() {
  const geometry = new THREE.PlaneGeometry(SIZE, SIZE, SEGMENTS, SEGMENTS);
  geometry.rotateX(-Math.PI / 2);
  const position = geometry.attributes.position;
  const colors = new Float32Array(position.count * 3);
  const color = new THREE.Color();

  for (let i = 0; i < position.count; i += 1) {
    const x = position.getX(i);
    const z = position.getZ(i);
    const y = terrainHeight(x, z);
    position.setY(i, y);

    const fromShore = z - shoreZ(x);
    const variation = noise2(x * 0.35, z * 0.35);
    color.copy(GRASS).lerp(GRASS_DARK, variation * 0.8);
    color.lerp(HILL, smoothstep(1.5, 6, y));
    color.lerp(ROCK, smoothstep(5, 9, y));
    color.lerp(SAND, 1 - smoothstep(0.6, 2.6 + variation, fromShore));
    color.lerp(WET_SAND, 1 - smoothstep(-0.6, 0.6, fromShore));
    colors.set([color.r, color.g, color.b], i * 3);
  }

  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.computeVertexNormals();
  return geometry;
}

export function Terrain() {
  const geometry = useMemo(() => buildGeometry(), []);
  return (
    <mesh geometry={geometry} receiveShadow>
      <meshStandardMaterial vertexColors flatShading roughness={0.95} metalness={0} />
    </mesh>
  );
}
