import { describe, expect, it } from 'vitest';
import { locations, locationsById } from '../src/content/locations.js';
import { chaptersById } from '../src/content/chapters.js';
import { getEntryById } from '../src/content/index.js';
import { LOCATION_STATUS, checkCondition, getLocationStatus } from '../src/progress/conditions.js';
import { createInitialProgress } from '../src/progress/rules.js';

const fresh = () => ({ ...createInitialProgress(), completedObjectives: [] });

describe('conditions', () => {
  it('handles primitives and combinators', () => {
    const p = { ...fresh(), completedChapters: ['c1'], discoveredEntries: ['a', 'b'] };
    expect(checkCondition({ always: true }, p)).toBe(true);
    expect(checkCondition({ never: true }, p)).toBe(false);
    expect(checkCondition({ chapter: 'c1' }, p)).toBe(true);
    expect(checkCondition({ discovered: 3 }, p)).toBe(false);
    expect(checkCondition({ all: [{ chapter: 'c1' }, { discovered: 2 }] }, p)).toBe(true);
    expect(checkCondition({ any: [{ never: true }, { discovered: 2 }] }, p)).toBe(true);
    expect(checkCondition(undefined, p)).toBe(false);
  });

  it('tolerates progress saved before objectives existed', () => {
    const legacy = createInitialProgress();
    expect(checkCondition({ objective: 'chapter-1:x' }, legacy)).toBe(false);
  });
});

describe('location states', () => {
  it('starts with the hearth available and the shore locked', () => {
    const p = fresh();
    expect(getLocationStatus(locationsById.hearth, p)).toBe(LOCATION_STATUS.AVAILABLE);
    expect(getLocationStatus(locationsById['reed-shore'], p)).toBe(LOCATION_STATUS.LOCKED);
  });

  it('unlocks the shore after meeting the storyteller and completes it with the chapter', () => {
    const met = { ...fresh(), completedObjectives: ['chapter-1:meet-storyteller'] };
    expect(getLocationStatus(locationsById.hearth, met)).toBe(LOCATION_STATUS.COMPLETED);
    expect(getLocationStatus(locationsById['reed-shore'], met)).toBe(LOCATION_STATUS.AVAILABLE);
    const done = { ...met, completedChapters: ['chapter-1'] };
    expect(getLocationStatus(locationsById['reed-shore'], done)).toBe(LOCATION_STATUS.COMPLETED);
  });

  it('keeps unreleased chapters locked regardless of progress', () => {
    const everything = { ...fresh(), completedChapters: ['chapter-1'], discoveredEntries: ['a', 'b', 'c'] };
    expect(getLocationStatus(locationsById['future-1'], everything)).toBe(LOCATION_STATUS.LOCKED);
  });
});

describe('location data', () => {
  it('has valid references and positions', () => {
    for (const location of locations) {
      for (const id of location.connections) expect(locationsById[id], `${location.id} -> ${id}`).toBeTruthy();
      if (location.chapterId) expect(chaptersById[location.chapterId]).toBeTruthy();
      if (location.inspiredByEntryId) expect(getEntryById(location.inspiredByEntryId)).toBeTruthy();
      expect(location.position.x).toBeGreaterThanOrEqual(0);
      expect(location.position.x).toBeLessThanOrEqual(100);
      expect(location.position.y).toBeGreaterThanOrEqual(0);
      expect(location.position.y).toBeLessThanOrEqual(100);
    }
  });

  it('marks every location as fictional (no invented real sacred places)', () => {
    expect(locations.every((l) => l.isFictional === true)).toBe(true);
  });
});
