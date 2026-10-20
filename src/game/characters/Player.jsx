import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { CHARACTERS } from '../assets.js';
import { constrainPosition } from '../physics/collision.js';
import { approachVelocity, dampAngle, inputToWorldDirection, RUN_SPEED, WALK_SPEED } from '../physics/movement.js';
import { findNearestInteractable } from '../interaction/nearest.js';
import { bounds, obstacles } from '../world/layout.js';
import { terrainHeight } from '../world/terrain.js';
import { Character } from './Character.jsx';

const RADIUS = 0.4;

function readAxes(input) {
  const forward = (input.keys.forward ? 1 : 0) - (input.keys.back ? 1 : 0) + input.joystick.y;
  const right = (input.keys.right ? 1 : 0) - (input.keys.left ? 1 : 0) + input.joystick.x;
  return {
    forward: Math.max(-1, Math.min(1, forward)),
    right: Math.max(-1, Math.min(1, right)),
    run: input.keys.run || input.joystick.run,
  };
}

/**
 * Third-person controller. Reads the shared `runtime` input each frame, moves relative to
 * the camera yaw, resolves collisions and reports the nearest interactable when it changes.
 */
export function Player({ runtime, interactables, onNearestChange }) {
  const group = useRef(null);
  const actions = useRef(null);
  const velocity = useRef({ x: 0, z: 0 });
  const nearestId = useRef(null);
  const [animation, setAnimation] = useState('idle');
  const animationRef = useRef('idle');

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.1);
    const node = group.current;
    if (!node) return;
    const player = runtime.player;

    const axes = runtime.locked ? { forward: 0, right: 0, run: false } : readAxes(runtime.input);
    const direction = inputToWorldDirection(axes.forward, axes.right, runtime.camera.yaw);
    const speed = (axes.run ? RUN_SPEED : WALK_SPEED) * direction.magnitude;
    velocity.current = approachVelocity(velocity.current, { x: direction.x * speed, z: direction.z * speed }, delta);

    const moved = constrainPosition(
      { x: player.x + velocity.current.x * delta, z: player.z + velocity.current.z * delta },
      RADIUS,
      bounds,
      obstacles,
    );
    player.x = moved.x;
    player.z = moved.z;

    const planarSpeed = Math.hypot(velocity.current.x, velocity.current.z);
    if (planarSpeed > 0.3) {
      player.rotation = dampAngle(player.rotation, Math.atan2(velocity.current.x, velocity.current.z), 12, delta);
    }
    if (runtime.faceTarget) {
      const target = Math.atan2(runtime.faceTarget.x - player.x, runtime.faceTarget.z - player.z);
      player.rotation = dampAngle(player.rotation, target, 8, delta);
    }

    node.position.set(player.x, terrainHeight(player.x, player.z), player.z);
    node.rotation.y = player.rotation;

    const next = planarSpeed > 4.6 ? 'sprint' : planarSpeed > 0.35 ? 'walk' : 'idle';
    if (next !== animationRef.current) {
      animationRef.current = next;
      setAnimation(next);
    }
    const walk = actions.current?.walk;
    if (walk) walk.timeScale = Math.max(0.6, planarSpeed / WALK_SPEED) * 1.1;

    const nearest = runtime.locked ? null : findNearestInteractable(player, interactables, (item) => item.active);
    const id = nearest?.id ?? null;
    if (id !== nearestId.current) {
      nearestId.current = id;
      onNearestChange(id);
    }
  });

  return (
    <group ref={group}>
      <Character name={CHARACTERS.player} animation={animation} controls={actions} />
    </group>
  );
}
