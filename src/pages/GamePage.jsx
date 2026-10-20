import { lazy, Suspense, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import hy from '../i18n/hy.js';
import { paths } from '../app/navigation.js';
import { chapters, chaptersById } from '../content/chapters.js';
import { chaptersScripts } from '../game/chapters/chapter1.js';
import { useProgress } from '../progress/ProgressContext.jsx';
import { ButtonLink } from '../components/ui/Button.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { EvidenceBadge } from '../components/ui/EvidenceBadge.jsx';
import { PageTitle } from '../components/ui/PageTitle.jsx';
import { ControlsHelp } from '../game/hud/PauseMenu.jsx';

const GameView = lazy(() => import('../game/GameView.jsx'));

function detectWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

function GameLoading() {
  return (
    <div className="game-view game-view--loading" role="status">
      <p>{hy.play.loadingGame}</p>
    </div>
  );
}

function NoWebGL() {
  const t = hy.game;
  return (
    <section className="page-hero page-hero--full" aria-labelledby="page-title">
      <div className="container container--narrow page-hero__inner">
        <h1 id="page-title">{t.noWebglTitle}</h1>
        <p className="lead">{t.noWebglText}</p>
        <div className="button-row button-row--center">
          <ButtonLink to={paths.archive}>{t.openArchive}</ButtonLink>
          <ButtonLink to={paths.map} variant="secondary">
            {t.openMap}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

function GameLanding() {
  const t = hy.game;
  const { progress } = useProgress();
  return (
    <>
      <section className="page-hero" aria-labelledby="page-title">
        <div className="container container--narrow page-hero__inner">
          <span className="eyebrow">{t.eyebrow}</span>
          <h1 id="page-title">{t.title}</h1>
          <p className="lead">{t.lead}</p>
        </div>
      </section>
      <section className="section section--tight" aria-labelledby="chapters-title">
        <div className="container stack">
          <h2 id="chapters-title" className="section-title">
            {t.chaptersTitle}
          </h2>
          <ul className="grid grid--2" role="list">
            {chapters.map((chapter) => {
              const done = progress.completedChapters.includes(chapter.id);
              const started = progress.completedObjectives.some((key) => key.startsWith(`${chapter.id}:`));
              return (
                <li key={chapter.id}>
                  <article className="card card--outlined chapter-card">
                    <p className="eyebrow">{hy.map.chapterLabel(chapter.number)}</p>
                    <h3 className="card__title">{chapter.title}</h3>
                    <p className="muted">{chapter.subtitle}</p>
                    <div className="chapter-card__badges">
                      <EvidenceBadge type="primary-source" />
                      <EvidenceBadge type="fictional" />
                      {done && <Badge tone="verified">{t.completed}</Badge>}
                    </div>
                    <p>{t.chapterText}</p>
                    <ButtonLink to={`${paths.game}?chapter=${chapter.id}`} size="lg">
                      {done ? t.replay : started ? t.continue : t.start}
                    </ButtonLink>
                  </article>
                </li>
              );
            })}
            <li>
              <article className="card card--outlined chapter-card">
                <h3 className="card__title">{t.controlsTitle}</h3>
                <ControlsHelp />
              </article>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

export function GamePage() {
  const [params] = useSearchParams();
  const chapterId = params.get('chapter');
  const [hasWebGL] = useState(detectWebGL);
  const chapter = chapterId ? chaptersById[chapterId] : null;
  const script = chapterId ? chaptersScripts[chapterId] : null;

  if (!chapterId) {
    return (
      <>
        <PageTitle title={hy.game.pageTitle} />
        <GameLanding />
      </>
    );
  }

  if (!chapter || !script) {
    return (
      <>
        <PageTitle title={hy.game.pageTitle} />
        <section className="page-hero page-hero--full" aria-labelledby="page-title">
          <div className="container container--narrow page-hero__inner">
            <h1 id="page-title">{hy.game.unknownChapter}</h1>
            <Link to={paths.game}>{hy.game.backToChapters}</Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageTitle title={`${chapter.title} · ${hy.game.pageTitle}`} />
      <h1 className="visually-hidden">{chapter.title}</h1>
      {hasWebGL ? (
        <Suspense fallback={<GameLoading />}>
          <GameView chapter={chapter} script={script} />
        </Suspense>
      ) : (
        <NoWebGL />
      )}
    </>
  );
}
