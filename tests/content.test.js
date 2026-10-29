import { describe, expect, it } from 'vitest';
import { entries, sources, getSourcesForEntry, getEntryById } from '../src/content/index.js';
import { SONG_QUOTE } from '../src/content/entries/mythology.js';
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
    claims: [{ id: 'c1', text: 'x', evidenceType: EVIDENCE.PRIMARY, sourceRefs: [{ sourceId: 's1', locator: 'p. 1' }] }],
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
          expect(claim.sourceRefs.length, `${item.id}/${claim.id}`).toBeGreaterThan(0);
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
      const cited = new Set(item.claims.flatMap((c) => c.sourceRefs.map((r) => r.sourceId)));
      expect(getSourcesForEntry(item).map((s) => s.id).sort()).toEqual([...cited].sort());
    }
  });
});

describe('validateContent', () => {
  it('accepts a valid sourced entry', () => {
    expect(validateContent({ sources: [baseSource], entries: [entry()] })).toEqual([]);
  });

  it('rejects evidence claims without sources', () => {
    const bad = entry({ claims: [{ id: 'c1', text: 'x', evidenceType: EVIDENCE.SCHOLARLY, sourceRefs: [] }] });
    const errors = validateContent({ sources: [baseSource], entries: [bad] });
    expect(errors.some((e) => e.includes('cites no source'))).toBe(true);
  });

  it('rejects citations of unknown sources', () => {
    const bad = entry({ claims: [{ id: 'c1', text: 'x', evidenceType: EVIDENCE.PRIMARY, sourceRefs: [{ sourceId: 'nope' }] }] });
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

describe('research fidelity', () => {
  const researched = ['vahagn', 'astghik', 'anahit', 'aramazd', 'tigran-yervandyan', 'vahnuni-clan', 'ashtishat'];

  it('publishes every researched entry', () => {
    for (const id of researched) expect(getEntryById(id), id).not.toBeNull();
  });

  it('uses only the single verified quotation', () => {
    const quotes = entries.flatMap((e) => e.claims).filter((c) => c.quote);
    expect(quotes.length).toBeGreaterThan(0);
    for (const claim of quotes) {
      expect(claim.quote).toBe(SONG_QUOTE);
      expect(claim.evidenceType).toBe(EVIDENCE.PRIMARY);
    }
    expect(SONG_QUOTE.locator).toContain('էջ 85, տող 17');
  });

  it('never cites the unverified English translations', () => {
    const cited = new Set(entries.flatMap((e) => e.claims.flatMap((c) => c.sourceRefs.map((r) => r.sourceId))));
    expect(cited.has('khorenatsi-thomson')).toBe(false);
    expect(cited.has('agathangelos-thomson')).toBe(false);
  });

  it('publishes the Aramazd etymology as scholarly interpretation with Iranica sources', () => {
    const claim = getEntryById('aramazd').claims.find((c) => c.id === 'aramazd-etymology');
    expect(claim.evidenceType).toBe(EVIDENCE.SCHOLARLY);
    expect(claim.sourceRefs.map((r) => r.sourceId)).toEqual(
      expect.arrayContaining(['iranica-armenia-iii', 'iranica-armenia-iv', 'iranica-ahura-mazda']),
    );
  });

  it('does not flag claims cleared by the 2026-10-29 verification', () => {
    const flagged = entries.flatMap((e) => e.claims.filter((c) => c.requiresCheck).map((c) => c.id));
    expect(flagged).not.toEqual(expect.arrayContaining(['vahagn-thunder-war', 'astghik-beloved', 'aramazd-kund']));
    expect(flagged).toEqual([]);
  });

  it('uses the verified Վահունիք orthography', () => {
    const clan = getEntryById('vahnuni-clan');
    expect(clan.name).toBe('Վահունիներ');
    expect(clan.name).not.toMatch(/Վահնունի/);
    expect(clan.claims.find((c) => c.id === 'vahnuni-descent').text).toContain('Վահունիները');
    expect(getEntryById('vahagn').claims.find((c) => c.id === 'vahagn-vahnuni').text).toContain('Վահունիների');
  });

  it('attributes Petrosyan hypotheses to the author', () => {
    const story = getEntryById('vahagn-birth-tradition');
    const hypotheses = story.claims.filter((c) => c.id.startsWith('birth-song-petrosyan'));
    expect(hypotheses.length).toBeGreaterThan(0);
    for (const claim of hypotheses) {
      expect(claim.evidenceType).toBe(EVIDENCE.SCHOLARLY);
      expect(claim.text.startsWith('Արմեն Պետրոսյանը (2021)')).toBe(true);
    }
  });
});
