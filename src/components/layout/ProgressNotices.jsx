import { useEffect } from 'react';
import hy from '../../i18n/hy.js';
import { badgesById } from '../../content/badges.js';
import { useProgress } from '../../progress/ProgressContext.jsx';

const TOAST_MS = 4500;

function Toast({ note, onDismiss }) {
  useEffect(() => {
    const timer = window.setTimeout(() => onDismiss(note.id), TOAST_MS);
    return () => window.clearTimeout(timer);
  }, [note.id, onDismiss]);

  const text =
    note.kind === 'xp'
      ? hy.notices.xp(note.amount)
      : hy.notices.badge(badgesById[note.badgeId]?.name ?? note.badgeId);

  return (
    <li className={`toast toast--${note.kind}`}>
      <span className="toast__mark" aria-hidden="true" />
      <span>{text}</span>
      <button type="button" className="toast__close" onClick={() => onDismiss(note.id)} aria-label={hy.notices.close}>
        ×
      </button>
    </li>
  );
}

export function ProgressNotices() {
  const { notifications, dismissNotification, storageStatus, acknowledgeStorageStatus } = useProgress();
  const banner = hy.notices.storage[storageStatus];

  return (
    <>
      {banner && (
        <div className="storage-banner" role="status">
          <div className="container storage-banner__inner">
            <p>{banner}</p>
            <button type="button" className="button button--ghost" onClick={acknowledgeStorageStatus}>
              {hy.notices.ok}
            </button>
          </div>
        </div>
      )}
      <ol className="toast-stack" aria-live="polite" aria-relevant="additions">
        {notifications.map((note) => (
          <Toast key={note.id} note={note} onDismiss={dismissNotification} />
        ))}
      </ol>
    </>
  );
}
