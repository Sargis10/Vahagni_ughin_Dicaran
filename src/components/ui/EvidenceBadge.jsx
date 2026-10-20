import { evidenceById, verificationLabels } from '../../i18n/hy.js';

export function EvidenceBadge({ type }) {
  const evidence = evidenceById[type];
  if (!evidence) return null;
  return <span className={`badge badge--evidence badge--${type}`}>{evidence.label}</span>;
}

export function VerificationBadge({ status }) {
  const verification = verificationLabels[status];
  if (!verification) return null;
  return <span className={`badge badge--${verification.tone}`}>{verification.label}</span>;
}
