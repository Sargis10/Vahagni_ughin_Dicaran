import { useEffect, useRef } from 'react';
import hy from '../../i18n/hy.js';
import { EvidenceBadge } from '../../components/ui/EvidenceBadge.jsx';
import { sourcesById } from '../../content/sources.js';
import { SourceRefs } from './SourceRefs.jsx';

export function FragmentCard({ fragment, index, total, onClose }) {
  const t = hy.play.fragment;
  const button = useRef(null);
  useEffect(() => {
    button.current?.focus({ preventScroll: true });
  }, []);

  const quoteSource = fragment.quote ? sourcesById[fragment.quote.sourceId] : null;

  return (
    <div className="hud-overlay hud-overlay--soft" role="dialog" aria-modal="true" aria-labelledby="fragment-title">
      <article className="hud-fragment hud-panel">
        <p className="hud-fragment__kicker">{t.kicker(index + 1, total)}</p>
        <h2 id="fragment-title">{fragment.title}</h2>
        <EvidenceBadge type={fragment.evidence} />
        <p className="hud-fragment__text">{fragment.text}</p>
        {fragment.quote && (
          <figure className="hud-fragment__quote">
            <blockquote lang={fragment.quote.lang}>«{fragment.quote.text}»</blockquote>
            <figcaption>
              {t.quoteFrom} {quoteSource?.shortName}, {fragment.quote.locator}
            </figcaption>
          </figure>
        )}
        {fragment.note && <p className="hud-fragment__note">{fragment.note}</p>}
        <SourceRefs refs={fragment.sourceRefs} />
        <p className="hud-fragment__fiction">
          <EvidenceBadge type="fictional" /> {t.fictionNote}
        </p>
        <div className="hud-fragment__actions">
          <a className="button button--ghost" href={`/archive/${fragment.entrySlug}`} target="_blank" rel="noopener noreferrer">
            {t.openEntry}
          </a>
          <button ref={button} type="button" className="button button--primary" onClick={onClose}>
            {t.keep}
          </button>
        </div>
      </article>
    </div>
  );
}
