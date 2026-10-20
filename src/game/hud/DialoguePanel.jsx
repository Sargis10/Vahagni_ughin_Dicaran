import { useEffect, useRef } from 'react';
import hy from '../../i18n/hy.js';
import { EvidenceBadge } from '../../components/ui/EvidenceBadge.jsx';
import { SourceRefs } from './SourceRefs.jsx';

export function DialoguePanel({ speaker, line, index, total, onNext, onClose }) {
  const t = hy.play;
  const next = useRef(null);
  const isLast = index === total - 1;

  useEffect(() => {
    next.current?.focus({ preventScroll: true });
  }, [index]);

  return (
    <section className="hud-dialogue hud-panel" role="dialog" aria-modal="false" aria-labelledby="dialogue-speaker">
      <header className="hud-dialogue__header">
        <h2 id="dialogue-speaker" className="hud-dialogue__speaker">
          {speaker.name}
        </h2>
        <span className="hud-dialogue__count" aria-label={t.lineOf(index + 1, total)}>
          {index + 1} / {total}
        </span>
      </header>
      <div className="hud-dialogue__line" aria-live="polite">
        <EvidenceBadge type={line.evidence} />
        <p className="hud-dialogue__text">{line.text}</p>
        <SourceRefs refs={line.sourceRefs} />
      </div>
      <div className="hud-dialogue__actions">
        <button type="button" className="button button--ghost" onClick={onClose}>
          {t.closeDialogue}
        </button>
        <button ref={next} type="button" className="button button--primary" onClick={onNext}>
          {isLast ? t.finishDialogue : t.nextLine}
        </button>
      </div>
    </section>
  );
}
