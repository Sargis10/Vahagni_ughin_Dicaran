// Pure 2D (x/z plane) collision helpers. Positions are { x, z } objects.

/** Pushes a circle at `pos` out of every circular obstacle it overlaps. */
export function resolveCircleCollisions(pos, radius, obstacles) {
  let { x, z } = pos;
  // Two passes settle most cases where pushing out of one obstacle moves into another.
  for (let pass = 0; pass < 2; pass += 1) {
    for (const obstacle of obstacles) {
      const dx = x - obstacle.x;
      const dz = z - obstacle.z;
      const minDistance = radius + obstacle.r;
      const distanceSq = dx * dx + dz * dz;
      if (distanceSq >= minDistance * minDistance) continue;
      const distance = Math.sqrt(distanceSq);
      if (distance < 1e-6) {
        x = obstacle.x + minDistance;
        continue;
      }
      const push = (minDistance - distance) / distance;
      x += dx * push;
      z += dz * push;
    }
  }
  return { x, z };
}

/** Keeps a point inside a circle of `radius` around `center`. */
export function clampToCircle(pos, center, radius) {
  const dx = pos.x - center.x;
  const dz = pos.z - center.z;
  const distance = Math.hypot(dx, dz);
  if (distance <= radius) return pos;
  const scale = radius / distance;
  return { x: center.x + dx * scale, z: center.z + dz * scale };
}

/**
 * Applies the play-area rules: stay inside the outer circle and on the land side of the
 * shoreline (`z >= shoreZ(x)`), then resolve obstacles.
 */
export function constrainPosition(pos, radius, bounds, obstacles) {
  let next = clampToCircle(pos, bounds.center, bounds.radius - radius);
  if (bounds.shoreZ) {
    const minZ = bounds.shoreZ(next.x) + radius;
    if (next.z < minZ) next = { x: next.x, z: minZ };
  }
  return resolveCircleCollisions(next, radius, obstacles);
}
