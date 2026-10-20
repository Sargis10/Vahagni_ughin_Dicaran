import { describe, expect, it } from 'vitest';
import { bounds, fragmentSpots, obstacles, PLAY_RADIUS, redReed, shoreZ, spawn, storytellerSpot } from '../src/game/world/layout.js';
import { terrainHeight } from '../src/game/world/terrain.js';
import { constrainPosition } from '../src/game/physics/collision.js';
import { getChapterState } from '../src/game/chapters/chapterState.js';
import { chapter1 } from '../src/game/chapters/chapter1.js';
import { createInitialProgress, reduceProgress } from '../src/progress/rules.js';
import { sourcesById } from '../src/content/sources.js';

const onLand = (p) => p.z >= shoreZ(p.x) && Math.hypot(p.x, p.z) < PLAY_RADIUS;

describe('world layout', () => {
  it('places key spots on walkable land', () => {
    for (const spot of [spawn, storytellerSpot, ...fragmentSpots]) {
      expect(onLand(spot), JSON.stringify(spot)).toBe(true);
    }
  });

  it('keeps the spawn point free of obstacles', () => {
    const settled = constrainPosition(spawn, 0.4, bounds, obstacles);
    expect(settled.x).toBeCloseTo(spawn.x, 5);
    expect(settled.z).toBeCloseTo(spawn.z, 5);
  });

  it('every fragment and the red reed are reachable (not inside an obstacle)', () => {
    for (const spot of [...fragmentSpots, redReed]) {
      for (const o of obstacles) expect(Math.hypot(o.x - spot.x, o.z - spot.z)).toBeGreaterThan(o.r + 0.4);
    }
  });

  it('slopes the beach down into the sea', () => {
    expect(terrainHeight(0, shoreZ(0) + 6)).toBeGreaterThan(-0.3);
    expect(terrainHeight(0, shoreZ(0) - 6)).toBeLessThan(-1);
  });

  it('never lets the player walk into the sea or out of the circle', () => {
    const inSea = constrainPosition({ x: 0, z: -30 }, 0.4, bounds, obstacles);
    expect(inSea.z).toBeGreaterThanOrEqual(shoreZ(inSea.x));
    const far = constrainPosition({ x: 60, z: 10 }, 0.4, bounds, obstacles);
    expect(Math.hypot(far.x, far.z)).toBeLessThanOrEqual(PLAY_RADIUS);
  });
});

describe('chapter 1 script', () => {
  it('cites only known sources', () => {
    const refs = [
      ...chapter1.intro.flatMap((slide) => slide.sourceRefs ?? []),
      ...Object.values(chapter1.dialogues).flatMap((d) => d.lines.flatMap((line) => line.sourceRefs ?? [])),
    ];
    expect(refs.length).toBeGreaterThan(0);
    for (const ref of refs) expect(sourcesById[ref.sourceId], ref.sourceId).toBeDefined();
  });

  it('labels every line and cites a source for every non-fictional line', () => {
    for (const dialogue of Object.values(chapter1.dialogues)) {
      for (const line of dialogue.lines) {
        expect(line.evidence).toBeTruthy();
        if (line.evidence !== 'fictional') expect(line.sourceRefs?.length).toBeGreaterThan(0);
      }
    }
  });

  it('starts with meeting the storyteller and records it once', () => {
    let progress = createInitialProgress();
    let state = getChapterState(chapter1, progress);
    expect(state.current.id).toBe('meet-storyteller');
    expect(chapter1.resolveInteraction('storyteller', state)).toEqual({ type: 'dialogue', id: 'storyteller-meet' });

    const action = { type: 'complete-objective', chapterId: 'chapter-1', objectiveId: 'meet-storyteller', reward: { xp: 10 } };
    progress = reduceProgress(reduceProgress(progress, action), action);
    state = getChapterState(chapter1, progress);
    expect(progress.xp).toBe(10);
    expect(state.isDone('meet-storyteller')).toBe(true);
    expect(chapter1.resolveInteraction('storyteller', state).id).toBe('storyteller-idle');
  });
});
