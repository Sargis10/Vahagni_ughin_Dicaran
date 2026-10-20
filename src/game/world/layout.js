// Static, pure description of the chapter-1 shore. All positions are metres on the x/z plane;
// north (towards the sea) is -z. The world is fictional: it illustrates the song, it does not
// reconstruct a real place.

export const WORLD_SCALE = 2.5;
export const PLAY_RADIUS = 23;

/** Shoreline: land is where z >= shoreZ(x). Mirrored in the water/terrain shaders. */
export function shoreZ(x) {
  return -9.5 + 1.6 * Math.sin(x * 0.22) + 0.8 * Math.sin(x * 0.53 + 1);
}

export const bounds = { center: { x: 0, z: 0 }, radius: PLAY_RADIUS, shoreZ: (x) => shoreZ(x) + 0.6 };

export const spawn = { x: 0, z: 12, rotation: Math.PI };

export const hearth = { x: 3, z: 4 };
export const storytellerSpot = { x: 4.7, z: 2.9, rotation: -2.1 };
export const redReed = { x: -7, z: shoreZ(-7) + 0.4 };

export const fragmentSpots = [
  { x: -15.5, z: -5.5 },
  { x: -2.5, z: shoreZ(-2.5) + 1.6 },
  { x: 12.5, z: -4 },
  { x: 15, z: 7.5 },
];

// Single props with their collider radius (0 = walk-through).
export const props = [
  { model: 'campfire_stones', x: hearth.x, z: hearth.z, s: 1.3, r: 0.75 },
  { model: 'log_large', x: hearth.x - 2, z: hearth.z + 0.6, ry: 1.2, r: 0.7 },
  { model: 'log', x: hearth.x + 0.4, z: hearth.z + 2.1, ry: 0.2, r: 0.5 },
  { model: 'tent_detailedOpen', x: 8.5, z: 6.5, ry: -2.6, s: 1.25, r: 1.7 },
  { model: 'pot_large', x: 6.6, z: 4.6, ry: 0.3, r: 0.55 },
  { model: 'stump_old', x: 1, z: 1.8, r: 0.4 },
  // Ruined colonnade (fictional) to the east.
  { model: 'statue_column', x: 10.5, z: -2.5, r: 0.45 },
  { model: 'statue_column', x: 13.5, z: -2.5, r: 0.45 },
  { model: 'statue_columnDamaged', x: 10.5, z: -6, r: 0.45 },
  { model: 'statue_column', x: 13.5, z: -6, r: 0.45 },
  { model: 'statue_block', x: 12, z: -0.8, ry: 0.4, r: 0.6 },
  { model: 'statue_block', x: 14.6, z: -4.2, ry: 1.1, s: 0.8, r: 0.45 },
  { model: 'stone_largeA', x: 12, z: -4.2, ry: 0.2, s: 0.9, r: 0 },
  // Rocks and boulders.
  { model: 'rock_tallA', x: 17, z: 5, ry: 0.6, r: 1.3 },
  { model: 'rock_tallB', x: 16.5, z: 9.5, ry: 2.1, r: 1 },
  { model: 'rock_largeD', x: -12, z: 6, ry: 1, r: 1.2 },
  { model: 'rock_largeB', x: -18, z: -2, ry: 0.3, r: 1 },
  { model: 'rock_tallC', x: -16.5, z: 2, ry: 2.3, r: 0.6 },
  { model: 'stone_tallB', x: -4.5, z: 14, ry: 0.8, r: 1 },
  { model: 'rock_largeC', x: 6, z: -7.5, ry: 2.6, r: 1.2 },
  { model: 'cliff_block_rock', x: 20, z: -6.5, ry: 0.4, s: 1.2, r: 1.6 },
  { model: 'cliff_large_rock', x: -20.5, z: 6, ry: 1.7, s: 1.3, r: 1.5 },
  // Trees inside the play area.
  { model: 'tree_pineDefaultA', x: -9, z: 11, ry: 0.4, r: 0.55 },
  { model: 'tree_pineRoundC', x: -13, z: 13, ry: 1, r: 0.5 },
  { model: 'tree_pineTallA', x: 11, z: 13, r: 0.45 },
  { model: 'tree_pineDefaultA', x: 14, z: 15, ry: 2, r: 0.55 },
  { model: 'tree_pineRoundC', x: -5, z: 6, ry: 2.2, r: 0.5 },
  { model: 'tree_pineTallA', x: 19.5, z: 1, r: 0.45 },
  { model: 'mushroom_tanGroup', x: -5.6, z: 6.8, r: 0 },
  { model: 'mushroom_tanGroup', x: 11.6, z: 13.6, ry: 1, r: 0 },
];

