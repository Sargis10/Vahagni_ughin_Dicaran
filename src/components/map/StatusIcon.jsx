import { LOCATION_STATUS } from '../../progress/conditions.js';

export function StatusIcon({ status }) {
  if (status === LOCATION_STATUS.COMPLETED) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M6 12.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (status === LOCATION_STATUS.LOCKED) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="6.5" y="11" width="11" height="8" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9 11V8.5a3 3 0 0 1 6 0V11" fill="none" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 4l3 7 7 1-7 1-3 7-3-7-7-1 7-1z" fill="currentColor" />
    </svg>
  );
}
