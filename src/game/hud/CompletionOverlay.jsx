import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import hy from '../../i18n/hy.js';
import { paths } from '../../app/navigation.js';
import { badgesById } from '../../content/badges.js';
import { getEntryBySlug } from '../../content/index.js';
import { sourcesById } from '../../content/sources.js';
import { getLevel } from '../../progress/rules.js';
import { BadgeMedal } from '../../components/progress/BadgeMedal.jsx';

export function CompletionOverlay({ chapter, script, progress, choiceId, onStay, onReplay }) {
  const t = hy.play.completion;
  const heading = useRef(null);
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, []);

  const chosen = script.choice.options.find((option) => option.id === choiceId);
  const earned = [script.rewards.chapter.badge, chosen?.badge, script.rewards.perfectQuiz.badge]
    .filter((id) => id && progress.badges.includes(id))
    .map((id) => badgesById[id]);
  const level = getLevel(progress.xp);
  const entries = script.completion.learnedEntrySlugs.map(getEntryBySlug).filter(Boolean);

  return (
    <div className="hud-overlay" role="dialog" aria-modal="true" aria-labelledby="complete-title">
      <section className="hud-complete hud-panel">
        <p className="hud-fragment__kicker">{hy.map.chapterLabel(chapter.number)}</p>
        <h2 id="complete-title" ref={heading} tabIndex={-1}>
          {t.title}
        </h2>
        <p className="muted">{chosen ? t.choiceSummary(chosen.title) : t.lead}</p>

        <dl className="hud-complete__stats">
          <div>
            <dt>{t.xp}</dt>
            <dd>{progress.xp}</dd>
          </div>
          <div>
            <dt>{t.level}</dt>
            <dd>{level.level}</dd>
          </div>
          <div>
            <dt>{t.badges}</dt>
            <dd>{progress.badges.length}</dd>
          </div>
        </dl>

        {earned.length > 0 && (
          <ul className="hud-complete__badges" role="list">
            {earned.map((badge) => (
              <li key={badge.id}>
                <BadgeMedal badge={badge} earned size={44} />
                <span>
                  <strong>{badge.name}</strong>
                  <span className="muted">{badge.description}</span>
                </span>
              </li>
            ))}
          </ul>
        )}

        <div className="hud-complete__learn">
          <h3>{t.learnTitle}</h3>
          <ul role="list">
            {entries.map((entry) => (
              <li key={entry.id}>
                <Link to={`/archive/${entry.slug}`}>{entry.name}</Link>
              </li>
            ))}
            {script.completion.sourceIds.map((id) => (
              <li key={id}>
                <Link to={`${paths.sources}#source-${id}`}>{sourcesById[id]?.shortName}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hud-complete__actions">
          <button type="button" className="button button--ghost" onClick={onReplay}>
            {t.replay}
          </button>
          <button type="button" className="button button--ghost" onClick={onStay}>
            {t.stay}
          </button>
          <Link className="button button--primary" to={paths.map}>
            {t.toMap}
          </Link>
        </div>
      </section>
    </div>
  );
}