/** Stepping stones from the spawn point to the hearth and on to the reeds. */
export const pathStones = [
  [0.2, 10.4, 0.2],
  [0.8, 8.6, -0.3],
  [1.6, 6.9, 0.4],
  [-0.4, 3.2, 0.9],
  [-2.2, 1.4, 0.5],
  [-3.8, -0.6, 1.2],
  [-5.2, -2.7, 0.7],
  [-6.3, -4.8, 1.3],
];

// Deterministic pseudo-random generator so the scatter is identical on every load.
function mulberry32(seed) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function nearAny(x, z, points, distance) {
  return points.some((p) => Math.hypot(p.x - x, p.z - z) < distance);
}

const keepClear = [hearth, storytellerSpot, spawn, ...fragmentSpots, redReed, { x: 12, z: -4 }];

function scatter(seed, count, accept) {
  const random = mulberry32(seed);
  const result = [];
  let guard = 0;
  while (result.length < count && guard < count * 40) {
    guard += 1;
    const x = (random() * 2 - 1) * 40;
    const z = (random() * 2 - 1) * 40;
    const item = { x, z, ry: random() * Math.PI * 2, s: 0.75 + random() * 0.6 };
    if (accept(item, random)) result.push(item);
  }
  return result;
}

/** Reed bed along the western shore; some reeds stand in the shallows. */
export const reeds = scatter(11, 95, ({ x, z }) => {
  if (x < -17 || x > 1) return false;
  const d = z - shoreZ(x);
  if (d < -1.4 || d > 2.4) return false;
  return !nearAny(x, z, [redReed], 1.1) && !nearAny(x, z, fragmentSpots, 1.2);
});

export const grass = scatter(23, 260, ({ x, z }) => {
  const d = Math.hypot(x, z);
  if (d > PLAY_RADIUS + 6 || z < shoreZ(x) + 1.5) return false;
  return !nearAny(x, z, keepClear, 1.6) && !nearAny(x, z, [hearth], 3);
});

export const flowers = scatter(37, 70, ({ x, z }) => {
  const d = Math.hypot(x, z);
  if (d > PLAY_RADIUS || z < shoreZ(x) + 3) return false;
  return !nearAny(x, z, keepClear, 1.4) && !nearAny(x, z, [hearth], 3);
});

export const lilies = scatter(41, 26, ({ x, z }) => {
  const d = z - shoreZ(x);
  return x > -18 && x < 14 && d < -1.6 && d > -7;
});

/** Forest ring just outside the walkable circle; it hides the edge of the world. */
export const forest = scatter(53, 120, ({ x, z }) => {
  const d = Math.hypot(x, z);
  if (z < shoreZ(x) + 2) return false;
  return d > PLAY_RADIUS + 0.5 && d < PLAY_RADIUS + 14;
});

export const obstacles = [
  ...props.filter((p) => p.r > 0).map((p) => ({ x: p.x, z: p.z, r: p.r })),
  { x: storytellerSpot.x, z: storytellerSpot.z, r: 0.45 },
];

export function groupByModel(list) {
  const groups = new Map();
  for (const item of list) {
    if (!groups.has(item.model)) groups.set(item.model, []);
    groups.get(item.model).push(item);
  }
  return [...groups.entries()];
}
