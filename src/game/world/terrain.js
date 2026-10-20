import { PLAY_RADIUS, shoreZ } from './layout.js';

function hash(x, z) {
  const s = Math.sin(x * 127.1 + z * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

function smooth(t) {
  return t * t * (3 - 2 * t);
}

/** Value noise in roughly [0, 1]. */
export function noise2(x, z) {
  const xi = Math.floor(x);
  const zi = Math.floor(z);
  const xf = smooth(x - xi);
  const zf = smooth(z - zi);
  const a = hash(xi, zi);
  const b = hash(xi + 1, zi);
  const c = hash(xi, zi + 1);
  const d = hash(xi + 1, zi + 1);
  return a + (b - a) * xf + (c - a) * zf + (a - b - c + d) * xf * zf;
}

export function smoothstep(edge0, edge1, value) {
  const t = Math.min(1, Math.max(0, (value - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export const SEA_FLOOR = -1.4;

/** Ground height at a point: flat-ish meadow, a beach that slopes into the sea, hills beyond the edge. */
export function terrainHeight(x, z) {
  const fromShore = z - shoreZ(x);
  const meadow = (noise2(x * 0.18, z * 0.18) - 0.5) * 0.35;
  const land = meadow * smoothstep(1, 5, fromShore);
  const beach = smoothstep(-4, 1.5, fromShore);
  let height = SEA_FLOOR + (land + 0.05 - SEA_FLOOR) * beach;

  const distance = Math.hypot(x, z);
  const hills = smoothstep(PLAY_RADIUS + 1, PLAY_RADIUS + 22, distance) * smoothstep(0, 8, fromShore);
  height += hills * (2 + noise2(x * 0.09 + 7, z * 0.09) * 9);
  return height;
}
