import { describe, expect, it } from 'vitest';
import {
  createInitialProgress,
  discoverEntry,
  getLevel,
  grantReward,
  reduceProgress,
} from '../src/progress/rules.js';
import { CURRENT_VERSION, parseStored, sanitizeProgress, serialize } from '../src/progress/storage.js';

describe('rewards', () => {
  it('grants a reward only once per id', () => {
    let state = createInitialProgress();
    state = grantReward(state, 'r1', { xp: 10, badge: 'b1' });
    const again = grantReward(state, 'r1', { xp: 10, badge: 'b1' });
    expect(again).toBe(state);
    expect(state.xp).toBe(10);
    expect(state.badges).toEqual(['b1']);
  });

  it('ignores negative xp', () => {
    expect(grantReward(createInitialProgress(), 'r', { xp: -50 }).xp).toBe(0);
  });

  it('discovering an entry twice gives xp once', () => {
    let state = discoverEntry(createInitialProgress(), 'vahagn');
    const xp = state.xp;
    state = discoverEntry(state, 'vahagn');
    expect(state.xp).toBe(xp);
    expect(state.discoveredEntries).toEqual(['vahagn']);
  });

  it('reducer returns the same object for unknown actions', () => {
    const state = createInitialProgress();
    expect(reduceProgress(state, { type: 'nope' })).toBe(state);
  });

  it('completing a chapter twice does not duplicate', () => {
    let state = reduceProgress(createInitialProgress(), {
      type: 'complete-chapter',
      chapterId: 'c1',
      reward: { xp: 50, badge: 'b' },
    });
    state = reduceProgress(state, { type: 'complete-chapter', chapterId: 'c1', reward: { xp: 50, badge: 'b' } });
    expect(state.completedChapters).toEqual(['c1']);
    expect(state.xp).toBe(50);
  });
});

describe('levels', () => {
  it('computes level and progress within the level', () => {
    expect(getLevel(0).level).toBe(1);
    expect(getLevel(40).level).toBe(2);
    expect(getLevel(70).progress).toBeCloseTo(0.5);
    expect(getLevel(100000).next).toBeNull();
  });
});

describe('storage parsing', () => {
  it('returns a fresh state when nothing is stored', () => {
    expect(parseStored(null).status).toBe('new');
  });

  it('round-trips saved progress', () => {
    const state = grantReward(createInitialProgress(), 'r', { xp: 7 });
    const { progress, status } = parseStored(serialize(state));
    expect(status).toBe('loaded');
    expect(progress).toEqual(state);
  });

  it('recovers from malformed JSON', () => {
    expect(parseStored('{not json').status).toBe('recovered');
  });

  it('recovers from unknown future versions and missing data', () => {
    expect(parseStored(JSON.stringify({ version: CURRENT_VERSION + 1, data: {} })).status).toBe('recovered');
    expect(parseStored(JSON.stringify({ version: CURRENT_VERSION })).status).toBe('recovered');
    expect(parseStored('"just a string"').status).toBe('recovered');
  });

  it('sanitizes wrong field types', () => {
    const clean = sanitizeProgress({ xp: 'lots', badges: [1, 'ok'], discoveredEntries: 'x', rewardsGranted: ['a', 'a'] });
    expect(clean.xp).toBe(0);
    expect(clean.badges).toEqual([]);
    expect(clean.discoveredEntries).toEqual([]);
    expect(clean.rewardsGranted).toEqual(['a']);
  });
});
