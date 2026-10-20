// Pure progression rules. No React, no storage: every function takes a state and returns a new one.

export const XP = {
  DISCOVER_ENTRY: 5,
};

export const LEVELS = [0, 40, 100, 180, 280];

export function createInitialProgress() {
  return {
    xp: 0,
    badges: [],
    discoveredEntries: [],
    completedChapters: [],
    rewardsGranted: [],
  };
}

function addUnique(list, value) {
  return list.includes(value) ? list : [...list, value];
}

/**
 * Grants a reward exactly once. `rewardId` is the idempotency key: granting the same
 * id again returns the state unchanged, so replaying content never duplicates rewards.
 */
export function grantReward(state, rewardId, { xp = 0, badge } = {}) {
  if (state.rewardsGranted.includes(rewardId)) return state;
  return {
    ...state,
    xp: state.xp + Math.max(0, xp),
    badges: badge ? addUnique(state.badges, badge) : state.badges,
    rewardsGranted: [...state.rewardsGranted, rewardId],
  };
}

export function discoverEntry(state, entryId) {
  if (state.discoveredEntries.includes(entryId)) return state;
  const next = { ...state, discoveredEntries: [...state.discoveredEntries, entryId] };
  return grantReward(next, `discover:${entryId}`, { xp: XP.DISCOVER_ENTRY });
}

export function completeChapter(state, chapterId, reward) {
  const next = { ...state, completedChapters: addUnique(state.completedChapters, chapterId) };
  return grantReward(next, `chapter:${chapterId}`, reward);
}

export function getLevel(xp) {
  let level = 1;
  LEVELS.forEach((threshold, index) => {
    if (xp >= threshold) level = index + 1;
  });
  const current = LEVELS[level - 1];
  const next = LEVELS[level] ?? null;
  return {
    level,
    current,
    next,
    progress: next === null ? 1 : (xp - current) / (next - current),
  };
}

export function reduceProgress(state, action) {
  switch (action.type) {
    case 'discover-entry':
      return discoverEntry(state, action.entryId);
    case 'complete-chapter':
      return completeChapter(state, action.chapterId, action.reward);
    case 'grant-reward':
      return grantReward(state, action.rewardId, action.reward);
    case 'reset':
      return createInitialProgress();
    default:
      return state;
  }
}
