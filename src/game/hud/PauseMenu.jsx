import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import hy from '../../i18n/hy.js';
import { paths } from '../../app/navigation.js';

export function ControlsHelp() {
  const t = hy.play.controls;
  return (
    <div className="controls-help">
      <section>
        <h3>{t.keyboardTitle}</h3>
        <dl>
          {t.keyboard.map(([keys, action]) => (
            <div key={action}>
              <dt>
                {keys.map((key) => (
                  <kbd key={key}>{key}</kbd>
                ))}
              </dt>
              <dd>{action}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section>
        <h3>{t.touchTitle}</h3>
        <ul>
          {t.touch.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export function PauseMenu({ onResume, onRestart, quality, onToggleQuality, canRestart }) {
  const t = hy.play;
  const resume = useRef(null);
  useEffect(() => {
    resume.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div className="hud-overlay" role="dialog" aria-modal="true" aria-labelledby="pause-title">
      <div className="hud-pause hud-panel">
        <h2 id="pause-title">{t.pauseTitle}</h2>
        <ControlsHelp />
        <div className="hud-pause__row">
          <button type="button" className="button button--secondary" onClick={onToggleQuality} aria-pressed={quality === 'high'}>
            {t.quality}: {quality === 'high' ? t.qualityHigh : t.qualityLow}
          </button>
          {canRestart && (
            <button type="button" className="button button--ghost" onClick={onRestart}>
              {t.restart}
            </button>
          )}
        </div>
        <div className="hud-pause__actions">
          <Link className="button button--ghost" to={paths.map}>
            {t.exitToMap}
          </Link>
          <button ref={resume} type="button" className="button button--primary" onClick={onResume}>
            {t.resume}
          </button>
        </div>
      </div>
    </div>
  );
}
