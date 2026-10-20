import { describe, expect, it } from 'vitest';
import { entries, sources, getSourcesForEntry } from '../src/content/index.js';
import { validateContent } from '../src/content/validate.js';
import { EVIDENCE, VERIFICATION } from '../src/content/evidence.js';

const baseSource = {
  id: 's1',
  kind: 'primary',
  title: 'T',
  verification: { status: VERIFICATION.VERIFIED },
};

function entry(overrides = {}) {
  return {
    id: 'e1',
    slug: 'e1',
    kind: 'character',
    name: 'Անուն',
    evidenceType: EVIDENCE.PRIMARY,
    claims: [{ id: 'c1', text: 'x', evidenceType: EVIDENCE.PRIMARY, sourceIds: ['s1'] }],
    ...overrides,
  };
}

describe('real content', () => {
  it('passes all content rules', () => {
    expect(validateContent({ sources, entries })).toEqual([]);
  });

  it('every non-fictional, researched claim cites an existing source', () => {
    for (const item of entries) {
      for (const claim of item.claims) {
        if (claim.evidenceType === EVIDENCE.PRIMARY || claim.evidenceType === EVIDENCE.SCHOLARLY) {
          expect(claim.sourceIds.length, `${item.id}/${claim.id}`).toBeGreaterThan(0);
        }
      }
    }
  });

  it('fictional entries contain only fictional claims', () => {
    for (const item of entries.filter((e) => e.evidenceType === EVIDENCE.FICTIONAL)) {
      expect(item.claims.every((c) => c.evidenceType === EVIDENCE.FICTIONAL)).toBe(true);
    }
  });

  it('resolves cited sources for an entry', () => {
    for (const item of entries) {
      const cited = new Set(item.claims.flatMap((c) => c.sourceIds));
      expect(getSourcesForEntry(item).map((s) => s.id).sort()).toEqual([...cited].sort());
    }
  });
});

describe('validateContent', () => {
  it('accepts a valid sourced entry', () => {
    expect(validateContent({ sources: [baseSource], entries: [entry()] })).toEqual([]);
  });

  it('rejects evidence claims without sources', () => {
    const bad = entry({ claims: [{ id: 'c1', text: 'x', evidenceType: EVIDENCE.SCHOLARLY, sourceIds: [] }] });
    const errors = validateContent({ sources: [baseSource], entries: [bad] });
    expect(errors.some((e) => e.includes('cites no source'))).toBe(true);
  });

  it('rejects citations of unknown sources', () => {
    const bad = entry({ claims: [{ id: 'c1', text: 'x', evidenceType: EVIDENCE.PRIMARY, sourceIds: ['nope'] }] });
    expect(validateContent({ sources: [baseSource], entries: [bad] }).join()).toContain('missing source');
  });

  it('rejects factual claims inside fictional entries', () => {
    const bad = entry({ evidenceType: EVIDENCE.FICTIONAL });
    expect(validateContent({ sources: [baseSource], entries: [bad] }).join()).toContain('inside a fictional');
  });

  it('rejects duplicate ids, unknown kinds and broken related links', () => {
    const errors = validateContent({
      sources: [baseSource],
      entries: [entry(), entry({ slug: 'other', kind: 'god', relatedIds: ['ghost'] })],
    });
    expect(errors.join('\n')).toMatch(/duplicate entry id/);
    expect(errors.join('\n')).toMatch(/unknown kind/);
    expect(errors.join('\n')).toMatch(/missing entry "ghost"/);
  });

  it('rejects unknown verification status', () => {
    const errors = validateContent({
      sources: [{ ...baseSource, verification: { status: 'maybe' } }],
      entries: [],
    });
    expect(errors.join()).toContain('verification status');
  });
});
