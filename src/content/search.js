// Stress, exclamation, question and abbreviation marks sit inside words (Ի՞նչ), so they are removed.
const INTRA_WORD_MARKS = /[\u055B-\u055F]/g;
const PUNCTUATION = /[\u055A\u0589\u058A«»„“”"'.,:;!?()[\]{}\-–—․…]/g;

/** Lowercases and strips punctuation so «Ի՞նչ» matches "ինչ" and "և" matches "եւ". */
export function normalizeText(value) {
  return String(value ?? '')
    .normalize('NFC')
    .toLocaleLowerCase('hy')
    .replace(/\u0587/g, 'եւ')
    .replace(INTRA_WORD_MARKS, '')
    .replace(PUNCTUATION, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function entryHaystack(entry) {
  return normalizeText(
    [entry.name, ...(entry.altNames ?? []), entry.summary, ...(entry.claims ?? []).map((c) => c.text)].join(' '),
  );
}

/**
 * Filters entries by free-text query (every word must match), kind and evidence type.
 * Name matches are ranked before text-only matches; otherwise the original order is kept.
 */
export function searchEntries(entries, { query = '', kind = 'all', evidence = [] } = {}) {
  const words = normalizeText(query).split(' ').filter(Boolean);

  return entries
    .map((entry, index) => ({ entry, index }))
    .filter(({ entry }) => kind === 'all' || entry.kind === kind)
    .filter(({ entry }) => evidence.length === 0 || evidence.includes(entry.evidenceType))
    .map(({ entry, index }) => {
      if (words.length === 0) return { entry, index, rank: 0 };
      const haystack = entryHaystack(entry);
      if (!words.every((word) => haystack.includes(word))) return null;
      const name = normalizeText([entry.name, ...(entry.altNames ?? [])].join(' '));
      return { entry, index, rank: words.every((word) => name.includes(word)) ? 0 : 1 };
    })
    .filter(Boolean)
    .sort((a, b) => a.rank - b.rank || a.index - b.index)
    .map(({ entry }) => entry);
}
