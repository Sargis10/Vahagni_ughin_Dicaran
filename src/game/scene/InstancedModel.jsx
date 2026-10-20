import { useLayoutEffect, useMemo, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { natureUrl } from '../assets.js';
import { WORLD_SCALE } from '../world/layout.js';
import { themedMaterial } from './materials.js';

function collectParts(scene) {
  const parts = [];
  scene.updateMatrixWorld(true);
  scene.traverse((child) => {
    if (child.isMesh) parts.push({ geometry: child.geometry, material: child.material, matrix: child.matrixWorld.clone() });
  });
  return parts;
}

function InstancedPart({ part, items, wind, color, castShadow, receiveShadow, getY }) {
  const ref = useRef(null);
  const material = useMemo(() => themedMaterial(part.material, { wind, color }), [part.material, wind, color]);

  useLayoutEffect(() => {
    const mesh = ref.current;
    const object = new THREE.Object3D();
    items.forEach((item, index) => {
      const scale = (item.s ?? 1) * WORLD_SCALE;
      object.position.set(item.x, getY ? getY(item.x, item.z) : (item.y ?? 0), item.z);
      object.rotation.set(0, item.ry ?? 0, 0);
      object.scale.set(scale * (item.sx ?? 1), scale * (item.sy ?? 1), scale * (item.sx ?? 1));
      object.updateMatrix();
      mesh.setMatrixAt(index, object.matrix.clone().multiply(part.matrix));
    });
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [items, part.matrix, getY]);

  return (
    <instancedMesh
      ref={ref}
      args={[part.geometry, material, items.length]}
      castShadow={castShadow}
      receiveShadow={receiveShadow}
    />
  );
}

/** Renders many copies of one Kenney model with one draw call per material. */
export function InstancedModel({ name, items, wind = 0, color, castShadow = true, receiveShadow = true, getY }) {
  const { scene } = useGLTF(natureUrl(name));
  const parts = useMemo(() => collectParts(scene), [scene]);
  if (items.length === 0) return null;
  return parts.map((part, index) => (
    <InstancedPart
      key={`${index}-${items.length}`}
      part={part}
      items={items}
      wind={wind}
      color={color}
      castShadow={castShadow}
      receiveShadow={receiveShadow}
      getY={getY}
    />
  ));
}
