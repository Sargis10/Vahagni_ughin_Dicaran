export const EVIDENCE = {
  PRIMARY: 'primary-source',
  SCHOLARLY: 'scholarly-interpretation',
  FICTIONAL: 'fictional',
  NEEDS_RESEARCH: 'needs-research',
};

export const EVIDENCE_IDS = Object.values(EVIDENCE);

// How far a source record itself (bibliographic data, access, locator) has been checked.
export const VERIFICATION = {
  VERIFIED: 'verified',
  PARTIAL: 'partially-verified',
  UNVERIFIED: 'unverified',
};

export const VERIFICATION_IDS = Object.values(VERIFICATION);

export const ENTRY_KINDS = ['character', 'story', 'concept'];
