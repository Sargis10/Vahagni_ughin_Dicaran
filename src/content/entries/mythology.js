import { EVIDENCE } from '../evidence.js';

// Factual entries. Text here must come from the verified research notes; anything not yet
// verified stays `needs-research` and is shown as such, never as fact.
export const mythologyEntries = [
  {
    id: 'vahagn',
    slug: 'vahagn',
    kind: 'character',
    name: 'Վահագն',
    evidenceType: EVIDENCE.NEEDS_RESEARCH,
    summary: 'Նկարագրությունը կհրապարակվի աղբյուրներով ստուգելուց հետո։',
    claims: [],
    relatedIds: ['vahagn-birth-tradition'],
    chapterIds: ['chapter-1'],
  },
  {
    id: 'vahagn-birth-tradition',
    slug: 'vahagni-tsnund',
    kind: 'story',
    name: 'Վահագնի ծննդյան ավանդությունը',
    evidenceType: EVIDENCE.NEEDS_RESEARCH,
    summary: 'Պատմության ամփոփումը կհրապարակվի աղբյուրներով ստուգելուց հետո։',
    claims: [],
    relatedIds: ['vahagn'],
    chapterIds: ['chapter-1'],
  },
];
