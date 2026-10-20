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
    completedObjectives: [],
    quizAnswers: {},
    choices: {},
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

export function objectiveKey(chapterId, objectiveId) {
  return `${chapterId}:${objectiveId}`;
}

export function completeObjective(state, chapterId, objectiveId, reward) {
  const key = objectiveKey(chapterId, objectiveId);
  const next = state.completedObjectives.includes(key)
    ? state
    : { ...state, completedObjectives: [...state.completedObjectives, key] };
  return grantReward(next, `objective:${key}`, reward);
}

/** Records an answer. Only the first correct answer to a question earns its reward. */
export function answerQuestion(state, questionKey, optionId, isCorrect, reward) {
  const next = { ...state, quizAnswers: { ...state.quizAnswers, [questionKey]: optionId } };
  return isCorrect ? grantReward(next, `quiz:${questionKey}`, reward) : next;
}

/** Choices are final for a playthrough; the badge for the chosen option is granted once. */
export function makeChoice(state, choiceKey, optionId, reward) {
  if (state.choices[choiceKey]) return state;
  const next = { ...state, choices: { ...state.choices, [choiceKey]: optionId } };
  return grantReward(next, `choice:${choiceKey}:${optionId}`, reward);
}

export function completeChapter(state, chapterId, reward) {
  const next = { ...state, completedChapters: addUnique(state.completedChapters, chapterId) };
  return grantReward(next, `chapter:${chapterId}`, reward);
}

/**
 * Clears a chapter's playthrough state so it can be replayed. Earned XP, badges and the
 * reward ledger are kept, so replaying cannot farm rewards.
 */
export function resetChapter(state, chapterId) {
  const prefix = `${chapterId}:`;
  const keep = (key) => !key.startsWith(prefix);
  return {
    ...state,
    completedObjectives: state.completedObjectives.filter(keep),
    quizAnswers: Object.fromEntries(Object.entries(state.quizAnswers).filter(([key]) => keep(key))),
    choices: Object.fromEntries(Object.entries(state.choices).filter(([key]) => keep(key))),
  };
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
    case 'complete-objective':
      return completeObjective(state, action.chapterId, action.objectiveId, action.reward);
    case 'answer-question':
      return answerQuestion(state, action.questionKey, action.optionId, action.isCorrect, action.reward);
    case 'make-choice':
      return makeChoice(state, action.choiceKey, action.optionId, action.reward);
    case 'complete-chapter':
      return completeChapter(state, action.chapterId, action.reward);
    case 'reset-chapter':
      return resetChapter(state, action.chapterId);
    case 'grant-reward':
      return grantReward(state, action.rewardId, action.reward);
    case 'reset':
      return createInitialProgress();
    default:
      return state;
  }
}
