import { sources, sourcesById } from './sources.js';
import { mythologyEntries } from './entries/mythology.js';
import { fictionalEntries } from './entries/fictional.js';

export { sources, sourcesById };

export const entries = [...mythologyEntries, ...fictionalEntries];

const entriesById = Object.fromEntries(entries.map((entry) => [entry.id, entry]));
const entriesBySlug = Object.fromEntries(entries.map((entry) => [entry.slug, entry]));

export function getEntryById(id) {
  return entriesById[id] ?? null;
}

export function getEntryBySlug(slug) {
  return entriesBySlug[slug] ?? null;
}

/** Unique sources cited anywhere in an entry, in first-cited order. */
export function getSourcesForEntry(entry) {
  const ids = [...new Set((entry.claims ?? []).flatMap(getClaimSourceIds))];
  return ids.map((id) => sourcesById[id]).filter(Boolean);
}

export function getClaimSourceIds(claim) {
  return [...new Set((claim.sourceRefs ?? []).map((ref) => ref.sourceId))];
}

export function getEntriesCitingSource(sourceId) {
  return entries.filter((entry) =>
    (entry.claims ?? []).some((claim) => getClaimSourceIds(claim).includes(sourceId)),
  );
}

export function getRelatedEntries(entry) {
  return (entry.relatedIds ?? []).map(getEntryById).filter(Boolean);
}
