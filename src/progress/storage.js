import { createInitialProgress } from './rules.js';

export const STORAGE_KEY = 'vahagni-ughin.progress';
export const BACKUP_KEY = 'vahagni-ughin.progress.backup';
export const CURRENT_VERSION = 2;

// Each entry upgrades data from version N to N + 1.
// v1 → v2: chapter objectives, quiz answers and choices were added.
export const migrations = {
  1: (data) => ({
    ...data,
    completedObjectives: [],
    quizAnswers: {},
    choices: {},
  }),
};

function isStringArray(value) {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function uniqueStrings(value) {
  return isStringArray(value) ? [...new Set(value)] : [];
}

function stringMap(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return Object.fromEntries(Object.entries(value).filter(([, v]) => typeof v === 'string'));
}

/** Coerces stored data into a valid progress object, dropping anything malformed. */
export function sanitizeProgress(data) {
  const initial = createInitialProgress();
  if (!data || typeof data !== 'object') return initial;
  const xp = Number.isFinite(data.xp) && data.xp >= 0 ? Math.floor(data.xp) : 0;
  return {
    ...initial,
    xp,
    badges: uniqueStrings(data.badges),
    discoveredEntries: uniqueStrings(data.discoveredEntries),
    completedChapters: uniqueStrings(data.completedChapters),
    completedObjectives: uniqueStrings(data.completedObjectives),
    quizAnswers: stringMap(data.quizAnswers),
    choices: stringMap(data.choices),
    rewardsGranted: uniqueStrings(data.rewardsGranted),
  };
}

export function migrate(data, fromVersion) {
  let version = fromVersion;
  let current = data;
  while (version < CURRENT_VERSION) {
    const step = migrations[version];
    if (!step) throw new Error(`No migration from version ${version}`);
    current = step(current);
    version += 1;
  }
  return current;
}

/**
 * Parses a raw stored string. Returns `{ progress, status }` where status is one of
 * 'new' | 'loaded' | 'migrated' | 'recovered'. Never throws.
 */
export function parseStored(raw) {
  if (raw === null || raw === undefined || raw === '') {
    return { progress: createInitialProgress(), status: 'new' };
  }
  try {
    const parsed = JSON.parse(raw);
    const version = parsed?.version;
    if (!Number.isInteger(version) || version < 1 || version > CURRENT_VERSION || !parsed.data) {
      return { progress: createInitialProgress(), status: 'recovered' };
    }
    const data = version === CURRENT_VERSION ? parsed.data : migrate(parsed.data, version);
    return {
      progress: sanitizeProgress(data),
      status: version === CURRENT_VERSION ? 'loaded' : 'migrated',
    };
  } catch {
    return { progress: createInitialProgress(), status: 'recovered' };
  }
}

export function serialize(progress) {
  return JSON.stringify({ version: CURRENT_VERSION, savedAt: new Date().toISOString(), data: progress });
}

function getStorage() {
  try {
    const storage = window.localStorage;
    const probe = '__vahagni_probe__';
    storage.setItem(probe, '1');
    storage.removeItem(probe);
    return storage;
  } catch {
    return null;
  }
}

/** Loads progress from localStorage; keeps a backup copy of unreadable data instead of deleting it. */
export function loadProgress() {
  const storage = getStorage();
  if (!storage) return { progress: createInitialProgress(), status: 'unavailable' };
  const raw = storage.getItem(STORAGE_KEY);
  const result = parseStored(raw);
  if (result.status === 'recovered') {
    try {
      storage.setItem(BACKUP_KEY, raw);
    } catch {
      // Backup is best-effort.
    }
  }
  if (result.status === 'migrated' || result.status === 'recovered') saveProgress(result.progress);
  return result;
}

export function saveProgress(progress) {
  const storage = getStorage();
  if (!storage) return false;
  try {
    storage.setItem(STORAGE_KEY, serialize(progress));
    return true;
  } catch {
    return false;
  }
}
