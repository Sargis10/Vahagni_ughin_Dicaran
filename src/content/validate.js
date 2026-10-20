import { ENTRY_KINDS, EVIDENCE, EVIDENCE_IDS, VERIFICATION_IDS } from './evidence.js';

function findDuplicates(values) {
  const seen = new Set();
  const duplicates = new Set();
  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }
  return [...duplicates];
}

/**
 * Checks the content rules that keep fact and fiction apart. Returns a list of
 * human-readable error strings; an empty list means the content is valid.
 */
export function validateContent({ sources, entries }) {
  const errors = [];
  const sourceIds = new Set(sources.map((source) => source.id));
  const entryIds = new Set(entries.map((entry) => entry.id));

  for (const id of findDuplicates(sources.map((s) => s.id))) errors.push(`duplicate source id "${id}"`);
  for (const id of findDuplicates(entries.map((e) => e.id))) errors.push(`duplicate entry id "${id}"`);
  for (const slug of findDuplicates(entries.map((e) => e.slug))) errors.push(`duplicate entry slug "${slug}"`);

  for (const source of sources) {
    if (!source.title) errors.push(`source "${source.id}" has no title`);
    if (!VERIFICATION_IDS.includes(source.verification?.status)) {
      errors.push(`source "${source.id}" has unknown verification status`);
    }
  }

  for (const entry of entries) {
    const where = `entry "${entry.id}"`;
    if (!entry.name) errors.push(`${where} has no name`);
    if (!ENTRY_KINDS.includes(entry.kind)) errors.push(`${where} has unknown kind "${entry.kind}"`);
    if (!EVIDENCE_IDS.includes(entry.evidenceType)) {
      errors.push(`${where} has unknown evidence type "${entry.evidenceType}"`);
    }
    if (!/^[a-z0-9-]+$/.test(entry.slug ?? '')) errors.push(`${where} has invalid slug`);

    for (const relatedId of entry.relatedIds ?? []) {
      if (!entryIds.has(relatedId)) errors.push(`${where} links to missing entry "${relatedId}"`);
    }

    const claimIds = new Set();
    for (const claim of entry.claims ?? []) {
      const at = `${where} claim "${claim.id}"`;
      if (claimIds.has(claim.id)) errors.push(`${at} is duplicated`);
      claimIds.add(claim.id);
      if (!claim.text) errors.push(`${at} has no text`);
      if (!EVIDENCE_IDS.includes(claim.evidenceType)) errors.push(`${at} has unknown evidence type`);

      for (const sourceId of claim.sourceIds ?? []) {
        if (!sourceIds.has(sourceId)) errors.push(`${at} cites missing source "${sourceId}"`);
      }

      const needsSource =
        claim.evidenceType === EVIDENCE.PRIMARY || claim.evidenceType === EVIDENCE.SCHOLARLY;
      if (needsSource && !(claim.sourceIds?.length > 0)) {
        errors.push(`${at} is presented as evidence but cites no source`);
      }
      if (entry.evidenceType === EVIDENCE.FICTIONAL && claim.evidenceType !== EVIDENCE.FICTIONAL) {
        errors.push(`${at} is non-fictional inside a fictional entry`);
      }
    }

    if (entry.evidenceType !== EVIDENCE.FICTIONAL && entry.evidenceType !== EVIDENCE.NEEDS_RESEARCH) {
      const hasSourcedClaim = (entry.claims ?? []).some((claim) => claim.sourceIds?.length > 0);
      if (!hasSourcedClaim) errors.push(`${where} is marked as evidence but has no sourced claim`);
    }
  }

  return errors;
}
