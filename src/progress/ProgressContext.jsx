import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { reduceProgress } from './rules.js';
import { STORAGE_KEY, loadProgress, parseStored, saveProgress } from './storage.js';

const ProgressContext = createContext(null);

let notificationCounter = 0;

function diffRewards(previous, next) {
  const notes = [];
  const xpGained = next.xp - previous.xp;
  const newBadges = next.badges.filter((badge) => !previous.badges.includes(badge));
  if (xpGained > 0) notes.push({ kind: 'xp', amount: xpGained });
  for (const badge of newBadges) notes.push({ kind: 'badge', badgeId: badge });
  return notes;
}

export function ProgressProvider({ children }) {
  const [initial] = useState(loadProgress);
  const [progress, setProgress] = useState(initial.progress);
  const [storageStatus, setStorageStatus] = useState(initial.status);
  const [notifications, setNotifications] = useState([]);
  const progressRef = useRef(initial.progress);

  const dismissNotification = useCallback((id) => {
    setNotifications((list) => list.filter((note) => note.id !== id));
  }, []);

  const dispatch = useCallback((action) => {
    const previous = progressRef.current;
    const next = reduceProgress(previous, action);
    if (next === previous) return previous;
    progressRef.current = next;
    setProgress(next);
    if (!saveProgress(next)) setStorageStatus('unavailable');
    if (!action.silent) {
      const notes = diffRewards(previous, next).map((note) => ({ ...note, id: ++notificationCounter }));
      if (notes.length) setNotifications((list) => [...list, ...notes].slice(-4));
    }
    return next;
  }, []);

  // Keep several open tabs in sync.
  useEffect(() => {
    function handleStorage(event) {
      if (event.key !== STORAGE_KEY) return;
      const { progress: next } = parseStored(event.newValue);
      progressRef.current = next;
      setProgress(next);
    }
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const value = useMemo(
    () => ({
      progress,
      dispatch,
      storageStatus,
      acknowledgeStorageStatus: () => setStorageStatus('loaded'),
      notifications,
      dismissNotification,
    }),
    [progress, dispatch, storageStatus, notifications, dismissNotification],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used inside <ProgressProvider>');
  return context;
}
