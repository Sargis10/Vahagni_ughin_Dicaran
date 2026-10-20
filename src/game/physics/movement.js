// Pure movement math for the third-person controller.

export const WALK_SPEED = 3.4;
export const RUN_SPEED = 6.2;
const ACCELERATION = 14;

/**
 * Converts input axes (forward/right in -1..1) into a world-space direction relative to the
 * camera yaw. Returns { x, z, magnitude } with the direction normalised.
 */
export function inputToWorldDirection(forward, right, cameraYaw) {
  const magnitude = Math.min(1, Math.hypot(forward, right));
  if (magnitude < 0.05) return { x: 0, z: 0, magnitude: 0 };
  const sin = Math.sin(cameraYaw);
  const cos = Math.cos(cameraYaw);
  // Camera looks along -Z when yaw = 0.
  const x = -forward * sin + right * cos;
  const z = -forward * cos - right * sin;
  const length = Math.hypot(x, z) || 1;
  return { x: x / length, z: z / length, magnitude };
}

/** Moves the current velocity towards the target velocity with a fixed acceleration. */
export function approachVelocity(velocity, target, dt) {
  const t = 1 - Math.exp(-ACCELERATION * dt);
  return {
    x: velocity.x + (target.x - velocity.x) * t,
    z: velocity.z + (target.z - velocity.z) * t,
  };
}

/** Shortest signed difference between two angles, in (-PI, PI]. */
export function angleDelta(from, to) {
  let delta = (to - from) % (Math.PI * 2);
  if (delta > Math.PI) delta -= Math.PI * 2;
  if (delta <= -Math.PI) delta += Math.PI * 2;
  return delta;
}

export function dampAngle(current, target, lambda, dt) {
  return current + angleDelta(current, target) * (1 - Math.exp(-lambda * dt));
}

export function dampValue(current, target, lambda, dt) {
  return current + (target - current) * (1 - Math.exp(-lambda * dt));
}
