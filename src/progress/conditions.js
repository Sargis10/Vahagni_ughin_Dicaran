/** Evaluates a declarative unlock/complete condition against a progress state. */
export function checkCondition(condition, progress) {
  if (!condition) return false;
  if (condition.always) return true;
  if (condition.never) return false;
  if (condition.chapter) return progress.completedChapters.includes(condition.chapter);
  if (condition.objective) return (progress.completedObjectives ?? []).includes(condition.objective);
  if (Number.isInteger(condition.discovered)) return progress.discoveredEntries.length >= condition.discovered;
  if (Array.isArray(condition.all)) return condition.all.every((c) => checkCondition(c, progress));
  if (Array.isArray(condition.any)) return condition.any.some((c) => checkCondition(c, progress));
  return false;
}

export const LOCATION_STATUS = {
  LOCKED: 'locked',
  AVAILABLE: 'available',
  COMPLETED: 'completed',
};

export function getLocationStatus(location, progress) {
  if (location.isUnreleased) return LOCATION_STATUS.LOCKED;
  if (checkCondition(location.completeWhen, progress)) return LOCATION_STATUS.COMPLETED;
  if (checkCondition(location.unlockWhen, progress)) return LOCATION_STATUS.AVAILABLE;
  return LOCATION_STATUS.LOCKED;
}
