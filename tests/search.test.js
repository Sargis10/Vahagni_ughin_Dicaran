import { describe, expect, it } from 'vitest';
import { normalizeText, searchEntries } from '../src/content/search.js';

const items = [
  { id: 'a', kind: 'character', name: 'Վահագն', summary: 'Աստված', evidenceType: 'needs-research', claims: [] },
  { id: 'b', kind: 'story', name: 'Ծննդյան պատմություն', summary: 'Վահագնի մասին', evidenceType: 'primary-source', claims: [] },
  { id: 'c', kind: 'character', name: 'Ծեր պատմողը', summary: 'Խաղի կերպար', evidenceType: 'fictional', claims: [{ text: 'օջախ' }] },
];

describe('normalizeText', () => {
  it('lowercases Armenian and strips Armenian punctuation', () => {
    expect(normalizeText('«Ի՞նչ է»։')).toBe('ինչ է');
    expect(normalizeText('ՎԱՀԱԳՆ')).toBe('վահագն');
  });

  it('treats the ligature և as եւ', () => {
    expect(normalizeText('և')).toBe(normalizeText('եւ'));
  });
});

describe('searchEntries', () => {
  it('returns everything for an empty query', () => {
    expect(searchEntries(items).map((e) => e.id)).toEqual(['a', 'b', 'c']);
  });

  it('ranks name matches before text matches', () => {
    expect(searchEntries(items, { query: 'վահագն' }).map((e) => e.id)).toEqual(['a', 'b']);
  });

  it('is case- and punctuation-insensitive', () => {
    expect(searchEntries(items, { query: '«ՎԱՀԱԳՆ»' })[0].id).toBe('a');
  });

  it('searches claim text', () => {
    expect(searchEntries(items, { query: 'օջախ' }).map((e) => e.id)).toEqual(['c']);
  });

  it('filters by kind and evidence type', () => {
    expect(searchEntries(items, { kind: 'character' }).map((e) => e.id)).toEqual(['a', 'c']);
    expect(searchEntries(items, { evidence: ['fictional'] }).map((e) => e.id)).toEqual(['c']);
  });

  it('requires every word to match', () => {
    expect(searchEntries(items, { query: 'ծեր վահագն' })).toEqual([]);
  });
});
