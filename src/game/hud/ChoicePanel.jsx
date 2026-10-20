import { useEffect, useRef } from 'react';
import hy from '../../i18n/hy.js';
import { badgesById } from '../../content/badges.js';
import { EvidenceBadge } from '../../components/ui/EvidenceBadge.jsx';

export function ChoicePanel({ choice, onChoose }) {
  const t = hy.play.choice;
  const first = useRef(null);
  useEffect(() => {
    first.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div className="hud-overlay" role="dialog" aria-modal="true" aria-labelledby="choice-title">
      <section className="hud-choice hud-panel">
        <p className="hud-fragment__kicker">{t.kicker}</p>
        <h2 id="choice-title">{choice.question}</h2>
        <EvidenceBadge type={choice.evidence} />
        <p className="muted">{t.lead}</p>
        <ul className="hud-choice__options" role="list">
          {choice.options.map((option, index) => (
            <li key={option.id}>
              <button
                ref={index === 0 ? first : undefined}
                type="button"
                className="hud-choice__option"
                onClick={() => onChoose(option)}
              >
                <strong>{option.title}</strong>
                <span>{option.text}</span>
                <span className="hud-choice__badge">
                  {t.badge}՝ «{badgesById[option.badge]?.name}»
                </span>
              </button>
            </li>
          ))}
        </ul>
        <p className="hud-refs">{t.final}</p>
      </section>
    </div>
  );
}
