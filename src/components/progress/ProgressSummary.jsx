import hy from '../../i18n/hy.js';
import { chapters } from '../../content/chapters.js';
import { entries } from '../../content/index.js';
import { getLevel } from '../../progress/rules.js';
import { useProgress } from '../../progress/ProgressContext.jsx';

export function ProgressSummary({ compact = false }) {
  const { progress } = useProgress();
  const t = hy.progressSummary;
  const level = getLevel(progress.xp);
  const percent = Math.round(level.progress * 100);

  return (
    <div className={`progress-summary${compact ? ' progress-summary--compact' : ''}`}>
      <div className="progress-summary__level">
        <span className="progress-summary__level-number" aria-hidden="true">
          {level.level}
        </span>
        <div className="progress-summary__level-text">
          <p className="progress-summary__label">{t.level(level.level)}</p>
          <div
            className="meter"
            role="progressbar"
            aria-label={t.levelProgress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
            aria-valuetext={level.next === null ? t.maxLevel : t.toNext(progress.xp, level.next)}
          >
            <span className="meter__fill" style={{ width: `${percent}%` }} />
          </div>
          <p className="progress-summary__hint">
            {level.next === null ? t.maxLevel : t.toNext(progress.xp, level.next)}
          </p>
        </div>
      </div>
      <dl className="progress-summary__stats">
        <div>
          <dt>{t.xp}</dt>
          <dd>{progress.xp}</dd>
        </div>
        <div>
          <dt>{t.chapters}</dt>
          <dd>
            {progress.completedChapters.length}/{chapters.length}
          </dd>
        </div>
        <div>
          <dt>{t.discovered}</dt>
          <dd>
            {progress.discoveredEntries.length}/{entries.length}
          </dd>
        </div>
        <div>
          <dt>{t.badges}</dt>
          <dd>{progress.badges.length}</dd>
        </div>
      </dl>
    </div>
  );
}
