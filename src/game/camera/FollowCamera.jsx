import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { dampAngle, dampValue } from '../physics/movement.js';
import { terrainHeight } from '../world/terrain.js';

const CAMERA_LIMITS = { minPitch: 0.12, maxPitch: 1.1, minDistance: 3.5, maxDistance: 12 };

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

/**
 * Orbiting third-person camera. Drag (mouse or touch) to orbit, wheel or pinch-free buttons
 * to zoom. `runtime.camera` holds yaw/pitch/distance so movement can be camera-relative.
 */
export function FollowCamera({ runtime }) {
  const { camera, gl } = useThree();
  const target = useRef(new THREE.Vector3());
  const smoothed = useRef(null);

  useEffect(() => {
    const element = gl.domElement;
    let drag = null;

    const onDown = (event) => {
      if (event.pointerType === 'mouse' && event.button !== 0 && event.button !== 2) return;
      drag = { id: event.pointerId, x: event.clientX, y: event.clientY };
      element.setPointerCapture?.(event.pointerId);
    };
    const onMove = (event) => {
      if (!drag || drag.id !== event.pointerId) return;
      const dx = event.clientX - drag.x;
      const dy = event.clientY - drag.y;
      drag.x = event.clientX;
      drag.y = event.clientY;
      const cam = runtime.camera;
      const sensitivity = event.pointerType === 'touch' ? 0.008 : 0.005;
      cam.yaw -= dx * sensitivity;
      cam.pitch = clamp(cam.pitch + dy * sensitivity, CAMERA_LIMITS.minPitch, CAMERA_LIMITS.maxPitch);
    };
    const onUp = (event) => {
      if (drag?.id === event.pointerId) drag = null;
    };
    const onWheel = (event) => {
      event.preventDefault();
      const cam = runtime.camera;
      cam.distance = clamp(cam.distance + event.deltaY * 0.01, CAMERA_LIMITS.minDistance, CAMERA_LIMITS.maxDistance);
    };
    const onContextMenu = (event) => event.preventDefault();

    element.addEventListener('pointerdown', onDown);
    element.addEventListener('pointermove', onMove);
    element.addEventListener('pointerup', onUp);
    element.addEventListener('pointercancel', onUp);
    element.addEventListener('wheel', onWheel, { passive: false });
    element.addEventListener('contextmenu', onContextMenu);
    return () => {
      element.removeEventListener('pointerdown', onDown);
      element.removeEventListener('pointermove', onMove);
      element.removeEventListener('pointerup', onUp);
      element.removeEventListener('pointercancel', onUp);
      element.removeEventListener('wheel', onWheel);
      element.removeEventListener('contextmenu', onContextMenu);
    };
  }, [gl, runtime]);

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.1);
    const { player, camera: cam } = runtime;
    const focus = runtime.focus ?? player;
    target.current.set(focus.x, terrainHeight(player.x, player.z) + 1.35, focus.z);

    if (runtime.focusYaw != null) cam.yaw = dampAngle(cam.yaw, runtime.focusYaw, 3, delta);
    const current = smoothed.current ?? { ...cam };
    const lambda = 10;
    current.yaw = cam.yaw;
    current.pitch = dampValue(current.pitch, cam.pitch, lambda, delta);
    current.distance = dampValue(current.distance, runtime.focus ? Math.max(5.5, Math.min(cam.distance, 7)) : cam.distance, 6, delta);
    smoothed.current = current;

    const horizontal = Math.cos(current.pitch) * current.distance;
    const x = target.current.x + Math.sin(current.yaw) * horizontal;
    const z = target.current.z + Math.cos(current.yaw) * horizontal;
    const y = Math.max(target.current.y + Math.sin(current.pitch) * current.distance, terrainHeight(x, z) + 0.6);

    camera.position.set(
      dampValue(camera.position.x, x, 14, delta),
      dampValue(camera.position.y, y, 14, delta),
      dampValue(camera.position.z, z, 14, delta),
    );
    camera.lookAt(target.current);
  });

  return null;
}
