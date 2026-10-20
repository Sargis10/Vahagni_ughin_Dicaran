import { useEffect, useMemo, useRef } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei';
import { clone as cloneSkinned } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { characterUrl } from '../assets.js';
import { WORLD_SCALE } from '../world/layout.js';

/**
 * A Kenney mini character with its animation clips. `animation` is the clip to play;
 * changing it cross-fades. `controls` (optional ref) receives the animation actions so a
 * controller can drive time scale.
 */
export function Character({ name, animation = 'idle', fade = 0.22, controls, tint }) {
  const { scene, animations } = useGLTF(characterUrl(name));
  const model = useMemo(() => {
    const copy = cloneSkinned(scene);
    copy.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.frustumCulled = false;
        if (tint) {
          child.material = child.material.clone();
          child.material.color.set(tint);
        }
      }
    });
    return copy;
  }, [scene, tint]);
  const root = useRef(null);
  const { actions } = useAnimations(animations, root);

  useEffect(() => {
    if (controls) controls.current = actions;
  }, [actions, controls]);

  useEffect(() => {
    const action = actions[animation];
    if (!action) return undefined;
    action.reset().fadeIn(fade).play();
    return () => {
      action.fadeOut(fade);
    };
  }, [actions, animation, fade]);

  return (
    <group ref={root} scale={WORLD_SCALE}>
      <primitive object={model} />
    </group>
  );
}
