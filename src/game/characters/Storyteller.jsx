import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { CHARACTERS } from '../assets.js';
import { dampAngle } from '../physics/movement.js';
import { storytellerSpot } from '../world/layout.js';
import { terrainHeight } from '../world/terrain.js';
import { Character } from './Character.jsx';

const position = [storytellerSpot.x, terrainHeight(storytellerSpot.x, storytellerSpot.z), storytellerSpot.z];

/** The fictional storyteller: idles by the fire and turns to face the player when near. */
export function Storyteller({ runtime, talking }) {
  const group = useRef(null);

  useFrame((_, delta) => {
    const node = group.current;
    if (!node) return;
    const { x, z } = runtime.player;
    const distance = Math.hypot(x - storytellerSpot.x, z - storytellerSpot.z);
    const target = distance < 6 ? Math.atan2(x - storytellerSpot.x, z - storytellerSpot.z) : storytellerSpot.rotation;
    node.rotation.y = dampAngle(node.rotation.y, target, 4, Math.min(delta, 0.05));
  });

  return (
    <group ref={group} position={position} rotation-y={storytellerSpot.rotation}>
      <Character name={CHARACTERS.storyteller} animation={talking ? 'interact-right' : 'idle'} fade={0.35} />
    </group>
  );
}
