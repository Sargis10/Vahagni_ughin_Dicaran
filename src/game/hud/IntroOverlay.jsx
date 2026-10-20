import { useEffect, useRef, useState } from 'react';
import hy from '../../i18n/hy.js';
import { EvidenceBadge } from '../../components/ui/EvidenceBadge.jsx';
import { EVIDENCE_IDS } from '../../content/evidence.js';
import { SourceRefs } from './SourceRefs.jsx';

export function IntroOverlay({ chapterTitle, chapterSubtitle, slides, onDone, ready }) {
  const t = hy.play;
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const isLast = index === slides.length - 1;
  const button = useRef(null);

  useEffect(() => {
    button.current?.focus({ preventScroll: true });
  }, [index, ready]);

  return (
    <div className="hud-overlay" role="dialog" aria-modal="true" aria-labelledby="intro-title">
      <div className="hud-intro hud-panel">
        <p className="eyebrow">{chapterSubtitle}</p>
        <h2 id="intro-title" className="hud-intro__title">
          {chapterTitle}
        </h2>
        <ol className="hud-intro__steps" aria-label={t.introSteps}>
          {slides.map((item, i) => (
            <li key={item.id} aria-current={i === index ? 'step' : undefined} className={i <= index ? 'is-active' : ''} />
          ))}
        </ol>
        <div className="hud-intro__slide" aria-live="polite">
          <EvidenceBadge type={slide.evidence} />
          <h3>{slide.title}</h3>
          <p>{slide.text}</p>
          <SourceRefs refs={slide.sourceRefs} />
          {slide.labelsDemo && (
            <ul className="hud-intro__labels" role="list">
              {EVIDENCE_IDS.map((id) => (
                <li key={id}>
                  <EvidenceBadge type={id} />
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="hud-intro__actions">
          {index > 0 && (
            <button type="button" className="button button--ghost" onClick={() => setIndex(index - 1)}>
              {t.back}
            </button>
          )}
          <button
            ref={button}
            type="button"
            className="button button--primary"
            disabled={isLast && !ready}
            onClick={() => (isLast ? onDone() : setIndex(index + 1))}
          >
            {isLast ? (ready ? t.startPlaying : t.loading) : t.next}
          </button>
        </div>
      </div>
    </div>
  );
}
